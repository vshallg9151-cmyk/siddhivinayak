/**
 * Centralized Pricing Engine & Date-Time Calculation Service
 * Authoritative single-source pricing for all vehicle booking operations.
 * Prevents client-side price tampering and guarantees consistent calculations.
 */

export const PRICING_CONFIG = {
  GST_RATE: 0.05, // 5% GST for passenger transport services in India
  CHAUFFEUR_DAILY_ALLOWANCE: 500, // ₹500 / day
  DELIVERY_CHARGE: 300, // ₹300 for doorstep delivery / airport / one-way
  DEFAULT_SECURITY_DEPOSIT: 5000, // ₹5,000 refundable security deposit
  MIN_HOURS_SAME_DAY: 2 // minimum hours if same-day booking
};

/**
 * Validate pickup and return dates and times
 */
export function validateBookingDates(pickupDate, pickupTime = '10:00', returnDate, returnTime = '18:00') {
  if (!pickupDate) {
    return { valid: false, error: 'Pickup date is required.' };
  }
  if (!returnDate) {
    return { valid: false, error: 'Return date is required.' };
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [pYear, pMonth, pDay] = pickupDate.split('-').map(Number);
  const pickupObj = new Date(pYear, pMonth - 1, pDay);
  pickupObj.setHours(0, 0, 0, 0);

  if (pickupObj < today) {
    return { valid: false, error: 'Pickup date cannot be in the past.' };
  }

  const [rYear, rMonth, rDay] = returnDate.split('-').map(Number);
  const returnObj = new Date(rYear, rMonth - 1, rDay);
  returnObj.setHours(0, 0, 0, 0);

  if (returnObj < pickupObj) {
    return { valid: false, error: 'Return date cannot be before pickup date.' };
  }

  const [pHours, pMins] = (pickupTime || '10:00').split(':').map(Number);
  const [rHours, rMins] = (returnTime || '18:00').split(':').map(Number);

  const startMs = new Date(pYear, pMonth - 1, pDay, pHours, pMins || 0).getTime();
  const endMs = new Date(rYear, rMonth - 1, rDay, rHours, rMins || 0).getTime();

  if (endMs <= startMs) {
    return { valid: false, error: 'Return time must be after pickup time.' };
  }

  const diffHours = (endMs - startMs) / (1000 * 60 * 60);
  if (diffHours < PRICING_CONFIG.MIN_HOURS_SAME_DAY) {
    return { valid: false, error: `Minimum rental duration is ${PRICING_CONFIG.MIN_HOURS_SAME_DAY} hours.` };
  }

  let totalDays = Math.ceil(diffHours / 24);
  if (totalDays <= 0) totalDays = 1;

  return {
    valid: true,
    error: null,
    totalDays,
    diffHours: Math.round(diffHours),
    startMs,
    endMs
  };
}

/**
 * Authoritative pricing calculation
 */
export function calculateBookingPrice({
  pricePerDay = 3499,
  rentalType = 'self-drive', // 'self-drive' | 'chauffeur'
  deliveryOption = 'Doorstep Delivery', // 'Doorstep Delivery' | 'Airport Pickup' | 'Office Delivery' | 'Hub Self Pick'
  pickupCity = 'Mumbai',
  returnCity = 'Mumbai',
  pickupDate,
  pickupTime = '10:00',
  returnDate,
  returnTime = '18:00',
  promoCode = '',
  vehicleSecurityDeposit = 5000
}) {
  const isChauffeur = rentalType === 'chauffeur' || rentalType === 'Chauffeur Driven';
  const baseRate = Number(pricePerDay) || 3499;

  // 1. Calculate duration in days
  let rentalDays = 1;
  const dateCheck = validateBookingDates(pickupDate, pickupTime, returnDate, returnTime);
  if (dateCheck.valid) {
    rentalDays = dateCheck.totalDays;
  }

  // 2. Base vehicle rental
  const baseRental = baseRate * rentalDays;

  // 3. Chauffeur Driver allowance
  const driverCharge = isChauffeur ? PRICING_CONFIG.CHAUFFEUR_DAILY_ALLOWANCE * rentalDays : 0;

  // 4. Delivery / One-way charge
  const hasDelivery = deliveryOption === 'Doorstep Delivery' || deliveryOption === 'Airport Pickup' || (pickupCity && returnCity && pickupCity.toLowerCase().trim() !== returnCity.toLowerCase().trim());
  const deliveryCharge = hasDelivery ? PRICING_CONFIG.DELIVERY_CHARGE : 0;

  // 5. Subtotal before discount & taxes
  const subtotal = baseRental + driverCharge + deliveryCharge;

  // 6. Promo Code Discount
  let discountAmount = 0;
  let promoSuccessMsg = '';
  const cleanPromo = (promoCode || '').toUpperCase().trim();

  if (cleanPromo === 'WEEKEND20') {
    discountAmount = Math.round(baseRental * 0.20);
    promoSuccessMsg = `Promo code 'WEEKEND20' applied (-20%)`;
  } else if (cleanPromo === 'LONGTRIP35') {
    if (rentalDays >= 3) {
      discountAmount = Math.round(baseRental * 0.35);
      promoSuccessMsg = `Promo code 'LONGTRIP35' applied (-35%)`;
    } else {
      promoSuccessMsg = `Promo 'LONGTRIP35' requires minimum 3 days`;
    }
  } else if (cleanPromo === 'AIRPORTVIP') {
    discountAmount = 500;
    promoSuccessMsg = `Promo code 'AIRPORTVIP' applied (-₹500)`;
  }

  const taxableAmount = Math.max(0, subtotal - discountAmount);

  // 7. Government GST (5%)
  const gstTax = Math.round(taxableAmount * PRICING_CONFIG.GST_RATE);

  // 8. Refundable Security Deposit (Clearly separated from rental payable)
  const securityDeposit = Number(vehicleSecurityDeposit) || PRICING_CONFIG.DEFAULT_SECURITY_DEPOSIT;

  // 9. Total Final Payable Amount
  const finalPayable = taxableAmount + gstTax;

  return {
    rentalDays,
    baseRate,
    baseRental,
    driverCharge,
    deliveryCharge,
    subtotal,
    discountAmount,
    promoSuccessMsg,
    taxableAmount,
    gstTax,
    securityDeposit,
    finalPayable,
    isChauffeur
  };
}
