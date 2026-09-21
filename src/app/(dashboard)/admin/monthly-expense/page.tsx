"use client";

import { useState, useEffect } from "react";
import { 
    IconCalendarEvent, 
    IconHome, 
    IconBolt, 
    IconWifi, 
    IconUser, 
    IconDots, 
    IconToolsKitchen2, 
    IconRefresh,
    IconReceipt,
    IconCalculator,
    IconInfoCircle,
    IconChartPie
} from "@tabler/icons-react";

export default function MonthlyExpenseSetup() {
    const generateMonths = () => {
        const months = [];
        const date = new Date();
        for (let i = 0; i < 12; i++) {
            const m = new Date(date.getFullYear(), date.getMonth() + i, 1);
            months.push(m.toLocaleDateString('en-US', { month: 'long', year: 'numeric' }));
        }
        return months;
    };

    const monthOptions = generateMonths();

    const [month, setMonth] = useState(monthOptions[0]);
    const [seatRent, setSeatRent] = useState<number | string>("");
    const [electricityGas, setElectricityGas] = useState<number | string>("");
    const [internet, setInternet] = useState<number | string>("");
    const [maid, setMaid] = useState<number | string>("");
    const [additional, setAdditional] = useState<number | string>("");
    const [mealCharge, setMealCharge] = useState<number | string>("");
    const [isLoading, setIsLoading] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [message, setMessage] = useState<{type: 'success' | 'error', text: string} | null>(null);

    // Fetch existing configuration if available
    useEffect(() => {
        const fetchConfig = async () => {
            setIsLoading(true);
            try {
                const res = await fetch(`/api/admin/monthly-expense?month=${encodeURIComponent(month)}`);
                if (res.ok) {
                    const { data } = await res.json();
                    if (data) {
                        setSeatRent(data.seatRent);
                        setElectricityGas(data.electricityGas);
                        setInternet(data.internet);
                        setMaid(data.maid);
                        setAdditional(data.additional);
                        setMealCharge(data.mealCharge);
                    } else {
                        handleReset(false); // Reset but don't clear message
                    }
                }
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchConfig();
    }, [month]);

    const handleReset = (clearMessage = true) => {
        setSeatRent("");
        setElectricityGas("");
        setInternet("");
        setMaid("");
        setAdditional("");
        setMealCharge("");
        if (clearMessage) setMessage(null);
    };

    const handleSave = async () => {
        setIsSaving(true);
        setMessage(null);
        try {
            const res = await fetch("/api/admin/monthly-expense", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    month,
                    seatRent: Number(seatRent) || 0,
                    electricityGas: Number(electricityGas) || 0,
                    internet: Number(internet) || 0,
                    maid: Number(maid) || 0,
                    additional: Number(additional) || 0,
                    mealCharge: Number(mealCharge) || 0,
                })
            });

            const data = await res.json();
            if (res.ok) {
                setMessage({ type: 'success', text: "Monthly expense successfully saved!" });
            } else {
                setMessage({ type: 'error', text: data.error || "Failed to save expense." });
            }
        } catch (error) {
            setMessage({ type: 'error', text: "An error occurred while saving." });
        } finally {
            setIsSaving(false);
        }
    };

    const total = 
        (Number(seatRent) || 0) + 
        (Number(electricityGas) || 0) + 
        (Number(internet) || 0) + 
        (Number(maid) || 0) + 
        (Number(additional) || 0) + 
        (Number(mealCharge) || 0);

    return (
        <div className="space-y-4 animate-in fade-in zoom-in-95 duration-300 pb-6 min-h-[calc(100vh-100px)] relative z-0">
            
            {/* Background Blobs */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-orange-100/40 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 -z-10" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-orange-50/60 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3 -z-10" />

            {/* Header Section */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 bg-white p-4 md:p-5 rounded-2xl shadow-[0_2px_10px_-3px_rgba(255,107,0,0.05)] border border-orange-100/50 relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-orange-50 text-[#FF6B00] flex items-center justify-center shrink-0">
                    <IconCalendarEvent size={28} stroke={2} />
                </div>
                <div>
                    <h1 className="text-xl font-extrabold text-[#0B132B]">Monthly Expense Setup</h1>
                    <p className="text-sm text-gray-500 font-medium mt-0.5">Set the monthly charges for all mess members. This will be applied for the selected month.</p>
                </div>
            </div>

            {message && (
                <div className={`p-4 rounded-xl border font-bold text-sm ${message.type === 'success' ? 'bg-green-50 border-green-200 text-green-700' : 'bg-red-50 border-red-200 text-red-700'}`}>
                    {message.text}
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* Left Column - Form */}
                <div className="lg:col-span-8 bg-white rounded-2xl shadow-[0_2px_15px_-3px_rgba(255,107,0,0.05)] border border-orange-100/50 overflow-hidden relative z-10">
                    
                    {/* Form Header & Month Selector */}
                    <div className="p-4 md:p-5 border-b border-orange-50/50 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#FFF9F5]">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-white shadow-sm border border-orange-100 text-[#FF6B00] flex items-center justify-center shrink-0">
                                <IconCalendarEvent size={20} stroke={2} />
                            </div>
                            <div>
                                <h2 className="text-lg font-extrabold text-[#0B132B]">Expense Details</h2>
                                <p className="text-xs text-gray-500 font-bold mt-0.5">Fill in the expense amounts. Total will be calculated automatically.</p>
                            </div>
                        </div>
                        
                        <div>
                            <label className="block text-xs font-bold text-gray-900 mb-1 ml-1">
                                Select Month <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-orange-600">
                                    <IconCalendarEvent size={16} stroke={2} />
                                </div>
                                <select
                                    value={month}
                                    onChange={(e) => setMonth(e.target.value)}
                                    className="pl-8 pr-8 py-2 bg-white border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all text-sm text-gray-900 font-extrabold shadow-sm appearance-none min-w-[180px]"
                                >
                                    {monthOptions.map(m => (
                                        <option key={m} value={m}>{m}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Form Fields */}
                    <div className="p-4 md:p-5 space-y-1 relative">
                        {isLoading && (
                            <div className="absolute inset-0 bg-white/60 backdrop-blur-sm z-10 flex items-center justify-center rounded-b-2xl">
                                <p className="font-bold text-orange-600 animate-pulse">Loading data...</p>
                            </div>
                        )}

                        <InputField icon={IconHome} color="text-orange-500" title="Seat Rent / Seat Value" desc="Monthly room/seat rent per member" value={seatRent} setValue={setSeatRent} />
                        <InputField icon={IconBolt} color="text-yellow-500" title="Electricity Bill + Gas" desc="Total electricity and gas bill per member" value={electricityGas} setValue={setElectricityGas} />
                        <InputField icon={IconWifi} color="text-blue-500" title="Internet Bill" desc="Total internet bill per member" value={internet} setValue={setInternet} />
                        <InputField icon={IconUser} color="text-green-500" title="Maid Charge" desc="Maid/cleaning service per member" value={maid} setValue={setMaid} />
                        <InputField icon={IconDots} color="text-purple-500" title="Additional (Optional)" desc="Any other expense (e.g. water, maintenance, etc.)" value={additional} setValue={setAdditional} />
                        <InputField icon={IconToolsKitchen2} color="text-pink-500" title="Monthly Meal Charge" desc="Monthly food charge per member" value={mealCharge} setValue={setMealCharge} />

                    </div>

                    {/* Form Actions */}
                    <div className="p-4 md:p-5 bg-[#FFF9F5] border-t border-orange-50/50 flex flex-col sm:flex-row gap-3">
                        <button 
                            onClick={() => handleReset()}
                            className="flex items-center justify-center gap-2 px-5 py-2.5 bg-[#FFF0E5] hover:bg-orange-100/80 text-[#FF6B00] border border-orange-100 rounded-xl font-bold text-sm transition-all shadow-sm flex-1 sm:flex-none cursor-pointer"
                        >
                            <IconRefresh size={18} stroke={2.5} /> Reset
                        </button>
                        <button 
                            onClick={handleSave}
                            disabled={isSaving}
                            className="flex items-center justify-center gap-2 px-6 py-2.5 bg-[#FF6B00] hover:bg-orange-600 text-white rounded-xl font-bold text-sm transition-all shadow-md shadow-orange-500/20 flex-1 cursor-pointer disabled:opacity-70"
                        >
                            <IconReceipt size={18} stroke={2.5} /> {isSaving ? "Saving..." : "Save Monthly Expense"}
                        </button>
                    </div>

                </div>

                {/* Right Column - Summary */}
                <div className="lg:col-span-4 space-y-4 relative z-10">
                    
                    <div className="bg-white rounded-2xl shadow-[0_2px_15px_-3px_rgba(255,107,0,0.05)] border border-orange-100/50 p-4 md:p-5">
                        <div className="flex items-center gap-4 border-b border-orange-50/50 pb-4 mb-4">
                            <div className="w-10 h-10 rounded-full bg-orange-50 shadow-sm border border-orange-100 text-[#FF6B00] flex items-center justify-center shrink-0">
                                <IconChartPie size={20} stroke={1.5} />
                            </div>
                            <div>
                                <h3 className="text-lg font-extrabold text-[#0B132B]">Expense Summary</h3>
                                <p className="text-xs text-gray-500 font-bold mt-0.5">Total amount per member for {month}</p>
                            </div>
                        </div>

                        <div className="space-y-3 mb-5">
                            <SummaryRow color="bg-orange-500" label="Seat Rent / Seat Value" value={seatRent} />
                            <SummaryRow color="bg-yellow-500" label="Electricity Bill + Gas" value={electricityGas} />
                            <SummaryRow color="bg-blue-500" label="Internet Bill" value={internet} />
                            <SummaryRow color="bg-green-500" label="Maid Charge" value={maid} />
                            <SummaryRow color="bg-purple-500" label="Additional" value={additional} />
                            <SummaryRow color="bg-pink-500" label="Monthly Meal Charge" value={mealCharge} />
                        </div>

                        <div className="bg-green-50 border border-green-100 rounded-xl p-4 flex items-center justify-between shadow-sm">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-white text-green-600 shadow-sm flex items-center justify-center shrink-0">
                                    <IconCalculator size={22} stroke={2} />
                                </div>
                                <div>
                                    <p className="text-[11px] font-bold text-green-700 uppercase tracking-wider">Total Per Member (Monthly)</p>
                                    <p className="text-2xl font-extrabold text-[#0B132B] mt-0.5">Tk {total.toLocaleString()}</p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-4 flex gap-3 p-3 bg-blue-50/50 rounded-xl border border-blue-100/50">
                            <IconInfoCircle className="text-blue-500 shrink-0 mt-0.5" size={18} />
                            <p className="text-[11px] font-bold text-blue-700 leading-relaxed">
                                This total amount (Tk {total.toLocaleString()}) will be applied to all active members for {month}.
                            </p>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
}

function InputField({ icon: Icon, color, title, desc, value, setValue }: any) {
    return (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-2.5 rounded-xl hover:bg-orange-50/30 transition-colors border border-transparent hover:border-orange-100/50">
            <div className="flex items-center gap-3">
                <div className={`w-9 h-9 rounded-xl bg-white shadow-sm border border-gray-100 flex items-center justify-center shrink-0 ${color}`}>
                    <Icon size={18} stroke={2.5} />
                </div>
                <div>
                    <p className="text-sm font-extrabold text-[#0B132B]">
                        {title} <span className="text-red-500">*</span>
                    </p>
                    <p className="text-[11px] text-gray-500 font-bold mt-0.5">{desc}</p>
                </div>
            </div>
            <div className="relative shrink-0">
                <input 
                    type="number"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    placeholder="0"
                    min="0"
                    className="w-full sm:w-28 pr-8 pl-3 py-2 bg-[#FAFAFA] border border-gray-100 rounded-lg outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all text-sm text-gray-900 font-extrabold shadow-sm text-right focus:bg-white"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[11px] font-bold text-gray-400">Tk</span>
            </div>
        </div>
    );
}

function SummaryRow({ color, label, value }: any) {
    return (
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
                <div className={`w-2.5 h-2.5 rounded-full ${color}`}></div>
                <p className="text-sm font-bold text-gray-700">{label}</p>
            </div>
            <p className="text-sm font-extrabold text-[#0B132B]">
                <span className="text-xs font-bold text-gray-400 mr-1">Tk</span> 
                {Number(value) || 0}
            </p>
        </div>
    );
}
