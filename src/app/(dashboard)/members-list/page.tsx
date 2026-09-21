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
        <div className="space-y-6 animate-in fade-in zoom-in-95 duration-300 pb-12 md:pb-20">
            
            {/* ─── Header Section ─── */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100">
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
                    
                    {/* 💡 Only admin can add new members */}
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
            <div className="bg-gray-50/30 md:bg-white rounded-2xl md:shadow-sm md:border md:border-gray-100 overflow-x-hidden md:overflow-x-auto p-4 md:p-0">
                <table className="w-full text-left border-collapse block md:table min-w-0 md:min-w-[800px]">
                    <thead className="hidden md:table-header-group">
                            <tr className="bg-gray-50 border-b border-gray-100">
                                <th className="px-6 py-4 md:py-5 text-xs font-bold text-gray-500 uppercase tracking-wider">Member Info</th>
                                <th className="px-6 py-4 md:py-5 text-xs font-bold text-gray-500 uppercase tracking-wider">Phone</th>
                                <th className="px-6 py-4 md:py-5 text-xs font-bold text-gray-500 uppercase tracking-wider">Deposit</th>
                                
                                {/* 💡 Balance and Action columns are only visible to Admin or Manager */}
                                {(currentUserRole === "admin" || currentUserRole === "manager") && (
                                    <>
                                        <th className="px-6 py-4 md:py-5 text-xs font-bold text-gray-500 uppercase tracking-wider">Balance</th>
                                        {currentUserRole === "admin" && (
                                            <th className="px-6 py-4 md:py-5 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Actions</th>
                                        )}
                                    </>
                                )}
                            </tr>
                        </thead>
                    <tbody className="block md:table-row-group space-y-4 md:space-y-0 md:divide-y md:divide-gray-100">
                            {isLoading ? (
                                <tr className="block md:table-row">
                                    <td colSpan={5} className="block md:table-cell py-10 md:py-16 text-center font-bold text-gray-400">
                                        Loading members...
                                    </td>
                                </tr>
                            ) : filteredMembers.map((member) => {
                                const isEditing = editingMemberId === member.id;
                                return (
                                    <tr key={member.id} className="flex flex-wrap md:table-row bg-white md:even:bg-gray-50/50 border border-gray-200 md:border-0 md:border-b md:border-orange-100/60 last:md:border-b-0 rounded-2xl md:rounded-none p-5 md:p-0 hover:bg-gray-50/80 transition-colors shadow-sm md:shadow-none">
                                        
                                        {/* Name & Role */}
                                        <td className="w-full md:w-auto block md:table-cell p-0 md:py-7 md:px-6 mb-4 md:mb-0 border-b border-gray-100 md:border-0 pb-4 md:pb-0">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 md:w-10 md:h-10 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center shrink-0 font-bold">
                                                    {member.name ? member.name.charAt(0).toUpperCase() : <IconUserCircle size={24} stroke={1.5} />}
                                                </div>
                                                <div className="min-w-0">
                                                    {isEditing ? (
                                                        <input 
                                                            type="text" 
                                                            value={editForm.name} 
                                                            onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                                                            className="text-sm font-extrabold border border-orange-300 rounded px-2 py-0.5 w-full max-w-[150px]" 
                                                        />
                                                    ) : (
                                                        <p className="font-extrabold text-[#0B132B] text-base md:text-sm truncate">{member.name}</p>
                                                    )}
                                                    <div className="flex items-center flex-wrap gap-2 mt-1 md:mt-0.5">
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
                                                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${member.status === 'Active' ? 'bg-green-100 text-green-700' : member.status === 'Pending' ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'}`}>
                                                            {member.status}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        
                                        {/* Phone Number */}
                                        <td className="w-full md:w-auto flex justify-between items-center md:table-cell p-0 md:py-7 md:px-6 mb-3 md:mb-0">
                                            <span className="md:hidden text-xs font-bold text-gray-400 uppercase tracking-wider">Phone</span>
                                            <div className="text-right md:text-left">
                                                {isEditing ? (
                                                    <input 
                                                        type="text" 
                                                        value={editForm.phone} 
                                                        onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                                                        className="text-sm font-bold border border-orange-300 rounded px-2 py-0.5 w-full max-w-[150px]" 
                                                    />
                                                ) : (
                                                    <p className="text-sm font-bold text-gray-600">{member.phone}</p>
                                                )}
                                            </div>
                                        </td>
                                        
                                        {/* Deposit Amount */}
                                        <td className="w-full md:w-auto flex justify-between items-center md:table-cell p-0 md:py-7 md:px-6 mb-4 md:mb-0 border-b border-gray-100 md:border-0 pb-4 md:pb-0">
                                            <span className="md:hidden text-xs font-bold text-gray-400 uppercase tracking-wider">Deposit</span>
                                            <div className="text-right md:text-left">
                                                <p className="text-sm font-extrabold text-[#0B132B]">Tk {member.deposit.toLocaleString()}</p>
                                            </div>
                                        </td>
                                        
                                        {/* Balance & Actions */}
                                        {(currentUserRole === "admin" || currentUserRole === "manager") && (
                                            <>
                                                <td className="flex-1 md:flex-none w-1/2 md:w-auto flex flex-col justify-center md:table-cell p-0 md:py-7 md:px-6 pt-2 md:pt-0">
                                                    <span className="md:hidden text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Balance</span>
                                                    <p className={`text-sm font-extrabold ${member.balance < 0 ? "text-red-500" : "text-green-600"}`}>
                                                        {member.balance < 0 ? "-" : "+"} Tk {Math.abs(member.balance).toLocaleString()}
                                                    </p>
                                                </td>
                                                {currentUserRole === "admin" && (
                                                    <td className="w-1/2 md:w-auto flex items-center justify-end md:table-cell p-0 md:py-7 md:px-6 pt-2 md:pt-0 text-right">
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
    );
}