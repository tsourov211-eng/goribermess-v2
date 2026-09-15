import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user?.email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const user = await prisma.user.findUnique({ where: { email: session.user.email } });
        if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

        // আজকের মিলের স্ট্যাটাস বের করা
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);

        const todaysMeal = await prisma.mealLog.findFirst({
            where: {
                userId: user.id,
                date: { gte: today, lt: tomorrow }
            }
        });

        const todayStatus = {
            lunch: todaysMeal && todaysMeal.lunch > 0 ? "ON" : "OFF",
            dinner: todaysMeal && todaysMeal.dinner > 0 ? "ON" : "OFF"
        };

        // ইউজারের আগের গেস্ট মিল রিকোয়েস্টগুলো আনা
        const guestRequests = await prisma.guestMealRequest.findMany({
            where: { userId: user.id },
            orderBy: { date: 'desc' }
        });

        return NextResponse.json({ todayStatus, guestRequests }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user?.email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const user = await prisma.user.findUnique({ where: { email: session.user.email } });
        if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

        const { date, mealType, guests } = await req.json();

        const newRequest = await prisma.guestMealRequest.create({
            data: {
                userId: user.id,
                date: new Date(date),
                mealType,
                guests: Number(guests)
            }
        });

        return NextResponse.json(newRequest, { status: 201 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Failed to create request" }, { status: 500 });
    }
}