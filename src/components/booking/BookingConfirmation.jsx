import React from 'react';
import { DISPLAY_PHONE, createWhatsAppEnquiryUrl } from '../../utils/whatsappHelper';
import BookingStatusTracker from './BookingStatusTracker';
import { CheckCircle2, Phone, MessageSquare, Car, Calendar, MapPin, ShieldCheck, ArrowRight } from 'lucide-react';

export default function BookingConfirmation({ bookingData, onNavigateHome }) {
  const {
    bookingId = 'ST-2026-89412',
    car = {},
    rentalType = 'Self Drive',
    pickupCity = 'Mumbai',
    pickupDate = '05-08-2026',
    returnDate = '08-08-2026',
    rentalDays = 3,
    customerName = 'Valued Traveler',
    customerPhone = '9876543210',
    finalPayable = 12282
  } = bookingData || {};

  const whatsappUrl = createWhatsAppEnquiryUrl({
    customerName,
    carName: car.name || 'Mahindra Thar 4x4',
    rentalType,
    pickupCity,
    pickupDate,
    returnDate,
    duration: `${rentalDays} Days`,
    finalPayable
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Thank you Top Hero Box */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-luxury text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-md">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Booking Order Successfully Registered</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-black text-brand-navy tracking-tight">
          Thank you for choosing <br className="hidden sm:block" />
          <span className="bg-gradient-to-r from-brand-gold via-yellow-400 to-amber-500 bg-clip-text text-transparent">
            Siddhivinayak Tours & Travels
          </span>
        </h2>

        <p className="text-slate-600 text-sm sm:text-base max-w-xl mx-auto font-normal">
          Your reservation request has been logged under Booking ID <strong className="text-brand-navy font-mono">{bookingId}</strong>. Our travel executive will contact you shortly to confirm doorstep delivery.
        </p>

        {/* Action Call & WhatsApp Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-black text-sm shadow-luxury transition-all flex items-center justify-center gap-2"
          >
            <MessageSquare className="w-5 h-5" />
            <span>Chat on WhatsApp ({DISPLAY_PHONE})</span>
          </a>

          <a
            href="tel:9173746558"
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-brand-navy hover:bg-slate-900 text-brand-gold font-black text-sm shadow-luxury transition-all flex items-center justify-center gap-2"
          >
            <Phone className="w-5 h-5" />
            <span>Call Support ({DISPLAY_PHONE})</span>
          </a>
        </div>
      </div>

      {/* Booking Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Car Summary */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex items-center gap-4">
          <img
            src={car.image || 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=400&q=80'}
            alt={car.name}
            className="w-24 h-20 rounded-2xl object-cover border border-slate-200 shrink-0"
          />
          <div>
            <span className="text-[10px] uppercase font-bold text-brand-gold bg-brand-navy px-2 py-0.5 rounded-full">
              {car.category || 'SUV'}
            </span>
            <h4 className="text-lg font-black text-brand-navy mt-1">{car.name || 'Mahindra Thar 4x4'}</h4>
            <span className="text-xs text-slate-500 font-semibold">{car.transmission} • {car.fuelType}</span>
          </div>
        </div>

        {/* Trip Specs */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm grid grid-cols-2 gap-3 text-xs">
          <div>
            <span className="text-slate-400 font-bold block uppercase text-[10px]">Pickup Location</span>
            <span className="font-extrabold text-slate-900 flex items-center gap-1 mt-0.5">
              <MapPin className="w-3.5 h-3.5 text-brand-blue" /> {pickupCity}
            </span>
          </div>
          <div>
            <span className="text-slate-400 font-bold block uppercase text-[10px]">Rental Duration</span>
            <span className="font-extrabold text-slate-900 flex items-center gap-1 mt-0.5">
              <Calendar className="w-3.5 h-3.5 text-brand-blue" /> {rentalDays} Days
            </span>
          </div>
          <div>
            <span className="text-slate-400 font-bold block uppercase text-[10px]">Rental Mode</span>
            <span className="font-extrabold text-slate-900 block mt-0.5">{rentalType}</span>
          </div>
          <div>
            <span className="text-slate-400 font-bold block uppercase text-[10px]">Final Amount</span>
            <span className="font-black text-brand-navy text-sm block mt-0.5">₹{finalPayable.toLocaleString('en-IN')}</span>
          </div>
        </div>

      </div>

      {/* Live Booking Tracker */}
      <BookingStatusTracker activeStatusIndex={2} />

      {/* Return Home Button */}
      <div className="text-center pt-4">
        <button
          onClick={onNavigateHome}
          className="px-8 py-3.5 rounded-2xl bg-white border border-slate-300 hover:border-brand-navy text-brand-navy font-bold text-xs shadow-sm hover:shadow transition-all"
        >
          Return to Home Page
        </button>
      </div>

    </div>
  );
}
