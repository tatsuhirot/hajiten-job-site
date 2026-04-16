import { list } from '@vercel/blob';
import Papa from 'papaparse';
import path from 'path';
import fs from 'fs';

export interface Job {
  id: string;
  title: string;
  type: string;
  occupation: string;
  company: string;
  company_url: string;
  hiring_reason: string;
  description: string;
  employment_type: string;
  work_hours_start: string;
  work_hours_end: string;
  salary: string;
  compensation_details: string;
  welfare: string;
  holidays: string;
  holidays_note: string;
  location: string;
  address: string;
  relocation: string;
  employee_count: string;
  requirements: string;
  preferred_skills: string;
  selection_process: string;
  tags: string;
  published: string;
  updated_at: string;
}

export async function fetchJobs(): Promise<Job[]> {
  let csvText: string;

  const hasBlobToken = !!process.env.BLOB_READ_WRITE_TOKEN;

  if (hasBlobToken) {
    // 本番: Vercel Blob から動的に取得
    const { blobs } = await list({ prefix: 'jobs.csv', limit: 1 });
    if (blobs.length === 0) return [];
    const res = await fetch(blobs[0].url, { next: { revalidate: 3600 } });
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
