'use server';

import { transporter, getToEmail } from '@/lib/email';

const HTML_ESCAPES: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
};

// Form values are interpolated into the email body, so escape them first.
const esc = (value: unknown) =>
  String(value ?? '').replace(/[&<>"']/g, (char) => HTML_ESCAPES[char]);

// Matches the date formatting used on the enrollment form (app/enroll/page.tsx).
const formatDate = (value: string) => {
  if (!value) return '';
  const date = new Date(`${value}T12:00:00`);
  if (isNaN(date.getTime())) return value;
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  });
};

const LABEL_CELL =
  'font-family:Arial,Helvetica,sans-serif;font-size:11px;line-height:1.35;color:#555555;padding:2px 8px 2px 0;vertical-align:top;white-space:nowrap;';
const VALUE_CELL =
  'font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:1.35;color:#111111;padding:2px 0;vertical-align:top;';
const SECTION_HEADING =
  'font-family:Arial,Helvetica,sans-serif;font-size:10px;font-weight:bold;letter-spacing:0.06em;text-transform:uppercase;color:#1e40af;border-bottom:1px solid #c7d2e4;padding-bottom:3px;margin:0 0 6px 0;';

// Compact two-column label/value rows.
const rows = (pairs: [string, string][]) =>
  pairs
    .map(
      ([label, value]) =>
        `<tr><td style="${LABEL_CELL}" width="40%">${label}</td><td style="${VALUE_CELL}">${value}</td></tr>`
    )
    .join('');

const section = (title: string, body: string) =>
  `<div style="${SECTION_HEADING}">${title}</div>
   <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">${body}</table>`;

// Full-width stacked block for free-text answers.
const note = (label: string, value: string) =>
  `<div style="margin:0 0 6px 0;">
     <span style="font-family:Arial,Helvetica,sans-serif;font-size:10px;font-weight:bold;letter-spacing:0.04em;text-transform:uppercase;color:#555555;">${label}</span>
     <div style="font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:1.4;color:#111111;">${value}</div>
   </div>`;

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
             <p><strong>Name:</strong> ${esc(name)}</p>
             <p><strong>Email:</strong> ${esc(email)}</p>
             <p><strong>Phone:</strong> ${esc(phone || 'Not provided')}</p>
             <p><strong>Message:</strong></p>
             <p>${esc(message).replace(/\n/g, '<br>')}</p>`,
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

  const submittedOn = new Date().toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  const studentRows = rows([
    ['Date of Birth', esc(formatDate(dob))],
    ['High School', esc(highSchool)],
    ['Graduation Year', esc(gradYear)],
    ['Present Class', esc(presentClass)],
    ['Corrective Eyewear', esc(eyewear)],
    ['Student Cell', esc(cellPhone || '—')],
    [
      'Student Email',
      studentEmail
        ? `<a href="mailto:${esc(studentEmail)}" style="color:#1e40af;">${esc(studentEmail)}</a>`
        : '—',
    ],
  ]);

  const contactRows = rows([
    ['Parent/Guardian', esc(parentName)],
    ['Address', `${esc(address)}<br>${esc(city)}, ${esc(state)} ${esc(zip)}`],
    ['Phone', esc(phone)],
    [
      'Parent Email',
      `<a href="mailto:${esc(email)}" style="color:#1e40af;">${esc(email)}</a>`,
    ],
    ['Heard About Us', esc(hearAbout || '—')],
  ]);

  // Only free-text answers that were filled in, so the sheet stays on one page.
  const notes = [
    ['Medical Conditions / Medication', medical || 'None reported'],
    ['Scheduling Contact & Best Time to Call', schedulingContact],
    ['Student Availability', studentAvailability],
    ['Additional Information', additionalInfo],
  ]
    .filter(([, value]) => value)
    .map(([label, value]) => note(label, esc(value).replace(/\n/g, '<br>')))
    .join('');

  const html = `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Enrollment — ${esc(studentName)}</title>
<style>
  @page { size: letter portrait; margin: 0.5in; }
  @media print {
    body { background: #ffffff !important; }
    .sheet { border: none !important; max-width: 100% !important; }
    .no-print { display: none !important; }
    a { color: #111111 !important; text-decoration: none !important; }
  }
</style>
</head>
<body style="margin:0;padding:0;background:#ffffff;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;background:#ffffff;">
  <tr><td align="center" style="padding:12px;">
    <table role="presentation" class="sheet" width="100%" cellpadding="0" cellspacing="0" style="max-width:680px;border:1px solid #d0d5dd;border-collapse:collapse;">

      <tr><td style="padding:8px 14px;border-bottom:2px solid #111111;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr>
          <td style="font-family:Arial,Helvetica,sans-serif;font-size:14px;font-weight:bold;color:#111111;">CCDS Enrollment Form</td>
          <td align="right" style="font-family:Arial,Helvetica,sans-serif;font-size:11px;color:#555555;">Received ${esc(submittedOn)}</td>
        </tr></table>
      </td></tr>

      <tr><td style="padding:8px 14px;border-bottom:1px solid #d0d5dd;background:#f4f6f8;">
        <div style="font-family:Arial,Helvetica,sans-serif;font-size:17px;font-weight:bold;line-height:1.2;color:#111111;">${esc(studentName)}</div>
        <div style="font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:1.4;color:#333333;padding-top:2px;">${esc(selectedCourse)}</div>
      </td></tr>

      <tr><td style="padding:0;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;"><tr>
          <td width="50%" valign="top" style="padding:10px 14px;border-right:1px solid #e4e7ec;">
            ${section('Student', studentRows)}
          </td>
          <td width="50%" valign="top" style="padding:10px 14px;">
            ${section('Parent / Guardian', contactRows)}
          </td>
        </tr></table>
      </td></tr>

      ${
        notes
          ? `<tr><td style="padding:10px 14px;border-top:1px solid #e4e7ec;">
               <div style="${SECTION_HEADING}">Notes</div>
               ${notes}
             </td></tr>`
          : ''
      }

    </table>
  </td></tr>
</table>
</body>
</html>`;

  try {
    const info = await transporter.sendMail({
      from: process.env.SMTP_FROM || 'gary@ccdrivingschool.com',
      to: getToEmail(),
      replyTo: email,
      subject: `CCDS Enrollment: ${studentName} — ${selectedCourse}`,
      text: [
        `CCDS ENROLLMENT FORM — received ${submittedOn}`,
        '',
        `${studentName}`,
        `${selectedCourse}`,
        '',
        'STUDENT',
        `  Date of Birth:      ${formatDate(dob)}`,
        `  High School:        ${highSchool}`,
        `  Graduation Year:    ${gradYear}`,
        `  Present Class:      ${presentClass}`,
        `  Corrective Eyewear: ${eyewear}`,
        `  Student Cell:       ${cellPhone || '-'}`,
        `  Student Email:      ${studentEmail || '-'}`,
        '',
        'PARENT / GUARDIAN',
        `  Name:               ${parentName}`,
        `  Address:            ${address}, ${city}, ${state} ${zip}`,
        `  Phone:              ${phone}`,
        `  Email:              ${email}`,
        `  Heard About Us:     ${hearAbout || '-'}`,
        '',
        'NOTES',
        `  Medical Conditions: ${medical || 'None reported'}`,
        ...(schedulingContact ? [`  Scheduling Contact: ${schedulingContact}`] : []),
        ...(studentAvailability ? [`  Availability:       ${studentAvailability}`] : []),
        ...(additionalInfo ? [`  Additional Info:    ${additionalInfo}`] : []),
        '',
      ].join('\n'),
      html,
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
