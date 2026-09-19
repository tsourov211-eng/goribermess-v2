"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { IconSearch, IconEdit, IconTrash, IconPlus, IconUserCircle, IconCheck, IconX } from "@tabler/icons-react";

export default function MembersListPage() {
    const { data: session } = useSession();
    const currentUserRole = (session?.user as { role?: string })?.role || "member";

    const [members, setMembers] = useState<any[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [editingMemberId, setEditingMemberId] = useState<string | null>(null);
    const [editForm, setEditForm] = useState({ name: "", phone: "", role: "member" });

    useEffect(() => {
        fetchMembers();
    }, []);

    const fetchMembers = async () => {
        setIsLoading(true);
        try {
            const res = await fetch("/api/admin/users");
            if (res.ok) {
                const data = await res.json();
                setMembers(data.users || []);
            }
        } catch (error) {
            console.error("Error fetching members:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async (id: string, name: string) => {
        if (!confirm(`Are you sure you want to remove "${name}" from the mess?`)) return;

        try {
            const res = await fetch(`/api/members/${id}`, {
                method: "DELETE",
            });

            if (res.ok) {
                alert("✅ Member removed successfully!");
                fetchMembers();
            } else {
                alert("❌ Failed to remove member.");
            }
        } catch (error) {
            console.error("Delete error:", error);
        }
    };

    const startEditing = (member: any) => {
        setEditingMemberId(member.id);
        setEditForm({
            name: member.name || "",
            phone: member.phone !== "N/A" ? member.phone : "",
            role: member.role || "member"
        });
    };

    const handleSaveEdit = async (id: string) => {
        try {
            const res = await fetch(`/api/members/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(editForm)
            });

            if (res.ok) {
                alert("✅ Member updated successfully!");
                setEditingMemberId(null);
                fetchMembers();
            } else {
                alert("❌ Failed to update member.");
            }
        } catch (error) {
            console.error("Update error:", error);
        }
    };

    const filteredMembers = members.filter((member) => {
        const query = searchTerm.toLowerCase();
        return (
            (member.name && member.name.toLowerCase().includes(query)) ||
            (member.phone && member.phone.toLowerCase().includes(query)) ||
            (member.email && member.email.toLowerCase().includes(query)) ||
            (member.role && member.role.toLowerCase().includes(query))
        );
    });

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
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Search members..." 
                            className="pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 text-sm font-medium transition-all w-full sm:w-64"
                        />
                    </div>
                    
                    {/* 💡 শুধুমাত্র অ্যাডমিন নতুন মেম্বার অ্যাড করতে পারবে */}
                    {currentUserRole === "admin" && (
                        <Link 
                            href="/admin/add-member"
                            className="flex items-center gap-2 bg-[#FF6B00] hover:bg-orange-600 text-white px-5 py-2.5 rounded-xl font-bold text-sm shadow-md shadow-orange-500/20 transition-all cursor-pointer"
                        >
                            <IconPlus size={18} stroke={2.5} /> Add Member
                        </Link>
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
                                
                                {/* 💡 ব্যালেন্স এবং অ্যাকশন কলাম শুধুমাত্র অ্যাডমিন বা ম্যানেজার দেখতে পারবে */}
                                {(currentUserRole === "admin" || currentUserRole === "manager") && (
                                    <>
                                        <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Balance</th>
                                        {currentUserRole === "admin" && (
                                            <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Actions</th>
                                        )}
                                    </>
                                )}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {isLoading ? (
                                <tr>
                                    <td colSpan={5} className="py-10 text-center font-bold text-gray-400">
                                        Loading members...
                                    </td>
                                </tr>
                            ) : filteredMembers.map((member) => {
                                const isEditing = editingMemberId === member.id;
                                return (
                                    <tr key={member.id} className="hover:bg-gray-50/50 transition-colors">
                                        
                                        {/* Name & Role */}
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center shrink-0 font-bold">
                                                    {member.name ? member.name.charAt(0).toUpperCase() : <IconUserCircle size={24} stroke={1.5} />}
                                                </div>
                                                <div>
                                                    {isEditing ? (
                                                        <input 
                                                            type="text" 
                                                            value={editForm.name} 
                                                            onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                                                            className="text-sm font-extrabold border border-orange-300 rounded px-2 py-0.5" 
                                                        />
                                                    ) : (
                                                        <p className="font-extrabold text-[#0B132B] text-sm">{member.name}</p>
                                                    )}
                                                    <div className="flex items-center gap-2 mt-0.5">
                                                        {isEditing ? (
                                                            <select 
                                                                value={editForm.role} 
                                                                onChange={(e) => setEditForm({ ...editForm, role: e.target.value })}
                                                                className="text-[10px] font-bold border border-gray-300 rounded px-1 py-0.5"
                                                            >
                                                                <option value="member">member</option>
                                                                <option value="manager">manager</option>
                                                                <option value="admin">admin</option>
                                                            </select>
                                                        ) : (
                                                            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-gray-100 text-gray-600 capitalize">{member.role}</span>
                                                        )}
                                                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${member.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                                            {member.status}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        
                                        {/* Phone Number */}
                                        <td className="px-6 py-4">
                                            {isEditing ? (
                                                <input 
                                                    type="text" 
                                                    value={editForm.phone} 
                                                    onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                                                    className="text-sm font-bold border border-orange-300 rounded px-2 py-0.5" 
                                                />
                                            ) : (
                                                <p className="text-sm font-bold text-gray-600">{member.phone}</p>
                                            )}
                                        </td>
                                        
                                        {/* Deposit Amount */}
                                        <td className="px-6 py-4">
                                            <p className="text-sm font-extrabold text-[#0B132B]">৳ {member.deposit.toLocaleString()}</p>
                                        </td>
                                        
                                        {/* Balance & Actions */}
                                        {(currentUserRole === "admin" || currentUserRole === "manager") && (
                                            <>
                                                <td className="px-6 py-4">
                                                    <p className={`text-sm font-extrabold ${member.balance < 0 ? "text-red-500" : "text-green-600"}`}>
                                                        {member.balance < 0 ? "-" : "+"} ৳ {Math.abs(member.balance).toLocaleString()}
                                                    </p>
                                                </td>
                                                {currentUserRole === "admin" && (
                                                    <td className="px-6 py-4 text-right">
                                                        <div className="flex items-center justify-end gap-2">
                                                            {isEditing ? (
                                                                <>
                                                                    <button 
                                                                        onClick={() => handleSaveEdit(member.id)}
                                                                        className="p-1.5 bg-green-50 text-green-600 hover:bg-green-100 rounded-lg transition-colors cursor-pointer" 
                                                                        title="Save"
                                                                    >
                                                                        <IconCheck size={18} stroke={2.5} />
                                                                    </button>
                                                                    <button 
                                                                        onClick={() => setEditingMemberId(null)}
                                                                        className="p-1.5 bg-gray-50 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer" 
                                                                        title="Cancel"
                                                                    >
                                                                        <IconX size={18} stroke={2.5} />
                                                                    </button>
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <button 
                                                                        onClick={() => startEditing(member)}
                                                                        className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer" 
                                                                        title="Edit Member"
                                                                    >
                                                                        <IconEdit size={18} stroke={2} />
                                                                    </button>
                                                                    <button 
                                                                        onClick={() => handleDelete(member.id, member.name)}
                                                                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors cursor-pointer" 
                                                                        title="Delete Member"
                                                                    >
                                                                        <IconTrash size={18} stroke={2} />
                                                                    </button>
                                                                </>
                                                            )}
                                                        </div>
                                                    </td>
                                                )}
                                            </>
                                        )}
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                    
                    {/* Empty State */}
                    {!isLoading && filteredMembers.length === 0 && (
                        <div className="text-center py-12">
                            <p className="text-gray-500 font-medium">No members found.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}