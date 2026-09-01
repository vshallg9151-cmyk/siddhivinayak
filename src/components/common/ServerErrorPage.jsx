import React from 'react';
import { AlertTriangle, RefreshCw, PhoneCall } from 'lucide-react';
import { DISPLAY_PHONE } from '../../utils/whatsappHelper';

export default function ServerErrorPage({ onReload }) {
  return (
    <div className="min-h-[80vh] flex items-center justify-center p-6 bg-slate-950 text-slate-100 font-sans">
      <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-3xl p-8 text-center space-y-6 shadow-2xl">
        <div className="w-20 h-20 mx-auto rounded-3xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400">
          <AlertTriangle className="w-10 h-10 animate-pulse" />
        </div>

        <div className="space-y-2">
          <h1 className="text-4xl font-black text-rose-400">500</h1>
          <h2 className="text-xl font-bold text-slate-100">System Maintenance</h2>
          <p className="text-xs text-slate-400 leading-relaxed">
            Our booking servers are currently undergoing scheduled optimization. Please try refreshing or contact helpline.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <button
            onClick={onReload || (() => window.location.reload())}
            className="flex-1 py-3 bg-amber-500 text-slate-950 font-bold rounded-2xl text-xs flex items-center justify-center gap-2 shadow-md"
          >
            <RefreshCw className="w-4 h-4" /> Try Reloading
          </button>
          <a
            href="tel:9173746558"
            className="flex-1 py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold rounded-2xl text-xs flex items-center justify-center gap-2 border border-slate-700"
          >
            <PhoneCall className="w-4 h-4 text-emerald-400" /> {DISPLAY_PHONE}
          </a>
        </div>
      </div>
    </div>
  );
}
