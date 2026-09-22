import nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_SERVER_HOST,
    port: parseInt(process.env.EMAIL_SERVER_PORT || '587'),
    secure: process.env.EMAIL_SERVER_SECURE === 'true',
    auth: {
        user: process.env.EMAIL_SERVER_USER,
        pass: process.env.EMAIL_SERVER_PASSWORD,
    },
});

export const sendPasswordResetEmail = async (email: string, resetToken: string) => {
    // Generate the reset link based on the environment (local or production)
    const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000';
    const resetUrl = `${baseUrl}/reset-password?token=${resetToken}`;

    const mailOptions = {
        from: `"Amader Mess" <${process.env.EMAIL_FROM || process.env.EMAIL_SERVER_USER}>`,
        to: email,
        subject: 'Password Reset Request',
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h2 style="color: #5e2818;">Password Reset Request</h2>
                <p>You recently requested to reset your password for your Amader Mess account.</p>
                <p>Click the button below to reset it:</p>
                <div style="text-align: center; margin: 30px 0;">
                    <a href="${resetUrl}" style="background-color: #ea580c; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">Reset Password</a>
                </div>
                <p>If you did not request a password reset, please ignore this email or contact support if you have questions.</p>
                <p>Thanks,<br>The Amader Mess Team</p>
                <hr style="border: none; border-top: 1px solid #eaeaea; margin-top: 26px; margin-bottom: 26px;" />
                <p style="color: #666666; font-size: 12px; text-align: center;">
                    If you're having trouble clicking the password reset button, copy and paste the URL below into your web browser:<br>
                    <a href="${resetUrl}" style="color: #ea580c;">${resetUrl}</a>
                </p>
            </div>
        `,
    };

    return transporter.sendMail(mailOptions);
};
