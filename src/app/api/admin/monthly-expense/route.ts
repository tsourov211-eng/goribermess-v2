import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    const role = (session?.user as any)?.role;
    if (!session?.user?.email || role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const month = searchParams.get("month");

    if (!month) {
      return NextResponse.json({ error: "Month parameter is required" }, { status: 400 });
    }

    const monthlyExpense = await prisma.monthlyExpense.findUnique({
      where: { month },
    });

    return NextResponse.json({ data: monthlyExpense || null }, { status: 200 });
  } catch (error) {
    console.error("GET Monthly Expense Error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    const role = (session?.user as any)?.role;
    if (!session?.user?.email || role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { month, seatRent, electricityGas, internet, maid, additional, mealCharge } = body;

    if (!month) {
      return NextResponse.json({ error: "Month is required" }, { status: 400 });
    }

    // Upsert the Monthly Expense configuration
    const expense = await prisma.monthlyExpense.upsert({
      where: { month },
      update: {
        seatRent: Number(seatRent) || 0,
        electricityGas: Number(electricityGas) || 0,
        internet: Number(internet) || 0,
        maid: Number(maid) || 0,
        additional: Number(additional) || 0,
        mealCharge: Number(mealCharge) || 0,
      },
      create: {
        month,
        seatRent: Number(seatRent) || 0,
        electricityGas: Number(electricityGas) || 0,
        internet: Number(internet) || 0,
        maid: Number(maid) || 0,
        additional: Number(additional) || 0,
        mealCharge: Number(mealCharge) || 0,
      },
    });

    const total = 
      expense.seatRent + 
      expense.electricityGas + 
      expense.internet + 
      expense.maid + 
      expense.additional + 
      expense.mealCharge;

    // Create a global notice
    await prisma.notice.create({
      data: {
        title: `Monthly Expense Finalized for ${month}`,
        description: `The monthly expense configuration for ${month} has been finalized. Total per member: Tk ${total.toLocaleString()}. Please review your dues.`,
        type: "info",
        isActive: true,
      }
    });

    return NextResponse.json({ success: true, data: expense, total }, { status: 200 });
  } catch (error: any) {
    console.error("POST Monthly Expense Error:", error);
    return NextResponse.json({ 
        error: error?.message || "Server error",
        details: String(error)
    }, { status: 500 });
  }
}
