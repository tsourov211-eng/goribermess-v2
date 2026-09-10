"use client";

import { 
    IconChartBar, 
    IconPrinter, 
    IconDownload, 
    IconCalculator, 
    IconToolsKitchen2, 
    IconReceipt2, 
    IconCalendarEvent,
    IconTrendingUp,
    IconTrendingDown
} from "@tabler/icons-react";

export default function ReportsPage() {
    return (
        <div className="max-w-7xl mx-auto space-y-6 lg:space-y-8">
            
            {/* ─── Header Section ─── */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-5">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0B132B] tracking-tight">Monthly Reports</h1>
                    <p className="text-gray-500 text-sm mt-1.5 font-medium">Final meal calculations, balances, and mess summaries.</p>
                </div>

                {/* Right Actions: Month Picker & Buttons */}
                <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
                    {/* Month Filter */}
                    <div className="relative w-full sm:w-auto">
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                            <IconCalendarEvent className="w-5 h-5" stroke={1.5} />
                        </div>
                        <select className="w-full sm:w-48 pl-10 pr-4 py-2.5 bg-white border border-gray-200 text-gray-700 text-sm font-bold rounded-xl outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 shadow-sm cursor-pointer appearance-none">
                            <option>September 2026</option>
                            <option>August 2026</option>
                            <option>July 2026</option>
                        </select>
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-2 w-full sm:w-auto">
                        <button className="flex-1 sm:flex-none items-center justify-center gap-2 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 px-4 py-2.5 rounded-xl font-bold text-sm shadow-sm transition-all flex">
                            <IconDownload className="w-4 h-4" stroke={2} />
                            <span className="hidden sm:inline">Export</span>
                        </button>
                        <button className="flex-1 sm:flex-none items-center justify-center gap-2 bg-[#FF6B00] hover:bg-orange-600 text-white px-5 py-2.5 rounded-xl font-bold text-sm shadow-md shadow-orange-500/20 transition-all flex">
                            <IconPrinter className="w-4 h-4" stroke={2} />
                            Print Report
                        </button>
                    </div>
                </div>
            </div>

            {/* ─── Summary Cards Grid ─── */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
                
                {/* Total Expense */}
                <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm relative overflow-hidden flex flex-col justify-between min-h-[140px]">
                    <div className="flex justify-between items-start gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-red-50 flex items-center justify-center text-red-500 shrink-0">
                            <IconReceipt2 className="w-6 h-6" stroke={2} />
                        </div>
                        <p className="text-gray-500 text-xs font-semibold text-right">Total Expenses</p>
                    </div>
                    <div className="flex items-end gap-3 z-10 mt-3">
                        <h3 className="text-3xl font-extrabold text-gray-900">৳ 15,400</h3>
                    </div>
                    <p className="text-gray-500 text-xs font-medium z-10 mt-1">Total money spent this month</p>
                    <IconReceipt2 className="absolute -bottom-4 -right-4 w-24 h-24 text-red-50/50" stroke={1} />
                </div>

                {/* Total Meals */}
                <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm relative overflow-hidden flex flex-col justify-between min-h-[140px]">
                    <div className="flex justify-between items-start gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-teal-50 flex items-center justify-center text-teal-600 shrink-0">
                            <IconToolsKitchen2 className="w-6 h-6" stroke={2} />
                        </div>
                        <p className="text-gray-500 text-xs font-semibold text-right">Total Meals</p>
                    </div>
                    <div className="flex items-end gap-3 z-10 mt-3">
                        <h3 className="text-3xl font-extrabold text-gray-900">320.5</h3>
                    </div>
                    <p className="text-gray-500 text-xs font-medium z-10 mt-1">Consumed by all members</p>
                    <IconToolsKitchen2 className="absolute -bottom-4 -right-4 w-24 h-24 text-teal-50/50" stroke={1} />
                </div>

                {/* Meal Rate (Highlighted) */}
                <div className="bg-gradient-to-br from-[#0B132B] to-[#1c2a53] p-5 rounded-3xl border border-gray-800 shadow-lg relative overflow-hidden flex flex-col justify-between min-h-[140px]">
                    <div className="flex justify-between items-start gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-orange-400 shrink-0 backdrop-blur-sm">
                            <IconCalculator className="w-6 h-6" stroke={2} />
                        </div>
                        <p className="text-gray-400 text-xs font-semibold text-right">Final Meal Rate</p>
                    </div>
                    <div className="flex items-end gap-3 z-10 mt-3">
                        <h3 className="text-3xl font-extrabold text-white">৳ 48.05</h3>
                    </div>
                    <p className="text-gray-400 text-xs font-medium z-10 mt-1">(Expense ÷ Total Meals)</p>
                    <div className="absolute right-0 bottom-0 opacity-10">
                        <svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19l16 0"></path><path d="M4 15l4 -6l4 2l4 -5l4 4"></path></svg>
                    </div>
                </div>
            </div>

            {/* ─── Member-wise Final Calculation Table ─── */}
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden flex flex-col">
                
                <div className="p-5 sm:p-6 border-b border-gray-100 flex items-center gap-3 bg-[#F8FAFC]">
                    <div className="w-10 h-10 rounded-xl bg-white border border-gray-200 flex items-center justify-center text-gray-600 shadow-sm shrink-0">
                        <IconChartBar className="w-5 h-5" stroke={1.5} />
                    </div>
                    <div>
                        <h2 className="text-base font-extrabold text-gray-900">Member Calculations</h2>
                        <p className="text-xs font-bold text-gray-500 mt-0.5">Individual meal costs and final balances</p>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[800px]">
                        <thead>
                            <tr className="bg-white border-b border-gray-100">
                                <th className="py-4 px-6 text-xs font-extrabold text-gray-500 uppercase tracking-wider">Member Name</th>
                                <th className="py-4 px-6 text-xs font-extrabold text-gray-500 uppercase tracking-wider text-center">Total Meals</th>
                                <th className="py-4 px-6 text-xs font-extrabold text-gray-500 uppercase tracking-wider text-right">Meal Cost</th>
                                <th className="py-4 px-6 text-xs font-extrabold text-gray-500 uppercase tracking-wider text-right">Deposit</th>
                                <th className="py-4 px-6 text-xs font-extrabold text-gray-900 uppercase tracking-wider text-right bg-gray-50">Final Balance</th>
                                <th className="py-4 px-6 text-xs font-extrabold text-gray-500 uppercase tracking-wider text-center">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            
                            {/* Row 1: Rajib (Refund/Receivable) */}
                            <tr className="hover:bg-gray-50/50 transition-colors">
                                <td className="py-4 px-6 whitespace-nowrap">
                                    <div className="flex items-center gap-3">
                                        <div className="w-9 h-9 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center font-bold text-sm shrink-0">R</div>
                                        <span className="font-extrabold text-gray-900 text-sm">Rajib</span>
                                    </div>
                                </td>
                                <td className="py-4 px-6 whitespace-nowrap text-center font-bold text-gray-700">
                                    25.5
                                </td>
                                <td className="py-4 px-6 whitespace-nowrap text-right text-sm font-bold text-red-500">
                                    - ৳ 1,225
                                </td>
                                <td className="py-4 px-6 whitespace-nowrap text-right text-sm font-bold text-gray-700">
                                    ৳ 2,000
                                </td>
                                <td className="py-4 px-6 whitespace-nowrap text-right bg-gray-50">
                                    <span className="font-extrabold text-emerald-600 text-base">+ ৳ 775</span>
                                </td>
                                <td className="py-4 px-6 whitespace-nowrap text-center">
                                    <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-600 px-2.5 py-1 rounded-lg text-xs font-bold tracking-wide border border-emerald-100">
                                        <IconTrendingUp className="w-3 h-3" stroke={3} /> Refund
                                    </span>
                                </td>
                            </tr>

                            {/* Row 2: Super Admin (Due/Payable) */}
                            <tr className="hover:bg-gray-50/50 transition-colors">
                                <td className="py-4 px-6 whitespace-nowrap">
                                    <div className="flex items-center gap-3">
                                        <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-sm shrink-0">S</div>
                                        <span className="font-extrabold text-gray-900 text-sm">Super Admin</span>
                                    </div>
                                </td>
                                <td className="py-4 px-6 whitespace-nowrap text-center font-bold text-gray-700">
                                    35.0
                                </td>
                                <td className="py-4 px-6 whitespace-nowrap text-right text-sm font-bold text-red-500">
                                    - ৳ 1,681
                                </td>
                                <td className="py-4 px-6 whitespace-nowrap text-right text-sm font-bold text-gray-700">
                                    ৳ 1,000
                                </td>
                                <td className="py-4 px-6 whitespace-nowrap text-right bg-gray-50">
                                    <span className="font-extrabold text-red-600 text-base">- ৳ 681</span>
                                </td>
                                <td className="py-4 px-6 whitespace-nowrap text-center">
                                    <span className="inline-flex items-center gap-1 bg-red-50 text-red-600 px-2.5 py-1 rounded-lg text-xs font-bold tracking-wide border border-red-100">
                                        <IconTrendingDown className="w-3 h-3" stroke={3} /> Due
                                    </span>
                                </td>
                            </tr>

                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    );
}