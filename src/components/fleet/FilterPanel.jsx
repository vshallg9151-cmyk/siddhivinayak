import React from 'react';
import { CATEGORIES, FUEL_TYPES, TRANSMISSION_TYPES, SEATING_CAPACITIES, POPULAR_CITIES } from '../../data/mockData';
import { Filter, Search, RotateCcw, MapPin, DollarSign, Car, Fuel, Gauge, Users, Sparkles } from 'lucide-react';

export default function FilterPanel({
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
  selectedFuelTypes,
  setSelectedFuelTypes,
  selectedTransmissions,
  setSelectedTransmissions,
  selectedSeats,
  setSelectedSeats,
  maxPrice,
  setMaxPrice,
  selectedCity,
  setSelectedCity,
  onResetFilters
}) {

  const toggleArrayItem = (item, currentList, setList) => {
    if (currentList.includes(item)) {
      setList(currentList.filter(i => i !== item));
    } else {
      setList([...currentList, item]);
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-6">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-200">
        <div className="flex items-center gap-2 text-brand-navy font-black text-base">
          <Filter className="w-5 h-5 text-brand-blue" />
          <span>Filters & Search</span>
        </div>
        <button
          onClick={onResetFilters}
          className="text-xs font-bold text-slate-500 hover:text-brand-blue flex items-center gap-1 transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Reset All
        </button>
      </div>

      {/* Search Input */}
      <div>
        <label className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500 block mb-2">
          Search Car Name or Model
        </label>
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="e.g. Thar, Innova, Fortuner..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-50 border border-slate-300 rounded-2xl pl-10 pr-4 py-2.5 text-xs font-bold text-slate-900 outline-none focus:ring-2 focus:ring-brand-blue transition-all"
          />
        </div>
      </div>

      {/* City Location Select */}
      <div>
        <label className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500 block mb-2 flex items-center gap-1">
          <MapPin className="w-3.5 h-3.5 text-brand-blue" />
          Pickup City
        </label>
        <select
          value={selectedCity}
          onChange={(e) => setSelectedCity(e.target.value)}
          className="w-full bg-slate-50 border border-slate-300 rounded-2xl px-3.5 py-2.5 text-xs font-bold text-slate-900 outline-none focus:ring-2 focus:ring-brand-blue cursor-pointer"
        >
          <option value="All">All Cities (Pan India)</option>
          {POPULAR_CITIES.map((city) => (
            <option key={city.id} value={city.name}>
              {city.name} ({city.state})
            </option>
          ))}
        </select>
      </div>

      {/* Categories */}
      <div>
        <label className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500 block mb-2 flex items-center gap-1">
          <Car className="w-3.5 h-3.5 text-brand-blue" />
          Car Body Category
        </label>
        <div className="flex flex-wrap gap-1.5">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition-all ${
                selectedCategory === cat
                  ? 'bg-brand-navy text-brand-gold shadow-sm font-bold scale-105'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Price Range Slider */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500 flex items-center gap-1">
            <DollarSign className="w-3.5 h-3.5 text-brand-blue" />
            Max Daily Rate
          </label>
          <span className="text-xs font-extrabold text-brand-navy bg-brand-gold/20 px-2 py-0.5 rounded-md border border-brand-gold/30">
            Up to ₹{maxPrice.toLocaleString('en-IN')} / day
          </span>
        </div>
        <input
          type="range"
          min="2000"
          max="15000"
          step="500"
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          className="w-full accent-brand-blue cursor-pointer"
        />
        <div className="flex items-center justify-between text-[10px] text-slate-400 font-bold mt-1">
          <span>₹2,000</span>
          <span>₹8,000</span>
          <span>₹15,000+</span>
        </div>
      </div>

      {/* Fuel Types */}
      <div>
        <label className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500 block mb-2 flex items-center gap-1">
          <Fuel className="w-3.5 h-3.5 text-brand-blue" />
          Fuel Type
        </label>
        <div className="grid grid-cols-2 gap-2">
          {FUEL_TYPES.map((fuel) => (
            <label
              key={fuel}
              className={`flex items-center gap-2 p-2 rounded-xl border text-xs font-bold cursor-pointer transition-all ${
                selectedFuelTypes.includes(fuel)
                  ? 'bg-blue-50 border-brand-blue text-brand-blue'
                  : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
            >
              <input
                type="checkbox"
                checked={selectedFuelTypes.includes(fuel)}
                onChange={() => toggleArrayItem(fuel, selectedFuelTypes, setSelectedFuelTypes)}
                className="accent-brand-blue"
              />
              <span>{fuel}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Transmission */}
      <div>
        <label className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500 block mb-2 flex items-center gap-1">
          <Gauge className="w-3.5 h-3.5 text-brand-blue" />
          Transmission
        </label>
        <div className="grid grid-cols-2 gap-2">
          {TRANSMISSION_TYPES.map((trans) => (
            <label
              key={trans}
              className={`flex items-center gap-2 p-2 rounded-xl border text-xs font-bold cursor-pointer transition-all ${
                selectedTransmissions.includes(trans)
                  ? 'bg-blue-50 border-brand-blue text-brand-blue'
                  : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
            >
              <input
                type="checkbox"
                checked={selectedTransmissions.includes(trans)}
                onChange={() => toggleArrayItem(trans, selectedTransmissions, setSelectedTransmissions)}
                className="accent-brand-blue"
              />
              <span>{trans}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Seating Capacity */}
      <div>
        <label className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500 block mb-2 flex items-center gap-1">
          <Users className="w-3.5 h-3.5 text-brand-blue" />
          Seating Capacity
        </label>
        <div className="grid grid-cols-3 gap-2">
          {SEATING_CAPACITIES.map((seat) => (
            <button
              key={seat}
              onClick={() => toggleArrayItem(seat, selectedSeats, setSelectedSeats)}
              className={`p-2 rounded-xl border text-xs font-extrabold transition-all text-center ${
                selectedSeats.includes(seat)
                  ? 'bg-brand-navy text-brand-gold border-brand-navy shadow-sm'
                  : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
            >
              {seat}
            </button>
          ))}
        </div>
      </div>

    </div>
  );
}
