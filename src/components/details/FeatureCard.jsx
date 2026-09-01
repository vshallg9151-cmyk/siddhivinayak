import React from 'react';
import { Wind, Bluetooth, Music, BatteryCharging, Navigation, Camera, Compass, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function FeatureCard({ car }) {
  const defaultFeatures = [
    { title: 'Air Conditioning', desc: 'Automatic Dual-Zone Climate Control', icon: Wind },
    { title: 'Bluetooth Connectivity', desc: 'Hands-free calling & audio streaming', icon: Bluetooth },
    { title: 'Music System', desc: 'Touchscreen Audio with Premium Speakers', icon: Music },
    { title: 'USB Fast Charging', desc: 'Multiple Type-C & 12V power sockets', icon: BatteryCharging },
    { title: 'GPS Navigation', desc: 'Live traffic Google Maps integration', icon: Navigation },
    { title: 'Reverse Camera', desc: 'Rear Parking Sensors & Dynamic Guidelines', icon: Camera },
    { title: 'Power Steering', desc: 'Tilt & Telescopic Adjustable Steering', icon: Compass },
    { title: 'Safety Features', desc: 'Dual Airbags, ABS with EBD, ISOFIX Mounts', icon: ShieldCheck }
  ];

  const carFeaturesList = car.features && car.features.length > 0 ? car.features : [];

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
      <h3 className="text-xl font-black text-brand-navy border-b border-slate-100 pb-4">
        Comfort & Safety Features
      </h3>

      {/* Equipment Icon Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {defaultFeatures.map((ft, idx) => {
          const Icon = ft.icon;
          return (
            <div key={idx} className="p-4 bg-brand-bgLight rounded-2xl border border-slate-100 flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-brand-blue flex items-center justify-center shrink-0 border border-blue-100">
                <Icon className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-extrabold text-slate-900">{ft.title}</h4>
                <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">{ft.desc}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Specific Car Feature Checklist */}
      {carFeaturesList.length > 0 && (
        <div className="pt-4 border-t border-slate-100">
          <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
            Full Equipment Checklist
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {carFeaturesList.map((item, idx) => (
              <div key={idx} className="flex items-center gap-2 p-2 bg-slate-50 rounded-xl text-xs font-semibold text-slate-800">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
