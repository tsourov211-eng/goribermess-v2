import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user?.email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const user = await prisma.user.findUnique({ where: { email: session.user.email } });
        if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

        const body = await req.json();
        const { type, amount, note } = body;

        if (!amount || amount <= 0) {
            return NextResponse.json({ error: "Invalid amount" }, { status: 400 });
        }

        // 💡 Payment Request
        if (type === "payment") {
            const newDeposit = await prisma.deposit.create({
                data: {
                    userId: user.id,
                    amount: Number(amount),
                    note: note || "",          // ইউজারের দেওয়া নোট সেভ হবে
                    method: "Cash",            // ডিফল্ট মেথড
                    status: "Pending",         // ম্যানেজারের জন্য পেন্ডিং
                    date: new Date()
                }
            });
            return NextResponse.json({ message: "Payment request sent", data: newDeposit }, { status: 201 });
        }

        // 💡 Bazar Expense
        if (type === "expense") {
            const newExpense = await prisma.expense.create({
                data: {
                    userId: user.id,
                    amount: Number(amount),
                    description: note || "Bazar Expense", // ইউজারের দেওয়া ডিটেইলস
                    status: "Pending",                    // ম্যানেজারের জন্য পেন্ডিং
                    date: new Date(),
                }
            });
            return NextResponse.json({ message: "Expense updated", data: newExpense }, { status: 201 });
        }

        return NextResponse.json({ error: "Invalid request type" }, { status: 400 });

    } catch (error) {
        console.error("Finance API Error:", error);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}