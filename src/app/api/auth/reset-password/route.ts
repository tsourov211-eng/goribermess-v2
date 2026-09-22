import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export async function POST(req: Request) {
    try {
        const { token, password } = await req.json();

        if (!token || !password) {
            return NextResponse.json(
                { message: 'Token and new password are required' },
                { status: 400 }
            );
        }

        // Find user with valid token
        const user = await prisma.user.findFirst({
            where: {
                resetToken: token,
                resetTokenExpiry: {
                    gte: new Date(), // Check if token has not expired
                },
            },
        });

        if (!user) {
            return NextResponse.json(
                { message: 'Invalid or expired password reset token' },
                { status: 400 }
            );
        }

        // Hash the new password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Update user password and clear reset token
        await prisma.user.update({
            where: { id: user.id },
            data: {
                password: hashedPassword,
                resetToken: null,
                resetTokenExpiry: null,
            },
        });

        return NextResponse.json(
            { message: 'Password has been reset successfully' },
            { status: 200 }
        );

    } catch (error) {
        console.error('Error in reset-password:', error);
        return NextResponse.json(
            { message: 'An error occurred. Please try again.' },
            { status: 500 }
        );
    }
}
