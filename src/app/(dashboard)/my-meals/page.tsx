"use client";

import { useState } from "react";
import { 
    IconToolsKitchen2, 
    IconCalendarEvent, 
    IconUsers, 
    IconPlus, 
    IconClock, 
    IconCheck, 
    IconX,
    IconHistory
} from "@tabler/icons-react";

export default function MyMealsPage() {
    const [date, setDate] = useState("");
    const [mealType, setMealType] = useState("Lunch");
    // 💡 Guest count কে ফাঁকা রাখার সুযোগ দেওয়া হলো যেন প্লেসহোল্ডার দেখা যায়
    const [guestCount, setGuestCount] = useState<number | "">(""); 

    const [history, setHistory] = useState([
        { id: 1, date: "2026-09-15", type: "Lunch", guests: 2, status: "Pending" },
        { id: 2, date: "2026-09-10", type: "Dinner", guests: 1, status: "Approved" },
        { id: 3, date: "2026-09-05", type: "Both", guests: 3, status: "Rejected" },
    ]);

    const handleRequestSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!date) return alert("Please select a date!");
        if (!guestCount) return alert("Please enter the number of guests!");
        
        const newRequest = {
            id: history.length + 1,
            date: date,
            type: mealType,
            guests: Number(guestCount),
            status: "Pending"
        };
        
        setHistory([newRequest, ...history]);
        setDate("");
        setGuestCount("");
        setMealType("Lunch");
    };

    return (
        <div className="space-y-6 animate-in fade-in zoom-in-95 duration-300">
            
            {/* ─── Header Section ─── */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <h1 className="text-2xl font-extrabold text-[#0B132B]">My Meals</h1>
                <p className="text-sm text-gray-500 font-medium mt-1">Manage your daily meals and request guest meals.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* ─── Left Side: Form & Status ─── */}
                <div className="space-y-6 lg:col-span-1">
                    
                    {/* Today's Meal Status Card */}
                    <div className="bg-gradient-to-br from-orange-50 to-orange-100/50 p-6 rounded-2xl border border-orange-100">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-orange-500 text-white rounded-lg shadow-sm">
                                <IconToolsKitchen2 size={20} />
                            </div>
                            <h2 className="text-lg font-bold text-gray-800">Today's Meal</h2>
                        </div>
                        <div className="flex justify-between items-center bg-white p-4 rounded-xl shadow-sm border border-orange-50">
                            <div>
                                <p className="text-sm font-bold text-gray-800">Lunch</p>
                                <p className="text-xs text-green-600 font-extrabold">ON</p>
                            </div>
                            <div className="w-px h-8 bg-gray-100"></div>
                            <div>
                                <p className="text-sm font-bold text-gray-800">Dinner</p>
                                <p className="text-xs text-green-600 font-extrabold">ON</p>
                            </div>
                        </div>
                    </div>

                    {/* Guest Meal Request Form */}
                    <div className="bg-white p-5 sm:p-6 rounded-2xl shadow-sm border border-gray-100">
                        <h2 className="text-lg font-bold text-gray-800 mb-5 flex items-center gap-2">
                            <IconPlus className="text-orange-500" size={20} />
                            Request Guest Meal
                        </h2>
                        
                        <form onSubmit={handleRequestSubmit} className="space-y-4">
                            {/* Date Picker */}
                            <div>
                                <label className="block text-xs font-extrabold text-gray-700 uppercase mb-1.5">Date</label>
                                <div className="relative">
                                    <IconCalendarEvent className="absolute left-3 top-1/2 -translate-y-1/2 text-orange-500 w-5 h-5" />
                                    <input 
                                        type="date" 
                                        value={date}
                                        onChange={(e) => setDate(e.target.value)}
                                        className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-orange-500/40 focus:border-orange-500 focus:bg-white text-sm font-bold text-gray-400 transition-all cursor-pointer"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Meal Type Selection */}
                            <div>
                                <label className="block text-xs font-extrabold text-gray-700 uppercase mb-1.5">Meal Type</label>
                                <div className="relative">
                                    <IconToolsKitchen2 className="absolute left-3 top-1/2 -translate-y-1/2 text-orange-500 w-5 h-5" />
                                    <select 
                                        value={mealType}
                                        onChange={(e) => setMealType(e.target.value)}
                                        className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-orange-500/40 focus:border-orange-500 focus:bg-white text-sm font-bold text-gray-400 transition-all appearance-none cursor-pointer"
                                    >
                                        <option value="Lunch">Lunch Only</option>
                                        <option value="Dinner">Dinner Only</option>
                                        <option value="Both">Both (Lunch & Dinner)</option>
                                    </select>
                                </div>
                            </div>

                            {/* Guest Count */}
                            <div>
                                <label className="block text-xs font-extrabold text-gray-700 uppercase mb-1.5">Number of Guests</label>
                                <div className="relative">
                                    <IconUsers className="absolute left-3 top-1/2 -translate-y-1/2 text-orange-500 w-5 h-5" />
                                    <input 
                                        type="number" 
                                        min="1"
                                        max="10"
                                        value={guestCount}
                                        onChange={(e) => setGuestCount(e.target.value === "" ? "" : Number(e.target.value))}
                                        placeholder="E.g. 2"
                                        className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-orange-500/40 focus:border-orange-500 focus:bg-white text-sm font-bold text-gray-800 placeholder:text-gray-400 placeholder:font-medium transition-all"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Submit Button */}
                            <button 
                                type="submit" 
                                className="w-full bg-[#FF6B00] hover:bg-orange-600 text-white py-3 rounded-xl font-bold text-sm shadow-md shadow-orange-500/20 transition-all mt-4"
                            >
                                Submit Request
                            </button>
                        </form>
                    </div>
                </div>

                {/* ─── Right Side: Request History Table ─── */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden lg:col-span-2 flex flex-col">
                    <div className="p-4 sm:p-6 border-b border-gray-100 flex items-center justify-between">
                        <h2 className="text-base sm:text-lg font-bold text-gray-800 flex items-center gap-2">
                            <IconHistory className="text-gray-500" size={20} />
                            Request History
                        </h2>
                    </div>
                    
                    <div className="overflow-x-auto flex-1 w-full">
                        <table className="w-full text-left border-collapse min-w-full">
                            <thead>
                                <tr className="bg-gray-50 border-b border-gray-100">
                                    {/* 💡 মোবাইলে ফন্ট এবং প্যাডিং ছোট করা হয়েছে */}
                                    <th className="px-2 sm:px-6 py-3 sm:py-4 text-[10px] sm:text-xs font-extrabold text-gray-500 uppercase tracking-tight sm:tracking-wider">Date</th>
                                    <th className="px-2 sm:px-6 py-3 sm:py-4 text-[10px] sm:text-xs font-extrabold text-gray-500 uppercase tracking-tight sm:tracking-wider">Type</th>
                                    <th className="px-2 sm:px-6 py-3 sm:py-4 text-[10px] sm:text-xs font-extrabold text-gray-500 uppercase tracking-tight sm:tracking-wider text-center">Guests</th>
                                    <th className="px-2 sm:px-6 py-3 sm:py-4 text-[10px] sm:text-xs font-extrabold text-gray-500 uppercase tracking-tight sm:tracking-wider text-right">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {history.map((item) => (
                                    <tr key={item.id} className="hover:bg-gray-50/50 transition-colors">
                                        <td className="px-2 sm:px-6 py-3 sm:py-4">
                                            {/* whitespace-nowrap যুক্ত করা হয়েছে যেন টেক্সট ভেঙে নিচে না যায় */}
                                            <p className="text-[11px] sm:text-sm font-bold text-gray-800 whitespace-nowrap">{item.date}</p>
                                        </td>
                                        <td className="px-2 sm:px-6 py-3 sm:py-4">
                                            <span className="text-[10px] sm:text-xs font-bold px-1.5 sm:px-2.5 py-0.5 sm:py-1 rounded-md bg-gray-100 text-gray-700 whitespace-nowrap">
                                                {item.type}
                                            </span>
                                        </td>
                                        <td className="px-2 sm:px-6 py-3 sm:py-4 text-center">
                                            <p className="text-[11px] sm:text-sm font-extrabold text-gray-800">{item.guests}</p>
                                        </td>
                                        <td className="px-2 sm:px-6 py-3 sm:py-4 text-right">
                                            <div className="flex justify-end">
                                                {/* স্ট্যাটাস ব্যাজের আইকন এবং টেক্সট ছোট করা হয়েছে */}
                                                <div className={`flex items-center gap-1 px-1.5 sm:px-3 py-0.5 sm:py-1 rounded-full text-[9px] sm:text-xs font-bold w-fit whitespace-nowrap
                                                    ${item.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' : ''}
                                                    ${item.status === 'Approved' ? 'bg-green-100 text-green-700' : ''}
                                                    ${item.status === 'Rejected' ? 'bg-red-100 text-red-700' : ''}
                                                `}>
                                                    {item.status === 'Pending' && <IconClock className="w-3 h-3 sm:w-3.5 sm:h-3.5" />}
                                                    {item.status === 'Approved' && <IconCheck className="w-3 h-3 sm:w-3.5 sm:h-3.5" />}
                                                    {item.status === 'Rejected' && <IconX className="w-3 h-3 sm:w-3.5 sm:h-3.5" />}
                                                    {item.status}
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {history.length === 0 && (
                                    <tr>
                                        <td colSpan={4} className="text-center py-12 text-gray-500 font-medium text-xs sm:text-sm">
                                            No guest meal requests yet.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
                
            </div>
        </div>
    );
}