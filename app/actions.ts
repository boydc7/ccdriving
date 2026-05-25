'use server';

import { transporter, getToEmail } from '@/lib/email';

export async function sendContactEmail(formData: FormData) {
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const phone = formData.get('phone') as string;
  const message = formData.get('message') as string;

  if (!name || !email || !message) {
    return { error: 'All fields are required.' };
  }

  try {
    const info = await transporter.sendMail({
      from: process.env.SMTP_FROM || 'gary@ccdrivingschool.com',
      to: getToEmail(),
      subject: `New Contact Form Submission from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone || 'Not provided'}\n\nMessage:\n${message}`,
      html: `<h3>New Contact Form Submission</h3>
             <p><strong>Name:</strong> ${name}</p>
             <p><strong>Email:</strong> ${email}</p>
             <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
             <p><strong>Message:</strong></p>
             <p>${message.replace(/\n/g, '<br>')}</p>`,
    });
    
    console.log('Message sent: %s', info.messageId);
    return { success: true };
  } catch (error) {
    console.error('Error sending email:', error);
    return { error: 'Failed to send message. Please try again later.' };
  }
}

export async function sendEnrollmentEmail(formData: FormData) {
  const studentName = formData.get('studentName') as string;
  const dob = formData.get('dob') as string;
  const highSchool = formData.get('highSchool') as string;
  const gradYear = formData.get('gradYear') as string;
  const presentClass = formData.get('presentClass') as string;
  const eyewear = formData.get('eyewear') as string;
  const medical = formData.get('medical') as string;
  
  const parentName = formData.get('parentName') as string;
  const address = formData.get('address') as string;
  const city = formData.get('city') as string;
  const state = formData.get('state') as string;
  const zip = formData.get('zip') as string;
  const phone = formData.get('phone') as string;
  const cellPhone = formData.get('cellPhone') as string;
  const email = formData.get('email') as string;
  const studentEmail = formData.get('studentEmail') as string;
  
  const selectedCourse = formData.get('course') as string;
  const schedulingContact = formData.get('schedulingContact') as string;
  const studentAvailability = formData.get('studentAvailability') as string;
  const hearAbout = formData.get('hearAbout') as string;
  const additionalInfo = formData.get('additionalInfo') as string;

  if (!studentName || !dob || !highSchool || !gradYear || !presentClass || !eyewear || !parentName || !address || !city || !state || !zip || !phone || !email || !selectedCourse) {
    return { error: 'Please fill out all required fields.' };
  }

  try {
    const info = await transporter.sendMail({
      from: process.env.SMTP_FROM || 'gary@ccdrivingschool.com',
      to: getToEmail(),
      subject: `CCDS Enrollment Form (${studentName})`,
      text: `
Student Name: ${studentName}
DOB: ${dob}
High School: ${highSchool}
Grad Year: ${gradYear}
Present Class: ${presentClass}
Eyewear: ${eyewear}
Medical Conditions: ${medical || 'None'}

Parent/Guardian: ${parentName}
Address: ${address}, ${city}, ${state} ${zip}
Phone: ${phone}
Student Cell Phone: ${cellPhone || 'None'}
Parent Email: ${email}
Student Email: ${studentEmail || 'None'}

Selected Course: ${selectedCourse}
Scheduling Contact: ${schedulingContact || 'None'}
Student Availability: ${studentAvailability || 'None'}
Heard About Us Via: ${hearAbout || 'None'}
Additional Info: ${additionalInfo || 'None'}
      `,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 650px; margin: 0 auto; color: #333; border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
          <div style="background-color: #2563eb; color: #ffffff; padding: 20px; text-align: center;">
            <h2 style="margin: 0; font-size: 24px;">New Online Enrollment</h2>
          </div>
          <div style="padding: 20px;">
            <table width="100%" cellpadding="12" cellspacing="0" style="border-collapse: collapse;">
              <tr><td colspan="2" style="background-color: #f8fafc; color: #1e40af; font-size: 16px; border-bottom: 2px solid #bfdbfe;"><strong>Student Information</strong></td></tr>
              <tr style="border-bottom: 1px solid #f1f5f9;"><td width="35%"><strong>Student Name:</strong></td><td>${studentName}</td></tr>
              <tr style="border-bottom: 1px solid #f1f5f9;"><td><strong>Date of Birth:</strong></td><td>${dob}</td></tr>
              <tr style="border-bottom: 1px solid #f1f5f9;"><td><strong>High School:</strong></td><td>${highSchool}</td></tr>
              <tr style="border-bottom: 1px solid #f1f5f9;"><td><strong>Graduation Year:</strong></td><td>${gradYear}</td></tr>
              <tr style="border-bottom: 1px solid #f1f5f9;"><td><strong>Present Class:</strong></td><td>${presentClass}</td></tr>
              <tr style="border-bottom: 1px solid #f1f5f9;"><td><strong>Corrective Eyewear:</strong></td><td>${eyewear}</td></tr>
              <tr style="border-bottom: 1px solid #f1f5f9;"><td><strong>Medical Conditions:</strong></td><td>${medical || 'None'}</td></tr>
              
              <tr><td colspan="2" style="background-color: #f8fafc; color: #1e40af; font-size: 16px; border-bottom: 2px solid #bfdbfe; padding-top: 24px;"><strong>Contact Information</strong></td></tr>
              <tr style="border-bottom: 1px solid #f1f5f9;"><td width="35%"><strong>Parent/Guardian:</strong></td><td>${parentName}</td></tr>
              <tr style="border-bottom: 1px solid #f1f5f9;"><td><strong>Address:</strong></td><td>${address}, ${city}, ${state} ${zip}</td></tr>
              <tr style="border-bottom: 1px solid #f1f5f9;"><td><strong>Phone:</strong></td><td>${phone}</td></tr>
              <tr style="border-bottom: 1px solid #f1f5f9;"><td><strong>Student Cell Phone:</strong></td><td>${cellPhone || 'None'}</td></tr>
              <tr style="border-bottom: 1px solid #f1f5f9;"><td><strong>Parent Email:</strong></td><td><a href="mailto:${email}" style="color: #2563eb;">${email}</a></td></tr>
              <tr style="border-bottom: 1px solid #f1f5f9;"><td><strong>Student Email:</strong></td><td>${studentEmail ? `<a href="mailto:${studentEmail}" style="color: #2563eb;">${studentEmail}</a>` : 'None'}</td></tr>
              
              <tr><td colspan="2" style="background-color: #f8fafc; color: #1e40af; font-size: 16px; border-bottom: 2px solid #bfdbfe; padding-top: 24px;"><strong>Course & Additional Info</strong></td></tr>
              <tr style="border-bottom: 1px solid #f1f5f9;"><td width="35%"><strong>Selected Course:</strong></td><td><strong>${selectedCourse}</strong></td></tr>
              <tr style="border-bottom: 1px solid #f1f5f9;"><td><strong>Scheduling Contact:</strong></td><td>${schedulingContact || 'None'}</td></tr>
              <tr style="border-bottom: 1px solid #f1f5f9;"><td><strong>Student Availability:</strong></td><td>${studentAvailability || 'None'}</td></tr>
              <tr style="border-bottom: 1px solid #f1f5f9;"><td><strong>Heard About Us:</strong></td><td>${hearAbout || 'None'}</td></tr>
              <tr style="border-bottom: 1px solid #f1f5f9;"><td><strong>Additional Info:</strong></td><td>${additionalInfo || 'None'}</td></tr>
            </table>
          </div>
        </div>
      `,
    });
    
    console.log('Enrollment email sent: %s', info.messageId);
    return { success: true };
  } catch (error) {
    console.error('Error sending enrollment email:', error);
    return { error: 'Failed to submit enrollment. Please try again later.' };
  }
}

import { CourseClass } from '@/lib/classes';

export async function fetchClasses(): Promise<CourseClass[]> {
  const envSegment = process.env.NODE_ENV === 'production' ? 'prod' : 'dev';
  const cb = new Date().getTime();
  const cdnUrl = `https://cdn.ccdrivingschool.com/${envSegment}/classes.json?cb=${cb}`;
  
  try {
    const res = await fetch(cdnUrl, { cache: 'no-store' });
    if (!res.ok) {
      throw new Error(`Failed to fetch classes from CDN: ${res.status} ${res.statusText}`);
    }
    return res.json();
  } catch (error) {
    console.error('Error loading classes:', error);
    return []; // Return empty array on failure so page still loads
  }
}

export async function verifyPassword(password: string): Promise<boolean> {
  if (!process.env.ADMIN_PASSWORD) return false;
  return password === process.env.ADMIN_PASSWORD;
}
