"use client";

import Link from "next/link";
import { 
    IconReceipt2, 
    IconToolsKitchen2, 
    IconCalendarUser,
    IconPlus,
    IconArrowRight,
    IconShoppingBag,
    IconClock,
    IconUserCheck,
    IconUserPlus,
    IconRefresh
} from "@tabler/icons-react";

export default function ManagerDashboard() {
    return (
        <div className="max-w-7xl mx-auto space-y-6 lg:space-y-8">
            
            {/* ─── Greeting Section ─── */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5">
                <div>
                    <p className="text-gray-500 font-bold mb-1">Welcome back,</p>
                    <h1 className="text-2xl sm:text-4xl font-extrabold text-[#0B132B] tracking-tight">Manager Dashboard</h1>
                    <p className="text-gray-500 text-sm mt-2 font-medium">Overview of today's mess operations and quick actions.</p>
                </div>
                
                <div className="bg-white px-5 py-3 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-3 w-full sm:w-auto">
                    <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center text-orange-500 shrink-0">
                        <IconClock className="w-5 h-5" stroke={2} />
                    </div>
                    <div>
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Today</p>
                        <p className="text-sm font-extrabold text-gray-900">Friday, Sep 11</p>
                    </div>
                </div>
            </div>

            {/* ─── Top Stats (Today's Focus) ─── */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
                
                {/* Stat 1: Today's Meals */}
                <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm relative overflow-hidden flex flex-col justify-between min-h-[140px] group hover:border-orange-200 transition-colors">
                    <div className="flex justify-between items-start gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-teal-50 flex items-center justify-center text-teal-600 shrink-0">
                            <IconToolsKitchen2 className="w-6 h-6" stroke={2} />
                        </div>
                        <Link href="/manager/meals" className="text-xs font-bold text-orange-600 hover:text-orange-700 flex items-center gap-1 bg-orange-50 px-3 py-1.5 rounded-lg transition-colors">
                            Manage <IconArrowRight className="w-3 h-3" stroke={3} />
                        </Link>
                    </div>
                    <div className="mt-4 z-10">
                        <p className="text-gray-500 text-sm font-semibold mb-1">Total Meals Today</p>
                        <h3 className="text-3xl font-extrabold text-gray-900">12.5</h3>
                    </div>
                    <IconToolsKitchen2 className="absolute -bottom-4 -right-4 w-24 h-24 text-teal-50/50 transform group-hover:scale-110 transition-transform" stroke={1} />
                </div>

                {/* Stat 2: Today's Bazaar Cost */}
                <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm relative overflow-hidden flex flex-col justify-between min-h-[140px] group hover:border-orange-200 transition-colors">
                    <div className="flex justify-between items-start gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-orange-50 flex items-center justify-center text-orange-500 shrink-0">
                            <IconShoppingBag className="w-6 h-6" stroke={2} />
                        </div>
                        <Link href="/manager/bazaar" className="text-xs font-bold text-orange-600 hover:text-orange-700 flex items-center gap-1 bg-orange-50 px-3 py-1.5 rounded-lg transition-colors">
                            Manage <IconArrowRight className="w-3 h-3" stroke={3} />
                        </Link>
                    </div>
                    <div className="mt-4 z-10">
                        <p className="text-gray-500 text-sm font-semibold mb-1">Today's Bazaar</p>
                        <h3 className="text-3xl font-extrabold text-gray-900">৳ 850</h3>
                    </div>
                    <IconShoppingBag className="absolute -bottom-4 -right-4 w-24 h-24 text-orange-50/50 transform group-hover:scale-110 transition-transform" stroke={1} />
                </div>

                {/* Stat 3: Bazaar Responsibility */}
                <div className="bg-gradient-to-br from-[#0B132B] to-[#1c2a53] p-6 rounded-3xl border border-gray-800 shadow-lg relative overflow-hidden flex flex-col justify-between min-h-[140px]">
                    <div className="flex justify-between items-start gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-orange-400 shrink-0 backdrop-blur-sm">
                            <IconCalendarUser className="w-6 h-6" stroke={2} />
                        </div>
                        <span className="text-xs font-bold text-emerald-400 bg-emerald-400/10 px-3 py-1.5 rounded-lg border border-emerald-400/20">
                            Assigned
                        </span>
                    </div>
                    <div className="mt-4 z-10">
                        <p className="text-gray-400 text-sm font-semibold mb-1">Market Duty (Today)</p>
                        <h3 className="text-2xl font-extrabold text-white">Super Admin</h3>
                    </div>
                    <div className="absolute right-0 bottom-0 opacity-10">
                        <svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19l16 0"></path><path d="M4 15l4 -6l4 2l4 -5l4 4"></path></svg>
                    </div>
                </div>
            </div>

            {/* ─── Middle Section (Quick Actions & Recent) ─── */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
                {/* Quick Actions */}
                <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 sm:p-8">
                    <h2 className="text-lg font-extrabold text-gray-900 mb-6">Quick Actions</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Link href="/manager/meals" className="flex flex-col items-center justify-center gap-3 p-6 rounded-2xl border-2 border-dashed border-gray-200 hover:border-orange-500 hover:bg-orange-50/50 transition-all group">
                            <div className="w-12 h-12 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                                <IconPlus className="w-6 h-6" stroke={2.5} />
                            </div>
                            <span className="font-bold text-gray-700 group-hover:text-orange-600 transition-colors">Add Daily Meals</span>
                        </Link>
                        <Link href="/manager/bazaar" className="flex flex-col items-center justify-center gap-3 p-6 rounded-2xl border-2 border-dashed border-gray-200 hover:border-orange-500 hover:bg-orange-50/50 transition-all group">
                            <div className="w-12 h-12 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                                <IconReceipt2 className="w-6 h-6" stroke={2.5} />
                            </div>
                            <span className="font-bold text-gray-700 group-hover:text-orange-600 transition-colors">Entry Expense</span>
                        </Link>
                    </div>
                </div>

                {/* Recent Expenses List */}
                <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 sm:p-8 flex flex-col">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-lg font-extrabold text-gray-900">Recent Market</h2>
                        <Link href="/manager/bazaar" className="text-sm font-bold text-orange-600 hover:text-orange-700">
                            View All
                        </Link>
                    </div>
                    <div className="flex-1 space-y-4">
                        <div className="flex items-center justify-between p-4 rounded-2xl bg-gray-50 border border-gray-100 hover:bg-white hover:shadow-sm hover:border-orange-100 transition-all cursor-pointer">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center font-bold text-sm shrink-0">R</div>
                                <div>
                                    <h4 className="font-extrabold text-gray-900 text-sm">Rajib</h4>
                                    <p className="text-xs font-medium text-gray-500 mt-0.5">Sep 10, Thursday</p>
                                </div>
                            </div>
                            <span className="font-extrabold text-red-600 text-base">৳ 850</span>
                        </div>
                        <div className="flex items-center justify-between p-4 rounded-2xl bg-gray-50 border border-gray-100 hover:bg-white hover:shadow-sm hover:border-orange-100 transition-all cursor-pointer">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-sm shrink-0">S</div>
                                <div>
                                    <h4 className="font-extrabold text-gray-900 text-sm">Super Admin</h4>
                                    <p className="text-xs font-medium text-gray-500 mt-0.5">Sep 09, Wednesday</p>
                                </div>
                            </div>
                            <span className="font-extrabold text-red-600 text-base">৳ 1,200</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* ─── NEW: Monthly Bazaar Roster (Assign & Approve) ─── */}
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden flex flex-col">
                <div className="p-6 sm:p-8 border-b border-gray-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-[#F8FAFC]">
                    <div>
                        <h2 className="text-lg font-extrabold text-gray-900 flex items-center gap-2">
                            <IconCalendarUser className="w-6 h-6 text-orange-500" stroke={2} />
                            Monthly Bazaar Roster
                        </h2>
                        <p className="text-sm font-bold text-gray-500 mt-1">Assign members or approve their requested dates for September.</p>
                    </div>
                    <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
                        {/* Notice Tag */}
                        <span className="bg-emerald-50 text-emerald-600 border border-emerald-100 text-[11px] font-extrabold px-3 py-1.5 rounded-lg uppercase tracking-wider flex items-center gap-1">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> Member Selection Open
                        </span>
                        {/* Auto Assign Button */}
                        <button className="flex items-center gap-2 text-sm font-bold bg-gray-50 hover:bg-gray-100 text-gray-700 border border-gray-200 px-4 py-2.5 rounded-xl transition-all">
                            <IconRefresh className="w-4 h-4" stroke={2} />
                            Auto Fill Empty
                        </button>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[700px]">
                        <thead>
                            <tr className="bg-white border-b border-gray-100">
                                <th className="py-4 px-6 text-xs font-extrabold text-gray-500 uppercase tracking-wider">Date</th>
                                <th className="py-4 px-6 text-xs font-extrabold text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="py-4 px-6 text-xs font-extrabold text-gray-500 uppercase tracking-wider">Member Name</th>
                                <th className="py-4 px-6 text-xs font-extrabold text-gray-500 uppercase tracking-wider text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            
                            {/* Row 1: Already Assigned */}
                            <tr className="hover:bg-gray-50/50 transition-colors">
                                <td className="py-4 px-6 whitespace-nowrap">
                                    <p className="font-extrabold text-gray-900 text-sm">Sep 12, Saturday</p>
                                </td>
                                <td className="py-4 px-6 whitespace-nowrap">
                                    <span className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-lg text-xs font-bold border border-emerald-100">
                                        <IconUserCheck className="w-3.5 h-3.5" stroke={2.5} /> Assigned
                                    </span>
                                </td>
                                <td className="py-4 px-6 whitespace-nowrap">
                                    <div className="flex items-center gap-3">
                                        <div className="w-7 h-7 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center font-bold text-xs shrink-0">R</div>
                                        <span className="font-extrabold text-gray-900 text-sm">Rajib</span>
                                    </div>
                                </td>
                                <td className="py-4 px-6 whitespace-nowrap text-right">
                                    <button className="text-xs font-bold text-gray-500 hover:text-orange-600 transition-colors">Change</button>
                                </td>
                            </tr>

                            {/* Row 2: Member Requested (Pending Approval) */}
                            <tr className="hover:bg-gray-50/50 transition-colors bg-orange-50/20">
                                <td className="py-4 px-6 whitespace-nowrap">
                                    <p className="font-extrabold text-gray-900 text-sm">Sep 13, Sunday</p>
                                </td>
                                <td className="py-4 px-6 whitespace-nowrap">
                                    <span className="inline-flex items-center gap-1.5 bg-amber-50 text-amber-700 px-2.5 py-1 rounded-lg text-xs font-bold border border-amber-200">
                                        <IconClock className="w-3.5 h-3.5" stroke={2.5} /> Member Requested
                                    </span>
                                </td>
                                <td className="py-4 px-6 whitespace-nowrap">
                                    <div className="flex items-center gap-3">
                                        <div className="w-7 h-7 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-xs shrink-0">T</div>
                                        <span className="font-extrabold text-gray-900 text-sm">Tanvir Ahammed</span>
                                    </div>
                                </td>
                                <td className="py-4 px-6 whitespace-nowrap text-right">
                                    <div className="flex justify-end gap-2">
                                        <button className="bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold px-3 py-1.5 rounded-lg transition-colors">Approve</button>
                                        <button className="bg-gray-100 hover:bg-red-50 hover:text-red-600 text-gray-600 text-xs font-bold px-3 py-1.5 rounded-lg transition-colors">Deny</button>
                                    </div>
                                </td>
                            </tr>

                            {/* Row 3: Open Slot */}
                            <tr className="hover:bg-gray-50/50 transition-colors">
                                <td className="py-4 px-6 whitespace-nowrap">
                                    <p className="font-extrabold text-gray-900 text-sm">Sep 14, Monday</p>
                                </td>
                                <td className="py-4 px-6 whitespace-nowrap">
                                    <span className="inline-flex items-center gap-1.5 bg-gray-100 text-gray-600 px-2.5 py-1 rounded-lg text-xs font-bold border border-gray-200">
                                        Open Slot
                                    </span>
                                </td>
                                <td className="py-4 px-6 whitespace-nowrap">
                                    <span className="text-gray-400 text-sm font-bold">--</span>
                                </td>
                                <td className="py-4 px-6 whitespace-nowrap text-right">
                                    <button className="flex items-center justify-end gap-1.5 ml-auto text-xs font-bold text-[#FF6B00] hover:text-orange-700 bg-orange-50 hover:bg-orange-100 px-3 py-1.5 rounded-lg transition-colors">
                                        <IconUserPlus className="w-3.5 h-3.5" stroke={2.5} /> Assign Member
                                    </button>
                                </td>
                            </tr>

                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    );
}