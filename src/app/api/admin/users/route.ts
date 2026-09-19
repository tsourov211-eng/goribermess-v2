import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// সব ইউজারদের লিস্ট আনার জন্য
export async function GET() {
    try {
        const session = await getServerSession();
        // 💡 রিয়েল অ্যাপে চেক করতে হবে: if (session.user.role !== 'admin') return Error

        const users = await prisma.user.findMany({
            orderBy: { role: 'asc' }, // admin, manager, member ক্রমানুসারে আসবে
            select: {
                id: true,
                name: true,
                email: true,
                image: true,
                role: true,
                phone: true,
            }
        });

        return NextResponse.json({ users }, { status: 200 });
    } catch (error) {
        console.error("Admin Users GET Error:", error);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}

// ইউজারের রোল আপডেট করার জন্য
export async function PATCH(req: Request) {
    try {
        const session = await getServerSession();
        const { userId, newRole } = await req.json();

        if (!userId || !newRole) {
            return NextResponse.json({ error: "Missing data" }, { status: 400 });
        }

        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data: { role: newRole }
        });

        return NextResponse.json({ message: "Role updated successfully", user: updatedUser }, { status: 200 });
    } catch (error) {
        console.error("Admin Users PATCH Error:", error);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}