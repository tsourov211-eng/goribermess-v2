"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { 
    IconReceipt2, 
    IconToolsKitchen2, 
    IconCalendarUser,
    IconArrowRight,
    IconShoppingBag,
    IconClock,
    IconCheck,
    IconX,
    IconWallet
} from "@tabler/icons-react";

export default function ManagerDashboard() {
    const [stats, setStats] = useState({ totalMealsToday: 0, totalBazaarToday: 0 });
    const [pendingDeposits, setPendingDeposits] = useState<any[]>([]);
    const [pendingExpenses, setPendingExpenses] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const today = new Date();
    const formattedToday = today.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' });

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        try {
            const res = await fetch("/api/manager/dashboard");
            if (res.ok) {
                const data = await res.json();
                setStats(data.stats);
                setPendingDeposits(data.pendingDeposits);
                setPendingExpenses(data.pendingExpenses);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setIsLoading(false);
        }
    };

    // 💡 Approve বা Reject করার ফাংশন
    const handleAction = async (id: string, type: 'deposit' | 'expense', action: 'Approve' | 'Reject') => {
        if (!confirm(`Are you sure you want to ${action} this ${type}?`)) return;

        try {
            const res = await fetch("/api/manager/action", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id, type, action })
            });

            if (res.ok) {
                alert(`✅ ${type} ${action.toLowerCase()}ed successfully!`);
                fetchDashboardData(); // লিস্ট রিফ্রেশ করা
            } else {
                alert(`❌ Failed to ${action.toLowerCase()} ${type}.`);
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="max-w-7xl mx-auto space-y-6 lg:space-y-8 p-4">
            
            {/* ─── Greeting Section ─── */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5">
                <div>
                    <p className="text-gray-500 font-bold mb-1">Welcome back,</p>
                    <h1 className="text-2xl sm:text-4xl font-extrabold text-[#0B132B] tracking-tight">Manager Dashboard</h1>
                    <p className="text-gray-500 text-sm mt-2 font-medium">Overview of today's mess operations and pending approvals.</p>
                </div>
                
                <div className="bg-white px-5 py-3 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-3 w-full sm:w-auto">
                    <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center text-orange-500 shrink-0">
                        <IconClock className="w-5 h-5" stroke={2} />
                    </div>
                    <div>
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Today</p>
                        <p className="text-sm font-extrabold text-gray-900">{formattedToday}</p>
                    </div>
                </div>
            </div>

            {/* ─── Top Stats ─── */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
                
                <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm relative overflow-hidden flex flex-col justify-between min-h-[140px] group hover:border-orange-200 transition-colors">
                    <div className="flex justify-between items-start gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-teal-50 flex items-center justify-center text-teal-600 shrink-0">
                            <IconToolsKitchen2 className="w-6 h-6" stroke={2} />
                        </div>
                    </div>
                    <div className="mt-4 z-10">
                        <p className="text-gray-500 text-sm font-semibold mb-1">Total Meals Today</p>
                        <h3 className="text-3xl font-extrabold text-gray-900">{isLoading ? "..." : stats.totalMealsToday}</h3>
                    </div>
                    <IconToolsKitchen2 className="absolute -bottom-4 -right-4 w-24 h-24 text-teal-50/50 transform group-hover:scale-110 transition-transform" stroke={1} />
                </div>

                <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm relative overflow-hidden flex flex-col justify-between min-h-[140px] group hover:border-orange-200 transition-colors">
                    <div className="flex justify-between items-start gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-orange-50 flex items-center justify-center text-orange-500 shrink-0">
                            <IconShoppingBag className="w-6 h-6" stroke={2} />
                        </div>
                    </div>
                    <div className="mt-4 z-10">
                        <p className="text-gray-500 text-sm font-semibold mb-1">Today's Bazaar Cost</p>
                        <h3 className="text-3xl font-extrabold text-gray-900">৳ {isLoading ? "..." : stats.totalBazaarToday}</h3>
                    </div>
                    <IconShoppingBag className="absolute -bottom-4 -right-4 w-24 h-24 text-orange-50/50 transform group-hover:scale-110 transition-transform" stroke={1} />
                </div>

                <div className="bg-gradient-to-br from-[#0B132B] to-[#1c2a53] p-6 rounded-3xl border border-gray-800 shadow-lg relative overflow-hidden flex flex-col justify-between min-h-[140px]">
                    <div className="flex justify-between items-start gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-orange-400 shrink-0 backdrop-blur-sm">
                            <IconCalendarUser className="w-6 h-6" stroke={2} />
                        </div>
                        <span className="text-xs font-bold text-emerald-400 bg-emerald-400/10 px-3 py-1.5 rounded-lg border border-emerald-400/20">Assigned</span>
                    </div>
                    <div className="mt-4 z-10">
                        <p className="text-gray-400 text-sm font-semibold mb-1">Market Duty (Today)</p>
                        <h3 className="text-2xl font-extrabold text-white">Super Admin</h3>
                    </div>
                </div>
            </div>

            {/* ─── NEW: Pending Approvals Section ─── */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 pt-4">
                
                {/* 1. Pending Payments */}
                <div className="bg-white rounded-3xl border border-gray-100 shadow-sm flex flex-col overflow-hidden h-[450px]">
                    <div className="p-6 border-b border-gray-100 bg-[#F8FAFC] flex justify-between items-center sticky top-0 z-10">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                                <IconWallet size={20} stroke={2.5} />
                            </div>
                            <div>
                                <h2 className="text-lg font-extrabold text-gray-900">Pending Payments</h2>
                                <p className="text-xs font-bold text-gray-500 mt-0.5">Approve member deposits</p>
                            </div>
                        </div>
                        {pendingDeposits.length > 0 && (
                            <span className="bg-red-100 text-red-600 text-xs font-bold px-3 py-1 rounded-full animate-pulse">{pendingDeposits.length} New</span>
                        )}
                    </div>
                    
                    <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-4">
                        {isLoading ? (
                            <p className="text-center text-gray-400 font-bold py-10">Loading...</p>
                        ) : pendingDeposits.length === 0 ? (
                            <p className="text-center text-gray-400 font-bold py-10">No pending payments.</p>
                        ) : (
                            pendingDeposits.map((item) => (
                                <div key={item.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-2xl bg-gray-50 border border-gray-200 hover:border-blue-200 transition-all gap-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-[#0B132B] text-white flex items-center justify-center font-bold text-lg shrink-0">
                                            {item.user.name.charAt(0)}
                                        </div>
                                        <div>
                                            <h4 className="font-extrabold text-gray-900 text-sm">{item.user.name}</h4>
                                            <p className="text-xs font-bold text-gray-500 mt-0.5">৳ {item.amount} • {item.method}</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-2 w-full sm:w-auto">
                                        <button onClick={() => handleAction(item.id, 'deposit', 'Reject')} className="flex-1 sm:flex-none flex items-center justify-center gap-1 bg-white hover:bg-red-50 text-gray-600 hover:text-red-600 border border-gray-200 hover:border-red-200 text-xs font-bold px-4 py-2 rounded-xl transition-all">
                                            <IconX size={16} /> Reject
                                        </button>
                                        <button onClick={() => handleAction(item.id, 'deposit', 'Approve')} className="flex-1 sm:flex-none flex items-center justify-center gap-1 bg-blue-500 hover:bg-blue-600 text-white text-xs font-bold px-4 py-2 rounded-xl transition-all shadow-md shadow-blue-500/20">
                                            <IconCheck size={16} /> Approve
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* 2. Pending Bazaar Expenses */}
                <div className="bg-white rounded-3xl border border-gray-100 shadow-sm flex flex-col overflow-hidden h-[450px]">
                    <div className="p-6 border-b border-gray-100 bg-[#F8FAFC] flex justify-between items-center sticky top-0 z-10">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center">
                                <IconShoppingBag size={20} stroke={2.5} />
                            </div>
                            <div>
                                <h2 className="text-lg font-extrabold text-gray-900">Bazaar Expenses</h2>
                                <p className="text-xs font-bold text-gray-500 mt-0.5">Approve market costs</p>
                            </div>
                        </div>
                        {pendingExpenses.length > 0 && (
                            <span className="bg-red-100 text-red-600 text-xs font-bold px-3 py-1 rounded-full animate-pulse">{pendingExpenses.length} New</span>
                        )}
                    </div>
                    
                    <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-4">
                        {isLoading ? (
                            <p className="text-center text-gray-400 font-bold py-10">Loading...</p>
                        ) : pendingExpenses.length === 0 ? (
                            <p className="text-center text-gray-400 font-bold py-10">No pending expenses.</p>
                        ) : (
                            pendingExpenses.map((item) => (
                                <div key={item.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-2xl bg-gray-50 border border-gray-200 hover:border-orange-200 transition-all gap-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center font-bold text-lg shrink-0">
                                            {item.user.name.charAt(0)}
                                        </div>
                                        <div>
                                            <h4 className="font-extrabold text-gray-900 text-sm">{item.user.name}</h4>
                                            <p className="text-xs font-bold text-gray-500 mt-0.5">৳ {item.amount} • {new Date(item.date).toLocaleDateString()}</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-2 w-full sm:w-auto">
                                        <button onClick={() => handleAction(item.id, 'expense', 'Reject')} className="flex-1 sm:flex-none flex items-center justify-center gap-1 bg-white hover:bg-red-50 text-gray-600 hover:text-red-600 border border-gray-200 hover:border-red-200 text-xs font-bold px-4 py-2 rounded-xl transition-all">
                                            <IconX size={16} /> Reject
                                        </button>
                                        <button onClick={() => handleAction(item.id, 'expense', 'Approve')} className="flex-1 sm:flex-none flex items-center justify-center gap-1 bg-[#FF6B00] hover:bg-orange-600 text-white text-xs font-bold px-4 py-2 rounded-xl transition-all shadow-md shadow-orange-500/20">
                                            <IconCheck size={16} /> Approve
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
}