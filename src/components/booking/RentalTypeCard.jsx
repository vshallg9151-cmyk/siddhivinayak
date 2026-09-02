import React from 'react';
import { Car, UserCheck, ShieldCheck, Check, Sparkles, AlertCircle } from 'lucide-react';

export default function RentalTypeCard({ selectedType, onChangeType, rentalType, onChange }) {
  const activeType = selectedType || rentalType || 'self-drive';
  const handleSelect = onChangeType || onChange || (() => {});

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      
      {/* Option 1: Self Drive */}
      <div
        onClick={() => handleSelect('self-drive')}
        className={`p-6 sm:p-8 rounded-3xl border-2 cursor-pointer transition-all duration-300 relative flex flex-col justify-between ${
          activeType === 'self-drive'
            ? 'bg-amber-500/10 border-amber-400 text-white shadow-luxury scale-[1.02]'
            : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700 hover:shadow-md'
        }`}
      >
        {activeType === 'self-drive' && (
          <div className="absolute top-4 right-4 w-7 h-7 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center shadow font-black">
            <Check className="w-4 h-4 stroke-[3]" />
          </div>
        )}

        <div>
          <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/30 text-amber-400 flex items-center justify-center mb-4 shadow-md">
            <Car className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-black text-white">Self Drive Rental</h3>
          <p className="text-xs text-slate-400 font-medium mt-1 mb-6">
            Take full control of your road trip. Drive your dream car across Indian highways with zero per-km limits.
          </p>

          <ul className="space-y-2.5 text-xs font-semibold text-slate-300">
            <li className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Customer drives the vehicle independently</span>
            </li>
            <li className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Valid Driving License (DL) & Aadhaar required</span>
            </li>
            <li className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Refundable Security Deposit applicable (Paid at pickup)</span>
            </li>
            <li className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>100% Privacy & Unlimited KM option</span>
            </li>
          </ul>
        </div>

        <div className="mt-6 pt-4 border-t border-slate-800 text-xs font-extrabold text-amber-400 flex items-center justify-between">
          <span>Standard Base Rental Rate</span>
          <span>Included</span>
        </div>
      </div>

      {/* Option 2: With Driver */}
      <div
        onClick={() => handleSelect('chauffeur')}
        className={`p-6 sm:p-8 rounded-3xl border-2 cursor-pointer transition-all duration-300 relative flex flex-col justify-between ${
          activeType === 'chauffeur'
            ? 'bg-amber-500/10 border-amber-400 text-white shadow-luxury scale-[1.02]'
            : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700 hover:shadow-md'
        }`}
      >
        {activeType === 'chauffeur' && (
          <div className="absolute top-4 right-4 w-7 h-7 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center shadow font-black">
            <Check className="w-4 h-4 stroke-[3]" />
          </div>
        )}

        <div>
          <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/30 text-amber-400 flex items-center justify-center mb-4 shadow-md">
            <UserCheck className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-black text-white flex items-center gap-2">
            <span>With Driver</span>
            <span className="text-[10px] font-black uppercase tracking-wider bg-amber-500 text-slate-950 px-2 py-0.5 rounded-full">
              VIP Care
            </span>
          </h3>
          <p className="text-xs text-slate-400 font-medium mt-1 mb-6">
            Relax and enjoy the view. Uniformed, background-verified professional chauffeur with highway expertise.
          </p>

          <ul className="space-y-2.5 text-xs font-semibold text-slate-300">
            <li className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Professional uniform-clad chauffeur included</span>
            </li>
            <li className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Zero Driving License or Security Deposit required</span>
            </li>
            <li className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>24/7 Driver availability for night & long routes</span>
            </li>
            <li className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Stress-free parking & traffic management</span>
            </li>
          </ul>
        </div>

        <div className="mt-6 pt-4 border-t border-slate-800 text-xs font-extrabold text-amber-400 flex items-center justify-between">
          <span>Chauffeur Allowance Fee</span>
          <span>+ ₹500 / day</span>
        </div>
      </div>

    </div>
  );
}
