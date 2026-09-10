"use client";

import { 
    IconUsersGroup, 
    IconWallet, 
    IconTrendingDown, 
    IconCalendarEvent,
    IconCalendar,
    IconChevronRight,
    IconEdit,
    IconDotsVertical,
    IconPlus,
    IconTrendingUp
} from "@tabler/icons-react";

export default function AdminDashboardPage() {
    return (
        <div className="max-w-7xl mx-auto space-y-8">
            
            {/* ─── Header Section ─── */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
                <div>
                    <p className="text-[#450705] text-base font-medium mb-1">Welcome back,</p>
                    <h1 className="text-3xl sm:text-[32px] font-extrabold text-[#450705] tracking-tight">Admin Dashboard</h1>
                    <p className="text-gray-500 text-sm mt-1.5 font-medium">Manage your mess members, expenses and food operations from one place.</p>
                </div>

                {/* Date Widget */}
                <div className="bg-white border border-gray-200 px-5 py-3 rounded-2xl flex items-center gap-4 shadow-sm w-full sm:w-fit">
                    <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center border border-gray-100 shrink-0">
                        <IconCalendar className="text-gray-600 w-5 h-5" stroke={1.5} />
                    </div>
                    <div>
                        <p className="text-sm font-extrabold text-gray-900">Tuesday, Sep 9, 2025</p>
                        <p className="text-xs text-gray-500 font-medium">Have a productive day!</p>
                    </div>
                </div>
            </div>

            {/* ─── Stats Grid ─── */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                
                {/* Card 1: Total Members */}
                <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm relative overflow-hidden flex flex-col justify-between min-h-[144px]">
                    <div className="flex justify-between items-start gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-orange-50 flex items-center justify-center text-orange-500 shrink-0">
                            <IconUsersGroup className="w-6 h-6" stroke={2} />
                        </div>
                        <p className="text-gray-500 text-xs font-semibold text-right">Total Members</p>
                    </div>
                    <div className="flex items-end gap-3 z-10 mt-3">
                        <h3 className="text-3xl font-extrabold text-gray-900">2</h3>
                        <span className="flex items-center text-[10px] font-bold text-green-600 bg-green-50 px-2 py-1 rounded-md mb-1">
                            <IconTrendingUp className="w-3 h-3 mr-1" stroke={3} /> 0%
                        </span>
                    </div>
                    <p className="text-gray-500 text-xs font-medium z-10 mt-1">Active mess members</p>
                    <IconUsersGroup className="absolute -bottom-4 -right-4 w-24 h-24 text-orange-50/50" stroke={1} />
                </div>

                {/* Card 2: Total Food Cost */}
                <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm relative overflow-hidden flex flex-col justify-between min-h-[144px]">
                    <div className="flex justify-between items-start gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-teal-50 flex items-center justify-center text-teal-600 shrink-0">
                            <IconWallet className="w-6 h-6" stroke={2} />
                        </div>
                        <p className="text-gray-500 text-xs font-semibold text-right">Total Food Cost (This Month)</p>
                    </div>
                    <div className="flex items-end gap-3 z-10 mt-3">
                        <h3 className="text-3xl font-extrabold text-gray-900">৳ 1,000</h3>
                        <span className="flex items-center text-[10px] font-bold text-green-600 bg-green-50 px-2 py-1 rounded-md mb-1">
                            <IconTrendingUp className="w-3 h-3 mr-1" stroke={3} /> 0%
                        </span>
                    </div>
                    <p className="text-gray-500 text-xs font-medium z-10 mt-1">Total expense on food</p>
                    <div className="absolute bottom-2 right-4 flex items-end gap-1 opacity-20">
                        <div className="w-1.5 h-4 bg-teal-500 rounded-full"></div>
                        <div className="w-1.5 h-6 bg-teal-500 rounded-full"></div>
                        <div className="w-1.5 h-8 bg-teal-500 rounded-full"></div>
                    </div>
                </div>

                {/* Card 3: Current Balance */}
                <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm relative overflow-hidden flex flex-col justify-between min-h-[144px]">
                    <div className="flex justify-between items-start gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-red-50 flex items-center justify-center text-red-500 shrink-0">
                            <IconTrendingDown className="w-6 h-6" stroke={2} />
                        </div>
                        <p className="text-gray-500 text-xs font-semibold text-right">Current Balance</p>
                    </div>
                    <div className="flex items-end gap-3 z-10 mt-3">
                        <h3 className="text-3xl font-extrabold text-red-600">-৳ 25,850</h3>
                    </div>
                    <div className="flex items-center justify-between z-10 mt-1">
                        <p className="text-gray-500 text-xs font-medium">Needs attention</p>
                        <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center text-red-500 font-bold text-xs shrink-0">!</div>
                    </div>
                </div>

                {/* Card 4: This Month */}
                <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm relative overflow-hidden flex flex-col justify-between min-h-[144px]">
                    <div className="flex justify-between items-start gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
                            <IconCalendarEvent className="w-6 h-6" stroke={2} />
                        </div>
                        <p className="text-gray-500 text-xs font-semibold text-right">This Month</p>
                    </div>
                    <div className="flex items-center justify-between z-10 mt-3">
                        <h3 className="text-2xl font-extrabold text-[#0B132B]">September 2025</h3>
                        <IconChevronRight className="text-blue-600 w-5 h-5 shrink-0" stroke={2.5} />
                    </div>
                    <p className="text-gray-500 text-xs font-medium z-10 mt-1">Manage monthly expenses</p>
                </div>

            </div>

            {/* ─── Data Table Section (Hidden on Mobile) ─── */}
            <div className="hidden md:block bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
                
                {/* Table Header */}
                <div className="p-6 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-5">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center text-orange-600 shrink-0">
                            <IconUsersGroup className="w-5 h-5" stroke={2} />
                        </div>
                        <div>
                            <h2 className="text-lg font-extrabold text-gray-900">Mess Members</h2>
                            <p className="text-sm font-medium text-gray-500 mt-0.5">View and manage all mess members</p>
                        </div>
                    </div>
                    <button className="flex items-center justify-center gap-2 bg-[#FF6B00] hover:bg-orange-600 text-white px-5 py-2.5 rounded-xl font-bold text-sm shadow-md shadow-orange-500/20 transition-all w-full sm:w-auto">
                        <IconPlus className="w-4 h-4" stroke={3} />
                        Add New Member
                    </button>
                </div>

                {/* Table Content */}
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-[#F8FAFC] border-b border-gray-100">
                                <th className="py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider whitespace-nowrap">#</th>
                                <th className="py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider whitespace-nowrap">Name</th>
                                <th className="py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider whitespace-nowrap">Role</th>
                                <th className="py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider whitespace-nowrap">Monthly Contribution</th>
                                <th className="py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider whitespace-nowrap">Status</th>
                                <th className="py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider text-right whitespace-nowrap">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            
                            {/* Row 1 */}
                            <tr className="hover:bg-gray-50/50 transition-colors">
                                <td className="py-4 px-6 text-sm font-medium text-gray-500 whitespace-nowrap">1</td>
                                <td className="py-4 px-6 whitespace-nowrap">
                                    <div className="flex items-center gap-3">
                                        <div className="w-9 h-9 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center font-bold text-sm shrink-0">R</div>
                                        <span className="font-extrabold text-gray-900">Rajib</span>
                                    </div>
                                </td>
                                <td className="py-4 px-6 whitespace-nowrap">
                                    <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-xs font-bold tracking-wide">MANAGER</span>
                                </td>
                                <td className="py-4 px-6 font-bold text-gray-700 whitespace-nowrap">৳ 2,000</td>
                                <td className="py-4 px-6 whitespace-nowrap">
                                    <span className="flex items-center gap-1.5">
                                        <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0"></span>
                                        <span className="text-sm font-bold text-emerald-600">Active</span>
                                    </span>
                                </td>
                                <td className="py-4 px-6 text-right whitespace-nowrap">
                                    <div className="flex items-center justify-end gap-2">
                                        <button className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-200 rounded-lg text-sm font-bold text-gray-600 hover:bg-gray-50 transition-colors">
                                            <IconEdit className="w-4 h-4" stroke={2} /> Edit
                                        </button>
                                        <button className="p-1.5 border border-gray-200 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-50 transition-colors">
                                            <IconDotsVertical className="w-5 h-5" stroke={2} />
                                        </button>
                                    </div>
                                </td>
                            </tr>

                            {/* Row 2 */}
                            <tr className="hover:bg-gray-50/50 transition-colors">
                                <td className="py-4 px-6 text-sm font-medium text-gray-500 whitespace-nowrap">2</td>
                                <td className="py-4 px-6 whitespace-nowrap">
                                    <div className="flex items-center gap-3">
                                        <div className="w-9 h-9 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center font-bold text-sm shrink-0">S</div>
                                        <span className="font-extrabold text-gray-900">Super Admin</span>
                                    </div>
                                </td>
                                <td className="py-4 px-6 whitespace-nowrap">
                                    <span className="bg-purple-50 text-purple-600 px-3 py-1 rounded-full text-xs font-bold tracking-wide">ADMIN</span>
                                </td>
                                <td className="py-4 px-6 font-bold text-gray-700 whitespace-nowrap">৳ 5,000</td>
                                <td className="py-4 px-6 whitespace-nowrap">
                                    <span className="flex items-center gap-1.5">
                                        <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0"></span>
                                        <span className="text-sm font-bold text-emerald-600">Active</span>
                                    </span>
                                </td>
                                <td className="py-4 px-6 text-right whitespace-nowrap">
                                    <div className="flex items-center justify-end gap-2">
                                        <button className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-200 rounded-lg text-sm font-bold text-gray-600 hover:bg-gray-50 transition-colors">
                                            <IconEdit className="w-4 h-4" stroke={2} /> Edit
                                        </button>
                                        <button className="p-1.5 border border-gray-200 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-50 transition-colors">
                                            <IconDotsVertical className="w-5 h-5" stroke={2} />
                                        </button>
                                    </div>
                                </td>
                            </tr>

                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    );
}