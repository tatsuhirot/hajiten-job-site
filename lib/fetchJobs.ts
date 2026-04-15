import Papa from 'papaparse';
import path from 'path';
import fs from 'fs';

export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  type: string;
  tags: string;
  description: string;
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
    // 開発: ローカル public/sample.csv を使用
    const filePath = path.join(process.cwd(), 'public', 'sample.csv');
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
