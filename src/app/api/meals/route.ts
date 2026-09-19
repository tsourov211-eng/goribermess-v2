import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

// ১. কোনো নির্দিষ্ট তারিখের মেম্বার ও মিলের তালিকা আনার জন্য GET রিকোয়েস্ট
export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const dateStr = searchParams.get("date"); // যেমন: 2026-09-19

    const targetDate = dateStr ? new Date(dateStr) : new Date();
    targetDate.setUTCHours(0, 0, 0, 0);

    const nextDate = new Date(targetDate);
    nextDate.setDate(nextDate.getDate() + 1);

    // সব মেম্বারদের আনা
    const users = await prisma.user.findMany({
      orderBy: { name: "asc" },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        role: true,
        defaultBreakfast: true,
        defaultLunch: true,
        defaultDinner: true,
      },
    });

    // ওই নির্দিষ্ট দিনের মিল লগস আনা
    const mealLogs = await prisma.mealLog.findMany({
      where: {
        date: {
          gte: targetDate,
          lt: nextDate,
        },
      },
    });

    const mealMap = new Map();
    mealLogs.forEach((log) => {
      mealMap.set(log.userId, log);
    });

    // প্রতিটি ইউজারের মিল সেট করা (লগ থাকলে লগ, না থাকলে ডিফল্ট)
    const membersWithMeals = users.map((user) => {
      const existingLog = mealMap.get(user.id);
      return {
        userId: user.id,
        name: user.name || "Member",
        role: user.role,
        image: user.image,
        breakfast: existingLog ? existingLog.breakfast : user.defaultBreakfast ?? 0.5,
        lunch: existingLog ? existingLog.lunch : user.defaultLunch ?? 1.0,
        dinner: existingLog ? existingLog.dinner : user.defaultDinner ?? 1.0,
        guest: existingLog ? existingLog.guest : 0,
      };
    });

    // আজকের কুইক স্ট্যাটাস হিসাব
    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const todayMeals = await prisma.mealLog.findMany({
      where: { date: { gte: today, lt: tomorrow } },
    });
    const totalMealsToday = todayMeals.reduce(
      (acc, m) => acc + m.breakfast + m.lunch + m.dinner + m.guest,
      0
    );

    const todayExpenses = await prisma.expense.findMany({
      where: { date: { gte: today, lt: tomorrow }, status: "Approved" },
    });
    const todayBazaar = todayExpenses.reduce((acc, e) => acc + e.amount, 0);

    // লাইভ মিল রেট
    const allExpenses = await prisma.expense.aggregate({
      _sum: { amount: true },
      where: { status: "Approved" },
    });
    const allMeals = await prisma.mealLog.findMany();
    const totalMessMeals = allMeals.reduce(
      (acc, m) => acc + m.breakfast + m.lunch + m.dinner + m.guest,
      0
    );
    const liveMealRate =
      totalMessMeals > 0 ? (allExpenses._sum.amount || 0) / totalMessMeals : 0;

    return NextResponse.json(
      {
        date: targetDate.toISOString().split("T")[0],
        members: membersWithMeals,
        stats: {
          totalMealsToday: Math.round(totalMealsToday * 10) / 10,
          currentMealRate: Math.round(liveMealRate * 100) / 100,
          todayBazaar: Math.round(todayBazaar),
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Meals GET Error:", error);
    return NextResponse.json(
      { message: "মিল ডেটা আনতে সমস্যা হয়েছে!" },
      { status: 500 }
    );
  }
}

// ২. মিল সেভ বা আপডেট করার জন্য POST রিকোয়েস্ট (একক অথবা ব্যাচ)
export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { date, meals } = body;

    if (!date) {
      return NextResponse.json(
        { message: "তারিখ প্রদান করা জরুরি!" },
        { status: 400 }
      );
    }

    const mealDate = new Date(date);
    mealDate.setUTCHours(0, 0, 0, 0);

    // যদি পুরো ব্যাচ পাঠানো হয়
    if (Array.isArray(meals)) {
      const operations = meals.map((m) => {
        return prisma.mealLog.upsert({
          where: {
            userId_date: {
              userId: m.userId,
              date: mealDate,
            },
          },
          update: {
            breakfast: Number(m.breakfast) || 0,
            lunch: Number(m.lunch) || 0,
            dinner: Number(m.dinner) || 0,
            guest: Number(m.guest) || 0,
          },
          create: {
            userId: m.userId,
            date: mealDate,
            breakfast: Number(m.breakfast) || 0,
            lunch: Number(m.lunch) || 0,
            dinner: Number(m.dinner) || 0,
            guest: Number(m.guest) || 0,
          },
        });
      });

      await Promise.all(operations);

      return NextResponse.json(
        { message: "সকল মিলের হিসাব সফলভাবে সংরক্ষিত হয়েছে!" },
        { status: 200 }
      );
    }

    // একক এন্ট্রি থাকলে
    const { userId, breakfast, lunch, dinner, guest } = body;
    if (!userId) {
      return NextResponse.json({ message: "ইউজার আইডি জরুরি!" }, { status: 400 });
    }

    const savedMeal = await prisma.mealLog.upsert({
      where: {
        userId_date: {
          userId,
          date: mealDate,
        },
      },
      update: {
        breakfast: Number(breakfast) || 0,
        lunch: Number(lunch) || 0,
        dinner: Number(dinner) || 0,
        guest: Number(guest) || 0,
      },
      create: {
        userId,
        date: mealDate,
        breakfast: Number(breakfast) || 0,
        lunch: Number(lunch) || 0,
        dinner: Number(dinner) || 0,
        guest: Number(guest) || 0,
      },
    });

    return NextResponse.json(
      { message: "মিলের হিসাব সংরক্ষিত হয়েছে!", meal: savedMeal },
      { status: 200 }
    );
  } catch (error) {
    console.error("Meals POST Error:", error);
    return NextResponse.json(
      { message: "সার্ভারে কোনো সমস্যা হয়েছে!" },
      { status: 500 }
    );
  }
}