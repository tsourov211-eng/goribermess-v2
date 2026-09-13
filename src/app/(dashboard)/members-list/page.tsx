"use client";

import { useState } from "react";
import { IconSearch, IconEdit, IconTrash, IconPlus, IconUserCircle } from "@tabler/icons-react";

export default function MembersListPage() {
    // 💡 এই রোলটি ভবিষ্যতে ডাটাবেস বা লগইন সেশন থেকে আসবে। 
    // UI টেস্ট করার জন্য এখানে "manager" এর জায়গায় "admin" লিখে দেখতে পারেন।
    const currentUserRole = "manager"; // "admin" | "manager"

    // ডামি মেম্বার ডেটা
    const [members] = useState([
        { id: 1, name: "Tanvir Ahammed", phone: "01712-345678", role: "Manager", deposit: 5000, balance: 1200, status: "Active" },
        { id: 2, name: "Rahim Islam", phone: "01812-345678", role: "Member", deposit: 3000, balance: -500, status: "Active" },
        { id: 3, name: "Karim Hasan", phone: "01912-345678", role: "Member", deposit: 4000, balance: 500, status: "Active" },
        { id: 4, name: "Sajid Rahman", phone: "01612-345678", role: "Member", deposit: 2500, balance: 0, status: "Inactive" },
    ]);

    return (
        <div className="space-y-6 animate-in fade-in zoom-in-95 duration-300">
            
            {/* ─── Header Section ─── */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <div>
                    <h1 className="text-2xl font-extrabold text-[#0B132B]">Mess Members</h1>
                    <p className="text-sm text-gray-500 font-medium mt-1">Manage all members and their deposit information.</p>
                </div>
                
                <div className="flex flex-wrap items-center gap-3">
                    {/* Search Box */}
                    <div className="relative">
                        <IconSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input 
                            type="text" 
                            placeholder="Search members..." 
                            className="pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 text-sm font-medium transition-all w-full sm:w-64"
                        />
                    </div>
                    
                    {/* 💡 শুধুমাত্র অ্যাডমিন নতুন মেম্বার অ্যাড করতে পারবে */}
                    {currentUserRole === "admin" && (
                        <button className="flex items-center gap-2 bg-[#FF6B00] hover:bg-orange-600 text-white px-5 py-2.5 rounded-xl font-bold text-sm shadow-md shadow-orange-500/20 transition-all">
                            <IconPlus size={18} stroke={2.5} /> Add Member
                        </button>
                    )}
                </div>
            </div>

            {/* ─── Members Table Section ─── */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-100">
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Member Info</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Phone</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Deposit</th>
                                
                                {/* 💡 ব্যালেন্স এবং অ্যাকশন কলাম শুধুমাত্র অ্যাডমিন দেখতে পারবে */}
                                {currentUserRole === "admin" && (
                                    <>
                                        <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Balance</th>
                                        <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Actions</th>
                                    </>
                                )}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {members.map((member) => (
                                <tr key={member.id} className="hover:bg-gray-50/50 transition-colors">
                                    
                                    {/* Name & Role */}
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center shrink-0">
                                                <IconUserCircle size={24} stroke={1.5} />
                                            </div>
                                            <div>
                                                <p className="font-extrabold text-[#0B132B] text-sm">{member.name}</p>
                                                <div className="flex items-center gap-2 mt-0.5">
                                                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-gray-100 text-gray-600">{member.role}</span>
                                                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${member.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                                        {member.status}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    
                                    {/* Phone Number (সবার জন্য দৃশ্যমান) */}
                                    <td className="px-6 py-4">
                                        <p className="text-sm font-bold text-gray-600">{member.phone}</p>
                                    </td>
                                    
                                    {/* Deposit Amount (সবার জন্য দৃশ্যমান) */}
                                    <td className="px-6 py-4">
                                        <p className="text-sm font-extrabold text-[#0B132B]">৳ {member.deposit.toLocaleString()}</p>
                                    </td>
                                    
                                    {/* 💡 Balance ও Actions শুধুমাত্র অ্যাডমিন দেখতে পারবে */}
                                    {currentUserRole === "admin" && (
                                        <>
                                            <td className="px-6 py-4">
                                                <p className={`text-sm font-extrabold ${member.balance < 0 ? "text-red-500" : "text-green-600"}`}>
                                                    {member.balance < 0 ? "-" : "+"} ৳ {Math.abs(member.balance).toLocaleString()}
                                                </p>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    <button className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors" title="Edit Member">
                                                        <IconEdit size={18} stroke={2} />
                                                    </button>
                                                    <button className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors" title="Delete Member">
                                                        <IconTrash size={18} stroke={2} />
                                                    </button>
                                                </div>
                                            </td>
                                        </>
                                    )}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    
                    {/* Empty State (If no members found) */}
                    {members.length === 0 && (
                        <div className="text-center py-12">
                            <p className="text-gray-500 font-medium">No members found.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}