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

const sidebarLinks = [
    { name: "Dashboard", href: "/admin", icon: IconHome },
    { name: "Members", href: "/admin/members-list", icon: IconUsers },
    { name: "Food Management", href: "/manager/meals", icon: IconToolsKitchen2 },
    { name: "Expenses", href: "/manager/bazaar", icon: IconReceipt },
    { name: "Reports", href: "/admin/reports", icon: IconChartBar },
    { name: "Settings", href: "/admin/settings", icon: IconSettings },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const pathname = usePathname();

    return (
        // মোবাইলের জন্য dashboard_mobile_bg.png এবং ডেস্কটপের জন্য admin_dashboard_desktop_bg.png ব্যবহার করা হয়েছে
        <div className="min-h-screen bg-[#F8FAFC] bg-[url('/admin_dashboard_mobile_bg.png')] lg:bg-[url('/admin_dashboard_desktop_bg.png')] bg-cover bg-center bg-no-repeat bg-fixed flex font-sans">
            
            {/* ─── Mobile Sidebar Overlay ─── */}
            {isSidebarOpen && (
                <div 
                    className="fixed inset-0 bg-black/40 z-40 lg:hidden backdrop-blur-sm"
                    onClick={() => setIsSidebarOpen(false)}
                ></div>
            )}

            {/* ─── Sidebar (Updated with Sticky behavior) ─── */}
            <aside className={`fixed inset-y-0 left-0 z-50 w-[260px] bg-white bg-[url('/sidebar_bg.png')] bg-no-repeat bg-cover bg-center border-r border-gray-100 flex flex-col transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:sticky lg:top-0 lg:h-screen shrink-0 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
                
                {/* ─── Sidebar Logo ─── */}
                <div className="pt-8 pb-6 flex items-center justify-center relative">
                    <Link href="/admin" className="flex flex-col items-center justify-center transition-transform hover:scale-105">
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

                {/* ─── Sidebar Links (Fixed Active State) ─── */}
                <nav className="flex-1 px-3 py-2 space-y-2 overflow-y-auto">
                    {sidebarLinks.map((link) => {
                        // FIX: Dashboard should only be active on exact match, others can match prefix
                        const isActive = link.href === "/admin" 
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
                            S
                        </div>
                        <div>
                            <p className="text-sm font-extrabold text-[#450705] leading-tight">Super Admin</p>
                            <p className="text-[11px] text-gray-500 font-bold mt-0.5">Administrator</p>
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
                
                {/* ─── Top Navbar (Glassmorphism / Fog Effect) ─── */}
                <header className="h-20 bg-white/40 backdrop-blur-md border-b border-white/40 flex items-center justify-between px-6 lg:px-10 z-30 sticky top-0">
                    <div className="flex items-center gap-4">
                        <button 
                            className="lg:hidden p-2 -ml-2 text-gray-600 bg-white/60 hover:bg-white hover:shadow-sm rounded-lg transition-all backdrop-blur-sm"
                            onClick={() => setIsSidebarOpen(true)}
                        >
                            <IconMenu2 size={24} />
                        </button>
                    </div>
                    
                    {/* Right Section: Search & Profile */}
                    <div className="flex items-center gap-6">
                        
                        {/* Search Bar */}
                        <div className="hidden md:flex relative w-80 items-center">
                            <IconSearch className="absolute left-3 text-gray-500 w-5 h-5 z-10" stroke={2} />
                            <input 
                                type="text" 
                                placeholder="Search members, expenses, etc..." 
                                className="w-full pl-10 pr-4 py-2.5 bg-white/60 backdrop-blur-sm border border-white/50 rounded-xl outline-none focus:ring-2 focus:ring-orange-500/50 focus:bg-white text-sm text-gray-800 shadow-sm transition-all placeholder-gray-500 font-medium"
                            />
                        </div>
                        
                        {/* Notification Bell */}
                        <button className="relative p-2 text-gray-600 bg-white/60 backdrop-blur-sm hover:bg-white hover:shadow-sm rounded-full transition-all border border-white/50">
                            <IconBell size={28} stroke={1.5} />
                            <span className="absolute top-1.5 right-1.5 w-4.5 h-4.5 bg-orange-600 border-2 border-white rounded-full flex items-center justify-center text-[10px] text-white font-bold">
                                3
                            </span>
                        </button>
                        
                        {/* Top Navbar User Profile */}
                        <div className="hidden sm:flex items-center gap-3 cursor-pointer p-1.5 pr-3 rounded-full bg-white/60 backdrop-blur-sm hover:bg-white hover:shadow-sm transition-all border border-white/50">
                            <div className="w-9 h-9 rounded-full bg-[#1e293b] flex items-center justify-center text-white font-bold text-sm shadow-sm shrink-0">
                                S
                            </div>
                            <span className="text-sm font-bold text-[#450705]">Super Admin</span>
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