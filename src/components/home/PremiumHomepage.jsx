import React, { useState, useRef, useEffect } from 'react';
import { 
  Car, MapPin, Calendar, Search, Shield, Users, Headphones, 
  User, FileText, CheckCircle2, Flag, Home, Sparkles, Mic, Sun, Moon,
  HelpCircle, ChevronDown, LayoutDashboard, ShieldCheck, Crown, LogOut, LogIn
} from 'lucide-react';
import { useBooking } from '../../context/BookingContext';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';
import { INDIAN_LANGUAGES_ONLY } from '../../data/phase7Data';

export default function PremiumHomepage({ 
  onNavigate, onBookNow, onOpenSupport, onOpenVoiceAI, onOpenPilgrimage 
}) {
  const { bookingData, updateBookingData } = useBooking();
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { language, changeLanguage } = useLanguage();

  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setUserDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Booking search bar state
  const [pickupCity, setPickupCity] = useState(bookingData.pickupCity || '');
  const [destinationCity, setDestinationCity] = useState(bookingData.returnCity || '');
  const [pickupDate, setPickupDate] = useState(bookingData.pickupDate || '');
  const [pickupTime, setPickupTime] = useState(bookingData.pickupTime || '10:00');

  // Handle Golden Search Button submit
  const handleSearchSubmit = (e) => {
    e?.preventDefault();
    updateBookingData({
      pickupCity: pickupCity || 'Mumbai',
      returnCity: destinationCity || 'Pune',
      pickupDate: pickupDate || bookingData.pickupDate,
      pickupTime: pickupTime,
    });
    // Navigate safely to existing Trip Details page / booking flow
    onNavigate('booking');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-amber-400 selection:text-slate-950 overflow-x-hidden">
      
      {/* ========================================================================= */}
      {/* 1. CINEMATIC HERO HOMEPAGE (100% Matching Reference Image)               */}
      {/* ========================================================================= */}
      <section className="relative min-h-screen flex flex-col justify-between overflow-hidden bg-slate-950 pb-8">
        
        {/* BACKGROUND IMAGE & CINEMATIC DARK GRADIENT OVERLAYS */}
        <div className="absolute inset-0 z-0">
          <img
            src="/hero_sunset_highway.jpg"
            alt="Siddhivinayak Luxury Sunset Alpine Highway Ride"
            className="w-full h-full object-cover object-center scale-105 filter brightness-90 transition-transform duration-1000"
          />
          {/* Subtle multi-layer dark cinematic overlays for contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-slate-950/60" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-transparent to-slate-950/70" />
        </div>

        {/* ========================================================================= */}
        {/* 2. FULL INTEGRATED GLASSMORPHISM NAVBAR                                    */}
        {/* ========================================================================= */}
        <header className="relative z-20 pt-3 px-2 sm:px-4 max-w-[98%] mx-auto w-full">
          <div className="w-full bg-slate-900/80 backdrop-blur-2xl border border-white/15 rounded-full px-3 sm:px-4 py-1.5 shadow-2xl flex items-center justify-between gap-1 sm:gap-2 transition-all duration-300">
            
            {/* LEFT: BRAND LOGO */}
            <button 
              onClick={() => onNavigate('home')} 
              className="flex items-center gap-2 group text-left focus:outline-none shrink-0"
            >
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-amber-400 flex items-center justify-center text-slate-950 font-bold shadow-[0_0_12px_rgba(251,191,36,0.4)] group-hover:scale-105 transition-transform">
                <Car className="w-4 h-4 sm:w-5 sm:h-5 text-slate-950 stroke-[2.5]" />
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-xs sm:text-sm tracking-wide text-white group-hover:text-amber-400 transition-colors leading-none">
                  SIDDHIVINAYAK
                </span>
                <span className="text-[8px] tracking-wider uppercase font-bold text-amber-400 mt-0.5 hidden 2xl:inline">
                  TOURS & TRAVELS
                </span>
              </div>
            </button>

            {/* CENTER: FULL NAV LINKS */}
            <nav className="hidden lg:flex items-center gap-0.5 xl:gap-1">
              
              {/* Home */}
              <button
                onClick={() => onNavigate('home')}
                className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-400/20 text-white border border-amber-400/50 text-[11px] xl:text-xs font-semibold shadow-[0_0_10px_rgba(251,191,36,0.25)] transition-all shrink-0"
              >
                <div className="w-3.5 h-3.5 rounded-full bg-amber-400 flex items-center justify-center text-slate-950">
                  <Home className="w-2 h-2 stroke-[3]" />
                </div>
                <span>Home</span>
              </button>

              {/* Trip Details */}
              <button
                onClick={() => onNavigate('booking')}
                className="flex items-center gap-1 px-2 py-1 rounded-full text-slate-200 hover:text-white hover:bg-white/10 text-[11px] xl:text-xs font-medium transition-all shrink-0"
              >
                <FileText className="w-3.5 h-3.5 text-slate-300" />
                <span>Trip Details</span>
              </button>

              {/* Date & Time */}
              <button
                onClick={() => onNavigate('dates')}
                className="flex items-center gap-1 px-2 py-1 rounded-full text-slate-200 hover:text-white hover:bg-white/10 text-[11px] xl:text-xs font-medium transition-all shrink-0"
              >
                <Calendar className="w-3.5 h-3.5 text-slate-300" />
                <span>Date & Time</span>
              </button>

              {/* Review & Book */}
              <button
                onClick={() => onNavigate('cars')}
                className="flex items-center gap-1 px-2 py-1 rounded-full text-slate-200 hover:text-white hover:bg-white/10 text-[11px] xl:text-xs font-medium transition-all shrink-0"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-slate-300" />
                <span>Review & Book</span>
              </button>

              {/* Fleet */}
              <button
                onClick={() => onNavigate('fleet')}
                className="px-2 py-1 rounded-full text-slate-200 hover:text-amber-400 hover:bg-white/10 text-[11px] xl:text-xs font-medium transition-all shrink-0"
              >
                Fleet
              </button>

              {/* Business Hub PRO */}
              <button
                onClick={() => onNavigate('business')}
                className="flex items-center gap-1 px-2 py-1 rounded-full text-slate-200 hover:text-amber-400 hover:bg-white/10 text-[11px] xl:text-xs font-medium transition-all shrink-0"
              >
                <span>Business</span>
                <span className="px-1 py-0.2 text-[8px] font-black rounded-full uppercase bg-amber-500 text-slate-950">
                  PRO
                </span>
              </button>

              {/* Role-Specific Dashboard Link */}
              {user && (
                <button
                  onClick={() => {
                    if (user.role === 'SUPER_ADMIN') onNavigate('super-admin');
                    else if (user.role === 'ADMIN') onNavigate('admin');
                    else onNavigate('dashboard');
                  }}
                  className="flex items-center gap-1 px-2 py-1 rounded-full text-slate-200 hover:text-amber-400 hover:bg-white/10 text-[11px] xl:text-xs font-medium transition-all shrink-0"
                >
                  <span>{user.role === 'SUPER_ADMIN' ? 'Super Admin' : user.role === 'ADMIN' ? 'Admin' : 'Dashboard'}</span>
                  <span className={`px-1 py-0.2 text-[8px] font-black rounded-full uppercase ${
                    user.role === 'SUPER_ADMIN' ? 'bg-purple-500 text-white' :
                    user.role === 'ADMIN' ? 'bg-amber-500 text-slate-950' : 'bg-blue-500 text-white'
                  }`}>
                    {user.role === 'SUPER_ADMIN' ? 'SUPER' : user.role === 'ADMIN' ? 'ADMIN' : 'USER'}
                  </span>
                </button>
              )}

            </nav>

            {/* RIGHT: ALL INTEGRATED ACTION TOOLS */}
            <div className="flex items-center gap-1 shrink-0">
              
              {/* Voice AI Concierge */}
              {onOpenVoiceAI && (
                <button
                  onClick={onOpenVoiceAI}
                  className="px-2 py-1 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-extrabold shadow-md hover:scale-105 transition-transform flex items-center gap-1 text-[11px] shrink-0"
                  title="India Voice AI Concierge"
                >
                  <Mic className="w-3.5 h-3.5" /> <span className="hidden sm:inline">Voice AI</span>
                </button>
              )}

              {/* Pilgrimage & Culture Hub */}
              {onOpenPilgrimage && (
                <button
                  onClick={onOpenPilgrimage}
                  className="px-2 py-1 rounded-full bg-slate-950/80 border border-slate-800 text-amber-400 font-bold hover:bg-slate-900 transition-colors text-[11px] flex items-center gap-1 shrink-0"
                  title="Pilgrimage & Culture"
                >
                  🛕 <span className="hidden md:inline">Pilgrimage</span>
                </button>
              )}

              {/* INR Currency Badge */}
              <div className="hidden 2xl:flex bg-slate-950/80 border border-slate-800 rounded-full px-2 py-0.5 text-amber-400 font-black text-[10px]">
                ₹ INR
              </div>

              {/* Language Switcher */}
              <div className="hidden xl:flex items-center bg-slate-950/80 border border-slate-800 rounded-full px-1.5 py-0.5">
                <select
                  value={language}
                  onChange={(e) => changeLanguage(e.target.value)}
                  className="bg-transparent text-slate-200 text-[11px] font-bold focus:outline-none cursor-pointer max-w-[65px] truncate"
                >
                  {INDIAN_LANGUAGES_ONLY.map(lang => (
                    <option key={lang.code} value={lang.code} className="bg-slate-900">{lang.name}</option>
                  ))}
                </select>
              </div>

              {/* Theme Switcher */}
              <button
                onClick={toggleTheme}
                className="p-1 sm:p-1.5 rounded-full bg-slate-950/80 border border-slate-800 text-amber-400 hover:bg-slate-900 transition-colors shrink-0"
                title="Toggle Light / Dark Mode"
              >
                {theme === 'dark' ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5 text-slate-300" />}
              </button>

              {/* Support Center */}
              {onOpenSupport && (
                <button
                  onClick={onOpenSupport}
                  className="p-1 sm:p-1.5 rounded-full bg-slate-950/80 border border-slate-800 text-slate-200 hover:text-amber-400 transition-colors shrink-0"
                  title="24x7 Customer Support"
                >
                  <HelpCircle className="w-3.5 h-3.5" />
                </button>
              )}

              {/* USER PROFILE DROPDOWN / LOGIN */}
              {!user ? (
                <button
                  onClick={() => onNavigate('login')}
                  className="flex items-center gap-1 px-3 py-1 rounded-full border border-amber-400/80 bg-amber-400/10 text-amber-300 hover:bg-amber-400 hover:text-slate-950 text-xs font-bold transition-all duration-300 shadow-[0_0_10px_rgba(251,191,36,0.2)] shrink-0"
                >
                  <User className="w-3.5 h-3.5" />
                  <span>Login</span>
                </button>
              ) : (
                <div className="relative shrink-0" ref={dropdownRef}>
                  <button
                    onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                    className={`flex items-center gap-1 p-1 rounded-full border transition-all ${
                      userDropdownOpen 
                        ? 'bg-slate-800 border-amber-500/50' 
                        : 'bg-slate-950 border-slate-800 hover:bg-slate-900'
                    }`}
                  >
                    <div className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center font-black text-[10px] sm:text-[11px] shadow-sm ${
                      user.role === 'SUPER_ADMIN' ? 'bg-purple-500 text-white' :
                      user.role === 'ADMIN' ? 'bg-amber-500 text-slate-950' : 'bg-blue-500 text-white'
                    }`}>
                      {user.name ? user.name.charAt(0) : 'U'}
                    </div>
                    
                    <span className="text-xs font-bold text-slate-100 max-w-[60px] truncate hidden sm:inline">
                      {user.name.split(' ')[0]}
                    </span>

                    <ChevronDown className={`w-3 h-3 text-slate-400 transition-transform ${userDropdownOpen ? 'rotate-180 text-amber-400' : ''}`} />
                  </button>

                  {/* Profile Dropdown Menu */}
                  {userDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-52 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl py-2 z-50 animate-in fade-in duration-150">
                      <div className="px-4 py-2 border-b border-slate-800 bg-slate-950/50">
                        <p className="text-xs font-bold text-white truncate">{user.name}</p>
                        <p className="text-[10px] text-slate-400 truncate">{user.email}</p>
                      </div>

                      {user.role === 'SUPER_ADMIN' && (
                        <button
                          onClick={() => { setUserDropdownOpen(false); onNavigate('super-admin'); }}
                          className="w-full text-left px-4 py-2 text-xs font-bold text-slate-300 hover:bg-slate-800 hover:text-white flex items-center gap-2"
                        >
                          <Crown className="w-4 h-4 text-purple-400" /> Super Admin Panel
                        </button>
                      )}

                      {user.role === 'ADMIN' && (
                        <button
                          onClick={() => { setUserDropdownOpen(false); onNavigate('admin'); }}
                          className="w-full text-left px-4 py-2 text-xs font-bold text-slate-300 hover:bg-slate-800 hover:text-white flex items-center gap-2"
                        >
                          <ShieldCheck className="w-4 h-4 text-amber-400" /> Admin Dashboard
                        </button>
                      )}

                      {user.role === 'USER' && (
                        <button
                          onClick={() => { setUserDropdownOpen(false); onNavigate('dashboard'); }}
                          className="w-full text-left px-4 py-2 text-xs font-bold text-slate-300 hover:bg-slate-800 hover:text-white flex items-center gap-2"
                        >
                          <LayoutDashboard className="w-4 h-4 text-blue-400" /> My Dashboard
                        </button>
                      )}

                      <button
                        onClick={() => { setUserDropdownOpen(false); logout(); }}
                        className="w-full text-left px-4 py-2 text-xs font-bold text-rose-400 hover:bg-rose-950/40 flex items-center gap-2"
                      >
                        <LogOut className="w-4 h-4 text-rose-400" /> Logout
                      </button>
                    </div>
                  )}
                </div>
              )}

            </div>

          </div>
        </header>

        {/* ========================================================================= */}
        {/* 3. HERO CONTENT GRID                                                      */}
        {/* ========================================================================= */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-16 w-full flex-grow flex flex-col justify-between">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            
            {/* LEFT COLUMN: MAIN HEADING & TRUST FEATURES */}
            <div className="lg:col-span-7 space-y-6 text-left">
              
              {/* Main Heading */}
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif tracking-normal leading-[1.1] text-white drop-shadow-md">
                Let the Road <br />
                Take You <span className="font-serif italic text-amber-400 drop-shadow-[0_2px_12px_rgba(251,191,36,0.35)]">Further</span>
              </h1>

              {/* Subheading */}
              <p className="text-slate-200 text-sm sm:text-base max-w-md font-normal leading-relaxed drop-shadow">
                Book a comfortable, safe and reliable ride with Siddhivinayak Tours & Travels.
              </p>

              {/* TRUST FEATURES HORIZONTAL ROW */}
              <div className="pt-2 flex flex-wrap items-center gap-6 sm:gap-8">
                
                {/* 1. Safe & Reliable */}
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-slate-950/80 border border-amber-400/60 flex items-center justify-center text-amber-400 shadow-[0_0_10px_rgba(251,191,36,0.2)] shrink-0">
                    <Shield className="w-4 h-4 text-amber-400" />
                  </div>
                  <div className="text-xs font-semibold text-white leading-tight">
                    Safe &<br />Reliable
                  </div>
                </div>

                {/* 2. Experienced Drivers */}
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-slate-950/80 border border-amber-400/60 flex items-center justify-center text-amber-400 shadow-[0_0_10px_rgba(251,191,36,0.2)] shrink-0">
                    <Users className="w-4 h-4 text-amber-400" />
                  </div>
                  <div className="text-xs font-semibold text-white leading-tight">
                    Experienced<br />Drivers
                  </div>
                </div>

                {/* 3. 24/7 Support */}
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-slate-950/80 border border-amber-400/60 flex items-center justify-center text-amber-400 shadow-[0_0_10px_rgba(251,191,36,0.2)] shrink-0">
                    <Headphones className="w-4 h-4 text-amber-400" />
                  </div>
                  <div className="text-xs font-semibold text-white leading-tight">
                    24/7<br />Support
                  </div>
                </div>

              </div>

            </div>

            {/* RIGHT COLUMN: DECORATIVE SCRIPT CALLIGRAPHY */}
            <div className="hidden lg:flex lg:col-span-5 flex-col items-end justify-center pr-6">
              <div className="text-right font-serif italic text-2xl lg:text-3xl text-slate-100 leading-snug drop-shadow-xl space-y-0.5">
                <p>Good</p>
                <p>Journeys</p>
                <p>Create</p>
                <p className="font-extrabold not-italic text-amber-300">Great Stories</p>
                
                {/* Curved Golden Underline Accent */}
                <div className="w-32 ml-auto pt-1">
                  <svg viewBox="0 0 140 18" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
                    <path d="M4 12C45 4 95 4 136 14" stroke="#FBBF24" strokeWidth="2.5" strokeLinecap="round" />
                  </svg>
                </div>
              </div>
            </div>

          </div>

          {/* ========================================================================= */}
          {/* 4. FLOATING GLASSMORPHISM BOOKING BAR                                     */}
          {/* ========================================================================= */}
          <div className="mt-10 mb-4 w-full">
            <form 
              onSubmit={handleSearchSubmit}
              className="bg-slate-950/70 backdrop-blur-2xl border border-white/15 rounded-3xl lg:rounded-full p-2.5 px-4 sm:px-6 shadow-[0_20px_50px_rgba(0,0,0,0.8)] flex flex-col lg:flex-row items-center justify-between gap-3 transition-all hover:border-white/25"
            >
              
              {/* FIELD 1: FROM */}
              <div className="flex items-center gap-3.5 flex-1 min-w-0 w-full px-2 py-1">
                <div className="w-11 h-11 rounded-full bg-slate-900 border border-white/10 flex items-center justify-center text-white shrink-0 shadow-inner">
                  <MapPin className="w-5 h-5 text-white" />
                </div>
                <div className="flex flex-col text-left flex-grow min-w-0">
                  <label className="text-[11px] font-medium text-slate-400">From</label>
                  <input
                    type="text"
                    value={pickupCity}
                    onChange={(e) => setPickupCity(e.target.value)}
                    placeholder="Enter pickup location"
                    className="bg-transparent text-sm font-semibold text-white focus:outline-none placeholder:text-slate-400 w-full truncate"
                  />
                </div>
              </div>

              {/* Vertical Glass Divider */}
              <div className="hidden lg:block h-10 w-px bg-white/15 shrink-0" />

              {/* FIELD 2: TO */}
              <div className="flex items-center gap-3.5 flex-1 min-w-0 w-full px-2 py-1">
                <div className="w-11 h-11 rounded-full bg-slate-900 border border-white/10 flex items-center justify-center text-white shrink-0 shadow-inner">
                  <Flag className="w-5 h-5 text-white" />
                </div>
                <div className="flex flex-col text-left flex-grow min-w-0">
                  <label className="text-[11px] font-medium text-slate-400">To</label>
                  <input
                    type="text"
                    value={destinationCity}
                    onChange={(e) => setDestinationCity(e.target.value)}
                    placeholder="Where are you going?"
                    className="bg-transparent text-sm font-semibold text-white focus:outline-none placeholder:text-slate-400 w-full truncate"
                  />
                </div>
              </div>

              {/* Vertical Glass Divider */}
              <div className="hidden lg:block h-10 w-px bg-white/15 shrink-0" />

              {/* FIELD 3: DATE & TIME */}
              <div className="flex items-center gap-3.5 flex-1 min-w-0 w-full px-2 py-1">
                <div className="w-11 h-11 rounded-full bg-slate-900 border border-white/10 flex items-center justify-center text-white shrink-0 shadow-inner">
                  <Calendar className="w-5 h-5 text-white" />
                </div>
                <div className="flex flex-col text-left flex-grow min-w-0">
                  <label className="text-[11px] font-medium text-slate-400">Date & Time</label>
                  <div className="flex flex-wrap sm:flex-nowrap items-center gap-1.5 sm:gap-2">
                    <input
                      type="date"
                      value={pickupDate}
                      onChange={(e) => setPickupDate(e.target.value)}
                      className="bg-transparent text-xs font-semibold text-white focus:outline-none cursor-pointer max-w-[130px]"
                    />
                    <span className="text-slate-500 text-xs hidden sm:inline">|</span>
                    <input
                      type="time"
                      value={pickupTime}
                      onChange={(e) => setPickupTime(e.target.value)}
                      className="bg-transparent text-xs font-semibold text-white focus:outline-none cursor-pointer max-w-[100px]"
                    />
                  </div>
                </div>
              </div>

              {/* SEARCH ACTION BUTTON: PERFECT CIRCULAR GOLDEN BUTTON ON DESKTOP */}
              <button
                type="submit"
                className="w-full lg:w-14 h-14 rounded-full bg-amber-400 hover:bg-amber-300 text-slate-950 font-black shadow-[0_0_20px_rgba(245,158,11,0.4)] transition-transform hover:scale-105 flex items-center justify-center gap-2 shrink-0 cursor-pointer"
                title="Search Available Rides"
              >
                <Search className="w-6 h-6 text-slate-950 stroke-[2.5]" />
                <span className="lg:hidden text-xs font-bold uppercase tracking-wider">Search Rides</span>
              </button>

            </form>
          </div>

          {/* ========================================================================= */}
          {/* 5. BOTTOM TAGLINE                                                         */}
          {/* ========================================================================= */}
          <div className="flex items-center justify-between border-t border-white/10 pt-3 text-xs font-semibold text-slate-400">
            <div className="flex items-center gap-3 tracking-[0.25em] uppercase text-[11px]">
              <span className="w-6 h-0.5 bg-amber-400 inline-block rounded-full"></span>
              <span className="hover:text-amber-400 transition-colors">TRAVEL</span>
              <span>•</span>
              <span className="hover:text-amber-400 transition-colors">EXPLORE</span>
              <span>•</span>
              <span className="hover:text-amber-400 transition-colors">DISCOVER</span>
            </div>
            
            <div className="hidden sm:flex items-center gap-2 text-slate-400 text-[11px]">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Siddhivinayak Mobility Platform</span>
            </div>
          </div>

        </div>

      </section>

    </div>
  );
}
