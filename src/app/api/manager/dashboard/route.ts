import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
    try {
        const session = await getServerSession();
        // 💡 রিয়েল অ্যাপ্লিকেশনে এখানে Role চেক করতে হবে (user.role === 'manager')
        
        // ১. পেন্ডিং পেমেন্ট রিকোয়েস্ট (Deposit)
        const pendingDeposits = await prisma.deposit.findMany({
            where: { status: "Pending" },
            include: { user: { select: { name: true, image: true } } },
            orderBy: { date: 'desc' }
        });

        // ২. পেন্ডিং বাজারের খরচ (Expense)
        const pendingExpenses = await prisma.expense.findMany({
            where: { status: "Pending" },
            include: { user: { select: { name: true, image: true } } },
            orderBy: { date: 'desc' }
        });

        // ৩. আজকের মোট মিল
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);

        const todayMeals = await prisma.mealLog.findMany({
            where: { date: { gte: today, lt: tomorrow } }
        });
        const totalMealsToday = todayMeals.reduce((acc, meal) => acc + meal.breakfast + meal.lunch + meal.dinner + meal.guest, 0);

        // ৪. আজকের বাজারের খরচ (যেগুলো Approved)
        const todayExpenses = await prisma.expense.findMany({
            where: { date: { gte: today, lt: tomorrow }, status: "Approved" }
        });
        const totalBazaarToday = todayExpenses.reduce((acc, exp) => acc + exp.amount, 0);

        return NextResponse.json({
            pendingDeposits,
            pendingExpenses,
            stats: {
                totalMealsToday,
                totalBazaarToday
            }
        }, { status: 200 });

    } catch (error) {
        console.error("Manager Dashboard Error:", error);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}