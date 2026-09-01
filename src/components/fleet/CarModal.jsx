import React, { useState } from 'react';
import { X, CheckCircle, ShieldCheck, Users, Fuel, Gauge, Star, Calendar, MapPin, Sparkles, AlertCircle } from 'lucide-react';

export default function CarModal({ car, mode = 'details', onClose, onConfirmBooking }) {
  const [selectedImage, setSelectedImage] = useState(car?.image || '');
  const [bookingCity, setBookingCity] = useState('Mumbai');
  const [bookingDate, setBookingDate] = useState('2026-08-05');
  const [daysCount, setDaysCount] = useState(3);
  const [rentalMode, setRentalMode] = useState('self-drive');

  if (!car) return null;

  const totalEstimate = car.pricePerDay * daysCount;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-brand-navy/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-8">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-slate-900/60 hover:bg-slate-900 text-white flex items-center justify-center backdrop-blur-md transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header / Media */}
        <div className="grid grid-cols-1 md:grid-cols-2">
          
          {/* Gallery Section */}
          <div className="bg-slate-950 p-6 flex flex-col justify-between">
            <div className="relative h-64 sm:h-72 w-full rounded-2xl overflow-hidden mb-4 border border-slate-800">
              <img
                src={selectedImage || car.image}
                alt={car.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3 bg-brand-navy/80 backdrop-blur-md text-brand-gold text-xs font-bold px-3 py-1 rounded-full border border-brand-gold/30">
                {car.category}
              </div>
            </div>

            {/* Gallery Thumbnails */}
            {car.gallery && car.gallery.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto pb-2">
                {car.gallery.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(img)}
                    className={`w-20 h-14 rounded-xl overflow-hidden shrink-0 border-2 transition-all ${
                      selectedImage === img ? 'border-brand-gold scale-105' : 'border-slate-800 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt={`Gallery ${idx}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
            
            {/* Quick Deposit Tag */}
            <div className="mt-4 p-3 bg-white/5 rounded-xl border border-white/10 flex items-center gap-2 text-slate-300 text-xs font-semibold">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{car.deposit || 'Refundable Deposit: ₹5,000'}</span>
            </div>
          </div>

          {/* Details & Booking Form Section */}
          <div className="p-6 sm:p-8 flex flex-col justify-between max-h-[80vh] overflow-y-auto">
            <div>
              <div className="flex items-baseline justify-between gap-2 mb-1">
                <h2 className="text-2xl font-black text-brand-navy">{car.name}</h2>
                <div className="flex items-center gap-1 text-sm font-bold text-amber-500 bg-amber-50 px-2 py-0.5 rounded-md">
                  <Star className="w-4 h-4 fill-amber-400" />
                  <span>{car.rating}</span>
                </div>
              </div>
              <p className="text-xs text-slate-500 font-medium mb-4">{car.tagline}</p>
              
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-6">
                {car.description}
              </p>

              {/* Key Highlights Grid */}
              <div className="grid grid-cols-3 gap-3 p-3 bg-slate-50 rounded-2xl border border-slate-200 mb-6">
                <div className="text-center">
                  <span className="text-[10px] text-slate-500 font-bold block uppercase">Capacity</span>
                  <span className="text-sm font-bold text-slate-900 flex items-center justify-center gap-1 mt-0.5">
                    <Users className="w-3.5 h-3.5 text-brand-blue" /> {car.seats} Seats
                  </span>
                </div>
                <div className="text-center border-x border-slate-200">
                  <span className="text-[10px] text-slate-500 font-bold block uppercase">Gearbox</span>
                  <span className="text-sm font-bold text-slate-900 flex items-center justify-center gap-1 mt-0.5">
                    <Gauge className="w-3.5 h-3.5 text-brand-blue" /> {car.transmission}
                  </span>
                </div>
                <div className="text-center">
                  <span className="text-[10px] text-slate-500 font-bold block uppercase">Fuel</span>
                  <span className="text-sm font-bold text-slate-900 flex items-center justify-center gap-1 mt-0.5">
                    <Fuel className="w-3.5 h-3.5 text-brand-blue" /> {car.fuelType}
                  </span>
                </div>
              </div>

              {/* Vehicle Features List */}
              <div className="mb-6">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                  Vehicle Equipment & Features
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  {car.features?.map((ft, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      <span>{ft}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Reservation Inputs */}
              <div className="bg-blue-50/60 p-4 rounded-2xl border border-blue-100 mb-6">
                <h4 className="text-xs font-extrabold text-brand-navy uppercase mb-3 flex items-center justify-between">
                  <span>Trip Duration & Price Calculator</span>
                  <span className="text-brand-blue">₹{car.pricePerDay} / day</span>
                </h4>
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <div>
                    <label className="text-[10px] font-bold text-slate-600 block mb-1">Pickup City</label>
                    <select
                      value={bookingCity}
                      onChange={(e) => setBookingCity(e.target.value)}
                      className="w-full bg-white border border-slate-300 rounded-xl px-2.5 py-2 text-xs font-semibold text-slate-900 outline-none"
                    >
                      <option value="Mumbai">Mumbai</option>
                      <option value="Delhi">Delhi NCR</option>
                      <option value="Pune">Pune</option>
                      <option value="Goa">Goa</option>
                      <option value="Jaipur">Jaipur</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-600 block mb-1">Rental Days</label>
                    <input
                      type="number"
                      min="1"
                      max="30"
                      value={daysCount}
                      onChange={(e) => setDaysCount(Math.max(1, parseInt(e.target.value) || 1))}
                      className="w-full bg-white border border-slate-300 rounded-xl px-2.5 py-2 text-xs font-bold text-slate-900 outline-none"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-blue-200">
                  <span className="text-xs font-bold text-slate-700">Estimated Total ({daysCount} Days)</span>
                  <span className="text-xl font-black text-brand-navy">
                    ₹{totalEstimate.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>
            </div>

            {/* Modal Bottom CTA */}
            <div className="pt-4 border-t border-slate-200 flex items-center gap-3">
              <button
                onClick={onClose}
                className="w-1/3 py-3 rounded-2xl border border-slate-300 text-slate-700 font-bold text-xs hover:bg-slate-100 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => onConfirmBooking(car, { bookingCity, daysCount, totalEstimate, rentalMode })}
                className="w-2/3 py-3 rounded-2xl bg-gradient-to-r from-brand-gold to-amber-500 text-brand-navy font-black text-xs shadow-luxury-gold hover:opacity-95 transition-all flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>Confirm & Reserve Car</span>
              </button>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
