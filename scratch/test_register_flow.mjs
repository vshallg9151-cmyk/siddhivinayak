/**
 * Test Registration & Real Resend Dispatch Flow
 */

import {
  handleSendEmailOtp,
  handleVerifyEmailOtp
} from '../server/otpBackend.js';

async function testUserRegistrationEmailFlow() {
  console.log('=== TESTING REAL USER REGISTRATION EMAIL OTP DISPATCH ===\n');

  const userEmail = 'sachinmishra29199.surat@gmail.com';
  const userName = 'Sachin Mishra';

  console.log(`1. Simulating registration for: ${userEmail}...`);
  const dispatchRes = await handleSendEmailOtp({
    email: userEmail,
    name: userName
  });

  console.log('Dispatch HTTP Status:', dispatchRes.status);
  console.log('Dispatch API Response:', JSON.stringify(dispatchRes.data));

  if (dispatchRes.status === 200 && dispatchRes.data.success) {
    console.log(`\n🎉 SUCCESS: Resend API accepted the real email dispatch!`);
    console.log(`Provider Message ID: ${dispatchRes.data.messageId}`);
    console.log(`A real 6-digit OTP email has been sent to: ${userEmail}`);
    console.log(`\nNext step: Check your email inbox / spam folder for the code from Siddhivinayak Tours.`);
  } else {
    console.error(`\n❌ Resend Dispatch Failed:`, dispatchRes.data);
  }
}

testUserRegistrationEmailFlow().catch(console.error);
