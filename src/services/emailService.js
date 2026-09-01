/**
 * Production Email Service Module (Client Layer)
 * Handles RFC-compliant email validation, domain checks, and proxies dispatch
 * to the secure server-side endpoint (/api/auth/send-email-otp).
 *
 * CRITICAL SECURITY RULE:
 * 1. RESEND_API_KEY is strictly server-side and never exposed to the frontend.
 * 2. Real OTP generation and dispatch occurs on the backend.
 */

import { apiSendEmailOtp } from './otpApiClient.js';

/**
 * Validate email format (RFC 5322) and check domain MX/DNS records
 */
export async function validateEmailAddress(email) {
  if (!email || typeof email !== 'string') {
    return { valid: false, error: 'Enter a valid email address.' };
  }

  const cleanEmail = email.trim().toLowerCase();

  // RFC 5322 Compliant Email Regex
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

  if (!emailRegex.test(cleanEmail)) {
    return { valid: false, error: 'Enter a valid email address.' };
  }

  const parts = cleanEmail.split('@');
  if (parts.length !== 2) {
    return { valid: false, error: 'Enter a valid email address.' };
  }

  const domain = parts[1];

  // Must have a dot and not end with a dot, and possess a valid TLD length >= 2
  if (!domain.includes('.') || domain.endsWith('.') || domain.split('.').pop().length < 2) {
    return { valid: false, error: 'Email domain does not exist.' };
  }

  // Known invalid typo domains filter (avoid blocking legitimate test emails like example.com)
  const invalidDomains = ['gmail.con', 'yahoo.con', 'hotmail.con', 'outlook.con'];
  if (invalidDomains.includes(domain)) {
    return { valid: false, error: 'Email domain does not exist. Did you mean .com?' };
  }

  // Verify MX records via DNS-over-HTTPS (optional client enhancement)
  if (typeof window !== 'undefined' && window.fetch && domain.includes('.') && !domain.endsWith('.local') && !domain.endsWith('.test')) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3000);
      const res = await fetch(`https://dns.google/resolve?name=${encodeURIComponent(domain)}&type=MX`, {
        signal: controller.signal
      });
      clearTimeout(timeoutId);

      if (res.ok) {
        const data = await res.json();
        // DNS Status 3 is NXDOMAIN (Non-Existent Domain)
        if (data.Status === 3) {
          // Fallback check for A record
          const aRes = await fetch(`https://dns.google/resolve?name=${encodeURIComponent(domain)}&type=A`);
          if (aRes.ok) {
            const aData = await aRes.json();
            if (aData.Status === 3) {
              return { valid: false, error: 'Email domain does not exist.' };
            }
          }
        }
      }
    } catch {
      // If DNS check times out or network is offline, rely on RFC regex validation
    }
  }

  return { valid: true, error: null, cleanEmail };
}

/**
 * Dispatch Email OTP via Secure Server Backend
 */
export async function sendEmailOTP({ email, name = 'Valued Traveler' }) {
  const validation = await validateEmailAddress(email);
  if (!validation.valid) {
    return {
      success: false,
      status: 'FAILED',
      error: validation.error,
      provider: null
    };
  }

  const result = await apiSendEmailOtp({ email: validation.cleanEmail, name });
  return {
    success: result.success,
    status: result.success ? 'DELIVERED' : 'FAILED',
    provider: result.data?.provider || 'Email Service',
    message: result.message,
    error: result.error
  };
}
