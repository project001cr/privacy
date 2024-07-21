import { NextResponse } from 'next/server';
const processEmails = require('../../../lib/processEmail');

export async function GET() {
  try {
    await processEmails();
    return NextResponse.json({ message: 'Emails processed successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error processing emails:', error);
    return NextResponse.json({ error: 'Failed to process emails' }, { status: 500 });
  }
}
