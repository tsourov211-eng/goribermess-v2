import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const { searchParams } = new URL(req.url);
    const month = searchParams.get("month");
    const year = searchParams.get("year");

    // আজকের মিলের স্ট্যাটাস বের করা
    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const todaysMeal = await prisma.mealLog.findFirst({
      where: {
        userId: user.id,
        date: { gte: today, lt: tomorrow },
      },
    });

    const todayStatus = {
      lunch: todaysMeal && todaysMeal.lunch > 0 ? "ON" : "OFF",
      dinner: todaysMeal && todaysMeal.dinner > 0 ? "ON" : "OFF",
    };

    // মাসিক মিল ইতিহাস আনা
    const currentYear = year ? parseInt(year) : new Date().getFullYear();
    const currentMonth = month ? parseInt(month) - 1 : new Date().getMonth();
    const startOfMonth = new Date(Date.UTC(currentYear, currentMonth, 1));
    const endOfMonth = new Date(Date.UTC(currentYear, currentMonth + 1, 0, 23, 59, 59, 999));

    const monthlyMeals = await prisma.mealLog.findMany({
      where: {
        userId: user.id,
        date: { gte: startOfMonth, lte: endOfMonth },
      },
      orderBy: { date: "desc" },
    });

    // ইউজারের আগের গেস্ট মিল রিকোয়েস্টগুলো আনা
    const guestRequests = await prisma.guestMealRequest.findMany({
      where: { userId: user.id },
      orderBy: { date: "desc" },
    });

    return NextResponse.json(
      { todayStatus, guestRequests, monthlyMeals },
      { status: 200 }
    );
  } catch (error) {
    console.error("My Meals GET Error:", error);
    return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const { date, mealType, guests } = await req.json();

    const newRequest = await prisma.guestMealRequest.create({
      data: {
        userId: user.id,
        date: new Date(date),
        mealType,
        guests: Number(guests),
      },
    });

    return NextResponse.json(newRequest, { status: 201 });
  } catch (error) {
    console.error("My Meals POST Error:", error);
    return NextResponse.json({ error: "Failed to create request" }, { status: 500 });
  }
}