// Validation and Verification Service for Indian Govt IDs and Driving License

// Valid State Codes for Indian RTO
const VALID_RTO_STATE_CODES = [
  'AN','AP','AR','AS','BR','CH','CG','DD','DN','DL','GA','GJ','HR','HP','JK',
  'JH','KA','KL','LA','LD','MP','MH','MN','ML','MZ','NL','OR','OD','PY','PB',
  'RJ','SK','TN','TS','TR','UP','UK','UA','WB'
];

/**
 * Validates Aadhaar Card Number (12 numeric digits)
 */
export function validateAadhaarNumber(aadhaar) {
  if (!aadhaar || !aadhaar.trim()) {
    return { valid: false, error: 'Aadhaar Card number is required.' };
  }
  const clean = aadhaar.replace(/\s+/g, '');
  if (!/^\d{12}$/.test(clean)) {
    return { valid: false, error: 'Invalid Aadhaar format. Must be exactly 12 numeric digits (e.g. 9876 5432 1098).' };
  }
  if (/^(\d)\1{11}$/.test(clean)) {
    return { valid: false, error: 'Invalid Aadhaar number sequence (All digits cannot be identical).' };
  }
  return { valid: true, clean, formatted: `${clean.slice(0,4)} ${clean.slice(4,8)} ${clean.slice(8,12)}` };
}

/**
 * Validates PAN Card Number (5 letters, 4 numbers, 1 letter e.g. ABCDE1234F)
 */
export function validatePanNumber(pan) {
  if (!pan || !pan.trim()) {
    return { valid: false, error: 'PAN Card number is required.' };
  }
  const clean = pan.trim().toUpperCase();
  if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(clean)) {
    return { valid: false, error: 'Invalid PAN format. Standard format is 5 letters, 4 numbers, 1 letter (e.g. ABCDE1234F).' };
  }
  return { valid: true, clean, formatted: clean };
}

/**
 * Validates Voter ID / EPIC Number (3 letters, 7 digits e.g. ABC1234567)
 */
export function validateVoterIdNumber(voterId) {
  if (!voterId || !voterId.trim()) {
    return { valid: false, error: 'Voter ID (EPIC) number is required.' };
  }
  const clean = voterId.trim().toUpperCase();
  if (!/^[A-Z]{3}[0-9]{7}$/.test(clean)) {
    return { valid: false, error: 'Invalid Voter ID format. Must be 3 letters followed by 7 numbers (e.g. ABC1234567).' };
  }
  return { valid: true, clean, formatted: clean };
}

/**
 * Validates Indian Passport Number (1 letter, 7 digits e.g. A1234567)
 */
export function validatePassportNumber(passport) {
  if (!passport || !passport.trim()) {
    return { valid: false, error: 'Passport number is required.' };
  }
  const clean = passport.trim().toUpperCase();
  if (!/^[A-Z]{1}[0-9]{7}$/.test(clean)) {
    return { valid: false, error: 'Invalid Passport format. Must be 1 letter followed by 7 numbers (e.g. A1234567).' };
  }
  return { valid: true, clean, formatted: clean };
}

/**
 * Validates Indian Driving License (DL) Number
 * Format: State code (2 letters) + 2 digit RTO + 4 digit year + 7 digits (e.g. MH-14-2018-0098234)
 */
export function validateDrivingLicenseNumber(dl) {
  if (!dl || !dl.trim()) {
    return { valid: false, error: 'Driving License number is required for Self Drive.' };
  }
  const clean = dl.replace(/[-\s]/g, '').toUpperCase();
  
  if (clean.length < 13 || clean.length > 16) {
    return { valid: false, error: 'Invalid DL length. Standard Indian DL is 13 to 16 characters (e.g. MH-14-2018-0098234).' };
  }
  
  const stateCode = clean.substring(0, 2);
  if (!VALID_RTO_STATE_CODES.includes(stateCode)) {
    return { valid: false, error: `Invalid RTO State Code "${stateCode}". Must start with a valid Indian state code (e.g. MH, DL, GJ, KA, UP, HR).` };
  }
  
  if (!/^[A-Z]{2}[0-9]{11,14}$/.test(clean)) {
    return { valid: false, error: 'Invalid Driving License format. Expected RTO format e.g. MH1420180098234 or DL0420201234567.' };
  }

  return { valid: true, clean, formatted: `${clean.slice(0,2)}-${clean.slice(2,4)}-${clean.slice(4,8)}-${clean.slice(8)}` };
}

/**
 * Universal router for validating Govt ID numbers based on selected ID type
 */
export function validateGovtIdNumber(idType, idNumber) {
  switch (idType) {
    case 'Aadhaar':
      return validateAadhaarNumber(idNumber);
    case 'PAN':
      return validatePanNumber(idNumber);
    case 'Voter ID':
      return validateVoterIdNumber(idNumber);
    case 'Passport':
      return validatePassportNumber(idNumber);
    default:
      return validateAadhaarNumber(idNumber);
  }
}
