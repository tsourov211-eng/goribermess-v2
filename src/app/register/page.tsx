"use client";

import Link from "next/link";
import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { 
    IconBrandGoogle, 
    IconMail, 
    IconLock, 
    IconEye, 
    IconUserPlus,
    IconHome,
    IconUser
} from "@tabler/icons-react";

export default function RegisterPage() {
    const [messName, setMessName] = useState("");
    const [managerName, setManagerName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");

        // এখানে পরবর্তীতে ডাটাবেসে বা API তে ডাটা পাঠানোর লজিক বসবে
        console.log({ messName, managerName, email, password });
        
        // সফলভাবে রেজিস্টার হলে লগইন পেজে পাঠিয়ে দেবো
        // router.push("/login");
    };

    return (
        <div className="min-h-[100dvh] w-full bg-[url('/login-bg-mobile.png')] lg:bg-[url('/login-bg.png')] bg-cover bg-center bg-no-repeat flex items-center justify-center lg:justify-end px-4 sm:px-6 lg:pr-[18%] xl:pr-[22%] relative py-6 lg:py-0">

            {/* কার্ডটিকে ফুটিয়ে তোলার জন্য ওভারলে */}
            <div className="absolute inset-0 bg-black/10 sm:bg-black/5"></div>

            {/* মেইন কন্টেইনার */}
            <div className="w-full max-w-md flex flex-col items-center relative z-10">
                
                {/* ─── মোবাইল ভিউ হেডার ─── */}
                <div className="lg:hidden flex flex-col items-center text-center mb-4 sm:mb-5 mt-4">
                    <Link href="/" className="flex items-center justify-center mb-2 transition-transform hover:scale-105">
                        <Image
                            src="/logo.png"
                            alt="আমাদের মেস লোগো"
                            width={140} 
                            height={140}
                            priority
                            className="w-24 sm:w-28 h-auto object-contain drop-shadow-md"
                        />
                    </Link>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-[#5e2818] leading-tight drop-shadow-sm mb-1">
                        Start Your Journey
                    </h2>
                    <p className="text-gray-700 text-sm mt-1 font-bold">
                        Create a new mess in just a few steps
                    </p>
                </div>

                {/* ─── রেজিস্ট্রেশন কার্ড (Glassmorphism Effect) ─── */}
                <div className="bg-white/30 backdrop-blur-xl w-full rounded-3xl sm:rounded-[2.5rem] shadow-[0_8px_32px_0_rgba(0,0,0,0.1)] p-6 sm:p-8 border border-white/50 my-4 lg:my-0">
                    
                    {/* ─── ডেস্কটপ ভিউ টাইটেল ─── */}
                    <div className="hidden lg:block text-center mb-8">
                        <h2 className="text-3xl font-extrabold text-[#5e2818] tracking-tight drop-shadow-sm mb-2">
                            Create a Mess
                        </h2>
                        <p className="text-gray-700 text-sm sm:text-base font-bold drop-shadow-sm">
                            Set up your account to get started
                        </p>
                    </div>

                    {error && (
                        <div className="bg-red-500/20 backdrop-blur-md text-red-700 p-3 rounded-xl text-sm font-bold mb-5 text-center border border-red-500/30">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        
                        {/* Mess Name Field */}
                        <div>
                            <label className="block text-sm font-bold text-gray-900 mb-1.5 ml-1 drop-shadow-sm">
                                Mess Name
                            </label>
                            <div className="relative flex items-center">
                                <div className="absolute left-1.5 w-10 h-10 bg-white/50 rounded-lg flex items-center justify-center shadow-sm">
                                    <IconHome className="h-5 w-5 text-orange-600" stroke={2} />
                                </div>
                                <input
                                    type="text"
                                    value={messName}
                                    onChange={(e) => setMessName(e.target.value)}
                                    placeholder="e.g. Super Boys Mess"
                                    className="w-full pl-14 pr-4 py-3 bg-white/40 border border-white/50 rounded-xl outline-none focus:bg-white/60 focus:ring-2 focus:ring-orange-400 transition-all placeholder-gray-500 text-base text-gray-900 font-normal shadow-inner"
                                    required
                                />
                            </div>
                        </div>

                        {/* Manager Name Field */}
                        <div>
                            <label className="block text-sm font-bold text-gray-900 mb-1.5 ml-1 drop-shadow-sm">
                                Manager Name
                            </label>
                            <div className="relative flex items-center">
                                <div className="absolute left-1.5 w-10 h-10 bg-white/50 rounded-lg flex items-center justify-center shadow-sm">
                                    <IconUser className="h-5 w-5 text-orange-600" stroke={2} />
                                </div>
                                <input
                                    type="text"
                                    value={managerName}
                                    onChange={(e) => setManagerName(e.target.value)}
                                    placeholder="e.g. Tanvir Ahammed"
                                    className="w-full pl-14 pr-4 py-3 bg-white/40 border border-white/50 rounded-xl outline-none focus:bg-white/60 focus:ring-2 focus:ring-orange-400 transition-all placeholder-gray-500 text-base text-gray-900 font-normal shadow-inner"
                                    required
                                />
                            </div>
                        </div>

                        {/* Email Field */}
                        <div>
                            <label className="block text-sm font-bold text-gray-900 mb-1.5 ml-1 drop-shadow-sm">
                                Email Address
                            </label>
                            <div className="relative flex items-center">
                                <div className="absolute left-1.5 w-10 h-10 bg-white/50 rounded-lg flex items-center justify-center shadow-sm">
                                    <IconMail className="h-5 w-5 text-orange-600" stroke={2} />
                                </div>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="admin@gmail.com"
                                    className="w-full pl-14 pr-4 py-3 bg-white/40 border border-white/50 rounded-xl outline-none focus:bg-white/60 focus:ring-2 focus:ring-orange-400 transition-all placeholder-gray-500 text-base text-gray-900 font-normal shadow-inner"
                                    required
                                />
                            </div>
                        </div>

                        {/* Password Field */}
                        <div>
                            <label className="block text-sm font-bold text-gray-900 mb-1.5 ml-1 drop-shadow-sm">
                                Password
                            </label>
                            <div className="relative flex items-center">
                                <div className="absolute left-1.5 w-10 h-10 bg-white/50 rounded-lg flex items-center justify-center shadow-sm">
                                    <IconLock className="h-5 w-5 text-orange-600" stroke={2} />
                                </div>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="w-full pl-14 pr-12 py-3 bg-white/40 border border-white/50 rounded-xl outline-none focus:bg-white/60 focus:ring-2 focus:ring-orange-400 transition-all placeholder-gray-500 text-base text-gray-900 font-normal shadow-inner"
                                    required
                                />
                                <div className="absolute inset-y-0 right-0 pr-4 flex items-center cursor-pointer group">
                                    <IconEye className="h-5 w-5 text-gray-700 group-hover:text-orange-600 transition-colors" stroke={2} />
                                </div>
                            </div>
                        </div>

                        {/* Register Button */}
                        <button
                            type="submit"
                            className="w-full py-3.5 mt-4 flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white text-lg font-bold rounded-xl shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 hover:-translate-y-0.5 transition-all duration-300 tracking-wide cursor-pointer"
                        >
                            <IconUserPlus className="w-5 h-5" stroke={2.5} />
                            Create Account
                        </button>
                    </form>

                    {/* OR Divider */}
                    <div className="my-5 flex items-center gap-4">
                        <div className="h-px bg-gray-400/30 flex-1"></div>
                        <span className="text-xs font-bold text-gray-700 uppercase tracking-widest drop-shadow-sm">Or</span>
                        <div className="h-px bg-gray-400/30 flex-1"></div>
                    </div>

                    {/* Google Sign Up Button */}
                    <button
                        type="button"
                        className="w-full py-3.5 flex items-center justify-center gap-3 bg-white/40 backdrop-blur-sm border border-white/50 text-gray-900 text-base font-bold rounded-xl shadow-sm hover:bg-white/60 transition-all duration-300 cursor-pointer"
                    >
                        <IconBrandGoogle className="w-6 h-6 text-orange-600" stroke={1.5} />
                        Sign up with Google
                    </button>

                    {/* Login Link */}
                    <div className="mt-6 text-center text-sm font-bold text-gray-800 drop-shadow-sm">
                        Already have an account?{" "}
                        <Link href="/login" className="text-orange-600 font-extrabold hover:text-orange-700 transition-colors">
                            Login here
                        </Link>
                    </div>

                </div>
            </div>
        </div>
    );
}