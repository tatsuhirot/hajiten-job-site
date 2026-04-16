import { generateClientTokenFromReadWriteToken } from '@vercel/blob/client';
import { validateAdminToken } from '@/lib/auth';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const { token: adminToken, filename } = await request.json() as { token: string; filename: string };

  if (!validateAdminToken(adminToken)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const clientToken = await generateClientTokenFromReadWriteToken({
    token: process.env.BLOB_READ_WRITE_TOKEN!,
    pathname: `temp-uploads/${Date.now()}-${filename}`,
    maximumSizeInBytes: 100 * 1024 * 1024, // 100MB
    allowedContentTypes: [
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/vnd.ms-excel',
      'text/csv',
      'application/octet-stream',
    ],
    validUntil: Date.now() + 5 * 60 * 1000, // 5分
    addRandomSuffix: false,
  });

  return NextResponse.json({ clientToken });
}
