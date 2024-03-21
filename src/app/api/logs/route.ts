import fs from 'fs';
import path from 'path';
import { withAdmin } from "@/lib/session/withUser";
import { NextResponse } from 'next/server';

const filePath = path.join(process.cwd(), './app.log');

export const GET = withAdmin(async () => {
  try {
    const fileContents = fs.readFileSync(filePath, 'utf8');
    return NextResponse.json({ log: fileContents }, { status: 200 });
  } catch (error) {
    console.error('Error reading file:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
});
