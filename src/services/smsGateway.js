/**
 * Production SMS Gateway Module (Client Layer)
 * Handles Indian mobile number normalization and proxies OTP dispatch
 * to the secure server-side endpoint (/api/auth/send-mobile-otp).
 *
 * CRITICAL SECURITY RULE:
 * 1. FAST2SMS_API_KEY is strictly server-side and never exposed to the frontend.
 * 2. Real OTP generation and dispatch occurs on the backend.
 */

import { apiSendMobileOtp } from './otpApiClient.js';

/**
 * Validate Indian Mobile Number (10 digits starting with 6, 7, 8, or 9)
 */
export function validateIndianMobile(mobile) {
  if (!mobile || typeof mobile !== 'string') {
    return { valid: false, error: 'Enter a valid Indian mobile number.' };
  }

  const raw = mobile.trim();

  // Reject if alphabetic characters or symbols (other than leading +, space, hyphen) are present
  if (/[a-zA-Z]/.test(raw) || /[^\d\s+\-]/.test(raw)) {
    return { valid: false, error: 'Mobile number must contain only digits.' };
  }

  // Clean and extract digits
  let clean = raw.replace(/\D/g, '');
  
  if (clean.length === 12 && clean.startsWith('91')) {
    clean = clean.slice(2);
  } else if (clean.length === 11 && clean.startsWith('0')) {
    clean = clean.slice(1);
  }

  if (clean.length !== 10) {
    return { valid: false, error: 'Indian mobile number must be exactly 10 digits.' };
  }

  if (!/^[6-9]/.test(clean)) {
    return { valid: false, error: 'Indian mobile number must start with 6, 7, 8, or 9.' };
  }

  return { valid: true, error: null, cleanMobile: clean };
}

/**
 * Dispatch SMS OTP via Secure Server Backend
 */
export async function sendSMSOTP({ mobile, name = 'Traveler' }) {
  const validation = validateIndianMobile(mobile);
  if (!validation.valid) {
    return {
      success: false,
      status: 'FAILED',
      error: validation.error,
      provider: null
    };
  }

  const result = await apiSendMobileOtp({ mobile: validation.cleanMobile, name });
  return {
    success: result.success,
    status: result.success ? 'DELIVERED' : 'FAILED',
    provider: 'Fast2SMS India',
    message: result.message,
    error: result.error
  };
}
