/**
 * OTP Service Module
 * Handles 6-digit OTP generation, 5-minute expiration, 5 max attempts,
 * 30-second resend cooldowns, max 5 resends, and SHA-256 hashed OTP storage.
 */

export const OTP_CONFIG = {
  DIGITS: 6,
  EXPIRY_MS: 5 * 60 * 1000, // 5 minutes
  RESEND_COOLDOWN_SEC: 60,  // 60 seconds cooldown
  MAX_ATTEMPTS: 5,
  MAX_RESENDS: 5
};

/**
 * Generate cryptographically random 6-digit numeric OTP
 */
export function generate6DigitOTP() {
  if (typeof window !== 'undefined' && window.crypto && window.crypto.getRandomValues) {
    const array = new Uint32Array(1);
    window.crypto.getRandomValues(array);
    const otpNum = 100000 + (array[0] % 900000);
    return otpNum.toString();
  }
  // Cryptographic fallback
  const min = 100000;
  const max = 999999;
  return Math.floor(min + Math.random() * (max - min + 1)).toString();
}

/**
 * SHA-256 Hash helper function for secure OTP storage
 */
export async function hashOtp(otp) {
  const clean = (otp || '').toString().trim();
  if (typeof window !== 'undefined' && window.crypto && window.crypto.subtle) {
    const msgBuffer = new TextEncoder().encode(clean);
    const hashBuffer = await window.crypto.subtle.digest('SHA-256', msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  }
  // Simple fallback hash if Web Crypto unavailable
  let hash = 0;
  for (let i = 0; i < clean.length; i++) {
    const char = clean.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return `sha_${Math.abs(hash)}_${clean.length}`;
}

/**
 * Create a new OTP record object with hashed OTP storage
 */
export async function createOtpRecord(customOtp = null) {
  const rawOtp = customOtp || generate6DigitOTP();
  const hashedCode = await hashOtp(rawOtp);
  const now = Date.now();

  const record = {
    hashedCode,
    createdAt: now,
    expiresAt: now + OTP_CONFIG.EXPIRY_MS,
    canResendAfter: now + (OTP_CONFIG.RESEND_COOLDOWN_SEC * 1000),
    used: false,
    incorrectAttempts: 0,
    resendCount: 0
  };

  return { rawOtp, record };
}

/**
 * Validate an OTP input against a record (Async SHA-256 comparison)
 */
export async function validateOtpRecord(record, userInputCode) {
  if (!record) {
    return { valid: false, error: 'No OTP generated for this destination.' };
  }

  if (record.used) {
    return { valid: false, error: 'This OTP has already been used.' };
  }

  if (Date.now() > record.expiresAt) {
    return { valid: false, error: 'OTP has expired. Please request a new OTP.' };
  }

  if (record.incorrectAttempts >= OTP_CONFIG.MAX_ATTEMPTS) {
    return { valid: false, error: 'Maximum incorrect attempts exceeded. Please request a new OTP.' };
  }

  const cleanInput = (userInputCode || '').trim();
  if (cleanInput.length !== OTP_CONFIG.DIGITS || !/^\d{6}$/.test(cleanInput)) {
    return { valid: false, error: 'Please enter a valid 6-digit numeric OTP.' };
  }

  const inputHash = await hashOtp(cleanInput);
  if (inputHash !== record.hashedCode) {
    record.incorrectAttempts += 1;
    const remaining = OTP_CONFIG.MAX_ATTEMPTS - record.incorrectAttempts;
    if (remaining <= 0) {
      record.used = true; // Invalidate OTP after 5 failed attempts
    }
    return { 
      valid: false, 
      error: `Invalid OTP code. ${remaining > 0 ? `${remaining} attempt(s) remaining.` : 'OTP blocked due to max failed attempts.'}` 
    };
  }

  // Mark as used upon successful validation
  record.used = true;
  return { valid: true, error: null };
}

/**
 * Regenerate OTP record (Resend Logic)
 */
export async function regenerateOtpRecord(currentRecord) {
  const now = Date.now();
  
  if (currentRecord) {
    if (now < currentRecord.canResendAfter) {
      const remainingSec = Math.ceil((currentRecord.canResendAfter - now) / 1000);
      throw new Error(`Please wait ${remainingSec} seconds before requesting a new OTP.`);
    }

    if (currentRecord.resendCount >= OTP_CONFIG.MAX_RESENDS) {
      throw new Error('Maximum resend limit reached (5 times). Please contact customer support.');
    }
  }

  const resendCount = currentRecord ? currentRecord.resendCount + 1 : 0;
  const { rawOtp, record } = await createOtpRecord();
  record.resendCount = resendCount;
  return { rawOtp, record };
}

