import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const month = parseInt(searchParams.get("month") || String(new Date().getMonth()));
    const year = parseInt(searchParams.get("year") || String(new Date().getFullYear()));

    const startDate = new Date(year, month, 1);
    const endDate = new Date(year, month + 1, 1);

    // Get all expenses for the selected month
    const expenses = await prisma.expense.findMany({
      where: {
        date: {
          gte: startDate,
          lt: endDate,
        },
        status: "Approved", // Only aggregate approved expenses
      },
      include: {
        user: { select: { id: true, name: true } },
      },
    });

    // Group and aggregate by user
    const summaryMap: Record<string, { userId: string, name: string, total: number }> = {};

    expenses.forEach((expense) => {
      const userId = expense.userId;
      if (!summaryMap[userId]) {
        summaryMap[userId] = {
          userId,
          name: expense.user?.name || "Unknown Member",
          total: 0,
        };
      }
      summaryMap[userId].total += expense.amount;
    });

    const summaryList = Object.values(summaryMap).sort((a, b) => b.total - a.total);

    return NextResponse.json({ data: summaryList }, { status: 200 });
  } catch (error) {
    console.error("Monthly summary GET Error:", error);
    return NextResponse.json({ error: "Failed to fetch summary" }, { status: 500 });
  }
}
