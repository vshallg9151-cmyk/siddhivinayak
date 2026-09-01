import React, { useState } from 'react';
import { Search, Sparkles, MapPin, Compass, ArrowRight, Heart, DollarSign } from 'lucide-react';

export default function AISmartSearch({ onTriggerPlanner, onNavigateFleet }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState(null);

  const samplePrompts = [
    '🛕 Char Dham & 12 Jyotirlinga Yatra from Mumbai',
    '🏔️ 5-day Kashmir Paradise trip under ₹30,000',
    '🪔 Navratri Garba & Rann of Kutch Gujarat package',
    '🏖️ Goa beach vacation with Thar 4x4 self drive'
  ];

  const handleSearch = (queryToUse = null) => {
    const q = queryToUse || searchQuery;
    if (!q.trim()) return;

    const lower = q.toLowerCase();
    
    let matchedResults = [];

    if (lower.includes('jyotirlinga') || lower.includes('chardham') || lower.includes('yatra') || lower.includes('shirdi')) {
      matchedResults = [
        { title: 'Char Dham Himalayan Yatra', type: 'Spiritual Yatra', desc: 'Badrinath, Kedarnath, Gangotri & Yamunotri with pure Sattvik meals & Innova Crysta.', price: '₹24,999/person', tag: 'Sacred Circuit' },
        { title: '5 Maharashtra Jyotirlinga Tour', type: 'Spiritual Yatra', desc: 'Trimbakeshwar, Bhimashankar, Grishneshwar, Aundha & Parli with doorstep cab.', price: '₹12,999/person', tag: 'Devotional' }
      ];
    } else if (lower.includes('navratri') || lower.includes('gujarat') || lower.includes('kutch')) {
      matchedResults = [
        { title: 'Gujarat Rann Utsav & Garba Trail', type: 'Festival Special', desc: 'United Way Garba night in Vadodara + White Rann Tent City stay.', price: '₹14,500/person', tag: 'Cultural' },
        { title: 'Somnath & Dwarka Divine Yatra', type: 'Heritage & Pilgrimage', desc: 'Evening Aarti at Somnath Temple & Beach retreat.', price: '₹11,800/person', tag: 'Popular' }
      ];
    } else {
      matchedResults = [
        { title: 'Kashmir Snow & Houseboat Paradise', type: 'Mountain Holiday', desc: 'Srinagar Shikara, Gulmarg Gondola & Pahalgam valley excursion.', price: '₹18,999/person', tag: 'Best Seller' },
        { title: 'Rajasthan Royal Forts & Palaces', type: 'Heritage Tour', desc: 'Jaipur Amer Fort, Udaipur Lake Palace & Jaisalmer Thar Desert Safari.', price: '₹16,400/person', tag: 'Luxury' }
      ];
    }

    setResults(matchedResults);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-4 text-slate-100">
      <div className="flex items-center gap-2">
        <Sparkles className="w-5 h-5 text-amber-400" />
        <h3 className="font-bold text-base text-slate-100">India Domestic AI Smart Search</h3>
        <span className="text-[10px] bg-amber-500/20 text-amber-400 font-bold px-2 py-0.5 rounded-full border border-amber-500/30">
          Bharat Tourism AI
        </span>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
          <input
            type="text"
            placeholder="Try: 'Char Dham Yatra in May' or 'Kashmir 5-day trip under ₹30k'..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            className="w-full bg-slate-950 text-slate-100 text-xs font-semibold pl-10 pr-4 py-3 rounded-2xl border border-slate-800 focus:outline-none focus:border-amber-500"
          />
        </div>

        <button
          onClick={() => handleSearch()}
          className="px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black rounded-2xl text-xs shadow-md transition-all shrink-0 flex items-center justify-center gap-1.5"
        >
          AI Search <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Sample Prompts */}
      <div className="flex flex-wrap gap-2">
        {samplePrompts.map((prompt, idx) => (
          <button
            key={idx}
            onClick={() => { setSearchQuery(prompt); handleSearch(prompt); }}
            className="text-[11px] bg-slate-950 hover:bg-slate-800 text-slate-300 px-3 py-1.5 rounded-xl border border-slate-800 transition-colors"
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Search Results Display */}
      {results && (
        <div className="pt-4 border-t border-slate-800 space-y-3">
          <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider">AI Matched Domestic Destinations & Packages</h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {results.map((res, idx) => (
              <div key={idx} className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
                <div className="flex justify-between items-start">
                  <h5 className="font-bold text-sm text-slate-100">{res.title}</h5>
                  <span className="text-[10px] bg-amber-500/20 text-amber-400 px-2 py-0.5 rounded-md font-bold border border-amber-500/30">
                    {res.tag}
                  </span>
                </div>
                <p className="text-xs text-slate-400">{res.desc}</p>
                <div className="flex justify-between items-center pt-2">
                  <span className="text-sm font-black text-amber-400">{res.price}</span>
                  <button
                    onClick={onTriggerPlanner}
                    className="px-3 py-1.5 bg-amber-500 text-slate-950 font-bold rounded-xl text-xs flex items-center gap-1"
                  >
                    Build Plan <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
