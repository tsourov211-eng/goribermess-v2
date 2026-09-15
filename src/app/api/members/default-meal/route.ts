import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    // ইউজার লগইন করা আছে কি না চেক করা
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // ফ্রন্টএন্ড থেকে পাঠানো ডেটা রিসিভ করা
    const body = await req.json();
    const { breakfast, lunch, dinner } = body;

    // ডাটাবেসে ইউজারের ডিফল্ট মিল আপডেট করা
    const updatedUser = await prisma.user.update({
      where: { email: session.user.email },
      data: {
        defaultBreakfast: Number(breakfast),
        defaultLunch: Number(lunch),
        defaultDinner: Number(dinner),
      },
    });

    return NextResponse.json(
      { message: "Default meals updated successfully!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating default meals:", error);
    return NextResponse.json(
      { error: "Failed to update default meals" },
      { status: 500 }
    );
  }
}