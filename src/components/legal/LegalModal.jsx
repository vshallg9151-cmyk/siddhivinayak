import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShieldCheck, FileText, Lock, RefreshCw, HelpCircle, PhoneCall, Building2 } from 'lucide-react';
import { DISPLAY_PHONE } from '../../utils/whatsappHelper';

export default function LegalModal({ isOpen, onClose, initialTab = 'privacy' }) {
  const [activeTab, setActiveTab] = useState(initialTab); // 'privacy' | 'terms' | 'refund' | 'cookies' | 'about'

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-4xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh]"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-slate-900 via-amber-950/40 to-slate-900 p-5 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-amber-500/20 text-amber-400 rounded-2xl border border-amber-500/30">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                  Legal, Trust & Compliance Center
                  <span className="text-xs bg-emerald-500/20 text-emerald-400 font-bold px-2 py-0.5 rounded-full border border-emerald-500/30">
                    Official & Verified
                  </span>
                </h3>
                <p className="text-xs text-slate-400">Siddhivinayak Tours & Travels (GSTIN: 27AAAAA0000A1Z5)</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white bg-slate-800 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Tabs */}
          <div className="bg-slate-950 p-3 border-b border-slate-800 flex items-center gap-2 overflow-x-auto no-scrollbar">
            {[
              { key: 'privacy', label: 'Privacy Policy' },
              { key: 'terms', label: 'Terms & Conditions' },
              { key: 'refund', label: 'Refund & Cancellation Policy' },
              { key: 'cookies', label: 'Cookie Policy' },
              { key: 'about', label: 'About Us' }
            ].map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                  activeTab === tab.key
                    ? 'bg-amber-500 text-slate-950 font-black shadow-md'
                    : 'text-slate-400 hover:text-white hover:bg-slate-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar text-xs text-slate-300 leading-relaxed">
            
            {activeTab === 'privacy' && (
              <div className="space-y-3">
                <h4 className="text-sm font-bold text-amber-400">🔒 Privacy Policy</h4>
                <p>Siddhivinayak Tours & Travels values user privacy. We encrypt customer information (Name, Email, Phone, Booking Details) using 256-bit SSL encryption.</p>
                <p>We collect essential information to process tour package bookings, outstation cab reservations, and send automated WhatsApp/SMS confirmations to <strong>{DISPLAY_PHONE}</strong>.</p>
                <p>Your personal data is never sold or rented to third-party marketing companies.</p>
              </div>
            )}

            {activeTab === 'terms' && (
              <div className="space-y-3">
                <h4 className="text-sm font-bold text-amber-400">📜 Terms & Conditions</h4>
                <p>1. All car rentals (Mahindra Thar 4x4, Innova Crysta, Fortuner) require a valid Indian Driving License & Aadhaar ID proof.</p>
                <p>2. Fuel, tolls, and parking taxes are paid by the customer unless explicitly specified in inclusive tour packages.</p>
                <p>3. Over-speeding (&gt;80 km/h) or rash driving will incur automated telematics safety alerts.</p>
              </div>
            )}

            {activeTab === 'refund' && (
              <div className="space-y-3">
                <h4 className="text-sm font-bold text-amber-400">💸 Refund & Cancellation Policy</h4>
                <p>• <strong>More than 7 days before pickup:</strong> 100% full refund credited to original payment method.</p>
                <p>• <strong>3 to 7 days before pickup:</strong> 80% refund (20% advance retained).</p>
                <p>• <strong>Less than 48 hours before pickup:</strong> 50% refund.</p>
                <p>Refunds are processed within 24–48 banking hours. For refund queries, contact our WhatsApp helpline at <strong>{DISPLAY_PHONE}</strong>.</p>
              </div>
            )}

            {activeTab === 'cookies' && (
              <div className="space-y-3">
                <h4 className="text-sm font-bold text-amber-400">🍪 Cookie Policy</h4>
                <p>We use essential cookies and local browser storage to remember your dark/light theme preference, currency selections, selected cars, and active login sessions.</p>
              </div>
            )}

            {activeTab === 'about' && (
              <div className="space-y-3">
                <h4 className="text-sm font-bold text-amber-400">🏢 About Siddhivinayak Tours & Travels</h4>
                <p>Siddhivinayak Tours & Travels is India’s premier AI-powered luxury tour operator and car rental service based in Mumbai & Pune, Maharashtra.</p>
                <p>We specialize in Char Dham Yatra, 12 Jyotirlinga Darshan, Gujarat Rann Utsav, Kashmir Paradise Holidays, and luxury SUV outstation rentals.</p>
                <p>📍 Office: Plot 44, Express Highway Service Road, Dadar West, Mumbai - 400028.</p>
              </div>
            )}

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
