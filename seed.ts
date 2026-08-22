// seed.ts
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
    // পাসওয়ার্ড এনক্রিপ্ট করা (যাতে ডাটাবেসে হ্যাশ হয়ে থাকে)
    const hashedPassword = await bcrypt.hash("123456", 10);

    // অ্যাডমিন ইউজার তৈরি করা
    const admin = await prisma.user.upsert({
        where: { email: "admin@gmail.com" },
        update: {}, // যদি আগে থেকেই থাকে, তবে কিছু পরিবর্তন করবে না
        create: {
            name: "Super Admin",
            email: "admin@gmail.com",
            password: hashedPassword,
            phone: "01700000000",
            role: "admin", // রোল দিলাম অ্যাডমিন
            deposit: 5000,
        },
    });

    console.log("✅ ডাটাবেসে অ্যাডমিন ইউজার তৈরি হয়েছে:", admin.email);
}

main()
    .catch((e) => {
        console.error("❌ এরর:", e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });