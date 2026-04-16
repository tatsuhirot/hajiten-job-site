import { fetchJobs, getTagList, getLocationList, parseSalaryMin, SALARY_BUCKETS } from '@/lib/fetchJobs';
import Link from 'next/link';
import { Suspense } from 'react';
import FilterBar from '@/components/FilterBar';

export const revalidate = 3600;

interface PageProps {
  searchParams: {
    type?: string;
    location?: string;
    tag?: string;
    q?: string;
    salary?: string;
  };
}

function buildFilterOptions(jobs: Awaited<ReturnType<typeof fetchJobs>>) {
  const types = Array.from(new Set(jobs.map((j) => j.type).filter(Boolean))).sort();
  const locations = Array.from(new Set(jobs.flatMap((j) => getLocationList(j)))).sort();
  const tags = Array.from(new Set(jobs.flatMap((j) => getTagList(j)))).sort();
  return { types, locations, tags };
}

function formatLocation(location: string): string {
  const parts = location.split(',').map((l) => l.trim()).filter(Boolean);
  if (parts.length <= 2) return parts.join(' / ');
  return `${parts[0]} 他${parts.length - 1}都道府県`;
}

export default async function CareerOptionsPage({ searchParams }: PageProps) {
  const allJobs = await fetchJobs();

  const selectedSalaries = searchParams.salary ? searchParams.salary.split(',') : [];

  // フィルタリング
  const filtered = allJobs.filter((job) => {
    if (searchParams.type && job.type !== searchParams.type) return false;
    if (searchParams.location && !getLocationList(job).includes(searchParams.location)) return false;
    if (searchParams.tag && !getTagList(job).includes(searchParams.tag)) return false;
    if (searchParams.q) {
      const q = searchParams.q.toLowerCase();
      const hit = [job.title, job.company, job.occupation, job.description]
        .some((f) => f?.toLowerCase().includes(q));
      if (!hit) return false;
    }
    if (selectedSalaries.length > 0) {
      const min = parseSalaryMin(job.salary);
      if (min === null) return false;
      const inRange = selectedSalaries.some((key) => {
        const bucket = SALARY_BUCKETS.find((b) => b.key === key);
        return bucket && min >= bucket.min && min <= bucket.max;
      });
      if (!inRange) return false;
    }
    return true;
  });

  const { types, locations, tags } = buildFilterOptions(allJobs);

  return (
    <div className="min-h-screen bg-[#F8FFF9]">

      {/* ヘッダーバナー */}
      <section className="bg-gradient-to-br from-[#1A2B3C] to-[#2C3E50] py-20 sm:py-32 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-64 h-64 bg-gradient-to-br from-[#21cb4d]/20 to-transparent rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-64 h-64 bg-gradient-to-br from-[#e3e148]/20 to-transparent rounded-full blur-3xl" />
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-16 relative z-10 text-center">
          <div className="inline-block mb-6">
            <span className="bg-white/10 text-white px-8 py-3 rounded-full text-sm font-bold tracking-widest">
              CAREER OPTIONS
            </span>
          </div>
          <h1
            className="text-3xl sm:text-5xl lg:text-7xl font-black text-white mb-6 leading-tight"
            style={{ fontFamily: '"Noto Sans JP", sans-serif' }}
          >
            求人情報
          </h1>
          <p className="text-lg sm:text-2xl text-white/80 font-bold">
            あなたに合ったキャリアを、一緒に見つけよう
          </p>
        </div>
      </section>

      {/* フィルター + 求人一覧 */}
      <section className="py-16 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-16">

          {allJobs.length === 0 ? (
            <div className="text-center py-32">
              <div className="w-20 h-20 bg-gradient-to-br from-[#21cb4d] to-[#e3e148] rounded-full flex items-center justify-center mx-auto mb-6">
                <i className="ri-briefcase-line text-4xl text-white" />
              </div>
              <h2 className="text-2xl font-black text-[#1A2B3C] mb-4">現在、公開中の求人はありません</h2>
              <p className="text-[#6B7280] mb-8">新着求人は随時更新されます。LINEで個別にご相談いただくことも可能です。</p>
              <Link
                href="/line"
                className="inline-flex items-center gap-3 bg-gradient-to-r from-[#21cb4d] to-[#21cb4d]/90 text-white px-10 py-4 rounded-full font-bold shadow-lg hover:shadow-xl transition-all"
              >
                <i className="ri-line-fill text-xl" />
                LINEで相談する
              </Link>
            </div>
          ) : (
            <>
              {/* FilterBar は Suspense で包む（useSearchParams要件） */}
              <Suspense fallback={<div className="h-24 bg-white rounded-2xl animate-pulse mb-8" />}>
                <FilterBar
                  types={types}
                  locations={locations}
                  tags={tags}
                  totalCount={allJobs.length}
                  filteredCount={filtered.length}
                  salaryBuckets={SALARY_BUCKETS}
                />
              </Suspense>

              {/* フィルター結果なし */}
              {filtered.length === 0 ? (
                <div className="text-center py-24">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <i className="ri-search-line text-3xl text-gray-400" />
                  </div>
                  <h3 className="text-xl font-black text-[#1A2B3C] mb-3">該当する求人がありません</h3>
                  <p className="text-gray-500 mb-6">別の条件で検索してみてください。</p>
                  <Link
                    href="/career-options"
                    className="inline-flex items-center gap-2 bg-[#1A2B3C] text-white px-8 py-4 rounded-full font-bold hover:bg-[#1A2B3C]/90 transition-all duration-300 hover:scale-105"
                  >
                    <i className="ri-refresh-line" />
                    全件表示に戻る
                  </Link>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                  {filtered.map((job) => {
                    const jobTags = getTagList(job);
                    return (
                      <Link
                        key={job.id}
                        href={`/jobs/${job.id}`}
                        className="card-hover group bg-white rounded-2xl sm:rounded-3xl shadow-lg hover:shadow-2xl border-2 border-transparent hover:border-[#21cb4d]/20 transition-all duration-300 overflow-hidden flex flex-col"
                      >
                        {/* カードヘッダー */}
                        <div className="bg-gradient-to-br from-[#1A2B3C] to-[#2C3E50] p-6 sm:p-8">
                          <div className="flex items-start justify-between gap-4 mb-4">
                            <span className="inline-block bg-gradient-to-r from-[#21cb4d] to-[#e3e148] text-[#1A2B3C] px-4 py-1.5 rounded-full text-xs font-black">
                              {job.type}
                            </span>
                            <span className="text-white/50 text-xs">{job.updated_at}</span>
                          </div>
                          <h2 className="text-lg sm:text-xl font-black text-white mb-2 leading-snug group-hover:text-[#e3e148] transition-colors duration-300">
                            {job.title}
                          </h2>
                          <p className="text-white/70 text-sm font-bold">{job.company}</p>
                        </div>

                        {/* カードボディ */}
                        <div className="p-6 sm:p-8 flex-1 flex flex-col">
                          <div className="space-y-3 mb-6">
                            <div className="flex items-center gap-3 text-[#6B7280] text-sm">
                              <i className="ri-map-pin-line text-[#21cb4d] text-base flex-shrink-0" />
                              <span>{formatLocation(job.location)}</span>
                            </div>
                            <div className="flex items-center gap-3 text-[#6B7280] text-sm">
                              <i className="ri-money-yen-circle-line text-[#21cb4d] text-base flex-shrink-0" />
                              <span className="font-bold text-[#1A2B3C]">{job.salary}</span>
                            </div>
                          </div>

                          {jobTags.length > 0 && (
                            <div className="flex flex-wrap gap-2 mb-6">
                              {jobTags.map((tag) => (
                                <span
                                  key={tag}
                                  className="bg-[#F8FFF9] border border-[#21cb4d]/30 text-[#1A2B3C] px-3 py-1 rounded-full text-xs font-bold"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          )}

                          <div className="mt-auto flex items-center gap-2 text-[#21cb4d] font-bold text-sm group-hover:gap-4 transition-all duration-300">
                            <span>詳しく見る</span>
                            <i className="ri-arrow-right-line" />
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-24 bg-gradient-to-br from-[#1A2B3C] to-[#2C3E50] text-white text-center relative overflow-hidden">
        <div className="absolute top-10 left-10 w-64 h-64 bg-[#21cb4d]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-64 h-64 bg-[#e3e148]/10 rounded-full blur-3xl" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-16 relative z-10">
          <h2
            className="text-2xl sm:text-4xl font-black mb-4"
            style={{ fontFamily: '"Noto Sans JP", sans-serif' }}
          >
            気になる求人が見つかりましたか？
          </h2>
          <p className="text-white/80 mb-10 text-base sm:text-lg">まずはLINEで無料相談。あなたに合った求人をご提案します。</p>
          <Link
            href="/line"
            className="inline-flex items-center gap-3 bg-gradient-to-r from-[#21cb4d] to-[#e3e148] text-[#1A2B3C] px-10 sm:px-14 py-4 sm:py-6 rounded-full text-base sm:text-xl font-black shadow-2xl hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            <i className="ri-line-fill text-2xl" />
            LINEで無料相談する
          </Link>
        </div>
      </section>

    </div>
  );
}
