import React, { useState, useEffect, useRef } from 'react';
import { Search, MapPin, ChevronDown, Check, Sparkles, X, AlertCircle } from 'lucide-react';
import { cityDB } from '../../services/cityDatabaseService';

export default function CitySearchableDropdown({ 
  label = 'Select City', 
  value, 
  onChange, 
  placeholder = 'Search city, district or state...',
  icon = MapPin 
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAllCities, setShowAllCities] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [toastNotice, setToastNotice] = useState(null);

  const containerRef = useRef(null);
  const searchInputRef = useRef(null);
  const IconComp = icon;

  const popularCities = cityDB.getPopularCities();
  const searchResults = cityDB.searchCities(searchQuery);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Auto-focus search input when opened
  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      setTimeout(() => searchInputRef.current.focus(), 100);
    }
  }, [isOpen]);

  const handleSelectCity = (city) => {
    if (city.status === 'COMING_SOON') {
      setToastNotice(`🚀 Service coming soon to ${city.name}! Bookings opening shortly.`);
      setTimeout(() => setToastNotice(null), 3500);
      return;
    }

    onChange(city.name);
    setIsOpen(false);
    setSearchQuery('');
  };

  // Keyboard navigation
  const handleKeyDown = (e) => {
    if (!isOpen) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => (prev + 1) % searchResults.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (prev - 1 + searchResults.length) % searchResults.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (searchResults[selectedIndex]) {
        handleSelectCity(searchResults[selectedIndex]);
      }
    } else if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  return (
    <div className="relative w-full" ref={containerRef} onKeyDown={handleKeyDown}>
      
      {/* Selector Trigger Input */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-slate-900 border border-slate-800 hover:border-amber-500/50 rounded-2xl p-3 text-left transition-all flex items-center justify-between gap-3 group shadow-inner"
      >
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 group-hover:scale-105 transition-transform shrink-0">
            <IconComp className="w-4 h-4" />
          </div>
          <div className="flex flex-col truncate">
            <span className="text-[10px] uppercase font-bold text-slate-400">{label}</span>
            <span className="text-xs font-black text-white truncate">
              {value || placeholder}
            </span>
          </div>
        </div>

        <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isOpen ? 'rotate-180 text-amber-400' : ''}`} />
      </button>

      {/* Toast Notice for Coming Soon cities */}
      {toastNotice && (
        <div className="absolute top-full mt-2 left-0 right-0 z-50 p-3 bg-amber-500 text-slate-950 rounded-2xl shadow-xl font-bold text-xs flex items-center justify-between animate-in fade-in duration-150">
          <span>{toastNotice}</span>
          <X className="w-4 h-4 cursor-pointer" onClick={() => setToastNotice(null)} />
        </div>
      )}

      {/* Searchable Dropdown Popover */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl z-50 p-4 space-y-4 max-h-[85vh] sm:max-h-[480px] overflow-y-auto animate-in fade-in duration-150">
          
          {/* Search Header */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Search by city, district or state..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setSelectedIndex(0);
              }}
              className="w-full bg-slate-950 border border-slate-700 rounded-2xl pl-10 pr-8 py-2.5 text-xs font-semibold text-white outline-none focus:ring-2 focus:ring-amber-500"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Popular Cities Quick Shortcuts Bar */}
          {!searchQuery && (
            <div className="space-y-2">
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-400" /> Popular Cities
              </span>
              <div className="flex flex-wrap gap-1.5">
                {popularCities.map(city => (
                  <button
                    key={city.id}
                    type="button"
                    onClick={() => handleSelectCity(city)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1 ${
                      value === city.name 
                        ? 'bg-amber-500 text-slate-950 shadow-md font-black' 
                        : 'bg-slate-950 hover:bg-slate-800 text-slate-200 border border-slate-800'
                    }`}
                  >
                    <span>{city.name}</span>
                    {value === city.name && <Check className="w-3 h-3" />}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Toggle View All Cities Button */}
          {!searchQuery && (
            <button
              type="button"
              onClick={() => setShowAllCities(!showAllCities)}
              className="w-full py-2 bg-slate-950 hover:bg-slate-800 text-amber-400 rounded-xl text-xs font-extrabold border border-slate-800 transition-colors flex items-center justify-center gap-1"
            >
              <span>{showAllCities ? 'Hide All Cities' : 'View All Indian Cities & Districts'}</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${showAllCities ? 'rotate-180' : ''}`} />
            </button>
          )}

          {/* Search Results / Full City List */}
          {(searchQuery || showAllCities) && (
            <div className="space-y-1 pt-1">
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block mb-2">
                {searchQuery ? `Search Results (${searchResults.length})` : 'All Indian Serviceable Locations'}
              </span>

              {searchResults.length === 0 ? (
                <div className="text-center py-6 text-xs text-slate-500">
                  No cities found matching "{searchQuery}". Try searching by state or district.
                </div>
              ) : (
                <div className="divide-y divide-slate-800/60 max-h-60 overflow-y-auto pr-1">
                  {searchResults.map((city, idx) => (
                    <button
                      key={city.id}
                      type="button"
                      onClick={() => handleSelectCity(city)}
                      className={`w-full text-left px-3 py-2.5 rounded-xl transition-all flex items-center justify-between text-xs ${
                        idx === selectedIndex ? 'bg-slate-800 text-white font-bold' : 'hover:bg-slate-800/60 text-slate-200'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                        <div>
                          <span className="font-bold text-white">{city.name}</span>
                          <span className="text-[10px] text-slate-400 block">{city.district}, {city.state}</span>
                        </div>
                      </div>

                      {city.status === 'COMING_SOON' ? (
                        <span className="px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 font-extrabold text-[9px] border border-purple-500/30">
                          Coming Soon
                        </span>
                      ) : value === city.name ? (
                        <Check className="w-4 h-4 text-amber-400" />
                      ) : null}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

        </div>
      )}

    </div>
  );
}
