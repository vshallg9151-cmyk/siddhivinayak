import React from 'react';
import { DISPLAY_PHONE, createWhatsAppEnquiryUrl } from '../../utils/whatsappHelper';
import { Car, Phone, Mail, MapPin, Clock, ShieldCheck, MessageSquare } from 'lucide-react';

export default function Footer({ onOpenLegal }) {
  const whatsappUrl = createWhatsAppEnquiryUrl({
    carName: 'Enquiry',
    rentalType: 'Self Drive / With Driver',
    pickupCity: 'Pan India'
  });

  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-800">
          
          {/* Column 1: Company Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 flex items-center justify-center shadow-lg shadow-amber-500/20 text-slate-950 font-black">
                <Car className="w-6 h-6 stroke-[2.5]" />
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-lg text-white tracking-tight">SIDDHIVINAYAK</span>
                <span className="text-[10px] tracking-widest uppercase font-semibold text-amber-400">Tours & Travels</span>
              </div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed font-normal">
              India's premier AI-powered travel platform and luxury car rental service. Dedicated to delivering safety, transparent pricing, and 24x7 assistance across India.
            </p>
            <div className="flex items-center gap-3 text-xs font-semibold text-amber-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>GST Registered (27AAAAA0000A1Z5) & All-India Tourist Permit Holder</span>
            </div>
          </div>

          {/* Column 2: Quick Links & Legal */}
          <div>
            <h4 className="text-sm font-extrabold text-white uppercase tracking-wider mb-4 border-b border-slate-800 pb-2">
              Legal & Trust Pages
            </h4>
            <ul className="space-y-2 text-xs font-medium">
              <li>
                <button onClick={() => onOpenLegal && onOpenLegal('privacy')} className="text-slate-400 hover:text-amber-400 transition-colors">
                  Privacy Policy
                </button>
              </li>
              <li>
                <button onClick={() => onOpenLegal && onOpenLegal('terms')} className="text-slate-400 hover:text-amber-400 transition-colors">
                  Terms & Conditions
                </button>
              </li>
              <li>
                <button onClick={() => onOpenLegal && onOpenLegal('refund')} className="text-slate-400 hover:text-amber-400 transition-colors">
                  Refund & Cancellation Policy
                </button>
              </li>
              <li>
                <button onClick={() => onOpenLegal && onOpenLegal('cookies')} className="text-slate-400 hover:text-amber-400 transition-colors">
                  Cookie Policy
                </button>
              </li>
              <li>
                <button onClick={() => onOpenLegal && onOpenLegal('about')} className="text-slate-400 hover:text-amber-400 transition-colors">
                  About Us & Address
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Service Locations */}
          <div>
            <h4 className="text-sm font-extrabold text-white uppercase tracking-wider mb-4 border-b border-slate-800 pb-2">
              Top Service Destinations
            </h4>
            <ul className="grid grid-cols-2 gap-2 text-xs font-medium text-slate-400">
              <li className="hover:text-white transition-colors">Mumbai & Pune</li>
              <li className="hover:text-white transition-colors">Delhi & Haridwar</li>
              <li className="hover:text-white transition-colors">Char Dham Yatra</li>
              <li className="hover:text-white transition-colors">12 Jyotirlinga</li>
              <li className="hover:text-white transition-colors">Kashmir Valleys</li>
              <li className="hover:text-white transition-colors">Goa Beaches</li>
              <li className="hover:text-white transition-colors">Gujarat Kutch</li>
              <li className="hover:text-white transition-colors">Rajasthan Forts</li>
            </ul>
          </div>

          {/* Column 4: Official Helpline Contact */}
          <div>
            <h4 className="text-sm font-extrabold text-white uppercase tracking-wider mb-4 border-b border-slate-800 pb-2">
              Official Helpline Support
            </h4>
            <div className="space-y-3 text-xs">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span className="text-slate-300">
                  Headquarters: Plot 44, Express Highway Service Road, Dadar West, Mumbai, Maharashtra 400028
                </span>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <a href="tel:9173746558" className="text-white font-black text-sm hover:text-amber-400">
                  {DISPLAY_PHONE}
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <MessageSquare className="w-4 h-4 text-emerald-400 shrink-0" />
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="text-emerald-400 font-bold hover:underline">
                  WhatsApp Helpline: {DISPLAY_PHONE}
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="text-slate-300">info@siddhivinayaktours.com</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Payments & Copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span>© {new Date().getFullYear()} Siddhivinayak Tours and Travels. All rights reserved.</span>
          </div>

          {/* Accepted Payment Badges */}
          <div className="flex items-center gap-3">
            <span className="text-[10px] uppercase font-bold text-slate-400">Accepted Payments:</span>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-slate-900 text-slate-200 font-bold text-[10px] border border-slate-800">UPI / GPay</span>
              <span className="px-2 py-0.5 rounded bg-slate-900 text-slate-200 font-bold text-[10px] border border-slate-800">Cards</span>
              <span className="px-2 py-0.5 rounded bg-slate-900 text-slate-200 font-bold text-[10px] border border-slate-800">NetBanking</span>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}
