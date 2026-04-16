import { put } from '@vercel/blob';
import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';
import { validateAdminToken } from '@/lib/auth';

export const maxDuration = 60;

const REQUIRED_COLUMNS = ['id', 'title', 'company', 'location', 'salary', 'type', 'description', 'published'];

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const token = formData.get('token') as string;
    const file = formData.get('file') as File | null;

    if (!validateAdminToken(token)) {
      return NextResponse.json({ success: false, error: 'Invalid token' }, { status: 401 });
    }

    if (!file) {
      return NextResponse.json({ success: false, error: 'ファイルが見つかりません' }, { status: 400 });
    }

    let csvText: string;
    try {
      csvText = await file.text();
    } catch (e) {
      return NextResponse.json({ success: false, error: `ファイル読み込みエラー: ${(e as Error).message}` }, { status: 400 });
    }

    if (!csvText.trim()) {
      return NextResponse.json({ success: false, error: 'ファイルが空です' }, { status: 400 });
    }

    // ヘッダー検証
    const firstLine = csvText.split('\n')[0] || '';
    const headers = firstLine.split(',').map(h => h.trim().replace(/"/g, ''));
    const missing = REQUIRED_COLUMNS.filter(col => !headers.includes(col));
    if (missing.length > 0) {
      return NextResponse.json({ success: false, error: `必須カラムが不足: ${missing.join(', ')}` }, { status: 400 });
    }

    const count = csvText.split('\n').slice(1).filter(l => l.trim()).length;

    try {
      await put('jobs.csv', csvText, {
        access: 'public',
        addRandomSuffix: false,
        contentType: 'text/csv',
      });
    } catch (e) {
      return NextResponse.json({ success: false, error: `Blob保存エラー: ${(e as Error).message}` }, { status: 500 });
    }

    revalidatePath('/');
    revalidatePath('/career-options');

    return NextResponse.json({ success: true, count, updatedAt: new Date().toISOString() });
  } catch (e) {
    return NextResponse.json({ success: false, error: `予期しないエラー: ${(e as Error).message}` }, { status: 500 });
  }
}
