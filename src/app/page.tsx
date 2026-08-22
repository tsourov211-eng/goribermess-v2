// app/page.tsx

export default function Home() {
  return (
    <div className="min-h-screen bg-amber-50 text-gray-900 font-sans">
      {/* মূল ব্যাকগ্রাউন্ড - ব্যাগের হালকা ক্রিম কালার (amber-50) */}

      {/* ১. নেভিগেশন বার (Navbar) */}
      <nav className="bg-[#FDFBF7] shadow-sm sticky top-0 z-50 border-b border-orange-100">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="text-3xl font-extrabold text-orange-600 tracking-tight">
            গড়িবের মেস
          </div>
          <div className="hidden md:flex items-center gap-6 font-medium text-gray-700">
            <a href="#features" className="hover:text-orange-600 transition">ফিচার</a>
            <a href="#" className="hover:text-orange-600 transition">আমাদের সম্পর্কে</a>
            <a href="#" className="hover:text-orange-600 transition">লগইন</a>
            <button className="bg-orange-600 text-white px-5 py-2.5 rounded-lg hover:bg-orange-700 shadow-md transition">
              নতুন মেস খুলুন
            </button>
          </div>
        </div>
      </nav>

      {/* ২. হিরো সেকশন (Hero Section) */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-8 text-gray-800">
              মেসের হিসাব-নিকাশ এখন <span className="text-orange-600">আপনার হাতের মুঠোয়!</span>
            </h1>
            <p className="text-xl text-gray-700 mb-12 font-medium">
              খাতা-কলমের দিন শেষ, এবার স্মার্টলি ম্যানেজ করুন আপনার মেসের মিল, বাজার আর খরচের হিসাব।
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="bg-orange-600 text-white px-10 py-4 rounded-xl font-bold text-lg hover:bg-orange-700 shadow-lg hover:shadow-orange-500/30 transition transform hover:-translate-y-1">
                লগইন করুন
              </button>
              <button className="bg-[#FDFBF7] text-orange-600 px-10 py-4 rounded-xl font-bold text-lg border-2 border-orange-600 hover:bg-orange-100 transition">
                নতুন মেস খুলুন
              </button>
            </div>
          </div>

          {/* ইলাস্ট্রেশন বক্স */}
          <div className="relative aspect-video bg-orange-100 rounded-3xl flex items-center justify-center border-4 border-dashed border-orange-300 shadow-inner">
            <p className="text-orange-600 font-bold text-lg">[ ড্যাশবোর্ডের ছবি ]</p>
          </div>
        </div>
      </section>

      {/* ৩. ফিচার সেকশন (Features Section) */}
      <section id="features" className="py-24 px-6 bg-white rounded-t-[3rem] shadow-[0_-10px_40px_rgba(0,0,0,0.02)]">
        <div className="max-w-7xl mx-auto text-center mb-16">
          <h2 className="text-4xl font-extrabold mb-4 text-gray-800">আমাদের সেরা বৈশিষ্ট্যসমূহ</h2>
          <p className="text-lg text-gray-500 font-medium">মেস লাইফ সহজ করার জন্য যা কিছু প্রয়োজন, সব এক জায়গায়</p>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          <FeatureCard
            icon="📊"
            title="অটোমেটিক হিসাব"
            description="মাস শেষে এক ক্লিকে পুরো হিসাব তৈরি। ভুল হওয়ার কোনো সুযোগ নেই।"
            accentColor="text-red-600"
            bgColor="bg-red-50"
          />
          <FeatureCard
            icon="🛒"
            title="স্মার্ট বাজার রুটিন"
            description="কে কবে বাজার করবে তার নোটিফিকেশন। ঝামেলা ছাড়াই ম্যানেজ করুন।"
            accentColor="text-green-600"
            bgColor="bg-green-50"
          />
          <FeatureCard
            icon="🍽️"
            title="রিয়েল-টাইম মিল আপডেট"
            description="নিজের ফোন থেকেই মিল অন/অফ করার সুবিধা। সবাই থাকবে আপডেটেড।"
            accentColor="text-orange-600"
            bgColor="bg-orange-50"
          />
        </div>
      </section>

      {/* ৪. ফুটার (Footer) */}
      <footer className="bg-orange-600 py-12 px-6 text-orange-50">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between">
          <div className="text-3xl font-extrabold mb-4 md:mb-0 tracking-tight">গড়িবের মেস</div>
          <p className="font-medium text-orange-100">&copy; ২০২৬ গড়িবের মেস. সর্বস্বত্ব সংরক্ষিত।</p>
          <p className="font-medium text-orange-100 hover:text-white cursor-pointer transition">যোগাযোগ: support@goribermess.com</p>
        </div>
      </footer>

    </div>
  );
}

// ফিচার কার্ডের কম্পোনেন্ট
interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
  accentColor: string;
  bgColor: string;
}

function FeatureCard({ icon, title, description, accentColor, bgColor }: FeatureCardProps) {
  return (
    <div className="bg-white p-10 rounded-3xl shadow-lg hover:shadow-xl border border-gray-100 flex flex-col items-center text-center transition duration-300 transform hover:-translate-y-2">
      <div className={`text-6xl mb-6 p-4 rounded-full ${bgColor}`}>
        {icon}
      </div>
      <h3 className={`text-2xl font-bold mb-4 ${accentColor}`}>{title}</h3>
      <p className="text-gray-600 leading-relaxed font-medium">{description}</p>
    </div>
  );
}