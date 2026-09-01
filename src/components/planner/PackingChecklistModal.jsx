import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckSquare, Square, Plus, Download, Printer, Sparkles, Luggage, ShieldAlert, Check } from 'lucide-react';

export default function PackingChecklistModal({ isOpen, onClose, tripData }) {
  const destination = tripData?.destination || 'Lonavala';
  const theme = tripData?.theme || 'Nature';
  const days = tripData?.days || 3;

  const getBaseItems = () => {
    const base = {
      Documents: [
        { id: 'd1', label: 'Government ID Card (Aadhaar / Driving License / Passport)', checked: true },
        { id: 'd2', label: 'Vehicle Car Rental Booking Voucher / Confirmation Code', checked: true },
        { id: 'd3', label: 'Emergency Contact & Hotel Reservation Details', checked: false }
      ],
      Electronics: [
        { id: 'e1', label: 'Smartphone & Heavy-duty Power Bank (10,000+ mAh)', checked: true },
        { id: 'e2', label: 'Car Mount Phone Holder & Fast Car Charger', checked: true },
        { id: 'e3', label: 'Camera / GoPro + Extra SD Cards', checked: false }
      ],
      Essentials: [
        { id: 'es1', label: 'First Aid Kit (Bandages, Paracetamol, Motion sickness pills)', checked: true },
        { id: 'es2', label: 'Hand Sanitizer & Disinfectant Wipes', checked: true },
        { id: 'es3', label: 'Reusable Stainless Steel Water Bottles', checked: false }
      ]
    };

    // Specific Vibe Additions
    if (theme === 'Beach' || destination.toLowerCase().includes('goa')) {
      base.Clothing = [
        { id: 'c1', label: `${days * 2} Light Cotton / Linen Shirts & Shorts`, checked: false },
        { id: 'c2', label: 'UV Swimwear & Beach Cover-ups', checked: false },
        { id: 'c3', label: 'Polarized Sunglasses & Wide-brim Sun Hat', checked: false }
      ];
      base.Toiletries = [
        { id: 't1', label: 'SPF 50+ Broad Spectrum Water-resistant Sunscreen', checked: true },
        { id: 't2', label: 'Aloe Vera After-sun Gel & Moisturizer', checked: false },
        { id: 't3', label: 'Mosquito & Bug Repellent Spray', checked: true }
      ];
    } else if (theme === 'Mountain' || theme === 'Snow' || destination.toLowerCase().includes('ladakh')) {
      base.Clothing = [
        { id: 'c1', label: 'Heavy Windproof Jacket & Thermal Inner Layers', checked: true },
        { id: 'c2', label: 'Woolen Socks, Beanie Cap & Warm Gloves', checked: true },
        { id: 'c3', label: `${days + 1} Pairs of Comfortable Trekking Pants`, checked: false }
      ];
      base.Toiletries = [
        { id: 't1', label: 'Cold Cream, Lip Balm with SPF & Heavy Moisturizer', checked: true },
        { id: 't2', label: 'High Altitude Oximeter & Diamox (Oxygen support)', checked: true }
      ];
    } else if (theme === 'Religious' || destination.toLowerCase().includes('shirdi')) {
      base.Clothing = [
        { id: 'c1', label: 'Traditional / Modest Kurta Pyjama or Sarees', checked: true },
        { id: 'c2', label: 'Slip-on Shoes / Sandals (Easy removal at temples)', checked: true }
      ];
      base.Toiletries = [
        { id: 't1', label: 'Wet Wipes, Sanitizer & Travel Towel', checked: true }
      ];
    } else {
      // Default Nature / Road Trip
      base.Clothing = [
        { id: 'c1', label: `${days + 1} Sets of Casual Comfort Outfits`, checked: false },
        { id: 'c2', label: 'Light Windcheater / Rain Jacket (Monsoon ready)', checked: true },
        { id: 'c3', label: 'Comfortable Driving Sneakers', checked: true }
      ];
      base.Toiletries = [
        { id: 't1', label: 'Travel Shampoo, Toothbrush & Dental Kit', checked: true },
        { id: 't2', label: 'Sunscreen & Insect Repellent', checked: false }
      ];
    }

    return base;
  };

  const [checklist, setChecklist] = useState(getBaseItems);
  const [newItemText, setNewItemText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Clothing');

  useEffect(() => {
    setChecklist(getBaseItems());
  }, [destination, theme, days]);

  if (!isOpen) return null;

  const toggleCheck = (category, id) => {
    setChecklist(prev => ({
      ...prev,
      [category]: prev[category].map(item =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    }));
  };

  const handleAddItem = (e) => {
    e.preventDefault();
    if (!newItemText.trim()) return;

    const newItem = {
      id: `custom-${Date.now()}`,
      label: newItemText.trim(),
      checked: false
    };

    setChecklist(prev => ({
      ...prev,
      [selectedCategory]: [...(prev[selectedCategory] || []), newItem]
    }));

    setNewItemText('');
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    let content = `AI SMART PACKING CHECKLIST - ${destination.toUpperCase()}\n`;
    content += `Trip Duration: ${days} Days | Vibe: ${theme}\n`;
    content += `===============================================\n\n`;

    Object.keys(checklist).forEach(cat => {
      content += `[ ${cat.toUpperCase()} ]\n`;
      checklist[cat].forEach(item => {
        content += `${item.checked ? '[X]' : '[ ]'} ${item.label}\n`;
      });
      content += `\n`;
    });

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Packing_Checklist_${destination}_${days}Days.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
        >
          {/* Modal Header */}
          <div className="bg-gradient-to-r from-slate-900 via-amber-950/30 to-slate-900 p-5 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-amber-500/20 text-amber-400 rounded-2xl border border-amber-500/30">
                <Luggage className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                  AI Smart Packing Checklist
                  <span className="text-xs bg-amber-500/20 text-amber-400 font-semibold px-2 py-0.5 rounded-full border border-amber-500/30">
                    {destination} • {theme}
                  </span>
                </h3>
                <p className="text-xs text-slate-400">Tailored based on destination climate & activities</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white bg-slate-800 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Action Bar */}
          <div className="bg-slate-950 p-4 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
              {Object.keys(checklist).map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`text-xs font-bold px-3 py-1.5 rounded-xl transition-all whitespace-nowrap ${
                    selectedCategory === cat
                      ? 'bg-amber-500 text-slate-950 shadow-md'
                      : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  {cat} ({checklist[cat]?.length || 0})
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleDownload}
                className="flex items-center gap-1.5 text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-1.5 rounded-xl border border-slate-700 transition-colors"
              >
                <Download className="w-3.5 h-3.5 text-amber-400" /> Export TXT
              </button>
              <button
                onClick={handlePrint}
                className="flex items-center gap-1.5 text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 px-3 py-1.5 rounded-xl transition-colors"
              >
                <Printer className="w-3.5 h-3.5" /> Print
              </button>
            </div>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-3 custom-scrollbar">
            {checklist[selectedCategory]?.map((item) => (
              <div
                key={item.id}
                onClick={() => toggleCheck(selectedCategory, item.id)}
                className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                  item.checked
                    ? 'bg-emerald-950/20 border-emerald-800/40 text-slate-300'
                    : 'bg-slate-950 border-slate-800 text-slate-100 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center gap-3">
                  {item.checked ? (
                    <CheckSquare className="w-5 h-5 text-emerald-400 shrink-0" />
                  ) : (
                    <Square className="w-5 h-5 text-slate-500 shrink-0" />
                  )}
                  <span className={`text-sm font-medium ${item.checked ? 'line-through opacity-75' : ''}`}>
                    {item.label}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Add Item Form */}
          <form onSubmit={handleAddItem} className="p-4 bg-slate-950 border-t border-slate-800 flex gap-2">
            <input
              type="text"
              value={newItemText}
              onChange={(e) => setNewItemText(e.target.value)}
              placeholder={`Add custom item to ${selectedCategory}...`}
              className="flex-1 bg-slate-900 text-slate-100 text-xs px-3.5 py-2.5 rounded-xl border border-slate-800 focus:outline-none focus:border-amber-500"
            />
            <button
              type="submit"
              disabled={!newItemText.trim()}
              className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-4 py-2.5 rounded-xl text-xs flex items-center gap-1.5 transition-colors disabled:opacity-50"
            >
              <Plus className="w-4 h-4" /> Add
            </button>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
