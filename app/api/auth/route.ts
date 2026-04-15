import { NextRequest, NextResponse } from 'next/server';
import { validateAdminToken } from '@/lib/auth';

export async function POST(request: NextRequest) {
  const { token } = await request.json();

  if (!token) {
    return NextResponse.json({ success: false, error: 'トークンを入力してください' }, { status: 400 });
  }

  if (!validateAdminToken(token)) {
    return NextResponse.json({ success: false, error: 'トークンが正しくありません' }, { status: 401 });
  }

  return NextResponse.json({ success: true });
}
