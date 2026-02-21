import { query } from './db';

export async function initializeDatabase() {
  try {
    await query(`
      CREATE TABLE IF NOT EXISTS "KodUser" (
        uid TEXT PRIMARY KEY,
        username TEXT UNIQUE NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        phone TEXT NOT NULL,
        role TEXT NOT NULL CHECK (role = 'customer'),
        balance NUMERIC DEFAULT 0
      );
    `);

    await query(`
      CREATE TABLE IF NOT EXISTS "UserToken" (
        tid SERIAL PRIMARY KEY,
        token TEXT NOT NULL,
        uid TEXT NOT NULL,
        expiry TIMESTAMP NOT NULL,
        FOREIGN KEY (uid) REFERENCES "KodUser"(uid) ON DELETE CASCADE
      );
    `);

    return { success: true };
  } catch (error) {
    console.error('Database initialization error:', error);
    throw error;
  }
}
