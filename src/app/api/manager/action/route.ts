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
    const { id, type, action } = body; // action = "Approve" or "Reject"

    const newStatus = action === "Approve" ? "Approved" : "Rejected";

    if (type === "deposit") {
      await prisma.deposit.update({
        where: { id: id },
        data: { status: newStatus },
      });
    } else if (type === "expense") {
      await prisma.expense.update({
        where: { id: id },
        data: { status: newStatus },
      });
    } else {
      return NextResponse.json({ error: "Invalid type" }, { status: 400 });
    }

    return NextResponse.json(
      { message: `Successfully ${newStatus}` },
      { status: 200 }
    );
  } catch (error) {
    console.error("Action API Error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}