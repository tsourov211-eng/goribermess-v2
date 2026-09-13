"use client";

import { useState } from "react";
import Link from "next/link";
import { 
    IconWallet, 
    IconToolsKitchen2, 
    IconCalendarUser,
    IconClock,
    IconBell,
    IconReceipt2,
    IconCheck,
    IconAlertCircle,
    IconCalculator,
    IconX,
    IconPlus,
    IconDeviceFloppy,
    IconUsersGroup,
    IconAdjustmentsHorizontal
} from "@tabler/icons-react";

export default function MemberDashboard() {
    const [selectedDates, setSelectedDates] = useState<string[]>([]);
    const [currentDate, setCurrentDate] = useState("");

    const handleAddDate = () => {
        if (currentDate && !selectedDates.includes(currentDate)) {
            setSelectedDates([...selectedDates, currentDate]);
            setCurrentDate("");
        }
    };

    const handleRemoveDate = (dateToRemove: string) => {
        setSelectedDates(selectedDates.filter(date => date !== dateToRemove));
    };

    return (
        <div className="max-w-7xl mx-auto space-y-6 lg:space-y-8">
            
            {/* ─── Greeting Section ─── */}
            <div className="space-y-4">
                
                {/* Welcome Text & Date Box */}
                <div className="flex justify-between items-start gap-4">
                    <div>
                        <p className="text-gray-500 font-bold mb-1">Welcome back,</p>
                        <h1 className="text-2xl sm:text-4xl font-extrabold text-[#0B132B] tracking-tight">Tanvir Ahammed</h1>
                    </div>
                    
                    {/* Date Box (Top Right) */}
                    <div className="bg-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl border border-gray-100 shadow-sm shrink-0 text-right">
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">Today</p>
                        <p className="text-xs sm:text-sm font-extrabold text-gray-800">13 Sep, '26</p>
                    </div>
                </div>
                
                <p className="text-gray-500 text-sm font-medium">Here is your current mess status and upcoming schedule.</p>
                
                {/* Notification Box */}
                <div className="bg-orange-50/60 px-4 py-3 sm:px-5 sm:py-3.5 rounded-2xl border border-orange-200 shadow-sm flex items-center gap-3 w-full">
                    <div className="w-10 h-10 rounded-xl bg-white border border-orange-100 flex items-center justify-center text-orange-500 shrink-0 shadow-sm">
                        <IconBell className="w-5 h-5" stroke={2.5} />
                    </div>
                    <div>
                        <p className="text-[10px] font-extrabold text-orange-600 uppercase tracking-wider mb-0.5">Notification</p>
                        <p className="text-xs sm:text-sm font-bold text-gray-800 line-clamp-1 sm:line-clamp-none">
                            Please clear your advance deposit by 15th to avoid penalty.
                        </p>
                    </div>
                </div>

            </div>

            {/* ─── Top Stats (Responsive Order) ─── */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
                
                {/* Stat 1: Current Balance & Live Meal Rate */}
                <div className="order-1 md:order-3 bg-gradient-to-br from-emerald-500 to-emerald-700 p-6 rounded-3xl border border-emerald-600 shadow-lg shadow-emerald-500/20 relative overflow-hidden flex flex-col justify-between min-h-[140px]">
                    <div className="flex justify-between items-start gap-4 relative z-10">
                        <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center text-white shrink-0 backdrop-blur-sm">
                            <IconReceipt2 className="w-6 h-6" stroke={2} />
                        </div>
                        
                        <div className="flex flex-col items-end gap-1.5">
                            <span className="text-[10px] sm:text-xs font-extrabold text-emerald-800 bg-emerald-100 px-3 py-1.5 rounded-lg">
                                Refundable
                            </span>
                            <div className="flex items-center gap-1.5 bg-black/20 backdrop-blur-sm border border-white/10 px-2.5 py-1 rounded-lg text-white shadow-sm">
                                <IconCalculator size={12} className="text-emerald-200" />
                                <span className="text-[10px] sm:text-xs font-bold tracking-wide">Rate: ৳48.05</span>
                            </div>
                        </div>
                    </div>
                    <div className="mt-4 z-10">
                        <p className="text-emerald-100 text-sm font-semibold mb-1">Current Balance</p>
                        <h3 className="text-3xl font-extrabold text-white">+ ৳ 835</h3>
                    </div>
                    <div className="absolute right-0 bottom-0 opacity-20 z-0">
                        <svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19l16 0"></path><path d="M4 15l4 -6l4 2l4 -5l4 4"></path></svg>
                    </div>
                </div>

                {/* Stat 2: Total Deposit */}
                <div className="order-2 md:order-1 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm relative overflow-hidden flex flex-col justify-between min-h-[140px]">
                    <div className="flex justify-between items-start gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-500 shrink-0">
                            <IconWallet className="w-6 h-6" stroke={2} />
                        </div>
                        <span className="text-xs font-bold text-gray-500 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100">
                            September
                        </span>
                    </div>
                    <div className="mt-4 z-10">
                        <p className="text-gray-500 text-sm font-semibold mb-1">Total Deposit</p>
                        <h3 className="text-3xl font-extrabold text-gray-900">৳ 2,500</h3>
                    </div>
                    <IconWallet className="absolute -bottom-4 -right-4 w-24 h-24 text-blue-50/50" stroke={1} />
                </div>

                {/* Stat 3: My Total Meals */}
                <div className="order-3 md:order-2 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm relative overflow-hidden flex flex-col justify-between min-h-[140px]">
                    <div className="flex justify-between items-start gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-teal-50 flex items-center justify-center text-teal-600 shrink-0">
                            <IconToolsKitchen2 className="w-6 h-6" stroke={2} />
                        </div>
                        <Link href="/my-meals" className="text-xs font-bold text-orange-600 hover:text-orange-700 bg-orange-50 px-3 py-1.5 rounded-lg transition-colors">
                            View Logs
                        </Link>
                    </div>
                    <div className="mt-4 z-10">
                        <p className="text-gray-500 text-sm font-semibold mb-1">My Total Meals</p>
                        <h3 className="text-3xl font-extrabold text-gray-900">18.5</h3>
                    </div>
                    <IconToolsKitchen2 className="absolute -bottom-4 -right-4 w-24 h-24 text-teal-50/50" stroke={1} />
                </div>

            </div>

            {/* ─── Middle Section (2 Columns) ─── */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
                
                {/* ─── Left Column (Bazaar Schedule & Meals) ─── */}
                <div className="lg:col-span-2 space-y-6">
                    
                    {/* Tomorrow's Meal Plan (With Guest Meal) */}
                    <div className="bg-white rounded-3xl border border-blue-200 shadow-sm overflow-hidden relative">
                        <div className="absolute top-0 left-0 w-1.5 h-full bg-blue-500"></div>
                        <div className="p-6 sm:p-8 flex flex-col gap-5 pl-8 bg-blue-50/30">
                            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                                <div>
                                    <span className="inline-flex items-center gap-1.5 bg-blue-100 text-blue-700 px-2.5 py-1 rounded-lg text-xs font-extrabold tracking-wide mb-3">
                                        <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span> Daily Update
                                    </span>
                                    <h3 className="text-xl font-extrabold text-gray-900">Tomorrow's Meal Plan</h3>
                                    <p className="text-sm font-medium text-gray-600 mt-1">Adjust your meal counts or add guest meals for <span className="font-bold text-gray-800">Sep 14, Monday</span>.</p>
                                </div>
                                <span className="hidden sm:flex text-xs font-bold text-gray-500 bg-white px-3 py-1.5 rounded-lg border border-gray-200 h-fit">
                                    Auto-filled from default
                                </span>
                            </div>
                            
                            <div className="flex flex-col sm:flex-row items-center gap-4 bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
                                <div className="flex-1 w-full grid grid-cols-2 sm:grid-cols-4 gap-3">
                                    <div>
                                        <label className="block text-[11px] font-bold text-gray-500 mb-1.5 text-center uppercase tracking-wider">Breakfast</label>
                                        <input type="number" defaultValue="0.5" step="0.5" min="0" className="w-full text-center py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-extrabold text-gray-900 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" />
                                    </div>
                                    <div>
                                        <label className="block text-[11px] font-bold text-gray-500 mb-1.5 text-center uppercase tracking-wider">Lunch</label>
                                        <input type="number" defaultValue="1" step="0.5" min="0" className="w-full text-center py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-extrabold text-gray-900 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" />
                                    </div>
                                    <div>
                                        <label className="block text-[11px] font-bold text-gray-500 mb-1.5 text-center uppercase tracking-wider">Dinner</label>
                                        <input type="number" defaultValue="1" step="0.5" min="0" className="w-full text-center py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-extrabold text-gray-900 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" />
                                    </div>
                                    <div className="relative">
                                        <label className="block text-[11px] font-bold text-orange-500 mb-1.5 text-center uppercase tracking-wider flex justify-center items-center gap-1">
                                            <IconUsersGroup className="w-3.5 h-3.5" /> Guest
                                        </label>
                                        <input type="number" defaultValue="0" step="1" min="0" className="w-full text-center py-2.5 bg-orange-50 border border-orange-200 rounded-xl text-sm font-extrabold text-orange-700 outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all" />
                                    </div>
                                </div>
                                <button className="w-full sm:w-auto h-full flex items-center justify-center gap-2 bg-[#0B132B] hover:bg-gray-800 text-white px-6 py-3 rounded-xl font-bold text-sm shadow-sm transition-all sm:mt-5">
                                    <IconDeviceFloppy className="w-5 h-5" stroke={2.5} />
                                    Save Plan
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Choose Bazaar Date Component */}
                    <div className="bg-white rounded-3xl border border-orange-200 shadow-sm overflow-hidden relative">
                        <div className="absolute top-0 left-0 w-1.5 h-full bg-orange-500"></div>
                        <div className="p-6 sm:p-8 flex flex-col gap-5 pl-8 bg-orange-50/30">
                            <div>
                                <h3 className="text-xl font-extrabold text-gray-900">Select Your Bazaar Dates</h3>
                                <p className="text-sm font-medium text-gray-600 mt-1">Pick multiple convenient dates to do the mess bazaar for this month.</p>
                            </div>
                            
                            <div className="flex flex-col gap-4">
                                <div className="flex flex-col sm:flex-row items-center gap-3">
                                    <input 
                                        type="date" 
                                        min="2026-09-01"
                                        max="2026-09-30"
                                        value={currentDate}
                                        onChange={(e) => setCurrentDate(e.target.value)}
                                        className="w-full sm:w-auto flex-1 px-4 py-3 bg-white border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 text-sm text-gray-400 font-bold transition-all shadow-sm cursor-pointer"
                                    />
                                    <button 
                                        onClick={handleAddDate}
                                        className="w-full sm:w-auto flex items-center justify-center gap-2 bg-gray-900 hover:bg-gray-800 text-white px-5 py-3 rounded-xl font-bold text-sm shadow-sm transition-all"
                                    >
                                        <IconPlus className="w-4 h-4" stroke={3} /> Add
                                    </button>
                                    <button className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#FF6B00] hover:bg-orange-600 text-white px-6 py-3 rounded-xl font-bold text-sm shadow-md shadow-orange-500/20 transition-all sm:ml-auto">
                                        <IconCheck className="w-5 h-5" stroke={3} />
                                        Submit Request
                                    </button>
                                </div>

                                {selectedDates.length > 0 && (
                                    <div className="flex flex-wrap items-center gap-2 mt-2 p-4 bg-white/60 border border-orange-100 rounded-xl">
                                        <span className="text-xs font-bold text-gray-500 mr-2">Selected:</span>
                                        {selectedDates.map((date, index) => (
                                            <div key={index} className="flex items-center gap-2 bg-white border border-orange-200 text-orange-700 px-3 py-1.5 rounded-lg text-sm font-bold shadow-sm">
                                                {new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                                                <button onClick={() => handleRemoveDate(date)} className="text-gray-400 hover:text-red-500 transition-colors bg-gray-50 rounded-md p-0.5">
                                                    <IconX size={14} stroke={3} />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* 💡 My Recent Meals Table (UPDATED FOR MOBILE) */}
                    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden flex flex-col w-full">
                        <div className="p-4 sm:p-6 border-b border-gray-100 flex items-center justify-between bg-[#F8FAFC]">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-white border border-gray-200 flex items-center justify-center text-gray-600 shadow-sm shrink-0">
                                    <IconToolsKitchen2 className="w-4 h-4 sm:w-5 sm:h-5" stroke={1.5} />
                                </div>
                                <div>
                                    <h2 className="text-sm sm:text-base font-extrabold text-gray-900">My Recent Meals</h2>
                                    <p className="text-[10px] sm:text-xs font-bold text-gray-500 mt-0.5">Last 3 days log</p>
                                </div>
                            </div>
                        </div>

                        <div className="overflow-x-auto w-full">
                            <table className="w-full text-left border-collapse min-w-full">
                                <thead>
                                    <tr className="border-b border-gray-100 bg-gray-50/50">
                                        <th className="py-2.5 px-3 sm:py-4 sm:px-6 text-[9px] sm:text-xs font-extrabold text-gray-500 uppercase tracking-tight sm:tracking-wider whitespace-nowrap">Date</th>
                                        <th className="py-2.5 px-1 sm:py-4 sm:px-6 text-[9px] sm:text-xs font-extrabold text-gray-500 uppercase tracking-tight sm:tracking-wider text-center">B'fast</th>
                                        <th className="py-2.5 px-1 sm:py-4 sm:px-6 text-[9px] sm:text-xs font-extrabold text-gray-500 uppercase tracking-tight sm:tracking-wider text-center">Lunch</th>
                                        <th className="py-2.5 px-1 sm:py-4 sm:px-6 text-[9px] sm:text-xs font-extrabold text-gray-500 uppercase tracking-tight sm:tracking-wider text-center">Dinner</th>
                                        <th className="py-2.5 px-2 sm:py-4 sm:px-6 text-[9px] sm:text-xs font-extrabold text-[#FF6B00] uppercase tracking-tight sm:tracking-wider text-center bg-orange-50/50">Total</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    <tr className="hover:bg-gray-50/50 transition-colors">
                                        <td className="py-2.5 px-3 sm:py-4 sm:px-6 whitespace-nowrap">
                                            <p className="font-extrabold text-gray-900 text-[10px] sm:text-sm">Sep 13 (Today)</p>
                                        </td>
                                        <td className="py-2.5 px-1 sm:py-4 sm:px-6 text-center font-bold text-gray-700 text-[11px] sm:text-sm">0.5</td>
                                        <td className="py-2.5 px-1 sm:py-4 sm:px-6 text-center font-bold text-gray-700 text-[11px] sm:text-sm">1</td>
                                        <td className="py-2.5 px-1 sm:py-4 sm:px-6 text-center font-bold text-gray-700 text-[11px] sm:text-sm">1</td>
                                        <td className="py-2.5 px-2 sm:py-4 sm:px-6 text-center bg-orange-50/50 font-extrabold text-gray-900 text-xs sm:text-base border-l border-orange-100/50">2.5</td>
                                    </tr>
                                    <tr className="hover:bg-gray-50/50 transition-colors">
                                        <td className="py-2.5 px-3 sm:py-4 sm:px-6 whitespace-nowrap">
                                            <p className="font-extrabold text-gray-900 text-[10px] sm:text-sm">Sep 12, Sat</p>
                                        </td>
                                        <td className="py-2.5 px-1 sm:py-4 sm:px-6 text-center font-bold text-gray-700 text-[11px] sm:text-sm">0</td>
                                        <td className="py-2.5 px-1 sm:py-4 sm:px-6 text-center font-bold text-gray-700 text-[11px] sm:text-sm">1</td>
                                        <td className="py-2.5 px-1 sm:py-4 sm:px-6 text-center font-bold text-gray-700 text-[11px] sm:text-sm">1</td>
                                        <td className="py-2.5 px-2 sm:py-4 sm:px-6 text-center bg-orange-50/50 font-extrabold text-gray-900 text-xs sm:text-base border-l border-orange-100/50">2.0</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* ─── Right Column (Default Setting & Notice) ─── */}
                <div className="lg:col-span-1 space-y-6">
                    
                    {/* Default Meal Template Setting */}
                    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden flex flex-col">
                        <div className="p-5 border-b border-gray-100 flex items-center gap-2 bg-[#F8FAFC]">
                            <IconAdjustmentsHorizontal className="w-5 h-5 text-teal-600" stroke={2} />
                            <h3 className="font-extrabold text-gray-900">Default Meal Setup</h3>
                        </div>
                        <div className="p-5">
                            <p className="text-xs text-gray-500 font-medium mb-4">Set your standard daily meal count. This will be automatically applied every day unless you change it.</p>
                            
                            <div className="grid grid-cols-3 gap-2 mb-4">
                                <div className="text-center">
                                    <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wide mb-1">Breakfast</label>
                                    <input type="number" defaultValue="0.5" step="0.5" min="0" className="w-full text-center py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm font-extrabold text-gray-900 outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all" />
                                </div>
                                <div className="text-center">
                                    <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wide mb-1">Lunch</label>
                                    <input type="number" defaultValue="1" step="0.5" min="0" className="w-full text-center py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm font-extrabold text-gray-900 outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all" />
                                </div>
                                <div className="text-center">
                                    <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wide mb-1">Dinner</label>
                                    <input type="number" defaultValue="1" step="0.5" min="0" className="w-full text-center py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm font-extrabold text-gray-900 outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all" />
                                </div>
                            </div>
                            
                            <button className="w-full flex items-center justify-center gap-2 bg-teal-50 hover:bg-teal-100 text-teal-700 border border-teal-200 py-2.5 rounded-xl font-bold text-sm transition-all">
                                Update Default
                            </button>
                        </div>
                    </div>

                    {/* Notice Board (Right side, old placement just in case) */}
                    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden flex flex-col">
                        <div className="p-5 border-b border-gray-100 flex items-center gap-2 bg-[#F8FAFC]">
                            <IconBell className="w-5 h-5 text-gray-600" stroke={2} />
                            <h3 className="font-extrabold text-gray-900">Notice Board</h3>
                        </div>
                        <div className="p-5 space-y-4">
                            <div className="flex gap-3 items-start">
                                <div className="mt-0.5 text-orange-500">
                                    <IconAlertCircle className="w-5 h-5" stroke={2} />
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-gray-900">Important Reminders</p>
                                    <p className="text-xs text-gray-500 font-medium mt-1">Check the top notification bar for the latest urgent alerts.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}