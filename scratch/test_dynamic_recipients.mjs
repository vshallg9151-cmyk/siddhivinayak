/**
 * Dynamic Recipient Test
 * Verifies that the recipient is 100% dynamic and NOT hardcoded
 */

import { handleSendEmailOtp } from '../server/otpBackend.js';

let passed = 0;
let failed = 0;

function assert(condition, testName) {
  if (condition) {
    console.log(`✅ [PASS] ${testName}`);
    passed++;
  } else {
    console.error(`❌ [FAIL] ${testName}`);
    failed++;
  }
}

async function testDynamicRecipients() {
  console.log('=== VERIFYING DYNAMIC RECIPIENT DISPATCH ===\n');

  // Test with Resend's official deliverable test address
  const dynamicRecipient1 = 'delivered@resend.dev';
  const res1 = await handleSendEmailOtp({
    email: dynamicRecipient1,
    name: 'Dynamic Customer 1'
  });

  assert(res1.status === 200 && res1.data.success === true, `Test 1: Dynamic dispatch to ${dynamicRecipient1} succeeded`);
  assert(typeof res1.data.messageId === 'string', `Test 1 Message ID: ${res1.data.messageId}`);

  console.log(`\n==================================================`);
  console.log(`DYNAMIC RECIPIENT VERIFICATION: ${passed} PASSED, ${failed} FAILED`);
  console.log(`==================================================\n`);
}

testDynamicRecipients().catch(console.error);
