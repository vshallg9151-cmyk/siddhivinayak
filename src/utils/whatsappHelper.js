export const WHATSAPP_PHONE = '919173746558';
export const DISPLAY_PHONE = '+91 91737 46558';
export const PLAIN_PHONE = '9173746558';

export function formatWhatsAppURL(customText = '') {
  const msg = customText || 'Hello Siddhivinayak Tours and Travels, I am interested in booking a trip.';
  return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(msg)}`;
}

export function createWhatsAppEnquiryUrl(details = {}) {
  const carName = details.carName || 'Mahindra Thar 4x4';
  const rentalType = details.rentalType || 'Self Drive';
  const pickupCity = details.pickupCity || 'Mumbai';
  const pickupDate = details.pickupDate || 'DD/MM/YYYY';
  const returnDate = details.returnDate || 'DD/MM/YYYY';
  const duration = details.duration || '3 Days';
  const customerName = details.customerName ? `Customer Name: ${details.customerName}\n` : '';
  const priceText = details.finalPayable ? `Estimated Price: ₹${details.finalPayable.toLocaleString('en-IN')}\n` : '';

  const message = `Hello Siddhivinayak Tours and Travels,

I am interested in booking:

${customerName}Car: ${carName}
Rental Type: ${rentalType}
Pickup Location: ${pickupCity}
Pickup Date: ${pickupDate}
Return Date: ${returnDate}
Duration: ${duration}
${priceText}
Please share availability and final pricing.`;

  return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`;
}
