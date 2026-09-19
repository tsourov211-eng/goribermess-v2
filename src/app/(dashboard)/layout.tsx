"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react"; 
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
    IconChevronDown,
    IconUser 
} from "@tabler/icons-react";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [isNotifOpen, setIsNotifOpen] = useState(false);

    const [notices, setNotices] = useState<any[]>([]);

    const pathname = usePathname();
    const { data: session, status } = useSession(); 

    useEffect(() => {
        const fetchNotices = async () => {
            try {
                const res = await fetch("/api/members/dashboard-data");
                if (res.ok) {
                    const data = await res.json();
                    setNotices(data.notices || []);
                }
            } catch (error) {
                console.error("Error fetching notices in layout:", error);
            }
        };

        if (status === "authenticated") {
            fetchNotices();
        }
    }, [status]);

    // 💡 ইউজারের সঠিক রোল ডিটেকশন (সেশন থেকে, ফলব্যাক পাথনেম)
    const sessionRole = (session?.user as { role?: string })?.role;
    let basePath = sessionRole || "member";
    if (!sessionRole) {
        if (pathname.startsWith("/admin")) basePath = "admin";
        else if (pathname.startsWith("/manager")) basePath = "manager";
        else basePath = "member";
    }

    const getSidebarLinks = () => {
        if (basePath === "admin") {
            return [
                { name: "Dashboard", href: "/admin", icon: IconHome },
                { name: "Members", href: "/members-list", icon: IconUsers },
                { name: "Food Management", href: "/meals", icon: IconToolsKitchen2 },
                { name: "Expenses", href: "/bazaar", icon: IconReceipt },
                { name: "Reports", href: "/reports", icon: IconChartBar },
                { name: "My Profile", href: `/${basePath}/profile`, icon: IconUser }, 
                { name: "Settings", href: "/settings", icon: IconSettings },
            ];
        }
        
        if (basePath === "manager") {
            return [
                { name: "Dashboard", href: "/manager", icon: IconHome },
                { name: "Members", href: "/members-list", icon: IconUsers },
                { name: "Food Management", href: "/meals", icon: IconToolsKitchen2 },
                { name: "Expenses", href: "/bazaar", icon: IconReceipt },
                { name: "Reports", href: "/reports", icon: IconChartBar },
                { name: "My Profile", href: `/${basePath}/profile`, icon: IconUser }, 
            ];
        }
        
        if (basePath === "member") {
            return [
                { name: "Dashboard", href: "/member", icon: IconHome },
                { name: "My Meals", href: "/member/my-meals", icon: IconToolsKitchen2 }, 
                { name: "Reports", href: "/member/reports", icon: IconChartBar }, 
                { name: "My Profile", href: `/${basePath}/profile`, icon: IconUser }, 
            ];
        }

        return [];
    };

    const sidebarLinks = getSidebarLinks();

    let roleTitle = "Administrator";
    if (basePath === "manager") { 
        roleTitle = "Mess Manager"; 
    } else if (basePath === "member") { 
        roleTitle = "Mess Member"; 
    }

    const displayName = session?.user?.name || "Member";
    const userInitial = displayName.charAt(0);

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
                
                <div className="pt-8 pb-6 flex items-center justify-center relative">
                    <Link href={`/${basePath}`} className="flex flex-col items-center justify-center transition-transform hover:scale-105 cursor-pointer">
                        <Image src="/logo.png" alt="Amader Mess" width={160} height={160} className="w-32 h-auto object-contain drop-shadow-sm" priority />
                    </Link>
                    <button className="lg:hidden absolute top-4 right-4 text-gray-500 hover:text-orange-600 cursor-pointer" onClick={() => setIsSidebarOpen(false)}>
                        <IconX size={24} />
                    </button>
                </div>

                <nav className="flex-1 px-3 py-2 space-y-2 overflow-y-auto">
                    {sidebarLinks.map((link) => {
                        const isActive = link.name === "Dashboard" 
                            ? pathname === link.href 
                            : pathname === link.href || pathname.startsWith(`${link.href}/`);
                            
                        const Icon = link.icon;
                        return (
                            <Link 
                                key={link.name} 
                                href={link.href}
                                className={`flex items-center gap-3.5 px-4 py-3.5 rounded-xl transition-all font-bold text-[15px] cursor-pointer ${isActive ? "bg-[#FF6B00] text-white shadow-md shadow-orange-500/20" : "text-gray-600 hover:bg-orange-50 hover:text-orange-600"}`}
                            >
                                <Icon size={26} stroke={isActive ? 2.5 : 2} />
                                {link.name}
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-5 mt-auto relative z-10">
                    <div className="text-center mb-8">
                        <div className="flex justify-center mb-2 text-[#D98A6C]">
                           <IconToolsKitchen2 size={36} stroke={1.5} />
                        </div>
                        <p className="text-[#c36d4b] text-sm font-extrabold tracking-wide">Good Food</p>
                        <p className="text-[#d89376] text-xs font-bold mt-0.5">Better Together</p>
                    </div>
                    
                    <div className="flex items-center gap-3 px-1 mb-5">
                        {session?.user?.image ? (
                            <Image src={session.user.image} alt="Profile" width={40} height={40} className="rounded-full shadow-md shrink-0 border-2 border-white" />
                        ) : (
                            <div className="w-10 h-10 rounded-full bg-[#1e293b] flex items-center justify-center text-white font-bold text-sm shadow-md shrink-0">
                                {userInitial}
                            </div>
                        )}
                        <div className="overflow-hidden">
                            <p className="text-sm font-extrabold text-[#450705] leading-tight truncate">{displayName}</p>
                            <p className="text-[11px] text-gray-500 font-bold mt-0.5">{roleTitle}</p>
                        </div>
                    </div>
                    
                    <button 
                        onClick={() => signOut({ callbackUrl: "/" })}
                        className="flex items-center gap-3 px-2 py-1 text-gray-600 hover:text-red-600 transition-all font-bold text-sm w-full cursor-pointer"
                    >
                        <IconLogout size={22} stroke={2.5} />
                        Log Out
                    </button>
                </div>
            </aside>

            {/* ─── Main Content Area ─── */}
            <div className="flex-1 flex flex-col min-w-0 relative">
                
                {/* ─── Top Navbar ─── */}
                <header className="h-20 bg-white/40 backdrop-blur-md border-b border-white/40 flex items-center justify-between px-4 sm:px-6 lg:px-10 z-30 sticky top-0">
                    <div className="flex items-center gap-4">
                        <button 
                            className="lg:hidden p-2 text-gray-600 bg-white/60 hover:bg-white hover:shadow-sm rounded-lg transition-all backdrop-blur-sm cursor-pointer"
                            onClick={() => setIsSidebarOpen(true)}
                        >
                            <IconMenu2 size={24} />
                        </button>
                    </div>
                    
                    <div className="flex items-center gap-4 sm:gap-6">
                        <div className="hidden md:flex relative w-80 items-center">
                            <IconSearch className="absolute left-3 text-gray-500 w-5 h-5 z-10" stroke={2} />
                            <input 
                                type="text" 
                                placeholder="Search members, expenses, etc..." 
                                className="w-full pl-10 pr-4 py-2.5 bg-white/60 backdrop-blur-sm border border-white/50 rounded-xl outline-none focus:ring-2 focus:ring-orange-500/50 focus:bg-white text-sm text-gray-800 shadow-sm transition-all placeholder-gray-500 font-medium"
                            />
                        </div>
                        
                        {/* ─── Notification Dropdown ─── */}
                        <div className="relative">
                            <button 
                                onClick={() => { setIsNotifOpen(!isNotifOpen); setIsProfileOpen(false); }}
                                className="relative p-2.5 text-gray-600 bg-white/80 backdrop-blur-md hover:bg-white rounded-full transition-all border border-white/80 shadow-md shadow-gray-200/50 hover:shadow-lg cursor-pointer"
                            >
                                <IconBell size={24} stroke={2} />
                                {notices.length > 0 && (
                                    <span className="absolute top-1 right-1 w-4 h-4 bg-orange-600 border-2 border-white rounded-full flex items-center justify-center text-[9px] text-white font-bold shadow-sm">
                                        {notices.length}
                                    </span>
                                )}
                            </button>

                            {isNotifOpen && (
                                <div className="absolute right-0 mt-3 w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-50">
                                    <div className="p-4 border-b border-gray-50 bg-[#F8FAFC] flex justify-between items-center">
                                        <span className="font-extrabold text-sm text-gray-800">Notifications</span>
                                        <span className="text-[10px] text-orange-600 font-bold">{notices.length} New</span>
                                    </div>
                                    <div className="max-h-72 overflow-y-auto p-2 space-y-1">
                                        {notices.length === 0 ? (
                                            <p className="text-center text-xs text-gray-400 py-6 font-medium">No new notifications</p>
                                        ) : (
                                            notices.map((n, idx) => (
                                                <div key={idx} className="p-3 hover:bg-orange-50 rounded-xl cursor-pointer transition-colors border-b border-gray-50 last:border-0">
                                                    <p className="text-xs font-bold text-gray-800">{n.title}</p>
                                                    <p className="text-[11px] text-gray-500 mt-0.5 line-clamp-1">{n.description}</p>
                                                </div>
                                            ))
                                        )}
                                    </div>
                                    <div className="p-2 border-t border-gray-50 text-center">
                                        <button onClick={() => setIsNotifOpen(false)} className="text-xs font-bold text-orange-600 hover:underline cursor-pointer">Close</button>
                                    </div>
                                </div>
                            )}
                        </div>
                        
                        {/* ─── Profile Dropdown ─── */}
                        <div className="relative">
                            <div 
                                onClick={() => { setIsProfileOpen(!isProfileOpen); setIsNotifOpen(false); }}
                                className="flex items-center gap-2 sm:gap-3 cursor-pointer p-1.5 sm:pr-3.5 rounded-full bg-white/80 backdrop-blur-md hover:bg-white transition-all border border-white/80 shadow-md shadow-gray-200/50 hover:shadow-lg"
                            >
                                {session?.user?.image ? (
                                    <Image src={session.user.image} alt="Profile" width={34} height={34} className="rounded-full shadow-inner shrink-0" />
                                ) : (
                                    <div className="w-8 h-8 rounded-full bg-[#1e293b] flex items-center justify-center text-white font-bold text-sm shadow-inner shrink-0">
                                        {userInitial}
                                    </div>
                                )}
                                <span className="hidden sm:block text-sm font-bold text-[#450705] truncate max-w-[120px]">
                                    {displayName.split(" ")[0]}
                                </span>
                                <IconChevronDown size={16} className={`text-gray-600 transition-transform hidden sm:block ${isProfileOpen ? "rotate-180" : ""}`} stroke={2} />
                            </div>

                            {isProfileOpen && (
                                <div className="absolute right-0 mt-3 w-56 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-50">
                                    <div className="p-4 border-b border-gray-50 bg-[#F8FAFC]">
                                        <p className="text-sm font-extrabold text-gray-900 truncate">{displayName}</p>
                                        <p className="text-xs font-medium text-gray-500 truncate mt-0.5">{session?.user?.email || "Member"}</p>
                                    </div>
                                    <div className="p-2 space-y-1">
                                        {/* 💡 My Profile Link (Fixed to dynamic basePath) */}
                                        <Link 
                                            href={`/${basePath}/profile`} 
                                            onClick={() => setIsProfileOpen(false)}
                                            className="flex items-center gap-3 px-3 py-2 text-sm font-bold text-gray-600 hover:bg-orange-50 hover:text-orange-600 rounded-xl cursor-pointer transition-colors"
                                        >
                                            <IconUser size={18} stroke={2} /> My Profile
                                        </Link>
                                        {/* 💡 Settings Link */}
                                        <Link 
                                            href={`/${basePath}`} 
                                            onClick={() => setIsProfileOpen(false)}
                                            className="flex items-center gap-3 px-3 py-2 text-sm font-bold text-gray-600 hover:bg-orange-50 hover:text-orange-600 rounded-xl cursor-pointer transition-colors"
                                        >
                                            <IconSettings size={18} stroke={2} /> Settings
                                        </Link>
                                    </div>
                                    <div className="p-2 border-t border-gray-50">
                                        <button 
                                            onClick={() => signOut({ callbackUrl: "/" })}
                                            className="w-full flex items-center gap-3 px-3 py-2 text-sm font-bold text-red-600 hover:bg-red-50 rounded-xl cursor-pointer transition-colors cursor-pointer"
                                        >
                                            <IconLogout size={18} stroke={2} /> Log Out
                                        </button>
                                    </div>
                                </div>
                            )}
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