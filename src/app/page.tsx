"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  IconLogin, 
  IconUserPlus, 
  IconChecklist, 
  IconCalculator, 
  IconChartBar, 
  IconShieldCheck,
  IconMenu2,
  IconX
} from "@tabler/icons-react";

export default function HomePage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // মেনু খোলা অবস্থায় যেন পেজ স্ক্রল না হয়, তার জন্য এই Effect-টি যুক্ত করা হয়েছে
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isMobileMenuOpen]);

  return (
    <div className="min-h-screen bg-[#FEF8F4] text-gray-800">
      
      {/* ─── Navbar ─── */}
      <header className="sticky top-0 z-50 bg-[#FEF8F4]/90 backdrop-blur-md border-b border-orange-100/60 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 sm:h-24 flex items-center justify-between relative z-50">
          
          {/* Logo Section */}
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/logo.png"
              alt="আমাদের মেস লোগো"
              width={220}
              height={80}
              priority
              className="h-12 sm:h-16 lg:h-20 w-auto object-contain cursor-pointer transition-transform hover:scale-105"
            />
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-8 text-gray-700 font-bold">
            <a href="#features" className="hover:text-orange-600 transition-colors">ফিচার</a>
            <a href="#about" className="hover:text-orange-600 transition-colors">আমাদের সম্পর্কে</a>
            <Link href="/login" className="hover:text-orange-600 transition-colors flex items-center gap-1">
              লগইন
            </Link>
          </nav>

          {/* Desktop Action Button */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/register"
              className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-5 py-2.5 rounded-xl font-bold shadow-md shadow-orange-500/20 hover:shadow-orange-500/40 hover:-translate-y-0.5 transition-all cursor-pointer text-sm sm:text-base"
            >
              নতুন মেস খুলুন
            </Link>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
              className="text-orange-600 p-2 focus:outline-none bg-orange-100/50 hover:bg-orange-100 rounded-lg transition-colors"
            >
              {isMobileMenuOpen ? <IconX className="w-7 h-7" /> : <IconMenu2 className="w-7 h-7" />}
            </button>
          </div>
        </div>

        {/* ─── Mobile Dropdown & Overlay ─── */}
        {isMobileMenuOpen && (
          <>
            {/* Dark Blur Overlay (পেছনের অংশ কালো ও ব্লার করার জন্য) */}
            <div 
              className="md:hidden fixed inset-0 top-[80px] sm:top-[96px] bg-black/40 backdrop-blur-sm z-40"
              onClick={() => setIsMobileMenuOpen(false)}
            ></div>
            
            {/* White Dropdown Menu Panel (বাটনগুলো মুছে দেওয়া হয়েছে) */}
            <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-2xl rounded-b-[2rem] flex flex-col z-50 overflow-hidden border-b border-orange-50">
              <div className="px-6 py-6 flex flex-col gap-4">
                
                <a href="#features" onClick={() => setIsMobileMenuOpen(false)} className="text-gray-800 font-bold text-lg hover:text-orange-600 border-b border-gray-100 pb-3">
                  ফিচার
                </a>
                
                <a href="#about" onClick={() => setIsMobileMenuOpen(false)} className="text-gray-800 font-bold text-lg hover:text-orange-600">
                  আমাদের সম্পর্কে
                </a>

              </div>
            </div>
          </>
        )}
      </header>

      {/* ─── Hero Section ─── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16 lg:pt-20 lg:pb-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-6 space-y-5 lg:space-y-6 text-center lg:text-left">
          
            <h1 className="text-[2rem] sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight lg:leading-[1.15]">
              মেসের হিসাব-নিকাশ <br className="hidden sm:block" />
              এখন <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-600">আপনার হাতের মুঠোয়!</span>
            </h1>

            <p className="text-base sm:text-lg text-gray-600 max-w-xl mx-auto lg:mx-0 leading-relaxed px-2 sm:px-0">
              খাতা-কলমের দিন শেষ! <strong className="text-gray-800">আমাদের মেস</strong>-এর মাধ্যমে একদম নির্ভুল ও সহজভাবে ট্র্যাক করুন মিল কাউন্ট, বাজার খরচ এবং মেম্বারদের ডিপোজিট।
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-4">
              <Link
                href="/login"
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-3.5 sm:py-4 rounded-xl font-bold shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 hover:-translate-y-0.5 transition-all cursor-pointer text-lg"
              >
                <IconLogin className="w-5 h-5 sm:w-6 sm:h-6" stroke={2.5} />
                লগইন করুন
              </Link>

              <Link
                href="/register"
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white text-orange-600 border-2 border-orange-500/80 px-8 py-3.5 sm:py-4 rounded-xl font-bold hover:bg-orange-50 transition-all cursor-pointer text-lg"
              >
                <IconUserPlus className="w-5 h-5 sm:w-6 sm:h-6" stroke={2.5} />
                নতুন মেস খুলুন
              </Link>
            </div>
          </div>

          {/* Right Showcase Column */}
          <div className="lg:col-span-6 px-4 sm:px-0 mt-6 lg:mt-0">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              <div className="absolute -inset-1 bg-gradient-to-r from-orange-400 to-amber-300 rounded-3xl blur-2xl opacity-20"></div>

              <div className="relative bg-gradient-to-br from-orange-50/80 to-amber-50/70 border-2 border-dashed border-orange-300 rounded-3xl p-6 sm:p-14 min-h-[280px] sm:min-h-[420px] flex flex-col items-center justify-center text-center shadow-inner">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-orange-100 flex items-center justify-center text-orange-600 mb-4 shadow-sm">
                  <IconChartBar className="w-7 h-7 sm:w-8 sm:h-8" stroke={1.8} />
                </div>
                <h3 className="text-orange-700 font-bold text-lg sm:text-xl mb-2">[ ড্যাশবোর্ডের ছবি ]</h3>
                <p className="text-gray-500 text-xs sm:text-sm max-w-xs leading-relaxed">
                  পরবর্তীতে আপনার আসল ড্যাশবোর্ডের একটি স্ক্রিনশট এখানে বসিয়ে দিতে পারেন।
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ─── Features Section ─── */}
      <section id="features" className="bg-white py-16 sm:py-20 border-t border-orange-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          
          <h2 className="text-2xl sm:text-4xl font-extrabold text-gray-900 mb-3 sm:mb-4">
            আমাদের সেরা বৈশিষ্ট্যসমূহ
          </h2>
          <p className="text-gray-500 text-sm sm:text-lg mb-10 sm:mb-14 max-w-2xl mx-auto px-4">
            মেস লাইফ সহজ ও ঝামেলামুক্ত করার জন্য যা কিছু প্রয়োজন, সব এক প্ল্যাটফর্মে
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            <div className="bg-[#FEF8F4] p-6 sm:p-8 rounded-2xl border border-orange-100 hover:shadow-lg transition-all text-left group">
              <div className="w-12 h-12 rounded-xl bg-orange-500 text-white flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <IconChecklist className="w-6 h-6" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">প্রতিদিনের মিল কাউন্ট</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                সকাল, দুপুর এবং রাতের মিল এন্ট্রি করুন এক ক্লিকে। রিয়েল-টাইমে আপডেট থাকবে মেম্বারদের মিল শিট।
              </p>
            </div>

            <div className="bg-[#FEF8F4] p-6 sm:p-8 rounded-2xl border border-orange-100 hover:shadow-lg transition-all text-left group">
              <div className="w-12 h-12 rounded-xl bg-orange-500 text-white flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <IconCalculator className="w-6 h-6" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">স্বয়ংক্রিয় বাজার খরচ হিসাব</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                কে কত টাকা বাজার করলো এবং কার কত ডিপোজিট জমা আছে, সিস্টেম নিজ থেকেই স্বয়ংক্রিয় মিল রেট তৈরি করবে।
              </p>
            </div>

            <div className="bg-[#FEF8F4] p-6 sm:p-8 rounded-2xl border border-orange-100 hover:shadow-lg transition-all text-left group">
              <div className="w-12 h-12 rounded-xl bg-orange-500 text-white flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <IconShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">স্বচ্ছ অডিট ও হিসেব</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                ম্যানেজার ও মেম্বারদের আলাদা ড্যাশবোর্ড থাকায় প্রতিটি খরচের স্বচ্ছতা থাকে ১০০% নিশ্চিত।
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}