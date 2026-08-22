// src/app/api/members/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

// ১. ডেটাবেস থেকে সব মেম্বারের তালিকা আনার জন্য GET রিকোয়েস্ট
export async function GET() {
    try {
        const members = await prisma.user.findMany({
            orderBy: { createdAt: "desc" }, // নতুন মেম্বাররা সবার উপরে থাকবে
        });
        return NextResponse.json(members, { status: 200 });
    } catch (error) {
        console.error("GET Error:", error);
        return NextResponse.json({ message: "ডেটা আনতে সমস্যা হয়েছে!" }, { status: 500 });
    }
}

// ২. নতুন মেম্বার যুক্ত করার জন্য POST রিকোয়েস্ট
export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { name, email, phone, role, deposit } = body;

        // চেক করা এই ইমেইল দিয়ে আগে থেকেই কেউ আছে কি না
        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            return NextResponse.json(
                { message: "এই ইমেইল দিয়ে ইতোমধ্যে একটি একাউন্ট আছে!" },
                { status: 400 }
            );
        }

        // পাসওয়ার্ড এনক্রিপ্ট করা
        const hashedPassword = await bcrypt.hash("123456", 10);

        // ডাটাবেসে নতুন মেম্বার সেভ করা
        const newUser = await prisma.user.create({
            data: {
                name,
                email,
                phone,
                role,
                deposit: Number(deposit) || 0,
                password: hashedPassword,
            },
        });

        return NextResponse.json(
            { message: "নতুন মেম্বার সফলভাবে যুক্ত হয়েছে!" },
            { status: 201 }
        );
    } catch (error) {
        console.error("POST Error:", error);
        return NextResponse.json(
            { message: "সার্ভারে কোনো সমস্যা হয়েছে!" },
            { status: 500 }
        );
    }
}