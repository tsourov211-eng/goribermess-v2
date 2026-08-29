// app/login/page.tsx-এর ভেতরে ফর্ম হ্যান্ডেল করার অংশটি এভাবে যুক্ত করুন:
"use client";

import Link from "next/link";
import { signIn, getSession } from "next-auth/react";
import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";

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
  

            <div className="bg-white w-full max-w-md rounded-[2rem] shadow-xl p-10 border border-orange-50">

                <div className="text-center mb-8">
                    <Link href="/" className="text-3xl font-extrabold text-orange-600 tracking-tight block mb-2 cursor-pointer">
                        গড়িবের মেস
                    </Link>
                    <p className="text-gray-500 font-medium">আপনার ড্যাশবোর্ডে প্রবেশ করুন</p>
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
                        <label className="text-sm font-bold text-gray-700">
                            ইমেইল এড্রেস
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="admin@gmail.com"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-orange-500 transition-all placeholder-gray-400"
                            required
                        />
                    </div>

                    {/* পাসওয়ার্ড ফিল্ড */}
                    <div className="flex flex-col gap-2 mb-6">
                        <label className="text-sm font-bold text-gray-700">
                            পাসওয়ার্ড
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-orange-500 transition-all placeholder-gray-400"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-3/4 block mx-auto bg-orange-600 text-white font-bold text-lg py-4 rounded-xl hover:bg-orange-700 hover:shadow-lg hover:shadow-orange-500/30 transition-all duration-300 mt-2 cursor-pointer"
                    >
                        লগইন করুন
                    </button>
                </form>

                <div className="my-6 flex items-center gap-4">
                    <div className="h-px bg-gray-200 flex-1"></div>
                    <span className="text-sm font-medium text-gray-400">অথবা</span>
                    <div className="h-px bg-gray-200 flex-1"></div>
                </div>

                <button
                    onClick={() => signIn('google', { callbackUrl: '/member' })}
                    type="button"
                    className="w-full bg-white border-2 border-gray-200 text-gray-700 font-bold text-lg py-3.5 rounded-xl flex items-center justify-center gap-3 hover:bg-gray-50 hover:border-gray-300 transition-all cursor-pointer"
                >
                    {/* গুগল আইকন এসভিজি আগের মতোই থাকবে */}
                    Google দিয়ে লগইন
                </button>

            </div>
        </div>
    );
}