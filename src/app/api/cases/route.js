import { NextResponse } from 'next/server';
import { Pool } from 'pg';
import jwt from 'jsonwebtoken';

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
});

// Handle GET requests to fetch all cases
export async function GET() {
  try {
    const result = await pool.query('SELECT * FROM cases');
    return NextResponse.json(result.rows);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Failed to fetch cases' }, { status: 500 });
  }
}
