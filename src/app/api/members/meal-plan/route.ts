import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

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
    const { date, breakfast, lunch, dinner, guest } = body;

    const mealDate = new Date(date);
    mealDate.setUTCHours(0, 0, 0, 0);

    const savedMeal = await prisma.mealLog.upsert({
      where: {
        userId_date: {
          userId: user.id,
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
        userId: user.id,
        date: mealDate,
        breakfast: Number(breakfast) || 0,
        lunch: Number(lunch) || 0,
        dinner: Number(dinner) || 0,
        guest: Number(guest) || 0,
      },
    });

    return NextResponse.json(
      { message: "Meal plan saved successfully!", meal: savedMeal },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error saving meal plan:", error);
    return NextResponse.json(
      { error: "Failed to save meal plan" },
      { status: 500 }
    );
  }
}