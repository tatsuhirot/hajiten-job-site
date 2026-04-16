import Papa from 'papaparse';
import path from 'path';
import fs from 'fs';

export interface Job {
  // 基本情報
  id: string;
  title: string;
  type: string;
  occupation: string;
  // 企業情報
  company: string;
  company_url: string;
  company_overview: string;
  founded: string;
  capital: string;
  employee_count: string;
  // 配属・募集
  department: string;
  department_detail: string;
  hiring_reason: string;
  description: string;
  // 雇用条件
  employment_type: string;
  probation_months: string;
  probation_note: string;
  // 勤務時間
  work_hours_start: string;
  work_hours_end: string;
  break_minutes: string;
  overtime: string;
  avg_overtime_hours: string;
  // 給与
  salary_min: string;
  salary_max: string;
  salary: string;
  salary_system: string;
  monthly_salary_min: string;
  monthly_salary_max: string;
  work_arrangement: string;
  work_arrangement_detail: string;
  compensation_details: string;
  // 福利・休暇
  welfare: string;
  smoking_policy: string;
  holidays: string;
  holidays_note: string;
  // 勤務地
  location: string;
  address: string;
  relocation: string;
  // 要件
  requirements: string;
  preferred_skills: string;
  selection_process: string;
  // メタ
  tags: string;
  published: string;
  updated_at: string;
}

export async function fetchJobs(): Promise<Job[]> {
  let csvText: string;

  const blobUrl = process.env.JOBS_CSV_BLOB_URL;

  if (blobUrl) {
    // 本番: Vercel Blob から取得
    const res = await fetch(blobUrl, { next: { revalidate: 60 } });
    if (!res.ok) throw new Error(`CSV fetch failed: ${res.status}`);
    csvText = await res.text();
  } else {
    // 開発: ローカル public/jobs.csv を使用
    const filePath = path.join(process.cwd(), 'public', 'jobs.csv');
    if (!fs.existsSync(filePath)) return [];
    csvText = fs.readFileSync(filePath, 'utf-8');
  }

  const result = Papa.parse<Job>(csvText, {
    header: true,
    skipEmptyLines: true,
  });

  return result.data.filter((job) => job.published === 'TRUE');
}

export function getTagList(job: Job): string[] {
  return job.tags ? job.tags.split(',').map((t) => t.trim()).filter(Boolean) : [];
}
