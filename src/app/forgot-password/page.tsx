"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";
import Image from "next/image";
import { IconMail, IconSend, IconArrowLeft } from "@tabler/icons-react";

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus("loading");
        setMessage("");

        try {
            const res = await fetch("/api/auth/forgot-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });

            const data = await res.json();

            if (res.ok) {
                setStatus("success");
                setMessage(data.message);
                setEmail("");
            } else {
                setStatus("error");
                setMessage(data.message || "Something went wrong.");
            }
        } catch (error) {
            setStatus("error");
            setMessage("An error occurred. Please try again.");
        }
    };

    return (
        <div className="min-h-[100dvh] w-full bg-[url('/login-bg-mobile.png')] lg:bg-[url('/login-bg.png')] bg-cover bg-center bg-no-repeat flex items-center justify-center lg:justify-end px-4 sm:px-6 lg:pr-[18%] xl:pr-[22%] relative py-6 lg:py-0">
            {/* Overlay to highlight the card */}
            <div className="absolute inset-0 bg-black/10 sm:bg-black/5"></div>

            {/* Main container */}
            <div className="w-full max-w-md flex flex-col items-center relative z-10">
                {/* ─── Mobile View Header (Logo and Text) ─── */}
                <div className="lg:hidden flex flex-col items-center text-center mb-5 sm:mb-6">
                    <Link href="/" className="flex items-center justify-center mb-2 transition-transform hover:scale-105">
                        <Image
                            src="/logo.png"
                            alt="Amader Mess Logo"
                            width={180}
                            height={180}
                            priority
                            className="w-28 sm:w-32 h-auto object-contain drop-shadow-md"
                        />
                    </Link>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-[#5e2818] leading-tight drop-shadow-sm mb-6">
                        Good Food <br />
                        Brighter Days
                    </h2>
                </div>

                {/* ─── Forgot Password Card (Glassmorphism Effect) ─── */}
                <div className="bg-white/30 backdrop-blur-xl w-full rounded-3xl sm:rounded-[2.5rem] shadow-[0_8px_32px_0_rgba(0,0,0,0.1)] p-6 sm:p-8 border border-white/50">
                    {/* ─── Desktop View Title ─── */}
                    <div className="text-center mb-10">
                        <h2 className="text-3xl font-extrabold text-[#5e2818] tracking-tight drop-shadow-sm mb-2">
                            Forgot Password
                        </h2>
                        <p className="text-gray-600 text-sm sm:text-base font-bold drop-shadow-sm px-4">
                            Enter your email address and we'll send you a link to reset your password.
                        </p>
                    </div>

                    {status === "error" && (
                        <div className="bg-red-500/20 backdrop-blur-md text-red-700 p-3 rounded-xl text-sm font-bold mb-5 text-center border border-red-500/30">
                            {message}
                        </div>
                    )}

                    {status === "success" && (
                        <div className="bg-green-500/20 backdrop-blur-md text-green-800 p-4 rounded-xl text-sm font-bold mb-5 text-center border border-green-500/30">
                            {message}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Email Field */}
                        <div>
                            <label className="block text-sm font-bold text-gray-900 mb-2.5 ml-1 drop-shadow-sm">
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
                                    className="w-full pl-14 pr-4 py-3 sm:py-3.5 bg-white/40 border border-white/50 rounded-xl outline-none focus:bg-white/60 focus:ring-2 focus:ring-orange-400 transition-all placeholder-gray-400 text-base text-gray-900 font-normal shadow-inner [&:-webkit-autofill]:shadow-[inset_0_0_0px_1000px_#fff] [&:-webkit-autofill]:[-webkit-text-fill-color:#111827]"
                                    required
                                    disabled={status === "loading" || status === "success"}
                                />
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={status === "loading" || status === "success"}
                            className="w-full py-3.5 flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white text-lg font-bold rounded-xl shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 hover:-translate-y-0.5 transition-all duration-300 tracking-wide cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:-translate-y-0"
                        >
                            <IconSend className="w-5 h-5" stroke={2.5} />
                            {status === "loading" ? "Sending..." : "Send Reset Link"}
                        </button>
                    </form>

                    {/* Back to Login Link */}
                    <div className="mt-8 text-center text-sm font-bold text-gray-800 drop-shadow-sm">
                        <Link href="/login" className="inline-flex items-center gap-1 text-orange-600 font-extrabold hover:text-orange-700 transition-colors">
                            <IconArrowLeft className="w-4 h-4" stroke={2.5} />
                            Back to Login
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
