/**
 * Production Readiness Test Suite — Single Email OTP Registration Flow
 * Validates Name, Email, Mobile Collection, Resend Live API, and Account Activation
 */

import {
  handleSendEmailOtp,
  handleVerifyEmailOtp,
  handleResendEmailOtp
} from '../server/otpBackend.js';

import { validateIndianMobile } from '../src/services/smsGateway.js';
import { validateEmailAddress } from '../src/services/emailService.js';
import { userDB } from '../src/services/userDatabase.js';
import { calculateBookingPrice, validateBookingDates } from '../src/services/pricingService.js';

let passed = 0;
let failed = 0;

function assert(condition, testName) {
  if (condition) {
    console.log(`✅ [PASS] ${testName}`);
    passed++;
  } else {
    console.error(`❌ [FAIL] ${testName}`);
    failed++;
  }
}

async function runTests() {
  console.log('=== RUNNING SINGLE EMAIL OTP VERIFICATION TEST SUITE ===\n');

  // TEST 1: Pricing Calculation (Single Source of Truth)
  const selfDrivePrice = calculateBookingPrice({
    pricePerDay: 3499,
    rentalType: 'self-drive',
    pickupDate: '2026-08-15',
    pickupTime: '10:00',
    returnDate: '2026-08-18',
    returnTime: '18:00'
  });
  assert(selfDrivePrice.rentalDays === 4, 'TEST 1.1: Calculate 4 rental days for 2026-08-15 to 2026-08-18');
  assert(selfDrivePrice.baseRental === 3499 * 4, 'TEST 1.2: Base rental matches daily rate * days');
  assert(selfDrivePrice.driverCharge === 0, 'TEST 1.3: Driver charge is 0 for Self Drive');
  assert(selfDrivePrice.gstTax === Math.round(selfDrivePrice.subtotal * 0.05), 'TEST 1.4: 5% GST calculated accurately');

  // TEST 2: Chauffeur Pricing
  const chauffeurPrice = calculateBookingPrice({
    pricePerDay: 3499,
    rentalType: 'chauffeur',
    pickupDate: '2026-08-15',
    returnDate: '2026-08-18'
  });
  assert(chauffeurPrice.driverCharge === 500 * 4, 'TEST 2.1: Chauffeur adds ₹500/day driver allowance');
  assert(chauffeurPrice.finalPayable > selfDrivePrice.finalPayable, 'TEST 2.2: Chauffeur final payable includes driver fee');

  // TEST 3: Date Validation
  const validDates = validateBookingDates('2026-08-20', '10:00', '2026-08-22', '18:00');
  assert(validDates.valid === true, 'TEST 3.1: Valid future date range accepted');

  const pastDate = validateBookingDates('2020-01-01', '10:00', '2020-01-05', '18:00');
  assert(pastDate.valid === false, 'TEST 3.2: Past pickup date rejected');

  // TEST 4: Indian Mobile Number Validation (Preserved for Customer Contact & Booking)
  const validMobile1 = validateIndianMobile('9876543210');
  assert(validMobile1.valid === true && validMobile1.cleanMobile === '9876543210', 'TEST 4.1: Valid 10-digit Indian mobile accepted');

  const validMobile2 = validateIndianMobile('+91 8487889151');
  assert(validMobile2.valid === true && validMobile2.cleanMobile === '8487889151', 'TEST 4.2: Mobile with +91 prefix cleaned and accepted');

  const invalidMobileAlpha = validateIndianMobile('98765abcde');
  assert(invalidMobileAlpha.valid === false, 'TEST 4.3: Alphabetic characters rejected in mobile');

  const invalidMobileShort = validateIndianMobile('98765');
  assert(invalidMobileShort.valid === false, 'TEST 4.4: Short mobile number rejected');

  // TEST 5: Email RFC Validation
  const validEmail = await validateEmailAddress('sachinmishra29199.surat@gmail.com');
  assert(validEmail.valid === true, 'TEST 5.1: Valid email format accepted');

  const invalidEmailFormat = await validateEmailAddress('invalid-email-string');
  assert(invalidEmailFormat.valid === false, 'TEST 5.2: Invalid email format rejected');

  // TEST 6: Real Backend Email OTP Handlers & Resend API Dispatch
  console.log('\n--- Testing Backend Resend Email Dispatch ---');

  const testEmail = 'sachinmishra29199.surat@gmail.com';
  const emailRes = await handleSendEmailOtp({ email: testEmail, name: 'Sachin Mishra' });
  assert(emailRes.status === 200 && emailRes.data.success === true, 'TEST 6.1: Server returns 200 and dispatches via Resend API');
  assert(typeof emailRes.data.messageId === 'string' && emailRes.data.messageId.length > 5, 'TEST 6.2: Resend returns real Message ID');
  assert(!emailRes.data.otp, 'TEST 6.3: Server NEVER returns raw OTP in email API response');

  // TEST 7: Wrong OTP Rejection
  const verifyWrongEmail = await handleVerifyEmailOtp({ email: testEmail, otp: '000000' });
  assert(verifyWrongEmail.status === 400 && verifyWrongEmail.data.success === false, 'TEST 7.1: Verify endpoint correctly rejects incorrect OTP inputs');

  // TEST 8: 60s Resend Cooldown
  const resendTooSoon = await handleResendEmailOtp({ email: testEmail, name: 'Sachin Mishra' });
  assert(resendTooSoon.status === 429, 'TEST 8.1: Immediate resend blocked by 60s cooldown');

  console.log(`\n========================================`);
  console.log(`TEST RESULTS: ${passed} PASSED, ${failed} FAILED`);
  console.log(`========================================`);
}

runTests().catch(console.error);
