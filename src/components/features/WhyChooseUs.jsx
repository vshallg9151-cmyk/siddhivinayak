import React from 'react';
import { Wrench, ShieldCheck, Truck, Headphones, Zap, CheckCircle2, Award, Lock } from 'lucide-react';

export default function WhyChooseUs() {
  const whyFeatures = [
    { title: 'Well Maintained Cars', desc: '50+ point mechanical and safety audit prior to every key handover.', icon: Wrench, color: 'from-blue-500 to-indigo-600' },
    { title: 'Transparent Pricing', desc: 'Zero hidden insurance or Fastag surcharge. What you see is what you pay.', icon: ShieldCheck, color: 'from-emerald-500 to-teal-600' },
    { title: 'Doorstep Delivery', desc: 'Cars delivered right to your home, office, or airport terminal in under 90 minutes.', icon: Truck, color: 'from-amber-500 to-yellow-600' },
    { title: '24×7 Support', desc: 'Dedicated round-the-clock roadside assistance and concierge helpline.', icon: Headphones, color: 'from-purple-500 to-violet-600' },
    { title: 'Fast 2-Min Booking', desc: 'Instant paperless KYC verification via Aadhaar & DL for rapid key release.', icon: Zap, color: 'from-cyan-500 to-blue-600' },
    { title: 'Verified Vehicles', desc: 'All vehicles carry valid commercial registration, pollution certificate, & insurance.', icon: CheckCircle2, color: 'from-rose-500 to-pink-600' },
    { title: 'Trusted Service', desc: 'Over 50,000 satisfied Indian road-trippers with a 4.9 star rating.', icon: Award, color: 'from-yellow-500 to-amber-600' },
    { title: 'Secure Payments', desc: 'Bank-grade encrypted gateway supporting UPI, Credit Cards, & Instant Refund.', icon: Lock, color: 'from-indigo-500 to-blue-700' }
  ];

  return (
    <section id="why-us" className="py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-extrabold uppercase tracking-widest text-brand-blue bg-blue-50 px-3.5 py-1.5 rounded-full border border-blue-100">
            Unrivaled Quality & Trust
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-navy mt-3 tracking-tight">
            Why Choose Siddhivinayak Tours & Travels?
          </h2>
          <p className="text-slate-600 text-sm mt-2">
            We are redefining car rentals in India with premium vehicle standards, zero hidden fees, and customer-first service.
          </p>
        </div>

        {/* 8 Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {whyFeatures.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="group p-6 bg-brand-bgLight rounded-3xl border border-slate-200/80 hover:border-brand-blue/30 hover:shadow-luxury transition-all duration-300 flex flex-col justify-between hover:-translate-y-1"
              >
                <div>
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${item.color} text-white flex items-center justify-center mb-5 shadow-md group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-brand-navy group-hover:text-brand-blue transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-slate-600 text-xs mt-2 leading-relaxed font-normal">
                    {item.desc}
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
