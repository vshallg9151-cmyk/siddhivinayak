import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Search, UserCheck, Car, Shield, Sparkles } from 'lucide-react';
import CitySearchableDropdown from '../common/CitySearchableDropdown';

export default function BookingCard({ onSearch }) {
  const [rentalType, setRentalType] = useState('self-drive'); // 'self-drive' or 'chauffeur'
  const [selectedPickupCity, setSelectedPickupCity] = useState('Surat');
  const [selectedReturnCity, setSelectedReturnCity] = useState('Surat');
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

  const [pickupDate, setPickupDate] = useState(() => tomorrowStr);
  const [pickupTime, setPickupTime] = useState('10:00');
  const [returnDate, setReturnDate] = useState(() => fourDaysStr);
  const [returnTime, setReturnTime] = useState('18:00');

  const handlePickupDateChange = (newDate) => {
    setPickupDate(newDate);
    if (!returnDate || newDate > returnDate) {
      const d = new Date(newDate);
      d.setDate(d.getDate() + 3);
      const y = d.getFullYear();
      const m = String(d.getMonth() + 1).padStart(2, '0');
      const day = String(d.getDate()).padStart(2, '0');
      setReturnDate(`${y}-${m}-${day}`);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch({
      rentalType,
      city: selectedPickupCity,
      returnCity: selectedReturnCity,
      pickupDate,
      pickupTime,
      returnDate,
      returnTime
    });
  };

  return (
    <div className="w-full max-w-5xl mx-auto glass-card rounded-3xl p-6 sm:p-8 shadow-luxury border border-white/60 relative z-20 transition-all duration-300">
      
      {/* Self Drive / Chauffeur Toggle Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-200/60">
        <div className="inline-flex p-1.5 bg-slate-900/10 rounded-2xl backdrop-blur-md">
          <button
            type="button"
            onClick={() => setRentalType('self-drive')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all duration-300 ${
              rentalType === 'self-drive'
                ? 'bg-brand-navy text-white shadow-md'
                : 'text-slate-700 hover:text-slate-950 hover:bg-white/40'
            }`}
          >
            <Car className={`w-4 h-4 ${rentalType === 'self-drive' ? 'text-brand-gold' : 'text-slate-600'}`} />
            Self Drive Rentals
          </button>
          <button
            type="button"
            onClick={() => setRentalType('chauffeur')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all duration-300 ${
              rentalType === 'chauffeur'
                ? 'bg-brand-navy text-white shadow-md'
                : 'text-slate-700 hover:text-slate-950 hover:bg-white/40'
            }`}
          >
            <UserCheck className={`w-4 h-4 ${rentalType === 'chauffeur' ? 'text-brand-gold' : 'text-slate-600'}`} />
            With Driver
          </button>
        </div>

        {/* Guarantee Badge */}
        <div className="hidden sm:flex items-center gap-2 text-xs font-semibold text-slate-700 bg-emerald-500/10 px-3 py-1.5 rounded-full border border-emerald-500/20">
          <Shield className="w-4 h-4 text-emerald-600" />
          <span>Zero Security Deposit on Select SUV Models</span>
        </div>
      </div>

      {/* Main Search Form */}
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        
        {/* Pickup City */}
        <div className="lg:col-span-1">
          <CitySearchableDropdown
            label="Pickup City"
            value={selectedPickupCity}
            onChange={setSelectedPickupCity}
            placeholder="Select Pickup City..."
            icon={MapPin}
          />
        </div>

        {/* Return City */}
        <div className="lg:col-span-1">
          <CitySearchableDropdown
            label="Return City"
            value={selectedReturnCity}
            onChange={setSelectedReturnCity}
            placeholder="Select Return City..."
            icon={MapPin}
          />
        </div>

        {/* Pickup Date & Time */}
        <div className="flex flex-col gap-1">
          <label className="text-[10px] font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5 text-brand-blue" />
            Pickup Date
          </label>
          <input
            type="date"
            value={pickupDate}
            min={todayStr}
            onClick={(e) => { try { if (e.target.showPicker) e.target.showPicker(); } catch {} }}
            onChange={(e) => handlePickupDateChange(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded-2xl px-3 py-2.5 text-white font-semibold text-xs outline-none cursor-pointer hover:border-amber-500/50 transition-colors"
          />
        </div>

        {/* Return Date & Time */}
        <div className="flex flex-col gap-1">
          <label className="text-[10px] font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5 text-brand-blue" />
            Return Date
          </label>
          <input
            type="date"
            value={returnDate}
            min={pickupDate || todayStr}
            onClick={(e) => { try { if (e.target.showPicker) e.target.showPicker(); } catch {} }}
            onChange={(e) => setReturnDate(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded-2xl px-3 py-2.5 text-white font-semibold text-xs outline-none cursor-pointer hover:border-amber-500/50 transition-colors"
          />
        </div>

        {/* Submit Search Button */}
        <div className="flex items-end">
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs py-3.5 px-4 rounded-2xl shadow-lg transition-all duration-300 flex items-center justify-center gap-2 group hover:scale-[1.02] active:scale-[0.98]"
          >
            <Search className="w-4 h-4 text-slate-950 group-hover:rotate-12 transition-transform" />
            <span>Search Cars</span>
          </button>
        </div>
      </form>

    </div>
  );
}
