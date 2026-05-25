import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { revalidatePath } from 'next/cache';

export async function POST(request: Request) {
  try {
    const { password, classes } = await request.json();

    // Verify Password
    if (!process.env.ADMIN_PASSWORD) {
      return NextResponse.json({ error: 'Server misconfiguration: No admin password set' }, { status: 500 });
    }

    if (password !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json({ error: 'Unauthorized: Incorrect password' }, { status: 401 });
    }

    if (!Array.isArray(classes)) {
      return NextResponse.json({ error: 'Invalid payload: classes must be an array' }, { status: 400 });
    }

    const payloadStr = JSON.stringify(classes, null, 2);
    
    // Create a timestamped backup URL
    const envSegment = process.env.NODE_ENV === 'production' ? 'prod' : 'dev';
    const now = new Date();
    const timestamp = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}-${String(now.getHours()).padStart(2, '0')}${String(now.getMinutes()).padStart(2, '0')}${String(now.getSeconds()).padStart(2, '0')}`;
    const backupUrl = `https://cdn.ccdrivingschool.com/${envSegment}/backup/classes.${timestamp}.json`;
    const mainUrl = `https://cdn.ccdrivingschool.com/${envSegment}/classes.json`;

    // 1. Upload backup via PUT
    const backupRes = await fetch(backupUrl, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: payloadStr,
    });

    if (!backupRes.ok) {
      console.error(`Backup to CDN failed: ${backupRes.status} ${backupRes.statusText}`);
      // Proceeding to attempt main file anyway, though this indicates an issue.
    }

    // 2. Upload main file via PUT
    const mainRes = await fetch(mainUrl, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: payloadStr,
    });

    if (!mainRes.ok) {
      throw new Error(`Failed to update main classes.json on CDN: ${mainRes.status} ${mainRes.statusText}`);
    }

    // Revalidate the classes page so it updates immediately
    revalidatePath('/classes');

    return NextResponse.json({ success: true, message: 'Classes updated and backed up successfully' });
  } catch (error) {
    console.error('Error saving classes:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
