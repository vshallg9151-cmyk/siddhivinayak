import React from 'react';
import { Award, Gauge, Fuel, Users, Calendar, ShieldCheck, Zap, Layers, Palette, Shield } from 'lucide-react';

export default function SpecificationCard({ car }) {
  const specs = [
    { label: 'Brand', value: car.brand, icon: Award },
    { label: 'Model', value: car.model, icon: Layers },
    { label: 'Year', value: car.year || 2024, icon: Calendar },
    { label: 'Seats', value: car.seatingLabel || `${car.seats} Seats`, icon: Users },
    { label: 'Transmission', value: car.transmission, icon: Gauge },
    { label: 'Fuel Type', value: car.fuelTypeLabel || car.fuelType, icon: Fuel },
    { label: 'Mileage / Range', value: car.mileage || '15.4 kmpl', icon: Zap },
    { label: 'Engine Output', value: car.engine || '2.0L Turbo', icon: ShieldCheck },
    { label: 'Ground Clearance', value: car.groundClearance || '210 mm', icon: Shield },
    { label: 'Boot Space', value: car.bootSpace || '350 Litres', icon: Layers },
    { label: 'Exterior Color', value: car.color || 'Pearl White', icon: Palette }
  ];

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
      <h3 className="text-xl font-black text-brand-navy mb-6 flex items-center justify-between border-b border-slate-100 pb-4">
        <span>Vehicle Specifications</span>
        <span className="text-xs font-extrabold text-brand-blue bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
          50-Point Certified
        </span>
      </h3>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {specs.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div key={idx} className="p-3.5 bg-brand-bgLight rounded-2xl border border-slate-100">
              <div className="flex items-center gap-1.5 text-slate-400 mb-1">
                <Icon className="w-3.5 h-3.5 text-brand-blue shrink-0" />
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500">{item.label}</span>
              </div>
              <span className="text-xs font-extrabold text-slate-900 block truncate">{item.value}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
