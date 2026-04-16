'use client';

import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useCallback, useState } from 'react';
import { SALARY_BUCKETS, REGIONS } from '@/lib/fetchJobs';

interface FilterBarProps {
  types: string[];
  tags: string[];
  totalCount: number;
  filteredCount: number;
  salaryBuckets: typeof SALARY_BUCKETS;
  regions: typeof REGIONS;
}

export default function FilterBar({ types, tags, totalCount, filteredCount, salaryBuckets, regions }: FilterBarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentType     = searchParams.get('type') ?? '';
  const currentTag      = searchParams.get('tag') ?? '';
  const currentQ        = searchParams.get('q') ?? '';
  const currentSalaries = searchParams.get('salary') ? searchParams.get('salary')!.split(',') : [];
  const currentRegions  = searchParams.get('region')  ? searchParams.get('region')!.split(',')  : [];
  const currentWard23   = searchParams.get('ward23') === 'true';

  const [keyword, setKeyword] = useState(currentQ);

  const push = useCallback((params: URLSearchParams) => {
    // フィルター変更時はページを1に戻す
    params.delete('page');
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  }, [router, pathname]);

  const updateParam = useCallback((key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) { params.set(key, value); } else { params.delete(key); }
    push(params);
  }, [searchParams, push]);

  const toggleMulti = useCallback((paramKey: string, value: string, current: string[]) => {
    const params = new URLSearchParams(searchParams.toString());
    const next = current.includes(value) ? current.filter((v) => v !== value) : [...current, value];
    if (next.length > 0) { params.set(paramKey, next.join(',')); } else { params.delete(paramKey); }
    push(params);
  }, [searchParams, push]);

  const handleKeywordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateParam('q', keyword.trim());
  };

  const clearAll = () => {
    setKeyword('');
    router.push(pathname, { scroll: false });
  };

  const hasFilter = currentType || currentTag || currentQ || currentSalaries.length > 0 || currentRegions.length > 0 || currentWard23;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
      {/* 件数 + クリア */}
      <div className="flex items-center justify-between mb-6">
        <p className="text-[#6B7280] font-bold">
          <span className="text-[#1A2B3C] text-2xl font-black">{filteredCount}</span>
          {hasFilter && totalCount !== filteredCount
            ? <span className="text-gray-400 text-sm ml-1">/ {totalCount}件中 件</span>
            : <span> 件の求人</span>}
        </p>
        {hasFilter && (
          <button onClick={clearAll} className="flex items-center gap-2 text-sm text-gray-400 hover:text-[#1A2B3C] font-bold transition-colors">
            <i className="ri-close-circle-line" />
            フィルターをリセット
          </button>
        )}
      </div>

      <div className="space-y-5">
        {/* キーワード */}
        <div>
          <p className="text-xs font-black text-[#1A2B3C] mb-3 tracking-wider uppercase flex items-center gap-2">
            <i className="ri-search-line text-[#21cb4d]" />キーワード検索
          </p>
          <form onSubmit={handleKeywordSubmit} className="flex gap-2">
            <input
              type="text" value={keyword} onChange={(e) => setKeyword(e.target.value)}
              placeholder="職種・企業名・スキルなど"
              className="flex-1 border-2 border-gray-200 rounded-xl px-4 py-2.5 text-sm text-[#1A2B3C] font-bold outline-none focus:border-[#21cb4d] transition-colors"
            />
            <button type="submit" className="bg-[#1A2B3C] text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-[#1A2B3C]/80 transition-colors">検索</button>
            {currentQ && (
              <button type="button" onClick={() => { setKeyword(''); updateParam('q', ''); }} className="text-gray-400 hover:text-[#1A2B3C] px-2 transition-colors">
                <i className="ri-close-line text-lg" />
              </button>
            )}
          </form>
        </div>

        {/* 地域（複数選択） */}
        <div>
          <p className="text-xs font-black text-[#1A2B3C] mb-3 tracking-wider uppercase flex items-center gap-2">
            <i className="ri-map-2-line text-[#21cb4d]" />地域
            <span className="text-[10px] text-gray-400 font-normal normal-case">複数選択可</span>
          </p>
          <div className="flex flex-wrap gap-2">
            {regions.map((r) => {
              const selected = currentRegions.includes(r.key);
              return (
                <button key={r.key} onClick={() => toggleMulti('region', r.key, currentRegions)}
                  className={`px-4 py-2 rounded-full text-sm font-bold transition-all duration-200 ${selected ? 'bg-[#1A2B3C] text-white shadow-md scale-105' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                  {selected && <i className="ri-check-line mr-1" />}{r.label}
                </button>
              );
            })}
            {/* 23区内トグル */}
            <button
              onClick={() => updateParam('ward23', currentWard23 ? '' : 'true')}
              className={`px-4 py-2 rounded-full text-sm font-bold transition-all duration-200 border-2 ${currentWard23 ? 'bg-[#21cb4d] text-white border-[#21cb4d] shadow-md scale-105' : 'bg-white border-[#21cb4d]/40 text-[#1A2B3C] hover:border-[#21cb4d]'}`}>
              {currentWard23 && <i className="ri-check-line mr-1" />}東京23区内
            </button>
          </div>
        </div>

        {/* 雇用形態 */}
        {types.length > 0 && (
          <div>
            <p className="text-xs font-black text-[#1A2B3C] mb-3 tracking-wider uppercase flex items-center gap-2">
              <i className="ri-briefcase-line text-[#21cb4d]" />雇用形態
            </p>
            <div className="flex flex-wrap gap-2">
              {types.map((t) => (
                <button key={t} onClick={() => updateParam('type', currentType === t ? '' : t)}
                  className={`px-4 py-2 rounded-full text-sm font-bold transition-all duration-200 ${currentType === t ? 'bg-[#1A2B3C] text-white shadow-md scale-105' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                  {t}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* 年収帯（複数選択） */}
        <div>
          <p className="text-xs font-black text-[#1A2B3C] mb-3 tracking-wider uppercase flex items-center gap-2">
            <i className="ri-money-yen-circle-line text-[#21cb4d]" />年収帯
            <span className="text-[10px] text-gray-400 font-normal normal-case">複数選択可</span>
          </p>
          <div className="flex flex-wrap gap-2">
            {salaryBuckets.map((bucket) => {
              const selected = currentSalaries.includes(bucket.key);
              return (
                <button key={bucket.key} onClick={() => toggleMulti('salary', bucket.key, currentSalaries)}
                  className={`px-4 py-2 rounded-full text-sm font-bold transition-all duration-200 ${selected ? 'bg-[#21cb4d] text-white shadow-md scale-105' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                  {selected && <i className="ri-check-line mr-1" />}{bucket.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* タグ */}
        {tags.length > 0 && (
          <div>
            <p className="text-xs font-black text-[#1A2B3C] mb-3 tracking-wider uppercase flex items-center gap-2">
              <i className="ri-price-tag-3-line text-[#21cb4d]" />スキル・タグ
            </p>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <button key={tag} onClick={() => updateParam('tag', currentTag === tag ? '' : tag)}
                  className={`px-4 py-2 rounded-full text-sm font-bold transition-all duration-200 ${currentTag === tag ? 'bg-gradient-to-r from-[#21cb4d] to-[#e3e148] text-[#1A2B3C] shadow-md scale-105' : 'bg-[#F8FFF9] border border-[#21cb4d]/30 text-[#1A2B3C] hover:border-[#21cb4d]'}`}>
                  {tag}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* アクティブフィルター */}
      {hasFilter && (
        <div className="mt-5 pt-5 border-t border-gray-100 flex flex-wrap gap-2">
          <span className="text-xs text-gray-400 font-bold self-center">絞り込み中：</span>
          {currentQ && (
            <span className="inline-flex items-center gap-1 bg-gray-700 text-white text-xs px-3 py-1.5 rounded-full font-bold">
              「{currentQ}」
              <button onClick={() => { setKeyword(''); updateParam('q', ''); }} className="hover:text-[#e3e148] ml-1"><i className="ri-close-line" /></button>
            </span>
          )}
          {currentRegions.map((key) => {
            const r = regions.find((r) => r.key === key);
            return r ? (
              <span key={key} className="inline-flex items-center gap-1 bg-[#1A2B3C] text-white text-xs px-3 py-1.5 rounded-full font-bold">
                {r.label}
                <button onClick={() => toggleMulti('region', key, currentRegions)} className="hover:text-[#e3e148] ml-1"><i className="ri-close-line" /></button>
              </span>
            ) : null;
          })}
          {currentWard23 && (
            <span className="inline-flex items-center gap-1 bg-[#21cb4d] text-white text-xs px-3 py-1.5 rounded-full font-bold">
              東京23区内
              <button onClick={() => updateParam('ward23', '')} className="hover:opacity-70 ml-1"><i className="ri-close-line" /></button>
            </span>
          )}
          {currentType && (
            <span className="inline-flex items-center gap-1 bg-[#1A2B3C] text-white text-xs px-3 py-1.5 rounded-full font-bold">
              {currentType}
              <button onClick={() => updateParam('type', '')} className="hover:text-[#e3e148] ml-1"><i className="ri-close-line" /></button>
            </span>
          )}
          {currentSalaries.map((key) => {
            const b = salaryBuckets.find((b) => b.key === key);
            return b ? (
              <span key={key} className="inline-flex items-center gap-1 bg-[#21cb4d] text-white text-xs px-3 py-1.5 rounded-full font-bold">
                {b.label}
                <button onClick={() => toggleMulti('salary', key, currentSalaries)} className="hover:opacity-70 ml-1"><i className="ri-close-line" /></button>
              </span>
            ) : null;
          })}
          {currentTag && (
            <span className="inline-flex items-center gap-1 bg-gradient-to-r from-[#21cb4d] to-[#e3e148] text-[#1A2B3C] text-xs px-3 py-1.5 rounded-full font-bold">
              {currentTag}
              <button onClick={() => updateParam('tag', '')} className="hover:opacity-70 ml-1"><i className="ri-close-line" /></button>
            </span>
          )}
        </div>
      )}
    </div>
  );
}
