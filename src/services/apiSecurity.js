/**
 * Backend Security Middleware & Role Authorization Engine
 * Validates JWT tokens and verifies role permissions (SUPER_ADMIN, ADMIN, USER).
 */

import { verifyToken } from './jwtAuth';

/**
 * Verify Authentication Session & Return 401 Unauthorized if invalid or missing token
 */
export function verifyAuthSession(userOrToken) {
  if (!userOrToken) {
    return {
      authenticated: false,
      status: 401,
      error: '401 Unauthorized',
      message: 'Unauthorized: Authentication token is missing or invalid. Please log in.'
    };
  }

  if (typeof userOrToken === 'string') {
    const decoded = verifyToken(userOrToken);
    if (!decoded) {
      return {
        authenticated: false,
        status: 401,
        error: '401 Unauthorized',
        message: 'Unauthorized: Session expired or invalid authentication token.'
      };
    }
    return { authenticated: true, status: 200, user: decoded };
  }

  if (typeof userOrToken === 'object' && userOrToken.email) {
    return { authenticated: true, status: 200, user: userOrToken };
  }

  return {
    authenticated: false,
    status: 401,
    error: '401 Unauthorized',
    message: 'Unauthorized: Authentication required.'
  };
}

export function checkRole(requiredRole, userOrToken) {
  const authSession = verifyAuthSession(userOrToken);
  if (!authSession.authenticated) {
    return {
      authorized: false,
      status: 401,
      error: '401 Unauthorized',
      message: authSession.message
    };
  }

  let userRole = null;
  if (typeof userOrToken === 'string') {
    const decoded = verifyToken(userOrToken);
    userRole = decoded?.role;
  } else if (typeof userOrToken === 'object') {
    userRole = userOrToken.role;
  }

  const roleLevels = { USER: 1, ADMIN: 2, SUPER_ADMIN: 3 };
  const userLevel = roleLevels[userRole] || 0;
  const requiredLevel = roleLevels[requiredRole] || 0;

  // Exact 403 Message Mandated by User Specification
  if (userLevel < requiredLevel) {
    return {
      authorized: false,
      status: 403,
      error: '403 Forbidden',
      message: "You don't have permission to access this page."
    };
  }

  return {
    authorized: true,
    status: 200
  };
}

// Protected Backend API Endpoints

/**
 * GET /api/admin/bookings
 * Protected by checkRole("ADMIN")
 */
export async function getAdminBookings(user) {
  const check = checkRole('ADMIN', user);
  if (!check.authorized) {
    return {
      status: check.status,
      error: check.error,
      message: check.message,
      data: null
    };
  }

  return {
    status: 200,
    success: true,
    data: [
      { id: 'BK-99201', customer: 'Rahul Sharma', car: 'Innova Crysta', total: '₹18,500', status: 'Confirmed' },
      { id: 'BK-99202', customer: 'Ananya Roy', car: 'Fortuner Legender', total: '₹32,000', status: 'Pending Approval' },
      { id: 'BK-99203', customer: 'Vikram Mehta', car: 'Maruti Ertiga', total: '₹12,400', status: 'Completed' }
    ]
  };
}

/**
 * GET /api/super-admin/users
 * Protected by checkRole("SUPER_ADMIN")
 */
export async function getSuperAdminUsers(user) {
  const check = checkRole('SUPER_ADMIN', user);
  if (!check.authorized) {
    return {
      status: check.status,
      error: check.error,
      message: check.message,
      data: null
    };
  }

  return {
    status: 200,
    success: true,
    data: [
      { id: 'super-admin-owner-001', name: 'Vishal', role: 'SUPER_ADMIN', email: 'vshallg9151@gmail.com', status: 'ACTIVE', isOwner: true },
      { id: 'admin-001', name: 'Siddhivinayak Operations Admin', role: 'ADMIN', email: 'admin@siddhivinayak.com', status: 'ACTIVE', isOwner: false }
    ]
  };
}

/**
 * GET /api/user/profile
 * Protected by checkRole("USER")
 */
export async function getUserProfile(user) {
  const check = checkRole('USER', user);
  if (!check.authorized) {
    return {
      status: check.status,
      error: check.error,
      message: check.message,
      data: null
    };
  }

  return {
    status: 200,
    success: true,
    data: {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.mobile || user.phone,
      loyaltyPoints: 450,
      tier: 'Gold VIP Member'
    }
  };
}
