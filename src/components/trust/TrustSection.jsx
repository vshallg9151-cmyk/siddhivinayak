import React from 'react';
import { TRUST_FEATURES } from '../../data/mockData';
import { ShieldCheck, Gauge, Headphones, Sparkles, RotateCcw, Lock } from 'lucide-react';

const iconMap = {
  ShieldCheck: ShieldCheck,
  Gauge: Gauge,
  Headphones: Headphones,
  Sparkles: Sparkles,
  RotateCcw: RotateCcw,
  Lock: Lock
};

export default function TrustSection() {
  return (
    <section className="py-16 bg-white relative z-20 -mt-6 rounded-t-3xl border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-extrabold uppercase tracking-widest text-brand-blue bg-blue-50 px-3.5 py-1.5 rounded-full border border-blue-100">
            Why Travelers Trust Us
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-navy mt-3 tracking-tight">
            The Siddhivinayak Promise
          </h2>
          <p className="text-slate-600 text-base mt-2 font-normal">
            Designed for seamless road trip experiences across India with zero stress and total transparency.
          </p>
        </div>

        {/* 6 Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TRUST_FEATURES.map((feature) => {
            const IconComponent = iconMap[feature.iconName] || ShieldCheck;

            return (
              <div
                key={feature.id}
                className="group bg-brand-bgLight p-6 rounded-2xl border border-slate-200/80 hover:border-brand-blue/30 hover:shadow-luxury transition-all duration-300 flex items-start gap-4 hover:-translate-y-1"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} text-white flex items-center justify-center shrink-0 shadow-md group-hover:scale-110 transition-transform duration-300`}>
                  <IconComponent className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-brand-navy group-hover:text-brand-blue transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-slate-600 text-sm mt-1.5 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
