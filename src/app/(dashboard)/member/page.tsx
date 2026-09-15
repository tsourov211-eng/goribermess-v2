"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { 
    IconWallet, 
    IconToolsKitchen2, 
    IconCalendarEvent,
    IconBell,
    IconReceipt2,
    IconCheck,
    IconAlertCircle,
    IconCalculator,
    IconCoin,
    IconSend,
    IconShoppingCart,
    IconChevronLeft,
    IconChevronRight,
    IconCircleCheck
} from "@tabler/icons-react";

export default function MemberDashboard() {
    const { data: session, status } = useSession(); 

    // ─── States ───
    const [totalDeposit, setTotalDeposit] = useState(0);
    const [totalMeals, setTotalMeals] = useState(0);
    const [currentBalance, setCurrentBalance] = useState(0);
    const [liveMealRate, setLiveMealRate] = useState(0);
    const [recentMeals, setRecentMeals] = useState<any[]>([]);
    
    const [notices, setNotices] = useState<any[]>([]);
    const [isLoadingData, setIsLoadingData] = useState(true);

    // 💡 NEW: Finance States (পেমেন্ট এবং বাজারের জন্য)
    const [paymentAmount, setPaymentAmount] = useState("");
    const [paymentNote, setPaymentNote] = useState("");
    const [isSubmittingPayment, setIsSubmittingPayment] = useState(false);

    const [expenseAmount, setExpenseAmount] = useState("");
    const [expenseDetails, setExpenseDetails] = useState("");
    const [isSubmittingExpense, setIsSubmittingExpense] = useState(false);

    const today = new Date();
    const formattedToday = today.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const res = await fetch("/api/members/dashboard-data");
                if (res.ok) {
                    const data = await res.json();
                    
                    setTotalDeposit(data.stats.totalDeposit);
                    setTotalMeals(data.stats.totalMeals);
                    setCurrentBalance(data.stats.currentBalance);
                    setLiveMealRate(data.stats.liveMealRate);

                    setRecentMeals(data.recentMeals || []);
                    setNotices(data.notices || []);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setIsLoadingData(false);
            }
        };

        if (status === "authenticated") {
            fetchDashboardData();
        }
    }, [status]);

    // ডামি বাজার ডেটা (ভবিষ্যতে ডাটাবেস থেকে আসবে)
    const bazarDates = [
        { day: "02", status: "Done" },
        { day: "07", status: "Done" },
        { day: "12", status: "Done" },
        { day: "16", status: "Upcoming" },
        { day: "21", status: "--" },
        { day: "27", status: "--" }
    ];

    // 💡 Payment Request Submit Logic (API Connection)
    const handlePaymentSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!paymentAmount) return alert("Please enter amount");

        setIsSubmittingPayment(true);
        try {
            const res = await fetch("/api/members/finance", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ type: "payment", amount: paymentAmount, note: paymentNote })
            });

            if (res.ok) {
                alert("✅ Payment request sent to manager for approval!");
                setPaymentAmount(""); // ইনপুট ক্লিয়ার করা
                setPaymentNote("");
            } else {
                alert("❌ Failed to send payment request.");
            }
        } catch (error) {
            console.error(error);
            alert("❌ An error occurred while submitting.");
        } finally {
            setIsSubmittingPayment(false);
        }
    };

    // 💡 Expense Submit Logic (API Connection)
    const handleExpenseSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!expenseAmount) return alert("Please enter expense amount");

        setIsSubmittingExpense(true);
        try {
            const res = await fetch("/api/members/finance", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ type: "expense", amount: expenseAmount, note: expenseDetails })
            });

            if (res.ok) {
                alert("✅ Bazar expense submitted successfully!");
                setExpenseAmount(""); // ইনপুট ক্লিয়ার করা
                setExpenseDetails("");
            } else {
                alert("❌ Failed to submit expense.");
            }
        } catch (error) {
            console.error(error);
            alert("❌ An error occurred while submitting.");
        } finally {
            setIsSubmittingExpense(false);
        }
    };

    const systemAlert = currentBalance < 0 
        ? { title: "Payment Overdue", description: `Your balance is negative (৳${Math.abs(currentBalance)}). Please clear your dues immediately.`, type: "alert" }
        : null;

    const topNotification = systemAlert || (notices.length > 0 ? notices[0] : null);

    return (
        <div className="max-w-7xl mx-auto space-y-6 lg:space-y-8 p-4">
            
            {/* ─── Greeting Section ─── */}
            <div className="space-y-4">
                <div className="flex justify-between items-start gap-4">
                    <div>
                        <p className="text-gray-500 font-bold mb-1">Welcome back,</p>
                        <h1 className="text-2xl sm:text-4xl font-extrabold text-[#0B132B] tracking-tight">
                            {session?.user?.name || "Member"}
                        </h1>
                    </div>
                    <div className="bg-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl border border-gray-100 shadow-sm shrink-0 text-right">
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">Today</p>
                        <p className="text-xs sm:text-sm font-extrabold text-gray-800">{formattedToday}</p>
                    </div>
                </div>
                <p className="text-gray-500 text-sm font-medium">Here is your current mess status and upcoming schedule.</p>
                
                {/* 💡 Top Notification Bar */}
                {topNotification ? (
                    <div className={`px-4 py-3 sm:px-5 sm:py-3.5 rounded-2xl border shadow-sm flex items-center gap-3 w-full ${topNotification.type === 'alert' ? 'bg-red-50/80 border-red-200' : 'bg-orange-50/60 border-orange-200'}`}>
                        <div className={`w-10 h-10 rounded-xl bg-white border flex items-center justify-center shrink-0 shadow-sm ${topNotification.type === 'alert' ? 'border-red-100 text-red-500' : 'border-orange-100 text-orange-500'}`}>
                            <IconBell className="w-5 h-5" stroke={2.5} />
                        </div>
                        <div>
                            <p className={`text-[10px] font-extrabold uppercase tracking-wider mb-0.5 ${topNotification.type === 'alert' ? 'text-red-600' : 'text-orange-600'}`}>
                                {topNotification.title || "Notification"}
                            </p>
                            <p className="text-xs sm:text-sm font-bold text-gray-800 line-clamp-1 sm:line-clamp-none">
                                {topNotification.description}
                            </p>
                        </div>
                    </div>
                ) : (
                    <div className="bg-gray-50 px-4 py-3 sm:px-5 sm:py-3.5 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-3 w-full">
                        <div className="w-10 h-10 rounded-xl bg-white border border-gray-100 flex items-center justify-center shrink-0 shadow-sm text-gray-400">
                            <IconCheck className="w-5 h-5" stroke={2.5} />
                        </div>
                        <div>
                            <p className="text-[10px] font-extrabold text-gray-500 uppercase tracking-wider mb-0.5">All Clear</p>
                            <p className="text-xs sm:text-sm font-bold text-gray-700 line-clamp-1 sm:line-clamp-none">
                                You have no new alerts at the moment.
                            </p>
                        </div>
                    </div>
                )}
            </div>

            {/* ─── Top Stats ─── */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
                <div className="order-2 md:order-1 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm relative overflow-hidden flex flex-col justify-between min-h-[140px]">
                    <div className="flex justify-between items-start gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-500 shrink-0">
                            <IconWallet className="w-6 h-6" stroke={2} />
                        </div>
                        <span className="text-xs font-bold text-gray-500 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100">This Month</span>
                    </div>
                    <div className="mt-4 z-10">
                        <p className="text-gray-500 text-sm font-semibold mb-1">Total Deposit</p>
                        <h3 className="text-3xl font-extrabold text-gray-900">৳ {isLoadingData ? "..." : totalDeposit}</h3>
                    </div>
                    <IconWallet className="absolute -bottom-4 -right-4 w-24 h-24 text-blue-50/50" stroke={1} />
                </div>
                <div className="order-3 md:order-2 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm relative overflow-hidden flex flex-col justify-between min-h-[140px]">
                    <div className="flex justify-between items-start gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-teal-50 flex items-center justify-center text-teal-600 shrink-0">
                            <IconToolsKitchen2 className="w-6 h-6" stroke={2} />
                        </div>
                        <Link href="/member/my-meals" className="text-xs font-bold text-orange-600 hover:text-orange-700 bg-orange-50 px-3 py-1.5 rounded-lg transition-colors cursor-pointer">View Logs</Link>
                    </div>
                    <div className="mt-4 z-10">
                        <p className="text-gray-500 text-sm font-semibold mb-1">My Total Meals</p>
                        <h3 className="text-3xl font-extrabold text-gray-900">{isLoadingData ? "..." : totalMeals}</h3>
                    </div>
                    <IconToolsKitchen2 className="absolute -bottom-4 -right-4 w-24 h-24 text-teal-50/50" stroke={1} />
                </div>
                <div className={`order-1 md:order-3 bg-gradient-to-br ${currentBalance < 0 ? 'from-red-500 to-red-700 border-red-600 shadow-red-500/20' : 'from-emerald-500 to-emerald-700 border-emerald-600 shadow-emerald-500/20'} p-6 rounded-3xl border shadow-lg relative overflow-hidden flex flex-col justify-between min-h-[140px] transition-all duration-300`}>
                    <div className="flex justify-between items-start gap-4 relative z-10">
                        <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center text-white shrink-0 backdrop-blur-sm">
                            <IconReceipt2 className="w-6 h-6" stroke={2} />
                        </div>
                        <div className="flex flex-col items-end gap-1.5">
                            <span className={`text-[10px] sm:text-xs font-extrabold px-3 py-1.5 rounded-lg ${currentBalance < 0 ? 'text-red-900 bg-red-100' : 'text-emerald-900 bg-emerald-100'}`}>
                                {currentBalance < 0 ? 'Due / Negative' : 'Refundable'}
                            </span>
                            <div className="flex items-center gap-1.5 bg-black/20 backdrop-blur-sm border border-white/10 px-2.5 py-1 rounded-lg text-white shadow-sm">
                                <IconCalculator size={12} className={currentBalance < 0 ? 'text-red-200' : 'text-emerald-200'} />
                                <span className="text-[10px] sm:text-xs font-bold tracking-wide">Rate: ৳{liveMealRate.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>
                    <div className="mt-4 z-10">
                        <p className="text-white/90 text-sm font-semibold mb-1">Current Balance</p>
                        <h3 className="text-3xl font-extrabold text-white">
                            {isLoadingData ? "..." : `${currentBalance >= 0 ? "+" : "-"} ৳${Math.abs(currentBalance)}`}
                        </h3>
                    </div>
                    <div className="absolute right-0 bottom-0 opacity-20 z-0">
                        <svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19l16 0"></path><path d="M4 15l4 -6l4 2l4 -5l4 4"></path></svg>
                    </div>
                </div>
            </div>

            {/* ─── This Month's Bazar & Payment Section ─── */}
            <div className="bg-orange-50/50 rounded-3xl border border-orange-200 shadow-sm p-5 sm:p-6 relative overflow-hidden">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                    <div>
                        <h3 className="text-xl font-extrabold text-gray-900 flex items-center gap-2">
                            <IconCalendarEvent className="text-orange-500" stroke={2.5} />
                            This Month's Bazar & Payment
                        </h3>
                        <p className="text-sm font-medium text-gray-500 mt-1">Check this month's bazar dates, submit your payment, and update bazar expenses.</p>
                    </div>
                    <div className="flex items-center gap-3 bg-white border border-orange-100 text-orange-700 px-4 py-2 rounded-xl font-bold text-sm shadow-sm shrink-0">
                        <IconCalendarEvent size={18} stroke={2} /> 
                        September 2026
                        <div className="flex items-center gap-1 ml-2">
                            <IconChevronLeft size={16} className="cursor-pointer hover:text-orange-900" stroke={3} />
                            <IconChevronRight size={16} className="cursor-pointer hover:text-orange-900" stroke={3} />
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                    
                    {/* 1. Bazar Dates */}
                    <div className="bg-white p-5 rounded-2xl border border-orange-100 shadow-sm flex flex-col">
                        <h4 className="text-sm font-bold text-gray-800 mb-4 flex items-center gap-2">
                            <IconCalendarEvent size={18} className="text-orange-500"/> Bazar Dates (This Month)
                        </h4>
                        <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto pb-2 scrollbar-hide">
                            {bazarDates.map((b, i) => (
                                <div key={i} className={`flex flex-col items-center justify-center py-2 px-3 rounded-xl border min-w-[65px] shrink-0
                                    ${b.status === 'Done' ? 'border-green-200 bg-green-50/50' : b.status === 'Upcoming' ? 'border-orange-200 bg-orange-50' : 'border-gray-100 bg-gray-50'}`}>
                                    <span className="text-[10px] font-bold text-gray-500 uppercase">Sep</span>
                                    <span className="text-xl font-extrabold text-gray-900 leading-none my-1.5">{b.day}</span>
                                    {b.status === 'Done' && <IconCircleCheck size={16} className="text-green-500" stroke={2.5} />}
                                    {b.status === 'Upcoming' && <span className="text-[9px] font-bold text-orange-600 bg-orange-100 px-1.5 py-0.5 rounded-md">Upcoming</span>}
                                    {b.status === '--' && <span className="text-[10px] font-bold text-gray-400">--</span>}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* 2. Request Payment */}
                    <div className="bg-white p-5 rounded-2xl border border-orange-100 shadow-sm flex flex-col">
                        <h4 className="text-sm font-bold text-gray-800 mb-1 flex items-center gap-2">
                            <IconCoin size={18} className="text-orange-500"/> Request to Submit Payment
                        </h4>
                        <p className="text-[11px] text-gray-500 mb-4 font-medium">Let manager know how much you have paid.</p>
                        <form className="space-y-3 mt-auto" onSubmit={handlePaymentSubmit}>
                            <div className="flex items-center bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 focus-within:ring-2 ring-orange-500/20 focus-within:border-orange-500 transition-all">
                                <span className="text-gray-500 font-bold mr-2">৳</span>
                                {/* 💡 value এবং onChange যোগ করা হয়েছে */}
                                <input type="number" value={paymentAmount} onChange={(e) => setPaymentAmount(e.target.value)} placeholder="Enter amount (e.g. 500)" className="bg-transparent w-full outline-none text-sm font-bold text-gray-800" required />
                            </div>
                            {/* 💡 value এবং onChange যোগ করা হয়েছে */}
                            <input type="text" value={paymentNote} onChange={(e) => setPaymentNote(e.target.value)} placeholder="Add a note (optional)" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 outline-none text-sm font-bold text-gray-800 focus:ring-2 ring-orange-500/20 focus:border-orange-500 transition-all" />
                            {/* 💡 disabled স্টেট যোগ করা হয়েছে */}
                            <button type="submit" disabled={isSubmittingPayment} className="w-full bg-[#FF6B00] hover:bg-orange-600 text-white font-bold py-2.5 rounded-xl text-sm flex items-center justify-center gap-2 shadow-md shadow-orange-500/20 transition-all disabled:opacity-50">
                                <IconSend size={16} stroke={2.5} /> {isSubmittingPayment ? "Sending..." : "Send Payment Request"}
                            </button>
                        </form>
                    </div>

                    {/* 3. Update Expense */}
                    <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex flex-col">
                        <h4 className="text-sm font-bold text-gray-800 mb-1 flex items-center gap-2">
                            <IconShoppingCart size={18} className="text-gray-700"/> Update Bazar Expense
                        </h4>
                        <p className="text-[11px] text-gray-500 mb-4 font-medium">If bazar is done, submit the total expense.</p>
                        <form className="space-y-3 mt-auto" onSubmit={handleExpenseSubmit}>
                            <div className="flex items-center bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 focus-within:ring-2 ring-gray-900/20 focus-within:border-gray-900 transition-all">
                                <span className="text-gray-500 font-bold mr-2">৳</span>
                                {/* 💡 value এবং onChange যোগ করা হয়েছে */}
                                <input type="number" value={expenseAmount} onChange={(e) => setExpenseAmount(e.target.value)} placeholder="Enter bazar amount (e.g. 1250)" className="bg-transparent w-full outline-none text-sm font-bold text-gray-800" required />
                            </div>
                            {/* 💡 value এবং onChange যোগ করা হয়েছে */}
                            <input type="text" value={expenseDetails} onChange={(e) => setExpenseDetails(e.target.value)} placeholder="Add details (optional)" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 outline-none text-sm font-bold text-gray-800 focus:ring-2 ring-gray-900/20 focus:border-gray-900 transition-all" />
                            {/* 💡 disabled স্টেট যোগ করা হয়েছে */}
                            <button type="submit" disabled={isSubmittingExpense} className="w-full bg-[#0B132B] hover:bg-gray-800 text-white font-bold py-2.5 rounded-xl text-sm flex items-center justify-center gap-2 shadow-md transition-all disabled:opacity-50">
                                <IconCheck size={16} stroke={3} /> {isSubmittingExpense ? "Submitting..." : "Submit to Manager"}
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            {/* ─── Bottom Section: Recent Meals & Notice Board ─── */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
                
                <div className="lg:col-span-2">
                    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden flex flex-col w-full h-full">
                        <div className="p-4 sm:p-6 border-b border-gray-100 flex items-center justify-between bg-[#F8FAFC]">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-white border border-gray-200 flex items-center justify-center text-gray-600 shadow-sm shrink-0">
                                    <IconToolsKitchen2 className="w-4 h-4 sm:w-5 sm:h-5" stroke={1.5} />
                                </div>
                                <div>
                                    <h2 className="text-sm sm:text-base font-extrabold text-gray-900">My Recent Meals</h2>
                                    <p className="text-[10px] sm:text-xs font-bold text-gray-500 mt-0.5">Last 3 days log</p>
                                </div>
                            </div>
                        </div>
                        <div className="overflow-x-auto w-full">
                            <table className="w-full text-left border-collapse min-w-full">
                                <thead>
                                    <tr className="border-b border-gray-100 bg-gray-50/50">
                                        <th className="py-2.5 px-3 sm:py-4 sm:px-6 text-[9px] sm:text-xs font-extrabold text-gray-500 uppercase tracking-tight sm:tracking-wider whitespace-nowrap">Date</th>
                                        <th className="py-2.5 px-1 sm:py-4 sm:px-6 text-[9px] sm:text-xs font-extrabold text-gray-500 uppercase tracking-tight sm:tracking-wider text-center">B'fast</th>
                                        <th className="py-2.5 px-1 sm:py-4 sm:px-6 text-[9px] sm:text-xs font-extrabold text-gray-500 uppercase tracking-tight sm:tracking-wider text-center">Lunch</th>
                                        <th className="py-2.5 px-1 sm:py-4 sm:px-6 text-[9px] sm:text-xs font-extrabold text-gray-500 uppercase tracking-tight sm:tracking-wider text-center">Dinner</th>
                                        <th className="py-2.5 px-2 sm:py-4 sm:px-6 text-[9px] sm:text-xs font-extrabold text-[#FF6B00] uppercase tracking-tight sm:tracking-wider text-center bg-orange-50/50">Total</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {isLoadingData ? (
                                        <tr><td colSpan={5} className="text-center py-6 text-xs font-bold text-gray-400">Loading meals...</td></tr>
                                    ) : recentMeals.length === 0 ? (
                                        <tr><td colSpan={5} className="text-center py-6 text-xs font-bold text-gray-400">No recent meals found.</td></tr>
                                    ) : (
                                        recentMeals.map((meal: any, index: number) => {
                                            const mealDate = new Date(meal.date);
                                            const formattedDate = mealDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
                                            const isToday = mealDate.toDateString() === new Date().toDateString();
                                            const totalDayMeal = meal.breakfast + meal.lunch + meal.dinner + meal.guest;

                                            return (
                                                <tr key={index} className="hover:bg-gray-50/50 transition-colors">
                                                    <td className="py-2.5 px-3 sm:py-4 sm:px-6 whitespace-nowrap">
                                                        <p className="font-extrabold text-gray-900 text-[10px] sm:text-sm flex items-center gap-2">
                                                            {formattedDate} 
                                                            {isToday && <span className="text-[10px] font-bold text-blue-500 bg-blue-50 px-2 py-0.5 rounded-md">Today</span>}
                                                        </p>
                                                    </td>
                                                    <td className="py-2.5 px-1 sm:py-4 sm:px-6 text-center font-bold text-gray-700 text-[11px] sm:text-sm">{meal.breakfast}</td>
                                                    <td className="py-2.5 px-1 sm:py-4 sm:px-6 text-center font-bold text-gray-700 text-[11px] sm:text-sm">{meal.lunch}</td>
                                                    <td className="py-2.5 px-1 sm:py-4 sm:px-6 text-center font-bold text-gray-700 text-[11px] sm:text-sm">{meal.dinner}</td>
                                                    <td className="py-2.5 px-2 sm:py-4 sm:px-6 text-center bg-orange-50/50 font-extrabold text-gray-900 text-xs sm:text-base border-l border-orange-100/50">
                                                        {totalDayMeal}
                                                    </td>
                                                </tr>
                                            );
                                        })
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-1">
                    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden flex flex-col h-full">
                        <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-[#F8FAFC]">
                            <div className="flex items-center gap-2">
                                <IconBell className="w-5 h-5 text-gray-600" stroke={2} />
                                <h3 className="font-extrabold text-gray-900">Notice Board</h3>
                            </div>
                            {notices.length > 0 && (
                                <span className="bg-orange-100 text-orange-600 text-[10px] font-bold px-2 py-0.5 rounded-full">{notices.length} New</span>
                            )}
                        </div>
                        
                        <div className="p-5 space-y-4">
                            {isLoadingData ? (
                                <p className="text-center text-xs font-bold text-gray-400 py-6">Loading notices...</p>
                            ) : notices.length === 0 ? (
                                <div className="text-center py-6">
                                    <p className="text-sm font-bold text-gray-400">No new notices.</p>
                                    <p className="text-xs text-gray-400 mt-1">You are all caught up!</p>
                                </div>
                            ) : (
                                notices.map((notice, index) => (
                                    <div key={index} className="flex gap-3 items-start border-b border-gray-50 pb-3 last:border-0 last:pb-0">
                                        <div className={`mt-0.5 ${notice.type === 'alert' ? 'text-red-500' : 'text-orange-500'}`}>
                                            <IconAlertCircle className="w-5 h-5" stroke={2} />
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-gray-900">{notice.title}</p>
                                            <p className="text-xs text-gray-500 font-medium mt-1">{notice.description}</p>
                                            <p className="text-[9px] text-gray-400 font-bold mt-1.5 uppercase">
                                                {new Date(notice.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                            </p>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}