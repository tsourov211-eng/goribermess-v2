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
    IconPhone,
    IconChevronUp,
    IconChevronDown,
    IconShoppingBag,
    IconReceipt2,
    IconCalculator,
    IconArrowUpRight,
    IconArrowDownRight
} from "@tabler/icons-react";
import Link from "next/link";

export default function AdminDashboardPage() {
    const [users, setUsers] = useState<any[]>([]);
    const [pendingMembers, setPendingMembers] = useState<any[]>([]);
    const [stats, setStats] = useState({ totalFoodCost: 0, messFund: 0, totalMembers: 0, totalMessMeals: 0, liveMealRate: 0 });
    const [isLoading, setIsLoading] = useState(true);

    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editingUser, setEditingUser] = useState<any>(null);
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
    const [isPendingExpanded, setIsPendingExpanded] = useState(false);

    // Mobile specific states
    const [todayBazaarTotal, setTodayBazaarTotal] = useState(0);
    const [bazaarSchedules, setBazaarSchedules] = useState<any[]>([]);
    const [todayExpenses, setTodayExpenses] = useState<any[]>([]);

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
        // Detect if mobile (roughly) or just fetch for all to be safe
        fetchMobileDashboardData();
    }, []);

    const fetchMobileDashboardData = async () => {
        try {
            const res = await fetch("/api/bazaar");
            if (res.ok) {
                const data = await res.json();
                setBazaarSchedules(data.schedules?.slice(0, 4) || []);
                setTodayExpenses(data.expenses || []);
                setTodayBazaarTotal(data.todayTotal || 0);
            }
        } catch (e) {
            console.error("Error fetching mobile dashboard data:", e);
        }
    };

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
        <div className="flex flex-col max-w-7xl mx-auto gap-5 md:gap-8 pb-6 md:pb-0 animate-in fade-in zoom-in-95 duration-300">
            
            {/* ─── Header Section (Desktop) ─── */}
            <div className="hidden md:flex flex-col md:flex-row md:items-center justify-between gap-5 order-none">
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

            {/* ─── Stats Grid (Desktop) ─── */}
            <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 order-none">
                
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
                        <div className="flex flex-col items-end gap-1.5">
                            <span className="text-[10px] sm:text-xs font-bold text-orange-600 bg-orange-50 px-2.5 py-1 rounded-md border border-orange-100">
                                Meal Rate: ৳ {isLoading ? "..." : stats.liveMealRate}
                            </span>
                            <p className="text-gray-500 text-xs font-semibold text-right">Total Food Cost (This Month)</p>
                        </div>
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

            {/* ─── Pending Requests Accordion (Mobile) ─── */}
            <div className="md:hidden mx-5 order-4">
                <div className="bg-blue-50/60 rounded-3xl border border-blue-100 shadow-sm overflow-hidden transition-all duration-300">
                    <div 
                        onClick={() => setIsPendingExpanded(!isPendingExpanded)}
                        className="p-4 flex items-center justify-between gap-4 cursor-pointer"
                    >
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-2xl bg-blue-100/70 flex items-center justify-center text-blue-600 shrink-0">
                                <IconUserPlus className="w-6 h-6" stroke={2} />
                            </div>
                            <div>
                                <h3 className="text-sm font-extrabold text-gray-900 leading-tight">Pending Member Requests</h3>
                                <p className="text-[11px] text-gray-500 font-medium leading-tight mt-1 pr-4">Review and approve new member registrations.</p>
                            </div>
                        </div>
                    </div>
                    
                    {/* Collapsed Badge Row */}
                    <div className="px-4 pb-4 flex justify-between items-center" onClick={() => setIsPendingExpanded(!isPendingExpanded)}>
                        <span className="bg-blue-200/50 text-blue-700 px-3 py-1.5 rounded-[10px] text-xs font-bold border border-blue-200/50 flex items-center gap-1.5">
                            <IconClock size={16} stroke={2.5} /> {pendingMembers.length} Pending
                        </span>
                        <div className="w-9 h-9 bg-white rounded-xl shadow-sm border border-gray-100 flex items-center justify-center text-gray-600 cursor-pointer">
                            <IconChevronDown size={20} stroke={2.5} className={`transition-transform duration-300 ${isPendingExpanded ? "rotate-180" : ""}`} />
                        </div>
                    </div>

                    {isPendingExpanded && (
                        <div className="px-4 pb-4 space-y-3 border-t border-blue-100/60 pt-3 animate-in slide-in-from-top-2 fade-in duration-200">
                            {isLoading ? (
                                <p className="text-center text-gray-400 font-bold py-4 text-xs">Loading...</p>
                            ) : pendingMembers.length === 0 ? (
                                <p className="text-center text-gray-400 font-bold py-4 text-xs">No pending member requests.</p>
                            ) : (
                                pendingMembers.map((user: any, idx: number) => (
                                    <div key={user.id} className="flex justify-between items-center bg-white border border-blue-100 rounded-2xl p-3 shadow-sm">
                                        <div className="flex items-center gap-3 min-w-0">
                                            <span className="text-xs font-bold text-gray-400 w-3">{idx + 1}</span>
                                            <div className="w-9 h-9 rounded-full bg-blue-900 text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-sm">
                                                {user.name?.charAt(0) || 'M'}
                                            </div>
                                            <div className="min-w-0">
                                                <p className="font-extrabold text-gray-900 text-sm truncate">{user.name || 'Member'}</p>
                                                <p className="text-[11px] font-bold text-gray-500 truncate">{user.email}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-1.5 shrink-0 ml-2">
                                            <button onClick={() => handleMemberApproval(user.id, 'approve')} className="bg-emerald-50 hover:bg-emerald-100 text-emerald-600 border border-emerald-200 px-2.5 py-1.5 rounded-lg text-xs font-bold shadow-sm transition-colors">
                                                Approve
                                            </button>
                                            <button onClick={() => handleMemberApproval(user.id, 'reject')} className="bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 px-2.5 py-1.5 rounded-lg text-xs font-bold shadow-sm transition-colors">
                                                Reject
                                            </button>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    )}
                </div>
            </div>

            {/* ─── Pending Member Requests Section (Desktop) ─── */}
            <div className="hidden md:block bg-blue-50/50 rounded-3xl border border-blue-200 overflow-hidden shadow-sm mx-0">
                <div className="p-6 flex items-center justify-between gap-4 border-b border-blue-200 bg-white">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600 shadow-sm shrink-0">
                            <IconUserPlus className="w-5 h-5" stroke={2} />
                        </div>
                        <div>
                            <h2 className="text-lg font-extrabold text-gray-900">Pending Member Requests</h2>
                            <p className="text-xs font-bold text-gray-500 mt-0.5">Review and approve new member registrations.</p>
                        </div>
                    </div>
                    <div className="bg-blue-100 text-blue-600 px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 border border-blue-200">
                        <IconClock size={14} /> {pendingMembers.length} Pending
                    </div>
                </div>
                <div className="bg-white overflow-x-hidden p-0">
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
                                            <div className="w-8 h-8 rounded-full bg-blue-900 text-white flex items-center justify-center font-bold text-sm shrink-0 shadow-sm">
                                                {user.name?.charAt(0) || 'M'}
                                            </div>
                                            <span className="font-extrabold text-gray-900 text-sm">{user.name || 'Member'}</span>
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <div className="flex items-center gap-1.5 text-sm font-bold text-gray-700">
                                            <IconMail size={16} className="text-gray-400 shrink-0" />
                                            <span className="truncate">{user.email}</span>
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <div className="flex items-center gap-1.5 text-sm font-bold text-gray-500">
                                            <IconPhone size={16} className="text-gray-400 shrink-0" />
                                            <span>{user.phone || 'N/A'}</span>
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

            {/* ─── Data Table Section (Shared) ─── */}
            <div className="bg-orange-50/40 md:bg-white rounded-3xl border border-orange-100/50 md:border-gray-100 shadow-sm overflow-hidden mx-5 md:mx-0 order-5 md:order-none">
                
                {/* Table Header */}
                <div className="p-5 md:p-6 border-b border-orange-100/60 md:border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-5">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 md:w-10 md:h-10 rounded-2xl md:rounded-xl bg-orange-100 md:bg-orange-50 flex items-center justify-center text-orange-600 shrink-0">
                            <IconUsersGroup className="w-6 h-6 md:w-5 md:h-5" stroke={2} />
                        </div>
                        <div>
                            <h2 className="text-[15px] md:text-lg font-extrabold text-gray-900">Mess Members</h2>
                            <p className="text-[11px] md:text-sm font-medium text-gray-500 mt-1 md:mt-0.5 pr-4">View and manage all mess members and roles.</p>
                        </div>
                    </div>
                </div>

                {/* Table Content */}
                <div className="bg-gray-50/30 md:bg-white overflow-x-hidden p-4 md:p-0 rounded-b-3xl">
                    
                    {/* ─── MOBILE VIEW: Mess Members ─── */}
                    <div className="md:hidden space-y-3">
                        {isLoading ? (
                            <p className="text-center text-gray-400 font-bold py-10">Loading members...</p>
                        ) : users.length === 0 ? (
                            <p className="text-center text-gray-400 font-bold py-10">No members found.</p>
                        ) : (
                            users.map((user, index) => (
                                <div key={user.id} className="flex justify-between items-center bg-white border border-gray-200 rounded-2xl p-4 shadow-sm">
                                    {/* Left Side: User Info */}
                                    <div className="flex items-center gap-3 min-w-0">
                                        <span className="text-sm font-bold text-gray-400 w-3">{index + 1}</span>
                                        <div className="w-10 h-10 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center font-bold text-base shrink-0 uppercase shadow-sm">
                                            {user.name ? user.name.charAt(0) : "U"}
                                        </div>
                                        <div className="min-w-0">
                                            <p className="font-extrabold text-gray-900 text-base truncate">{user.name || "Unnamed"}</p>
                                            <p className="text-xs font-bold text-gray-500 truncate">{user.email}</p>
                                        </div>
                                    </div>
                                    {/* Right Side: Status & Actions */}
                                    <div className="flex flex-col justify-center gap-2 shrink-0 ml-2 w-24">
                                        <span className={`flex items-center justify-center gap-1.5 w-full text-[10px] font-extrabold uppercase tracking-widest py-1.5 rounded-lg border ${
                                            user.role === 'admin' ? 'bg-purple-50 text-purple-600 border-purple-200' :
                                            user.role === 'manager' ? 'bg-blue-50 text-blue-600 border-blue-200' :
                                            user.role === 'suspended' ? 'bg-red-50 text-red-600 border-red-200' :
                                            'bg-gray-50 text-gray-600 border-gray-200'
                                        }`}>
                                            <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${user.role === 'suspended' ? 'bg-red-500' : 'bg-emerald-500'}`}></span>
                                            {user.role}
                                        </span>
                                        <button 
                                            onClick={() => { setEditingUser(user); setIsEditModalOpen(true); setActiveDropdown(null); }}
                                            className="w-full flex items-center justify-center bg-gray-50 hover:bg-gray-100 text-gray-700 border border-gray-200 py-1.5 rounded-lg text-xs font-bold transition-colors shadow-sm"
                                        >
                                            Edit
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    {/* ─── DESKTOP VIEW: Mess Members ─── */}
                    <table className="hidden md:table w-full text-left border-collapse min-w-0 md:min-w-[800px]">
                        <thead className="hidden md:table-header-group">
                            <tr className="bg-[#F8FAFC] border-b border-gray-100">
                                <th className="py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider whitespace-nowrap">#</th>
                                <th className="py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider whitespace-nowrap">Name</th>
                                <th className="py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider whitespace-nowrap">Role</th>
                                <th className="py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider whitespace-nowrap">Status</th>
                                <th className="py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider text-right whitespace-nowrap">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="block md:table-row-group space-y-4 md:space-y-0 md:divide-y md:divide-gray-100">
                            
                            {isLoading ? (
                                <tr className="block md:table-row">
                                    <td colSpan={5} className="block md:table-cell text-center text-gray-400 font-bold py-10">Loading members...</td>
                                </tr>
                            ) : users.length === 0 ? (
                                <tr className="block md:table-row">
                                    <td colSpan={5} className="block md:table-cell text-center text-gray-400 font-bold py-10">No members found.</td>
                                </tr>
                            ) : (
                                users.map((user, index) => (
                                    <tr key={user.id} className="block md:table-row bg-white border border-gray-200 md:border-0 rounded-2xl md:rounded-none p-5 md:p-0 hover:bg-gray-50/50 transition-colors group shadow-sm md:shadow-none">
                                        <td className="hidden md:table-cell py-4 px-6 text-sm font-medium text-gray-500 whitespace-nowrap">{index + 1}</td>
                                        
                                        <td className="block md:table-cell p-0 md:py-4 md:px-6 md:whitespace-nowrap mb-4 md:mb-0">
                                            <div className="flex items-center gap-3">
                                                <div className="w-12 h-12 md:w-9 md:h-9 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center font-bold text-base md:text-sm shrink-0 uppercase">
                                                    {user.name ? user.name.charAt(0) : "U"}
                                                </div>
                                                <div className="min-w-0">
                                                    <span className="font-extrabold text-gray-900 block text-base md:text-sm truncate">{user.name || "Unnamed"}</span>
                                                    <span className="text-sm md:text-xs text-gray-500 font-medium truncate block">{user.email}</span>
                                                </div>
                                            </div>
                                        </td>
                                        
                                        <td className="inline-block md:table-cell p-0 md:py-4 md:px-6 md:whitespace-nowrap mr-4 md:mr-0 align-middle">
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
                                        
                                        <td className="inline-block md:table-cell p-0 md:py-4 md:px-6 md:whitespace-nowrap align-middle">
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
                                        
                                        <td className="block md:table-cell p-0 md:py-4 md:px-6 md:whitespace-nowrap mt-4 md:mt-0 pt-4 md:pt-0 border-t border-gray-100 md:border-0">
                                            <div className="flex items-center justify-between md:justify-end gap-2 relative">
                                                <button onClick={() => handleEditClick(user)} className="flex items-center justify-center gap-1.5 flex-1 md:flex-none px-3 py-2 md:py-1.5 border border-gray-200 rounded-lg text-sm font-bold text-gray-600 hover:bg-gray-50 transition-colors">
                                                    <IconEdit className="w-4 h-4 md:w-4 md:h-4" stroke={2} /> Edit Member
                                                </button>
                                                <div className="relative">
                                                    <button onClick={(e) => { e.stopPropagation(); setActiveDropdown(activeDropdown === user.id ? null : user.id); }} className="p-2 md:p-1.5 border border-gray-200 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-50 transition-colors cursor-pointer">
                                                        <IconDotsVertical className="w-5 h-5 md:w-5 md:h-5" stroke={2} />
                                                    </button>
                                                    {activeDropdown === user.id && (
                                                        <div className="absolute right-0 bottom-full md:bottom-auto mt-0 md:mt-2 mb-2 md:mb-0 w-40 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden z-[60]">
                                                            <button onClick={() => { setActiveDropdown(null); handleRoleChange(user.id, user.role === 'suspended' ? 'member' : 'suspended'); }} className="w-full text-left px-4 py-3 md:py-2 text-sm font-bold text-orange-600 hover:bg-orange-50 transition-colors cursor-pointer border-b border-gray-50">
                                                                {user.role === 'suspended' ? "Unsuspend" : "Suspend User"}
                                                            </button>
                                                            <button onClick={() => { setActiveDropdown(null); handleDeleteUser(user.id); }} className="w-full text-left px-4 py-3 md:py-2 text-sm font-bold text-red-600 hover:bg-red-50 transition-colors cursor-pointer">
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

            {/* ─── MOBILE EXCLUSIVES ─── */}
            {/* ─── Welcome Header (Mobile) ─── */}
            <div className="md:hidden mx-5 mt-4 order-1 flex justify-between items-start">
                <div>
                    <p className="text-gray-500 text-sm font-medium">Welcome Back,</p>
                    <h1 className="text-2xl sm:text-[28px] font-extrabold text-gray-900 flex items-center gap-1.5 mt-0.5">
                        Super Admin 👋
                    </h1>
                    <p className="text-gray-500 text-[11px] sm:text-xs mt-1.5 font-medium italic">"Good Food Brings Great People Together"</p>
                </div>
                <div className="bg-white px-3 py-2.5 rounded-[20px] flex items-center gap-2 shadow-sm border border-gray-100 shrink-0">
                    <IconCalendar className="w-5 h-5 text-gray-500" stroke={1.5} />
                    <div className="flex flex-col">
                        <span className="text-[10px] font-bold text-gray-500 leading-tight">Monday</span>
                        <span className="text-[11px] sm:text-xs font-extrabold text-gray-900 leading-tight mt-0.5">Sep 21, 2026</span>
                    </div>
                </div>
            </div>

            {/* ─── Quick Stats Grid (Mobile) ─── */}
            <div className="md:hidden grid grid-cols-3 gap-2.5 mx-5 order-2">
                {/* Food Cost */}
                <div className="bg-orange-50/80 p-3.5 rounded-[24px] border border-orange-100 shadow-sm relative overflow-hidden flex flex-col justify-between min-h-[130px]">
                    <div className="w-9 h-9 rounded-full bg-orange-200/50 flex items-center justify-center text-orange-600 shrink-0">
                        <IconReceipt2 className="w-5 h-5" stroke={2} />
                    </div>
                    <div className="mt-3">
                        <p className="text-gray-500 text-[10px] font-bold leading-tight">Total Food Cost</p>
                        <h3 className="text-sm sm:text-base font-extrabold text-gray-900 mt-1 truncate">Tk {stats.totalFoodCost.toLocaleString()}</h3>
                    </div>
                    <div className="flex items-center gap-1 mt-1.5">
                        <IconArrowUpRight className="w-3.5 h-3.5 text-orange-600" stroke={3} />
                        <span className="text-[10px] font-extrabold text-orange-600">+12%</span>
                    </div>
                </div>

                {/* Bazaar */}
                <div className="bg-emerald-50/80 p-3.5 rounded-[24px] border border-emerald-100 shadow-sm relative overflow-hidden flex flex-col justify-between min-h-[130px]">
                    <div className="w-9 h-9 rounded-full bg-emerald-200/50 flex items-center justify-center text-emerald-600 shrink-0">
                        <IconShoppingBag className="w-5 h-5" stroke={2} />
                    </div>
                    <div className="mt-3">
                        <p className="text-gray-500 text-[10px] font-bold leading-tight">Today's Bazaar</p>
                        <h3 className="text-sm sm:text-base font-extrabold text-gray-900 mt-1 truncate">Tk {todayBazaarTotal.toLocaleString()}</h3>
                    </div>
                    <div className="flex items-center gap-1 mt-1.5">
                        <IconArrowDownRight className="w-3.5 h-3.5 text-emerald-600" stroke={3} />
                        <span className="text-[10px] font-extrabold text-emerald-600">-8%</span>
                    </div>
                </div>

                {/* Mess Fund */}
                <div className="bg-purple-50/80 p-3.5 rounded-[24px] border border-purple-100 shadow-sm relative overflow-hidden flex flex-col justify-between min-h-[130px]">
                    <div className="w-9 h-9 rounded-full bg-purple-200/50 flex items-center justify-center text-purple-600 shrink-0">
                        <IconWallet className="w-5 h-5" stroke={2} />
                    </div>
                    <div className="mt-3">
                        <p className="text-gray-500 text-[10px] font-bold leading-tight">Mess Fund</p>
                        <h3 className="text-sm sm:text-base font-extrabold text-gray-900 mt-1 truncate">Tk {stats.messFund.toLocaleString()}</h3>
                    </div>
                    <div className="flex items-center gap-1 mt-1.5">
                        <IconArrowUpRight className="w-3.5 h-3.5 text-purple-600" stroke={3} />
                        <span className="text-[10px] font-extrabold text-purple-600">+5%</span>
                    </div>
                </div>
            </div>

            <div className="hidden">
                {/* Bazaar Schedule List Card */}
                <div className="bg-white rounded-3xl shadow-sm p-4 border border-gray-50">
                    <div className="flex items-center justify-between mb-4 pb-2 border-b border-gray-50">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center text-orange-500 shrink-0">
                                <IconCalendarEvent stroke={2} size={20} />
                            </div>
                            <div>
                                <h3 className="font-extrabold text-sm text-gray-900">Bazaar Schedule</h3>
                                <p className="text-[10px] font-semibold text-gray-400 mt-0.5">Upcoming bazaar and responsibility</p>
                            </div>
                        </div>
                        <Link href="/bazaar" className="bg-orange-50 text-orange-600 font-bold text-[10px] px-3 py-1.5 rounded-full flex items-center gap-1">
                            View All <IconChevronRight size={12} stroke={3} />
                        </Link>
                    </div>

                    <div className="space-y-3">
                        {bazaarSchedules.length === 0 ? (
                            <p className="text-center text-xs text-gray-400 font-medium py-2">No upcoming schedules.</p>
                        ) : (
                            bazaarSchedules.map((schedule, idx) => {
                                const d = new Date(schedule.date);
                                const dayStr = d.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase();
                                const dateStr = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
                                const uInitial = schedule.user?.name ? schedule.user.name.charAt(0).toUpperCase() : "M";

                                return (
                                    <div key={schedule.id} className="grid grid-cols-[auto_1fr_auto_minmax(90px,auto)] items-center gap-3 py-2 border-b border-gray-50/70 last:border-0 last:pb-0">
                                        <div className="text-center w-[45px] shrink-0">
                                            <p className="text-[10px] font-extrabold text-gray-400">{dayStr}</p>
                                            <p className="text-xs font-bold text-gray-700">{dateStr}</p>
                                        </div>
                                        <div className="pl-3 border-l border-gray-100">
                                            <p className="text-[13px] font-extrabold text-gray-900 leading-tight">{idx === 0 ? "Tomorrow" : "Next"}</p>
                                            <p className="text-[10px] font-semibold text-gray-400 flex items-center gap-1 mt-0.5">
                                                <IconReceipt2 size={10} /> Monthly Bazaar
                                            </p>
                                        </div>
                                        <div>
                                            <span className="bg-emerald-50 text-emerald-600 font-bold text-[9px] px-2 py-1 rounded-md">Approved</span>
                                        </div>
                                        <div className="flex items-center justify-end gap-1.5">
                                            <div className="w-6 h-6 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center font-bold text-[10px] shrink-0">
                                                {uInitial}
                                            </div>
                                            <span className="text-[11px] font-extrabold text-gray-900 truncate max-w-[65px]">{schedule.user?.name?.split(" ")[0]}</span>
                                        </div>
                                    </div>
                                );
                            })
                        )}
                    </div>
                </div>

                {/* Today's Expenses List Card */}
                <div className="bg-white rounded-3xl shadow-sm p-4 border border-gray-50">
                    <div className="flex items-center justify-between mb-4 pb-2 border-b border-gray-50">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center text-red-500 shrink-0">
                                <IconReceipt2 stroke={2} size={20} />
                            </div>
                            <div>
                                <h3 className="font-extrabold text-sm text-gray-900">Today's Expenses</h3>
                                <p className="text-[10px] font-semibold text-gray-400 mt-0.5">History of market purchases for today</p>
                            </div>
                        </div>
                        <Link href="/bazaar" className="bg-orange-50 text-orange-600 font-bold text-[10px] px-3 py-1.5 rounded-full flex items-center gap-1">
                            Monthly History <IconChevronRight size={12} stroke={3} />
                        </Link>
                    </div>

                    <div className="space-y-3">
                        {/* Table Header pseudo */}
                        <div className="flex items-center justify-between text-[10px] font-extrabold text-gray-400 px-1 mb-1">
                            <span className="w-1/2">ITEM</span>
                            <span className="w-1/4 text-center">AMOUNT</span>
                            <span className="w-1/4 text-right">STATUS</span>
                        </div>

                        {todayExpenses.length === 0 ? (
                            <p className="text-center text-xs text-gray-400 font-medium py-3">No expenses today.</p>
                        ) : (
                            todayExpenses.map((expense) => {
                                const uInitial = expense.user?.name ? expense.user.name.charAt(0).toUpperCase() : "E";
                                return (
                                    <div key={expense.id} className="flex items-center justify-between py-2 border-b border-gray-50/70 last:border-0 last:pb-0">
                                        <div className="flex items-center gap-3 w-1/2">
                                            <div className="w-8 h-8 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center font-bold text-xs shrink-0">
                                                {uInitial}
                                            </div>
                                            <div className="min-w-0">
                                                <p className="text-[13px] font-extrabold text-gray-900 truncate">{expense.user?.name || "Member"}</p>
                                                <p className="text-[10px] font-semibold text-gray-400 truncate">{expense.description}</p>
                                            </div>
                                        </div>
                                        <div className="w-1/4 text-center">
                                            <p className="text-xs font-extrabold text-red-600">Tk {expense.amount}</p>
                                        </div>
                                        <div className="w-1/4 flex justify-end">
                                            <span className="bg-emerald-50 text-emerald-600 font-bold text-[9px] px-2 py-1 rounded-md">Approved</span>
                                        </div>
                                    </div>
                                );
                            })
                        )}
                    </div>
                </div>
            </div>

            {/* ─── Monthly Expense Setup (Mobile) ─── */}
            <div className="md:hidden mx-5 order-3">
                <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-4 flex items-center justify-between gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-orange-50 flex items-center justify-center text-orange-500 shrink-0">
                        <IconCalculator className="w-6 h-6" stroke={2} />
                    </div>
                    <div className="flex-1 pr-1">
                        <h3 className="text-[13px] font-extrabold text-gray-900 leading-tight">Set Monthly Expense</h3>
                        <p className="text-[10px] text-gray-500 font-medium leading-tight mt-1">Update room, utility, internet, maid charge and monthly meal charge.</p>
                    </div>
                    <Link href="/admin/monthly-expense" className="bg-[#FF6B00] hover:bg-orange-600 text-white pl-3.5 pr-2 py-3 rounded-2xl flex items-center gap-0.5 shadow-md shadow-orange-500/30 shrink-0 transition-transform active:scale-95">
                        <div className="flex flex-col text-left mr-0.5">
                            <span className="text-[10px] font-extrabold leading-tight">Configure</span>
                            <span className="text-[10px] font-extrabold leading-tight">Monthly Expense</span>
                        </div>
                        <IconChevronRight size={18} stroke={3} />
                    </Link>
                </div>
            </div>

        {/* ─── Shared Modals ─── */}
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