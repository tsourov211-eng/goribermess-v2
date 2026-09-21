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

    const today = new Date();
    // Get start of the current month
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    // Get start of next month
    const startOfNextMonth = new Date(today.getFullYear(), today.getMonth() + 1, 1);

    const monthSchedules = await prisma.bazaarSchedule.findMany({
      where: {
        date: { gte: startOfMonth, lt: startOfNextMonth },
      },
      orderBy: { date: "asc" },
      include: {
        user: { select: { id: true, name: true, email: true } },
      },
    });

    return NextResponse.json({ schedules: monthSchedules }, { status: 200 });
  } catch (error) {
    console.error("Bazaar Month GET Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch month schedules" },
      { status: 500 }
    );
  }
}
