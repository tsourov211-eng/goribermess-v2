"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { 
    IconHome, 
    IconUsers, 
    IconToolsKitchen2, 
    IconReceipt, 
    IconChartBar,
    IconSettings,
    IconMenu2, 
    IconX, 
    IconLogout,
    IconSearch,
    IconBell,
    IconChevronDown
} from "@tabler/icons-react";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const pathname = usePathname();

    // 💡 ডায়নামিক রুট ডিটেকশন (Dynamic Route Detection)
    let basePath = "admin";
    if (pathname.startsWith("/manager")) basePath = "manager";
    if (pathname.startsWith("/member")) basePath = "member";

    // 💡 ইউজারের রোল অনুযায়ী আপনার হাতে লেখা ছকের লেআউট
    const getSidebarLinks = () => {
        // ১. Admin এর লেআউট
        if (basePath === "admin") {
            return [
                { name: "Dashboard", href: "/admin", icon: IconHome },
                { name: "Members", href: "/members-list", icon: IconUsers },
                { name: "Food Management", href: "/meals", icon: IconToolsKitchen2 },
                { name: "Expenses", href: "/bazaar", icon: IconReceipt },
                { name: "Reports", href: "/reports", icon: IconChartBar },
                { name: "Settings", href: "/settings", icon: IconSettings },
            ];
        }
        
        // ২. Manager এর লেআউট (Settings নেই)
        if (basePath === "manager") {
            return [
                { name: "Dashboard", href: "/manager", icon: IconHome },
                { name: "Members", href: "/members-list", icon: IconUsers },
                { name: "Food Management", href: "/meals", icon: IconToolsKitchen2 },
                { name: "Expenses", href: "/bazaar", icon: IconReceipt },
                { name: "Reports", href: "/reports", icon: IconChartBar },
            ];
        }
        
        // ৩. Member এর লেআউট
        if (basePath === "member") {
            return [
                { name: "Dashboard", href: "/member", icon: IconHome },
                { name: "My Meals", href: "/my-meals", icon: IconToolsKitchen2 }, // আপনার ফোল্ডার ট্রি অনুযায়ী guest-meal দেওয়া হলো
                { name: "Reports", href: "/reports", icon: IconChartBar }, 
            ];
        }

        return [];
    };

    const sidebarLinks = getSidebarLinks();

    // 💡 প্রোফাইলের নাম এবং রোল ডায়নামিক করা
    let roleTitle = "Administrator";
    let userName = "Super Admin";
    
    if (basePath === "manager") { 
        roleTitle = "Mess Manager"; 
        userName = "Tanvir Ahammed"; 
    } else if (basePath === "member") { 
        roleTitle = "Mess Member"; 
        userName = "Tanvir Ahammed"; 
    }
    
    const userInitial = userName.charAt(0);

    return (
        <div className="min-h-screen bg-[#F8FAFC] bg-[url('/admin_dashboard_mobile_bg.png')] lg:bg-[url('/admin_dashboard_desktop_bg.png')] bg-cover bg-center bg-no-repeat bg-fixed flex font-sans">
            
            {/* ─── Mobile Sidebar Overlay ─── */}
            {isSidebarOpen && (
                <div 
                    className="fixed inset-0 bg-black/40 z-40 lg:hidden backdrop-blur-sm"
                    onClick={() => setIsSidebarOpen(false)}
                ></div>
            )}

            {/* ─── Sidebar ─── */}
            <aside className={`fixed inset-y-0 left-0 z-50 w-[260px] bg-white bg-[url('/sidebar_bg.png')] bg-no-repeat bg-cover bg-center border-r border-gray-100 flex flex-col transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:sticky lg:top-0 lg:h-screen shrink-0 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
                
                {/* ─── Sidebar Logo ─── */}
                <div className="pt-8 pb-6 flex items-center justify-center relative">
                    <Link href={`/${basePath}`} className="flex flex-col items-center justify-center transition-transform hover:scale-105">
                        <Image 
                            src="/logo.png" 
                            alt="Amader Mess" 
                            width={160} 
                            height={160} 
                            className="w-32 h-auto object-contain drop-shadow-sm" 
                            priority
                        />
                    </Link>
                    <button className="lg:hidden absolute top-4 right-4 text-gray-500 hover:text-orange-600" onClick={() => setIsSidebarOpen(false)}>
                        <IconX size={24} />
                    </button>
                </div>

                {/* ─── Sidebar Links ─── */}
                <nav className="flex-1 px-3 py-2 space-y-2 overflow-y-auto">
                    {sidebarLinks.map((link) => {
                        // খুব সহজে Active State চেক করার লজিক
                        const isActive = link.name === "Dashboard" 
                            ? pathname === link.href 
                            : pathname === link.href || pathname.startsWith(`${link.href}/`);
                            
                        const Icon = link.icon;
                        return (
                            <Link 
                                key={link.name} 
                                href={link.href}
                                className={`flex items-center gap-3.5 px-4 py-3.5 rounded-xl transition-all font-bold text-[15px] ${isActive ? "bg-[#FF6B00] text-white shadow-md shadow-orange-500/20" : "text-gray-600 hover:bg-orange-50 hover:text-orange-600"}`}
                            >
                                <Icon size={26} stroke={isActive ? 2.5 : 2} />
                                {link.name}
                            </Link>
                        );
                    })}
                </nav>

                {/* ─── Sidebar Bottom (Profile & Logout) ─── */}
                <div className="p-5 mt-auto relative z-10">
                    <div className="text-center mb-8">
                        <div className="flex justify-center mb-2 text-[#D98A6C]">
                           <IconToolsKitchen2 size={36} stroke={1.5} />
                        </div>
                        <p className="text-[#c36d4b] text-sm font-extrabold tracking-wide">Good Food</p>
                        <p className="text-[#d89376] text-xs font-bold mt-0.5">Better Together</p>
                    </div>
                    <div className="flex items-center gap-3 px-1 mb-5">
                        <div className="w-10 h-10 rounded-full bg-[#1e293b] flex items-center justify-center text-white font-bold text-sm shadow-md shrink-0">
                            {userInitial}
                        </div>
                        <div>
                            <p className="text-sm font-extrabold text-[#450705] leading-tight">{userName}</p>
                            <p className="text-[11px] text-gray-500 font-bold mt-0.5">{roleTitle}</p>
                        </div>
                    </div>
                    <button className="flex items-center gap-3 px-2 py-1 text-gray-600 hover:text-red-600 transition-all font-bold text-sm w-full">
                        <IconLogout size={22} stroke={2.5} />
                        Log Out
                    </button>
                </div>
            </aside>

            {/* ─── Main Content Area ─── */}
            <div className="flex-1 flex flex-col min-w-0">
                
                {/* ─── Top Navbar ─── */}
                <header className="h-20 bg-white/40 backdrop-blur-md border-b border-white/40 flex items-center justify-between px-6 lg:px-10 z-30 sticky top-0">
                    <div className="flex items-center gap-4">
                        <button 
                            className="lg:hidden p-2 -ml-2 text-gray-600 bg-white/60 hover:bg-white hover:shadow-sm rounded-lg transition-all backdrop-blur-sm"
                            onClick={() => setIsSidebarOpen(true)}
                        >
                            <IconMenu2 size={24} />
                        </button>
                    </div>
                    
                    <div className="flex items-center gap-6">
                        <div className="hidden md:flex relative w-80 items-center">
                            <IconSearch className="absolute left-3 text-gray-500 w-5 h-5 z-10" stroke={2} />
                            <input 
                                type="text" 
                                placeholder="Search members, expenses, etc..." 
                                className="w-full pl-10 pr-4 py-2.5 bg-white/60 backdrop-blur-sm border border-white/50 rounded-xl outline-none focus:ring-2 focus:ring-orange-500/50 focus:bg-white text-sm text-gray-800 shadow-sm transition-all placeholder-gray-500 font-medium"
                            />
                        </div>
                        
                        <button className="relative p-2 text-gray-600 bg-white/60 backdrop-blur-sm hover:bg-white hover:shadow-sm rounded-full transition-all border border-white/50">
                            <IconBell size={28} stroke={1.5} />
                            <span className="absolute top-1.5 right-1.5 w-4.5 h-4.5 bg-orange-600 border-2 border-white rounded-full flex items-center justify-center text-[10px] text-white font-bold">
                                3
                            </span>
                        </button>
                        
                        <div className="hidden sm:flex items-center gap-3 cursor-pointer p-1.5 pr-3 rounded-full bg-white/60 backdrop-blur-sm hover:bg-white hover:shadow-sm transition-all border border-white/50">
                            <div className="w-9 h-9 rounded-full bg-[#1e293b] flex items-center justify-center text-white font-bold text-sm shadow-sm shrink-0">
                                {userInitial}
                            </div>
                            <span className="text-sm font-bold text-[#450705]">{userName}</span>
                            <IconChevronDown size={16} className="text-gray-600" stroke={2} />
                        </div>
                    </div>
                </header>
                
                {/* ─── Page Content ─── */}
                <main className="flex-1 p-4 sm:p-6 lg:px-10 lg:pb-10 overflow-y-auto">
                    {children}
                </main>
            </div>
        </div>
    );
}