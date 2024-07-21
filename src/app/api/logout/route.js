import { NextResponse } from 'next/server';

export async function POST() {
  try {
    // No server-side action required for stateless JWT logout.
    return NextResponse.json({ message: 'Logged out successfully' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
