const { get_user_id, update_case_num } = require('./db');
const readEmails = require('./readEmail');
const sendEmail = require('./sendEmail');
require('dotenv').config();

async function processEmails() {
  try {
    const emails = await readEmails();

    if (!Array.isArray(emails)) {
      throw new Error('Expected emails to be an array');
    }

    const regex = /\[CASE (\d+)\] RESPONSE TO ([\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,})/;
    const urlPattern = /https?:\/\/[^\s/$.?#].[^\s]*/g;

    for (const email of emails) {
      const matches = email.subject.match(regex);

      if (matches) {
        const urlmatches = email.body.match(urlPattern);

        const casenum = matches[1];
        const useremail = matches[2];
        const urls = urlmatches[0];
        const userid = await get_user_id(useremail);
        await update_case_num(userid, urls, casenum);
      }
        
        /*
        const forwardedEmail = {
        to: process.env.FORWARD_TO_EMAIL, // The email address to forward the emails to
        subject: `[CASE 384983]: ${email.subject}`,
        text: `Hey, this is your respnse from google:\n\n${email.body}\n\nIf you need assistance email at nigga@niggatron.com\n`
      }; 

      await sendEmail(forwardedEmail);
      console.log('Email forwarded:', email.subject);*/
    }
  } catch (error) {
    console.error('Error processing emails:', error);
    throw error;
  }
}

module.exports = processEmails;
