import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

// To fetch list of all users and dashboard stats
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 1. Fetch all users along with their approved deposits and meal logs
    const users = await prisma.user.findMany({
      orderBy: { role: "asc" },
      include: {
        deposits: { where: { status: "Approved" } },
        meals: true,
      },
    });

    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999);

    // 2. Total mess expenses (Approved expenses)
    const expenseAggThisMonth = await prisma.expense.aggregate({
      _sum: { amount: true },
      where: { 
        status: "Approved",
        date: { gte: startOfMonth, lte: endOfMonth }
      },
    });
    const totalFoodCostThisMonth = expenseAggThisMonth._sum.amount || 0;

    const expenseAggAllTime = await prisma.expense.aggregate({
      _sum: { amount: true },
      where: { status: "Approved" },
    });
    const totalFoodCostAllTime = expenseAggAllTime._sum.amount || 0;

    // 3. Total mess meals
    const allMeals = await prisma.mealLog.findMany();
    const totalMessMeals = allMeals.reduce(
      (acc, m) => acc + m.breakfast + m.lunch + m.dinner + m.guest,
      0
    );

    // 4. Live meal rate
    const liveMealRate = totalMessMeals > 0 ? totalFoodCostAllTime / totalMessMeals : 0;

    // 5. Total deposited money
    const depositAgg = await prisma.deposit.aggregate({
      _sum: { amount: true },
      where: { status: "Approved" },
    });
    const totalDeposits = depositAgg._sum.amount || 0;

    // 6. Mess fund (Total deposit - Total expense)
    const messFund = totalDeposits - totalFoodCostAllTime;
    
    // Calculate approved users count
    const approvedUsersCount = users.filter(u => ["member", "manager", "admin"].includes(u.role)).length;

    // 7. Calculate each user's deposit, meal and balance
    const formattedUsers = users.map((u) => {
      const userDeposit = u.deposits.reduce((acc, d) => acc + d.amount, 0);
      const userMeals = u.meals.reduce(
        (acc, m) => acc + m.breakfast + m.lunch + m.dinner + m.guest,
        0
      );
      const userCost = userMeals * liveMealRate;
      const userBalance = userDeposit - userCost;

      return {
        id: u.id,
        name: u.name || "Unnamed",
        email: u.email,
        phone: u.phone || "N/A",
        image: u.image,
        role: u.role,
        deposit: Math.round(userDeposit * 100) / 100,
        totalMeals: Math.round(userMeals * 10) / 10,
        balance: Math.round(userBalance * 100) / 100,
        status: u.role === "pending" ? "Pending" : u.role === "suspended" ? "Suspended" : "Active",
      };
    });

    return NextResponse.json(
      {
        users: formattedUsers,
        stats: {
          totalMembers: approvedUsersCount,
          totalFoodCost: Math.round(totalFoodCostThisMonth * 100) / 100,
          messFund: Math.round(messFund * 100) / 100,
          totalMessMeals: Math.round(totalMessMeals * 10) / 10,
          liveMealRate: Math.round(liveMealRate * 100) / 100,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Admin Users GET Error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// To update user's role or info
export async function PATCH(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { userId, newRole, name, phone } = await req.json();

    if (!userId) {
      return NextResponse.json({ error: "Missing userId" }, { status: 400 });
    }

    const dataToUpdate: any = {};
    if (newRole) dataToUpdate.role = newRole;
    if (name) dataToUpdate.name = name;
    if (phone !== undefined) dataToUpdate.phone = phone;

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: dataToUpdate,
    });

    return NextResponse.json(
      { message: "User updated successfully", user: updatedUser },
      { status: 200 }
    );
  } catch (error) {
    console.error("Admin Users PATCH Error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// For admin to add a new member
export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { name, email, phone, role, password } = body;

    if (!name || !email) {
      return NextResponse.json(
        { error: "Name and email are required" },
        { status: 400 }
      );
    }

    const normalizedEmail = email.trim().toLowerCase();
    const existing = await prisma.user.findUnique({
      where: { email: normalizedEmail },
    });

    if (existing) {
      return NextResponse.json(
        { error: "A user with this email already exists!" },
        { status: 400 }
      );
    }

    const plainPassword = password || "123456";
    const hashedPassword = await bcrypt.hash(plainPassword, 10);

    const newUser = await prisma.user.create({
      data: {
        name: name.trim(),
        email: normalizedEmail,
        phone: phone?.trim() || "",
        password: hashedPassword,
        role: role || "member",
        defaultBreakfast: 0.5,
        defaultLunch: 1.0,
        defaultDinner: 1.0,
      },
    });

    return NextResponse.json(
      { message: "Member created successfully!", user: newUser },
      { status: 201 }
    );
  } catch (error) {
    console.error("Admin Users POST Error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// To delete a user
export async function DELETE(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json({ error: "Missing userId" }, { status: 400 });
    }

    await prisma.user.delete({
      where: { id: userId },
    });

    return NextResponse.json(
      { message: "User deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Admin Users DELETE Error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}