import { checkDatabaseConnection } from '../server/mongodb.js';

export default async function handler(req, res) {
  // Allow GET and HEAD for uptime monitoring and health checks
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    return res.status(405).json({
      success: false,
      message: 'Method Not Allowed. Use GET for health status.'
    });
  }

  try {
    const dbStatus = await checkDatabaseConnection();

    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate');

    const response = {
      success: true,
      message: 'Siddhivinayak API is running',
      database: dbStatus.connected ? 'connected' : 'disconnected',
      databaseMessage: dbStatus.message,
      timestamp: new Date().toISOString()
    };

    return res.status(200).json(response);
  } catch (err) {
    console.error('[HEALTH API ERROR]:', err);
    return res.status(500).json({
      success: false,
      message: 'Siddhivinayak API encountered an error checking health',
      database: 'disconnected',
      error: err.message || 'Internal Server Error',
      timestamp: new Date().toISOString()
    });
  }
}
