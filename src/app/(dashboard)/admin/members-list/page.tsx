"use client";

import Link from "next/link";
import { IconPlus } from "@tabler/icons-react";

export default function MembersListPage() {
    return (
        <div className="max-w-7xl mx-auto space-y-6">
            
            {/* ─── Header Section ─── */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-[#450705] tracking-tight">Mess Members</h1>
                    <p className="text-gray-500 text-sm mt-1.5 font-medium">List of all members in the database and their information</p>
                </div>

                {/* Right Side: Total Badge & Add Button */}
                <div className="flex items-center gap-4">
                    {/* Total Members Badge */}
                    <div className="hidden sm:flex bg-orange-50 text-orange-600 px-4 py-2.5 rounded-xl font-bold text-sm border border-orange-100">
                        Total Members: 2
                    </div>
                    
                    {/* Add New Member Button */}
                    <Link 
                        href="/admin/add-member" 
                        className="flex items-center justify-center gap-2 bg-[#FF6B00] hover:bg-orange-600 text-white px-5 py-2.5 rounded-xl font-bold text-sm shadow-md shadow-orange-500/20 transition-all w-full sm:w-auto"
                    >
                        <IconPlus className="w-4 h-4" stroke={3} />
                        Add New Member
                    </Link>
                </div>
            </div>

            {/* ─── Data Table Section ─── */}
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-[#F8FAFC] border-b border-gray-100">
                                <th className="py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider whitespace-nowrap">Member Name</th>
                                <th className="py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider whitespace-nowrap">Email & Phone</th>
                                <th className="py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider whitespace-nowrap text-center">Role</th>
                                <th className="py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider whitespace-nowrap text-right">Deposit</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            
                            {/* Row 1: Rajib */}
                            <tr className="hover:bg-gray-50/50 transition-colors">
                                <td className="py-4 px-6 whitespace-nowrap">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center font-bold text-base shrink-0">
                                            R
                                        </div>
                                        <div>
                                            <p className="font-extrabold text-gray-900 text-base">Rajib</p>
                                            <p className="text-xs text-gray-500 font-medium mt-0.5">ID: 7b69bd</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="py-4 px-6 whitespace-nowrap">
                                    <p className="text-sm font-bold text-gray-800">rajib@gmail.com</p>
                                    <p className="text-xs text-gray-500 font-medium mt-0.5">01773060507</p>
                                </td>
                                <td className="py-4 px-6 whitespace-nowrap text-center">
                                    <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-xs font-bold tracking-wide">MANAGER</span>
                                </td>
                                <td className="py-4 px-6 whitespace-nowrap text-right">
                                    <span className="font-extrabold text-gray-900 text-base">৳ 2,000</span>
                                </td>
                            </tr>

                            {/* Row 2: Super Admin */}
                            <tr className="hover:bg-gray-50/50 transition-colors">
                                <td className="py-4 px-6 whitespace-nowrap">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center font-bold text-base shrink-0">
                                            S
                                        </div>
                                        <div>
                                            <p className="font-extrabold text-gray-900 text-base">Super Admin</p>
                                            <p className="text-xs text-gray-500 font-medium mt-0.5">ID: cb4617</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="py-4 px-6 whitespace-nowrap">
                                    <p className="text-sm font-bold text-gray-800">admin@gmail.com</p>
                                    <p className="text-xs text-gray-500 font-medium mt-0.5">00000000000</p>
                                </td>
                                <td className="py-4 px-6 whitespace-nowrap text-center">
                                    <span className="bg-purple-50 text-purple-600 px-3 py-1 rounded-full text-xs font-bold tracking-wide">ADMIN</span>
                                </td>
                                <td className="py-4 px-6 whitespace-nowrap text-right">
                                    <span className="font-extrabold text-gray-900 text-base">৳ 5,000</span>
                                </td>
                            </tr>

                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    );
}