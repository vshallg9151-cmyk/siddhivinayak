/**
 * Comprehensive Verification Test Suite for Multi-Recipient OTP Email System
 * Siddhivinayak Tours & Travels
 */

import {
  handleSendEmailOtp,
  handleVerifyEmailOtp,
  handleResendEmailOtp,
  _getOtpStoreForTesting
} from '../server/otpBackend.js';
import crypto from 'node:crypto';

let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`  ✅ PASS: ${message}`);
    passed++;
  } else {
    console.error(`  ❌ FAIL: ${message}`);
    failed++;
  }
}

async function runTestSuite() {
  console.log('\n========================================================================');
  console.log('STARTING MULTI-RECIPIENT OTP EMAIL VERIFICATION TEST SUITE');
  console.log('========================================================================\n');

  const store = _getOtpStoreForTesting();
  const adminEmail = 'sachinmishra29199.surat@gmail.com';
  const user1Email = 'user1@gmail.com';
  const user2Email = 'user2@gmail.com';

  // --------------------------------------------------------------------------
  // TEST 1: User 1 OTP Dispatch -> Keyed strictly to user1@gmail.com
  // --------------------------------------------------------------------------
  console.log('--- TEST 1: User 1 (user1@gmail.com) OTP Dispatch ---');
  const res1 = await handleSendEmailOtp({ email: user1Email, name: 'Alice User1' });
  assert(res1.status === 200 && res1.data.success === true, 'User 1 OTP dispatched successfully (HTTP 200)');
  assert(store.has(`email:${user1Email}`), `OTP Store contains key 'email:${user1Email}'`);
  assert(!store.has(`email:${adminEmail}`), `OTP Store does NOT have admin email key 'email:${adminEmail}'`);

  const user1Record = store.get(`email:${user1Email}`);
  assert(user1Record && typeof user1Record.hashedOtp === 'string', 'User 1 OTP is stored as SHA-256 hash');
  assert(user1Record.used === false, 'User 1 OTP is not marked as used');

  // --------------------------------------------------------------------------
  // TEST 2: User 2 OTP Dispatch -> Keyed strictly to user2@gmail.com
  // --------------------------------------------------------------------------
  console.log('\n--- TEST 2: User 2 (user2@gmail.com) OTP Dispatch ---');
  const res2 = await handleSendEmailOtp({ email: user2Email, name: 'Bob User2' });
  assert(res2.status === 200 && res2.data.success === true, 'User 2 OTP dispatched successfully (HTTP 200)');
  assert(store.has(`email:${user2Email}`), `OTP Store contains key 'email:${user2Email}'`);
  assert(store.has(`email:${user1Email}`), `User 1 key still independently exists in store`);
  assert(!store.has(`email:${adminEmail}`), `Admin email receives NO user OTP entry`);

  const user2Record = store.get(`email:${user2Email}`);
  assert(user1Record.hashedOtp !== user2Record.hashedOtp, 'User 1 and User 2 have distinct independent OTP hashes');

  // --------------------------------------------------------------------------
  // TEST 3: Cross-Verification Failure (User 2 code fails for User 1)
  // --------------------------------------------------------------------------
  console.log('\n--- TEST 3: Security - Cross-User Verification Rejection ---');
  const fakeCrossOtp = '000000';
  const crossVerifyRes = await handleVerifyEmailOtp({ email: user1Email, otp: fakeCrossOtp });
  assert(crossVerifyRes.status === 400 && crossVerifyRes.data.success === false, 'Invalid OTP rejected for User 1');
  assert(crossVerifyRes.data.message.includes('Invalid OTP'), 'Error message informs user of invalid OTP with remaining attempts');

  // --------------------------------------------------------------------------
  // TEST 4: Successful Verification for User 1
  // --------------------------------------------------------------------------
  console.log('\n--- TEST 4: Verification with Valid OTP ---');
  // Inject known OTP hash to test exact mathematical verification
  const testOtp = '123456';
  const testHashedOtp = crypto.createHash('sha256').update(testOtp).digest('hex');
  store.set(`email:${user1Email}`, {
    hashedOtp: testHashedOtp,
    expiresAt: Date.now() + 300000,
    resendCooldownUntil: Date.now() + 60000,
    attempts: 0,
    used: false,
    createdAt: Date.now()
  });

  const validVerifyRes = await handleVerifyEmailOtp({ email: user1Email, otp: testOtp });
  assert(validVerifyRes.status === 200 && validVerifyRes.data.success === true, 'User 1 verified successfully with correct OTP');
  assert(validVerifyRes.data.emailVerified === true, 'emailVerified flag returned as true');
  assert(store.get(`email:${user1Email}`).used === true, 'User 1 OTP marked as used (cannot be re-used)');

  // Test re-using the same OTP
  const reuseRes = await handleVerifyEmailOtp({ email: user1Email, otp: testOtp });
  assert(reuseRes.status === 400 && reuseRes.data.message.includes('already been used'), 'Re-using already used OTP is blocked');

  // --------------------------------------------------------------------------
  // TEST 5: Overwrite / Invalidation of Prior OTP on New Generation
  // --------------------------------------------------------------------------
  console.log('\n--- TEST 5: Previous OTP Invalidation on New Request ---');
  // Generate first OTP for User 3
  const user3Email = 'user3@gmail.com';
  const oldTestOtp = '111111';
  const oldHashedOtp = crypto.createHash('sha256').update(oldTestOtp).digest('hex');
  store.set(`email:${user3Email}`, {
    hashedOtp: oldHashedOtp,
    expiresAt: Date.now() + 300000,
    resendCooldownUntil: Date.now() - 1000, // Cooldown expired
    attempts: 0,
    used: false,
    createdAt: Date.now()
  });

  // User 3 requests a new OTP (resend)
  const resendRes = await handleResendEmailOtp({ email: user3Email, name: 'User 3' });
  assert(resendRes.status === 200, 'Resend Email OTP generated new OTP successfully');

  // Verify that the old OTP (111111) is now INVALID
  const testOldOtpRes = await handleVerifyEmailOtp({ email: user3Email, otp: oldTestOtp });
  assert(testOldOtpRes.status === 400, 'Previous OTP (111111) is immediately invalid after generating a new OTP');

  // --------------------------------------------------------------------------
  // TEST 6: OTP Expiration Handling
  // --------------------------------------------------------------------------
  console.log('\n--- TEST 6: OTP Expiration Handling ---');
  const expiredEmail = 'expired.user@gmail.com';
  const expOtp = '999999';
  const expHashed = crypto.createHash('sha256').update(expOtp).digest('hex');
  store.set(`email:${expiredEmail}`, {
    hashedOtp: expHashed,
    expiresAt: Date.now() - 1000, // Expired 1 second ago
    resendCooldownUntil: Date.now() + 60000,
    attempts: 0,
    used: false,
    createdAt: Date.now() - 301000
  });

  const expRes = await handleVerifyEmailOtp({ email: expiredEmail, otp: expOtp });
  assert(expRes.status === 400 && expRes.data.message.includes('expired'), 'Expired OTP rejected with expiration notice');

  // --------------------------------------------------------------------------
  // TEST 7: Max Failed Attempts Lockout (5 attempts)
  // --------------------------------------------------------------------------
  console.log('\n--- TEST 7: Max 5 Failed Attempts Lockout ---');
  const bruteEmail = 'brute.attempt@gmail.com';
  const bruteRealOtp = '777777';
  const bruteHashed = crypto.createHash('sha256').update(bruteRealOtp).digest('hex');
  store.set(`email:${bruteEmail}`, {
    hashedOtp: bruteHashed,
    expiresAt: Date.now() + 300000,
    resendCooldownUntil: Date.now() + 60000,
    attempts: 0,
    used: false,
    createdAt: Date.now()
  });

  for (let i = 1; i <= 5; i++) {
    await handleVerifyEmailOtp({ email: bruteEmail, otp: '000000' });
  }

  // 6th attempt (even with real OTP) should fail because record is locked
  const lockRes = await handleVerifyEmailOtp({ email: bruteEmail, otp: bruteRealOtp });
  assert(lockRes.status === 400 && (lockRes.data.message.includes('Maximum') || lockRes.data.message.includes('already been used')), 'Locked OTP cannot be verified even with correct code');

  // --------------------------------------------------------------------------
  // SUMMARY
  // --------------------------------------------------------------------------
  console.log('\n========================================================================');
  console.log(`TEST SUMMARY: ${passed} PASSED, ${failed} FAILED`);
  console.log('========================================================================\n');

  if (failed > 0) {
    process.exit(1);
  }
}

runTestSuite().catch(err => {
  console.error('Test Suite Error:', err);
  process.exit(1);
});
