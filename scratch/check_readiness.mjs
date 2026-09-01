/**
 * Real OTP Delivery Readiness Diagnostic Script
 * Checks server environment, provider initialization, and actual API dispatch readiness.
 * CRITICAL: NEVER logs raw OTPs or prints secret API keys.
 */

import fs from 'node:fs';
import path from 'node:path';
import {
  handleSendEmailOtp,
  handleSendMobileOtp
} from '../server/otpBackend.js';

async function checkReadiness() {
  const envPath = path.resolve(process.cwd(), '.env');
  const envExists = fs.existsSync(envPath);

  let hasResendKey = !!process.env.RESEND_API_KEY;
  let hasFast2smsKey = !!process.env.FAST2SMS_API_KEY;
  let senderEmail = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev';

  if (envExists) {
    const content = fs.readFileSync(envPath, 'utf8');
    if (content.includes('RESEND_API_KEY=') && !content.includes('RESEND_API_KEY=re_your_resend_api_key_here') && !content.includes('RESEND_API_KEY=')) {
      const match = content.match(/RESEND_API_KEY=([^\s\n\r]+)/);
      if (match && match[1] && match[1] !== 're_your_resend_api_key_here') {
        hasResendKey = true;
      }
    }
    if (content.includes('FAST2SMS_API_KEY=') && !content.includes('FAST2SMS_API_KEY=your_fast2sms_api_key_here')) {
      const match = content.match(/FAST2SMS_API_KEY=([^\s\n\r]+)/);
      if (match && match[1] && match[1] !== 'your_fast2sms_api_key_here') {
        hasFast2smsKey = true;
      }
    }
  }

  console.log('=== REAL OTP DELIVERY READINESS DIAGNOSTIC ===\n');
  console.log(`.env File Present: ${envExists ? 'YES' : 'NO (Only .env.example exists)'}`);
  console.log(`Server-side RESEND_API_KEY configured: ${hasResendKey ? 'YES' : 'NO'}`);
  console.log(`Server-side FAST2SMS_API_KEY configured: ${hasFast2smsKey ? 'YES' : 'NO'}`);
  console.log(`Configured Sender Email: ${senderEmail}\n`);

  console.log('--- Testing Backend Email Dispatch ---');
  const emailResult = await handleSendEmailOtp({
    email: 'sachinmishra29199.surat@gmail.com',
    name: 'Sachin Mishra'
  });
  console.log('Email Handler Response Status:', emailResult.status);
  console.log('Email Handler Response Data:', JSON.stringify(emailResult.data));

  console.log('\n--- Testing Backend SMS Dispatch ---');
  const smsResult = await handleSendMobileOtp({
    mobile: '8487889151',
    name: 'Sachin Mishra'
  });
  console.log('SMS Handler Response Status:', smsResult.status);
  console.log('SMS Handler Response Data:', JSON.stringify(smsResult.data));
}

checkReadiness().catch(console.error);
