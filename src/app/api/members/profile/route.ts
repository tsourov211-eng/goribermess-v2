import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: {
        deposits: { where: { status: "Approved" } },
        meals: true,
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const totalDeposit = user.deposits.reduce((acc, curr) => acc + curr.amount, 0);
    const totalMeals = user.meals.reduce(
      (acc, meal) => acc + meal.breakfast + meal.lunch + meal.dinner + meal.guest,
      0
    );

    return NextResponse.json(
      {
        profile: {
          name: user.name,
          email: user.email,
          phone: user.phone || "",
          address: user.address || "",
          image: user.image,
          defaultBreakfast: user.defaultBreakfast,
          defaultLunch: user.defaultLunch,
          defaultDinner: user.defaultDinner,
        },
        stats: {
          totalDeposit,
          totalMeals,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Profile GET API Error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { name, phone, address, defaultBreakfast, defaultLunch, defaultDinner } = body;

    const updatedUser = await prisma.user.update({
      where: { email: session.user.email },
      data: {
        name,
        phone,
        address,
        defaultBreakfast: Number(defaultBreakfast),
        defaultLunch: Number(defaultLunch),
        defaultDinner: Number(defaultDinner),
      },
    });

    return NextResponse.json(
      { message: "Profile updated successfully", data: updatedUser },
      { status: 200 }
    );
  } catch (error) {
    console.error("Profile PUT API Error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}