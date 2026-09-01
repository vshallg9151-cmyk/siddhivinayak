import React, { useState } from 'react';
import { FLEET_CARS } from '../../data/mockData';
import FleetCard from './FleetCard';
import CarModal from './CarModal';
import { Filter, Car, Sparkles, Check } from 'lucide-react';

export default function FleetSection({ onBookNowTriggered }) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedCarForModal, setSelectedCarForModal] = useState(null);
  const [modalMode, setModalMode] = useState('details');

  const categories = ['All', 'SUV', 'MUV', 'Luxury'];

  const filteredCars = activeCategory === 'All'
    ? FLEET_CARS
    : FLEET_CARS.filter(car => car.category.includes(activeCategory));

  const handleViewDetails = (car) => {
    setSelectedCarForModal(car);
    setModalMode('details');
  };

  const handleBookNow = (car) => {
    setSelectedCarForModal(car);
    setModalMode('book');
  };

  return (
    <section id="fleet" className="py-20 bg-brand-bgLight relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-widest text-brand-blue bg-blue-50 px-3.5 py-1.5 rounded-full border border-blue-100">
              Our Premium Fleet
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-navy mt-3 tracking-tight">
              Explore Available Vehicles
            </h2>
            <p className="text-slate-600 text-sm mt-2 max-w-xl">
              100% Sanitized, accident-free, and regularly serviced vehicles with All-India tourist permits and comprehensive insurance.
            </p>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2.5 rounded-2xl text-xs font-extrabold transition-all duration-300 whitespace-nowrap flex items-center gap-1.5 ${
                  activeCategory === cat
                    ? 'bg-brand-navy text-brand-gold shadow-luxury border border-brand-gold/30'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                <span>{cat === 'All' ? 'All Vehicles' : cat}</span>
                {activeCategory === cat && <Check className="w-3.5 h-3.5 text-brand-gold" />}
              </button>
            ))}
          </div>
        </div>

        {/* Cars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCars.map((car) => (
            <FleetCard
              key={car.id}
              car={car}
              onViewDetails={handleViewDetails}
              onBookNow={handleBookNow}
            />
          ))}
        </div>

      </div>

      {/* Car Modal */}
      {selectedCarForModal && (
        <CarModal
          car={selectedCarForModal}
          mode={modalMode}
          onClose={() => setSelectedCarForModal(null)}
          onConfirmBooking={(car, details) => {
            setSelectedCarForModal(null);
            onBookNowTriggered(car, details);
          }}
        />
      )}
    </section>
  );
}
