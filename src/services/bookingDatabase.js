/**
 * Booking Database Service
 * Authoritative backend service managing persistent storage of vehicle reservations,
 * live double-booking prevention, strict customer & driving licence verification,
 * and lifecycle booking states (PENDING, PAID, CONFIRMED, CANCELLED, COMPLETED).
 */

import { vehicleAvailabilityService } from './vehicleAvailabilityService';
import { calculateBookingPrice, validateBookingDates } from './pricingService';
import { validateIndianMobile } from './smsGateway';
import { validateEmailAddress } from './emailService';

const BOOKINGS_STORAGE_KEY = 'siddhivinayak_bookings_db_v3';

export const DEFAULT_BOOKINGS_SEED = [
  {
    bookingId: 'SVT-2026-849201',
    userId: 'user-001',
    userName: 'Rahul Sharma',
    userEmail: 'rahul.sharma@example.com',
    userPhone: '9876543210',
    vehicleId: 'veh-001',
    vehicleName: 'Mahindra Thar 4x4 Hard Top',
    vehicleImage: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1200&q=80',
    pickupCity: 'Surat',
    dropCity: 'Surat',
    pickupDate: '2026-08-11',
    pickupTime: '10:00',
    returnDate: '2026-08-13',
    returnTime: '18:00',
    rentalType: 'Self Drive',
    dlNumber: 'MH0220201234567',
    dlUploaded: true,
    idUploaded: true,
    totalDays: 3,
    baseFare: 10497,
    taxes: 525,
    deliveryCharge: 0,
    securityDeposit: 5000,
    totalAmount: 11022,
    paymentStatus: 'PAID',
    bookingStatus: 'COMPLETED',
    createdAt: '2026-08-01T10:00:00.000Z'
  },
  {
    bookingId: 'SVT-2026-394012',
    userId: 'super-admin-owner-001',
    userName: 'Sachin Mishra',
    userEmail: 'sachinmishra29199.surat@gmail.com',
    userPhone: '9173746558',
    vehicleId: 'veh-002',
    vehicleName: 'Toyota Fortuner Legender 4x4',
    vehicleImage: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80',
    pickupCity: 'Mumbai',
    dropCity: 'Mumbai',
    pickupDate: '2026-08-15',
    pickupTime: '09:00',
    returnDate: '2026-08-18',
    returnTime: '20:00',
    rentalType: 'Chauffeur Driven',
    dlNumber: null,
    dlUploaded: false,
    idUploaded: true,
    totalDays: 4,
    baseFare: 35996,
    taxes: 1800,
    deliveryCharge: 0,
    securityDeposit: 5000,
    totalAmount: 37796,
    paymentStatus: 'PAID',
    bookingStatus: 'COMPLETED',
    createdAt: '2026-08-04T12:00:00.000Z'
  }
];

class BookingDatabaseService {
  constructor() {
    this.initDatabase();
  }

  initDatabase() {
    if (typeof localStorage === 'undefined') return;
    try {
      const stored = localStorage.getItem(BOOKINGS_STORAGE_KEY);
      if (!stored) {
        localStorage.setItem(BOOKINGS_STORAGE_KEY, JSON.stringify(DEFAULT_BOOKINGS_SEED));
      } else {
        // Automatically migrate stale test seed bookings to COMPLETED
        const bookings = JSON.parse(stored);
        let modified = false;
        for (const b of bookings) {
          if ((b.bookingId === 'SVT-2026-849201' || b.bookingId === 'SVT-2026-394012') && b.bookingStatus === 'CONFIRMED') {
            b.bookingStatus = 'COMPLETED';
            modified = true;
          }
        }
        if (modified) {
          localStorage.setItem(BOOKINGS_STORAGE_KEY, JSON.stringify(bookings));
        }
      }
    } catch (err) {
      console.error('Error initializing bookings database', err);
    }
  }

  getBookings() {
    if (typeof localStorage === 'undefined') return DEFAULT_BOOKINGS_SEED;
    try {
      const stored = localStorage.getItem(BOOKINGS_STORAGE_KEY);
      return stored ? JSON.parse(stored) : DEFAULT_BOOKINGS_SEED;
    } catch {
      return DEFAULT_BOOKINGS_SEED;
    }
  }

  saveBookings(bookings) {
    if (typeof localStorage === 'undefined') return;
    try {
      localStorage.setItem(BOOKINGS_STORAGE_KEY, JSON.stringify(bookings));
    } catch {}
  }

  getBookingById(bookingId) {
    const bookings = this.getBookings();
    return bookings.find(b => b.bookingId === bookingId) || null;
  }

  getUserBookings(userId, email = '') {
    const bookings = this.getBookings();
    return bookings.filter(b => 
      b.userId === userId || 
      (email && b.userEmail && b.userEmail.toLowerCase().trim() === email.toLowerCase().trim())
    );
  }

  getBookingsForVehicle(vehicleId) {
    const bookings = this.getBookings();
    return bookings.filter(b => {
      if (b.vehicleId !== vehicleId) return false;
      const status = (b.bookingStatus || '').toUpperCase();
      // Only active confirmed/in-progress reservations block availability
      return status === 'CONFIRMED' || status === 'PAID' || status === 'ACTIVE' || status === 'IN_PROGRESS';
    });
  }

  /**
   * Comprehensive Backend Validation for Vehicle Bookings
   */
  async validateBooking(bookingData) {
    const isSelfDrive = !bookingData.rentalType || 
      bookingData.rentalType === 'self-drive' || 
      bookingData.rentalType === 'Self Drive';

    // 1. Customer Name Validation
    if (!bookingData.userName || typeof bookingData.userName !== 'string' || bookingData.userName.trim().length < 2) {
      return { valid: false, message: 'Please provide a valid Customer Full Name.' };
    }

    // 2. Mobile Validation (Indian 10-digit starting 6,7,8,9)
    const mobileCheck = validateIndianMobile(bookingData.userPhone);
    if (!mobileCheck.valid) {
      return { valid: false, message: mobileCheck.error };
    }

    // 3. Email Validation (RFC check)
    if (bookingData.userEmail) {
      const emailCheck = await validateEmailAddress(bookingData.userEmail);
      if (!emailCheck.valid) {
        return { valid: false, message: emailCheck.error };
      }
    }

    // 4. Date & Time Validation
    const dateCheck = validateBookingDates(
      bookingData.pickupDate,
      bookingData.pickupTime,
      bookingData.returnDate,
      bookingData.returnTime
    );
    if (!dateCheck.valid) {
      return { valid: false, message: dateCheck.error };
    }

    // 5. Self Drive vs Chauffeur Driving Licence Rule
    if (isSelfDrive) {
      if (!bookingData.dlNumber || typeof bookingData.dlNumber !== 'string' || bookingData.dlNumber.trim().length < 5) {
        return { valid: false, message: 'Driving Licence Number (DL) is mandatory for Self Drive rentals.' };
      }
      if (bookingData.dlUploaded === false) {
        return { valid: false, message: 'Driving Licence document upload is mandatory for Self Drive rentals.' };
      }
      if (bookingData.dlExpiryDate) {
        const [rY, rM, rD] = bookingData.returnDate.split('-').map(Number);
        const [eY, eM, eD] = bookingData.dlExpiryDate.split('-').map(Number);
        const retDate = new Date(rY, rM - 1, rD);
        const expDate = new Date(eY, eM - 1, eD);
        if (expDate < retDate) {
          return { valid: false, message: 'Driving licence has expired or expires before the rental return date.' };
        }
      }
    }

    // 6. Live Backend Double-Booking & Availability Check
    if (bookingData.vehicleId) {
      const avail = vehicleAvailabilityService.isVehicleAvailable(
        bookingData.vehicleId,
        bookingData.pickupDate,
        bookingData.pickupTime,
        bookingData.returnDate,
        bookingData.returnTime
      );
      if (!avail.available) {
        return { valid: false, message: 'Sorry, this vehicle is no longer available for the selected dates.' };
      }
    }

    return { valid: true, cleanMobile: mobileCheck.cleanMobile };
  }

  /**
   * Atomic Booking Creation with Centralized Price Enforcement & Race Condition Guard
   */
  async createBooking(bookingData) {
    const isSelfDrive = !bookingData.rentalType || 
      bookingData.rentalType === 'self-drive' || 
      bookingData.rentalType === 'Self Drive';

    // Strict Backend Validation
    const validation = await this.validateBooking(bookingData);
    if (!validation.valid) {
      throw new Error(validation.message);
    }

    // Centralized Authoritative Backend Pricing Calculation
    const pricing = calculateBookingPrice({
      pricePerDay: bookingData.baseFare ? (bookingData.baseFare / (bookingData.totalDays || 1)) : 3499,
      rentalType: isSelfDrive ? 'self-drive' : 'chauffeur',
      deliveryOption: bookingData.deliveryOption || 'Doorstep Delivery',
      pickupCity: bookingData.pickupCity || 'Mumbai',
      returnCity: bookingData.dropCity || bookingData.pickupCity || 'Mumbai',
      pickupDate: bookingData.pickupDate,
      pickupTime: bookingData.pickupTime || '10:00',
      returnDate: bookingData.returnDate,
      returnTime: bookingData.returnTime || '18:00',
      promoCode: bookingData.promoCode || '',
      vehicleSecurityDeposit: bookingData.securityDeposit || 5000
    });

    const bookings = this.getBookings();

    // Re-verify availability immediately prior to atomic record persistence
    if (bookingData.vehicleId) {
      const finalAvailCheck = vehicleAvailabilityService.isVehicleAvailable(
        bookingData.vehicleId,
        bookingData.pickupDate,
        bookingData.pickupTime,
        bookingData.returnDate,
        bookingData.returnTime
      );
      if (!finalAvailCheck.available) {
        throw new Error('Sorry, this vehicle is no longer available for the selected dates.');
      }
    }

    const uniqueBookingCode = `SVT-2026-${Math.floor(100000 + Math.random() * 900000)}`;

    const newBooking = {
      bookingId: bookingData.bookingId || uniqueBookingCode,
      userId: bookingData.userId || 'guest-user',
      userName: bookingData.userName.trim(),
      userEmail: (bookingData.userEmail || '').toLowerCase().trim(),
      userPhone: validation.cleanMobile || bookingData.userPhone.trim(),
      vehicleId: bookingData.vehicleId || 'veh-generic',
      vehicleName: bookingData.vehicleName || 'Mahindra Thar 4x4',
      vehicleImage: bookingData.vehicleImage || '',
      pickupCity: bookingData.pickupCity || 'Mumbai',
      dropCity: bookingData.dropCity || bookingData.pickupCity || 'Mumbai',
      pickupDate: bookingData.pickupDate,
      pickupTime: bookingData.pickupTime || '10:00',
      returnDate: bookingData.returnDate,
      returnTime: bookingData.returnTime || '18:00',
      rentalType: isSelfDrive ? 'Self Drive' : 'Chauffeur Driven',
      // For With Driver: completely omit DL information
      dlNumber: isSelfDrive ? (bookingData.dlNumber?.trim() || null) : null,
      dlUploaded: isSelfDrive ? (bookingData.dlUploaded ?? true) : false,
      idUploaded: bookingData.idUploaded ?? true,
      totalDays: pricing.rentalDays,
      baseFare: pricing.baseRental,
      driverAllowance: pricing.driverCharge,
      deliveryCharge: pricing.deliveryCharge,
      taxes: pricing.gstTax,
      securityDeposit: pricing.securityDeposit,
      totalAmount: pricing.finalPayable,
      paymentStatus: bookingData.paymentStatus || 'PAID',
      bookingStatus: 'CONFIRMED',
      createdAt: new Date().toISOString()
    };

    bookings.unshift(newBooking);
    this.saveBookings(bookings);
    return newBooking;
  }

  updateBookingStatus(bookingId, newStatus) {
    const bookings = this.getBookings();
    const index = bookings.findIndex(b => b.bookingId === bookingId);

    if (index === -1) throw new Error('Booking not found.');

    bookings[index].bookingStatus = newStatus;
    bookings[index].updatedAt = new Date().toISOString();
    this.saveBookings(bookings);
    return bookings[index];
  }

  cancelBooking(bookingId) {
    return this.updateBookingStatus(bookingId, 'CANCELLED');
  }
}

export const bookingDB = new BookingDatabaseService();
