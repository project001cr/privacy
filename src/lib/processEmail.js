const readEmails = require('./readEmail');
const sendEmail = require('./sendEmail');
require('dotenv').config();

async function processEmails() {
  try {
    const emails = await readEmails();

    if (!Array.isArray(emails)) {
      throw new Error('Expected emails to be an array');
    }

    for (const email of emails) {
      const forwardedEmail = {
        to: process.env.FORWARD_TO_EMAIL, // The email address to forward the emails to
        subject: `[CASE 384983]: ${email.subject}`,
        text: `Hey, this is your respnse from google:\n\n${email.body}\n\nIf you need assistance email at nigga@niggatron.com\n`
      };

      await sendEmail(forwardedEmail);
      console.log('Email forwarded:', email.subject);
    }
  } catch (error) {
    console.error('Error processing emails:', error);
  }
}

module.exports = processEmails;
