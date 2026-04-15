import { put } from '@vercel/blob';
import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';
import { validateAdminToken } from '@/lib/auth';

const REQUIRED_COLUMNS = ['id', 'title', 'company', 'location', 'salary', 'type', 'description', 'published'];

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const token = formData.get('token') as string;
  const file = formData.get('file') as File;

  if (!validateAdminToken(token)) {
    return NextResponse.json({ success: false, error: 'Invalid token' }, { status: 401 });
  }

  if (!file || file.type !== 'text/csv') {
    return NextResponse.json({ success: false, error: 'CSVファイルをアップロードしてください' }, { status: 400 });
  }

  const csvText = await file.text();

  // 必須カラムチェック
  const firstLine = csvText.split('\n')[0] || '';
  const headers = firstLine.split(',').map((h) => h.trim().replace(/"/g, ''));
  const missing = REQUIRED_COLUMNS.filter((col) => !headers.includes(col));
  if (missing.length > 0) {
    return NextResponse.json({
      success: false,
      error: `必須カラムが不足しています: ${missing.join(', ')}`,
    }, { status: 400 });
  }

  // 件数カウント（ヘッダー除く空行除く）
  const count = csvText.split('\n').slice(1).filter((l) => l.trim()).length;

  // Vercel Blob に保存
  await put('jobs.csv', file, {
    access: 'public',
    addRandomSuffix: false,
  });

  revalidatePath('/');
  revalidatePath('/career-options');

  return NextResponse.json({ success: true, count, updatedAt: new Date().toISOString() });
}
