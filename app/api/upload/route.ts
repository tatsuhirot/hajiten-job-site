import { put } from '@vercel/blob';
import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';
import { validateAdminToken } from '@/lib/auth';
import * as XLSX from 'xlsx';

const REQUIRED_COLUMNS = ['id', 'title', 'company', 'location', 'salary', 'type', 'description', 'published'];

const XLSX_COLUMN_MAP: Record<string, string> = {
  '求人ID': 'id',
  'タイトル': 'title',
  '職種': 'type',
  '職業': 'occupation',
  '企業名': 'company',
  'コーポレートサイトURL': 'company_url',
  '企業概要': 'company_overview',
  '設立年月日': 'founded',
  '資本金': 'capital',
  '従業員数': 'employee_count',
  '配属部署': 'department',
  '配属部署詳細': 'department_detail',
  '募集背景': 'hiring_reason',
  '仕事内容': 'description',
  '雇用形態': 'employment_type',
  '試用期間（ヶ月）': 'probation_months',
  '試用期間の補足': 'probation_note',
  '始業時間': 'work_hours_start',
  '終業時間': 'work_hours_end',
  '休憩時間（分）': 'break_minutes',
  '時間外労働': 'overtime',
  '月平均残業時間（時間/月）': 'avg_overtime_hours',
  '年収下限（万円）': 'salary_min',
  '年収上限（万円）': 'salary_max',
  '賃金制度': 'salary_system',
  '月給下限（円）': 'monthly_salary_min',
  '月給上限（円）': 'monthly_salary_max',
  '裁量労働制・固定残業代制': 'work_arrangement',
  '裁量労働制・固定残業代制の詳細': 'work_arrangement_detail',
  '待遇条件・昇給賞与': 'compensation_details',
  '福利厚生': 'welfare',
  '喫煙環境': 'smoking_policy',
  '休日休暇': 'holidays',
  '休日休暇に関する補足事項': 'holidays_note',
  '勤務地（都道府県）': 'location',
  '勤務地住所': 'address',
  '転勤の有無': 'relocation',
  '必須要件': 'requirements',
  '歓迎/尚可': 'preferred_skills',
  '選考プロセス': 'selection_process',
  '求人媒体への掲載': '_published_raw',
  'スカウトメールの送信': 'scout_ok',
};

function xlsxToCsv(buffer: ArrayBuffer): string {
  const wb = XLSX.read(buffer, { type: 'array' });
  const ws = wb.Sheets['job_list'];
  if (!ws) throw new Error('job_list シートが見つかりません');

  const rows = XLSX.utils.sheet_to_json<Record<string, unknown>>(ws);
  const today = new Date().toISOString().split('T')[0];

  const mapped = rows.map((r) => {
    const row: Record<string, string> = {};
    for (const [jpKey, enKey] of Object.entries(XLSX_COLUMN_MAP)) {
      row[enKey] = String(r[jpKey] ?? '');
    }
    // salary を生成
    const min = row['salary_min'];
    const max = row['salary_max'];
    if (min && max) row['salary'] = `${min}万円〜${max}万円`;
    else if (min) row['salary'] = `${min}万円〜`;
    else if (max) row['salary'] = `〜${max}万円`;
    else row['salary'] = '';
    // published を判定
    row['published'] = row['_published_raw'].includes('掲載OK') ? 'TRUE' : 'FALSE';
    delete row['_published_raw'];
    row['tags'] = '';
    row['updated_at'] = today;
    return row;
  });

  if (!mapped.length) throw new Error('データが0件です');

  const headers = Object.keys(mapped[0]);

  function escapeCSV(val: string): string {
    const s = val.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
    if (s.includes(',') || s.includes('"') || s.includes('\n')) {
      return '"' + s.replace(/"/g, '""') + '"';
    }
    return s;
  }

  const lines = [
    headers.join(','),
    ...mapped.map((row) => headers.map((h) => escapeCSV(row[h] ?? '')).join(',')),
  ];
  return lines.join('\n');
}

const XLSX_MIME_TYPES = [
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'application/vnd.ms-excel',
];

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

  const isXlsx = XLSX_MIME_TYPES.includes(file.type) || file.name.endsWith('.xlsx');
  const isCsv = file.type === 'text/csv' || file.name.endsWith('.csv');

  if (!isXlsx && !isCsv) {
    return NextResponse.json({ success: false, error: 'XLSXまたはCSVファイルをアップロードしてください' }, { status: 400 });
  }

  let csvText: string;

  if (isXlsx) {
    try {
      const buffer = await file.arrayBuffer();
      csvText = xlsxToCsv(buffer);
    } catch (e) {
      return NextResponse.json({ success: false, error: `XLSX変換エラー: ${(e as Error).message}` }, { status: 400 });
    }
  } else {
    csvText = await file.text();
    // 必須カラムチェック（CSVの場合のみ）
    const firstLine = csvText.split('\n')[0] || '';
    const headers = firstLine.split(',').map((h) => h.trim().replace(/"/g, ''));
    const missing = REQUIRED_COLUMNS.filter((col) => !headers.includes(col));
    if (missing.length > 0) {
      return NextResponse.json({
        success: false,
        error: `必須カラムが不足しています: ${missing.join(', ')}`,
      }, { status: 400 });
    }
  }

  const count = csvText.split('\n').slice(1).filter((l) => l.trim()).length;

  // Vercel Blob に保存
  const blob = new Blob([csvText], { type: 'text/csv' });
  await put('jobs.csv', blob, {
    access: 'public',
    addRandomSuffix: false,
  });

  revalidatePath('/');
  revalidatePath('/career-options');

  return NextResponse.json({ success: true, count, updatedAt: new Date().toISOString() });
}
