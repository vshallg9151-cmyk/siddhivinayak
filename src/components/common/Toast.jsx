import React from 'react';
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react';

export default function Toast({ message, type = 'success', onClose }) {
  if (!message) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-5 duration-300">
      <div className={`flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-2xl border backdrop-blur-md ${
        type === 'success'
          ? 'bg-slate-900/95 text-white border-brand-gold/40'
          : 'bg-rose-900/95 text-white border-rose-500/40'
      }`}>
        {type === 'success' ? (
          <CheckCircle className="w-5 h-5 text-brand-gold shrink-0" />
        ) : (
          <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />
        )}
        <span className="text-xs sm:text-sm font-extrabold tracking-wide">{message}</span>
        <button onClick={onClose} className="p-1 hover:bg-white/10 rounded-full text-slate-400 hover:text-white">
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
