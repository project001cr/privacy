const Imap = require('imap-simple');
const { simpleParser } = require('mailparser');
require('dotenv').config();

const imapConfig = {
  imap: {
    user: process.env.EMAIL_USER,
    password: process.env.EMAIL_PASS,
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    tls: true,
    authTimeout: 3000,
    connTimeout: 10000, // Increase connection timeout
    keepalive: {
      interval: 10000,
      idleInterval: 300000, // Keep the connection alive for 5 minutes
      forceNoop: true
    }
  }
};

async function readEmails() {
  const connection = await Imap.connect(imapConfig);
  await connection.openBox('INBOX');

  // Search criteria: unread emails
  const searchCriteria = ['UNSEEN'];
  const fetchOptions = { bodies: [''], markSeen: false };

  const messages = await connection.search(searchCriteria, fetchOptions);
  const emails = [];

  for (let message of messages) {
    try {
      const rawEmail = message.parts.find(part => part.which === '').body;
      const mail = await simpleParser(rawEmail);

      emails.push({
        subject: mail.subject || '(No Subject)',
        from: mail.from ? mail.from.value[0].address : '(No Sender)',
        body: mail.text || mail.html || '(No Body)'
      });
    } catch (error) {
      console.error(`Error parsing email: ${error.message}`);
    }
  }

  connection.end();
  return emails;
}

module.exports = readEmails;
