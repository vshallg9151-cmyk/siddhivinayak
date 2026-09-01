import React from 'react';
import Breadcrumb from '../common/Breadcrumb';
import CarGallery from './CarGallery';
import SpecificationCard from './SpecificationCard';
import FeatureCard from './FeatureCard';
import BookingSummary from './BookingSummary';
import PoliciesSection from './PoliciesSection';
import SimilarCars from './SimilarCars';
import { Star, ShieldCheck, Heart, Scale, Share2, Sparkles, CheckCircle2 } from 'lucide-react';
import { FLEET_CARS } from '../../data/mockData';

export default function CarDetailsPage({
  car: propCar,
  onNavigate,
  onViewDetails,
  onBookNow,
  onContinueBooking,
  wishlist = [],
  onToggleWishlist,
  compareList = [],
  onToggleCompare
}) {
  // Robust Fallback: Default to FLEET_CARS[0] if car is null/undefined
  const car = propCar || FLEET_CARS[0];
  const safeWishlist = Array.isArray(wishlist) ? wishlist : [];
  const safeCompareList = Array.isArray(compareList) ? compareList : [];

  const isWishlisted = safeWishlist.some(item => item && item.id === car.id);
  const isComparing = safeCompareList.some(item => item && item.id === car.id);

  return (
    <div className="pt-24 pb-20 bg-brand-bgLight min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <Breadcrumb
          items={[
            { label: 'Our Fleet', page: 'fleet' },
            { label: car.name }
          ]}
          onNavigate={onNavigate}
        />

        {/* Page Top Title Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-brand-navy text-brand-gold">
                {car.category || 'SUV'}
              </span>
              <span className="text-xs font-bold text-slate-500">{car.brand} {car.model} ({car.year || 2026})</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-brand-navy">{car.name}</h1>
            <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">{car.tagline || 'Premium self-drive vehicle available across major Indian cities.'}</p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onToggleWishlist && onToggleWishlist(car)}
              className={`p-3 rounded-2xl border flex items-center gap-2 text-xs font-bold transition-all ${
                isWishlisted
                  ? 'bg-rose-500 text-white border-rose-500 shadow-md'
                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-white' : ''}`} />
              <span>{isWishlisted ? 'Wishlisted' : 'Add to Wishlist'}</span>
            </button>

            <button
              onClick={() => onToggleCompare && onToggleCompare(car)}
              className={`p-3 rounded-2xl border flex items-center gap-2 text-xs font-bold transition-all ${
                isComparing
                  ? 'bg-brand-navy text-brand-gold border-brand-navy shadow-md'
                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              <Scale className="w-4 h-4" />
              <span>{isComparing ? 'Comparing ✓' : '+ Compare'}</span>
            </button>
          </div>
        </div>

        {/* Main Grid: Left Details + Right Booking Box */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Gallery, Specs & Features */}
          <div className="lg:col-span-2 space-y-8">
            <CarGallery car={car} />
            <SpecificationCard car={car} />
            <FeatureCard car={car} />
            <PoliciesSection />
          </div>

          {/* Right Column: Sticky Booking Summary Box */}
          <div className="lg:col-span-1">
            <BookingSummary car={car} onContinueBooking={onBookNow || onContinueBooking} />
          </div>

        </div>

        {/* Similar Cars Section */}
        <div className="mt-16 pt-12 border-t border-slate-200">
          <SimilarCars
            currentCar={car}
            onViewDetails={onViewDetails}
            onBookNow={onBookNow}
            wishlist={safeWishlist}
            onToggleWishlist={onToggleWishlist}
            compareList={safeCompareList}
            onToggleCompare={onToggleCompare}
          />
        </div>

      </div>
    </div>
  );
}
