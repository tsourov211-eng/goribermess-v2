"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { 
    IconLogin, 
    IconUserPlus, 
    IconToolsKitchen2, 
    IconMenu2,
    IconX,
    IconMail,
    IconPhone,
    IconMapPin,
    IconSend
} from "@tabler/icons-react";

export default function ContactPage() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <div className="min-h-screen font-sans bg-white overflow-hidden flex flex-col">
            
            {/* ─── Sticky & Transparent Navbar ─── */}
            <nav className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm transition-all duration-300">
                <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
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

                    {/* Navbar Links updated to text-base */}
                    <div className="hidden md:flex items-center gap-8">
                        <Link href="/" className="text-gray-700 hover:text-[#FF6B00] font-bold text-base transition-colors pb-1">Home</Link>
                        <Link href="/about" className="text-gray-700 hover:text-[#FF6B00] font-bold text-base transition-colors pb-1">About Us</Link>
                        <Link href="/#features" className="text-gray-700 hover:text-[#FF6B00] font-bold text-base transition-colors pb-1">Features</Link>
                        <Link href="/contact" className="text-[#FF6B00] font-bold text-base border-b-2 border-[#FF6B00] pb-1">Contact</Link>
                    </div>

                    <div className="hidden sm:flex items-center gap-4">
                        <Link href="/login" className="flex items-center gap-2 bg-[#FF6B00] hover:bg-orange-600 text-white px-6 py-2.5 rounded-full font-bold text-sm shadow-md shadow-orange-500/20 transition-all">
                            <IconLogin size={18} stroke={2.5} /> Login
                        </Link>
                        <Link href="/register" className="flex items-center gap-2 bg-white text-[#FF6B00] border border-[#FF6B00] hover:bg-orange-50 px-6 py-2.5 rounded-full font-bold text-sm transition-all">
                            <IconUserPlus size={18} stroke={2.5} /> Create Account
                        </Link>
                    </div>

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
                        <Image src="/logo.png" alt="Amader Mess Logo" width={100} height={100} className="h-10 w-auto object-contain" />
                        <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 text-gray-500 hover:bg-red-50 hover:text-red-500 rounded-lg transition-colors">
                            <IconX size={28} />
                        </button>
                    </div>
                    <div className="flex flex-col flex-1 px-6 pt-8 gap-6">
                        <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="text-gray-800 font-bold text-xl">Home</Link>
                        <Link href="/about" onClick={() => setIsMobileMenuOpen(false)} className="text-gray-800 font-bold text-xl">About Us</Link>
                        <Link href="/#features" onClick={() => setIsMobileMenuOpen(false)} className="text-gray-800 font-bold text-xl">Features</Link>
                        <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)} className="text-[#FF6B00] font-extrabold text-xl">Contact</Link>
                    </div>
                </div>
            )}

            {/* ─── Main Content ─── */}
            <main className="flex-1 pt-32 pb-24 relative">
                
                {/* Background Decoration */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-50 rounded-full blur-3xl opacity-60 -z-10 translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-50 rounded-full blur-3xl opacity-60 -z-10 -translate-x-1/2 translate-y-1/2"></div>

                <div className="max-w-7xl mx-auto px-6">
                    
                    {/* Header Section */}
                    <div className="text-center mb-16 lg:mb-24">
                        <h1 className="text-4xl lg:text-5xl font-extrabold text-[#0B132B] mb-4 tracking-tight">
                            Get In <span className="text-[#FF6B00]">Touch</span>
                        </h1>
                        <p className="text-lg text-gray-600 font-medium max-w-2xl mx-auto">
                            Have a question, feedback, or need support with your mess management? Drop us a message and our team will get back to you as soon as possible.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-8 items-start">
                        
                        {/* ─── Left Side: Contact Information ─── */}
                        <div className="lg:col-span-2 space-y-6">
                            
                            {/* Contact Card 1: Email */}
                            <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex items-center gap-5">
                                <div className="w-14 h-14 rounded-2xl bg-orange-50 text-orange-600 flex items-center justify-center shrink-0">
                                    <IconMail size={28} stroke={2} />
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Email Us</p>
                                    <p className="text-base font-extrabold text-[#0B132B]">support@ourmess.com</p>
                                </div>
                            </div>

                            {/* Contact Card 2: Phone */}
                            <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex items-center gap-5">
                                <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                                    <IconPhone size={28} stroke={2} />
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Call Us</p>
                                    <p className="text-base font-extrabold text-[#0B132B]">+880 1234 567890</p>
                                </div>
                            </div>

                            {/* Contact Card 3: Location */}
                            <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex items-center gap-5">
                                <div className="w-14 h-14 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center shrink-0">
                                    <IconMapPin size={28} stroke={2} />
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Our Location</p>
                                    <p className="text-base font-extrabold text-[#0B132B]">Dhaka, Bangladesh</p>
                                </div>
                            </div>

                            {/* Friendly Note */}
                            <div className="mt-8 bg-gray-50 p-6 rounded-3xl border border-gray-100 text-center sm:text-left">
                                <p className="text-sm text-gray-600 font-medium leading-relaxed">
                                    "We are currently rolling out new features every week. Your feedback helps us build a better platform for everyone!"
                                </p>
                            </div>
                        </div>

                        {/* ─── Right Side: Contact Form (Placeholders updated to placeholder-gray-400) ─── */}
                        <div className="lg:col-span-3">
                            <div className="bg-white p-8 sm:p-10 rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100 relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-2 h-full bg-[#FF6B00]"></div>
                                
                                <h3 className="text-2xl font-extrabold text-[#0B132B] mb-8">Send a Message</h3>
                                
                                <form className="space-y-5">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                        <div>
                                            <label className="block text-xs font-bold text-gray-700 uppercase mb-2">Full Name</label>
                                            <input 
                                                type="text" 
                                                placeholder="e.g. Tanvir Ahammed" 
                                                className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:bg-white focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 text-sm font-medium transition-all placeholder-gray-400"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-gray-700 uppercase mb-2">Email Address</label>
                                            <input 
                                                type="email" 
                                                placeholder="e.g. you@example.com" 
                                                className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:bg-white focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 text-sm font-medium transition-all placeholder-gray-400"
                                                required
                                            />
                                        </div>
                                    </div>
                                    
                                    <div>
                                        <label className="block text-xs font-bold text-gray-700 uppercase mb-2">Subject</label>
                                        <input 
                                            type="text" 
                                            placeholder="How can we help you?" 
                                            className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:bg-white focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 text-sm font-medium transition-all placeholder-gray-400"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold text-gray-700 uppercase mb-2">Message</label>
                                        <textarea 
                                            rows={5}
                                            placeholder="Write your message here..." 
                                            className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:bg-white focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 text-sm font-medium transition-all resize-none placeholder-gray-400"
                                            required
                                        ></textarea>
                                    </div>

                                    <button 
                                        type="button" 
                                        className="w-full flex items-center justify-center gap-2 bg-[#0B132B] hover:bg-gray-900 text-white px-6 py-4 rounded-xl font-bold text-base transition-all mt-4"
                                    >
                                        <IconSend size={20} stroke={2} />
                                        Send Message
                                    </button>
                                </form>
                            </div>
                        </div>

                    </div>
                </div>
            </main>

            {/* ─── Footer Section ─── */}
            <footer className="bg-[#0B132B] pt-16 pb-8 px-6 border-t-4 border-[#FF6B00] mt-auto">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
                        <div className="col-span-1 md:col-span-2">
                            <Link href="/" className="flex items-center gap-2 mb-4">
                                <div className="w-10 h-10 rounded-full border-2 border-orange-500 flex items-center justify-center bg-white shadow-sm">
                                    <IconToolsKitchen2 className="text-orange-500 w-5 h-5" />
                                </div>
                                <span className="text-xl font-extrabold text-white">Our<span className="text-[#FF6B00]">Mess</span></span>
                            </Link>
                            <p className="text-gray-400 text-sm font-medium max-w-sm mb-6 leading-relaxed">
                                Simplifying mess management for students and bachelors. Track meals, manage daily expenses, and keep everyone connected.
                            </p>
                        </div>
                        <div>
                            <h4 className="text-white font-extrabold mb-5 uppercase tracking-wider text-sm">Quick Links</h4>
                            <ul className="space-y-3 text-sm font-medium text-gray-400">
                                <li><Link href="/" className="hover:text-[#FF6B00] transition-colors">Home</Link></li>
                                <li><Link href="/about" className="hover:text-[#FF6B00] transition-colors">About Us</Link></li>
                                <li><Link href="/#features" className="hover:text-[#FF6B00] transition-colors">Features</Link></li>
                                <li><Link href="/contact" className="hover:text-[#FF6B00] transition-colors">Contact</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-white font-extrabold mb-5 uppercase tracking-wider text-sm">Legal</h4>
                            <ul className="space-y-3 text-sm font-medium text-gray-400">
                                <li><Link href="#" className="hover:text-[#FF6B00] transition-colors">Privacy Policy</Link></li>
                                <li><Link href="#" className="hover:text-[#FF6B00] transition-colors">Terms of Service</Link></li>
                                <li><Link href="#" className="hover:text-[#FF6B00] transition-colors">FAQ</Link></li>
                            </ul>
                        </div>
                    </div>
                    <div className="border-t border-gray-800/80 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
                        <p className="text-gray-500 text-sm font-medium">© {new Date().getFullYear()} OurMess. All rights reserved.</p>
                        <p className="text-gray-500 text-sm font-medium flex items-center gap-1">
                            Made with <span className="text-red-500 px-1">♥</span> by <span className="text-[#FF6B00] font-bold">@tanvir_ahammed0</span>
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}