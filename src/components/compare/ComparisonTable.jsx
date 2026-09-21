import React from 'react';
import { CheckCircle2, XCircle, Star, Users, Gauge, Fuel, ShieldCheck, ArrowRight, X } from 'lucide-react';

export default function ComparisonTable({ compareList, onRemoveCar, onSelectCarForBooking }) {
  if (!compareList || compareList.length === 0) return null;

  const rows = [
    { label: 'Daily Rental Rate', key: 'price', render: (car) => <span className="text-xl font-black text-brand-navy">₹{car.pricePerDay.toLocaleString('en-IN')} / day</span> },
    { label: 'Refundable Deposit', key: 'deposit', render: (car) => <span className="text-xs font-bold text-slate-800">₹{(car.securityDeposit || 5000).toLocaleString('en-IN')}</span> },
    { label: 'Seating Capacity', key: 'seats', render: (car) => <span className="text-xs font-bold text-slate-800">{car.seatingLabel || `${car.seats} Seats`}</span> },
    { label: 'Transmission', key: 'transmission', render: (car) => <span className="text-xs font-bold text-slate-800">{car.transmission}</span> },
    { label: 'Fuel Type', key: 'fuel', render: (car) => <span className="text-xs font-bold text-slate-800">{car.fuelTypeLabel || car.fuelType}</span> },
    { label: 'Mileage / Efficiency', key: 'mileage', render: (car) => <span className="text-xs font-bold text-slate-800">{car.mileage || '15 kmpl'}</span> },
    { label: 'Engine Output', key: 'engine', render: (car) => <span className="text-xs font-medium text-slate-700">{car.engine || '2.0L Turbo'}</span> },
    { label: 'Ground Clearance', key: 'clearance', render: (car) => <span className="text-xs font-bold text-slate-800">{car.groundClearance || '190 mm'}</span> },
    { label: 'Unlimited KM Option', key: 'unlimited', render: (car) => car.unlimitedKmAvailable ? <CheckCircle2 className="w-5 h-5 text-emerald-500 mx-auto" /> : <XCircle className="w-5 h-5 text-slate-300 mx-auto" /> },
    { label: 'Best For Usage', key: 'bestFor', render: (car) => <span className="text-xs font-extrabold text-brand-blue bg-blue-50 p-2 rounded-xl block border border-blue-100">{car.bestFor || 'Road Trips & Highway Drives'}</span> },
  ];

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-luxury overflow-hidden">
      <div className="overflow-x-auto scrollbar-thin">
        <table className="w-full min-w-[600px] text-center border-collapse">
          <thead>
            <tr className="bg-brand-navy text-white">
              <th className="p-4 text-xs font-extrabold uppercase tracking-wider text-left border-b border-slate-800 w-48">
                Specification Feature
              </th>
              {compareList.map((car) => (
                <th key={car.id} className="p-4 border-b border-slate-800 relative w-64">
                  <button
                    onClick={() => onRemoveCar(car.id)}
                    className="absolute top-2 right-2 p-1 text-slate-400 hover:text-white rounded-full bg-white/10"
                    title="Remove from comparison"
                  >
                    <X className="w-4 h-4" />
                  </button>

                  <div className="h-32 w-full rounded-2xl overflow-hidden mb-3 border border-white/20 mt-2">
                    <img src={car.image} alt={car.name} className="w-full h-full object-cover" />
                  </div>
                  <h4 className="text-base font-black text-white">{car.name}</h4>
                  <span className="text-xs text-brand-gold font-bold flex items-center justify-center gap-1 mt-1">
                    <Star className="w-3.5 h-3.5 fill-brand-gold" /> {car.rating} ({car.reviewsCount} reviews)
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, idx) => (
              <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-brand-bgLight/60'}>
                <td className="p-4 text-xs font-extrabold text-slate-700 text-left border-t border-slate-200">
                  {row.label}
                </td>
                {compareList.map((car) => (
                  <td key={car.id} className="p-4 border-t border-slate-200">
                    {row.render(car)}
                  </td>
                ))}
              </tr>
            ))}
            
            {/* CTA Row */}
            <tr className="bg-slate-50 border-t border-slate-200">
              <td className="p-4 text-xs font-extrabold text-slate-700 text-left">
                Action / Select
              </td>
              {compareList.map((car) => (
                <td key={car.id} className="p-4">
                  <button
                    onClick={() => onSelectCarForBooking(car)}
                    className="w-full py-3 rounded-2xl bg-gradient-to-r from-brand-gold to-amber-500 text-brand-navy font-extrabold text-xs shadow-luxury-gold hover:scale-105 transition-all flex items-center justify-center gap-1.5"
                  >
                    <span>Choose This Car</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
