// src/app/(dashboard)/manager/bazaar/page.tsx
"use client";

import { useState } from "react";

export default function BazaarRoutinePage() {
    // ডেমো বাজারের রুটিন ডাটা
    const [bazaarRoutine, setBazaarRoutine] = useState([
        { id: 1, date: "২২ আগস্ট, ২০২৬", memberName: "তানভীর", status: "কমপ্লিট" },
        { id: 2, date: "২৩ আগস্ট, ২০২৬", memberName: "শাকিব", status: "পেন্ডিং" },
        { id: 3, date: "২৪ আগস্ট, ২০২৬", memberName: "রফিক", status: "পেন্ডিং" },
        { id: 4, date: "২৫ আগস্ট, ২০২৬", memberName: "হাসান", status: "পেন্ডিং" },
    ]);

    const handleStatusChange = (id: number) => {
        const newRoutine = bazaarRoutine.map(item =>
            item.id === id
                ? { ...item, status: item.status === "পেন্ডিং" ? "কমপ্লিট" : "পেন্ডিং" }
                : item
        );
        setBazaarRoutine(newRoutine);
    };

    return (
        <div className="space-y-8 font-sans">

            {/* হেডার অংশ */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-extrabold text-gray-800">বাজারের রুটিন</h1>
                    <p className="text-gray-500 mt-1">মেম্বারদের দৈনিক বাজার করার তালিকা</p>
                </div>
                <button className="bg-orange-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-orange-700 shadow-md transition flex items-center gap-2">
                    <span>📅</span> নতুন রুটিন তৈরি করুন
                </button>
            </div>

            {/* রুটিন লিস্ট */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="px-6 py-5 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
                    <h2 className="text-lg font-bold text-gray-800">চলতি সপ্তাহের রুটিন</h2>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-white text-gray-500 text-sm border-b border-gray-100">
                            <tr>
                                <th className="px-6 py-4 font-medium">তারিখ</th>
                                <th className="px-6 py-4 font-medium">দায়িত্বপ্রাপ্ত মেম্বার</th>
                                <th className="px-6 py-4 font-medium text-center">স্ট্যাটাস</th>
                                <th className="px-6 py-4 font-medium text-right">অ্যাকশন</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">

                            {bazaarRoutine.map((item) => (
                                <tr key={item.id} className={`hover:bg-gray-50 transition ${item.status === 'কমপ্লিট' ? 'bg-green-50/30' : ''}`}>
                                    <td className="px-6 py-4 font-semibold text-gray-700">{item.date}</td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center font-bold">
                                                {item.memberName.charAt(0)}
                                            </div>
                                            <span className="font-semibold text-gray-800">{item.memberName}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${item.status === 'কমপ্লিট'
                                            ? 'bg-green-100 text-green-700'
                                            : 'bg-yellow-100 text-yellow-700'
                                            }`}>
                                            {item.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button
                                            onClick={() => handleStatusChange(item.id)}
                                            className={`font-medium text-sm hover:underline ${item.status === 'কমপ্লিট' ? 'text-gray-500' : 'text-green-600'
                                                }`}
                                        >
                                            {item.status === 'কমপ্লিট' ? 'পূর্বের অবস্থায় ফিরুন' : 'মার্ক অ্যাজ কমপ্লিট'}
                                        </button>
                                    </td>
                                </tr>
                            ))}

                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    );
}