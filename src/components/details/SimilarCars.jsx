import React from 'react';
import { FLEET_CARS } from '../../data/mockData';
import FleetCard from '../fleet/FleetCard';

export default function SimilarCars({ 
  currentCar, 
  onViewDetails, 
  onBookNow, 
  wishlist = [], 
  onToggleWishlist, 
  compareList = [], 
  onToggleCompare 
}) {
  if (!currentCar) return null;

  const safeWishlist = Array.isArray(wishlist) ? wishlist : [];
  const safeCompareList = Array.isArray(compareList) ? compareList : [];

  const similarCars = FLEET_CARS.filter(
    (car) => car && car.id !== currentCar.id && (car.category === currentCar.category || car.categoryTag === currentCar.categoryTag)
  ).slice(0, 3);

  if (similarCars.length === 0) return null;

  return (
    <div className="space-y-6 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <span className="text-xs font-extrabold uppercase tracking-widest text-brand-blue bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
            Recommended Options
          </span>
          <h3 className="text-2xl font-black text-brand-navy mt-2">
            Similar Cars in {currentCar.category || 'Fleet'}
          </h3>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {similarCars.map((car) => (
          <FleetCard
            key={car.id}
            car={car}
            isWishlisted={safeWishlist.some(item => item && item.id === car.id)}
            isComparing={safeCompareList.some(item => item && item.id === car.id)}
            onToggleWishlist={onToggleWishlist}
            onToggleCompare={onToggleCompare}
            onViewDetails={onViewDetails}
            onBookNow={onBookNow}
          />
        ))}
      </div>
    </div>
  );
}
