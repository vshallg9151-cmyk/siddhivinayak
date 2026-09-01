import fs from 'node:fs';
import path from 'node:path';

async function diagnoseArbitraryRecipient() {
  const envPath = path.resolve(process.cwd(), '.env');
  const envContent = fs.readFileSync(envPath, 'utf8');
  const keyMatch = envContent.match(/RESEND_API_KEY=([^\s\r\n]+)/);
  const apiKey = keyMatch ? keyMatch[1] : null;

  console.log('=== DIAGNOSING RESEND RECIPIENT POLICY ===\n');

  // Test 1: Sending to another arbitrary Gmail address
  const arbitraryEmail = 'testcustomer998877@gmail.com';
  console.log(`1. Testing dispatch to arbitrary Gmail: ${arbitraryEmail}...`);
  
  const res1 = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      from: 'Siddhivinayak Tours <onboarding@resend.dev>',
      to: [arbitraryEmail],
      subject: 'Verification Code Test',
      html: '<p>Test verification</p>'
    })
  });

  const data1 = await res1.json();
  console.log('HTTP Status:', res1.status);
  console.log('Resend Response Body:', JSON.stringify(data1, null, 2));

  // Test 2: Sending to the account owner's email
  const ownerEmail = 'sachinmishra29199.surat@gmail.com';
  console.log(`\n2. Testing dispatch to account owner's email: ${ownerEmail}...`);
  
  const res2 = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      from: 'Siddhivinayak Tours <onboarding@resend.dev>',
      to: [ownerEmail],
      subject: 'Verification Code Test',
      html: '<p>Test verification</p>'
    })
  });

  const data2 = await res2.json();
  console.log('HTTP Status:', res2.status);
  console.log('Resend Response Body:', JSON.stringify(data2, null, 2));
}

diagnoseArbitraryRecipient().catch(console.error);
