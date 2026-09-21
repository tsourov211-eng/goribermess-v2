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

    // 1. 💡 Total Deposit (Only "Approved" status will be added)
    const depositAgg = await prisma.deposit.aggregate({
      _sum: { amount: true },
      where: {
        userId: user.id,
        status: "Approved",
      },
    });
    const totalDeposit = depositAgg._sum.amount || 0;

    // 2. User's total meals (Breakfast + Lunch + Dinner + Guest)
    const userMeals = await prisma.mealLog.findMany({
      where: { userId: user.id },
    });
    const totalMeals = userMeals.reduce(
      (acc, meal) => acc + meal.breakfast + meal.lunch + meal.dinner + meal.guest,
      0
    );

    // 3. Mess total expenses (Only Approved expenses)
    const expenseAgg = await prisma.expense.aggregate({
      _sum: { amount: true },
      where: { status: "Approved" },
    });
    const totalMessExpense = expenseAgg._sum.amount || 0;

    // 4. Mess total meals
    const allMeals = await prisma.mealLog.findMany();
    const totalMessMeals = allMeals.reduce(
      (acc, meal) => acc + meal.breakfast + meal.lunch + meal.dinner + meal.guest,
      0
    );

    // 5. Calculate Live Meal Rate
    let liveMealRate = 0;
    if (totalMessMeals > 0) {
      liveMealRate = totalMessExpense / totalMessMeals;
    } else if (totalMessExpense > 0) {
      liveMealRate = totalMessExpense;
    }

    // 6. Current Balance calculation (Deposit - Total meal cost)
    const currentBalance = totalDeposit - totalMeals * liveMealRate;

    // 7. Recent Meals (Last 3 days)
    const recentMeals = await prisma.mealLog.findMany({
      where: { userId: user.id },
      orderBy: { date: "desc" },
      take: 3,
    });

    // 8. Notice Board (Exclude cleared notices)
    const notices = await prisma.notice.findMany({
      where: { 
        isActive: true,
        id: { notIn: user.clearedNotices || [] }
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({
      stats: {
        totalDeposit: Math.round(totalDeposit * 100) / 100,
        totalMeals: Math.round(totalMeals * 10) / 10,
        currentBalance: Math.round(currentBalance * 100) / 100,
        liveMealRate: Math.round(liveMealRate * 100) / 100,
      },
      recentMeals,
      notices,
      defaultMeals: {
        breakfast: user.defaultBreakfast || 0,
        lunch: user.defaultLunch || 0,
        dinner: user.defaultDinner || 0,
      },
    });
  } catch (error) {
    console.error("Dashboard Data Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch dashboard data" },
      { status: 500 }
    );
  }
}