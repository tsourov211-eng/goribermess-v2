// src/app/(dashboard)/member/guest-meal/page.tsx
"use client";

import { useState } from "react";

export default function GuestMealPage() {
    const [guestCount, setGuestCount] = useState("");
    const [mealType, setMealType] = useState("দুপুর ও রাত (উভয়)");
    const [date, setDate] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert("আপনার গেস্ট মিল রিকোয়েস্ট ম্যানেজারের কাছে পাঠানো হয়েছে!");
        setGuestCount("");
        setDate("");
    };

    return (
        <div className="max-w-3xl mx-auto space-y-8 font-sans">

            {/* হেডার অংশ */}
            <div>
                <h1 className="text-3xl font-extrabold text-gray-800">গেস্ট মিল রিকোয়েস্ট</h1>
                <p className="text-gray-500 mt-1">আপনার মেহমানের জন্য আগে থেকেই মিল বুকিং দিন</p>
            </div>

            {/* রিকোয়েস্ট ফর্ম */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                <form onSubmit={handleSubmit} className="space-y-6">

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* গেস্ট সংখ্যা */}
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-700">গেস্ট সংখ্যা <span className="text-red-500">*</span></label>
                            <input
                                type="number"
                                min="1"
                                placeholder="যেমন: ২"
                                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
                                required
                                value={guestCount}
                                onChange={(e) => setGuestCount(e.target.value)}
                            />
                        </div>

                        {/* তারিখ নির্বাচন */}
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-700">কোন তারিখের জন্য? <span className="text-red-500">*</span></label>
                            <input
                                type="date"
                                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all text-gray-700"
                                required
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* কোন বেলার মিল */}
                    <div className="space-y-3">
                        <label className="text-sm font-bold text-gray-700">কোন বেলার মিল প্রয়োজন?</label>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <label className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border cursor-pointer transition-all ${mealType === 'দুপুর (Lunch)' ? 'bg-orange-50 border-orange-500 text-orange-700 font-bold' : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'}`}>
                                <input
                                    type="radio"
                                    name="mealType"
                                    value="দুপুর (Lunch)"
                                    className="hidden"
                                    onChange={(e) => setMealType(e.target.value)}
                                />
                                দুপুর (Lunch)
                            </label>
                            <label className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border cursor-pointer transition-all ${mealType === 'রাত (Dinner)' ? 'bg-orange-50 border-orange-500 text-orange-700 font-bold' : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'}`}>
                                <input
                                    type="radio"
                                    name="mealType"
                                    value="রাত (Dinner)"
                                    className="hidden"
                                    onChange={(e) => setMealType(e.target.value)}
                                />
                                রাত (Dinner)
                            </label>
                            <label className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border cursor-pointer transition-all ${mealType === 'দুপুর ও রাত (উভয়)' ? 'bg-orange-50 border-orange-500 text-orange-700 font-bold' : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'}`}>
                                <input
                                    type="radio"
                                    name="mealType"
                                    value="দুপুর ও রাত (উভয়)"
                                    className="hidden"
                                    onChange={(e) => setMealType(e.target.value)}
                                />
                                উভয় বেলা
                            </label>
                        </div>
                    </div>

                    <hr className="border-gray-100 my-6" />

                    {/* সাবমিট বাটন */}
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            className="bg-gray-800 text-white px-8 py-3 rounded-xl font-bold hover:bg-gray-900 shadow-md transition-all flex items-center gap-2"
                        >
                            রিকোয়েস্ট পাঠান 🚀
                        </button>
                    </div>

                </form>
            </div>

        </div>
    );
}