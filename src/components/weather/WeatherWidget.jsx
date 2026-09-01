import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sun, CloudRain, CloudFog, SunMedium, Snowflake, Wind, Droplets, Eye, Sunset, Sunrise, Clock, AlertCircle } from 'lucide-react';
import { DESTINATION_WEATHER } from '../../data/phase4Data';

export default function WeatherWidget({ initialCity = 'Lonavala' }) {
  const [selectedCity, setSelectedCity] = useState(initialCity);
  const [unit, setUnit] = useState('C'); // 'C' | 'F'

  const weather = DESTINATION_WEATHER[selectedCity] || DESTINATION_WEATHER['Lonavala'];

  const getTemp = (celsius) => {
    if (unit === 'F') {
      return Math.round((celsius * 9) / 5 + 32);
    }
    return celsius;
  };

  const renderIcon = (iconName) => {
    switch (iconName) {
      case 'CloudRain':
        return <CloudRain className="w-10 h-10 text-sky-400 animate-pulse" />;
      case 'CloudFog':
        return <CloudFog className="w-10 h-10 text-slate-300 animate-pulse" />;
      case 'Snowflake':
        return <Snowflake className="w-10 h-10 text-cyan-300 animate-spin" />;
      case 'SunMedium':
        return <SunMedium className="w-10 h-10 text-amber-400 animate-bounce" />;
      default:
        return <Sun className="w-10 h-10 text-amber-400 animate-pulse" />;
    }
  };

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-2xl text-slate-100 backdrop-blur-xl relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />

      {/* Top Header & City Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-800/80">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-xl font-bold text-slate-100">Dynamic Live Weather</h3>
            <span className="bg-amber-500/20 text-amber-400 border border-amber-500/30 text-[10px] uppercase font-bold px-2 py-0.5 rounded-full">
              AI Sync
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">Real-time climate guidance & optimal visit windows</p>
        </div>

        <div className="flex items-center gap-3">
          <select
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            className="bg-slate-950 text-slate-200 text-xs font-semibold px-3 py-2 rounded-xl border border-slate-700 focus:outline-none focus:border-amber-500"
          >
            {Object.keys(DESTINATION_WEATHER).map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>

          {/* Unit Toggle */}
          <div className="bg-slate-950 p-1 rounded-xl border border-slate-700 flex items-center">
            <button
              onClick={() => setUnit('C')}
              className={`text-xs font-bold px-2.5 py-1 rounded-lg transition-all ${
                unit === 'C' ? 'bg-amber-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              °C
            </button>
            <button
              onClick={() => setUnit('F')}
              className={`text-xs font-bold px-2.5 py-1 rounded-lg transition-all ${
                unit === 'F' ? 'bg-amber-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              °F
            </button>
          </div>
        </div>
      </div>

      {/* Main Weather Display */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
        {/* Left Big Temperature & Condition */}
        <div className="flex items-center gap-4 bg-slate-950/70 p-4 rounded-2xl border border-slate-800">
          <div className="p-3 bg-slate-900 rounded-2xl border border-slate-800">
            {renderIcon(weather.icon)}
          </div>
          <div>
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-black text-slate-100">
                {getTemp(weather.temp)}
              </span>
              <span className="text-xl font-bold text-amber-400">°{unit}</span>
            </div>
            <p className="text-sm font-semibold text-slate-300 mt-0.5">{weather.condition}</p>
            <p className="text-xs text-slate-500">{weather.city}</p>
          </div>
        </div>

        {/* Center Key Metrics */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800 flex items-center gap-3">
            <Droplets className="w-5 h-5 text-sky-400" />
            <div>
              <p className="text-[10px] uppercase text-slate-400 font-bold">Rain Chance</p>
              <p className="text-sm font-bold text-slate-200">{weather.rainChance}%</p>
            </div>
          </div>

          <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800 flex items-center gap-3">
            <Wind className="w-5 h-5 text-emerald-400" />
            <div>
              <p className="text-[10px] uppercase text-slate-400 font-bold">Air Quality (AQI)</p>
              <p className="text-sm font-bold text-emerald-400">{weather.aqi} • {weather.aqiStatus}</p>
            </div>
          </div>

          <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800 flex items-center gap-3">
            <Sunrise className="w-5 h-5 text-amber-400" />
            <div>
              <p className="text-[10px] uppercase text-slate-400 font-bold">Sunrise</p>
              <p className="text-xs font-bold text-slate-200">{weather.sunrise}</p>
            </div>
          </div>

          <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800 flex items-center gap-3">
            <Sunset className="w-5 h-5 text-rose-400" />
            <div>
              <p className="text-[10px] uppercase text-slate-400 font-bold">Sunset</p>
              <p className="text-xs font-bold text-slate-200">{weather.sunset}</p>
            </div>
          </div>
        </div>

        {/* Right Best Visiting Hours Banner */}
        <div className="bg-gradient-to-br from-amber-500/10 via-slate-950 to-slate-950 p-4 rounded-2xl border border-amber-500/30 flex flex-col justify-between h-full">
          <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wide mb-2">
            <Clock className="w-4 h-4" /> Best Visiting Hours Today
          </div>
          <p className="text-sm font-bold text-slate-100 leading-snug">
            {weather.bestHours}
          </p>
          <p className="text-[11px] text-slate-400 mt-2 flex items-center gap-1.5">
            <AlertCircle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            Clear daylight & pleasant temperatures predicted for road trips.
          </p>
        </div>
      </div>
    </div>
  );
}
