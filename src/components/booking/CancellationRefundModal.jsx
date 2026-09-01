import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, AlertTriangle, ShieldCheck, CheckCircle2, DollarSign, Clock, RefreshCw } from 'lucide-react';

export default function CancellationRefundModal({ isOpen, onClose, booking, onConfirmCancellation }) {
  const [reason, setReason] = useState('Change of travel plans');
  const [isCancelled, setIsCancelled] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen || !booking) return null;

  const total = booking.totalPrice || 12499;
  const refundAmount = Math.round(total * 0.9); // 90% refund policy
  const feeAmount = total - refundAmount;

  const handleCancelBooking = (e) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      setIsCancelled(true);
      if (onConfirmCancellation) {
        onConfirmCancellation({
          ...booking,
          status: 'CANCELLED',
          refundStatus: 'REFUND_PROCESSING',
          refundAmount
        });
      }
    }, 1200);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl flex flex-col"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-slate-900 via-rose-950/30 to-slate-900 p-5 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-rose-500/20 text-rose-400 rounded-2xl border border-rose-500/30">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-100">Booking Cancellation & Refund</h3>
                <p className="text-xs text-slate-400">Order Code: {booking.bookingId || 'BK-2026'}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white bg-slate-800 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {!isCancelled ? (
            <form onSubmit={handleCancelBooking} className="p-6 space-y-6 text-slate-100">
              
              {/* Cancellation Policy Banner */}
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
                <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4" /> Cancellation Policy Breakdown
                </h4>
                <div className="space-y-1 text-xs text-slate-300">
                  <p>• Original Booking Price: <strong className="text-slate-100">₹{total.toLocaleString()}</strong></p>
                  <p>• Cancellation Processing Fee (10%): <span className="text-rose-400">₹{feeAmount.toLocaleString()}</span></p>
                  <p className="pt-1 border-t border-slate-800 font-bold text-sm">
                    Eligible Instant Refund: <span className="text-emerald-400">₹{refundAmount.toLocaleString()}</span>
                  </p>
                </div>
              </div>

              {/* Reason Selector */}
              <div>
                <label className="text-xs text-slate-400 font-bold uppercase tracking-wider block mb-1">Reason for Cancellation</label>
                <select
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className="w-full bg-slate-950 text-slate-100 text-xs font-semibold p-3 rounded-xl border border-slate-800 focus:outline-none focus:border-amber-500"
                >
                  <option value="Change of travel plans">Change of travel plans</option>
                  <option value="Emergency medical situation">Emergency medical situation</option>
                  <option value="Weather / Flight cancellation">Weather / Flight cancellation</option>
                  <option value="Found alternative transport">Found alternative transport</option>
                </select>
              </div>

              {/* Submit Cancellation Button */}
              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs rounded-xl transition-colors"
                >
                  Keep Booking
                </button>
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="flex-1 py-3 bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs rounded-xl shadow-lg transition-colors flex items-center justify-center gap-2"
                >
                  {isProcessing ? <RefreshCw className="w-4 h-4 animate-spin" /> : 'Confirm Cancellation'}
                </button>
              </div>
            </form>
          ) : (
            <div className="p-8 text-center space-y-5">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border-2 border-emerald-500/40">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-100">Cancellation Confirmed</h3>
                <p className="text-xs text-slate-400 mt-1">Refund of <strong className="text-emerald-400">₹{refundAmount.toLocaleString()}</strong> initiated.</p>
              </div>

              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 text-left text-xs space-y-2">
                <div className="flex items-center gap-2 text-amber-400 font-bold">
                  <Clock className="w-4 h-4" /> Refund Status: PROCESSING
                </div>
                <p className="text-slate-400">Expected to reflect in your original payment source within 24–48 banking hours.</p>
              </div>

              <button
                onClick={onClose}
                className="w-full py-3 bg-amber-500 text-slate-950 font-bold rounded-xl text-xs"
              >
                Close & Return to Dashboard
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
