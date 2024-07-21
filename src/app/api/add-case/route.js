import { NextResponse } from 'next/server';
import { Pool } from 'pg';
import jwt from 'jsonwebtoken';

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
});

export async function POST(request) {
  const authHeader = request.headers.get('Authorization');
  if (!authHeader) {
    return NextResponse.json({ message: 'Authorization header missing' }, { status: 401 });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { fullName, email, requestUrl } = await request.json();

    const result = await pool.query(
      'INSERT INTO cases (user_id, full_name, email, request_url, status) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [decoded.id, fullName, email, requestUrl, 'pending']
    );

    return NextResponse.json({ case: result.rows[0] });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Failed to create case' }, { status: 500 });
  }
}
