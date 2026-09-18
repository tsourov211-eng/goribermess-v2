import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: Request) {
    try {
        const session = await getServerSession();
        let userEmail = session?.user?.email;

        // 💡 লোকাল সার্ভারে টেস্টিংয়ের সুবিধার্থে সেশন না পেলে ডিফল্ট প্রথম ইউজারকে ধরে নেবে
        if (!userEmail) {
            const firstUser = await prisma.user.findFirst();
            if (firstUser && firstUser.email) {
                userEmail = firstUser.email;
            } else {
                return NextResponse.json({ error: "No user found in database" }, { status: 404 });
            }
        }

        const user = await prisma.user.findUnique({
            where: { email: userEmail },
            include: {
                deposits: { where: { status: "Approved" } },
                meals: true
            }
        });

        if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

        const totalDeposit = user.deposits.reduce((acc, curr) => acc + curr.amount, 0);
        const totalMeals = user.meals.reduce((acc, meal) => acc + meal.breakfast + meal.lunch + meal.dinner + meal.guest, 0);

        return NextResponse.json({
            profile: {
                name: user.name,
                email: user.email,
                phone: user.phone || "",
                address: user.address || "",
                image: user.image,
                defaultBreakfast: user.defaultBreakfast,
                defaultLunch: user.defaultLunch,
                defaultDinner: user.defaultDinner
            },
            stats: {
                totalDeposit,
                totalMeals
            }
        }, { status: 200 });

    } catch (error) {
        console.error("Profile GET API Error:", error);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}

export async function PUT(req: Request) {
    try {
        const session = await getServerSession();
        let userEmail = session?.user?.email;

        if (!userEmail) {
            const firstUser = await prisma.user.findFirst();
            if (firstUser && firstUser.email) {
                userEmail = firstUser.email;
            } else {
                return NextResponse.json({ error: "No user found in database" }, { status: 404 });
            }
        }

        const body = await req.json();
        const { name, phone, address, defaultBreakfast, defaultLunch, defaultDinner } = body;

        const updatedUser = await prisma.user.update({
            where: { email: userEmail },
            data: {
                name,
                phone,
                address,
                defaultBreakfast: Number(defaultBreakfast),
                defaultLunch: Number(defaultLunch),
                defaultDinner: Number(defaultDinner),
            }
        });

        return NextResponse.json({ message: "Profile updated successfully", data: updatedUser }, { status: 200 });

    } catch (error) {
        console.error("Profile PUT API Error:", error);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}