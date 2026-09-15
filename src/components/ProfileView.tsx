"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { IconToolsKitchen2, IconWallet } from "@tabler/icons-react";

export default function ProfileView() {
    // ... (আপনার প্রোফাইল পেজের আগের পুরো কোড হুবহু এখানে থাকবে)
    const { data: session, status } = useSession();
    const [profileData, setProfileData] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await fetch("/api/members/dashboard-data");
                if (res.ok) {
                    const data = await res.json();
                    setProfileData(data);
                }
            } catch (error) {
                console.error("Error fetching profile:", error);
            } finally {
                setIsLoading(false);
            }
        };

        if (status === "authenticated") {
            fetchProfile();
        }
    }, [status]);

    return (
        <div className="max-w-4xl mx-auto space-y-6 p-4">
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden p-6 sm:p-8">
                <div className="flex flex-col sm:flex-row items-center gap-6 pb-6 border-b border-gray-100">
                    {session?.user?.image ? (
                        <Image 
                            src={session.user.image} 
                            alt="Profile" 
                            width={96} 
                            height={96} 
                            className="rounded-full shadow-md border-4 border-orange-50" 
                        />
                    ) : (
                        <div className="w-24 h-24 rounded-full bg-[#1e293b] flex items-center justify-center text-white font-bold text-3xl shadow-md">
                            {session?.user?.name?.charAt(0) || "M"}
                        </div>
                    )}
                    <div className="text-center sm:text-left">
                        <h1 className="text-2xl font-extrabold text-gray-900">{session?.user?.name || "Mess User"}</h1>
                        <p className="text-sm font-medium text-gray-500 mt-1">{session?.user?.email || "No email provided"}</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6">
                    <div className="bg-gray-50/60 p-5 rounded-2xl border border-gray-100 flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-500 flex items-center justify-center font-bold">
                            <IconWallet size={24} />
                        </div>
                        <div>
                            <p className="text-xs font-bold text-gray-400 uppercase">Total Deposit</p>
                            <p className="text-xl font-extrabold text-gray-900 mt-0.5">
                                {isLoading ? "..." : `৳${profileData?.stats?.totalDeposit || 0}`}
                            </p>
                        </div>
                    </div>

                    <div className="bg-gray-50/60 p-5 rounded-2xl border border-gray-100 flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center font-bold">
                            <IconToolsKitchen2 size={24} />
                        </div>
                        <div>
                            <p className="text-xs font-bold text-gray-400 uppercase">Total Meals</p>
                            <p className="text-xl font-extrabold text-gray-900 mt-0.5">
                                {isLoading ? "..." : profileData?.stats?.totalMeals || 0}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="mt-8 pt-6 border-t border-gray-100">
                    <h3 className="text-base font-extrabold text-gray-900 mb-4">Default Meal Configuration</h3>
                    <div className="grid grid-cols-3 gap-4">
                        <div className="bg-orange-50/40 border border-orange-100 p-4 rounded-2xl text-center">
                            <p className="text-xs font-bold text-gray-500 uppercase mb-1">Breakfast</p>
                            <p className="text-lg font-extrabold text-orange-600">
                                {isLoading ? "..." : profileData?.defaultMeals?.breakfast || 0}
                            </p>
                        </div>
                        <div className="bg-orange-50/40 border border-orange-100 p-4 rounded-2xl text-center">
                            <p className="text-xs font-bold text-gray-500 uppercase mb-1">Lunch</p>
                            <p className="text-lg font-extrabold text-orange-600">
                                {isLoading ? "..." : profileData?.defaultMeals?.lunch || 0}
                            </p>
                        </div>
                        <div className="bg-orange-50/40 border border-orange-100 p-4 rounded-2xl text-center">
                            <p className="text-xs font-bold text-gray-500 uppercase mb-1">Dinner</p>
                            <p className="text-lg font-extrabold text-orange-600">
                                {isLoading ? "..." : profileData?.defaultMeals?.dinner || 0}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}