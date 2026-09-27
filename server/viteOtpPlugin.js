/**
 * Vite Server Backend Middleware Plugin
 * Intercepts /api/health and /api/auth/* routes for local development (`npm run dev`)
 * and preview mode (`npm run preview`).
 */

import {
  handleSendEmailOtp,
  handleVerifyEmailOtp,
  handleSendMobileOtp,
  handleVerifyMobileOtp,
  handleResendEmailOtp,
  handleResendMobileOtp
} from './otpBackend.js';
import { handleRegisterUser, handleLoginUser } from './authHandlers.js';
import { checkDatabaseConnection } from './mongodb.js';

function parseRequestBody(req) {
  return new Promise((resolve) => {
    if (req.body && typeof req.body === 'object') {
      return resolve(req.body);
    }
    if (req.body && typeof req.body === 'string') {
      try {
        return resolve(JSON.parse(req.body));
      } catch {
        return resolve({});
      }
    }
    let body = '';
    req.on('data', (chunk) => {
      body += chunk.toString();
    });
    req.on('end', () => {
      try {
        resolve(JSON.parse(body || '{}'));
      } catch {
        resolve({});
      }
    });
    req.on('error', () => {
      resolve({});
    });
  });
}

function sendJsonResponse(res, status, data) {
  res.writeHead(status, {
    'Content-Type': 'application/json',
    'Cache-Control': 'no-store, no-cache, must-revalidate'
  });
  res.end(JSON.stringify(data));
}

export function otpBackendPlugin() {
  return {
    name: 'siddhivinayak-otp-backend-api',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const url = req.url ? req.url.split('?')[0] : '';

        // 1. Health check endpoint
        if (url === '/api/health') {
          if (req.method !== 'GET' && req.method !== 'HEAD') {
            return sendJsonResponse(res, 405, {
              success: false,
              message: 'Method Not Allowed. Use GET for health status.'
            });
          }
          try {
            const dbStatus = await checkDatabaseConnection();
            return sendJsonResponse(res, 200, {
              success: true,
              message: 'Siddhivinayak API is running',
              database: dbStatus.connected ? 'connected' : 'disconnected',
              databaseMessage: dbStatus.message,
              timestamp: new Date().toISOString()
            });
          } catch (err) {
            return sendJsonResponse(res, 500, {
              success: false,
              message: 'Siddhivinayak API encountered an error checking health',
              database: 'disconnected',
              error: err.message,
              timestamp: new Date().toISOString()
            });
          }
        }

        // 2. Auth OTP endpoints
        if (!url.startsWith('/api/auth/')) {
          return next();
        }

        if (req.method !== 'POST') {
          return sendJsonResponse(res, 405, { success: false, message: 'Method Not Allowed' });
        }

        try {
          const body = await parseRequestBody(req);

          if (url === '/api/auth/register') {
            const result = await handleRegisterUser(body);
            return sendJsonResponse(res, result.status, result.data);
          }

          if (url === '/api/auth/login') {
            const result = await handleLoginUser(body);
            return sendJsonResponse(res, result.status, result.data);
          }

          if (url === '/api/auth/send-email-otp') {
            const result = await handleSendEmailOtp(body);
            return sendJsonResponse(res, result.status, result.data);
          }

          if (url === '/api/auth/verify-email-otp') {
            const result = await handleVerifyEmailOtp(body);
            return sendJsonResponse(res, result.status, result.data);
          }

          if (url === '/api/auth/send-mobile-otp') {
            const result = await handleSendMobileOtp(body);
            return sendJsonResponse(res, result.status, result.data);
          }

          if (url === '/api/auth/verify-mobile-otp') {
            const result = await handleVerifyMobileOtp(body);
            return sendJsonResponse(res, result.status, result.data);
          }

          if (url === '/api/auth/resend-email-otp') {
            const result = await handleResendEmailOtp(body);
            return sendJsonResponse(res, result.status, result.data);
          }

          if (url === '/api/auth/resend-mobile-otp') {
            const result = await handleResendMobileOtp(body);
            return sendJsonResponse(res, result.status, result.data);
          }

          return sendJsonResponse(res, 404, { success: false, message: 'API Route Not Found' });
        } catch (err) {
          console.error('[SERVER ERROR in OTP API Middleware]:', err);
          return sendJsonResponse(res, 500, { success: false, message: 'Internal Server Error' });
        }
      });
    }
  };
}
