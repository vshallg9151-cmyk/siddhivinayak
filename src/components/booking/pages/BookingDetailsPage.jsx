import React, { useState, useEffect } from 'react';
import StepProgressHeader from '../StepProgressHeader';
import CustomerForm from '../CustomerForm';
import DocumentUpload from '../DocumentUpload';
import RentalTypeCard from '../RentalTypeCard';
import BackgroundWrapper from '../../common/BackgroundWrapper';
import { useBooking } from '../../../context/BookingContext';
import { useAuth } from '../../../context/AuthContext';
import { validateIndianMobile } from '../../../services/smsGateway';
import { validateEmailAddress } from '../../../services/emailService';
import { validateDrivingLicenseNumber, validateGovtIdNumber } from '../../../services/govtVerificationService';
import { ArrowRight, AlertTriangle, MapPin, Truck, Check, Sparkles } from 'lucide-react';

const CITIES = ['Mumbai', 'Surat', 'Pune', 'Delhi', 'Goa', 'Ahmedabad', 'Bengaluru', 'Hyderabad'];

export default function BookingDetailsPage({ onNavigate }) {
  const { user } = useBooking();
  const { user: authUser } = useAuth();
  const { bookingData, updateBookingData, setStepReached } = useBooking();

  const [errorMessage, setErrorMessage] = useState('');

  // Pre-fill user data if authUser exists and bookingData is empty
  useEffect(() => {
    if (authUser) {
      updateBookingData({
        fullName: bookingData.fullName || authUser.name || '',
        mobile: bookingData.mobile || authUser.mobile || '',
        email: bookingData.email || authUser.email || ''
      });
    }
  }, [authUser]);

  const isSelfDrive = bookingData.rentalType === 'self-drive';

  const handleNext = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    // 1. Route Cities Validation
    if (!bookingData.pickupCity || !bookingData.returnCity) {
      setErrorMessage('Please select both Pickup Location and Drop Location.');
      return;
    }

    // 2. Customer Name Validation
    if (!bookingData.fullName || bookingData.fullName.trim().length < 2) {
      setErrorMessage('Please enter your valid Full Name (at least 2 characters).');
      return;
    }

    // 3. Mobile Number Validation
    const mobileCheck = validateIndianMobile(bookingData.mobile);
    if (!mobileCheck.valid) {
      setErrorMessage(mobileCheck.error || 'Please enter a valid 10-digit Indian Mobile Number.');
      return;
    }

    // 4. Email Validation (if provided)
    if (bookingData.email) {
      const emailCheck = await validateEmailAddress(bookingData.email);
      if (!emailCheck.valid) {
        setErrorMessage(emailCheck.error || 'Please enter a valid email address.');
        return;
      }
    }

    // 5. Driving License Validation (for Self Drive)
    if (isSelfDrive) {
      const dlCheck = validateDrivingLicenseNumber(bookingData.dlNumber);
      if (!dlCheck.valid) {
        setErrorMessage(`⚠️ Driving License Error: ${dlCheck.error}`);
        return;
      }
      if (!bookingData.dlUploaded) {
        setErrorMessage('⚠️ Mandatory: Please upload your Driving License copy & complete verification.');
        return;
      }
    }

    // 6. Govt ID Number & Document Validation
    const idCheck = validateGovtIdNumber(bookingData.idType || 'Aadhaar', bookingData.idNumber);
    if (!idCheck.valid) {
      setErrorMessage(`⚠️ Govt ID Error (${bookingData.idType || 'Aadhaar'}): ${idCheck.error}`);
      return;
    }
    if (!bookingData.idUploaded) {
      setErrorMessage(`⚠️ Mandatory: Please upload your ${bookingData.idType || 'Govt ID'} document copy & complete verification.`);
      return;
    }

    // Success -> set step reached to 3 and navigate
    setStepReached(3);
    onNavigate('dates');
  };

  return (
    <BackgroundWrapper>
      <div className="pt-28 sm:pt-32 pb-20 bg-transparent min-h-screen text-slate-100 font-sans">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Step Progress Indicator */}
        <StepProgressHeader currentStep={2} highestStepReached={bookingData.highestStepReached} onNavigate={onNavigate} />

        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-black text-white flex items-center gap-2">
            <MapPin className="w-7 h-7 text-amber-400" />
            Step 2: Booking Details
          </h1>
          <p className="text-xs text-slate-400 mt-1 font-medium">
            Choose trip locations, rental mode, and enter passenger details to configure your trip.
          </p>
        </div>

        {/* Error Banner */}
        {errorMessage && (
          <div className="mb-6 p-4 bg-rose-950/80 border border-rose-500/60 rounded-2xl text-xs font-bold text-rose-300 flex items-center gap-3 animate-in fade-in">
            <AlertTriangle className="w-5 h-5 shrink-0 text-rose-400" />
            <span>{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handleNext} className="space-y-8">
          
          {/* Section 1: Trip Type & Locations */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
            <h2 className="text-sm font-extrabold text-amber-400 uppercase tracking-wider flex items-center gap-2">
              <Sparkles className="w-4 h-4" /> 1. Trip Type & Delivery Mode
            </h2>

            {/* Rental Mode Selection */}
            <RentalTypeCard
              rentalType={bookingData.rentalType}
              onChange={(mode) => updateBookingData({ rentalType: mode })}
            />

            {/* Pickup & Drop Cities */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div>
                <label className="text-[11px] font-bold text-slate-300 uppercase tracking-wider block mb-1.5">
                  Pickup Location / City *
                </label>
                <select
                  value={bookingData.pickupCity}
                  onChange={(e) => updateBookingData({ pickupCity: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-2xl px-4 py-3 text-xs font-bold text-white outline-none focus:ring-2 focus:ring-amber-500"
                >
                  {CITIES.map((c) => (
                    <option key={c} value={c}>
                      📍 {c}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-300 uppercase tracking-wider block mb-1.5">
                  Drop Location / Destination *
                </label>
                <select
                  value={bookingData.returnCity}
                  onChange={(e) => updateBookingData({ returnCity: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-2xl px-4 py-3 text-xs font-bold text-white outline-none focus:ring-2 focus:ring-amber-500"
                >
                  {CITIES.map((c) => (
                    <option key={c} value={c}>
                      🏁 {c}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Delivery Option */}
            <div>
              <label className="text-[11px] font-bold text-slate-300 uppercase tracking-wider block mb-1.5">
                Vehicle Pickup / Delivery Option
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  'Doorstep Delivery',
                  'Airport Pickup',
                  'Office Delivery',
                  'Hub Self Pick'
                ].map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => updateBookingData({ deliveryOption: opt })}
                    className={`p-3 rounded-2xl text-xs font-bold border transition-all text-left flex items-center justify-between ${
                      bookingData.deliveryOption === opt
                        ? 'bg-amber-500/20 border-amber-500 text-amber-300 shadow-md'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <span>{opt}</span>
                    {bookingData.deliveryOption === opt && <Check className="w-4 h-4 text-amber-400 shrink-0" />}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Section 2: Customer Details */}
          <CustomerForm
            formData={bookingData}
            setFormData={(newFields) => updateBookingData(newFields)}
            rentalType={bookingData.rentalType}
          />

          {/* Section 3: Document Uploads */}
          <DocumentUpload
            rentalType={bookingData.rentalType}
            dlNumber={bookingData.dlNumber}
            setDlNumber={(val) => updateBookingData({ dlNumber: val })}
            idType={bookingData.idType || 'Aadhaar'}
            setIdType={(val) => updateBookingData({ idType: val })}
            idNumber={bookingData.idNumber}
            setIdNumber={(val) => updateBookingData({ idNumber: val })}
            dlUploaded={bookingData.dlUploaded}
            setDlUploaded={(val) => updateBookingData({ dlUploaded: val })}
            idUploaded={bookingData.idUploaded}
            setIdUploaded={(val) => updateBookingData({ idUploaded: val })}
          />

          {/* Action Buttons */}
          <div className="flex items-center justify-end pt-4">
            <button
              type="submit"
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-sm shadow-xl shadow-amber-500/20 transition-all flex items-center gap-2 hover:scale-[1.02]"
            >
              Continue to Date & Time Selection
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>

        </form>
      </div>
    </div>
    </BackgroundWrapper>
  );
}
