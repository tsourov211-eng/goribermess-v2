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
    IconTarget,
    IconBulb,
    IconUsers,
    IconCode,
    IconHeartHandshake,
    IconRocket
} from "@tabler/icons-react";

export default function AboutPage() {
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

                    <div className="hidden md:flex items-center gap-8">
                        <Link href="/" className="text-gray-700 hover:text-[#FF6B00] font-bold text-base transition-colors pb-1">Home</Link>
                        <Link href="/about" className="text-[#FF6B00] font-bold text-base border-b-2 border-[#FF6B00] pb-1">About Us</Link>
                        <Link href="/#features" className="text-gray-700 hover:text-[#FF6B00] font-bold text-base transition-colors pb-1">Features</Link>
                        <Link href="/#contact" className="text-gray-700 hover:text-[#FF6B00] font-bold text-base transition-colors pb-1">Contact</Link>
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
                        <Link href="/about" onClick={() => setIsMobileMenuOpen(false)} className="text-[#FF6B00] font-extrabold text-xl">About Us</Link>
                        <Link href="/#features" onClick={() => setIsMobileMenuOpen(false)} className="text-gray-800 font-bold text-xl">Features</Link>
                        <Link href="/#contact" onClick={() => setIsMobileMenuOpen(false)} className="text-gray-800 font-bold text-xl">Contact</Link>
                    </div>
                </div>
            )}

            {/* ─── Main Content ─── */}
            <main className="flex-1 pt-28 pb-20">
                
                {/* Hero Section */}
                <section className="max-w-7xl mx-auto px-6 mb-20 lg:mb-28 text-center relative">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-3xl bg-orange-50 rounded-full blur-3xl opacity-50 -z-10"></div>
                    <h1 className="text-4xl lg:text-6xl font-extrabold text-[#0B132B] mb-6 tracking-tight">
                        About <span className="text-[#FF6B00]">OurMess</span>
                    </h1>
                    <p className="text-lg md:text-xl text-gray-600 font-medium max-w-2xl mx-auto leading-relaxed">
                        We are on a mission to simplify the everyday lives of bachelors, students, and hostel residents by making mess management effortless, transparent, and digital.
                    </p>
                </section>

                {/* Our Story & Values */}
                <section className="max-w-7xl mx-auto px-6 mb-24 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                    <div className="relative">
                        <div className="absolute inset-0 bg-[#0B132B] rounded-3xl transform rotate-3 scale-105 -z-10 opacity-10"></div>
                        <div className="bg-[#0B132B] rounded-3xl p-8 sm:p-10 shadow-2xl relative overflow-hidden text-white">
                            <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 bg-orange-500 rounded-full blur-2xl opacity-20"></div>
                            <IconRocket size={48} className="text-[#FF6B00] mb-6" stroke={1.5} />
                            <h2 className="text-3xl font-extrabold mb-4">Our Story</h2>
                            <p className="text-gray-300 text-sm sm:text-base leading-relaxed font-medium mb-6">
                                Living in a mess comes with its own set of challenges — calculating daily meal rates, tracking who went to the bazaar, maintaining deposit balances, and splitting expenses at the end of the month. It often leads to confusion and wasted time.
                            </p>
                            <p className="text-gray-300 text-sm sm:text-base leading-relaxed font-medium">
                                <strong>OurMess</strong> was born out of a desire to solve this exact problem. By bringing everything onto a simple, user-friendly digital platform, we want you to focus on your studies, work, and enjoying good food with great company, rather than crunching numbers on a calculator.
                            </p>
                        </div>
                    </div>

                    <div className="space-y-8">
                        <div className="flex gap-5 items-start">
                            <div className="w-14 h-14 rounded-2xl bg-orange-50 text-[#FF6B00] flex items-center justify-center shrink-0">
                                <IconTarget size={28} stroke={2} />
                            </div>
                            <div>
                                <h3 className="text-xl font-extrabold text-[#0B132B] mb-2">Our Mission</h3>
                                <p className="text-gray-500 font-medium text-sm leading-relaxed">To provide a robust, transparent, and hassle-free management tool that empowers mess communities to handle their finances and meals with zero errors.</p>
                            </div>
                        </div>
                        <div className="flex gap-5 items-start">
                            <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                                <IconBulb size={28} stroke={2} />
                            </div>
                            <div>
                                <h3 className="text-xl font-extrabold text-[#0B132B] mb-2">Our Vision</h3>
                                <p className="text-gray-500 font-medium text-sm leading-relaxed">To become the go-to digital platform for every bachelor point, hostel, and shared accommodation across the country, ensuring automated and smart living.</p>
                            </div>
                        </div>
                        <div className="flex gap-5 items-start">
                            <div className="w-14 h-14 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center shrink-0">
                                <IconHeartHandshake size={28} stroke={2} />
                            </div>
                            <div>
                                <h3 className="text-xl font-extrabold text-[#0B132B] mb-2">Community First</h3>
                                <p className="text-gray-500 font-medium text-sm leading-relaxed">Built for the community, by the community. We prioritize data security, ease of use, and continuous improvement based on user feedback.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Meet the Developer Section */}
                <section className="bg-gray-50 py-20 px-6 border-y border-gray-100">
                    <div className="max-w-4xl mx-auto text-center">
                        <div className="w-20 h-20 mx-auto bg-white border border-gray-200 rounded-full flex items-center justify-center shadow-sm mb-6">
                            <IconCode size={36} className="text-[#FF6B00]" stroke={1.5} />
                        </div>
                        <h2 className="text-3xl font-extrabold text-[#0B132B] mb-4">Behind the Code</h2>
                        <p className="text-gray-600 font-medium mb-8 leading-relaxed">
                            This platform is thoughtfully designed and engineered with modern web technologies like Next.js, Tailwind CSS, and Prisma. It is a stepping stone towards bringing digital transformation to local, everyday problems.
                        </p>
                        <div className="inline-flex items-center gap-3 bg-white px-6 py-3 rounded-full border border-gray-200 shadow-sm">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                            <span className="text-sm font-bold text-gray-700">Developed with passion by <span className="text-[#FF6B00]">@tanvir_ahammed0</span></span>
                        </div>
                    </div>
                </section>
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
                                <li><Link href="/#contact" className="hover:text-[#FF6B00] transition-colors">Contact</Link></li>
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