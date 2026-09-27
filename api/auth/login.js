import { handleLoginUser } from '../../server/authHandlers.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});
    const result = await handleLoginUser(body);
    return res.status(result.status).json(result.data);
  } catch (err) {
    console.error('[API AUTH LOGIN ERROR]:', err);
    return res.status(500).json({ success: false, message: err.message || 'Internal Server Error' });
  }
}
