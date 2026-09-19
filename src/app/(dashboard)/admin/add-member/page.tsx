"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { 
    IconArrowLeft, 
    IconUserPlus, 
    IconUser, 
    IconMail, 
    IconPhone, 
    IconBriefcase
} from "@tabler/icons-react";

export default function AddMemberPage() {
    const router = useRouter();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [role, setRole] = useState("member");
    const [password, setPassword] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState("");
    
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");
        setIsSubmitting(true);

        try {
            const res = await fetch("/api/admin/users", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name,
                    email,
                    phone,
                    role,
                    password: password || "123456"
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.error || "Failed to add member");
            } else {
                alert("✅ Member added successfully!");
                router.push("/members-list");
            }
        } catch (err) {
            console.error("Add Member Error:", err);
            setError("Server error while adding member.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            
            {/* ─── Header Section ─── */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-[#450705] tracking-tight">Add New Member</h1>
                    <p className="text-gray-500 text-sm mt-1.5 font-medium">Fill in the details to add a new member to your mess.</p>
                </div>
                <Link 
                    href="/members-list" 
                    className="flex items-center justify-center gap-2 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 px-5 py-2.5 rounded-xl font-bold text-sm shadow-sm transition-all w-full sm:w-auto cursor-pointer"
                >
                    <IconArrowLeft className="w-4 h-4" stroke={2.5} />
                    Back to Members
                </Link>
            </div>

            {/* ─── Form Section ─── */}
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden p-6 sm:p-8 lg:p-10">
                {error && (
                    <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm font-bold">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    
                    {/* Grid Layout for Fields */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        
                        {/* Full Name */}
                        <div>
                            <label className="block text-sm font-bold text-gray-900 mb-2 ml-1">
                                Full Name <span className="text-red-500">*</span>
                            </label>
                            <div className="relative flex items-center">
                                <div className="absolute left-3 text-gray-400">
                                    <IconUser className="w-5 h-5" stroke={2} />
                                </div>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="e.g. Rajib Hasan"
                                    className="w-full pl-10 pr-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl outline-none focus:bg-white focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all placeholder-gray-400 text-sm text-gray-900 font-semibold"
                                    required
                                />
                            </div>
                        </div>

                        {/* Email Address */}
                        <div>
                            <label className="block text-sm font-bold text-gray-900 mb-2 ml-1">
                                Email Address <span className="text-red-500">*</span>
                            </label>
                            <div className="relative flex items-center">
                                <div className="absolute left-3 text-gray-400">
                                    <IconMail className="w-5 h-5" stroke={2} />
                                </div>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="e.g. rajib@gmail.com"
                                    className="w-full pl-10 pr-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl outline-none focus:bg-white focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all placeholder-gray-400 text-sm text-gray-900 font-semibold"
                                    required
                                />
                            </div>
                        </div>

                        {/* Phone Number */}
                        <div>
                            <label className="block text-sm font-bold text-gray-900 mb-2 ml-1">
                                Phone Number
                            </label>
                            <div className="relative flex items-center">
                                <div className="absolute left-3 text-gray-400">
                                    <IconPhone className="w-5 h-5" stroke={2} />
                                </div>
                                <input
                                    type="tel"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    placeholder="e.g. 01700000000"
                                    className="w-full pl-10 pr-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl outline-none focus:bg-white focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all placeholder-gray-400 text-sm text-gray-900 font-semibold"
                                />
                            </div>
                        </div>

                        {/* Role Selection */}
                        <div>
                            <label className="block text-sm font-bold text-gray-900 mb-2 ml-1">
                                Member Role <span className="text-red-500">*</span>
                            </label>
                            <div className="relative flex items-center">
                                <div className="absolute left-3 text-gray-400 pointer-events-none">
                                    <IconBriefcase className="w-5 h-5" stroke={2} />
                                </div>
                                <select 
                                    value={role}
                                    onChange={(e) => setRole(e.target.value)}
                                    className="w-full pl-10 pr-10 py-3 bg-gray-50/50 border border-gray-200 rounded-xl outline-none focus:bg-white focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all text-sm text-gray-900 font-semibold appearance-none cursor-pointer"
                                    required
                                >
                                    <option value="member">General Member</option>
                                    <option value="manager">Manager</option>
                                    <option value="admin">Admin</option>
                                </select>
                                <div className="absolute right-4 pointer-events-none">
                                    <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                                </div>
                            </div>
                        </div>

                        {/* Password (Optional, default 123456) */}
                        <div className="md:col-span-2">
                            <label className="block text-sm font-bold text-gray-900 mb-2 ml-1">
                                Initial Password (Default: 123456)
                            </label>
                            <input
                                type="text"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter custom password or leave blank for 123456"
                                className="w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl outline-none focus:bg-white focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all placeholder-gray-400 text-sm text-gray-900 font-semibold"
                            />
                        </div>
                    </div>

                    {/* Divider */}
                    <div className="h-px w-full bg-gray-100 my-8"></div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row items-center justify-end gap-4 mt-8">
                        <Link 
                            href="/members-list"
                            className="w-full sm:w-auto px-6 py-3 rounded-xl font-bold text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-all text-center cursor-pointer"
                        >
                            Cancel
                        </Link>
                        <button 
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#FF6B00] hover:bg-orange-600 text-white px-8 py-3 rounded-xl font-bold text-sm shadow-md shadow-orange-500/20 transition-all cursor-pointer disabled:opacity-50"
                        >
                            <IconUserPlus className="w-5 h-5" stroke={2.5} />
                            {isSubmitting ? "Saving..." : "Save Member"}
                        </button>
                    </div>

                </form>
            </div>

        </div>
    );
}