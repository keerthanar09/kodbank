import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { verifyPassword, generateToken } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json();

    if (!username || !password) {
      return NextResponse.json({ error: 'Username and password required' }, { status: 400 });
    }

    const result = await query(
      `SELECT uid, username, password, role, balance FROM "KodUser" WHERE username = $1`,
      [username]
    );

    if (result.rows.length === 0) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    const user = result.rows[0];

    if (!verifyPassword(password, user.password)) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    // Initialize balance to 1000004 if it's 0 or null
    const balanceNum = parseFloat(user.balance) || 0;
    if (balanceNum === 0) {
      await query(
        `UPDATE "KodUser" SET balance = 1000004 WHERE uid = $1`,
        [user.uid]
      );
    }

    const token = generateToken(user.username, user.role);
    const expiry = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    await query(
      `INSERT INTO "UserToken" (token, uid, expiry) VALUES ($1, $2, $3)`,
      [token, user.uid, expiry]
    );

    const response = NextResponse.json({ success: true, message: 'Login successful' });
    response.cookies.set('auth_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60,
      path: '/',
    });

    return response;
  } catch (error) {
    return NextResponse.json({ error: 'Login failed' }, { status: 500 });
  }
}
