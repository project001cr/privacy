import { NextResponse } from 'next/server';
import sendEmail from '../../../lib/sendEmail';

export async function POST(request) {
  const { to, subject, text } = await request.json();

  try {
    await sendEmail({ to, subject, text });
    return NextResponse.json({ message: 'Email sent successfully' }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}
