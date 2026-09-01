import React from 'react';
import Breadcrumb from '../common/Breadcrumb';
import ComparisonTable from './ComparisonTable';
import { Scale, Car, Plus, ArrowLeft, Sparkles } from 'lucide-react';

export default function ComparePage({ compareList, onNavigate, onRemoveFromCompare, onSelectCarForBooking }) {
  return (
    <div className="pt-24 pb-20 bg-brand-bgLight min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <Breadcrumb
          items={[
            { label: 'Our Fleet', page: 'fleet' },
            { label: 'Vehicle Comparison' }
          ]}
          onNavigate={onNavigate}
        />

        {/* Page Top Heading */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 border-b border-slate-200 pb-6">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-widest text-brand-blue bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
              Smart Vehicle Comparison Tool
            </span>
            <h1 className="text-3xl sm:text-5xl font-black text-brand-navy mt-2 tracking-tight">
              Compare Cars Side-by-Side
            </h1>
            <p className="text-slate-600 text-sm mt-1">
              Evaluate pricing, seating capacity, engine output, mileage, and features to choose the perfect car for your journey.
            </p>
          </div>

          <button
            onClick={() => onNavigate('fleet')}
            className="px-5 py-2.5 rounded-2xl bg-white border border-slate-200 hover:border-brand-navy text-slate-800 font-bold text-xs shadow-sm transition-all flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Fleet Browsing</span>
          </button>
        </div>

        {/* Main Content */}
        {compareList && compareList.length >= 1 ? (
          <ComparisonTable
            compareList={compareList}
            onRemoveCar={onRemoveFromCompare}
            onSelectCarForBooking={onSelectCarForBooking}
          />
        ) : (
          <div className="bg-white rounded-3xl p-16 text-center border border-slate-200 max-w-2xl mx-auto my-12">
            <Scale className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-slate-800">No vehicles selected for comparison</h3>
            <p className="text-xs text-slate-500 mt-2 mb-6">
              Browse our fleet and click "+ Compare" on any 2 or 3 cars to view their specifications side-by-side.
            </p>
            <button
              onClick={() => onNavigate('fleet')}
              className="px-6 py-3 rounded-2xl bg-brand-navy text-brand-gold font-extrabold text-xs shadow-luxury"
            >
              Go to Our Fleet
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
