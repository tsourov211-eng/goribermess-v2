// src/app/(dashboard)/manager/meals/page.tsx
"use client";

import { useEffect, useState } from "react";

interface Member {
    id: string;
    name: string;
}

interface MealRecord {
    userId: string;
    breakfast: number;
    lunch: number;
    dinner: number;
}

export default function ManagerMealsPage() {
    // আজকের তারিখ ডিফল্টভাবে YYYY-MM-DD ফরম্যাটে সেট করা
    const today = new Date().toISOString().split("T")[0];
    const [selectedDate, setSelectedDate] = useState(today);

    const [members, setMembers] = useState<Member[]>([]);
    const [mealData, setMealData] = useState<{ [key: string]: { breakfast: number; lunch: number; dinner: number } }>({});
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    // ১. মেম্বারদের তালিকা নিয়ে আসা
    useEffect(() => {
        fetch("/api/members")
            .then((res) => res.json())
            .then((data) => {
                if (Array.isArray(data)) {
                    setMembers(data);
                }
            });
    }, []);

    // ২. নির্দিষ্ট তারিখের মিলের রেকর্ড ফেচ করা
    useEffect(() => {
        setLoading(true);
        fetch(`/api/meals?date=${selectedDate}`)
            .then((res) => res.json())
            .then((data) => {
                if (Array.isArray(data)) {
                    const records: { [key: string]: { breakfast: number; lunch: number; dinner: number } } = {};
                    data.forEach((meal: any) => {
                        records[meal.userId] = {
                            breakfast: meal.breakfast,
                            lunch: meal.lunch,
                            dinner: meal.dinner,
                        };
                    });
                    setMealData(records);
                } else {
                    setMealData({});
                }
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, [selectedDate]);

    // ইনপুট পরিবর্তনের হ্যান্ডלার
    const handleMealChange = (userId: string, mealType: "breakfast" | "lunch" | "dinner", value: number) => {
        setMealData((prev) => ({
            ...prev,
            [userId]: {
                ...prev[userId],
                [mealType]: value,
            },
        }));
    };

    // ৩. সব মেম্বারের মিল সেভ করা
    const handleSaveAll = async () => {
        setSaving(true);
        try {
            for (const member of members) {
                const uMeal = mealData[member.id] || { breakfast: 0, lunch: 0, dinner: 0 };

                await fetch("/api/meals", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        userId: member.id,
                        date: selectedDate,
                        breakfast: uMeal.breakfast,
                        lunch: uMeal.lunch,
                        dinner: uMeal.dinner,
                    }),
                });
            }
            alert("সকল মেম্বারের মিল সফলভাবে আপডেট হয়েছে!");
        } catch (error) {
            alert("মিল সেভ করতে সমস্যা হয়েছে!");
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="space-y-8 font-sans">
            {/* হেডার ও তারিখ সিলেক্টর */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-extrabold text-gray-800">দৈনন্দিন মিল এন্ট্রি</h1>
                    <p className="text-gray-500 mt-1">তারিখ অনুযায়ী মেম্বারদের সকাল, দুপুর ও রাতের মিল ইনপুট দিন</p>
                </div>

                {/* তারিখ সিলেক্ট করার বক্স */}
                <div className="flex items-center gap-3 bg-white p-3 rounded-2xl shadow-sm border border-gray-100">
                    <span className="text-sm font-bold text-gray-600">তারিখ:</span>
                    <input
                        type="date"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        className="bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-sm font-semibold text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                </div>
            </div>

            {/* মিল ইনপুট টেবিল */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                {loading ? (
                    <div className="text-center py-12 text-gray-400 font-medium">মিল ডেটা লোড হচ্ছে...</div>
                ) : members.length === 0 ? (
                    <div className="text-center py-12 text-gray-400 font-medium">কোনো মেম্বার পাওয়া যায়নি!</div>
                ) : (
                    <div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-gray-50 text-gray-500 text-sm border-b border-gray-100">
                                    <tr>
                                        <th className="px-6 py-4 font-medium">সদস্যের নাম</th>
                                        <th className="px-6 py-4 font-medium text-center">সকাল (Breakfast)</th>
                                        <th className="px-6 py-4 font-medium text-center">দুপুর (Lunch)</th>
                                        <th className="px-6 py-4 font-medium text-center">রাত (Dinner)</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {members.map((member) => {
                                        const currentMeal = mealData[member.id] || { breakfast: 0, lunch: 0, dinner: 0 };
                                        return (
                                            <tr key={member.id} className="hover:bg-gray-50 transition">
                                                <td className="px-6 py-4 font-semibold text-gray-800">
                                                    {member.name}
                                                </td>

                                                {/* সকালের মিল */}
                                                <td className="px-6 py-4 text-center">
                                                    <input
                                                        type="number"
                                                        step="0.5"
                                                        min="0"
                                                        value={currentMeal.breakfast}
                                                        onChange={(e) => handleMealChange(member.id, "breakfast", parseFloat(e.target.value) || 0)}
                                                        className="w-20 text-center bg-gray-50 border border-gray-200 rounded-xl py-2 font-bold text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500"
                                                    />
                                                </td>

                                                {/* দুপুরের মিল */}
                                                <td className="px-6 py-4 text-center">
                                                    <input
                                                        type="number"
                                                        step="0.5"
                                                        min="0"
                                                        value={currentMeal.lunch}
                                                        onChange={(e) => handleMealChange(member.id, "lunch", parseFloat(e.target.value) || 0)}
                                                        className="w-20 text-center bg-gray-50 border border-gray-200 rounded-xl py-2 font-bold text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500"
                                                    />
                                                </td>

                                                {/* রাতের মিল */}
                                                <td className="px-6 py-4 text-center">
                                                    <input
                                                        type="number"
                                                        step="0.5"
                                                        min="0"
                                                        value={currentMeal.dinner}
                                                        onChange={(e) => handleMealChange(member.id, "dinner", parseFloat(e.target.value) || 0)}
                                                        className="w-20 text-center bg-gray-50 border border-gray-200 rounded-xl py-2 font-bold text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500"
                                                    />
                                                </td>

                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>

                        {/* সেভ বাটন */}
                        <div className="p-6 bg-gray-50 border-t border-gray-100 flex justify-end">
                            <button
                                onClick={handleSaveAll}
                                disabled={saving}
                                className="bg-orange-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-orange-700 shadow-md transition-all flex items-center gap-2 disabled:bg-orange-400"
                            >
                                {saving ? "সংরক্ষণ হচ্ছে..." : "💾 মিলের হিসাব সংরক্ষণ করুন"}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}