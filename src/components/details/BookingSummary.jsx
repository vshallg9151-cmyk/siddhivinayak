import React, { useState } from 'react';
import { POPULAR_CITIES } from '../../data/mockData';
import { Calendar, MapPin, ShieldCheck, Tag, Check, ArrowRight, Sparkles, DollarSign } from 'lucide-react';

export default function BookingSummary({ car, onContinueBooking }) {
  const getFormattedDate = (offsetDays = 0) => {
    const d = new Date();
    d.setDate(d.getDate() + offsetDays);
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
  };

  const todayStr = getFormattedDate(0);
  const tomorrowStr = getFormattedDate(1);
  const fourDaysStr = getFormattedDate(4);

  const [pickupCity, setPickupCity] = useState('Mumbai');
  const [pickupDate, setPickupDate] = useState(() => tomorrowStr);
  const [returnDate, setReturnDate] = useState(() => fourDaysStr);
  const [rentalDays, setRentalDays] = useState(3);
  const [promoCode, setPromoCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(0); // in INR
  const [promoSuccessMsg, setPromoSuccessMsg] = useState('');

  const baseRentalCost = car.pricePerDay * rentalDays;
  const securityDeposit = car.securityDeposit || 5000;
  const taxAmount = Math.round(baseRentalCost * 0.05); // 5% GST
  const finalPayable = baseRentalCost + taxAmount - appliedDiscount;

  const handleApplyPromo = (e) => {
    e.preventDefault();
    if (promoCode.toUpperCase() === 'WEEKEND20') {
      const discount = Math.round(baseRentalCost * 0.20);
      setAppliedDiscount(discount);
      setPromoSuccessMsg(`'WEEKEND20' applied! Saved ₹${discount.toLocaleString('en-IN')}`);
    } else if (promoCode.toUpperCase() === 'LONGTRIP35') {
      const discount = Math.round(baseRentalCost * 0.35);
      setAppliedDiscount(discount);
      setPromoSuccessMsg(`'LONGTRIP35' applied! Saved ₹${discount.toLocaleString('en-IN')}`);
    } else if (promoCode.toUpperCase() === 'AIRPORTVIP') {
      setAppliedDiscount(500);
      setPromoSuccessMsg(`'AIRPORTVIP' applied! Saved ₹500`);
    } else {
      setAppliedDiscount(0);
      setPromoSuccessMsg('Invalid Promo Code. Try WEEKEND20');
    }
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    onContinueBooking(car, {
      pickupCity,
      pickupDate,
      returnDate,
      rentalDays,
      baseRentalCost,
      securityDeposit,
      taxAmount,
      appliedDiscount,
      finalPayable
    });
  };

  return (
    <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-luxury space-y-6 sticky top-24">
      
      {/* Price Header */}
      <div className="pb-4 border-b border-slate-100 flex items-baseline justify-between">
        <div>
          <span className="text-xs text-slate-500 font-semibold block">Daily Rate</span>
          <span className="text-3xl font-black text-brand-navy">
            ₹{car.pricePerDay.toLocaleString('en-IN')}
          </span>
          <span className="text-xs text-slate-500 font-bold"> / day</span>
        </div>
        <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
          Instant Key Handover
        </span>
      </div>

      <form onSubmit={handleBookingSubmit} className="space-y-4">
        
        {/* Pickup Location */}
        <div>
          <label className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500 block mb-1.5 flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-brand-blue" />
            Pickup Location
          </label>
          <select
            value={pickupCity}
            onChange={(e) => setPickupCity(e.target.value)}
            className="w-full bg-slate-50 border border-slate-300 rounded-2xl px-3.5 py-2.5 text-xs font-bold text-slate-900 outline-none focus:ring-2 focus:ring-brand-blue cursor-pointer"
          >
            {POPULAR_CITIES.map((city) => (
              <option key={city.id} value={city.name}>
                {city.name} Hub
              </option>
            ))}
          </select>
        </div>

        {/* Dates & Duration */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 block mb-1 flex items-center gap-1">
              <Calendar className="w-3 h-3 text-brand-blue" />
              Pickup Date
            </label>
            <input
              type="date"
              value={pickupDate}
              min={todayStr}
              onClick={(e) => { try { if (e.target.showPicker) e.target.showPicker(); } catch {} }}
              onChange={(e) => setPickupDate(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-2.5 py-2 text-xs font-bold text-slate-900 outline-none focus:ring-2 focus:ring-brand-blue cursor-pointer"
            />
          </div>

          <div>
            <label className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 block mb-1">
              Rental Duration
            </label>
            <div className="flex items-center gap-1 bg-slate-50 border border-slate-300 rounded-xl px-2 py-1.5">
              <button
                type="button"
                onClick={() => setRentalDays(Math.max(1, rentalDays - 1))}
                className="w-6 h-6 rounded-lg bg-white shadow text-slate-900 font-black text-xs"
              >
                -
              </button>
              <span className="flex-1 text-center font-extrabold text-xs text-slate-900">
                {rentalDays} Days
              </span>
              <button
                type="button"
                onClick={() => setRentalDays(rentalDays + 1)}
                className="w-6 h-6 rounded-lg bg-white shadow text-slate-900 font-black text-xs"
              >
                +
              </button>
            </div>
          </div>
        </div>

        {/* Promo Code Input */}
        <div className="pt-2">
          <label className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 block mb-1 flex items-center gap-1">
            <Tag className="w-3 h-3 text-brand-blue" />
            Have Promo Code?
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="e.g. WEEKEND20"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              className="flex-1 bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-extrabold uppercase tracking-wider text-slate-900 outline-none"
            />
            <button
              type="button"
              onClick={handleApplyPromo}
              className="px-3.5 py-2 rounded-xl bg-brand-navy hover:bg-slate-900 text-brand-gold font-extrabold text-xs shadow"
            >
              Apply
            </button>
          </div>
          {promoSuccessMsg && (
            <span className={`text-[10px] font-bold block mt-1 ${appliedDiscount > 0 ? 'text-emerald-600' : 'text-rose-500'}`}>
              {promoSuccessMsg}
            </span>
          )}
        </div>

        {/* Itemized Price Breakdown */}
        <div className="pt-4 border-t border-slate-100 space-y-2 text-xs font-medium text-slate-600">
          <div className="flex justify-between">
            <span>Base Rental ({rentalDays} Days x ₹{car.pricePerDay})</span>
            <span className="font-bold text-slate-900">₹{baseRentalCost.toLocaleString('en-IN')}</span>
          </div>

          <div className="flex justify-between">
            <span>Government GST (5%)</span>
            <span className="font-bold text-slate-900">₹{taxAmount.toLocaleString('en-IN')}</span>
          </div>

          {appliedDiscount > 0 && (
            <div className="flex justify-between text-emerald-600 font-bold">
              <span>Promo Code Discount</span>
              <span>- ₹{appliedDiscount.toLocaleString('en-IN')}</span>
            </div>
          )}

          <div className="flex justify-between pt-1 text-[11px] text-slate-500 border-t border-dashed border-slate-200">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              Refundable Deposit (Pay at Pickup)
            </span>
            <span className="font-bold text-slate-800">₹{securityDeposit.toLocaleString('en-IN')}</span>
          </div>

          <div className="flex items-baseline justify-between pt-3 border-t border-slate-200">
            <span className="text-xs font-extrabold text-brand-navy">Final Rental Payable</span>
            <span className="text-2xl font-black text-brand-navy">
              ₹{finalPayable.toLocaleString('en-IN')}
            </span>
          </div>
        </div>

        {/* Submit CTA */}
        <button
          type="submit"
          className="w-full py-4 rounded-2xl bg-gradient-to-r from-brand-gold via-yellow-400 to-amber-500 hover:from-yellow-400 hover:to-amber-400 text-brand-navy font-black text-sm shadow-luxury-gold hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 mt-4"
        >
          <span>Continue Booking</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </form>

      <div className="pt-3 text-center border-t border-slate-100">
        <span className="text-[10px] text-slate-500 font-semibold flex items-center justify-center gap-1">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
          Free Cancellation up to 24 hours prior to pickup
        </span>
      </div>

    </div>
  );
}
