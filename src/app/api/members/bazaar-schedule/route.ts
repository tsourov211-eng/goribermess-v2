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

    // ৩. ফ্রন্টএন্ড থেকে পাঠানো বাজারের ডেটগুলো রিসিভ করা
    const body = await req.json();
    const { dates } = body; // এটি একটি Array হবে

    if (!dates || dates.length === 0) {
      return NextResponse.json({ error: "No dates provided" }, { status: 400 });
    }

    // ৪. সবগুলো ডেট ডাটাবেসের ফরম্যাটে সাজানো
    const bazaarData = dates.map((dateStr: string) => {
      const parsedDate = new Date(dateStr);
      parsedDate.setUTCHours(0, 0, 0, 0);
      return {
        userId: user.id,
        date: parsedDate,
        status: "pending", // ডিফল্ট স্ট্যাটাস pending থাকবে
      };
    });

    // ৫. একসাথে সবগুলো ডেট ডাটাবেসে সেভ করা (createMany)
    await prisma.bazaarSchedule.createMany({
      data: bazaarData,
    });

    return NextResponse.json(
      { message: "Bazaar dates submitted successfully!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error saving bazaar dates:", error);
    return NextResponse.json(
      { error: "Failed to submit bazaar dates" },
      { status: 500 }
    );
  }
}