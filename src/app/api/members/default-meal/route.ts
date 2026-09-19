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

    const body = await req.json();
    const { breakfast, lunch, dinner } = body;

    await prisma.user.update({
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