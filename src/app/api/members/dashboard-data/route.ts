import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user?.email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const user = await prisma.user.findUnique({ where: { email: session.user.email } });
        if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

        // ১. 💡 Total Deposit (শুধুমাত্র "Approved" স্ট্যাটাস গুলো যোগ হবে)
        const depositAgg = await prisma.deposit.aggregate({
            _sum: { amount: true },
            where: { 
                userId: user.id,
                status: "Approved" // <-- এই লাইনের কারণেই Pending টাকা যোগ হবে না 
            } 
        });
        const totalDeposit = depositAgg._sum.amount || 0;

        // ২. ইউজারের মোট মিল (Breakfast + Lunch + Dinner + Guest)
        const userMeals = await prisma.mealLog.findMany({ where: { userId: user.id } });
        const totalMeals = userMeals.reduce((acc, meal) => acc + meal.breakfast + meal.lunch + meal.dinner + meal.guest, 0);

        // ৩. মেসের মোট খরচ (শুধুমাত্র Approved হওয়া Expense গুলো)
        const expenseAgg = await prisma.expense.aggregate({
            _sum: { amount: true },
            where: { status: "Approved" } // <-- পেন্ডিং খরচ হিসেবে আসবে না
        });
        const totalMessExpense = expenseAgg._sum.amount || 0;

        // ৪. মেসের মোট মিল
        const allMeals = await prisma.mealLog.findMany();
        const totalMessMeals = allMeals.reduce((acc, meal) => acc + meal.breakfast + meal.lunch + meal.dinner + meal.guest, 0);

        // ৫. Live Meal Rate বের করা
        let liveMealRate = 0;
        if (totalMessMeals > 0) {
            liveMealRate = totalMessExpense / totalMessMeals;
        } else if (totalMessExpense > 0) {
            liveMealRate = totalMessExpense; 
        }

        // ৬. Current Balance হিসাব (জমা টাকা - মোট মিলের খরচ)
        const currentBalance = totalDeposit - (totalMeals * liveMealRate);

        // ৭. Recent Meals (শেষ ৩ দিনের)
        const recentMeals = await prisma.mealLog.findMany({
            where: { userId: user.id },
            orderBy: { date: 'desc' },
            take: 3
        });

        // ৮. Notice Board
        const notices = await prisma.notice.findMany({
            where: { isActive: true },
            orderBy: { createdAt: 'desc' }
        });

        // সব ডাটা একসাথে পাঠানো হচ্ছে
        return NextResponse.json({
            stats: {
                totalDeposit: totalDeposit,
                totalMeals: totalMeals,
                currentBalance: Math.round(currentBalance * 100) / 100, // ২ দশমিক পর্যন্ত রাউন্ড করা
                liveMealRate: Math.round(liveMealRate * 100) / 100
            },
            recentMeals,
            notices,
            defaultMeals: {
                breakfast: user.defaultBreakfast || 0,
                lunch: user.defaultLunch || 0,
                dinner: user.defaultDinner || 0
            }
        });

    } catch (error) {
        console.error("Dashboard Data Error:", error);
        return NextResponse.json({ error: "Failed to fetch dashboard data" }, { status: 500 });
    }
}