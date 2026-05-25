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

    const publicDir = path.join(process.cwd(), 'public');
    const classesFilePath = path.join(publicDir, 'classes.json');

    // Create a backup of the existing file
    if (fs.existsSync(classesFilePath)) {
      const now = new Date();
      const timestamp = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}-${String(now.getHours()).padStart(2, '0')}${String(now.getMinutes()).padStart(2, '0')}${String(now.getSeconds()).padStart(2, '0')}`;
      const backupFilePath = path.join(publicDir, `classes.backup-${timestamp}.json`);
      fs.copyFileSync(classesFilePath, backupFilePath);
    }

    // Write the new classes to the file
    fs.writeFileSync(classesFilePath, JSON.stringify(classes, null, 2), 'utf-8');

    // Revalidate the classes page so it updates immediately
    revalidatePath('/classes');

    return NextResponse.json({ success: true, message: 'Classes updated and backed up successfully' });
  } catch (error) {
    console.error('Error saving classes:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
