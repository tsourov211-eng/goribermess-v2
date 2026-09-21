"use client";

import { useState, useEffect } from "react";
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
    IconTrendingUp,
    IconUserPlus,
    IconClock,
    IconCheck,
    IconX,
    IconMail,
    IconPhone
} from "@tabler/icons-react";

export default function AdminDashboardPage() {
    const [users, setUsers] = useState<any[]>([]);
    const [pendingMembers, setPendingMembers] = useState<any[]>([]);
    const [stats, setStats] = useState({ totalFoodCost: 0, messFund: 0, totalMembers: 0, totalMessMeals: 0 });
    const [isLoading, setIsLoading] = useState(true);

    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editingUser, setEditingUser] = useState<any>(null);
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = () => setActiveDropdown(null);
        document.addEventListener("click", handleClickOutside);
        return () => document.removeEventListener("click", handleClickOutside);
    }, []);

    // To show today's date dynamically
    const today = new Date();
    const formattedDate = today.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric', year: 'numeric' });
    const currentMonth = today.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const res = await fetch("/api/admin/users");
            if (res.ok) {
                const data = await res.json();
                const allUsers = data.users || [];
                setUsers(allUsers.filter((u: any) => u.role !== 'pending'));
                setPendingMembers(allUsers.filter((u: any) => u.role === 'pending'));
                if (data.stats) {
                    setStats(data.stats);
                }
            }
        } catch (error) {
            console.error("Error fetching users:", error);
        } finally {
            setIsLoading(false);
        }
    };

    // Function to update user role
    const handleRoleChange = async (userId: string, newRole: string) => {
        if (!confirm(`Are you sure you want to change this user's role to ${newRole.toUpperCase()}?`)) return;

        try {
            const res = await fetch("/api/admin/users", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userId, newRole })
            });

            if (res.ok) {
                alert(`✅ User role updated successfully!`);
                fetchUsers(); // Refresh data
            } else {
                alert("❌ Failed to update role.");
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleEditClick = (user: any) => {
        setEditingUser(user);
        setIsEditModalOpen(true);
    };

    const handleUpdateUser = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await fetch("/api/admin/users", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    userId: editingUser.id,
                    name: editingUser.name,
                    phone: editingUser.phone,
                    newRole: editingUser.role
                })
            });

            if (res.ok) {
                alert(`✅ User updated successfully!`);
                setIsEditModalOpen(false);
                fetchUsers();
            } else {
                alert("❌ Failed to update user.");
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleDeleteUser = async (userId: string) => {
        if (!confirm("Are you sure you want to completely DELETE this user? This action cannot be undone and will delete all their financial records.")) return;
        
        try {
            const res = await fetch(`/api/admin/users?userId=${userId}`, {
                method: "DELETE",
            });
            if (res.ok) {
                alert("✅ User deleted successfully!");
                fetchUsers();
            } else {
                alert("❌ Failed to delete user.");
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleMemberApproval = async (userId: string, action: 'approve' | 'reject') => {
        if (!confirm(`Are you sure you want to ${action} this member?`)) return;

        try {
            const res = await fetch("/api/admin/users/approve", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userId, action })
            });

            if (res.ok) {
                alert(`✅ Member ${action}d successfully!`);
                fetchUsers();
            } else {
                alert(`❌ Failed to ${action} member.`);
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="max-w-7xl mx-auto space-y-8">
            
            {/* ─── Header Section ─── */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 animate-in fade-in zoom-in-95 duration-300">
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
                        <p className="text-sm font-extrabold text-gray-900">{formattedDate}</p>
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
                        <h3 className="text-3xl font-extrabold text-gray-900">{isLoading ? "..." : stats.totalMembers}</h3>
                        <span className="flex items-center text-[10px] font-bold text-green-600 bg-green-50 px-2 py-1 rounded-md mb-1">
                            <IconTrendingUp className="w-3 h-3 mr-1" stroke={3} /> Active
                        </span>
                    </div>
                    <p className="text-gray-500 text-xs font-medium z-10 mt-1">Total registered users</p>
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
                        <h3 className="text-3xl font-extrabold text-gray-900">{isLoading ? "..." : `Tk ${stats.totalFoodCost.toLocaleString()}`}</h3>
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
                        <p className="text-gray-500 text-xs font-semibold text-right">Mess Fund</p>
                    </div>
                    <div className="flex items-end gap-3 z-10 mt-3">
                        <h3 className="text-3xl font-extrabold text-gray-900">{isLoading ? "..." : `Tk ${stats.messFund.toLocaleString()}`}</h3>
                    </div>
                    <div className="flex items-center justify-between z-10 mt-1">
                        <p className="text-gray-500 text-xs font-medium">{stats.messFund >= 0 ? "Surplus in fund" : "Deficit in fund"}</p>
                    </div>
                </div>

                {/* Card 4: This Month */}
                <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm relative overflow-hidden flex flex-col justify-between min-h-[144px]">
                    <div className="flex justify-between items-start gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
                            <IconCalendarEvent className="w-6 h-6" stroke={2} />
                        </div>
                        <p className="text-gray-500 text-xs font-semibold text-right">Active Month</p>
                    </div>
                    <div className="flex items-center justify-between z-10 mt-3">
                        <h3 className="text-xl sm:text-2xl font-extrabold text-[#0B132B]">{currentMonth}</h3>
                        <IconChevronRight className="text-blue-600 w-5 h-5 shrink-0" stroke={2.5} />
                    </div>
                    <p className="text-gray-500 text-xs font-medium z-10 mt-1">Manage monthly expenses</p>
                </div>

            </div>

            {/* ─── Pending Member Requests Section ─── */}
            <div className="bg-blue-50/50 rounded-3xl border border-blue-200 overflow-hidden shadow-sm">
                <div className="p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-blue-200 bg-white">
                    <div className="flex items-center gap-3 w-full sm:w-auto">
                        <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600 shadow-sm shrink-0">
                            <IconUserPlus className="w-5 h-5" stroke={2} />
                        </div>
                        <div>
                            <h2 className="text-lg font-extrabold text-gray-900">Pending Member Requests</h2>
                            <p className="text-xs font-bold text-gray-500 mt-0.5">Review and approve new member registrations.</p>
                        </div>
                    </div>
                    
                    <div className="flex items-center gap-3 w-full sm:w-auto justify-end flex-wrap">
                        <div className="bg-blue-100 text-blue-600 px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 border border-blue-200">
                            <IconClock size={14} /> {pendingMembers.length} Pending
                        </div>
                    </div>
                </div>
                
                <div className="bg-white overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50/50 border-b border-gray-100 text-xs font-bold text-gray-500 uppercase tracking-wider">
                                <th className="p-4 w-12">#</th>
                                <th className="p-4">Name</th>
                                <th className="p-4">Email Address</th>
                                <th className="p-4">Phone Number</th>
                                <th className="p-4">Status</th>
                                <th className="p-4 text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {isLoading ? (
                                <tr>
                                    <td colSpan={6} className="p-8 text-center text-gray-400 font-bold">Loading...</td>
                                </tr>
                            ) : pendingMembers.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="p-8 text-center text-gray-400 font-bold">No pending member requests.</td>
                                </tr>
                            ) : pendingMembers.map((user: any, idx: number) => (
                                <tr key={user.id} className="hover:bg-blue-50/30 transition-colors group">
                                    <td className="p-4 text-sm font-bold text-gray-500">{idx + 1}</td>
                                    <td className="p-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-blue-900 text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-sm">
                                                {user.name?.charAt(0) || 'M'}
                                            </div>
                                            <span className="font-extrabold text-gray-900 text-sm">{user.name || 'Member'}</span>
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <div className="flex items-center gap-1.5 text-sm font-bold text-gray-700">
                                            <IconMail size={16} className="text-gray-400" />
                                            {user.email}
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <div className="flex items-center gap-1.5 text-sm font-bold text-gray-500">
                                            <IconPhone size={16} className="text-gray-400" />
                                            {user.phone || 'N/A'}
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <span className="bg-amber-100 text-amber-700 px-3 py-1 rounded-md text-xs font-bold border border-amber-200">
                                            Pending
                                        </span>
                                    </td>
                                    <td className="p-4">
                                        <div className="flex items-center justify-center gap-2">
                                            <button onClick={() => handleMemberApproval(user.id, 'approve')} className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1 shadow-sm transition-colors">
                                                <IconCheck size={14} stroke={3} /> Approve
                                            </button>
                                            <button onClick={() => handleMemberApproval(user.id, 'reject')} className="bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1 shadow-sm transition-colors">
                                                <IconX size={14} stroke={3} /> Reject
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* ─── Data Table Section ─── */}
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
                
                {/* Table Header */}
                <div className="p-6 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-5">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center text-orange-600 shrink-0">
                            <IconUsersGroup className="w-5 h-5" stroke={2} />
                        </div>
                        <div>
                            <h2 className="text-lg font-extrabold text-gray-900">Mess Members</h2>
                            <p className="text-sm font-medium text-gray-500 mt-0.5">View and manage all mess members and roles</p>
                        </div>
                    </div>
                </div>

                {/* Table Content */}
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[800px]">
                        <thead>
                            <tr className="bg-[#F8FAFC] border-b border-gray-100">
                                <th className="py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider whitespace-nowrap">#</th>
                                <th className="py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider whitespace-nowrap">Name</th>
                                <th className="py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider whitespace-nowrap">Role</th>
                                <th className="py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider whitespace-nowrap">Status</th>
                                <th className="py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider text-right whitespace-nowrap">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            
                            {isLoading ? (
                                <tr>
                                    <td colSpan={5} className="text-center text-gray-400 font-bold py-10">Loading members...</td>
                                </tr>
                            ) : users.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="text-center text-gray-400 font-bold py-10">No members found.</td>
                                </tr>
                            ) : (
                                users.map((user, index) => (
                                    <tr key={user.id} className="hover:bg-gray-50/50 transition-colors">
                                        <td className="py-4 px-6 text-sm font-medium text-gray-500 whitespace-nowrap">{index + 1}</td>
                                        <td className="py-4 px-6 whitespace-nowrap">
                                            <div className="flex items-center gap-3">
                                                <div className="w-9 h-9 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center font-bold text-sm shrink-0 uppercase">
                                                    {user.name ? user.name.charAt(0) : "U"}
                                                </div>
                                                <div>
                                                    <span className="font-extrabold text-gray-900 block">{user.name || "Unnamed"}</span>
                                                    <span className="text-xs text-gray-500 font-medium">{user.email}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-4 px-6 whitespace-nowrap">
                                            {/* 💡 Dynamic role selector */}
                                            <select 
                                                value={user.role} 
                                                onChange={(e) => handleRoleChange(user.id, e.target.value)}
                                                className={`text-[10px] font-extrabold uppercase tracking-widest px-3 py-1.5 rounded-full border outline-none cursor-pointer transition-colors ${
                                                    user.role === 'admin' ? 'bg-purple-50 text-purple-600 border-purple-200' :
                                                    user.role === 'manager' ? 'bg-blue-50 text-blue-600 border-blue-200' :
                                                    user.role === 'suspended' ? 'bg-red-50 text-red-600 border-red-200' :
                                                    'bg-gray-50 text-gray-600 border-gray-200'
                                                }`}
                                            >
                                                <option value="member">Member</option>
                                                <option value="manager">Manager</option>
                                                <option value="admin">Admin</option>
                                                {user.role === 'suspended' && <option value="suspended">Suspended</option>}
                                            </select>
                                        </td>
                                        <td className="py-4 px-6 whitespace-nowrap">
                                            {user.role === 'suspended' ? (
                                                <span className="flex items-center gap-1.5">
                                                    <span className="w-2 h-2 rounded-full bg-red-500 shrink-0"></span>
                                                    <span className="text-sm font-bold text-red-600">Suspended</span>
                                                </span>
                                            ) : (
                                                <span className="flex items-center gap-1.5">
                                                    <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0"></span>
                                                    <span className="text-sm font-bold text-emerald-600">Active</span>
                                                </span>
                                            )}
                                        </td>
                                        <td className="py-4 px-6 text-right whitespace-nowrap">
                                            <div className="flex items-center justify-end gap-2">
                                                <button onClick={() => handleEditClick(user)} className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-200 rounded-lg text-sm font-bold text-gray-600 hover:bg-gray-50 transition-colors">
                                                    <IconEdit className="w-4 h-4" stroke={2} /> Edit
                                                </button>
                                                <div className="relative">
                                                    <button onClick={(e) => { e.stopPropagation(); setActiveDropdown(activeDropdown === user.id ? null : user.id); }} className="p-1.5 border border-gray-200 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-50 transition-colors cursor-pointer">
                                                        <IconDotsVertical className="w-5 h-5" stroke={2} />
                                                    </button>
                                                    {activeDropdown === user.id && (
                                                        <div className="absolute right-0 mt-2 w-40 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden z-50">
                                                            <button onClick={() => { setActiveDropdown(null); handleRoleChange(user.id, user.role === 'suspended' ? 'member' : 'suspended'); }} className="w-full text-left px-4 py-2 text-sm font-bold text-orange-600 hover:bg-orange-50 transition-colors cursor-pointer border-b border-gray-50">
                                                                {user.role === 'suspended' ? "Unsuspend" : "Suspend User"}
                                                            </button>
                                                            <button onClick={() => { setActiveDropdown(null); handleDeleteUser(user.id); }} className="w-full text-left px-4 py-2 text-sm font-bold text-red-600 hover:bg-red-50 transition-colors cursor-pointer">
                                                                Delete User
                                                            </button>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}

                        </tbody>
                    </table>
                </div>
            </div>

            {/* ─── Edit Modal ─── */}
            {isEditModalOpen && editingUser && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[100] p-4 animate-in fade-in duration-200">
                    <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
                        <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-[#F8FAFC]">
                            <h2 className="text-xl font-extrabold text-[#0B132B]">Edit Member</h2>
                            <button onClick={() => setIsEditModalOpen(false)} className="text-gray-400 hover:text-red-500 transition-colors p-2 rounded-full hover:bg-red-50 cursor-pointer">
                                <IconX size={24} />
                            </button>
                        </div>
                        
                        <form onSubmit={handleUpdateUser} className="p-6 space-y-5">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1.5">Full Name</label>
                                <input 
                                    type="text" 
                                    required 
                                    value={editingUser.name || ""} 
                                    onChange={(e) => setEditingUser({...editingUser, name: e.target.value})}
                                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-orange-500/50 outline-none transition-all font-medium text-gray-900 text-sm"
                                    placeholder="Enter full name"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1.5">Phone Number</label>
                                <input 
                                    type="text" 
                                    value={editingUser.phone || ""} 
                                    onChange={(e) => setEditingUser({...editingUser, phone: e.target.value})}
                                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-orange-500/50 outline-none transition-all font-medium text-gray-900 text-sm"
                                    placeholder="Enter phone number"
                                />
                            </div>
                            
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1.5">Role</label>
                                <select 
                                    value={editingUser.role} 
                                    onChange={(e) => setEditingUser({...editingUser, role: e.target.value})}
                                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-orange-500/50 outline-none transition-all font-medium text-gray-900 text-sm cursor-pointer"
                                >
                                    <option value="member">Member</option>
                                    <option value="manager">Manager</option>
                                    <option value="admin">Admin</option>
                                    {editingUser.role === 'suspended' && <option value="suspended">Suspended</option>}
                                </select>
                            </div>

                            <div className="pt-2 flex items-center justify-end gap-3">
                                <button type="button" onClick={() => setIsEditModalOpen(false)} className="px-5 py-2.5 text-sm font-bold text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-colors cursor-pointer">
                                    Cancel
                                </button>
                                <button type="submit" className="px-5 py-2.5 text-sm font-bold text-white bg-orange-500 hover:bg-orange-600 rounded-xl shadow-md shadow-orange-500/20 transition-all flex items-center gap-2 cursor-pointer">
                                    <IconCheck size={18} stroke={3} /> Save Changes
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

        </div>
    );
}