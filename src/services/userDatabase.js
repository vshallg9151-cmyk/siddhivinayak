import { hashPassword, comparePassword } from './jwtAuth.js';
import { validateIndianMobile } from './smsGateway.js';
import { validateEmailAddress } from './emailService.js';
import {
  apiSendEmailOtp,
  apiVerifyEmailOtp,
  apiResendEmailOtp
} from './otpApiClient.js';

const DB_STORAGE_KEY = 'siddhivinayak_users_db_v3';

// Predefined Super Admin Owner Credentials (Pre-verified)
export const PREDEFINED_SUPER_ADMIN = {
  id: 'super-admin-owner-001',
  name: 'Vishal (Super Admin & Owner)',
  email: 'vshallg9151@gmail.com',
  mobile: '9173746558',
  password: hashPassword('siddhi@2005'), // Never store plain text
  role: 'SUPER_ADMIN',
  status: 'ACTIVE',
  isOwner: true,
  emailVerified: true,
  mobileVerified: true,
  mustChangePassword: false,
  createdAt: '2026-01-01T00:00:00.000Z',
  updatedAt: new Date().toISOString()
};

// Initial Seed Data
const INITIAL_SEED_USERS = [
  PREDEFINED_SUPER_ADMIN,
  {
    id: 'admin-001',
    name: 'Siddhivinayak Operations Admin',
    email: 'admin@siddhivinayak.com',
    mobile: '9876543211',
    password: hashPassword('admin123'),
    role: 'ADMIN',
    status: 'ACTIVE',
    isOwner: false,
    emailVerified: true,
    mobileVerified: true,
    mustChangePassword: true,
    createdAt: '2026-02-01T10:00:00.000Z',
    updatedAt: new Date().toISOString()
  },
  {
    id: 'user-001',
    name: 'Rahul Sharma',
    email: 'rahul.sharma@example.com',
    mobile: '9876543210',
    password: hashPassword('user123'),
    role: 'USER',
    status: 'ACTIVE',
    isOwner: false,
    emailVerified: true,
    mobileVerified: true,
    mustChangePassword: false,
    createdAt: '2026-03-01T12:00:00.000Z',
    updatedAt: new Date().toISOString()
  }
];

class UserDatabaseService {
  constructor() {
    this.initDatabase();
  }

  initDatabase() {
    if (typeof localStorage === 'undefined') return;
    try {
      const stored = localStorage.getItem(DB_STORAGE_KEY);
      if (!stored) {
        localStorage.setItem(DB_STORAGE_KEY, JSON.stringify(INITIAL_SEED_USERS));
      } else {
        let users = JSON.parse(stored);
        let updated = false;

        // Ensure default seed users always exist and are synced with valid hashes & ACTIVE state
        INITIAL_SEED_USERS.forEach(seedUser => {
          const index = users.findIndex(u => u.id === seedUser.id);
          if (index === -1) {
            users.unshift(seedUser);
            updated = true;
          } else {
            // Heal any corrupted or outdated seed credentials/hashes in localStorage
            if (
              users[index].name !== seedUser.name ||
              users[index].email !== seedUser.email ||
              users[index].password !== seedUser.password ||
              !users[index].emailVerified ||
              users[index].status !== 'ACTIVE'
            ) {
              users[index] = {
                ...users[index],
                email: seedUser.email,
                name: seedUser.name,
                password: seedUser.password,
                emailVerified: true,
                mobileVerified: true,
                status: 'ACTIVE'
              };
              updated = true;
            }
          }
        });

        if (updated) {
          localStorage.setItem(DB_STORAGE_KEY, JSON.stringify(users));
        }
      }
    } catch (err) {
      console.error('Error initializing user database', err);
    }
  }

  getUsers() {
    if (typeof localStorage === 'undefined') return INITIAL_SEED_USERS;
    try {
      const stored = localStorage.getItem(DB_STORAGE_KEY);
      return stored ? JSON.parse(stored) : INITIAL_SEED_USERS;
    } catch {
      return INITIAL_SEED_USERS;
    }
  }

  saveUsers(users) {
    if (typeof localStorage === 'undefined') return;
    try {
      localStorage.setItem(DB_STORAGE_KEY, JSON.stringify(users));
    } catch {}
  }

  getUserByEmail(email) {
    if (!email) return null;
    const cleanEmail = email.toString().toLowerCase().trim();
    const users = this.getUsers();
    return users.find(u => u.email && u.email.toLowerCase().trim() === cleanEmail) || null;
  }

  getUserByMobile(mobile) {
    if (!mobile) return null;
    const cleanInput = mobile.toString().replace(/[^0-9]/g, '').slice(-10);
    if (!cleanInput) return null;
    const users = this.getUsers();
    return users.find(u => u.mobile && u.mobile.replace(/[^0-9]/g, '').slice(-10) === cleanInput) || null;
  }

  getUserByIdentifier(identifier) {
    if (!identifier) return null;
    const str = identifier.toString().trim();
    return this.getUserByEmail(str) || this.getUserByMobile(str);
  }

  getUserById(id) {
    if (!id) return null;
    const users = this.getUsers();
    return users.find(u => u.id === id) || null;
  }

  /**
   * Public Registration -> Requires ONLY Email OTP Verification for activation
   * (Mobile number is preserved for customer contact/booking/WhatsApp)
   */
  async registerUser({ name, email, mobile, password }) {
    const emailVal = await validateEmailAddress(email);
    if (!emailVal.valid) {
      throw new Error(emailVal.error);
    }

    const mobileVal = validateIndianMobile(mobile);
    if (!mobileVal.valid) {
      throw new Error(mobileVal.error);
    }

    const cleanEmail = emailVal.cleanEmail;
    const cleanMobile = mobileVal.cleanMobile;

    if (this.getUserByEmail(cleanEmail)) {
      throw new Error('An account with this email address already exists.');
    }

    if (this.getUserByMobile(cleanMobile)) {
      throw new Error('An account with this mobile number already exists.');
    }

    // Call Real Resend Backend Email OTP Dispatch
    const emailDelivery = await apiSendEmailOtp({ email: cleanEmail, name: name.trim() });

    const newUser = {
      id: `usr-${Date.now()}`,
      name: name.trim(),
      email: cleanEmail,
      mobile: cleanMobile,
      password: hashPassword(password),
      role: 'USER',
      status: 'PENDING_VERIFICATION', // Inactive until Email OTP is verified
      isOwner: false,
      emailVerified: false,
      mobileVerified: true, // No SMS OTP required
      emailDelivery,
      mustChangePassword: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    const users = this.getUsers();
    users.push(newUser);
    this.saveUsers(users);

    return { user: newUser, emailDelivery };
  }

  /**
   * Super Admin Action: Create Admin Account
   */
  async createAdminAccount({ name, email, mobile, tempPassword }) {
    const emailVal = await validateEmailAddress(email);
    if (!emailVal.valid) throw new Error(emailVal.error);

    const mobileVal = validateIndianMobile(mobile);
    if (!mobileVal.valid) throw new Error(mobileVal.error);

    const cleanEmail = emailVal.cleanEmail;
    const cleanMobile = mobileVal.cleanMobile;

    if (this.getUserByEmail(cleanEmail)) {
      throw new Error('An account with this email address already exists.');
    }

    const emailDelivery = await apiSendEmailOtp({ email: cleanEmail, name: name.trim() });

    const newAdmin = {
      id: `admin-${Date.now()}`,
      name: name.trim(),
      email: cleanEmail,
      mobile: cleanMobile,
      password: hashPassword(tempPassword),
      role: 'ADMIN',
      status: 'PENDING_VERIFICATION',
      isOwner: false,
      emailVerified: false,
      mobileVerified: true,
      emailDelivery,
      mustChangePassword: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    const users = this.getUsers();
    users.push(newAdmin);
    this.saveUsers(users);

    return { user: newAdmin, emailDelivery };
  }

  /**
   * Verify Email OTP Code via Backend -> Activates Account
   */
  async verifyEmailOTP(userId, otpInput) {
    const users = this.getUsers();
    const index = users.findIndex(u => u.id === userId);

    if (index === -1) throw new Error('User account not found.');

    const user = users[index];
    const otpToken = user.emailDelivery?.otpToken || null;
    const result = await apiVerifyEmailOtp({ email: user.email, otp: otpInput, otpToken });
    
    if (!result.success) {
      throw new Error(result.message || result.error || 'Invalid OTP.');
    }

    user.emailVerified = true;
    user.status = 'ACTIVE'; // Account immediately activated on email verification
    user.updatedAt = new Date().toISOString();
    this.saveUsers(users);
    return user;
  }

  /**
   * Resend Email OTP via Backend (60s cooldown enforced)
   */
  async resendEmailOTP(userId) {
    const users = this.getUsers();
    const index = users.findIndex(u => u.id === userId);

    if (index === -1) throw new Error('User account not found.');

    const user = users[index];
    const delivery = await apiResendEmailOtp({ email: user.email, name: user.name });
    user.emailDelivery = delivery;
    this.saveUsers(users);

    return { user, delivery };
  }

  /**
   * Forgot Password - Dispatch Backend Email OTP
   */
  async requestForgotPasswordOTP(identifier) {
    const user = this.getUserByEmail(identifier) || this.getUserByMobile(identifier);
    if (!user) {
      throw new Error('No user account found matching this email or mobile number.');
    }

    const emailDelivery = await apiSendEmailOtp({ email: user.email, name: user.name });

    const users = this.getUsers();
    const index = users.findIndex(u => u.id === user.id);
    users[index].emailDelivery = emailDelivery;
    this.saveUsers(users);

    return { user: users[index], emailDelivery };
  }

  /**
   * Reset Password after successful Email OTP verification
   */
  async resetPassword({ userId, newPassword }) {
    const users = this.getUsers();
    const index = users.findIndex(u => u.id === userId);
    if (index === -1) throw new Error('User not found.');

    const user = users[index];
    if (!user.emailVerified) {
      throw new Error('Please verify your Email OTP to reset password.');
    }

    user.password = hashPassword(newPassword);
    user.mustChangePassword = false;
    user.updatedAt = new Date().toISOString();
    this.saveUsers(users);

    return user;
  }

  /**
   * Authenticate user with email and password
   */
  authenticateUser({ email, password }) {
    const user = this.getUserByEmail(email);
    if (!user) {
      throw new Error('Invalid email or password.');
    }

    if (!comparePassword(password, user.password)) {
      throw new Error('Invalid email or password.');
    }

    if (user.status === 'DISABLED') {
      throw new Error('This account has been deactivated by Super Admin.');
    }

    // If registered user has not verified Email OTP, prompt OTP verification
    if (user.role === 'USER' && !user.emailVerified) {
      const err = new Error('Email OTP verification is required to access your account.');
      err.unverifiedUser = user;
      throw err;
    }

    return user;
  }

  /**
   * Super Admin action: Toggle User Active Status
   */
  toggleUserStatus(userId) {
    const users = this.getUsers();
    const index = users.findIndex(u => u.id === userId);
    if (index === -1) throw new Error('User not found.');

    users[index].status = users[index].status === 'ACTIVE' ? 'DISABLED' : 'ACTIVE';
    users[index].updatedAt = new Date().toISOString();
    this.saveUsers(users);
    return users[index];
  }

  /**
   * Super Admin action: Delete User Account
   */
  deleteUser(userId) {
    let users = this.getUsers();
    const target = users.find(u => u.id === userId);
    if (target && target.isOwner) {
      throw new Error('Cannot delete primary Super Admin Owner account.');
    }

    users = users.filter(u => u.id !== userId);
    this.saveUsers(users);
    return true;
  }
}

export const userDB = new UserDatabaseService();
