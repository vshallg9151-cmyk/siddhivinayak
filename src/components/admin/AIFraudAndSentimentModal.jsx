import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShieldAlert, Sparkles, ThumbsUp, ThumbsDown, CheckCircle2 } from 'lucide-react';
import { REVIEW_SENTIMENT_ANALYSIS } from '../../data/phase7Data';

export default function AIFraudAndSentimentModal({ isOpen, onClose }) {
  if (!isOpen) return null;

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
                <Sparkles className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                  AI Fraud Detection & Review Sentiment Intelligence
                  <span className="text-xs bg-emerald-500/20 text-emerald-400 font-bold px-2 py-0.5 rounded-full border border-emerald-500/30">
                    Live Guard
                  </span>
                </h3>
                <p className="text-xs text-slate-400">Automated payment threat monitoring & customer review sentiment models</p>
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
            
            {/* AI Fraud Detection Status */}
            <div className="bg-slate-950 p-5 rounded-2xl border border-emerald-500/30 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-sm text-slate-100 flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4 text-emerald-400" /> AI Fraud & Abuse Protection Status
                </h4>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-400 font-bold px-2.5 py-0.5 rounded-full border border-emerald-500/30">
                  0 Fraud Alerts Detected
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2 text-center text-xs">
                <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800">
                  <span className="text-[10px] text-slate-400 block font-bold">Payments Shield</span>
                  <strong className="text-emerald-400">Clean (0 Flags)</strong>
                </div>
                <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800">
                  <span className="text-[10px] text-slate-400 block font-bold">Coupon Abuse</span>
                  <strong className="text-emerald-400">Protected</strong>
                </div>
                <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800">
                  <span className="text-[10px] text-slate-400 block font-bold">Review Authenticator</span>
                  <strong className="text-emerald-400">100% Verified</strong>
                </div>
              </div>
            </div>

            {/* AI Review Sentiment Model */}
            <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4">
              <div className="flex justify-between items-center">
                <h4 className="font-bold text-sm text-slate-100">Customer Review Sentiment Analysis</h4>
                <span className="text-xs font-bold text-amber-400 bg-amber-500/10 px-2.5 py-0.5 rounded-full border border-amber-500/30">
                  Score: {REVIEW_SENTIMENT_ANALYSIS.serviceQualityScore} / 10
                </span>
              </div>

              <div className="p-3 bg-emerald-950/20 border border-emerald-900/30 rounded-xl text-xs font-bold text-emerald-300">
                {REVIEW_SENTIMENT_ANALYSIS.overallSentiment}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h5 className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                    <ThumbsUp className="w-3.5 h-3.5" /> Top Customer Praise (Pros)
                  </h5>
                  <ul className="space-y-1 text-xs text-slate-300">
                    {REVIEW_SENTIMENT_ANALYSIS.pros.map((p, idx) => (
                      <li key={idx} className="flex items-start gap-1">
                        <span className="text-emerald-400">✓</span> {p}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-2">
                  <h5 className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
                    <ThumbsDown className="w-3.5 h-3.5" /> Improvement Insights (Cons)
                  </h5>
                  <ul className="space-y-1 text-xs text-slate-300">
                    {REVIEW_SENTIMENT_ANALYSIS.cons.map((c, idx) => (
                      <li key={idx} className="flex items-start gap-1">
                        <span className="text-amber-400">•</span> {c}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
