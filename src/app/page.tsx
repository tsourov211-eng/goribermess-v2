"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { 
    IconCheck, 
    IconLogin, 
    IconUserPlus, 
    IconUsers, 
    IconToolsKitchen2, 
    IconReceipt, 
    IconChartBar,
    IconBell,
    IconWallet,
    IconMenu2,
    IconX
} from "@tabler/icons-react";

export default function LandingPage() {
    // Mobile Menu State
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <div className="min-h-screen font-sans overflow-hidden bg-white">
            
            {/* ─── Sticky & Transparent Navbar (Glassmorphism) ─── */}
            <nav className="fixed top-0 left-0 w-full z-50 bg-white/60 backdrop-blur-md border-b border-white/30 shadow-sm transition-all duration-300">
                <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
                    
                    {/* Logo Section */}
                    <Link href="/" className="flex items-center transition-transform hover:scale-105">
                        <Image 
                            src="/logo.png" 
                            alt="Amader Mess Logo" 
                            width={120} 
                            height={120} 
                            className="h-14 w-auto object-contain drop-shadow-sm" 
                            priority
                        />
                    </Link>

                    {/* Desktop Links */}
                    <div className="hidden md:flex items-center gap-8">
                        <Link href="/" className="text-[#FF6B00] font-bold text-base border-b-2 border-[#FF6B00] pb-1">Home</Link>
                        <Link href="/about" className="text-gray-700 hover:text-[#FF6B00] font-bold text-base transition-colors pb-1">About Us</Link>
                        <Link href="/features" className="text-gray-700 hover:text-[#FF6B00] font-bold text-base transition-colors pb-1">Features</Link>
                        <Link href="/contact" className="text-gray-700 hover:text-[#FF6B00] font-bold text-base transition-colors pb-1">Contact</Link>
                    </div>

                    {/* Desktop Auth Buttons */}
                    <div className="hidden sm:flex items-center gap-4">
                        <Link href="/login" className="flex items-center gap-2 bg-[#FF6B00] hover:bg-orange-600 text-white px-6 py-2.5 rounded-full font-bold text-sm shadow-md shadow-orange-500/20 transition-all">
                            <IconLogin size={18} stroke={2.5} /> Login
                        </Link>
                        <Link href="/register" className="flex items-center gap-2 bg-white text-[#FF6B00] border border-[#FF6B00] hover:bg-orange-50 px-6 py-2.5 rounded-full font-bold text-sm transition-all">
                            <IconUserPlus size={18} stroke={2.5} /> Create Account
                        </Link>
                    </div>

                    {/* Mobile Menu Toggle Button */}
                    <button 
                        onClick={() => setIsMobileMenuOpen(true)}
                        className="sm:hidden p-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        <IconMenu2 size={28} />
                    </button>
                </div>
            </nav>

            {/* ─── Mobile Menu Overlay ─── */}
            {isMobileMenuOpen && (
                <div className="fixed inset-0 z-[100] bg-white flex flex-col sm:hidden animate-in fade-in zoom-in-95 duration-200">
                    <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                        <Image 
                            src="/logo.png" 
                            alt="Amader Mess Logo" 
                            width={100} 
                            height={100} 
                            className="h-10 w-auto object-contain" 
                        />
                        <button 
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="p-2 text-gray-500 hover:bg-red-50 hover:text-red-500 rounded-lg transition-colors"
                        >
                            <IconX size={28} />
                        </button>
                    </div>
                    
                    <div className="flex flex-col flex-1 px-6 pt-8 gap-6">
                        <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="text-[#FF6B00] font-extrabold text-xl">Home</Link>
                        <Link href="/about" onClick={() => setIsMobileMenuOpen(false)} className="text-gray-800 font-bold text-xl">About Us</Link>
                        <Link href="/features" onClick={() => setIsMobileMenuOpen(false)} className="text-gray-800 font-bold text-xl">Features</Link>
                        <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)} className="text-gray-800 font-bold text-xl">Contact</Link>
                        
                        <div className="mt-auto pb-10 flex flex-col gap-4">
                            <Link href="/login" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center justify-center gap-2 w-full bg-[#FF6B00] hover:bg-orange-600 text-white px-6 py-4 rounded-xl font-bold text-base shadow-md">
                                <IconLogin size={22} stroke={2.5} /> Login
                            </Link>
                            <Link href="/register" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center justify-center gap-2 w-full bg-white text-[#FF6B00] border-2 border-[#FF6B00] hover:bg-orange-50 px-6 py-4 rounded-xl font-bold text-base">
                                <IconUserPlus size={22} stroke={2.5} /> Create Account
                            </Link>
                        </div>
                    </div>
                </div>
            )}

            {/* ─── Top Section (Hero) with Custom Background Image ─── */}
            <div className="bg-[url('/landing_page_bg.png')] bg-cover bg-top bg-no-repeat w-full">
                
                {/* ─── Hero Section ─── */}
                <section className="max-w-7xl mx-auto px-6 pt-28 pb-24 lg:pt-36 lg:pb-32 flex flex-col lg:flex-row items-center relative z-10">


                    {/* Left Content */}
                    <div className="lg:w-1/2 text-center lg:text-left z-10">
                        <h1 className="text-5xl lg:text-[4.5rem] font-extrabold text-[#0B132B] leading-[1.1] tracking-tight mb-6">
                            Manage Your <br className="hidden lg:block" /> Mess, <span className="text-[#FF6B00]">Smarter <br className="hidden lg:block" /> and Simpler</span>
                        </h1>
                        <p className="text-gray-600 text-lg md:text-xl font-medium mb-10 max-w-lg mx-auto lg:mx-0">
                            Our Mess helps you manage members, track expenses, handle menus, and keep everything organized — all in one place.
                        </p>
                        
                        <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-10">
                            <Link href="/login" className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#FF6B00] hover:bg-orange-600 text-white px-8 py-3.5 rounded-xl font-bold text-base shadow-lg shadow-orange-500/30 transition-all">
                                <IconLogin size={20} stroke={2.5} /> Login Now
                            </Link>
                            <Link href="/register" className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white text-[#FF6B00] border-2 border-orange-200 hover:border-[#FF6B00] hover:bg-orange-50 px-8 py-3.5 rounded-xl font-bold text-base transition-all">
                                <IconUserPlus size={20} stroke={2.5} /> Create Account
                            </Link>
                        </div>

                        <div className="flex flex-wrap items-center justify-center lg:justify-start gap-x-6 gap-y-3">
                            <div className="flex items-center gap-2 text-gray-700 font-bold text-sm">
                                <div className="bg-orange-100 text-orange-600 rounded-full p-0.5"><IconCheck size={16} stroke={3}/></div>
                                Easy to Use
                            </div>
                            <div className="flex items-center gap-2 text-gray-700 font-bold text-sm">
                                <div className="bg-orange-100 text-orange-600 rounded-full p-0.5"><IconCheck size={16} stroke={3}/></div>
                                Secure & Reliable
                            </div>
                            <div className="flex items-center gap-2 text-gray-700 font-bold text-sm">
                                <div className="bg-orange-100 text-orange-600 rounded-full p-0.5"><IconCheck size={16} stroke={3}/></div>
                                Built for Mess Communities
                            </div>
                        </div>
                    </div>

                    {/* Right Content (CSS Dashboard Mockup Floating Over Background) */}
                    <div className="lg:w-1/2 mt-16 lg:mt-0 relative w-full h-[400px] md:h-[500px]">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[95%] sm:w-[500px] bg-white rounded-3xl shadow-2xl shadow-gray-200/80 border border-gray-100 p-6 flex gap-6 transform lg:rotate-2 hover:rotate-0 transition-all duration-500 backdrop-blur-sm bg-white/95">
                            
                            {/* Sidebar Mock */}
                            <div className="hidden sm:flex w-[120px] bg-gray-50 rounded-2xl p-4 flex-col gap-4 border border-gray-100">
                                <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center mb-4">
                                    <IconToolsKitchen2 className="text-orange-500 w-5 h-5" />
                                </div>
                                <div className="h-8 rounded-lg bg-white border border-orange-100 flex items-center px-2 text-[10px] font-bold text-orange-600 shadow-sm"><IconChartBar size={14} className="mr-1"/> Dashboard</div>
                                <div className="h-8 rounded-lg flex items-center px-2 text-[10px] font-bold text-gray-400"><IconUsers size={14} className="mr-1"/> Members</div>
                                <div className="h-8 rounded-lg flex items-center px-2 text-[10px] font-bold text-gray-400"><IconToolsKitchen2 size={14} className="mr-1"/> Menu</div>
                                <div className="h-8 rounded-lg flex items-center px-2 text-[10px] font-bold text-gray-400"><IconReceipt size={14} className="mr-1"/> Expenses</div>
                            </div>

                            {/* Main Content Mock */}
                            <div className="flex-1">
                                <div className="flex justify-between items-start mb-6">
                                    <div>
                                        <h3 className="font-extrabold text-xl text-[#0B132B]">Welcome Back!</h3>
                                        <p className="text-xs text-gray-500 font-medium">Here's what's happening in your mess today.</p>
                                    </div>
                                    <div className="relative">
                                        <IconBell className="text-gray-400" size={24} />
                                        <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 border-2 border-white rounded-full"></span>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4">
                                    <div className="bg-white border border-gray-100 rounded-2xl p-3 shadow-sm">
                                        <div className="w-8 h-8 bg-orange-50 text-orange-500 rounded-lg flex items-center justify-center mb-2"><IconUsers size={16}/></div>
                                        <p className="text-[10px] text-gray-500 font-bold">Total Members</p>
                                        <p className="font-extrabold text-lg text-[#0B132B]">12</p>
                                    </div>
                                    <div className="bg-white border border-gray-100 rounded-2xl p-3 shadow-sm">
                                        <div className="w-8 h-8 bg-green-50 text-green-500 rounded-lg flex items-center justify-center mb-2"><IconReceipt size={16}/></div>
                                        <p className="text-[10px] text-gray-500 font-bold">Food Cost</p>
                                        <p className="font-extrabold text-lg text-[#0B132B]">৳ 12,500</p>
                                    </div>
                                    <div className="bg-white border border-gray-100 rounded-2xl p-3 shadow-sm hidden md:block">
                                        <div className="w-8 h-8 bg-blue-50 text-blue-500 rounded-lg flex items-center justify-center mb-2"><IconWallet size={16}/></div>
                                        <p className="text-[10px] text-gray-500 font-bold">Current Balance</p>
                                        <p className="font-extrabold text-lg text-[#0B132B]">৳ 3,200</p>
                                    </div>
                                </div>

                                <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm">
                                    <div className="flex justify-between items-center mb-3">
                                        <p className="text-xs font-bold text-gray-800 flex items-center gap-1"><span className="text-orange-500">●</span> Today's Menu</p>
                                        <p className="text-[10px] text-gray-400 font-bold">Sep 12, 2026</p>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        <span className="px-2 py-1 bg-gray-50 text-gray-600 rounded text-[10px] font-bold">Rice</span>
                                        <span className="px-2 py-1 bg-gray-50 text-gray-600 rounded text-[10px] font-bold">Dal</span>
                                        <span className="px-2 py-1 bg-gray-50 text-gray-600 rounded text-[10px] font-bold">Chicken Curry</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

            {/* ─── Features Section ─── */}
            <section id="features" className="bg-white py-20 px-6 relative z-10">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl lg:text-4xl font-extrabold text-[#0B132B] mb-4">Everything You Need for Better Mess Management</h2>
                        <p className="text-gray-500 text-base font-medium max-w-2xl mx-auto">Simple tools to manage your mess efficiently, so you can focus on what matters — good food and great company.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
                        <div className="flex flex-col items-center lg:items-start text-center lg:text-left group">
                            <div className="w-16 h-16 bg-orange-50 text-orange-500 rounded-2xl flex items-center justify-center mb-5 group-hover:-translate-y-2 transition-transform duration-300">
                                <IconUsers size={32} stroke={2} />
                            </div>
                            <h3 className="text-lg font-extrabold text-[#0B132B] mb-2">Manage Members</h3>
                            <p className="text-sm font-medium text-gray-500">Add, remove and manage mess members easily with roles and access.</p>
                        </div>
                        <div className="flex flex-col items-center lg:items-start text-center lg:text-left group">
                            <div className="w-16 h-16 bg-orange-50 text-orange-500 rounded-2xl flex items-center justify-center mb-5 group-hover:-translate-y-2 transition-transform duration-300">
                                <IconToolsKitchen2 size={32} stroke={2} />
                            </div>
                            <h3 className="text-lg font-extrabold text-[#0B132B] mb-2">Track Expenses</h3>
                            <p className="text-sm font-medium text-gray-500">Keep track of daily food costs, bazaar lists and other mess expenses.</p>
                        </div>
                        <div className="flex flex-col items-center lg:items-start text-center lg:text-left group">
                            <div className="w-16 h-16 bg-orange-50 text-orange-500 rounded-2xl flex items-center justify-center mb-5 group-hover:-translate-y-2 transition-transform duration-300">
                                <IconReceipt size={32} stroke={2} />
                            </div>
                            <h3 className="text-lg font-extrabold text-[#0B132B] mb-2">Plan Menus</h3>
                            <p className="text-sm font-medium text-gray-500">Set and manage daily or weekly menus so everyone knows what's cooking.</p>
                        </div>
                        <div className="flex flex-col items-center lg:items-start text-center lg:text-left group">
                            <div className="w-16 h-16 bg-orange-50 text-orange-500 rounded-2xl flex items-center justify-center mb-5 group-hover:-translate-y-2 transition-transform duration-300">
                                <IconChartBar size={32} stroke={2} />
                            </div>
                            <h3 className="text-lg font-extrabold text-[#0B132B] mb-2">View Reports</h3>
                            <p className="text-sm font-medium text-gray-500">Get insights with detailed reports, summaries and automatic meal rate calculations.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ─── Footer Section ─── */}
            <footer className="bg-[#0B132B] pt-16 pb-8 px-6 border-t-4 border-[#FF6B00]">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
                        
                        {/* Brand Column */}
                        <div className="col-span-1 md:col-span-2">
                            <Link href="/" className="flex items-center gap-2 mb-4">
                                <div className="w-10 h-10 rounded-full border-2 border-orange-500 flex items-center justify-center bg-white shadow-sm">
                                     <Image 
                            src="/logo.png" 
                            alt="Amader Mess Logo" 
                            width={100} 
                            height={100} 
                            className="h-10 w-auto object-contain" 
                        />
                                </div>
                                <span className="text-xl font-extrabold text-white">Our<span className="text-[#FF6B00]">Mess</span></span>
                            </Link>
                            <p className="text-gray-400 text-sm font-medium max-w-sm mb-6 leading-relaxed">
                                Simplifying mess management for students and bachelors. Track meals, manage daily expenses, and keep everyone connected.
                            </p>
                        </div>

                        {/* Quick Links */}
                        <div>
                            <h4 className="text-white font-extrabold mb-5 uppercase tracking-wider text-sm">Quick Links</h4>
                            <ul className="space-y-3 text-sm font-medium text-gray-400">
                                <li><Link href="/" className="hover:text-[#FF6B00] transition-colors">Home</Link></li>
                                <li><Link href="/about" className="hover:text-[#FF6B00] transition-colors">About Us</Link></li>
                                <li><Link href="#features" className="hover:text-[#FF6B00] transition-colors">Features</Link></li>
                                <li><Link href="/contact" className="hover:text-[#FF6B00] transition-colors">Contact</Link></li>
                            </ul>
                        </div>

                        {/* Legal */}
                        <div>
                            <h4 className="text-white font-extrabold mb-5 uppercase tracking-wider text-sm">Legal</h4>
                            <ul className="space-y-3 text-sm font-medium text-gray-400">
                                <li><Link href="#" className="hover:text-[#FF6B00] transition-colors">Privacy Policy</Link></li>
                                <li><Link href="#" className="hover:text-[#FF6B00] transition-colors">Terms of Service</Link></li>
                                <li><Link href="#" className="hover:text-[#FF6B00] transition-colors">FAQ</Link></li>
                            </ul>
                        </div>
                    </div>

                    {/* Bottom Copyright */}
                    <div className="border-t border-gray-800/80 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
                        <p className="text-gray-500 text-sm font-medium">
                            © {new Date().getFullYear()} OurMess. All rights reserved.
                        </p>
                        <p className="text-gray-500 text-sm font-medium flex items-center gap-1">
                            Made with <span className="text-red-500 px-1">♥</span> by <span className="text-[#FF6B00] font-bold">@tanvir_ahammed0</span>
                        </p>
                    </div>
                </div>
            </footer>

        </div>
    );
}