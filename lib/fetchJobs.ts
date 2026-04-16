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
    const res = await fetch(blobs[0].url, { cache: 'no-store' });
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

export function getLocationList(job: Job): string[] {
  return job.location ? job.location.split(',').map((l) => l.trim()).filter(Boolean) : [];
}

export function parseSalaryMin(salary: string): number | null {
  const match = salary.match(/^([\d,]+)万円/);
  if (match) return parseInt(match[1].replace(',', ''), 10);
  return null;
}

export const SALARY_BUCKETS = [
  { key: 'under400', label: '〜400万円', min: 0, max: 399 },
  { key: '400to600', label: '400〜600万円', min: 400, max: 599 },
  { key: '600to800', label: '600〜800万円', min: 600, max: 799 },
  { key: '800plus', label: '800万円以上', min: 800, max: Infinity },
] as const;

export const REGIONS = [
  { key: 'hokkaido', label: '北海道', prefectures: ['北海道'] },
  { key: 'tohoku',   label: '東北',   prefectures: ['青森県','岩手県','宮城県','秋田県','山形県','福島県'] },
  { key: 'kanto',    label: '関東',   prefectures: ['茨城県','栃木県','群馬県','埼玉県','千葉県','東京都','神奈川県'] },
  { key: 'hokuriku', label: '北陸・甲信越', prefectures: ['新潟県','富山県','石川県','福井県','山梨県','長野県'] },
  { key: 'tokai',    label: '東海',   prefectures: ['岐阜県','静岡県','愛知県','三重県'] },
  { key: 'kinki',    label: '近畿',   prefectures: ['滋賀県','京都府','大阪府','兵庫県','奈良県','和歌山県'] },
  { key: 'chugoku',  label: '中国',   prefectures: ['鳥取県','島根県','岡山県','広島県','山口県'] },
  { key: 'shikoku',  label: '四国',   prefectures: ['徳島県','香川県','愛媛県','高知県'] },
  { key: 'kyushu',   label: '九州・沖縄', prefectures: ['福岡県','佐賀県','長崎県','熊本県','大分県','宮崎県','鹿児島県','沖縄県'] },
] as const;

export const TOKYO_23_WARDS = [
  '千代田区','中央区','港区','新宿区','文京区','台東区','墨田区','江東区',
  '品川区','目黒区','大田区','世田谷区','渋谷区','中野区','杉並区','豊島区',
  '北区','荒川区','板橋区','練馬区','足立区','葛飾区','江戸川区',
] as const;

export function isIn23Wards(job: Job): boolean {
  return TOKYO_23_WARDS.some((ward) => job.address?.includes(ward));
}
