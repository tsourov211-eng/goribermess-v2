// app/(dashboard)/layout.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react"; // 👈 NextAuth থেকে এগুলো আনা হলো
import { useRouter } from "next/navigation";
import { useEffect } from "react";

type Role = "admin" | "manager" | "member";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const router = useRouter();

    // 💡 Session থেকে লগইন করা ইউজারের তথ্য বের করা হচ্ছে
    const { data: session, status } = useSession();

    // যদি কেউ লগইন না করে ড্যাশবোর্ডে ঢোকার চেষ্টা করে, তাকে লগইন পেজে পাঠিয়ে দেবে (Security Middleware)
    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/login");
        }
    }, [status, router]);

    // লোডিং অবস্থায় থাকলে একটি সিম্পল লোডার দেখাবে
    if (status === "loading") {
        return <div className="min-h-screen flex items-center justify-center bg-gray-50 text-orange-600 font-bold text-xl">লোড হচ্ছে...</div>;
    }

    // ইউজারের রোল এবং নাম সেশন থেকে নেওয়া হচ্ছে
    const userRole = (session?.user as any)?.role || "member";
    const userName = session?.user?.name || "ইউজার";

    const menuList = {
        admin: [
            { name: "অ্যাডমিন ওভারভিউ", path: "/admin", icon: "📊" },
            { name: "নতুন মেম্বার যুক্ত", path: "/admin/add-member", icon: "➕" },
            { name: "ফান্ড ম্যানেজমেন্ট", path: "/admin/funds", icon: "💰" },
        ],
        manager: [
            { name: "ম্যানেজার ড্যাশবোর্ড", path: "/manager", icon: "🏠" },
            { name: "দৈনন্দিন মিল আপডেট", path: "/manager/meals", icon: "🍽️" },
            { name: "বাজারের রুটিন", path: "/manager/bazaar", icon: "🛒" },
            { name: "খরচের হিসাব এন্ট্রি", path: "/manager/expenses", icon: "📝" },
        ],
        member: [
            { name: "আমার ড্যাশবোর্ড", path: "/member", icon: "👤" },
            { name: "গেস্ট মিল রিকোয়েস্ট", path: "/member/guest-meal", icon: "👥" },
            { name: "আমার ডিউটি", path: "/member/duty", icon: "🔔" },
        ],
    };

    const currentMenus = menuList[userRole as Role] || menuList.member;

    return (
        <div className="min-h-screen bg-gray-50 flex font-sans">

            <aside className="w-64 bg-white border-r border-gray-200 flex flex-col fixed h-full shadow-sm z-10">
                <div className="h-16 flex items-center px-6 border-b border-gray-200">
                    <span className="text-2xl font-extrabold text-orange-600">গড়িবের মেস</span>
                </div>

                <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
                    {currentMenus.map((menu, index) => {
                        const isActive = pathname === menu.path;
                        return (
                            <Link
                                key={index}
                                href={menu.path}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-all duration-200 ${isActive
                                    ? "bg-orange-600 text-white shadow-md"
                                    : "text-gray-600 hover:bg-orange-50 hover:text-orange-600"
                                    }`}
                            >
                                <span className="text-xl">{menu.icon}</span>
                                <span>{menu.name}</span>
                            </Link>
                        );
                    })}
                </nav>

                {/* 👇 এখানে প্রোফাইলের নাম ও লগআউট বাটন আসল ডেটা দিয়ে সাজানো হলো */}
                <div className="p-4 border-t border-gray-100 bg-gray-50">
                    <div className="flex items-center gap-3 px-4 py-2">
                        <div className="w-10 h-10 rounded-full bg-orange-200 flex items-center justify-center text-orange-700 font-bold border-2 border-white shadow-sm uppercase">
                            {userName.charAt(0)}
                        </div>
                        <div className="flex flex-col">
                            <span className="text-sm font-bold text-gray-800 truncate w-32">{userName}</span>
                            <button
                                onClick={() => signOut({ callbackUrl: '/login' })} // লগআউট ফাংশন
                                className="text-xs text-red-500 font-semibold text-left hover:underline mt-0.5"
                            >
                                লগআউট করুন
                            </button>
                        </div>
                    </div>
                </div>
            </aside>

            <main className="flex-1 ml-64 p-8">
                {children}
            </main>
        </div>
    );
}