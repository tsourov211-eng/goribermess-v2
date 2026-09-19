import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // ১. পেন্ডিং পেমেন্ট রিকোয়েস্ট (Deposit)
    const pendingDeposits = await prisma.deposit.findMany({
      where: { status: "Pending" },
      include: { user: { select: { name: true, image: true } } },
      orderBy: { date: "desc" },
    });

    // ২. পেন্ডিং বাজারের খরচ (Expense)
    const pendingExpenses = await prisma.expense.findMany({
      where: { status: "Pending" },
      include: { user: { select: { name: true, image: true } } },
      orderBy: { date: "desc" },
    });

    // 2.5 পেন্ডিং বাজার শিডিউল
    const pendingBazaarSchedules = await prisma.bazaarSchedule.findMany({
      where: { status: "pending" },
      include: { user: { select: { name: true, image: true } } },
      orderBy: { date: "asc" },
    });

    // 2.6 পেন্ডিং মেম্বার রিকোয়েস্ট (নতুন রেজিস্ট্রেশন)
    const pendingMembers = await prisma.user.findMany({
      where: { role: "pending" },
      select: { id: true, name: true, email: true, phone: true },
      orderBy: { id: "desc" },
    });

    // ৩. আজকের মোট মিল
    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const todayMeals = await prisma.mealLog.findMany({
      where: { date: { gte: today, lt: tomorrow } },
    });
    const totalMealsToday = todayMeals.reduce(
      (acc, meal) =>
        acc + meal.breakfast + meal.lunch + meal.dinner + meal.guest,
      0
    );

    // ৪. আজকের বাজারের খরচ (যেগুলো Approved)
    const todayExpenses = await prisma.expense.findMany({
      where: { date: { gte: today, lt: tomorrow }, status: "Approved" },
    });
    const totalBazaarToday = todayExpenses.reduce(
      (acc, exp) => acc + exp.amount,
      0
    );

    return NextResponse.json(
      {
        pendingDeposits,
        pendingExpenses,
        pendingBazaarSchedules,
        pendingMembers,
        stats: {
          totalMealsToday: Math.round(totalMealsToday * 10) / 10,
          totalBazaarToday: Math.round(totalBazaarToday),
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Manager Dashboard Error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}