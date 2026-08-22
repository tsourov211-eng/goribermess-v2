// app/(dashboard)/member/page.tsx

export default function MemberDashboard() {
    return (
        <div className="space-y-8 font-sans">

            {/* হেডার অংশ */}
            <div>
                <h1 className="text-3xl font-extrabold text-gray-800">মেম্বার ড্যাশবোর্ড</h1>
                <p className="text-gray-500 mt-1">আপনার প্রতিদিনের মিল এবং রিকোয়েস্ট আপডেট করুন</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                {/* বাম দিকের কলাম: মিল কন্ট্রোল */}
                <div className="space-y-6">

                    {/* আজকের মিল স্ট্যাটাস */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                            <span>🍽️</span> আজকের মিল স্ট্যাটাস
                        </h2>

                        <div className="flex gap-6 mb-6">
                            <label className="flex items-center gap-2 text-lg font-medium text-gray-700 cursor-pointer">
                                <input type="checkbox" defaultChecked className="w-5 h-5 text-orange-600 rounded focus:ring-orange-500" />
                                দুপুর (Lunch)
                            </label>
                            <label className="flex items-center gap-2 text-lg font-medium text-gray-700 cursor-pointer">
                                <input type="checkbox" defaultChecked className="w-5 h-5 text-orange-600 rounded focus:ring-orange-500" />
                                রাত (Dinner)
                            </label>
                        </div>
                        <button className="w-full bg-orange-600 text-white py-3 rounded-xl font-semibold hover:bg-orange-700 transition">
                            আপডেট করুন
                        </button>
                    </div>

                    {/* গেস্ট মিল রিকোয়েস্ট */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                            <span>👥</span> গেস্ট মিল রিকোয়েস্ট
                        </h2>
                        <div className="flex gap-4">
                            <input
                                type="number"
                                placeholder="গেস্ট সংখ্যা (যেমন: ২)"
                                className="flex-1 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-orange-500"
                            />
                            <button className="bg-gray-800 text-white px-6 py-3 rounded-xl font-semibold hover:bg-gray-900 transition">
                                রিকোয়েস্ট দিন
                            </button>
                        </div>
                    </div>

                </div>

                {/* ডান দিকের কলাম: নোটিফিকেশন ও রুটিন */}
                <div className="space-y-6">

                    {/* বাজার ও ডিউটি এলার্ট */}
                    <div className="bg-orange-50 p-6 rounded-2xl border border-orange-100">
                        <h2 className="text-xl font-bold text-orange-800 mb-4 flex items-center gap-2">
                            <span>🔔</span> আপনার ডিউটি
                        </h2>
                        <ul className="space-y-3">
                            <li className="flex items-start gap-3 bg-white p-3 rounded-lg shadow-sm">
                                <span className="text-xl">🛒</span>
                                <div>
                                    <p className="font-semibold text-gray-800">বাজার করার ডেট</p>
                                    <p className="text-sm text-gray-500">আগামীকাল (২২ আগস্ট, ২০২৬)</p>
                                </div>
                            </li>
                            <li className="flex items-start gap-3 bg-white p-3 rounded-lg shadow-sm">
                                <span className="text-xl">🧹</span>
                                <div>
                                    <p className="font-semibold text-gray-800">মেস পরিষ্কারের ডেট</p>
                                    <p className="text-sm text-gray-500">২৫ আগস্ট, ২০২৬</p>
                                </div>
                            </li>
                        </ul>
                    </div>

                </div>

            </div>

        </div>
    );
}