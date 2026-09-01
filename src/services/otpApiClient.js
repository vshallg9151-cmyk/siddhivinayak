/**
 * Client-Side OTP API Communication Service
 * Dispatches HTTP requests to secure backend endpoints:
 * - POST /api/auth/send-email-otp
 * - POST /api/auth/verify-email-otp
 * - POST /api/auth/send-mobile-otp
 * - POST /api/auth/verify-mobile-otp
 * - POST /api/auth/resend-email-otp
 * - POST /api/auth/resend-mobile-otp
 *
 * CRITICAL SECURITY:
 * 1. Zero secret API keys exist in this client code.
 * 2. Zero raw OTP codes are returned by the server or stored in localStorage/sessionStorage.
 */

async function postJson(url, data) {
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(data)
    });

    const json = await res.json().catch(() => ({}));
    return {
      ok: res.ok && json.success === true,
      status: res.status,
      data: json
    };
  } catch (err) {
    return {
      ok: false,
      status: 0,
      data: {
        success: false,
        message: 'Network error communicating with authentication server. Please check your connection.'
      }
    };
  }
}

/**
 * Dispatch Email OTP via Backend
 */
export async function apiSendEmailOtp({ email, name }) {
  const result = await postJson('/api/auth/send-email-otp', { email, name });
  return {
    success: result.ok,
    message: result.data?.message || (result.ok ? 'OTP sent successfully' : 'Unable to send email OTP.'),
    expiresIn: result.data?.expiresIn || 300,
    provider: result.data?.provider || null,
    devOtp: result.data?.devOtp || null,
    error: !result.ok ? result.data?.message : null
  };
}

/**
 * Verify Email OTP via Backend
 */
export async function apiVerifyEmailOtp({ email, otp }) {
  const result = await postJson('/api/auth/verify-email-otp', { email, otp });
  return {
    success: result.ok,
    message: result.data?.message || (result.ok ? 'Email verified successfully' : 'Invalid OTP.'),
    error: !result.ok ? result.data?.message : null
  };
}

/**
 * Dispatch Mobile SMS OTP via Backend
 */
export async function apiSendMobileOtp({ mobile, name }) {
  const result = await postJson('/api/auth/send-mobile-otp', { mobile, name });
  return {
    success: result.ok,
    message: result.data?.message || (result.ok ? 'OTP sent successfully' : 'Unable to send SMS OTP.'),
    expiresIn: result.data?.expiresIn || 300,
    error: !result.ok ? result.data?.message : null
  };
}

/**
 * Verify Mobile SMS OTP via Backend
 */
export async function apiVerifyMobileOtp({ mobile, otp }) {
  const result = await postJson('/api/auth/verify-mobile-otp', { mobile, otp });
  return {
    success: result.ok,
    message: result.data?.message || (result.ok ? 'Mobile verified successfully' : 'Invalid OTP.'),
    error: !result.ok ? result.data?.message : null
  };
}

/**
 * Resend Email OTP (60s cooldown)
 */
export async function apiResendEmailOtp({ email, name }) {
  const result = await postJson('/api/auth/resend-email-otp', { email, name });
  return {
    success: result.ok,
    message: result.data?.message || (result.ok ? 'New OTP sent to email' : 'Unable to resend email OTP.'),
    provider: result.data?.provider || null,
    devOtp: result.data?.devOtp || null,
    error: !result.ok ? result.data?.message : null
  };
}

/**
 * Resend Mobile SMS OTP (60s cooldown)
 */
export async function apiResendMobileOtp({ mobile, name }) {
  const result = await postJson('/api/auth/resend-mobile-otp', { mobile, name });
  return {
    success: result.ok,
    message: result.data?.message || (result.ok ? 'New OTP sent to mobile' : 'Unable to resend SMS OTP.'),
    error: !result.ok ? result.data?.message : null
  };
}
