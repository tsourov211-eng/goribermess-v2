import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// ১. ইউজারের এবং মেসের বাজার শিডিউল আনার জন্য GET রিকোয়েস্ট
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

    const { searchParams } = new URL(req.url);
    const month = searchParams.get("month"); // 1-12
    const year = searchParams.get("year");   // e.g. 2026

    const now = new Date();
    const currentYear = year ? parseInt(year) : now.getFullYear();
    const currentMonth = month ? parseInt(month) - 1 : now.getMonth();

    const startOfMonth = new Date(Date.UTC(currentYear, currentMonth, 1));
    const endOfMonth = new Date(Date.UTC(currentYear, currentMonth + 1, 0, 23, 59, 59, 999));

    // ইউজারের নিজস্ব বাজার শিডিউল
    const mySchedules = await prisma.bazaarSchedule.findMany({
      where: {
        userId: user.id,
        date: { gte: startOfMonth, lte: endOfMonth },
      },
      orderBy: { date: "asc" },
    });

    // মেসের সকলের বাজার শিডিউল (ক্যালেন্ডারে অন্যান্যদের তারিখও দেখার জন্য)
    const allSchedules = await prisma.bazaarSchedule.findMany({
      where: {
        date: { gte: startOfMonth, lte: endOfMonth },
      },
      include: {
        user: { select: { id: true, name: true } },
      },
      orderBy: { date: "asc" },
    });

    return NextResponse.json(
      { mySchedules, allSchedules },
      { status: 200 }
    );
  } catch (error) {
    console.error("Bazaar Schedule GET Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch bazaar schedules" },
      { status: 500 }
    );
  }
}

// ২. মেম্বার কর্তৃক বাজার ডেট সিলেক্ট ও সাবমিট করার জন্য POST রিকোয়েস্ট
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
    const { dates } = body;

    if (!dates || !Array.isArray(dates) || dates.length === 0) {
      return NextResponse.json({ error: "No dates provided" }, { status: 400 });
    }

    // তারিখগুলোকে ফরম্যাট করা ও ডুপ্লিকেট এড়ানো
    const createdItems = [];
    for (const dateStr of dates) {
      const [y, m, d] = dateStr.split("-").map(Number);
      const parsedDate = new Date(Date.UTC(y, m - 1, d, 12, 0, 0));
      
      const startOfDay = new Date(Date.UTC(y, m - 1, d, 0, 0, 0));
      const endOfDay = new Date(Date.UTC(y, m - 1, d, 23, 59, 59, 999));

      const existing = await prisma.bazaarSchedule.findFirst({
        where: {
          userId: user.id,
          date: { gte: startOfDay, lte: endOfDay },
        },
      });

      if (!existing) {
        createdItems.push({
          userId: user.id,
          date: parsedDate,
          status: "pending", // ম্যানেজারের অনুমোদনের জন্য পেন্ডিং থাকবে
        });
      }
    }

    if (createdItems.length > 0) {
      await prisma.bazaarSchedule.createMany({
        data: createdItems,
      });
    }

    return NextResponse.json(
      { 
        message: "Bazaar dates submitted successfully for manager approval!",
        count: createdItems.length
      },
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

// ৩. ম্যানেজার কর্তৃক বাজার শিডিউল অনুমোদন বা বাতিল করার জন্য PATCH রিকোয়েস্ট
export async function PATCH(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user || (user.role !== "manager" && user.role !== "admin")) {
      return NextResponse.json({ error: "Only managers or admins can approve schedules" }, { status: 403 });
    }

    const body = await req.json();
    const { scheduleId, status } = body;

    if (!scheduleId || !["approved", "rejected", "done", "pending"].includes(status)) {
      return NextResponse.json({ error: "Invalid scheduleId or status" }, { status: 400 });
    }

    const updated = await prisma.bazaarSchedule.update({
      where: { id: scheduleId },
      data: { status },
    });

    return NextResponse.json(
      { message: `Schedule updated to ${status}`, schedule: updated },
      { status: 200 }
    );
  } catch (error) {
    console.error("Bazaar Schedule PATCH Error:", error);
    return NextResponse.json(
      { error: "Failed to update schedule" },
      { status: 500 }
    );
  }
}