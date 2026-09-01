import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, Calendar, Users, DollarSign, Car, Hotel, Utensils, Compass, 
  Clock, Download, Printer, Share2, Bookmark, CheckCircle2, AlertCircle, 
  MapPin, ShieldCheck, ChevronRight, Luggage, Sun, Fuel, Plane, Train, Bus
} from 'lucide-react';
import WeatherWidget from '../weather/WeatherWidget';
import PackingChecklistModal from './PackingChecklistModal';
import DestinationInsightsModal from '../destinations/DestinationInsightsModal';
import NearbyDiscoveryModal from '../destinations/NearbyDiscoveryModal';
import InteractiveMap from '../maps/InteractiveMap';
import AIHotelRankings from '../rankings/AIHotelRankings';
import AIRestaurantRankings from '../rankings/AIRestaurantRankings';

export default function AIPersonalizedPlannerPage({ onSaveTripToDashboard }) {
  // Form State
  const [destination, setDestination] = useState('Lonavala');
  const [days, setDays] = useState(3);
  const [adults, setAdults] = useState(2);
  const [childrenCount, setChildrenCount] = useState(1);
  const [seniors, setSeniors] = useState(0);
  const [budgetTier, setBudgetTier] = useState('Standard'); // 'Luxury' | 'Standard' | 'Budget'
  const [transportMode, setTransportMode] = useState('Cab'); // 'Cab' | 'Self-Drive' | 'Flight' | 'Train' | 'Bus'
  const [hotelCategory, setHotelCategory] = useState('4 Star'); // '5 Star' | '4 Star' | '3 Star' | 'Heritage' | 'Homestay'
  const [foodPref, setFoodPref] = useState('Vegetarian'); // 'Vegetarian' | 'Non-Vegetarian' | 'Jain' | 'Vegan'
  const [theme, setTheme] = useState('Family'); // 'Nature' | 'Religious' | 'Honeymoon' | 'Family' | 'Solo' | 'Friends' | 'Photography' | 'Shopping' | 'Nightlife' | 'Adventure'

  const [currency, setCurrency] = useState('INR'); // 'INR' | 'USD' | 'EUR'
  const [isGenerating, setIsGenerating] = useState(false);
  const [itinerary, setItinerary] = useState(null);

  // Modals state
  const [isPackingOpen, setIsPackingOpen] = useState(false);
  const [isInsightsOpen, setIsInsightsOpen] = useState(false);
  const [isNearbyOpen, setIsNearbyOpen] = useState(false);

  const totalTravelers = adults + childrenCount + seniors;

  const handleGenerateItinerary = (e) => {
    e?.preventDefault();
    setIsGenerating(true);

    setTimeout(() => {
      // Calculate itemized budget
      const multiplier = budgetTier === 'Luxury' ? 2.2 : budgetTier === 'Standard' ? 1.0 : 0.6;
      
      const hotelCost = Math.round((hotelCategory.includes('5') ? 10000 : hotelCategory.includes('4') ? 5500 : 3200) * days * multiplier);
      
      let transportCost = 0;
      let flightCost = 0;
      let trainCost = 0;
      let busCost = 0;
      let taxiCost = 0;
      let fuelCost = 0;

      if (transportMode === 'Cab') {
        taxiCost = Math.round(3800 * days * (totalTravelers > 4 ? 1.4 : 1.0));
      } else if (transportMode === 'Self-Drive') {
        transportCost = Math.round(3000 * days);
        fuelCost = Math.round(1800 * (days / 2));
      } else if (transportMode === 'Flight') {
        flightCost = Math.round(4500 * totalTravelers);
        taxiCost = Math.round(2000 * days);
      } else if (transportMode === 'Train') {
        trainCost = Math.round(800 * totalTravelers);
        taxiCost = Math.round(1500 * days);
      } else if (transportMode === 'Bus') {
        busCost = Math.round(600 * totalTravelers);
        taxiCost = Math.round(1200 * days);
      }

      const foodCost = Math.round((foodPref === 'Jain' || foodPref === 'Vegetarian' ? 700 : 950) * totalTravelers * days);
      const shoppingEstimate = Math.round(1500 * totalTravelers * multiplier);
      const entryFees = Math.round(450 * totalTravelers * days);
      const miscExpenses = Math.round(600 * days);

      const totalBudget = hotelCost + flightCost + trainCost + busCost + taxiCost + fuelCost + transportCost + foodCost + shoppingEstimate + entryFees + miscExpenses;

      // Generate Day-wise schedule
      const generatedDays = Array.from({ length: days }).map((_, idx) => {
        const dayNum = idx + 1;
        return {
          day: dayNum,
          title: dayNum === 1 
            ? `Arrival & ${destination} Scenic Sunset Exploration` 
            : dayNum === days 
            ? `Shopping, Hidden Gems & Departure` 
            : `Full Day ${theme} Tour & Local Delicacies`,
          schedule: [
            { time: '07:30 AM', activity: 'Wake-up & Fresh Mountain Vibe', detail: 'Enjoy sunrise views from hotel balcony.' },
            { time: '08:30 AM', activity: 'Breakfast Recommendation', detail: foodPref === 'Jain' ? 'Pure Veg & Jain Poha, Upma & Masala Tea at hotel.' : 'South Indian Dosa & Filter Coffee at local cafe.' },
            { time: '09:45 AM', activity: 'Morning Attraction Visit', detail: dayNum === 1 ? `Tiger’s Leap & Lion’s Point Panorama.` : `Karla Caves / Bhushi Dam waterfalls.` },
            { time: '01:15 PM', activity: 'Lunch Recommendation', detail: foodPref === 'Jain' ? 'Jain Thali with Fresh Butter Roti & Dal.' : 'Local Special Thali or Woodfired Pizza.' },
            { time: '03:30 PM', activity: 'Afternoon Sightseeing & Photos', detail: 'Best lighting for photography & walking trails.' },
            { time: '05:30 PM', activity: 'Evening Shopping & Snacks', detail: `Explore local chikki & fudge markets in ${destination}.` },
            { time: '08:30 PM', activity: 'Dinner Recommendation', detail: 'Fine dining experience at top AI rated restaurant.' },
            { time: '10:15 PM', activity: 'Hotel Return & Rest', detail: 'Relax for next day adventure.' }
          ],
          optimizedTravelTime: 'Total drive between spots: ~45 mins (Traffic optimized)'
        };
      });

      setItinerary({
        id: `trip-${Date.now()}`,
        destination,
        days,
        travelers: { adults, childrenCount, seniors, total: totalTravelers },
        budgetTier,
        transportMode,
        hotelCategory,
        foodPref,
        theme,
        generatedDays,
        budgetBreakdown: {
          hotelCost,
          flightCost,
          trainCost,
          busCost,
          taxiCost,
          fuelCost,
          transportCost,
          foodCost,
          shoppingEstimate,
          entryFees,
          miscExpenses,
          totalBudget
        }
      });

      setIsGenerating(false);
    }, 1200);
  };

  const getCurrencySymbol = () => {
    if (currency === 'USD') return '$';
    if (currency === 'EUR') return '€';
    return '₹';
  };

  const convertCurrency = (inrVal) => {
    if (currency === 'USD') return Math.round(inrVal / 83);
    if (currency === 'EUR') return Math.round(inrVal / 90);
    return inrVal;
  };

  const handleSaveTrip = () => {
    if (!itinerary) return;
    if (onSaveTripToDashboard) {
      onSaveTripToDashboard(itinerary);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Top Header Banner */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-widest">
            <Sparkles className="w-4 h-4 animate-spin" /> AI Personalization Engine
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-100 tracking-tight">
            Smart AI Trip Planner & Daily Scheduler
          </h1>
          <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto">
            Answer a few preferences to generate a custom day-by-day itinerary, itemized budget calculator, dynamic packing checklist & weather insights.
          </p>
        </div>

        {/* Form Wizard Section */}
        <form
          onSubmit={handleGenerateItinerary}
          className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-8 backdrop-blur-xl relative overflow-hidden"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Destination & Days */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-amber-400" /> Destination
              </label>
              <select
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="w-full bg-slate-950 text-slate-100 text-sm font-semibold p-3.5 rounded-2xl border border-slate-800 focus:outline-none focus:border-amber-500"
              >
                <option value="Lonavala">Lonavala & Khandala</option>
                <option value="Mahabaleshwar">Mahabaleshwar & Panchgani</option>
                <option value="Goa">North & South Goa</option>
                <option value="Udaipur">Udaipur, Rajasthan</option>
                <option value="Leh Ladakh">Leh Ladakh</option>
                <option value="Shirdi">Shirdi Divine Pilgrimage</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-amber-400" /> Duration (Days)
              </label>
              <input
                type="number"
                min="1"
                max="14"
                value={days}
                onChange={(e) => setDays(parseInt(e.target.value) || 1)}
                className="w-full bg-slate-950 text-slate-100 text-sm font-semibold p-3.5 rounded-2xl border border-slate-800 focus:outline-none focus:border-amber-500"
              />
            </div>

            {/* Travelers Breakdown */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <Users className="w-4 h-4 text-amber-400" /> Travelers Breakdown
              </label>
              <div className="grid grid-cols-3 gap-2 bg-slate-950 p-2 rounded-2xl border border-slate-800">
                <div className="text-center">
                  <span className="text-[10px] text-slate-400 uppercase font-bold">Adults</span>
                  <input
                    type="number"
                    min="1"
                    value={adults}
                    onChange={(e) => setAdults(parseInt(e.target.value) || 1)}
                    className="w-full bg-slate-900 text-amber-400 font-bold text-center text-xs p-1 rounded-lg mt-1 border border-slate-800"
                  />
                </div>
                <div className="text-center">
                  <span className="text-[10px] text-slate-400 uppercase font-bold">Kids</span>
                  <input
                    type="number"
                    min="0"
                    value={childrenCount}
                    onChange={(e) => setChildrenCount(parseInt(e.target.value) || 0)}
                    className="w-full bg-slate-900 text-amber-400 font-bold text-center text-xs p-1 rounded-lg mt-1 border border-slate-800"
                  />
                </div>
                <div className="text-center">
                  <span className="text-[10px] text-slate-400 uppercase font-bold">Seniors</span>
                  <input
                    type="number"
                    min="0"
                    value={seniors}
                    onChange={(e) => setSeniors(parseInt(e.target.value) || 0)}
                    className="w-full bg-slate-900 text-amber-400 font-bold text-center text-xs p-1 rounded-lg mt-1 border border-slate-800"
                  />
                </div>
              </div>
            </div>

            {/* Budget & Hotel Tier */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <DollarSign className="w-4 h-4 text-emerald-400" /> Budget Category
              </label>
              <div className="grid grid-cols-3 gap-2">
                {['Luxury', 'Standard', 'Budget'].map(tier => (
                  <button
                    key={tier}
                    type="button"
                    onClick={() => setBudgetTier(tier)}
                    className={`py-3 text-xs font-bold rounded-2xl transition-all border ${
                      budgetTier === tier
                        ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md'
                        : 'bg-slate-950 text-slate-400 hover:text-white border-slate-800'
                    }`}
                  >
                    {tier}
                  </button>
                ))}
              </div>
            </div>

            {/* Preferred Transport */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <Car className="w-4 h-4 text-sky-400" /> Preferred Transport Mode
              </label>
              <select
                value={transportMode}
                onChange={(e) => setTransportMode(e.target.value)}
                className="w-full bg-slate-950 text-slate-100 text-sm font-semibold p-3.5 rounded-2xl border border-slate-800 focus:outline-none focus:border-amber-500"
              >
                <option value="Cab">Chauffeur Luxury Cab</option>
                <option value="Self-Drive">Self-Drive Car (Thar / Innova)</option>
                <option value="Flight">Flight + Local Taxi</option>
                <option value="Train">Express Train + Local Taxi</option>
                <option value="Bus">Volvo Sleeper Bus + Taxi</option>
              </select>
            </div>

            {/* Food Preference */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <Utensils className="w-4 h-4 text-rose-400" /> Food Preference
              </label>
              <select
                value={foodPref}
                onChange={(e) => setFoodPref(e.target.value)}
                className="w-full bg-slate-950 text-slate-100 text-sm font-semibold p-3.5 rounded-2xl border border-slate-800 focus:outline-none focus:border-amber-500"
              >
                <option value="Vegetarian">100% Pure Vegetarian</option>
                <option value="Jain">Strict Jain Meals Only</option>
                <option value="Non-Vegetarian">Non-Vegetarian & Seafood</option>
                <option value="Vegan">Vegan & Organic</option>
              </select>
            </div>

            {/* Travel Theme / Vibe */}
            <div className="space-y-2 md:col-span-3">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <Compass className="w-4 h-4 text-amber-400" /> Travel Vibe / Interests
              </label>
              <div className="flex flex-wrap gap-2">
                {['Nature', 'Religious', 'Honeymoon', 'Family', 'Solo', 'Friends', 'Photography', 'Shopping', 'Nightlife', 'Adventure'].map(vibe => (
                  <button
                    key={vibe}
                    type="button"
                    onClick={() => setTheme(vibe)}
                    className={`px-4 py-2 text-xs font-bold rounded-xl transition-all border ${
                      theme === vibe
                        ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md'
                        : 'bg-slate-950 text-slate-400 hover:text-white border-slate-800'
                    }`}
                  >
                    ✨ {vibe}
                  </button>
                ))}
              </div>
            </div>

          </div>

          <div className="pt-4 border-t border-slate-800 flex justify-end">
            <button
              type="submit"
              disabled={isGenerating}
              className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black rounded-2xl shadow-xl hover:shadow-amber-500/20 transition-all flex items-center justify-center gap-3 text-base"
            >
              {isGenerating ? (
                <>
                  <Sparkles className="w-5 h-5 animate-spin" /> Generating AI Itinerary...
                </>
              ) : (
                <>
                  🚀 Generate Personalized AI Itinerary <ChevronRight className="w-5 h-5" />
                </>
              )}
            </button>
          </div>
        </form>

        {/* Dynamic Weather Banner */}
        <WeatherWidget initialCity={destination} />

        {/* Generated Itinerary & Budget Display */}
        {itinerary && (
          <div className="space-y-10">
            {/* Trip Action Toolbar */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="text-lg font-bold text-slate-100">
                  {itinerary.destination} • {itinerary.days} Days Itinerary
                </span>
                <span className="text-xs bg-amber-500/20 text-amber-400 px-3 py-1 rounded-full font-bold border border-amber-500/30">
                  {itinerary.theme} Vibe
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsPackingOpen(true)}
                  className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-xl border border-slate-700 flex items-center gap-1.5 transition-colors"
                >
                  <Luggage className="w-4 h-4 text-amber-400" /> Packing List
                </button>
                <button
                  onClick={() => setIsInsightsOpen(true)}
                  className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-xl border border-slate-700 flex items-center gap-1.5 transition-colors"
                >
                  <Compass className="w-4 h-4 text-sky-400" /> Insights
                </button>
                <button
                  onClick={() => setIsNearbyOpen(true)}
                  className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-xl border border-slate-700 flex items-center gap-1.5 transition-colors"
                >
                  <MapPin className="w-4 h-4 text-emerald-400" /> Nearby Hub
                </button>
                <button
                  onClick={handleSaveTrip}
                  className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold rounded-xl flex items-center gap-1.5 transition-colors"
                >
                  <Bookmark className="w-4 h-4" /> Save Trip
                </button>
                <button
                  onClick={handlePrint}
                  className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold rounded-xl flex items-center gap-1.5 transition-colors"
                >
                  <Printer className="w-4 h-4" /> Print / PDF
                </button>
              </div>
            </div>

            {/* AI Budget Calculator Widget */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-800">
                <div>
                  <h3 className="text-xl font-bold text-slate-100 flex items-center gap-2">
                    <DollarSign className="w-6 h-6 text-emerald-400" />
                    AI Itemized Budget Breakdown
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">Automated cost calculations across accommodation, travel, food & activities</p>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-400 font-bold">Currency:</span>
                  {['INR', 'USD', 'EUR'].map(c => (
                    <button
                      key={c}
                      onClick={() => setCurrency(c)}
                      className={`px-3 py-1 text-xs font-bold rounded-lg border transition-all ${
                        currency === c
                          ? 'bg-emerald-500 text-slate-950 border-emerald-400'
                          : 'bg-slate-950 text-slate-400 border-slate-800'
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                  <p className="text-[10px] uppercase font-bold text-slate-400">Hotel Accommodation</p>
                  <p className="text-lg font-bold text-amber-400 mt-1">
                    {getCurrencySymbol()}{convertCurrency(itinerary.budgetBreakdown.hotelCost).toLocaleString()}
                  </p>
                </div>

                <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                  <p className="text-[10px] uppercase font-bold text-slate-400">Car / Cab / Fuel Cost</p>
                  <p className="text-lg font-bold text-sky-400 mt-1">
                    {getCurrencySymbol()}{convertCurrency(itinerary.budgetBreakdown.taxiCost + itinerary.budgetBreakdown.transportCost + itinerary.budgetBreakdown.fuelCost).toLocaleString()}
                  </p>
                </div>

                <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                  <p className="text-[10px] uppercase font-bold text-slate-400">Food & Dining ({itinerary.foodPref})</p>
                  <p className="text-lg font-bold text-rose-400 mt-1">
                    {getCurrencySymbol()}{convertCurrency(itinerary.budgetBreakdown.foodCost).toLocaleString()}
                  </p>
                </div>

                <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                  <p className="text-[10px] uppercase font-bold text-slate-400">Entry Fees & Sightseeing</p>
                  <p className="text-lg font-bold text-purple-400 mt-1">
                    {getCurrencySymbol()}{convertCurrency(itinerary.budgetBreakdown.entryFees).toLocaleString()}
                  </p>
                </div>

                <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                  <p className="text-[10px] uppercase font-bold text-slate-400">Shopping & Misc</p>
                  <p className="text-lg font-bold text-emerald-400 mt-1">
                    {getCurrencySymbol()}{convertCurrency(itinerary.budgetBreakdown.shoppingEstimate + itinerary.budgetBreakdown.miscExpenses).toLocaleString()}
                  </p>
                </div>
              </div>

              {/* Total Summary Bar */}
              <div className="mt-6 p-6 rounded-2xl bg-gradient-to-r from-slate-950 via-slate-900 to-amber-950/40 border border-amber-500/40 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <span className="text-xs uppercase tracking-widest font-black text-amber-400">Estimated Total Budget</span>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-3xl sm:text-4xl font-black text-slate-100">
                      {getCurrencySymbol()}{convertCurrency(itinerary.budgetBreakdown.totalBudget).toLocaleString()}
                    </span>
                    <span className="text-xs text-slate-400 font-semibold">
                      (~{getCurrencySymbol()}{convertCurrency(Math.round(itinerary.budgetBreakdown.totalBudget / totalTravelers)).toLocaleString()} per person)
                    </span>
                  </div>
                </div>

                <div className="text-xs text-slate-300 bg-slate-950/80 p-3 rounded-xl border border-slate-800">
                  💡 <strong>Cost Saver Tip:</strong> Book Siddhivinayak Innova Crysta for 4+ travelers to save up to 25% on airport transfers!
                </div>
              </div>
            </div>

            {/* Day-wise Schedule Planner */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-slate-100 flex items-center gap-2">
                <Clock className="w-6 h-6 text-amber-400" />
                AI Day-Wise Travel Schedule
              </h3>

              <div className="space-y-6">
                {itinerary.generatedDays.map((dayData) => (
                  <div key={dayData.day} className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-800">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-2xl bg-amber-500 text-slate-950 font-black text-lg flex items-center justify-center">
                          D{dayData.day}
                        </div>
                        <div>
                          <h4 className="font-bold text-lg text-slate-100">{dayData.title}</h4>
                          <p className="text-xs text-emerald-400 font-semibold">{dayData.optimizedTravelTime}</p>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                      {dayData.schedule.map((slot, idx) => (
                        <div key={idx} className="bg-slate-950 p-4 rounded-2xl border border-slate-800/80 flex items-start gap-3">
                          <span className="text-xs font-bold bg-amber-500/10 text-amber-400 px-2.5 py-1 rounded-lg border border-amber-500/30 shrink-0">
                            {slot.time}
                          </span>
                          <div>
                            <h5 className="font-bold text-sm text-slate-200">{slot.activity}</h5>
                            <p className="text-xs text-slate-400 mt-0.5">{slot.detail}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Embedded Interactive Map */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-slate-100 flex items-center gap-2">
                <Compass className="w-5 h-5 text-sky-400" /> Destination Interactive Route Map
              </h3>
              <InteractiveMap destination={itinerary.destination} />
            </div>

            {/* Hotel & Restaurant Rankings Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <AIHotelRankings destination={itinerary.destination} />
              <AIRestaurantRankings destination={itinerary.destination} />
            </div>
          </div>
        )}

      </div>

      {/* Modals */}
      <PackingChecklistModal
        isOpen={isPackingOpen}
        onClose={() => setIsPackingOpen(false)}
        tripData={itinerary}
      />

      <DestinationInsightsModal
        isOpen={isInsightsOpen}
        onClose={() => setIsInsightsOpen(false)}
        destination={destination}
      />

      <NearbyDiscoveryModal
        isOpen={isNearbyOpen}
        onClose={() => setIsNearbyOpen(false)}
        destination={destination}
      />
    </div>
  );
}
