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
      from: process.env.SMTP_USER || '"CCDS Website" <noreply@ccdrivingschool.com>',
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
  // Extract all fields that exist on the enrollon.htm form
  const studentName = formData.get('studentName') as string;
  const dob = formData.get('dob') as string;
  const highSchool = formData.get('highSchool') as string;
  const gradYear = formData.get('gradYear') as string;
  const parentName = formData.get('parentName') as string;
  const address = formData.get('address') as string;
  const city = formData.get('city') as string;
  const zip = formData.get('zip') as string;
  const phone = formData.get('phone') as string;
  const cellPhone = formData.get('cellPhone') as string;
  const email = formData.get('email') as string;
  const selectedCourse = formData.get('course') as string;
  const comments = formData.get('comments') as string;

  if (!studentName || !parentName || !phone || !email) {
    return { error: 'Please fill out all required fields.' };
  }

  try {
    const info = await transporter.sendMail({
      from: process.env.SMTP_USER || '"CCDS Website" <noreply@ccdrivingschool.com>',
      to: getToEmail(),
      subject: `New Online Enrollment: ${studentName}`,
      text: `
Student Name: ${studentName}
DOB: ${dob}
High School: ${highSchool}
Grad Year: ${gradYear}
Parent/Guardian: ${parentName}
Address: ${address}, ${city}, ${zip}
Phone: ${phone}
Cell Phone: ${cellPhone}
Email: ${email}
Selected Course: ${selectedCourse}
Comments: ${comments}
      `,
      html: `
        <h3>New Online Enrollment</h3>
        <table border="1" cellpadding="5" cellspacing="0" style="border-collapse: collapse;">
          <tr><td><strong>Student Name:</strong></td><td>${studentName}</td></tr>
          <tr><td><strong>Date of Birth:</strong></td><td>${dob}</td></tr>
          <tr><td><strong>High School:</strong></td><td>${highSchool}</td></tr>
          <tr><td><strong>Graduation Year:</strong></td><td>${gradYear}</td></tr>
          <tr><td><strong>Parent/Guardian:</strong></td><td>${parentName}</td></tr>
          <tr><td><strong>Address:</strong></td><td>${address}, ${city}, ${zip}</td></tr>
          <tr><td><strong>Home Phone:</strong></td><td>${phone}</td></tr>
          <tr><td><strong>Cell Phone:</strong></td><td>${cellPhone}</td></tr>
          <tr><td><strong>Email:</strong></td><td>${email}</td></tr>
          <tr><td><strong>Selected Course:</strong></td><td>${selectedCourse}</td></tr>
          <tr><td><strong>Comments:</strong></td><td>${comments}</td></tr>
        </table>
      `,
    });
    
    console.log('Enrollment email sent: %s', info.messageId);
    return { success: true };
  } catch (error) {
    console.error('Error sending enrollment email:', error);
    return { error: 'Failed to submit enrollment. Please try again later.' };
  }
}
