"use client";

import { 
    IconSettings, 
    IconBuilding, 
    IconUser, 
    IconLock, 
    IconDeviceFloppy,
    IconBell
} from "@tabler/icons-react";

export default function SettingsPage() {
    return (
        <div className="max-w-5xl mx-auto space-y-6 lg:space-y-8">
            
            {/* ─── Header Section ─── */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0B132B] tracking-tight">System Settings</h1>
                    <p className="text-gray-500 text-sm mt-1.5 font-medium">Manage your mess preferences, profile, and security.</p>
                </div>

                {/* Save All Button */}
                <button className="flex items-center justify-center gap-2 bg-[#FF6B00] hover:bg-orange-600 text-white px-6 py-2.5 rounded-xl font-bold text-sm shadow-md shadow-orange-500/20 transition-all w-full sm:w-auto">
                    <IconDeviceFloppy className="w-5 h-5" stroke={2.5} />
                    Save All Changes
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
                
                {/* ─── Left Sidebar (Navigation/Info) ─── */}
                <div className="lg:col-span-1 space-y-4">
                    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-2 flex flex-col gap-1">
                        <button className="flex items-center gap-3 px-4 py-3 rounded-xl bg-orange-50 text-orange-600 font-bold text-sm transition-all w-full text-left">
                            <IconBuilding className="w-5 h-5" stroke={2} />
                            Mess Information
                        </button>
                        <button className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-gray-50 hover:text-gray-900 font-bold text-sm transition-all w-full text-left">
                            <IconUser className="w-5 h-5" stroke={2} />
                            Admin Profile
                        </button>
                        <button className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-gray-50 hover:text-gray-900 font-bold text-sm transition-all w-full text-left">
                            <IconLock className="w-5 h-5" stroke={2} />
                            Security & Password
                        </button>
                        <button className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-gray-50 hover:text-gray-900 font-bold text-sm transition-all w-full text-left">
                            <IconBell className="w-5 h-5" stroke={2} />
                            Notifications
                        </button>
                    </div>

                    <div className="bg-gradient-to-br from-[#0B132B] to-[#1c2a53] rounded-3xl border border-gray-800 p-6 shadow-md text-white text-center mt-6">
                        <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center mx-auto mb-4 backdrop-blur-sm text-orange-400">
                            <IconSettings className="w-6 h-6" stroke={2} />
                        </div>
                        <h3 className="font-extrabold text-lg mb-1">System Version</h3>
                        <p className="text-gray-400 text-sm font-medium">Goriber Mess v2.0</p>
                    </div>
                </div>

                {/* ─── Right Content Area (Forms) ─── */}
                <div className="lg:col-span-2 space-y-6">
                    
                    {/* Mess Information Card */}
                    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 sm:p-8">
                        <h2 className="text-lg font-extrabold text-gray-900 mb-6 flex items-center gap-2">
                            <IconBuilding className="w-5 h-5 text-orange-500" stroke={2} />
                            Mess Configuration
                        </h2>
                        
                        <div className="space-y-5">
                            <div>
                                <label className="block text-sm font-bold text-gray-900 mb-2 ml-1">Mess Name</label>
                                <input
                                    type="text"
                                    defaultValue="Amader Mess"
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:bg-white focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all text-sm text-gray-900 font-bold"
                                />
                            </div>
                            
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                <div>
                                    <label className="block text-sm font-bold text-gray-900 mb-2 ml-1">Currency Symbol</label>
                                    <select className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:bg-white focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all text-sm text-gray-900 font-bold appearance-none cursor-pointer">
                                        <option value="BDT">৳ (BDT)</option>
                                        <option value="USD">$ (USD)</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-900 mb-2 ml-1">Month Starts On</label>
                                    <select className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:bg-white focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all text-sm text-gray-900 font-bold appearance-none cursor-pointer">
                                        <option value="1">1st of the Month</option>
                                        <option value="15">15th of the Month</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-900 mb-2 ml-1">Mess Rules / Notice</label>
                                <textarea
                                    rows={3}
                                    placeholder="Enter any rules or notices for the dashboard..."
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:bg-white focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all text-sm text-gray-900 font-medium resize-none"
                                ></textarea>
                            </div>
                        </div>
                    </div>

                    {/* Admin Profile Card */}
                    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 sm:p-8">
                        <h2 className="text-lg font-extrabold text-gray-900 mb-6 flex items-center gap-2">
                            <IconUser className="w-5 h-5 text-blue-500" stroke={2} />
                            Admin Profile
                        </h2>
                        
                        <div className="flex flex-col sm:flex-row items-center gap-6 mb-6">
                            <div className="w-20 h-20 rounded-full bg-slate-800 flex items-center justify-center text-white font-bold text-2xl shadow-md shrink-0">
                                S
                            </div>
                            <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-xl font-bold text-sm transition-all">
                                Change Avatar
                            </button>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            <div>
                                <label className="block text-sm font-bold text-gray-900 mb-2 ml-1">Full Name</label>
                                <input
                                    type="text"
                                    defaultValue="Super Admin"
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:bg-white focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all text-sm text-gray-900 font-bold"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-900 mb-2 ml-1">Email Address</label>
                                <input
                                    type="email"
                                    defaultValue="admin@gmail.com"
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:bg-white focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all text-sm text-gray-900 font-bold"
                                />
                            </div>
                        </div>
                    </div>

                </div>
            </div>

        </div>
    );
}