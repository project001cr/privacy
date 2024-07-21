import { NextResponse } from 'next/server';
const db = require('../../../lib/db');

export async function GET() {
  try {
    const result = await db.query('SELECT * FROM cases ORDER BY submitted_at DESC');
    return NextResponse.json(result.rows);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  const { userId, fullName, email, requestUrl } = await request.json();

  try {
    const result = await db.query(
      'INSERT INTO cases (user_id, full_name, email, request_url, status) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [userId, fullName, email, requestUrl, 'pending']
    );

    return NextResponse.json({ message: 'Case added successfully', case: result.rows[0] }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }