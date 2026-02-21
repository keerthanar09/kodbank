import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { hashPassword } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    const { uid, username, email, password, phone } = await req.json();

    if (!uid || !username || !email || !password || !phone) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    const hashedPassword = hashPassword(password);

    await query(
      `INSERT INTO "KodUser" (uid, username, email, password, phone, role, balance) 
       VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [uid, username, email, hashedPassword, phone, 'customer', 0]
    );

    return NextResponse.json({ success: true, message: 'Registration successful' });
  } catch (error: any) {
    if (error.code === '23505') {
      return NextResponse.json({ error: 'Username or email already exists' }, { status: 409 });
    }
    return NextResponse.json({ error: 'Registration failed' }, { status: 500 });
  }
}
