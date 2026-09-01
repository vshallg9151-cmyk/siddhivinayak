import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Car, Hotel, Plane, Train, Bus, Compass, Search, Calendar, Users, 
  ChevronRight, CheckCircle2, DollarSign, ShieldCheck, ArrowRight, Star
} from 'lucide-react';
import { TOUR_PACKAGES_DATA, HOTELS_CATALOG_DATA, FLIGHTS_DATA, TRAINS_DATA, BUSES_DATA } from '../../data/phase5Data';
import { FLEET_CARS } from '../../data/mockData';
import PaymentGatewayModal from './PaymentGatewayModal';
import BookingInvoiceModal from './BookingInvoiceModal';
import CitySearchableDropdown from '../common/CitySearchableDropdown';

export default function UnifiedBookingPage({ onCompleteBooking, initialCategory = 'packages' }) {
  const [activeCategory, setActiveCategory] = useState(initialCategory); // 'packages' | 'hotels' | 'flights' | 'trains' | 'buses' | 'cabs'
  const [step, setStep] = useState(1); // 1: Search, 2: Select, 3: Traveler Info, 4: Review, 5: Confirmed

  const [searchCity, setSearchCity] = useState('Goa');
  const [selectedItem, setSelectedItem] = useState(TOUR_PACKAGES_DATA[0]);

  // Traveler Details Form
  const [travelerName, setTravelerName] = useState('Sachin Mishra');
  const [travelerPhone, setTravelerPhone] = useState('9173746558');
  const [travelerEmail, setTravelerEmail] = useState('sachin.mishra@example.com');
  const [travelersCount, setTravelersCount] = useState(2);
  const [specialRequests, setSpecialRequests] = useState('Need non-smoking room / Jain food');

  // Modals
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [isInvoiceOpen, setIsInvoiceOpen] = useState(false);
  const [confirmedBookingData, setConfirmedBookingData] = useState(null);

  const handleSelectItem = (item) => {
    setSelectedItem(item);
    setStep(3); // Move to Traveler Info
  };

  const handleReviewBooking = (e) => {
    e.preventDefault();
    setStep(4); // Move to Review
  };

  const handleLaunchPayment = () => {
    setIsPaymentOpen(true);
  };

  const handlePaymentSuccess = (receipt) => {
    const booking = {
      bookingId: receipt.bookingId,
      passengerName: travelerName,
      phone: travelerPhone,
      email: travelerEmail,
      title: selectedItem.title || selectedItem.name || selectedItem.airline || selectedItem.operator || 'Travel Booking',
      totalPrice: selectedItem.pricePerPerson ? selectedItem.pricePerPerson * travelersCount : selectedItem.pricePerNight ? selectedItem.pricePerNight * travelersCount : selectedItem.pricePerDay ? selectedItem.pricePerDay : 12499,
      status: 'CONFIRMED',
      category: activeCategory,
      travelDates: new Date().toLocaleDateString(),
      city: searchCity
    };

    setConfirmedBookingData(booking);
    setIsPaymentOpen(false);
    setStep(5); // Confirmed Step

    if (onCompleteBooking) {
      onCompleteBooking(booking);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Category Tabs Navigation Bar */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-3 shadow-2xl flex items-center justify-between gap-2 overflow-x-auto no-scrollbar">
          {[
            { key: 'packages', label: 'Tour Packages', icon: Compass },
            { key: 'hotels', label: 'Hotels', icon: Hotel },
            { key: 'cabs', label: 'Cabs & Self-Drive', icon: Car },
            { key: 'flights', label: 'Flights', icon: Plane },
            { key: 'trains', label: 'Trains', icon: Train },
            { key: 'buses', label: 'Buses', icon: Bus }
          ].map((cat) => {
            const IconComp = cat.icon;
            return (
              <button
                key={cat.key}
                onClick={() => { setActiveCategory(cat.key); setStep(1); }}
                className={`px-5 py-3 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
                  activeCategory === cat.key
                    ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-lg font-extrabold'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <IconComp className="w-4 h-4" /> {cat.label}
              </button>
            );
          })}
        </div>

        {/* Step Indicator */}
        <div className="flex items-center justify-center gap-3 text-xs font-bold">
          <span className={`px-3 py-1 rounded-full border ${step >= 1 ? 'bg-amber-500 text-slate-950 border-amber-400' : 'bg-slate-900 text-slate-500 border-slate-800'}`}>
            1. Search
          </span>
          <span className="text-slate-600">→</span>
          <span className={`px-3 py-1 rounded-full border ${step >= 2 ? 'bg-amber-500 text-slate-950 border-amber-400' : 'bg-slate-900 text-slate-500 border-slate-800'}`}>
            2. Select
          </span>
          <span className="text-slate-600">→</span>
          <span className={`px-3 py-1 rounded-full border ${step >= 3 ? 'bg-amber-500 text-slate-950 border-amber-400' : 'bg-slate-900 text-slate-500 border-slate-800'}`}>
            3. Traveler Info
          </span>
          <span className="text-slate-600">→</span>
          <span className={`px-3 py-1 rounded-full border ${step >= 4 ? 'bg-amber-500 text-slate-950 border-amber-400' : 'bg-slate-900 text-slate-500 border-slate-800'}`}>
            4. Payment
          </span>
        </div>

        {/* Step 1 & 2: Search & Selection List */}
        {(step === 1 || step === 2) && (
          <div className="space-y-6">
            
            {/* Search Bar Header with CitySearchableDropdown */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="w-full sm:w-80">
                <CitySearchableDropdown
                  label="Select Destination / City"
                  value={searchCity}
                  onChange={setSearchCity}
                  placeholder="Filter destination city..."
                  icon={Search}
                />
              </div>
              <span className="text-xs text-amber-400 font-bold bg-amber-500/10 px-3 py-1.5 rounded-full border border-amber-500/30">
                100% Instant Confirmation Available
              </span>
            </div>

            {/* Content Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {activeCategory === 'packages' && TOUR_PACKAGES_DATA.map(pkg => (
                <div key={pkg.id} className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-xl space-y-4 flex flex-col justify-between p-5">
                  <img src={pkg.image} alt={pkg.title} className="w-full h-44 object-cover rounded-2xl" />
                  <div className="space-y-2">
                    <span className="text-[10px] bg-amber-500/20 text-amber-400 px-2.5 py-0.5 rounded-md font-extrabold uppercase border border-amber-500/30">
                      {pkg.badge}
                    </span>
                    <h3 className="font-bold text-base text-slate-100">{pkg.title}</h3>
                    <p className="text-xs text-slate-400">{pkg.duration} • {pkg.hotelCategory}</p>
                    <p className="text-xs text-emerald-400 font-semibold">✓ {pkg.includedTransport}</p>
                  </div>

                  <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                    <div>
                      <span className="text-xs text-slate-400 line-through">₹{pkg.originalPrice}</span>
                      <p className="text-xl font-black text-amber-400">₹{pkg.pricePerPerson.toLocaleString()}<span className="text-xs text-slate-400 font-normal">/person</span></p>
                    </div>
                    <button
                      onClick={() => handleSelectItem(pkg)}
                      className="px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl text-xs flex items-center gap-1"
                    >
                      Book Now <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}

              {activeCategory === 'hotels' && HOTELS_CATALOG_DATA.map(htl => (
                <div key={htl.id} className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-xl space-y-4">
                  <img src={htl.image} alt={htl.name} className="w-full h-44 object-cover rounded-2xl" />
                  <h3 className="font-bold text-base text-slate-100">{htl.name}</h3>
                  <p className="text-xs text-amber-400 font-bold">⭐ {htl.rating} Rating</p>
                  <p className="text-xl font-black text-amber-400">₹{htl.pricePerNight.toLocaleString()}<span className="text-xs text-slate-400">/night</span></p>
                  <button
                    onClick={() => handleSelectItem(htl)}
                    className="w-full py-2.5 bg-amber-500 text-slate-950 font-bold rounded-xl text-xs"
                  >
                    Select Room & Book
                  </button>
                </div>
              ))}

              {activeCategory === 'cabs' && FLEET_CARS.map(car => (
                <div key={car.id} className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-xl space-y-4">
                  <img src={car.image} alt={car.name} className="w-full h-44 object-cover rounded-2xl" />
                  <h3 className="font-bold text-base text-slate-100">{car.name}</h3>
                  <p className="text-xs text-slate-400">{car.seats} Seats • {car.fuelType} • {car.transmission}</p>
                  <p className="text-xl font-black text-amber-400">₹{car.pricePerDay.toLocaleString()}<span className="text-xs text-slate-400">/day</span></p>
                  <button
                    onClick={() => handleSelectItem(car)}
                    className="w-full py-2.5 bg-amber-500 text-slate-950 font-bold rounded-xl text-xs"
                  >
                    Reserve Vehicle
                  </button>
                </div>
              ))}

              {activeCategory === 'flights' && FLIGHTS_DATA.map(fl => (
                <div key={fl.id} className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-xl space-y-3">
                  <span className="text-xs font-bold text-sky-400">{fl.airline}</span>
                  <h3 className="font-bold text-base text-slate-100">{fl.from} → {fl.to}</h3>
                  <p className="text-xs text-slate-400">{fl.depTime} - {fl.arrTime} ({fl.duration})</p>
                  <p className="text-xl font-black text-amber-400">₹{fl.price.toLocaleString()}</p>
                  <button
                    onClick={() => handleSelectItem(fl)}
                    className="w-full py-2.5 bg-amber-500 text-slate-950 font-bold rounded-xl text-xs"
                  >
                    Select Flight
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step 3: Traveler Details Form */}
        {step === 3 && (
          <form onSubmit={handleReviewBooking} className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 max-w-2xl mx-auto">
            <h3 className="text-xl font-bold text-slate-100 border-b border-slate-800 pb-3">
              Enter Traveler & Contact Information
            </h3>

            <div className="space-y-4">
              <div>
                <label className="text-xs text-slate-400 font-bold block mb-1">Lead Traveler Full Name</label>
                <input
                  type="text"
                  value={travelerName}
                  onChange={(e) => setTravelerName(e.target.value)}
                  required
                  className="w-full bg-slate-950 text-slate-100 text-xs font-semibold p-3.5 rounded-xl border border-slate-800 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-slate-400 font-bold block mb-1">Mobile Phone Number</label>
                  <input
                    type="tel"
                    value={travelerPhone}
                    onChange={(e) => setTravelerPhone(e.target.value)}
                    required
                    className="w-full bg-slate-950 text-slate-100 text-xs font-semibold p-3.5 rounded-xl border border-slate-800 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="text-xs text-slate-400 font-bold block mb-1">Email Address</label>
                  <input
                    type="email"
                    value={travelerEmail}
                    onChange={(e) => setTravelerEmail(e.target.value)}
                    required
                    className="w-full bg-slate-950 text-slate-100 text-xs font-semibold p-3.5 rounded-xl border border-slate-800 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs text-slate-400 font-bold block mb-1">Number of Passengers</label>
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={travelersCount}
                  onChange={(e) => setTravelersCount(parseInt(e.target.value) || 1)}
                  className="w-full bg-slate-950 text-slate-100 text-xs font-semibold p-3.5 rounded-xl border border-slate-800 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="text-xs text-slate-400 font-bold block mb-1">Special Dietary / Pickup Notes</label>
                <textarea
                  rows="2"
                  value={specialRequests}
                  onChange={(e) => setSpecialRequests(e.target.value)}
                  className="w-full bg-slate-950 text-slate-100 text-xs font-semibold p-3 rounded-xl border border-slate-800 focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            <div className="flex justify-between items-center pt-4 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="px-4 py-2.5 bg-slate-800 text-slate-300 font-bold text-xs rounded-xl"
              >
                Back to Search
              </button>
              <button
                type="submit"
                className="px-6 py-3 bg-amber-500 text-slate-950 font-black text-xs rounded-xl"
              >
                Review Booking Details →
              </button>
            </div>
          </form>
        )}

        {/* Step 4: Review Booking Summary */}
        {step === 4 && (
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 max-w-2xl mx-auto">
            <h3 className="text-xl font-bold text-slate-100 border-b border-slate-800 pb-3">
              Review Final Booking Summary
            </h3>

            <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-400">Selected Item:</span>
                <strong className="text-slate-100 font-bold">{selectedItem.title || selectedItem.name || selectedItem.airline}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Passenger Name:</span>
                <strong className="text-slate-100">{travelerName}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Phone & Email:</span>
                <strong className="text-slate-100">{travelerPhone} • {travelerEmail}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Total Travelers:</span>
                <strong className="text-amber-400">{travelersCount} Person(s)</strong>
              </div>
            </div>

            <div className="p-4 bg-emerald-950/20 text-emerald-300 border border-emerald-900/30 rounded-2xl text-xs space-y-1">
              <p className="font-bold flex items-center gap-1.5"><ShieldCheck className="w-4 h-4" /> Automated Confirmation Active</p>
              <p>Instant SMS & WhatsApp voucher will be dispatched to <strong>9173746558</strong> upon payment.</p>
            </div>

            <div className="flex justify-between items-center pt-4 border-t border-slate-800">
              <button
                onClick={() => setStep(3)}
                className="px-4 py-2.5 bg-slate-800 text-slate-300 font-bold text-xs rounded-xl"
              >
                Edit Traveler Info
              </button>
              <button
                onClick={handleLaunchPayment}
                className="px-8 py-3.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-sm rounded-xl shadow-xl flex items-center gap-2"
              >
                Proceed to Payment Gateway <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 5: Confirmed Voucher View */}
        {step === 5 && confirmedBookingData && (
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl text-center space-y-6 max-w-xl mx-auto">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border-2 border-emerald-500/40">
              <CheckCircle2 className="w-10 h-10 animate-bounce" />
            </div>

            <div>
              <h2 className="text-2xl font-black text-slate-100">Booking Confirmed!</h2>
              <p className="text-xs text-slate-400 mt-1">Confirmation Order: <strong className="text-amber-400">{confirmedBookingData.bookingId}</strong></p>
            </div>

            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 text-left text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-400">Item:</span>
                <strong className="text-slate-100">{confirmedBookingData.title}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Passenger:</span>
                <strong className="text-slate-100">{confirmedBookingData.passengerName} ({confirmedBookingData.phone})</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Status:</span>
                <strong className="text-emerald-400">CONFIRMED & GUARANTEED</strong>
              </div>
            </div>

            <div className="flex justify-center gap-3">
              <button
                onClick={() => setIsInvoiceOpen(true)}
                className="px-6 py-3 bg-amber-500 text-slate-950 font-bold rounded-xl text-xs"
              >
                View & Download Tax Invoice
              </button>
            </div>
          </div>
        )}

      </div>

      {/* Payment Gateway Modal */}
      <PaymentGatewayModal
        isOpen={isPaymentOpen}
        onClose={() => setIsPaymentOpen(false)}
        bookingDetails={{
          bookingId: `SV-${Math.floor(100000 + Math.random() * 900000)}`,
          totalPrice: selectedItem.pricePerPerson ? selectedItem.pricePerPerson * travelersCount : selectedItem.pricePerNight ? selectedItem.pricePerNight * travelersCount : selectedItem.pricePerDay ? selectedItem.pricePerDay : 12499
        }}
        onPaymentSuccess={handlePaymentSuccess}
      />

      {/* Invoice Modal */}
      <BookingInvoiceModal
        isOpen={isInvoiceOpen}
        onClose={() => setIsInvoiceOpen(false)}
        booking={confirmedBookingData}
      />
    </div>
  );
}
