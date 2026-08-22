// src/app/(dashboard)/admin/members-list/page.tsx
"use client";

import { useEffect, useState } from "react";

interface Member {
    id: string;
    name: string;
    email: string;
    phone: string;
    role: string;
    deposit: number;
}

export default function MembersListPage() {
    const [members, setMembers] = useState<Member[]>([]);
    const [loading, setLoading] = useState(true);

    // পেজ লোড হওয়ার সাথে সাথে API থেকে ডেটা নিয়ে আসা
    useEffect(() => {
        fetch("/api/members")
            .then((res) => res.json())
            .then((data) => {
                if (Array.isArray(data)) {
                    setMembers(data);
                }
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    return (
        <div className="space-y-8 font-sans">

            {/* হেডার অংশ */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-extrabold text-gray-800">মেসের সকল সদস্য</h1>
                    <p className="text-gray-500 mt-1">ডেটাবেসে থাকা সকল মেম্বারদের তালিকা ও তাদের তথ্য</p>
                </div>
                <div className="bg-orange-100 text-orange-800 px-4 py-2 rounded-xl font-bold text-sm">
                    মোট সদস্য: {members.length} জন
                </div>
            </div>

            {/* টেবিল অংশ */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                {loading ? (
                    <div className="text-center py-12 text-gray-400 font-medium">তথ্য লোড হচ্ছে...</div>
                ) : members.length === 0 ? (
                    <div className="text-center py-12 text-gray-400 font-medium">কোনো মেম্বার পাওয়া যায়নি! আগে নতুন মেম্বার যুক্ত করুন।</div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50 text-gray-500 text-sm border-b border-gray-100">
                                <tr>
                                    <th className="px-6 py-4 font-medium">সদস্যের নাম</th>
                                    <th className="px-6 py-4 font-medium">ইমেইল ও ফোন</th>
                                    <th className="px-6 py-4 font-medium text-center">রোল (Role)</th>
                                    <th className="px-6 py-4 font-medium text-center">জমা ফান্ড (Deposit)</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {members.map((member) => (
                                    <tr key={member.id} className="hover:bg-gray-50 transition">

                                        {/* নাম ও প্রোফাইল আইকন */}
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center font-bold">
                                                    {member.name ? member.name.charAt(0) : "U"}
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-gray-800">{member.name || "নাম নেই"}</p>
                                                    <span className="text-xs text-gray-400">আইডি: {member.id.slice(-6)}</span>
                                                </div>
                                            </div>
                                        </td>

                                        {/* ইমেইল ও ফোন */}
                                        <td className="px-6 py-4">
                                            <p className="text-sm font-medium text-gray-700">{member.email}</p>
                                            <p className="text-xs text-gray-400">{member.phone || "ফোন নম্বর নেই"}</p>
                                        </td>

                                        {/* রোল ব্যাজ */}
                                        <td className="px-6 py-4 text-center">
                                            <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${member.role === 'admin'
                                                    ? 'bg-purple-100 text-purple-700'
                                                    : member.role === 'manager'
                                                        ? 'bg-blue-100 text-blue-700'
                                                        : 'bg-green-100 text-green-700'
                                                }`}>
                                                {member.role}
                                            </span>
                                        </td>

                                        {/* জমা ফান্ড */}
                                        <td className="px-6 py-4 text-center">
                                            <span className="font-bold text-gray-800 bg-gray-50 px-3 py-1.5 rounded-xl border border-gray-100">
                                                ৳ {member.deposit}
                                            </span>
                                        </td>

                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

        </div>
    );
}