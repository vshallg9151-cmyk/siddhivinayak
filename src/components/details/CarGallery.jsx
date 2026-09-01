import React, { useState } from 'react';
import { Star, ShieldCheck, CheckCircle2, Maximize2 } from 'lucide-react';

export default function CarGallery({ car }) {
  const galleryImages = car.gallery && car.gallery.length > 0 ? car.gallery : [car.image];
  const [selectedImg, setSelectedImg] = useState(galleryImages[0]);

  return (
    <div className="space-y-4">
      {/* Main Image Container */}
      <div className="relative h-80 sm:h-96 w-full rounded-3xl overflow-hidden bg-slate-950 border border-slate-200 shadow-lg group">
        <img
          src={selectedImg}
          alt={car.name}
          className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent pointer-events-none" />

        {/* Badges Overlay */}
        <div className="absolute top-4 left-4 flex items-center gap-2">
          <span className="px-3.5 py-1 rounded-full text-xs font-extrabold bg-brand-navy/90 backdrop-blur-md text-brand-gold border border-brand-gold/30">
            {car.category}
          </span>
          {car.unlimitedKmAvailable && (
            <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-emerald-500 text-white shadow">
              Unlimited KM
            </span>
          )}
        </div>

        {/* Bottom Specs Pill */}
        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white">
          <div className="flex items-center gap-2 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-xl text-xs font-bold">
            <Star className="w-4 h-4 fill-brand-gold text-brand-gold" />
            <span>{car.rating}</span>
            <span className="text-slate-300 font-normal">({car.reviewsCount} verified reviews)</span>
          </div>

          <span className="text-xs font-bold text-emerald-400 bg-emerald-500/20 backdrop-blur-md px-3 py-1.5 rounded-xl border border-emerald-500/30 flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            {car.availableStatus || 'Available Now'}
          </span>
        </div>
      </div>

      {/* Thumbnails Row */}
      {galleryImages.length > 1 && (
        <div className="flex items-center gap-3 overflow-x-auto pb-2">
          {galleryImages.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedImg(img)}
              className={`relative w-24 h-16 rounded-2xl overflow-hidden border-2 transition-all shrink-0 ${
                selectedImg === img
                  ? 'border-brand-blue ring-2 ring-brand-blue/30 scale-105'
                  : 'border-slate-200 opacity-60 hover:opacity-100'
              }`}
            >
              <img src={img} alt={`Thumbnail ${idx}`} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
