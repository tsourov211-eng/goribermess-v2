"use client";

import { useState, FormEvent, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { IconLock, IconEye, IconEyeOff, IconCheck, IconX } from "@tabler/icons-react";

function ResetPasswordForm() {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [message, setMessage] = useState("");
    const searchParams = useSearchParams();
    const router = useRouter();
    
    const token = searchParams.get("token");

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        if (!token) {
            setStatus("error");
            setMessage("Invalid or missing password reset token.");
            return;
        }

        if (password !== confirmPassword) {
            setStatus("error");
            setMessage("Passwords do not match.");
            return;
        }

        if (password.length < 6) {
            setStatus("error");
            setMessage("Password must be at least 6 characters long.");
            return;
        }

        setStatus("loading");
        setMessage("");

        try {
            const res = await fetch("/api/auth/reset-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ token, password }),
            });

            const data = await res.json();

            if (res.ok) {
                setStatus("success");
                setMessage(data.message);
                setTimeout(() => {
                    router.push("/login");
                }, 3000);
            } else {
                setStatus("error");
                setMessage(data.message || "Something went wrong.");
            }
        } catch (error) {
            setStatus("error");
            setMessage("An error occurred. Please try again.");
        }
    };

    if (!token) {
        return (
            <div className="text-center">
                <div className="bg-red-500/20 backdrop-blur-md text-red-700 p-4 rounded-xl text-sm font-bold mb-5 border border-red-500/30 flex items-center justify-center gap-2">
                    <IconX className="w-5 h-5" />
                    Invalid or missing password reset token.
                </div>
                <Link href="/forgot-password" className="text-orange-600 font-bold hover:underline">
                    Request a new link
                </Link>
            </div>
        );
    }

    if (status === "success") {
        return (
            <div className="text-center py-4">
                <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4 border-2 border-green-500">
                    <IconCheck className="w-8 h-8 text-green-600" stroke={3} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Password Reset Successfully</h3>
                <p className="text-gray-600 mb-6 font-medium">Your password has been changed. You will be redirected to the login page shortly.</p>
                <Link href="/login" className="inline-block py-3 px-6 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold rounded-xl shadow-lg hover:shadow-orange-500/50 transition-all">
                    Go to Login
                </Link>
            </div>
        );
    }

    return (
        <>
            <div className="text-center mb-8">
                <h2 className="text-3xl font-extrabold text-[#5e2818] tracking-tight drop-shadow-sm mb-2">
                    Reset Password
                </h2>
                <p className="text-gray-600 text-sm sm:text-base font-bold drop-shadow-sm">
                    Enter your new password below.
                </p>
            </div>

            {status === "error" && (
                <div className="bg-red-500/20 backdrop-blur-md text-red-700 p-3 rounded-xl text-sm font-bold mb-5 text-center border border-red-500/30">
                    {message}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                {/* New Password Field */}
                <div>
                    <label className="block text-sm font-bold text-gray-900 mb-1.5 ml-1 drop-shadow-sm">
                        New Password
                    </label>
                    <div className="relative flex items-center">
                        <div className="absolute left-1.5 w-10 h-10 bg-white/50 rounded-lg flex items-center justify-center shadow-sm">
                            <IconLock className="h-5 w-5 text-orange-600" stroke={2} />
                        </div>
                        <input
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            className="w-full pl-14 pr-12 py-3 sm:py-3.5 bg-white/40 border border-white/50 rounded-xl outline-none focus:bg-white/60 focus:ring-2 focus:ring-orange-400 transition-all placeholder-gray-400 text-base text-gray-900 font-normal shadow-inner [&:-webkit-autofill]:shadow-[inset_0_0_0px_1000px_#fff] [&:-webkit-autofill]:[-webkit-text-fill-color:#111827]"
                            required
                            disabled={status === "loading"}
                        />
                        <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-700 hover:text-orange-600 transition-colors">
                            {showPassword ? <IconEyeOff className="h-5 w-5" stroke={2} /> : <IconEye className="h-5 w-5" stroke={2} />}
                        </button>
                    </div>
                </div>

                {/* Confirm Password Field */}
                <div>
                    <label className="block text-sm font-bold text-gray-900 mb-1.5 ml-1 drop-shadow-sm">
                        Confirm New Password
                    </label>
                    <div className="relative flex items-center">
                        <div className="absolute left-1.5 w-10 h-10 bg-white/50 rounded-lg flex items-center justify-center shadow-sm">
                            <IconLock className="h-5 w-5 text-orange-600" stroke={2} />
                        </div>
                        <input
                            type={showPassword ? "text" : "password"}
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="••••••••"
                            className="w-full pl-14 pr-12 py-3 sm:py-3.5 bg-white/40 border border-white/50 rounded-xl outline-none focus:bg-white/60 focus:ring-2 focus:ring-orange-400 transition-all placeholder-gray-400 text-base text-gray-900 font-normal shadow-inner [&:-webkit-autofill]:shadow-[inset_0_0_0px_1000px_#fff] [&:-webkit-autofill]:[-webkit-text-fill-color:#111827]"
                            required
                            disabled={status === "loading"}
                        />
                    </div>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={status === "loading"}
                    className="w-full py-3.5 mt-2 flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white text-lg font-bold rounded-xl shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 hover:-translate-y-0.5 transition-all duration-300 tracking-wide cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:-translate-y-0"
                >
                    {status === "loading" ? "Resetting..." : "Reset Password"}
                </button>
            </form>
        </>
    );
}

export default function ResetPasswordPage() {
    return (
        <div className="min-h-[100dvh] w-full bg-[url('/login-bg-mobile.png')] lg:bg-[url('/login-bg.png')] bg-cover bg-center bg-no-repeat flex items-center justify-center lg:justify-end px-4 sm:px-6 lg:pr-[18%] xl:pr-[22%] relative py-6 lg:py-0">
            {/* Overlay to highlight the card */}
            <div className="absolute inset-0 bg-black/10 sm:bg-black/5"></div>

            {/* Main container */}
            <div className="w-full max-w-md flex flex-col items-center relative z-10">
                {/* ─── Mobile View Header ─── */}
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
                </div>

                {/* ─── Reset Password Card ─── */}
                <div className="bg-white/30 backdrop-blur-xl w-full rounded-3xl sm:rounded-[2.5rem] shadow-[0_8px_32px_0_rgba(0,0,0,0.1)] p-6 sm:p-8 border border-white/50">
                    <Suspense fallback={<div className="text-center font-bold text-gray-800">Loading...</div>}>
                        <ResetPasswordForm />
                    </Suspense>
                </div>
            </div>
        </div>
    );
}
