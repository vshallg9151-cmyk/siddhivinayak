import React from 'react';
import BookingCard from './BookingCard';
import { ShieldCheck, Star, Award, MapPin, Sparkles } from 'lucide-react';

export default function Hero({ onSearch }) {
  return (
    <section id="home" className="relative min-h-screen pt-28 pb-16 flex flex-col justify-between overflow-hidden bg-brand-navy">
      
      {/* Background Image Container with Overlay Gradients */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=2000&q=90"
          alt="Premium SUV Thar driving through mountain highway road"
          className="w-full h-full object-cover object-center scale-105 filter brightness-75 transition-transform duration-1000"
        />
        {/* Dark Navy to Transparent Cinematic Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-navy via-brand-navy/60 to-brand-navy/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-navy/90 via-transparent to-brand-navy/70" />
      </div>

      {/* Floating Ambient Glowing Orbs */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-brand-blue/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-brand-gold/15 rounded-full blur-3xl pointer-events-none" />

      {/* Content Wrapper */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 text-center flex flex-col items-center">
        
        {/* Top Premium Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-slate-100 text-xs sm:text-sm font-semibold mb-6 shadow-luxury">
          <Sparkles className="w-4 h-4 text-brand-gold" />
          <span>India’s Most Trusted Premium Mobility Platform</span>
          <span className="w-1.5 h-1.5 rounded-full bg-brand-gold"></span>
          <span className="text-brand-gold font-bold">50,000+ Journeys Completed</span>
        </div>

        {/* Cinematic Headline */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.1] max-w-4xl mb-6">
          Drive Your Journey, <br className="hidden sm:block" />
          <span className="bg-gradient-to-r from-brand-gold via-yellow-200 to-amber-400 bg-clip-text text-transparent drop-shadow-sm">
            Create Memories
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-lg lg:text-xl text-slate-200 max-w-3xl font-normal leading-relaxed mb-10 text-shadow-sm">
          Premium self-drive and chauffeur-driven car rentals across India with transparent pricing, well-maintained vehicles, and 24×7 roadside customer support.
        </p>

        {/* Booking Card Overlay */}
        <BookingCard onSearch={onSearch} />

        {/* Micro Trust Proof Bar Below Card */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-10 text-slate-300 border-t border-white/10 pt-8 w-full max-w-4xl">
          <div className="flex flex-col items-center">
            <span className="text-2xl sm:text-3xl font-extrabold text-white">4.9 ★</span>
            <span className="text-xs text-slate-400 font-medium">Google & Tripadvisor Rating</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-2xl sm:text-3xl font-extrabold text-brand-gold">100%</span>
            <span className="text-xs text-slate-400 font-medium">Verified Vehicles</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-2xl sm:text-3xl font-extrabold text-white">25+</span>
            <span className="text-xs text-slate-400 font-medium">Major Indian Cities</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-2xl sm:text-3xl font-extrabold text-emerald-400">₹0</span>
            <span className="text-xs text-slate-400 font-medium">Hidden Charges Guarantee</span>
          </div>
        </div>

      </div>

    </section>
  );
}
