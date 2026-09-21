import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    // 1. Whose responsibility is it today
    let todaySchedule = await prisma.bazaarSchedule.findFirst({
      where: {
        date: { gte: today, lt: tomorrow },
      },
      include: {
        user: { select: { id: true, name: true, email: true, phone: true } },
      },
    });

    // If there is no schedule today, fallback to the first active user or manager's name
    if (!todaySchedule) {
      const defaultUser = await prisma.user.findFirst({
        where: { role: { in: ["manager", "admin", "member"] } },
        select: { id: true, name: true, email: true, phone: true },
      });

      if (defaultUser) {
        todaySchedule = {
          id: "today-default",
          userId: defaultUser.id,
          date: today,
          status: "pending",
          user: defaultUser,
        };
      }
    }

    // 2. Upcoming bazaar schedule
    const upcomingSchedules = await prisma.bazaarSchedule.findMany({
      where: {
        date: { gte: tomorrow },
      },
      orderBy: { date: "asc" },
      take: 5,
      include: {
        user: { select: { id: true, name: true, email: true } },
      },
    });

    // 3. Today's bazaar expense
    const todayExpenses = await prisma.expense.findMany({
      where: {
        date: { gte: today, lt: tomorrow },
      },
      include: {
        user: { select: { name: true } },
      },
    });

    const todayTotal = todayExpenses.reduce((acc, e) => acc + e.amount, 0);

    return NextResponse.json(
      {
        todayAssigned: todaySchedule?.user || null,
        schedules: upcomingSchedules,
        todayExpenses,
        todayTotal,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Bazaar GET Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch bazaar data" },
      { status: 500 }
    );
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

    const body = await req.json();
    const { amount, description, date } = body;

    if (!amount || Number(amount) <= 0) {
      return NextResponse.json({ error: "Invalid amount" }, { status: 400 });
    }

    // If admin or manager submits, directly "Approved", if normal member then "Pending"
    const status = user.role === "admin" || user.role === "manager" ? "Approved" : "Pending";

    const expenseDate = date ? new Date(date) : new Date();

    const newExpense = await prisma.expense.create({
      data: {
        userId: user.id,
        amount: Number(amount),
        description: description || "Daily Bazaar",
        status,
        date: expenseDate,
      },
    });

    return NextResponse.json(
      { message: "Bazaar expense submitted successfully!", expense: newExpense },
      { status: 201 }
    );
  } catch (error) {
    console.error("Bazaar POST Error:", error);
    return NextResponse.json(
      { error: "Failed to submit bazaar expense" },
      { status: 500 }
    );
  }
}
