// app/(dashboard)/manager/page.tsx

export default function ManagerDashboard() {
    return (
        <div className="space-y-8 font-sans">

            {/* হেডার অংশ */}
            <div>
                <h1 className="text-3xl font-extrabold text-gray-800">ম্যানেজার ড্যাশবোর্ড</h1>
                <p className="text-gray-500 mt-1">আজকের মেসের সকল আপডেট এক নজরে</p>
            </div>

            {/* ওভারভিউ কার্ডস (Overview Cards) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* কার্ড ১ */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-orange-100 flex items-center gap-4 border-l-4 border-l-orange-500">
                    <div className="text-4xl bg-orange-50 p-3 rounded-xl">🛒</div>
                    <div>
                        <p className="text-sm text-gray-500 font-medium">আজকের বাজার করবে</p>
                        <p className="text-xl font-bold text-gray-800">রফিক</p>
                    </div>
                </div>

                {/* কার্ড ২ */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-green-100 flex items-center gap-4 border-l-4 border-l-green-500">
                    <div className="text-4xl bg-green-50 p-3 rounded-xl">🍽️</div>
                    <div>
                        <p className="text-sm text-gray-500 font-medium">আজকের মোট মিল</p>
                        <p className="text-xl font-bold text-gray-800">১২ টা</p>
                    </div>
                </div>

                {/* কার্ড ৩ */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-red-100 flex items-center gap-4 border-l-4 border-l-red-500">
                    <div className="text-4xl bg-red-50 p-3 rounded-xl">💰</div>
                    <div>
                        <p className="text-sm text-gray-500 font-medium">আজকের খরচ</p>
                        <p className="text-xl font-bold text-gray-800">৮৫০ টাকা</p>
                    </div>
                </div>
            </div>

            {/* মিল আপডেট টেবিল (Meal Update Section) */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                    <h2 className="text-lg font-bold text-gray-800">আজকের মিল স্ট্যাটাস</h2>
                    <button className="bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-orange-700 transition">
                        সব সেভ করুন
                    </button>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-white text-gray-500 text-sm border-b border-gray-100">
                            <tr>
                                <th className="px-6 py-4 font-medium">মেম্বারের নাম</th>
                                <th className="px-6 py-4 font-medium">দুপুর</th>
                                <th className="px-6 py-4 font-medium">রাত</th>
                                <th className="px-6 py-4 font-medium">গেস্ট মিল</th>
                                <th className="px-6 py-4 font-medium">অ্যাকশন</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {/* ডেমো ডেটা ১ */}
                            <tr className="hover:bg-gray-50 transition">
                                <td className="px-6 py-4 font-semibold text-gray-800">তানভীর</td>
                                <td className="px-6 py-4"><input type="checkbox" defaultChecked className="w-5 h-5 text-orange-600 rounded" /></td>
                                <td className="px-6 py-4"><input type="checkbox" defaultChecked className="w-5 h-5 text-orange-600 rounded" /></td>
                                <td className="px-6 py-4"><input type="number" defaultValue="0" className="w-16 border border-gray-200 rounded p-1 text-center" /></td>
                                <td className="px-6 py-4"><button className="text-blue-600 font-medium hover:underline">আপডেট</button></td>
                            </tr>
                            {/* ডেমো ডেটা ২ */}
                            <tr className="hover:bg-gray-50 transition">
                                <td className="px-6 py-4 font-semibold text-gray-800">রফিক</td>
                                <td className="px-6 py-4"><input type="checkbox" className="w-5 h-5 text-orange-600 rounded" /></td>
                                <td className="px-6 py-4"><input type="checkbox" defaultChecked className="w-5 h-5 text-orange-600 rounded" /></td>
                                <td className="px-6 py-4"><input type="number" defaultValue="1" className="w-16 border border-gray-200 rounded p-1 text-center" /></td>
                                <td className="px-6 py-4"><button className="text-blue-600 font-medium hover:underline">আপডেট</button></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    );
}