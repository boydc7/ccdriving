import nodemailer from 'nodemailer';

// Use environment variables for SMTP configuration
// In local dev without env vars, you can use ethereal.email for testing
const port = parseInt(process.env.SMTP_PORT || '587');
// If port is 465, we must use implicit TLS (secure: true).
// If port is 587 or 2587 (SES STARTTLS), we must use secure: false.
const isSecure = process.env.SMTP_SECURE !== undefined && process.env.SMTP_SECURE !== ''
  ? process.env.SMTP_SECURE === 'true'
  : port === 465;

// Prevent common misconfiguration (secure: true on port 587) which causes "wrong version number" SSL error
const finalSecure = (port === 587 || port === 2587) ? false : isSecure;

export const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'email-smtp.us-west-2.amazonaws.com',
  port: port,
  secure: finalSecure,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export const getToEmail = () => {
  return process.env.EMAIL_TO || 'gary@ccdrivingschool.com';
};
