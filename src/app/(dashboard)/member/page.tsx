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
    IconCircleCheck,
    IconX
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

    // 💡 Bazaar Schedules & Calendar States
    const today = new Date();
    const formattedToday = today.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });

    const [activeMonth, setActiveMonth] = useState(today.getMonth()); // 0-11
    const [activeYear, setActiveYear] = useState(today.getFullYear());

    const [modalMonth, setModalMonth] = useState(today.getMonth());
    const [modalYear, setModalYear] = useState(today.getFullYear());

    const [bazarSchedules, setBazarSchedules] = useState<any[]>([]);
    const [messSchedules, setMessSchedules] = useState<any[]>([]);
    const [isLoadingBazar, setIsLoadingBazar] = useState(false);

    const [isCalendarModalOpen, setIsCalendarModalOpen] = useState(false);
    const [selectedDates, setSelectedDates] = useState<string[]>([]);
    const [isSubmittingBazarDates, setIsSubmittingBazarDates] = useState(false);

    // 💡 Finance States (for payment and bazaar)
    const [paymentAmount, setPaymentAmount] = useState("");
    const [paymentNote, setPaymentNote] = useState("");
    const [isSubmittingPayment, setIsSubmittingPayment] = useState(false);
    const [showPaymentForm, setShowPaymentForm] = useState(false);

    const [expenseAmount, setExpenseAmount] = useState("");
    const [expenseDetails, setExpenseDetails] = useState("");
    const [isSubmittingExpense, setIsSubmittingExpense] = useState(false);

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

    // 💡 Fetch Bazar Schedules from API
    const fetchBazarSchedules = async (m: number, y: number) => {
        setIsLoadingBazar(true);
        try {
            const res = await fetch(`/api/members/bazaar-schedule?month=${m + 1}&year=${y}`);
            if (res.ok) {
                const data = await res.json();
                setBazarSchedules(data.mySchedules || []);
                setMessSchedules(data.allSchedules || []);
            }
        } catch (error) {
            console.error("Error fetching bazaar schedules:", error);
        } finally {
            setIsLoadingBazar(false);
        }
    };

    useEffect(() => {
        if (status === "authenticated") {
            fetchBazarSchedules(activeMonth, activeYear);
        }
    }, [status, activeMonth, activeYear]);

    // Change card month
    const handlePrevActiveMonth = () => {
        if (activeMonth === 0) {
            setActiveMonth(11);
            setActiveYear(prev => prev - 1);
        } else {
            setActiveMonth(prev => prev - 1);
        }
    };

    const handleNextActiveMonth = () => {
        if (activeMonth === 11) {
            setActiveMonth(0);
            setActiveYear(prev => prev + 1);
        } else {
            setActiveMonth(prev => prev + 1);
        }
    };

    // Change modal month
    const handlePrevModalMonth = () => {
        if (modalMonth === 0) {
            setModalMonth(11);
            setModalYear(prev => prev - 1);
        } else {
            setModalMonth(prev => prev - 1);
        }
    };

    const handleNextModalMonth = () => {
        if (modalMonth === 11) {
            setModalMonth(0);
            setModalYear(prev => prev + 1);
        } else {
            setModalMonth(prev => prev + 1);
        }
    };

    // Date format helper YYYY-MM-DD
    const formatDateKey = (year: number, month: number, day: number) => {
        return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    };

    // Date selection or unselection on calendar (past dates & booked dates blocked)
    const toggleDateSelection = (dateKey: string, isBookedByOther?: boolean) => {
        if (isBookedByOther) return; // block already-booked dates

        const selected = new Date(dateKey + "T00:00:00");
        const todayZero = new Date();
        todayZero.setHours(0, 0, 0, 0);
        if (selected.getTime() < todayZero.getTime()) return; // block past dates

        setSelectedDates(prev =>
            prev.includes(dateKey)
                ? prev.filter(d => d !== dateKey)
                : [...prev, dateKey].sort()
        );
    };

    // Submit selected dates for manager approval
    const handleConfirmBazarDates = async () => {
        if (selectedDates.length === 0) {
            alert("Please select at least one date for bazaar.");
            return;
        }

        setIsSubmittingBazarDates(true);
        try {
            const res = await fetch("/api/members/bazaar-schedule", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ dates: selectedDates }),
            });

            if (res.ok) {
                alert("✅ Bazaar dates submitted successfully for manager approval!");
                setSelectedDates([]);
                setIsCalendarModalOpen(false);
                fetchBazarSchedules(activeMonth, activeYear);
            } else {
                const err = await res.json();
                alert(`❌ ${err.error || "Failed to submit bazaar dates."}`);
            }
        } catch (error) {
            console.error(error);
            alert("❌ An error occurred while submitting bazaar dates.");
        } finally {
            setIsSubmittingBazarDates(false);
        }
    };

    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    // Calendar grid calculation
    const daysInModalMonth = new Date(modalYear, modalMonth + 1, 0).getDate();
    const firstDayOfModalMonth = new Date(modalYear, modalMonth, 1).getDay(); // 0 = Sun
    const daysInPrevModalMonth = new Date(modalYear, modalMonth, 0).getDate();

    const prevMonthDays = Array.from(
        { length: firstDayOfModalMonth },
        (_, i) => daysInPrevModalMonth - firstDayOfModalMonth + 1 + i
    );
    const currentMonthDays = Array.from({ length: daysInModalMonth }, (_, i) => i + 1);
    const totalCells = firstDayOfModalMonth + daysInModalMonth;
    const remainingCells = (7 - (totalCells % 7)) % 7;
    const nextMonthDays = Array.from({ length: remainingCells }, (_, i) => i + 1);

    const currentUserId = (session?.user as any)?.id;

    const getDateStatus = (day: number) => {
        const key = formatDateKey(modalYear, modalMonth, day);
        const isSelected = selectedDates.includes(key);

        const mySchedule = bazarSchedules.find(s => {
            const d = new Date(s.date);
            return d.getUTCFullYear() === modalYear && d.getUTCMonth() === modalMonth && d.getUTCDate() === day;
        });

        const messSchedule = messSchedules.find(s => {
            const d = new Date(s.date);
            return d.getUTCFullYear() === modalYear && d.getUTCMonth() === modalMonth && d.getUTCDate() === day;
        });

        // Check if another member has an approved schedule on this date
        const approvedByOther = messSchedules.find(s => {
            const d = new Date(s.date);
            return d.getUTCFullYear() === modalYear && d.getUTCMonth() === modalMonth && d.getUTCDate() === day
                && s.status === "approved" && s.user?.id !== currentUserId;
        });
        const isBookedByOther = !!approvedByOther;
        const bookedByName = approvedByOther?.user?.name || "Someone";

        const sched = mySchedule || messSchedule;
        const dayDate = new Date(modalYear, modalMonth, day);
        const todayZero = new Date();
        todayZero.setHours(0, 0, 0, 0);

        const isPast = dayDate.getTime() < todayZero.getTime();
        const isCompleted = sched ? (sched.status === "done" || (isPast && sched.status === "approved")) : false;
        const isUpcoming = sched ? !isCompleted : false;

        return {
            key,
            isSelected,
            isPast,
            isBookedByOther,
            bookedByName,
            isCompleted,
            isUpcoming,
            isScheduled: !!sched,
            status: sched?.status
        };
    };

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
                setPaymentAmount(""); // Clear input
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
                setExpenseAmount(""); // Clear input
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
        ? { title: "Payment Overdue", description: `Your balance is negative (Tk ${Math.abs(currentBalance)}). Please clear your dues immediately.`, type: "alert" }
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
                        <h3 className="text-3xl font-extrabold text-gray-900">Tk {isLoadingData ? "..." : totalDeposit}</h3>
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
                                <span className="text-[10px] sm:text-xs font-bold tracking-wide">Rate: Tk {liveMealRate.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>
                    <div className="mt-4 z-10">
                        <p className="text-white/90 text-sm font-semibold mb-1">Current Balance</p>
                        <h3 className="text-3xl font-extrabold text-white">
                            {isLoadingData ? "..." : `${currentBalance >= 0 ? "+" : "-"} Tk ${Math.abs(currentBalance)}`}
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
                        {monthNames[activeMonth]} {activeYear}
                        <div className="flex items-center gap-1 ml-2">
                            <IconChevronLeft size={16} onClick={handlePrevActiveMonth} className="cursor-pointer hover:text-orange-900 transition-colors" stroke={3} />
                            <IconChevronRight size={16} onClick={handleNextActiveMonth} className="cursor-pointer hover:text-orange-900 transition-colors" stroke={3} />
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                    
                    {/* 1. Bazar Dates */}
                    <div className="bg-white p-5 rounded-2xl border border-orange-100 shadow-sm flex flex-col justify-between">
                        <div>
                            <h4 className="text-sm font-bold text-gray-800 mb-4 flex items-center gap-2">
                                <IconCalendarEvent size={18} className="text-orange-500"/> Bazar Dates (This Month)
                            </h4>
                            {isLoadingBazar ? (
                                <div className="py-6 text-center text-xs font-bold text-gray-400">Loading bazar dates...</div>
                            ) : bazarSchedules.length === 0 ? (
                                <div className="py-5 px-4 text-center rounded-xl bg-orange-50/40 border border-dashed border-orange-200">
                                    <p className="text-xs font-bold text-gray-600">No bazar dates scheduled yet for this month.</p>
                                    <p className="text-[11px] text-gray-400 mt-0.5">Click below to select your dates for manager approval.</p>
                                </div>
                            ) : (
                                <div className="flex items-center gap-2.5 sm:gap-3 overflow-x-auto pb-2 scrollbar-hide">
                                    {bazarSchedules.map((s: any) => {
                                        const d = new Date(s.date);
                                        const dayStr = String(d.getUTCDate()).padStart(2, "0");
                                        const monthStr = d.toLocaleDateString("en-US", { month: "short", timeZone: "UTC" }).toUpperCase();
                                        
                                        const todayZero = new Date();
                                        todayZero.setHours(0, 0, 0, 0);
                                        const isPast = d.getTime() < todayZero.getTime();
                                        const isDone = s.status === "done" || (isPast && s.status === "approved");
                                        const isUpcoming = s.status === "approved" && !isPast;
                                        const isPending = s.status === "pending";

                                        return (
                                            <div 
                                                key={s.id} 
                                                className={`flex flex-col items-center justify-center py-2 px-3 sm:px-3.5 rounded-xl border min-w-[68px] shrink-0
                                                    ${isDone ? "border-green-200 bg-green-50/60 text-green-900" 
                                                      : isUpcoming ? "border-orange-200 bg-orange-50 text-orange-900" 
                                                      : "border-amber-200 bg-amber-50/70 text-amber-900"}`}
                                            >
                                                <span className="text-[10px] font-bold text-gray-500 uppercase">{monthStr}</span>
                                                <span className="text-xl font-extrabold text-gray-900 leading-none my-1.5">{dayStr}</span>
                                                {isDone && (
                                                    <div className="flex items-center gap-1 text-[10px] font-bold text-green-600">
                                                        <IconCircleCheck size={14} className="text-green-500" stroke={2.5} />
                                                        <span>Done</span>
                                                    </div>
                                                )}
                                                {isUpcoming && (
                                                    <div className="flex items-center gap-1 text-[9px] font-bold text-orange-600 bg-orange-100/80 px-1.5 py-0.5 rounded-md">
                                                        <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B00]"></span>
                                                        <span>Upcoming</span>
                                                    </div>
                                                )}
                                                {isPending && (
                                                    <span className="text-[9px] font-bold text-amber-700 bg-amber-100/80 px-1.5 py-0.5 rounded-md">
                                                        Pending
                                                    </span>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>

                        {/* 💡 Button: Select Bazar Date (opens calendar modal) */}
                        <button 
                            type="button"
                            onClick={() => {
                                setModalMonth(activeMonth);
                                setModalYear(activeYear);
                                setSelectedDates([]);
                                setIsCalendarModalOpen(true);
                            }}
                            className="w-full mt-4 bg-[#FF6B00] hover:bg-orange-600 text-white font-bold py-3 rounded-2xl text-sm flex items-center justify-center gap-2 shadow-md shadow-orange-500/20 transition-all cursor-pointer active:scale-[0.99]"
                        >
                            <IconCalendarEvent size={18} stroke={2.5} />
                            Select Bazar Date
                        </button>
                    </div>

                    {/* 2. Update Expense / Submit Payment Card */}
                    <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex flex-col justify-between">
                        <div>
                            <div className="flex items-center justify-between mb-1">
                                <h4 className="text-sm font-bold text-gray-800 flex items-center gap-2">
                                    <IconShoppingCart size={18} className="text-orange-500"/> 
                                    {showPaymentForm ? "Request to Submit Payment" : "Update Bazar Expense"}
                                </h4>
                                <button 
                                    type="button" 
                                    onClick={() => setShowPaymentForm(!showPaymentForm)} 
                                    className="text-[11px] font-bold text-orange-600 hover:text-orange-700 bg-orange-50 hover:bg-orange-100 px-2.5 py-1 rounded-lg transition-colors cursor-pointer"
                                >
                                    {showPaymentForm ? "← Update Expense" : "+ Submit Payment"}
                                </button>
                            </div>
                            <p className="text-[11px] text-gray-500 mb-4 font-medium">
                                {showPaymentForm ? "Let manager know how much you have paid." : "If bazar is done, submit the total expense."}
                            </p>

                            {showPaymentForm ? (
                                <form className="space-y-3" onSubmit={handlePaymentSubmit}>
                                    <div className="flex items-center bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 focus-within:ring-2 ring-orange-500/20 focus-within:border-orange-500 transition-all">
                                        <span className="text-gray-500 font-bold mr-2">Tk </span>
                                        <input type="number" value={paymentAmount} onChange={(e) => setPaymentAmount(e.target.value)} placeholder="Enter payment amount (e.g. 500)" className="bg-transparent w-full outline-none text-sm font-bold text-gray-800" required />
                                    </div>
                                    <input type="text" value={paymentNote} onChange={(e) => setPaymentNote(e.target.value)} placeholder="Add a note (optional)" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 outline-none text-sm font-bold text-gray-800 focus:ring-2 ring-orange-500/20 focus:border-orange-500 transition-all" />
                                    <button type="submit" disabled={isSubmittingPayment} className="w-full bg-[#FF6B00] hover:bg-orange-600 text-white font-bold py-2.5 rounded-xl text-sm flex items-center justify-center gap-2 shadow-md shadow-orange-500/20 transition-all disabled:opacity-50 cursor-pointer">
                                        <IconSend size={16} stroke={2.5} /> {isSubmittingPayment ? "Sending..." : "Send Payment Request"}
                                    </button>
                                </form>
                            ) : (
                                <form className="space-y-3" onSubmit={handleExpenseSubmit}>
                                    <div className="flex items-center bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 focus-within:ring-2 ring-gray-900/20 focus-within:border-gray-900 transition-all">
                                        <span className="text-gray-500 font-bold mr-2">Tk </span>
                                        <input type="number" value={expenseAmount} onChange={(e) => setExpenseAmount(e.target.value)} placeholder="Enter bazar amount (e.g, 1250)" className="bg-transparent w-full outline-none text-sm font-bold text-gray-800" required />
                                    </div>
                                    <input type="text" value={expenseDetails} onChange={(e) => setExpenseDetails(e.target.value)} placeholder="Add details (optional)" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 outline-none text-sm font-bold text-gray-800 focus:ring-2 ring-gray-900/20 focus:border-gray-900 transition-all" />
                                    <button type="submit" disabled={isSubmittingExpense} className="w-full bg-[#0B132B] hover:bg-gray-800 text-white font-bold py-2.5 rounded-xl text-sm flex items-center justify-center gap-2 shadow-md transition-all disabled:opacity-50 cursor-pointer">
                                        <IconCheck size={16} stroke={3} /> {isSubmittingExpense ? "Submitting..." : "Submit to Manager"}
                                    </button>
                                </form>
                            )}
                        </div>
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
            
            {/* ─── Popup Calendar Modal: Select Bazar Date ─── */}
            {isCalendarModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-200">
                    {/* Backdrop */}
                    <div className="fixed inset-0" onClick={() => setIsCalendarModalOpen(false)}></div>

                    {/* Modal Content */}
                    <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 max-w-[420px] w-full p-5 sm:p-6 relative z-10 animate-in zoom-in-95 duration-150">
                        {/* Header */}
                        <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                            <div className="flex items-center gap-2.5">
                                <div className="w-8 h-8 rounded-lg bg-orange-50 text-orange-500 flex items-center justify-center">
                                    <IconCalendarEvent size={20} stroke={2.5} />
                                </div>
                                <h3 className="text-base font-extrabold text-gray-900">Select Bazar Date</h3>
                            </div>
                            <button 
                                type="button"
                                onClick={() => setIsCalendarModalOpen(false)}
                                className="w-8 h-8 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 flex items-center justify-center transition-colors cursor-pointer"
                            >
                                <IconX size={18} stroke={2.5} />
                            </button>
                        </div>

                        {/* Month Navigator */}
                        <div className="flex items-center justify-between my-3.5 px-2">
                            <button 
                                type="button"
                                onClick={handlePrevModalMonth}
                                className="p-1.5 rounded-lg text-gray-500 hover:bg-gray-100 hover:text-gray-800 transition-colors cursor-pointer"
                            >
                                <IconChevronLeft size={20} stroke={2.5} />
                            </button>
                            <span className="text-sm sm:text-base font-extrabold text-gray-800">
                                {monthNames[modalMonth]} {modalYear}
                            </span>
                            <button 
                                type="button"
                                onClick={handleNextModalMonth}
                                className="p-1.5 rounded-lg text-gray-500 hover:bg-gray-100 hover:text-gray-800 transition-colors cursor-pointer"
                            >
                                <IconChevronRight size={20} stroke={2.5} />
                            </button>
                        </div>

                        {/* Weekday Row */}
                        <div className="grid grid-cols-7 text-center text-xs font-bold text-gray-400 mb-1">
                            <span>Sun</span>
                            <span>Mon</span>
                            <span>Tue</span>
                            <span>Wed</span>
                            <span>Thu</span>
                            <span>Fri</span>
                            <span>Sat</span>
                        </div>

                        {/* Days Grid */}
                        <div className="grid grid-cols-7 gap-y-2 gap-x-1 text-center my-2">
                            {/* Trailing days from previous month */}
                            {prevMonthDays.map((d, idx) => (
                                <div key={`prev-${idx}`} className="h-9 flex items-center justify-center text-xs font-semibold text-gray-300 select-none">
                                    {d}
                                </div>
                            ))}

                            {/* Current month days */}
                            {currentMonthDays.map((d) => {
                                const status = getDateStatus(d);
                                return (
                                    <button
                                        key={`day-${d}`}
                                        type="button"
                                        disabled={status.isPast || status.isBookedByOther}
                                        onClick={() => !(status.isPast || status.isBookedByOther) && toggleDateSelection(status.key, status.isBookedByOther)}
                                        title={status.isBookedByOther ? `Booked by ${status.bookedByName}` : undefined}
                                        className={`h-9 w-9 mx-auto rounded-full flex flex-col items-center justify-center transition-all text-xs font-bold relative
                                            ${status.isPast
                                                ? "text-gray-300 cursor-not-allowed line-through"
                                                : status.isBookedByOther
                                                    ? "bg-red-50 text-red-400 border border-red-200 cursor-not-allowed"
                                                    : status.isSelected
                                                        ? "bg-[#FF6B00] text-white shadow-md shadow-orange-500/30 scale-105 cursor-pointer"
                                                        : status.isCompleted
                                                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200/80 hover:bg-emerald-100/80 cursor-pointer"
                                                            : status.isUpcoming
                                                                ? "bg-orange-50 text-orange-800 border border-orange-200/80 hover:bg-orange-100/80 cursor-pointer"
                                                                : "text-gray-800 hover:bg-orange-50 hover:text-orange-600 cursor-pointer"
                                            }
                                        `}
                                    >
                                        <span className="leading-none">{d}</span>
                                        {status.isPast ? null : status.isBookedByOther ? (
                                            <span className="w-1 h-1 rounded-full bg-red-400 block mt-0.5"></span>
                                        ) : status.isSelected ? (
                                            <span className="w-1 h-1 rounded-full bg-white block mt-0.5"></span>
                                        ) : status.isCompleted ? (
                                            <span className="w-1 h-1 rounded-full bg-emerald-500 block mt-0.5"></span>
                                        ) : status.isUpcoming ? (
                                            <span className="w-1 h-1 rounded-full bg-[#FF6B00] block mt-0.5"></span>
                                        ) : null}
                                    </button>
                                );
                            })}

                            {/* Leading days from next month */}
                            {nextMonthDays.map((d, idx) => (
                                <div key={`next-${idx}`} className="h-9 flex items-center justify-center text-xs font-semibold text-gray-300 select-none">
                                    {d}
                                </div>
                            ))}
                        </div>

                        {/* Legend */}
                        <div className="flex items-center justify-center gap-3 pt-3 pb-1 border-t border-gray-100 text-[11px] font-semibold text-gray-600 select-none flex-wrap">
                            <div className="flex items-center gap-1.5">
                                <span className="w-2.5 h-2.5 rounded-full bg-[#FF6B00]"></span>
                                <span>Selected Date</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <span className="w-2.5 h-2.5 rounded-full bg-[#FED7AA]"></span>
                                <span>Upcoming Bazar Date</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                                <span>Completed</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <span className="w-2.5 h-2.5 rounded-full bg-red-400 border border-red-300"></span>
                                <span>Booked</span>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center justify-end gap-3 mt-4 pt-2">
                            <button
                                type="button"
                                onClick={() => { setSelectedDates([]); setIsCalendarModalOpen(false); }}
                                className="px-5 py-2.5 rounded-xl border border-gray-200 text-gray-700 text-xs sm:text-sm font-bold hover:bg-gray-50 transition-colors cursor-pointer"
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                onClick={handleConfirmBazarDates}
                                disabled={selectedDates.length === 0 || isSubmittingBazarDates}
                                className="px-5 py-2.5 rounded-xl bg-[#FF6B00] hover:bg-orange-600 disabled:opacity-50 text-white text-xs sm:text-sm font-bold shadow-md shadow-orange-500/20 transition-all cursor-pointer flex items-center gap-1.5"
                            >
                                {isSubmittingBazarDates ? "Submitting..." : "Confirm Date"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}