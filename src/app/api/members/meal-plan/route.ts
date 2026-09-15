import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    // ১. ইউজার লগইন করা আছে কি না চেক করা
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // ২. ইউজারের আইডি বের করা
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // ৩. ফ্রন্টএন্ড থেকে পাঠানো ডেটা রিসিভ করা
    const body = await req.json();
    const { date, breakfast, lunch, dinner, guest } = body;

    // তারিখটিকে ডাটাবেস ফরম্যাটে কনভার্ট করা (রাত ১২টার সময় ধরে)
    const mealDate = new Date(date);
    mealDate.setUTCHours(0, 0, 0, 0);

    // ৪. ডাটাবেসে সেভ বা আপডেট করা (Upsert)
    const savedMeal = await prisma.mealLog.upsert({
      where: {
        userId_date: {
          userId: user.id,
          date: mealDate,
        },
      },
      update: {
        breakfast: Number(breakfast),
        lunch: Number(lunch),
        dinner: Number(dinner),
        guest: Number(guest),
      },
      create: {
        userId: user.id,
        date: mealDate,
        breakfast: Number(breakfast),
        lunch: Number(lunch),
        dinner: Number(dinner),
        guest: Number(guest),
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