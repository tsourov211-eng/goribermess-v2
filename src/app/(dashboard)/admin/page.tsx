// src/app/(dashboard)/admin/page.tsx
"use client";

import { useEffect, useState } from "react";

interface Member {
    id: string;
    name: string;
    role: string;
    deposit: number;
}

export default function AdminDashboardPage() {
    const [members, setMembers] = useState<Member[]>([]);
    const [loading, setLoading] = useState(true);

    // এডিট করার জন্য স্টেট
    const [editingMember, setEditingMember] = useState<Member | null>(null);
    const [editForm, setEditForm] = useState({ name: "", role: "", deposit: 0 });
    const [updating, setUpdating] = useState(false);

    // মেম্বারদের ডেটা আনা (যাতে আপডেট করার পর আবার কল করা যায়)
    const fetchMembers = () => {
        fetch("/api/members")
            .then((res) => res.json())
            .then((data) => {
                if (Array.isArray(data)) setMembers(data);
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchMembers();
    }, []);

    // এডিট বাটনে ক্লিক করলে মডাল ওপেন হবে
    const handleEditClick = (member: Member) => {
        setEditingMember(member);
        setEditForm({
            name: member.name,
            role: member.role,
            deposit: member.deposit,
        });
    };

    // আপডেট সেভ করার ফাংশন
    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!editingMember) return;

        setUpdating(true);
        try {
            const res = await fetch(`/api/members/${editingMember.id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(editForm),
            });

            if (res.ok) {
                alert("সফলভাবে আপডেট হয়েছে!");
                setEditingMember(null); // মডাল বন্ধ করা
                fetchMembers(); // নতুন ডেটা লোড করা
            } else {
                alert("আপডেট ফেইল হয়েছে!");
            }
        } catch (error) {
            alert("সার্ভারে সমস্যা হয়েছে!");
        } finally {
            setUpdating(false);
        }
    };

    const totalMembers = members.length;
    const totalFund = members.reduce((sum, member) => sum + member.deposit, 0);
    const totalExpense = 32450;
    const currentBalance = totalFund - totalExpense;

    return (
        <div className="space-y-8 font-sans relative">
            <div>
                <h1 className="text-3xl font-extrabold text-gray-800">অ্যাডমিন ড্যাশবোর্ড</h1>
                <p className="text-gray-500 mt-1">পুরো মেসের সার্বিক নিয়ন্ত্রণ এবং ফান্ডের হিসাব</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-2xl border-l-4 border-blue-500 shadow-sm">
                    <p className="text-sm text-gray-500 font-medium">মোট মেম্বার</p>
                    <h2 className="text-3xl font-bold text-gray-800 mt-2">{loading ? "..." : `${totalMembers} জন`}</h2>
                </div>
                <div className="bg-white p-6 rounded-2xl border-l-4 border-green-500 shadow-sm">
                    <p className="text-sm text-gray-500 font-medium">চলতি মাসের ফান্ড (জমা)</p>
                    <h2 className="text-3xl font-bold text-gray-800 mt-2">{loading ? "..." : `${totalFund.toLocaleString('bn-BD')} ৳`}</h2>
                </div>
                <div className="bg-white p-6 rounded-2xl border-l-4 border-orange-500 shadow-sm">
                    <p className="text-sm text-gray-500 font-medium">বর্তমান ব্যালেন্স</p>
                    <h2 className="text-3xl font-bold text-orange-600 mt-2">{loading ? "..." : `${currentBalance.toLocaleString('bn-BD')} ৳`}</h2>
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="px-6 py-5 border-b border-gray-100">
                    <h2 className="text-lg font-bold text-gray-800">মেম্বারদের তালিকা ও স্ট্যাটাস</h2>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 text-gray-500 text-sm border-b border-gray-100">
                            <tr>
                                <th className="px-6 py-4 font-medium">নাম</th>
                                <th className="px-6 py-4 font-medium">রোল (Role)</th>
                                <th className="px-6 py-4 font-medium">মোট জমা</th>
                                <th className="px-6 py-4 font-medium">অ্যাকশন</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {loading ? (
                                <tr><td colSpan={4} className="text-center py-8 text-gray-400">ডেটা লোড হচ্ছে...</td></tr>
                            ) : (
                                members.map((member) => (
                                    <tr key={member.id} className="hover:bg-gray-50 transition">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center font-bold text-sm">
                                                    {member.name ? member.name.charAt(0) : "U"}
                                                </div>
                                                <span className="font-semibold text-gray-800">{member.name}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${member.role === 'admin' ? 'bg-purple-100 text-purple-700' :
                                                member.role === 'manager' ? 'bg-blue-100 text-blue-700' :
                                                    'bg-gray-100 text-gray-700'
                                                }`}>
                                                {member.role}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 font-medium text-gray-700">{member.deposit.toLocaleString('bn-BD')} ৳</td>
                                        <td className="px-6 py-4">
                                            <button
                                                onClick={() => handleEditClick(member)}
                                                className="text-blue-500 hover:text-blue-700 font-bold text-sm bg-blue-50 px-3 py-1 rounded-lg"
                                            >
                                                এডিট
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* এডিট মডাল (পপ-আপ) */}
            {editingMember && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-xl">
                        <h3 className="text-xl font-bold text-gray-800 mb-4">মেম্বার এডিট করুন</h3>

                        <form onSubmit={handleUpdate} className="space-y-4">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">নাম</label>
                                <input
                                    type="text"
                                    value={editForm.name}
                                    onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 focus:ring-2 focus:ring-orange-500 outline-none"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">রোল (Role)</label>
                                <select
                                    value={editForm.role}
                                    onChange={(e) => setEditForm({ ...editForm, role: e.target.value })}
                                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 focus:ring-2 focus:ring-orange-500 outline-none"
                                >
                                    <option value="member">Member (সাধারণ সদস্য)</option>
                                    <option value="manager">Manager (ম্যানেজার)</option>
                                    <option value="admin">Admin (অ্যাডমিন)</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">জমার পরিমাণ (৳)</label>
                                <input
                                    type="number"
                                    value={editForm.deposit}
                                    onChange={(e) => setEditForm({ ...editForm, deposit: Number(e.target.value) })}
                                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 focus:ring-2 focus:ring-orange-500 outline-none"
                                    required
                                />
                            </div>

                            <div className="flex gap-3 pt-4">
                                <button
                                    type="button"
                                    onClick={() => setEditingMember(null)}
                                    className="flex-1 bg-gray-100 text-gray-600 font-bold py-2.5 rounded-xl hover:bg-gray-200"
                                >
                                    বাতিল
                                </button>
                                <button
                                    type="submit"
                                    disabled={updating}
                                    className="flex-1 bg-orange-600 text-white font-bold py-2.5 rounded-xl hover:bg-orange-700 disabled:bg-orange-400"
                                >
                                    {updating ? "সেভ হচ্ছে..." : "সেভ করুন"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

        </div>
    );
}