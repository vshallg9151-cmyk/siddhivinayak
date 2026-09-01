import fs from 'node:fs';
import path from 'node:path';

async function testFromEmails() {
  const envPath = path.resolve(process.cwd(), '.env');
  const envContent = fs.readFileSync(envPath, 'utf8');
  const keyMatch = envContent.match(/RESEND_API_KEY=([^\s\r\n]+)/);
  const apiKey = keyMatch ? keyMatch[1] : null;

  console.log('Testing with API Key present:', !!apiKey);

  // Test 1: Sending from 'sachinmishra29199.surat@gmail.com'
  console.log('\n--- Test 1: from = Siddhivinayak Tours <sachinmishra29199.surat@gmail.com> ---');
  try {
    const res1 = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: 'Siddhivinayak Tours <sachinmishra29199.surat@gmail.com>',
        to: ['sachinmishra29199.surat@gmail.com'],
        subject: 'Test From Gmail Address',
        html: '<p>Test</p>'
      })
    });
    const data1 = await res1.json();
    console.log('Resend Response 1 status:', res1.status);
    console.log('Resend Response 1 data:', data1);
  } catch (e) {
    console.error('Error 1:', e);
  }

  // Test 2: Sending from 'Siddhivinayak Tours <onboarding@resend.dev>'
  console.log('\n--- Test 2: from = Siddhivinayak Tours <onboarding@resend.dev> ---');
  try {
    const res2 = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: 'Siddhivinayak Tours <onboarding@resend.dev>',
        to: ['sachinmishra29199.surat@gmail.com'],
        subject: 'Test From Onboarding Address',
        html: '<p>Test</p>'
      })
    });
    const data2 = await res2.json();
    console.log('Resend Response 2 status:', res2.status);
    console.log('Resend Response 2 data:', data2);
  } catch (e) {
    console.error('Error 2:', e);
  }
}

testFromEmails().catch(console.error);
