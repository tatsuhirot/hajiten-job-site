import { put } from '@vercel/blob';
import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';
import { validateAdminToken } from '@/lib/auth';

export const maxDuration = 60;

const REQUIRED_COLUMNS = ['id', 'title', 'company', 'location', 'salary', 'type', 'description', 'published'];

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const token = formData.get('token') as string;
  const file = formData.get('file') as File;

  if (!validateAdminToken(token)) {
    return NextResponse.json({ success: false, error: 'Invalid token' }, { status: 401 });
  }

  if (!file) {
    return NextResponse.json({ success: false, error: 'ファイルを選択してください' }, { status: 400 });
  }

  const csvText = await file.text();

  // ヘッダー検証
  const firstLine = csvText.split('\n')[0] || '';
  const headers = firstLine.split(',').map(h => h.trim().replace(/"/g, ''));
  const missing = REQUIRED_COLUMNS.filter(col => !headers.includes(col));
  if (missing.length > 0) {
    return NextResponse.json({ success: false, error: `必須カラムが不足: ${missing.join(', ')}` }, { status: 400 });
  }

  const count = csvText.split('\n').slice(1).filter(l => l.trim()).length;

  const blob = new Blob([csvText], { type: 'text/csv' });
  await put('jobs.csv', blob, { access: 'public', addRandomSuffix: false });

  revalidatePath('/');
  revalidatePath('/career-options');

  return NextResponse.json({ success: true, count, updatedAt: new Date().toISOString() });
}
