/**
 * MongoDB Atlas Connection Manager & Health Checker
 * Optimized for Vercel Serverless Functions and Local Node.js environments.
 * 
 * Features:
 * - Connection pooling & reuse across warm serverless function invocations
 * - Configurable timeout to prevent serverless function hangs
 * - Ping verification for health checks
 * - Zero exposure of credentials or connection strings
 */

import { MongoClient } from 'mongodb';
import fs from 'node:fs';
import path from 'node:path';

// Helper to load MONGODB_URI from local .env if process.env.MONGODB_URI is not set
function getMongoUri() {
  if (process.env.MONGODB_URI && process.env.MONGODB_URI.trim()) {
    return process.env.MONGODB_URI.trim();
  }

  try {
    const envPath = path.resolve(process.cwd(), '.env');
    if (fs.existsSync(envPath)) {
      const content = fs.readFileSync(envPath, 'utf8');
      for (const line of content.split('\n')) {
        const trimmed = line.trim();
        if (trimmed.startsWith('MONGODB_URI=')) {
          let val = trimmed.slice('MONGODB_URI='.length).trim();
          if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
            val = val.slice(1, -1);
          }
          if (val) {
            process.env.MONGODB_URI = val;
            return val;
          }
        }
      }
    }
  } catch {
    // Ignore local .env read errors in serverless environment
  }

  return null;
}

// Global cached client promise across serverless function re-invocations
let cachedClientPromise = null;

const CLIENT_OPTIONS = {
  maxPoolSize: 10,
  minPoolSize: 1,
  serverSelectionTimeoutMS: 5000, // 5s timeout prevents serverless execution timeout
  connectTimeoutMS: 5000,
  socketTimeoutMS: 10000,
};

/**
 * Returns a connected MongoClient instance (cached across serverless invocations)
 */
export async function getMongoClient() {
  const uri = getMongoUri();
  if (!uri) {
    throw new Error('MONGODB_URI environment variable is not configured');
  }

  if (!cachedClientPromise) {
    const client = new MongoClient(uri, CLIENT_OPTIONS);
    cachedClientPromise = client.connect().catch((err) => {
      // Invalidate cache on connection failure so subsequent requests can retry
      cachedClientPromise = null;
      throw err;
    });
  }

  return cachedClientPromise;
}

/**
 * Returns the MongoDB Database instance
 */
export async function getDatabase(dbName) {
  const client = await getMongoClient();
  return client.db(dbName || undefined);
}

/**
 * Performs a lightweight health check ping on the MongoDB connection.
 * Safe for use in /api/health endpoint.
 */
export async function checkDatabaseConnection() {
  const uri = getMongoUri();
  if (!uri) {
    return {
      connected: false,
      status: 'unconfigured',
      message: 'MONGODB_URI environment variable is not configured'
    };
  }

  try {
    const client = await getMongoClient();
    const adminDb = client.db('admin');
    await adminDb.command({ ping: 1 });

    return {
      connected: true,
      status: 'connected',
      message: 'MongoDB Atlas connected successfully'
    };
  } catch (err) {
    return {
      connected: false,
      status: 'disconnected',
      message: err.message || 'Failed to connect to MongoDB Atlas'
    };
  }
}
