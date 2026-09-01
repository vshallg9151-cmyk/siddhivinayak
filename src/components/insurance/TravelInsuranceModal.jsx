import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShieldCheck, Check, Download, HeartPulse, Luggage, DollarSign, FileText } from 'lucide-react';
import { INSURANCE_PLANS } from '../../data/phase7Data';

export default function TravelInsuranceModal({ isOpen, onClose }) {
  const [selectedPlan, setSelectedPlan] = useState(INSURANCE_PLANS[1]);
  const [purchased, setPurchased] = useState(false);

  if (!isOpen) return null;

  const handlePurchase = () => {
    setPurchased(true);
    setTimeout(() => {
      setPurchased(false);
      onClose();
    }, 1500);
  };

  const handleDownloadPolicy = () => {
    let text = `SIDDHIVINAYAK TRAVEL INSURANCE POLICY\n`;
    text += `Plan: ${selectedPlan.name}\n`;
    text += `Coverage Amount: ${selectedPlan.coverageAmount}\n`;
    text += `Medical: ${selectedPlan.medicalCoverage}\n`;
    text += `Baggage Loss: ${selectedPlan.baggageLoss}\n`;
    text += `Trip Cancellation: ${selectedPlan.tripCancellation}\n`;

    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Policy_${selectedPlan.id}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh]"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-slate-900 via-amber-950/40 to-slate-900 p-5 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-amber-500/20 text-amber-400 rounded-2xl border border-amber-500/30">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-100">Travel Insurance & Medical Protection</h3>
                <p className="text-xs text-slate-400">Cashless hospitalization, trip cancellation & baggage protection</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white bg-slate-800 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar text-slate-100">
            
            {/* Plan Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {INSURANCE_PLANS.map(plan => (
                <div
                  key={plan.id}
                  onClick={() => setSelectedPlan(plan)}
                  className={`p-5 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between space-y-3 ${
                    selectedPlan.id === plan.id
                      ? 'bg-amber-500/10 border-amber-500 shadow-xl'
                      : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="space-y-1">
                    {plan.recommended && (
                      <span className="text-[10px] bg-amber-500 text-slate-950 font-black px-2 py-0.5 rounded-md uppercase">
                        Recommended
                      </span>
                    )}
                    <h4 className="font-bold text-base text-slate-100 mt-1">{plan.name}</h4>
                    <p className="text-xs text-emerald-400 font-bold">Max Coverage: {plan.coverageAmount}</p>
                  </div>

                  <div className="space-y-1.5 text-xs text-slate-300">
                    <p className="flex items-center gap-1.5">✓ {plan.medicalCoverage}</p>
                    <p className="flex items-center gap-1.5">✓ Baggage: {plan.baggageLoss}</p>
                    <p className="flex items-center gap-1.5">✓ Cancellation: {plan.tripCancellation}</p>
                  </div>

                  <div className="pt-3 border-t border-slate-800/80 flex justify-between items-center">
                    <span className="text-lg font-black text-amber-400">₹{plan.pricePerDay}<span className="text-xs text-slate-400">/day</span></span>
                    <span className="text-xs font-bold text-amber-300">{selectedPlan.id === plan.id ? 'Selected' : 'Select Plan'}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Action Bar */}
            <div className="pt-4 border-t border-slate-800 flex justify-between items-center gap-3">
              <button
                onClick={handleDownloadPolicy}
                className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-xl border border-slate-700 flex items-center gap-1.5"
              >
                <Download className="w-4 h-4 text-amber-400" /> Download Wording PDF
              </button>

              <button
                onClick={handlePurchase}
                className="px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl flex items-center gap-1.5"
              >
                {purchased ? <Check className="w-4 h-4" /> : <ShieldCheck className="w-4 h-4" />}
                {purchased ? 'Insurance Added!' : 'Add Insurance to Booking'}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
