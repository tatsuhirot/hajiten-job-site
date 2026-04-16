import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';
import { validateAdminToken } from '@/lib/auth';

export async function POST(request: NextRequest) {
  const { token, count } = await request.json() as { token: string; count: number };

  if (!validateAdminToken(token)) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  revalidatePath('/');
  revalidatePath('/career-options');

  return NextResponse.json({ success: true, count, updatedAt: new Date().toISOString() });
}
