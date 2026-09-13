"use client";

import { 
    IconReceipt2, 
    IconWallet, 
    IconShoppingBag, 
    IconCalendarEvent,
    IconEdit,
    IconTrash,
    IconCalendarUser,
    IconCheck,
    IconChevronRight
} from "@tabler/icons-react";

export default function BazaarManagementPage() {
    return (
        <div className="max-w-7xl mx-auto space-y-6 lg:space-y-8">
            
            {/* ─── Header Section ─── */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-[#450705] tracking-tight">Bazaar & Expenses</h1>
                    <p className="text-gray-500 text-sm mt-1.5 font-medium">Manage bazaar schedule and track daily market expenses.</p>
                </div>
            </div>

            {/* ─── Main Content Container (Responsive Ordering) ─── */}
            {/* মোবাইলে এটি flex-col হয়ে যাবে এবং ডেস্কটপে এটি 3-column Grid হিসেবে কাজ করবে */}
            <div className="flex flex-col lg:grid lg:grid-cols-3 gap-6 lg:gap-8">
                
                {/* ─── 1. Today's Responsibility (Mobile: Order 1, Desktop: Order 2) ─── */}
                <div className="order-1 lg:order-2 lg:col-span-2">
                    <div className="bg-white rounded-3xl border border-orange-100 shadow-sm overflow-hidden relative">
                        <div className="absolute top-0 left-0 w-1.5 h-full bg-orange-500"></div>
                        <div className="p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 pl-8">
                            
                            {/* Who is assigned */}
                            <div>
                                <p className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-1">Today's Responsibility</p>
                                <div className="flex items-center gap-3 mt-2">
                                    <div className="w-12 h-12 rounded-full bg-[#1e293b] flex items-center justify-center text-white font-bold text-lg shadow-sm shrink-0">
                                        T
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-extrabold text-gray-900">Tanvir Ahammed</h3>
                                        <p className="text-sm font-bold text-orange-600">Friday, Sep 11</p>
                                    </div>
                                </div>
                            </div>

                            {/* Cost Input for the assigned member */}
                            <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
                                <div className="relative w-full sm:w-48">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 font-extrabold text-gray-400">৳</span>
                                    <input 
                                        type="number" 
                                        placeholder="Enter amount..." 
                                        className="w-full pl-8 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 text-sm text-gray-900 font-bold transition-all"
                                    />
                                </div>
                                <button className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#FF6B00] hover:bg-orange-600 text-white px-6 py-3 rounded-xl font-bold text-sm shadow-md shadow-orange-500/20 transition-all">
                                    <IconCheck className="w-5 h-5" stroke={3} />
                                    Submit
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ─── 2. Bazaar Schedule (Mobile: Order 2, Desktop: Order 3) ─── */}
                <div className="order-2 lg:order-3 lg:col-span-1 lg:row-span-2">
                    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden lg:sticky lg:top-28">
                        <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-[#F8FAFC]">
                            <div className="flex items-center gap-2">
                                <IconCalendarUser className="w-5 h-5 text-gray-600" stroke={2} />
                                <h3 className="font-extrabold text-gray-900">Bazaar Schedule</h3>
                            </div>
                            <button className="text-xs font-bold text-orange-600 hover:text-orange-700 bg-orange-50 hover:bg-orange-100 px-3 py-1.5 rounded-lg transition-colors">
                                Edit / Assign
                            </button>
                        </div>
                        
                        <div className="divide-y divide-gray-50 p-2">
                            {/* Schedule Item 1 */}
                            <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-xl transition-colors">
                                <div>
                                    <p className="text-sm font-bold text-gray-900">Tomorrow</p>
                                    <p className="text-xs font-medium text-gray-500">Sep 12, Saturday</p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-7 h-7 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center font-bold text-xs">R</div>
                                    <span className="text-sm font-extrabold text-gray-800">Rajib</span>
                                </div>
                            </div>

                            {/* Schedule Item 2 */}
                            <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-xl transition-colors">
                                <div>
                                    <p className="text-sm font-bold text-gray-900">Next</p>
                                    <p className="text-xs font-medium text-gray-500">Sep 13, Sunday</p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-7 h-7 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-xs">S</div>
                                    <span className="text-sm font-extrabold text-gray-800">Super Admin</span>
                                </div>
                            </div>

                            {/* Schedule Item 3 (Unassigned) */}
                            <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-xl transition-colors">
                                <div>
                                    <p className="text-sm font-bold text-gray-900">Next</p>
                                    <p className="text-xs font-medium text-gray-500">Sep 14, Monday</p>
                                </div>
                                <button className="text-xs font-bold text-gray-400 border border-dashed border-gray-300 px-3 py-1 rounded-lg hover:border-orange-500 hover:text-orange-600 transition-colors">
                                    + Assign
                                </button>
                            </div>
                        </div>

                        <button className="w-full py-3 flex items-center justify-center gap-1 text-sm font-bold text-gray-500 hover:text-orange-600 transition-colors border-t border-gray-100 bg-gray-50/50 hover:bg-orange-50/50">
                            View Full Month <IconChevronRight className="w-4 h-4" stroke={2} />
                        </button>
                    </div>
                </div>

                {/* ─── 3. Expense History Table (Mobile: Order 3, Desktop: Order 4) ─── */}
                <div className="order-3 lg:order-4 lg:col-span-2">
                    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden flex flex-col">
                        <div className="p-5 sm:p-6 border-b border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#F8FAFC]">
                            <div className="flex items-center gap-3 w-full sm:w-auto">
                                <div className="w-10 h-10 rounded-xl bg-white border border-gray-200 flex items-center justify-center text-gray-600 shadow-sm shrink-0">
                                    <IconCalendarEvent className="w-5 h-5" stroke={1.5} />
                                </div>
                                <div>
                                    <h2 className="text-base font-extrabold text-gray-900">Recent Expenses</h2>
                                    <p className="text-xs font-bold text-gray-500 mt-0.5">History of market purchases</p>
                                </div>
                            </div>
                            <select className="w-full sm:w-40 bg-white border border-gray-200 text-gray-700 text-sm font-bold rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 shadow-sm cursor-pointer appearance-none">
                                <option>September 2026</option>
                                <option>August 2026</option>
                            </select>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse min-w-[500px]">
                                <thead>
                                    <tr className="border-b border-gray-100">
                                        <th className="py-4 px-6 text-xs font-extrabold text-gray-500 uppercase tracking-wider whitespace-nowrap">Date & Shopper</th>
                                        <th className="py-4 px-6 text-xs font-extrabold text-gray-500 uppercase tracking-wider whitespace-nowrap text-right">Amount</th>
                                        <th className="py-4 px-6 text-xs font-extrabold text-gray-500 uppercase tracking-wider whitespace-nowrap text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    <tr className="hover:bg-gray-50/50 transition-colors">
                                        <td className="py-4 px-6 whitespace-nowrap flex items-center gap-4">
                                            <div className="w-9 h-9 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center font-bold text-sm shrink-0">R</div>
                                            <div>
                                                <p className="font-extrabold text-gray-900 text-sm">Rajib</p>
                                                <p className="text-xs font-medium text-gray-500 mt-0.5">Sep 10, Thursday</p>
                                            </div>
                                        </td>
                                        <td className="py-4 px-6 whitespace-nowrap text-right">
                                            <span className="font-extrabold text-red-600 text-base">৳ 850</span>
                                        </td>
                                        <td className="py-4 px-6 whitespace-nowrap text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <button className="p-2 bg-gray-50 hover:bg-gray-100 text-gray-600 rounded-lg transition-colors border border-gray-200">
                                                    <IconEdit className="w-4 h-4" stroke={2} />
                                                </button>
                                                <button className="p-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg transition-colors border border-red-100">
                                                    <IconTrash className="w-4 h-4" stroke={2} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* ─── 4. Quick Stats Grid (Mobile: Order 4, Desktop: Order 1 - Top) ─── */}
                <div className="order-4 lg:order-1 lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
                    <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm relative overflow-hidden flex flex-col justify-between min-h-[130px]">
                        <div className="flex justify-between items-start gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-orange-50 flex items-center justify-center text-orange-500 shrink-0">
                                <IconReceipt2 className="w-6 h-6" stroke={2} />
                            </div>
                            <p className="text-gray-500 text-xs font-semibold text-right">Total Expense (Sep)</p>
                        </div>
                        <div className="flex items-end gap-3 z-10 mt-3">
                            <h3 className="text-3xl font-extrabold text-gray-900">৳ 15,400</h3>
                        </div>
                        <IconReceipt2 className="absolute -bottom-4 -right-4 w-24 h-24 text-orange-50/50" stroke={1} />
                    </div>

                    <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm relative overflow-hidden flex flex-col justify-between min-h-[130px]">
                        <div className="flex justify-between items-start gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-teal-50 flex items-center justify-center text-teal-600 shrink-0">
                                <IconShoppingBag className="w-6 h-6" stroke={2} />
                            </div>
                            <p className="text-gray-500 text-xs font-semibold text-right">Today's Bazaar</p>
                        </div>
                        <div className="flex items-end gap-3 z-10 mt-3">
                            <h3 className="text-3xl font-extrabold text-gray-900">৳ 0.00</h3>
                        </div>
                        <p className="text-gray-500 text-xs font-medium z-10 mt-1">Pending entry...</p>
                    </div>

                    <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm relative overflow-hidden flex flex-col justify-between min-h-[130px]">
                        <div className="flex justify-between items-start gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-purple-50 flex items-center justify-center text-purple-600 shrink-0">
                                <IconWallet className="w-6 h-6" stroke={2} />
                            </div>
                            <p className="text-gray-500 text-xs font-semibold text-right">Available Balance</p>
                        </div>
                        <div className="flex items-end gap-3 z-10 mt-3">
                            <h3 className="text-3xl font-extrabold text-gray-900">৳ 4,600</h3>
                        </div>
                        <p className="text-gray-500 text-xs font-medium z-10 mt-1">From total deposits</p>
                    </div>
                </div>

            </div>
        </div>
    );
}