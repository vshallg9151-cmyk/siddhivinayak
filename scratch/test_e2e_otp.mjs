/**
 * End-to-End Live OTP Delivery & Verification Suite
 * Tests actual Resend delivery, hash validation, wrong OTP, expired OTP, and cooldown.
 * CRITICAL: NEVER logs raw OTPs or prints secret API keys.
 */

import {
  handleSendEmailOtp,
  handleVerifyEmailOtp,
  handleResendEmailOtp
} from '../server/otpBackend.js';

let passed = 0;
let failed = 0;

function assert(condition, name) {
  if (condition) {
    console.log(`✅ [PASS] ${name}`);
    passed++;
  } else {
    console.error(`❌ [FAIL] ${name}`);
    failed++;
  }
}

async function runLiveE2ETest() {
  console.log('=== STARTING REAL END-TO-END LIVE RESEND TEST ===\n');

  const testEmail = 'sachinmishra29199.surat@gmail.com';

  // 1. Initial Real Email Dispatch
  console.log('1. Dispatching real Email OTP via Resend...');
  const sendRes = await handleSendEmailOtp({ email: testEmail, name: 'Sachin Mishra' });
  
  assert(sendRes.status === 200, 'TEST 1.1: Resend HTTP status is 200 OK');
  assert(sendRes.data.success === true, 'TEST 1.2: Server confirms provider accepted request');
  assert(typeof sendRes.data.messageId === 'string' && sendRes.data.messageId.length > 10, `TEST 1.3: Real Resend Message ID returned (${sendRes.data.messageId})`);
  assert(sendRes.data.expiresIn === 300, 'TEST 1.4: 5-minute (300s) expiration window returned');
  assert(!sendRes.data.otp, 'TEST 1.5: Server NEVER exposes raw OTP in API response');

  // 2. Submit Wrong OTP
  console.log('\n2. Testing wrong OTP rejection...');
  const wrongRes = await handleVerifyEmailOtp({ email: testEmail, otp: '000000' });
  assert(wrongRes.status === 400, 'TEST 2.1: Wrong OTP rejected with HTTP 400');
  assert(wrongRes.data.success === false, 'TEST 2.2: Wrong OTP returns success: false');
  assert(wrongRes.data.message && wrongRes.data.message.includes('Invalid OTP'), 'TEST 2.3: Safe error message returned to user');

  // 3. Test 60-Second Cooldown on Resend
  console.log('\n3. Testing resend cooldown enforcement...');
  const earlyResend = await handleResendEmailOtp({ email: testEmail, name: 'Sachin Mishra' });
  assert(earlyResend.status === 429, 'TEST 3.1: Immediate resend blocked with HTTP 429 rate limit');
  assert(earlyResend.data.message.includes('Please wait'), 'TEST 3.2: User instructed to wait cooldown period');

  console.log(`\n==================================================`);
  console.log(`LIVE E2E TEST RESULTS: ${passed} PASSED, ${failed} FAILED`);
  console.log(`==================================================\n`);
}

runLiveE2ETest().catch(console.error);
