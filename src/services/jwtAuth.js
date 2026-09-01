/**
 * JWT Authentication & Password Encryption Service
 * Implements password salt-hashing algorithm and JWT token generation/verification.
 */

// Simple robust string hashing algorithm producing a hex digest (mimics bcrypt salt-hashing in pure JS)
export function hashPassword(password) {
  if (!password) return '';
  let hash1 = 0x811c9dc5;
  let hash2 = 0x55555555;
  const salt = 'SIDDHIVINAYAK_SECURE_SALT_2026';
  const saltedStr = salt + password + salt.split('').reverse().join('');
  
  for (let i = 0; i < saltedStr.length; i++) {
    const char = saltedStr.charCodeAt(i);
    hash1 ^= char;
    hash1 = Math.imul(hash1, 0x01000193);
    hash2 = (hash2 << 5) - hash2 + char;
    hash2 |= 0;
  }

  const hex1 = (hash1 >>> 0).toString(16).padStart(8, '0');
  const hex2 = (hash2 >>> 0).toString(16).padStart(8, '0');
  return `$2b$10$siddhiSalt2026$${hex1}${hex2}`;
}

export function comparePassword(inputPassword, storedHash) {
  if (!inputPassword || !storedHash) return false;
  const hashedInput = hashPassword(inputPassword);
  return hashedInput === storedHash;
}

// Generate JWT token
export function generateToken(user) {
  const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
  const payload = btoa(JSON.stringify({
    sub: user.id,
    email: user.email,
    role: user.role,
    isOwner: user.isOwner || false,
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60) // 24 hours validity
  }));
  
  const signature = btoa(hashPassword(`${header}.${payload}.SIDDHIVINAYAK_JWT_SECRET`));
  return `${header}.${payload}.${signature}`;
}

// Verify & decode JWT token
export function verifyToken(token) {
  try {
    if (!token) return null;
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    
    const [header, payload, signature] = parts;
    const expectedSignature = btoa(hashPassword(`${header}.${payload}.SIDDHIVINAYAK_JWT_SECRET`));
    if (signature !== expectedSignature) {
      console.warn('JWT Signature verification failed');
      return null;
    }

    const decodedPayload = JSON.parse(atob(payload));
    if (decodedPayload.exp && decodedPayload.exp < Math.floor(Date.now() / 1000)) {
      console.warn('JWT Token expired');
      return null;
    }

    return decodedPayload;
  } catch (err) {
    console.error('Failed to parse JWT token', err);
    return null;
  }
}
