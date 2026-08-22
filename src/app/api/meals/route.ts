// src/app/api/meals/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// ১. কোনো নির্দিষ্ট তারিখের মিলের তালিকা আনার জন্য GET রিকোয়েস্ট
export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const date = searchParams.get("date"); // যেমন: ?date=2026-08-22

        if (!date) {
            return NextResponse.json({ message: "তারিখ পাওয়া যায়নি!" }, { status: 400 });
        }

        const meals = await prisma.meal.findMany({
            where: { date },
            include: { user: true }, // ইউজারের নাম দেখার জন্য
        });

        return NextResponse.json(meals, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "মিল ডেটা আনতে সমস্যা হয়েছে!" }, { status: 500 });
    }
}

// ২. মিল সেভ বা আপডেট করার জন্য POST রিকোয়েস্ট
export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { userId, date, breakfast, lunch, dinner } = body;

        if (!userId || !date) {
            return NextResponse.json({ message: "ইউজার আইডি এবং তারিখ জরুরি!" }, { status: 400 });
        }

        // Prisma-র upsert ব্যবহার করছি: যদি ওই তারিখে ওই ইউজারের মিল থাকে, তবে আপডেট হবে, না থাকলে নতুন তৈরি হবে
        const meal = await prisma.meal.upsert({
            where: {
                userId_date: {
                    userId,
                    date,
                },
            },
            update: {
                breakfast: Number(breakfast) || 0,
                lunch: Number(lunch) || 0,
                dinner: Number(dinner) || 0,
            },
            create: {
                userId,
                date,
                breakfast: Number(breakfast) || 0,
                lunch: Number(lunch) || 0,
                dinner: Number(dinner) || 0,
            },
        });

        return NextResponse.json({ message: "মিলের হিসাব সফলভাবে সংরক্ষিত হয়েছে!", meal }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "সার্ভারে কোনো সমস্যা হয়েছে!" }, { status: 500 });
    }
}