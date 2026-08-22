// src/app/(dashboard)/admin/add-member/page.tsx
"use client";

import { useState } from "react";

export default function AddMemberPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        role: "member",
        deposit: "",
    });

    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            // আমাদের তৈরি করা API-তে ডেটা পাঠানো হচ্ছে
            const res = await fetch("/api/members", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (res.ok) {
                alert(data.message); // সফল হওয়ার মেসেজ
                // ফর্মটি খালি করে দেওয়া
                setFormData({ name: "", email: "", phone: "", role: "member", deposit: "" });
            } else {
                alert(data.message); // এরর মেসেজ (যেমন: ইমেইল আগে থেকেই আছে)
            }
        } catch (error) {
            alert("কোথাও কোনো সমস্যা হয়েছে! আবার চেষ্টা করুন।");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto space-y-8 font-sans">

            {/* পেজ হেডার */}
            <div>
                <h1 className="text-3xl font-extrabold text-gray-800">নতুন মেম্বার যুক্ত করুন</h1>
                <p className="text-gray-500 mt-1">মেসে নতুন সদস্য অ্যাড করতে নিচের ফর্মটি পূরণ করুন</p>
            </div>

            {/* মেম্বার অ্যাড করার ফর্ম */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                <form onSubmit={handleSubmit} className="space-y-6">

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-700">পূর্ণ নাম <span className="text-red-500">*</span></label>
                            <input
                                type="text"
                                placeholder="যেমন: শাকিব আল হাসান"
                                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white transition-all"
                                required
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-700">ফোন নম্বর <span className="text-red-500">*</span></label>
                            <input
                                type="tel"
                                placeholder="01XXXXXXXXX"
                                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white transition-all"
                                required
                                value={formData.phone}
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-700">ইমেইল এড্রেস <span className="text-red-500">*</span></label>
                        <input
                            type="email"
                            placeholder="example@gmail.com (লগইন করার জন্য)"
                            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white transition-all"
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-700">রোল (Role) <span className="text-red-500">*</span></label>
                            <select
                                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white transition-all text-gray-700 cursor-pointer"
                                value={formData.role}
                                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                            >
                                <option value="member">সাধারণ মেম্বার</option>
                                <option value="manager">ম্যানেজার</option>
                                <option value="admin">অ্যাডমিন</option>
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-700">প্রাথমিক জমা বা মিল ফান্ড</label>
                            <div className="relative">
                                <input
                                    type="number"
                                    placeholder="যেমন: 3000"
                                    className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-4 pr-10 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white transition-all"
                                    value={formData.deposit}
                                    onChange={(e) => setFormData({ ...formData, deposit: e.target.value })}
                                />
                                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold">৳</span>
                            </div>
                        </div>
                    </div>

                    <hr className="border-gray-100 my-6" />

                    <div className="flex justify-end gap-4">
                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-orange-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-orange-700 shadow-md transition-all flex items-center gap-2 disabled:bg-orange-400"
                        >
                            {loading ? "যুক্ত হচ্ছে..." : "➕ মেম্বার যুক্ত করুন"}
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
}