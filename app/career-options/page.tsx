import { fetchJobs, getTagList, getLocationList, parseSalaryMin, SALARY_BUCKETS, REGIONS, isIn23Wards } from '@/lib/fetchJobs';
import Link from 'next/link';
import { Suspense } from 'react';
import FilterBar from '@/components/FilterBar';

export const revalidate = 3600;

const JOBS_PER_PAGE = 12;

interface PageProps {
  searchParams: {
    type?: string;
    tag?: string;
    q?: string;
    salary?: string;
    region?: string;
    ward23?: string;
    page?: string;
  };
}

function buildFilterOptions(jobs: Awaited<ReturnType<typeof fetchJobs>>) {
  const types = Array.from(new Set(jobs.map((j) => j.type).filter(Boolean))).sort();
  const tags = Array.from(new Set(jobs.flatMap((j) => getTagList(j)))).sort();
  return { types, tags };
}

function formatLocation(location: string): string {
  const parts = location.split(',').map((l) => l.trim()).filter(Boolean);
  if (parts.length <= 2) return parts.join(' / ');
  return `${parts[0]} 他${parts.length - 1}都道府県`;
}

export default async function CareerOptionsPage({ searchParams }: PageProps) {
  const allJobs = await fetchJobs();

  const selectedSalaries = searchParams.salary ? searchParams.salary.split(',') : [];
  const selectedRegions  = searchParams.region  ? searchParams.region.split(',')  : [];
  const ward23 = searchParams.ward23 === 'true';
  const currentPage = Math.max(1, parseInt(searchParams.page ?? '1', 10));

  // フィルタリング
  const filtered = allJobs.filter((job) => {
    if (searchParams.type && job.type !== searchParams.type) return false;
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
    if (selectedRegions.length > 0) {
      const locs = getLocationList(job);
      const inRegion = selectedRegions.some((rKey) => {
        const region = REGIONS.find((r) => r.key === rKey);
        return region && locs.some((loc) => (region.prefectures as readonly string[]).includes(loc));
      });
      if (!inRegion) return false;
    }
    if (ward23 && !isIn23Wards(job)) return false;
    return true;
  });

  // ページネーション
  const totalPages = Math.ceil(filtered.length / JOBS_PER_PAGE);
  const safePage = Math.min(currentPage, Math.max(1, totalPages));
  const paged = filtered.slice((safePage - 1) * JOBS_PER_PAGE, safePage * JOBS_PER_PAGE);

  const { types, tags } = buildFilterOptions(allJobs);

  // ページURLを生成（他パラメータ保持）
  function pageUrl(p: number) {
    const params = new URLSearchParams();
    if (searchParams.type)   params.set('type', searchParams.type);
    if (searchParams.tag)    params.set('tag', searchParams.tag);
    if (searchParams.q)      params.set('q', searchParams.q);
    if (searchParams.salary) params.set('salary', searchParams.salary);
    if (searchParams.region) params.set('region', searchParams.region);
    if (ward23)              params.set('ward23', 'true');
    params.set('page', String(p));
    return `/career-options?${params.toString()}`;
  }

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
              <Link href="/line" className="inline-flex items-center gap-3 bg-gradient-to-r from-[#21cb4d] to-[#21cb4d]/90 text-white px-10 py-4 rounded-full font-bold shadow-lg hover:shadow-xl transition-all">
                <i className="ri-line-fill text-xl" />
                LINEで相談する
              </Link>
            </div>
          ) : (
            <>
              <Suspense fallback={<div className="h-24 bg-white rounded-2xl animate-pulse mb-8" />}>
                <FilterBar
                  types={types}
                  tags={tags}
                  totalCount={allJobs.length}
                  filteredCount={filtered.length}
                  salaryBuckets={SALARY_BUCKETS}
                  regions={REGIONS}
                />
              </Suspense>

              {filtered.length === 0 ? (
                <div className="text-center py-24">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <i className="ri-search-line text-3xl text-gray-400" />
                  </div>
                  <h3 className="text-xl font-black text-[#1A2B3C] mb-3">該当する求人がありません</h3>
                  <p className="text-gray-500 mb-6">別の条件で検索してみてください。</p>
                  <Link href="/career-options" className="inline-flex items-center gap-2 bg-[#1A2B3C] text-white px-8 py-4 rounded-full font-bold hover:bg-[#1A2B3C]/90 transition-all duration-300 hover:scale-105">
                    <i className="ri-refresh-line" />
                    全件表示に戻る
                  </Link>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                    {paged.map((job) => {
                      const jobTags = getTagList(job);
                      return (
                        <Link
                          key={job.id}
                          href={`/jobs/${job.id}`}
                          className="card-hover group bg-white rounded-2xl sm:rounded-3xl shadow-lg hover:shadow-2xl border-2 border-transparent hover:border-[#21cb4d]/20 transition-all duration-300 overflow-hidden flex flex-col"
                        >
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
                                  <span key={tag} className="bg-[#F8FFF9] border border-[#21cb4d]/30 text-[#1A2B3C] px-3 py-1 rounded-full text-xs font-bold">
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

                  {/* ページネーション */}
                  {totalPages > 1 && (
                    <div className="flex items-center justify-center gap-2 mt-12">
                      {safePage > 1 && (
                        <Link href={pageUrl(safePage - 1)} className="w-10 h-10 flex items-center justify-center rounded-full bg-white border-2 border-gray-200 text-[#1A2B3C] font-bold hover:border-[#21cb4d] transition-colors">
                          <i className="ri-arrow-left-s-line" />
                        </Link>
                      )}
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                        <Link
                          key={p}
                          href={pageUrl(p)}
                          className={`w-10 h-10 flex items-center justify-center rounded-full text-sm font-black transition-all ${
                            p === safePage
                              ? 'bg-[#1A2B3C] text-white shadow-md'
                              : 'bg-white border-2 border-gray-200 text-[#1A2B3C] hover:border-[#21cb4d]'
                          }`}
                        >
                          {p}
                        </Link>
                      ))}
                      {safePage < totalPages && (
                        <Link href={pageUrl(safePage + 1)} className="w-10 h-10 flex items-center justify-center rounded-full bg-white border-2 border-gray-200 text-[#1A2B3C] font-bold hover:border-[#21cb4d] transition-colors">
                          <i className="ri-arrow-right-s-line" />
                        </Link>
                      )}
                    </div>
                  )}
                </>
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
          <h2 className="text-2xl sm:text-4xl font-black mb-4" style={{ fontFamily: '"Noto Sans JP", sans-serif' }}>
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
