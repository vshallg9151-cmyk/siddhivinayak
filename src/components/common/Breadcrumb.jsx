import React from 'react';
import { ChevronRight, Home } from 'lucide-react';

export default function Breadcrumb({ items, onNavigate }) {
  return (
    <nav className="flex items-center gap-2 text-xs font-semibold text-slate-500 py-3 mb-4 overflow-x-auto">
      <button
        onClick={() => onNavigate('home')}
        className="flex items-center gap-1 hover:text-brand-blue transition-colors shrink-0"
      >
        <Home className="w-3.5 h-3.5 text-slate-400" />
        <span>Home</span>
      </button>

      {items.map((item, idx) => (
        <React.Fragment key={idx}>
          <ChevronRight className="w-3.5 h-3.5 text-slate-300 shrink-0" />
          {item.page ? (
            <button
              onClick={() => onNavigate(item.page, item.data)}
              className="hover:text-brand-blue transition-colors shrink-0 text-slate-600"
            >
              {item.label}
            </button>
          ) : (
            <span className="text-brand-navy font-bold shrink-0">{item.label}</span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
}
