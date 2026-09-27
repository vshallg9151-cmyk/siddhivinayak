/**
 * MongoDB User Model & Database Operations
 * Database: siddhivinayak
 * Collection: users
 * 
 * Features:
 * - Bcrypt password hashing (never stores or returns plain text)
 * - Unique email & mobile constraints
 * - Predefined Super Admin auto-seeding
 * - Zero exposure of database credentials
 */

import bcrypt from 'bcryptjs';
import { getDatabase } from './mongodb.js';

const DB_NAME = 'siddhivinayak';
const COLLECTION_NAME = 'users';

let indexesInitialized = false;

/**
 * Returns the 'users' collection from 'siddhivinayak' database
 */
export async function getUsersCollection() {
  const db = await getDatabase(DB_NAME);
  const collection = db.collection(COLLECTION_NAME);

  if (!indexesInitialized) {
    try {
      await collection.createIndex({ email: 1 }, { unique: true });
      await collection.createIndex({ mobile: 1 }, { unique: true, sparse: true });
      indexesInitialized = true;
    } catch {
      // Index creation might fail if already exists or during read-only ops
    }
  }

  return collection;
}

/**
 * Sanitizes a user document by removing the password hash
 */
export function sanitizeUser(doc) {
  if (!doc) return null;
  const { password, _id, ...safeUser } = doc;
  return {
    ...safeUser,
    id: _id ? _id.toString() : doc.id || `usr-${Date.now()}`
  };
}

/**
 * Validates email format
 */
export function validateEmail(email) {
  if (!email || typeof email !== 'string') return false;
  const clean = email.trim().toLowerCase();
  const re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
  return re.test(clean) && clean.includes('.');
}

/**
 * Validates Indian 10-digit mobile number
 */
export function validateMobile(mobile) {
  if (!mobile) return false;
  const clean = mobile.toString().replace(/\D/g, '').slice(-10);
  return clean.length === 10 && /^[6-9]/.test(clean);
}

/**
 * Predefined Super Admin Owner Credentials
 */
export const PREDEFINED_SUPER_ADMIN_EMAIL = 'vshallg9151@gmail.com';

/**
 * Ensure Predefined Super Admin exists in MongoDB Atlas
 */
export async function ensureSuperAdminExists() {
  try {
    const collection = await getUsersCollection();
    const existing = await collection.findOne({ email: PREDEFINED_SUPER_ADMIN_EMAIL });
    if (!existing) {
      const hashedPassword = await bcrypt.hash('siddhi@2005', 10);
      await collection.insertOne({
        name: 'Vishal (Super Admin & Owner)',
        email: PREDEFINED_SUPER_ADMIN_EMAIL,
        mobile: '9173746558',
        password: hashedPassword,
        role: 'SUPER_ADMIN',
        status: 'ACTIVE',
        isOwner: true,
        emailVerified: true,
        mobileVerified: true,
        mustChangePassword: false,
        createdAt: new Date('2026-01-01T00:00:00.000Z'),
        updatedAt: new Date()
      });
      console.log('[USER MODEL] Predefined Super Admin seeded successfully into MongoDB Atlas.');
    }
  } catch (err) {
    // Non-fatal if DB not yet reachable
    console.warn('[USER MODEL] Super admin check skipped:', err.message);
  }
}

/**
 * Creates a new user in MongoDB Atlas
 */
export async function createMongoUser({ name, email, mobile, password, role = 'USER' }) {
  if (!name || !name.trim()) {
    throw new Error('Full name is required.');
  }

  const cleanEmail = (email || '').trim().toLowerCase();
  if (!validateEmail(cleanEmail)) {
    throw new Error('Please provide a valid email address.');
  }

  const cleanMobile = (mobile || '').toString().replace(/\D/g, '').slice(-10);
  if (!validateMobile(cleanMobile)) {
    throw new Error('Please provide a valid 10-digit Indian mobile number.');
  }

  if (!password || password.length < 6) {
    throw new Error('Password must be at least 6 characters long.');
  }

  const collection = await getUsersCollection();

  // Check for duplicate email
  const existingEmail = await collection.findOne({ email: cleanEmail });
  if (existingEmail) {
    throw new Error('An account with this email address already exists.');
  }

  // Check for duplicate mobile
  const existingMobile = await collection.findOne({ mobile: cleanMobile });
  if (existingMobile) {
    throw new Error('An account with this mobile number already exists.');
  }

  // Hash password securely with bcrypt
  const hashedPassword = await bcrypt.hash(password, 10);

  const now = new Date();
  const newUserDoc = {
    name: name.trim(),
    email: cleanEmail,
    mobile: cleanMobile,
    password: hashedPassword,
    role: role,
    status: 'PENDING_VERIFICATION',
    isOwner: false,
    emailVerified: false,
    mobileVerified: true,
    mustChangePassword: false,
    createdAt: now,
    updatedAt: now
  };

  const result = await collection.insertOne(newUserDoc);
  newUserDoc._id = result.insertedId;

  return sanitizeUser(newUserDoc);
}

/**
 * Finds user by Email or 10-digit Mobile
 */
export async function findUserByIdentifier(identifier) {
  if (!identifier) return null;
  const str = identifier.toString().trim();
  const cleanEmail = str.toLowerCase();
  const cleanMobile = str.replace(/\D/g, '').slice(-10);

  const collection = await getUsersCollection();
  const query = {
    $or: [
      { email: cleanEmail },
      ...(cleanMobile.length === 10 ? [{ mobile: cleanMobile }] : [])
    ]
  };

  return collection.findOne(query);
}

/**
 * Authenticates user credentials against MongoDB Atlas
 */
export async function authenticateMongoUser(identifier, plainPassword) {
  if (!identifier || !plainPassword) {
    throw new Error('Email and password are required.');
  }

  // Auto-seed predefined Super Admin if not present
  await ensureSuperAdminExists();

  const user = await findUserByIdentifier(identifier);
  if (!user) {
    throw new Error('Invalid email or password.');
  }

  // Compare password using bcrypt
  let match = false;
  try {
    match = await bcrypt.compare(plainPassword, user.password);
  } catch {
    match = false;
  }

  // Legacy fallback hash comparison for predefined seed users if needed
  if (!match && user.password && user.password.startsWith('$2b$10$siddhiSalt2026$')) {
    let hash1 = 0x811c9dc5;
    let hash2 = 0x55555555;
    const salt = 'SIDDHIVINAYAK_SECURE_SALT_2026';
    const saltedStr = salt + plainPassword + salt.split('').reverse().join('');
    for (let i = 0; i < saltedStr.length; i++) {
      const char = saltedStr.charCodeAt(i);
      hash1 ^= char;
      hash1 = Math.imul(hash1, 0x01000193);
      hash2 = (hash2 << 5) - hash2 + char;
      hash2 |= 0;
    }
    const legacyHash = `$2b$10$siddhiSalt2026$${(hash1 >>> 0).toString(16).padStart(8, '0')}${(hash2 >>> 0).toString(16).padStart(8, '0')}`;
    if (legacyHash === user.password) {
      match = true;
      // Upgrade to real bcrypt hash
      const newHash = await bcrypt.hash(plainPassword, 10);
      const collection = await getUsersCollection();
      await collection.updateOne({ _id: user._id }, { $set: { password: newHash, updatedAt: new Date() } });
    }
  }

  if (!match) {
    throw new Error('Invalid email or password.');
  }

  if (user.status === 'DISABLED') {
    throw new Error('This account has been deactivated by Super Admin.');
  }

  return sanitizeUser(user);
}

/**
 * Mark user as emailVerified: true and status: ACTIVE upon successful OTP verification
 */
export async function activateMongoUserEmail(email) {
  if (!email) return null;
  const cleanEmail = email.toString().trim().toLowerCase();
  try {
    const collection = await getUsersCollection();
    const result = await collection.findOneAndUpdate(
      { email: cleanEmail },
      {
        $set: {
          emailVerified: true,
          status: 'ACTIVE',
          updatedAt: new Date()
        }
      },
      { returnDocument: 'after' }
    );
    return sanitizeUser(result);
  } catch (err) {
    console.warn('[USER MODEL] Error activating user in MongoDB:', err.message);
    return null;
  }
}
