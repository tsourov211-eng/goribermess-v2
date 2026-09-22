import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { sendPasswordResetEmail } from '@/lib/mailer';
import crypto from 'crypto';

export async function POST(req: Request) {
    try {
        const { email } = await req.json();

        if (!email) {
            return NextResponse.json(
                { message: 'Email is required' },
                { status: 400 }
            );
        }

        const user = await prisma.user.findUnique({
            where: { email },
        });

        // We don't want to leak whether a user exists or not, so we always return success
        if (!user) {
            return NextResponse.json(
                { message: 'If that email address is in our database, we will send you an email to reset your password.' },
                { status: 200 }
            );
        }

        // Generate a secure token
        const resetToken = crypto.randomBytes(32).toString('hex');
        const resetTokenExpiry = new Date(Date.now() + 3600000); // Token expires in 1 hour

        // Save token to database
        await prisma.user.update({
            where: { email },
            data: {
                resetToken,
                resetTokenExpiry,
            },
        });

        // Send email
        await sendPasswordResetEmail(user.email!, resetToken);

        return NextResponse.json(
            { message: 'If that email address is in our database, we will send you an email to reset your password.' },
            { status: 200 }
        );

    } catch (error) {
        console.error('Error in forgot-password:', error);
        return NextResponse.json(
            { message: 'An error occurred. Please try again.' },
            { status: 500 }
        );
    }
}
