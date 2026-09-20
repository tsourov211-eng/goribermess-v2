import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function PATCH(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Verify admin-only privileges (only admin can approve/reject member requests)
    const adminUser = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!adminUser || adminUser.role !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const body = await req.json();
    const { userId, action } = body;

    if (!userId || !["approve", "reject"].includes(action)) {
      return NextResponse.json({ error: "Invalid action" }, { status: 400 });
    }

    if (action === "approve") {
      const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: { role: "member" },
      });
      return NextResponse.json({ message: "Member approved successfully", user: updatedUser }, { status: 200 });
    } else {
      await prisma.user.delete({
        where: { id: userId },
      });
      return NextResponse.json({ message: "Member rejected successfully" }, { status: 200 });
    }
  } catch (error) {
    console.error("Error approving member:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
