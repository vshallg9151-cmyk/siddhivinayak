import React from 'react';
import { DISPLAY_PHONE, createWhatsAppEnquiryUrl } from '../../utils/whatsappHelper';
import { Phone, MessageSquare, Headphones, ShieldCheck, Clock } from 'lucide-react';

export default function EmergencySupportCard({ carName = 'Vehicle' }) {
  const whatsappUrl = createWhatsAppEnquiryUrl({
    carName,
    rentalType: 'Roadside Helpline Assist',
    pickupCity: 'Pan-India Highway'
  });

  return (
    <div className="bg-gradient-to-r from-brand-navy via-slate-900 to-slate-950 text-white rounded-3xl p-6 sm:p-8 shadow-luxury border border-slate-800 relative overflow-hidden">
      
      {/* Glow background ornament */}
      <div className="absolute right-0 top-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
        
        {/* Left text */}
        <div className="space-y-2 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold border border-emerald-500/30">
            <Clock className="w-3.5 h-3.5" />
            <span>24×7 Roadside Assistance & Helpline</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-black text-white">
            Need Help During Your Trip?
          </h3>
          <p className="text-slate-300 text-xs sm:text-sm max-w-xl">
            Our dedicated Indian highway dispatch team is on standby 24/7. Instant towing, flat tyre support, and replacement vehicle guarantee across all national expressways.
          </p>
          <div className="text-brand-gold font-extrabold text-lg pt-1">
            Direct Line: {DISPLAY_PHONE}
          </div>
        </div>

        {/* Right CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full md:w-auto">
          <a
            href="tel:9173746558"
            className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-white hover:bg-slate-100 text-brand-navy font-black text-xs shadow-md transition-all flex items-center justify-center gap-2"
          >
            <Phone className="w-4 h-4 text-brand-blue" />
            <span>Call Support ({DISPLAY_PHONE})</span>
          </a>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold text-xs shadow-md transition-all flex items-center justify-center gap-2"
          >
            <MessageSquare className="w-4 h-4" />
            <span>WhatsApp Support</span>
          </a>
        </div>

      </div>

    </div>
  );
}
