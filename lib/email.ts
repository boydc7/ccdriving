import nodemailer from 'nodemailer';

// Use environment variables for SMTP configuration
// In local dev without env vars, you can use ethereal.email for testing
export const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.ethereal.email',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export const getToEmail = () => {
  return process.env.EMAIL_TO || 'admin@ccdrivingschool.com';
};
