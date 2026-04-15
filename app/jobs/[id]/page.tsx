import { fetchJobs, getTagList } from '@/lib/fetchJobs';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export const revalidate = 60;

export default async function JobDetailPage({ params }: { params: { id: string } }) {
  const jobs = await fetchJobs();
  const job = jobs.find((j) => j.id === params.id);

  if (!job) notFound();

  const tags = getTagList(job);

  return (
    <div className="min-h-screen bg-[#F8FFF9]">

      {/* ヘッダーバナー */}
      <section className="bg-gradient-to-br from-[#1A2B3C] to-[#2C3E50] py-16 sm:py-24 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-64 h-64 bg-[#21cb4d]/20 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-64 h-64 bg-[#e3e148]/20 rounded-full blur-3xl" />
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-16 relative z-10">
          <Link
            href="/career-options"
            className="inline-flex items-center gap-2 text-white/60 hover:text-white mb-8 transition-colors font-bold text-sm"
          >
            <i className="ri-arrow-left-line" />
            求人一覧に戻る
          </Link>
          <div className="mb-4">
            <span className="inline-block bg-gradient-to-r from-[#21cb4d] to-[#e3e148] text-[#1A2B3C] px-4 py-1.5 rounded-full text-xs font-black">
              {job.type}
            </span>
          </div>
          <h1
            className="text-2xl sm:text-4xl lg:text-5xl font-black text-white mb-4 leading-tight"
            style={{ fontFamily: '"Noto Sans JP", sans-serif' }}
          >
            {job.title}
          </h1>
          <p className="text-white/80 text-lg font-bold">{job.company}</p>
        </div>
      </section>

      {/* 本文 */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-16">
          <div className="max-w-4xl mx-auto grid lg:grid-cols-3 gap-8">

            {/* メイン */}
            <div className="lg:col-span-2 space-y-8">
              <div className="bg-white rounded-2xl sm:rounded-3xl shadow-lg p-6 sm:p-10">
                <h2 className="text-xl font-black text-[#1A2B3C] mb-6 flex items-center gap-3">
                  <span className="w-8 h-8 bg-gradient-to-br from-[#21cb4d] to-[#e3e148] rounded-lg flex items-center justify-center">
                    <i className="ri-file-text-line text-white text-sm" />
                  </span>
                  業務内容
                </h2>
                <div className="text-[#6B7280] leading-relaxed whitespace-pre-wrap">{job.description}</div>
              </div>

              {tags.length > 0 && (
                <div className="bg-white rounded-2xl sm:rounded-3xl shadow-lg p-6 sm:p-10">
                  <h2 className="text-xl font-black text-[#1A2B3C] mb-6 flex items-center gap-3">
                    <span className="w-8 h-8 bg-gradient-to-br from-[#21cb4d] to-[#e3e148] rounded-lg flex items-center justify-center">
                      <i className="ri-price-tag-3-line text-white text-sm" />
                    </span>
                    スキル・キーワード
                  </h2>
                  <div className="flex flex-wrap gap-3">
                    {tags.map((tag) => (
                      <span key={tag} className="bg-[#F8FFF9] border border-[#21cb4d]/30 text-[#1A2B3C] px-4 py-2 rounded-full text-sm font-bold">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* サイドバー */}
            <div className="space-y-6">
              <div className="bg-white rounded-2xl sm:rounded-3xl shadow-lg p-6 sm:p-8 sticky top-24">
                <h2 className="text-lg font-black text-[#1A2B3C] mb-6">求人概要</h2>
                <ul className="space-y-4">
                  {[
                    { icon: 'ri-building-line', label: '会社名', value: job.company },
                    { icon: 'ri-map-pin-line', label: '勤務地', value: job.location },
                    { icon: 'ri-money-yen-circle-line', label: '給与', value: job.salary },
                    { icon: 'ri-briefcase-line', label: '雇用形態', value: job.type },
                    { icon: 'ri-calendar-line', label: '更新日', value: job.updated_at },
                  ].map(({ icon, label, value }) => (
                    <li key={label} className="flex items-start gap-3">
                      <i className={`${icon} text-[#21cb4d] mt-0.5 flex-shrink-0`} />
                      <div>
                        <p className="text-xs text-[#6B7280]">{label}</p>
                        <p className="text-sm font-bold text-[#1A2B3C]">{value}</p>
                      </div>
                    </li>
                  ))}
                </ul>

                <div className="mt-8 space-y-3">
                  <Link
                    href="/line"
                    className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[#21cb4d] to-[#21cb4d]/90 text-white py-4 rounded-full font-black text-base shadow-lg hover:shadow-xl transition-all hover:-translate-y-1"
                  >
                    <i className="ri-line-fill text-xl" />
                    LINEで応募・相談
                  </Link>
                  <Link
                    href="/career-options"
                    className="w-full flex items-center justify-center gap-2 border-2 border-[#1A2B3C] text-[#1A2B3C] py-4 rounded-full font-bold text-sm hover:bg-[#1A2B3C] hover:text-white transition-all"
                  >
                    求人一覧に戻る
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
