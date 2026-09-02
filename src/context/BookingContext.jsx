import React, { createContext, useContext, useState, useEffect } from 'react';
import { FLEET_CARS } from '../data/mockData';

const BookingContext = createContext();

const BOOKING_SESSION_KEY = 'siddhivinayak_booking_session_v1';

const getInitialDates = () => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const returnDay = new Date();
  returnDay.setDate(returnDay.getDate() + 4);
  const format = (d) => {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
  };
  return { pickupDate: format(tomorrow), returnDate: format(returnDay) };
};

export function BookingProvider({ children }) {
  const initialDates = getInitialDates();

  const [bookingData, setBookingData] = useState(() => {
    try {
      const saved = sessionStorage.getItem(BOOKING_SESSION_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Error loading booking session', e);
    }
    return {
      pickupCity: 'Mumbai',
      returnCity: 'Mumbai',
      rentalType: 'self-drive',
      deliveryOption: 'Doorstep Delivery',
      fullName: '',
      mobile: '',
      email: '',
      city: 'Mumbai',
      dlNumber: '',
      specialRequirements: '',
      dlUploaded: false,
      idUploaded: false,
      pickupDate: initialDates.pickupDate,
      pickupTime: '10:00',
      returnDate: initialDates.returnDate,
      returnTime: '18:00',
      selectedCar: FLEET_CARS[0],
      agreedToTerms: true,
      highestStepReached: 1
    };
  });

  // Sync with sessionStorage on changes
  useEffect(() => {
    try {
      sessionStorage.setItem(BOOKING_SESSION_KEY, JSON.stringify(bookingData));
    } catch (e) {
      console.error('Error saving booking session', e);
    }
  }, [bookingData]);

  const updateBookingData = (fields) => {
    setBookingData((prev) => ({ ...prev, ...fields }));
  };

  const setStepReached = (stepNum) => {
    setBookingData((prev) => ({
      ...prev,
      highestStepReached: Math.max(prev.highestStepReached || 1, stepNum)
    }));
  };

  const selectCar = (car) => {
    setBookingData((prev) => ({
      ...prev,
      selectedCar: car,
      highestStepReached: Math.max(prev.highestStepReached || 1, 4)
    }));
  };

  const resetBooking = () => {
    const freshDates = getInitialDates();
    const fresh = {
      pickupCity: 'Mumbai',
      returnCity: 'Mumbai',
      rentalType: 'self-drive',
      deliveryOption: 'Doorstep Delivery',
      fullName: '',
      mobile: '',
      email: '',
      city: 'Mumbai',
      dlNumber: '',
      specialRequirements: '',
      dlUploaded: false,
      idUploaded: false,
      pickupDate: freshDates.pickupDate,
      pickupTime: '10:00',
      returnDate: freshDates.returnDate,
      returnTime: '18:00',
      selectedCar: FLEET_CARS[0],
      agreedToTerms: true,
      highestStepReached: 1
    };
    setBookingData(fresh);
    sessionStorage.removeItem(BOOKING_SESSION_KEY);
  };

  return (
    <BookingContext.Provider
      value={{
        bookingData,
        updateBookingData,
        setStepReached,
        selectCar,
        resetBooking
      }}
    >
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
}
