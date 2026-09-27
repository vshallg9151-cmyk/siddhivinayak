/**
 * Reusable Auth Controllers for Registration & Login
 * Shared across Vercel Serverless Functions, Vite Middleware, and Standalone Server.
 */

import { createMongoUser, authenticateMongoUser } from './userModel.js';
import { handleSendEmailOtp } from './otpBackend.js';
import { generateToken } from '../src/services/jwtAuth.js';

export async function handleRegisterUser(body) {
  try {
    const { name, email, mobile, password } = body || {};

    if (!name || !name.trim()) {
      return { status: 400, data: { success: false, message: 'Full name is required.' } };
    }
    if (!email || !email.trim()) {
      return { status: 400, data: { success: false, message: 'Email address is required.' } };
    }
    if (!mobile) {
      return { status: 400, data: { success: false, message: 'Mobile number is required.' } };
    }
    if (!password || password.length < 6) {
      return { status: 400, data: { success: false, message: 'Password must be at least 6 characters long.' } };
    }

    // 1. Insert user into MongoDB Atlas (Database: siddhivinayak, Collection: users)
    const newUser = await createMongoUser({ name, email, mobile, password });

    // 2. Dispatch real Email OTP for account activation
    let emailDelivery = { success: false };
    try {
      const otpRes = await handleSendEmailOtp({ email: newUser.email, name: newUser.name });
      emailDelivery = otpRes?.data || { success: true };
    } catch (otpErr) {
      console.warn('[REGISTER] OTP dispatch warning:', otpErr.message);
    }

    return {
      status: 201,
      data: {
        success: true,
        message: 'Account created successfully. A 6-digit verification code has been sent to your email.',
        user: {
          ...newUser,
          emailDelivery
        },
        requiresVerification: true,
        emailDelivery
      }
    };
  } catch (err) {
    console.error('[HANDLE REGISTER ERROR]:', err.message);

    const isDuplicate = err.message && err.message.includes('already exists');
    const isValidation = err.message && (
      err.message.includes('required') ||
      err.message.includes('valid') ||
      err.message.includes('characters long')
    );

    const status = isDuplicate ? 409 : (isValidation ? 400 : 500);

    return {
      status,
      data: {
        success: false,
        message: err.message || 'Registration failed. Please try again.'
      }
    };
  }
}

export async function handleLoginUser(body) {
  try {
    const identifier = body?.email || body?.identifier || body?.username;
    const password = body?.password;

    if (!identifier || !password) {
      return {
        status: 400,
        data: {
          success: false,
          message: 'Email/mobile and password are required.'
        }
      };
    }

    const user = await authenticateMongoUser(identifier, password);

    // If user has not yet verified Email OTP, block login and instruct verification
    if (user.role === 'USER' && (!user.emailVerified || user.status === 'PENDING_VERIFICATION')) {
      return {
        status: 403,
        data: {
          success: false,
          message: 'Email OTP verification is required to access your account.',
          unverifiedUser: user
        }
      };
    }

    // Generate JWT token
    const token = generateToken(user);

    let redirectUrl = '/user/dashboard';
    if (user.role === 'SUPER_ADMIN') {
      redirectUrl = '/super-admin/dashboard';
    } else if (user.role === 'ADMIN') {
      redirectUrl = '/admin/dashboard';
    }

    return {
      status: 200,
      data: {
        success: true,
        message: 'Authentication successful.',
        user,
        token,
        redirectUrl
      }
    };
  } catch (err) {
    console.error('[HANDLE LOGIN ERROR]:', err.message);

    const isAuthError = err.message && (
      err.message.includes('Invalid email or password') ||
      err.message.includes('deactivated')
    );

    const status = isAuthError ? 401 : 500;

    return {
      status,
      data: {
        success: false,
        message: err.message || 'Login failed. Please check your credentials.'
      }
    };
  }
}
