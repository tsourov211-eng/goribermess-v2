// seed.ts
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
    // পাসওয়ার্ড এনক্রিপ্ট করা (যাতে ডাটাবেসে হ্যাশ হয়ে থাকে)
    const adminPassword = await bcrypt.hash("Tanvir@#", 10);
    const memberPassword = await bcrypt.hash("123456", 10);

    // ১. সুপার অ্যাডমিন ইউজার তৈরি/আপডেট করা
    const admin = await prisma.user.upsert({
        where: { email: "ourmess001@gmail.com" },
        update: {
            password: adminPassword,
            role: "admin",
            name: "Super Admin",
            phone: "01700000000",
        },
        create: {
            name: "Super Admin",
            email: "ourmess001@gmail.com",
            password: adminPassword,
            phone: "01700000000",
            role: "admin",
            defaultBreakfast: 0.5,
            defaultLunch: 1.0,
            defaultDinner: 1.0,
        },
    });

    console.log("✅ ডাটাবেসে সুপার অ্যাডমিন সফলভাবে কনফিগার হয়েছে:", admin.email);

    // ২. ডিফল্ট টেস্ট ম্যানেজার তৈরি (যদি না থাকে)
    const manager = await prisma.user.upsert({
        where: { email: "manager@gmail.com" },
        update: {
            password: memberPassword,
            role: "manager",
        },
        create: {
            name: "Mess Manager",
            email: "manager@gmail.com",
            password: memberPassword,
            phone: "01800000000",
            role: "manager",
            defaultBreakfast: 0.5,
            defaultLunch: 1.0,
            defaultDinner: 1.0,
        },
    });

    console.log("✅ ডাটাবেসে ম্যানেজার ইউজার তৈরি হয়েছে:", manager.email);

    // ৩. ডিফল্ট টেস্ট মেম্বার তৈরি (যদি না থাকে)
    const member = await prisma.user.upsert({
        where: { email: "member@gmail.com" },
        update: {
            password: memberPassword,
            role: "member",
        },
        create: {
            name: "Mess Member",
            email: "member@gmail.com",
            password: memberPassword,
            phone: "01900000000",
            role: "member",
            defaultBreakfast: 0.5,
            defaultLunch: 1.0,
            defaultDinner: 1.0,
        },
    });

    console.log("✅ ডাটাবেসে মেম্বার ইউজার তৈরি হয়েছে:", member.email);
}

main()
    .catch((e) => {
        console.error("❌ এরর:", e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });