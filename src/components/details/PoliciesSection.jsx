import React, { useState } from 'react';
import { POLICIES_DATA } from '../../data/mockData';
import { CheckCircle2, XCircle, Fuel, RotateCcw, FileText, Info, ShieldCheck } from 'lucide-react';

export default function PoliciesSection({ car }) {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Info },
    { id: 'inclusions', label: 'Inclusions', icon: CheckCircle2 },
    { id: 'exclusions', label: 'Exclusions', icon: XCircle },
    { id: 'fuelPolicy', label: 'Fuel Policy', icon: Fuel },
    { id: 'cancellationPolicy', label: 'Cancellation Policy', icon: RotateCcw },
    { id: 'termsConditions', label: 'Terms & Conditions', icon: FileText },
  ];

  const currentPolicyItems = POLICIES_DATA[activeTab] || [];

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
      
      {/* Section Header */}
      <h3 className="text-xl font-black text-brand-navy border-b border-slate-100 pb-4">
        Rental Rules & Policies
      </h3>

      {/* Tabs Header Slider */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-slate-200">
        {tabs.map((t) => {
          const Icon = t.icon;
          return (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              className={`px-4 py-2.5 rounded-2xl text-xs font-extrabold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                activeTab === t.id
                  ? 'bg-brand-navy text-brand-gold shadow-sm'
                  : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{t.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Body Content */}
      <div className="pt-2">
        <ul className="space-y-3">
          {currentPolicyItems.map((item, idx) => (
            <li key={idx} className="flex items-start gap-3 p-3.5 bg-brand-bgLight rounded-2xl border border-slate-100 text-xs font-medium text-slate-800 leading-relaxed">
              {activeTab === 'inclusions' ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              ) : activeTab === 'exclusions' ? (
                <XCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
              ) : (
                <ShieldCheck className="w-4 h-4 text-brand-blue shrink-0 mt-0.5" />
              )}
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

    </div>
  );
}
