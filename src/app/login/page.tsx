// app/login/page.tsx-এর ভেতরে ফর্ম হ্যান্ডেল করার অংশটি এভাবে যুক্ত করুন:
"use client";

import Link from "next/link";
import { signIn, getSession } from "next-auth/react";
import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();


    // ফর্ম সাবমিট করার ফাংশন
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");

        try {
            const res = await signIn("credentials", {
                email,
                password,
                redirect: false,
            });

            if (res?.error) {
                setError("ইমেইল অথবা পাসওয়ার্ড ভুল হয়েছে!");
            } else {
                // সফলভাবে লগইন হলে সেশন (Session) থেকে ইউজারের রোল বের করা
                const session = await getSession();
                const userRole = (session?.user as { role?: string })?.role;

                // রোল অনুযায়ী নির্দিষ্ট ড্যাশবোর্ডে পাঠানো
                if (userRole === "admin") {
                    router.push("/admin");
                } else if (userRole === "manager") {
                    router.push("/manager");
                } else {
                    router.push("/member");
                }
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="min-h-screen bg-[url('/login-bg-mobile.png')] md:bg-[url('/login-bg.png')] bg-cover bg-center bg-no-repeat flex items-center justify-center">


            <div className="bg-white w-full max-w-lg rounded-[2rem] shadow-xl p-10 border border-orange-50">

                <div className="text-center mb-8">
                    <Link href="/" className="flex justify-center mb-2 cursor-pointer">
                        {/* "গড়িবের মেস" লেখার বদলে নিচে লোগো বসানো হয়েছে */}
                        <Image
                            src="/logo.png"
                            alt="গরিবের মেস লোগো"
                            width={180}
                            height={60}
                            priority
                        />
                    </Link>

                </div>

                {/* যদি পাসওয়ার্ড ভুল হয়, এখানে এরর দেখাবে */}
                {error && (
                    <div className="bg-red-50 text-red-600 p-3 rounded-xl text-sm font-semibold mb-6 text-center border border-red-100">
                        {error}
                    </div>
                )}

                {/* ফর্ম */}
                <form onSubmit={handleSubmit} className="space-y-5">


                    {/* ইমেইল ফিল্ড */}
                    <div className="flex flex-col gap-2 mb-5">
                        <label className="text-base font-bold text-gray-700 ml-1">
                            Email Address
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="admin@gmail.com"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-orange-500 transition-all placeholder-gray-400"
                            required
                        />
                    </div>

                    {/* পাসওয়ার্ড ফিল্ড */}
                    <div className="flex flex-col gap-2 mb-6 ">
                        <label className="text-base font-bold text-gray-700 ml-1">
                            Password
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-orange-500 transition-all placeholder-gray-400"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-3 mt-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white text-lg font-bold rounded-lg shadow-lg shadow-orange-500/40 hover:shadow-orange-500/60 hover:-translate-y-1 transition-all duration-300 tracking-wide"
                    >
                        Sign In
                    </button>
                </form>

                <div className="my-6 flex items-center gap-4">
                    <div className="h-px bg-gray-200 flex-1"></div>
                    <span className="text-sm font-medium text-gray-400">OR</span>
                    <div className="h-px bg-gray-200 flex-1"></div>
                </div>

                <button
                    onClick={() => signIn('google', { callbackUrl: '/member' })}
                    type="button"
                    className="w-full bg-white border-2 border-gray-200 text-gray-700 font-bold text-lg py-3.5 rounded-xl flex items-center justify-center gap-3 hover:bg-gray-50 hover:border-gray-300 transition-all cursor-pointer"
                >
                    {/* গুগল আইকন এসভিজি আগের মতোই থাকবে */}
                    Sign In with Google
                </button>

            </div>
        </div>
    );
}