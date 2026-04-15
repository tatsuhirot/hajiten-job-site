'use client';

import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useCallback } from 'react';

interface FilterBarProps {
  types: string[];
  locations: string[];
  tags: string[];
  totalCount: number;
  filteredCount: number;
}

export default function FilterBar({
  types,
  locations,
  tags,
  totalCount,
  filteredCount,
}: FilterBarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentType = searchParams.get('type') ?? '';
  const currentLocation = searchParams.get('location') ?? '';
  const currentTag = searchParams.get('tag') ?? '';

  const updateParam = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [router, pathname, searchParams]
  );

  const clearAll = () => {
    router.push(pathname, { scroll: false });
  };

  const hasFilter = currentType || currentLocation || currentTag;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
      {/* 件数 + クリア */}
      <div className="flex items-center justify-between mb-6">
        <p className="text-[#6B7280] font-bold">
          <span className="text-[#1A2B3C] text-2xl font-black">{filteredCount}</span>
          {hasFilter && totalCount !== filteredCount && (
            <span className="text-gray-400 text-sm ml-1">/ {totalCount}件中</span>
          )}
          {!hasFilter && <span> 件の求人</span>}
          {hasFilter && totalCount !== filteredCount && <span> 件</span>}
        </p>
        {hasFilter && (
          <button
            onClick={clearAll}
            className="flex items-center gap-2 text-sm text-gray-400 hover:text-[#1A2B3C] font-bold transition-colors duration-300"
          >
            <i className="ri-close-circle-line" />
            フィルターをリセット
          </button>
        )}
      </div>

      <div className="space-y-5">
        {/* 雇用形態 */}
        {types.length > 0 && (
          <div>
            <p className="text-xs font-black text-[#1A2B3C] mb-3 tracking-wider uppercase flex items-center gap-2">
              <i className="ri-briefcase-line text-[#21cb4d]" />
              雇用形態
            </p>
            <div className="flex flex-wrap gap-2">
              {types.map((t) => (
                <button
                  key={t}
                  onClick={() => updateParam('type', currentType === t ? '' : t)}
                  className={`px-4 py-2 rounded-full text-sm font-bold transition-all duration-200 ${
                    currentType === t
                      ? 'bg-[#1A2B3C] text-white shadow-md scale-105'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* 勤務地 */}
        {locations.length > 0 && (
          <div>
            <p className="text-xs font-black text-[#1A2B3C] mb-3 tracking-wider uppercase flex items-center gap-2">
              <i className="ri-map-pin-line text-[#21cb4d]" />
              勤務地
            </p>
            <div className="flex flex-wrap gap-2">
              {locations.map((loc) => (
                <button
                  key={loc}
                  onClick={() => updateParam('location', currentLocation === loc ? '' : loc)}
                  className={`px-4 py-2 rounded-full text-sm font-bold transition-all duration-200 ${
                    currentLocation === loc
                      ? 'bg-[#1A2B3C] text-white shadow-md scale-105'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {loc}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* タグ */}
        {tags.length > 0 && (
          <div>
            <p className="text-xs font-black text-[#1A2B3C] mb-3 tracking-wider uppercase flex items-center gap-2">
              <i className="ri-price-tag-3-line text-[#21cb4d]" />
              スキル・キーワード
            </p>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => updateParam('tag', currentTag === tag ? '' : tag)}
                  className={`px-4 py-2 rounded-full text-sm font-bold transition-all duration-200 ${
                    currentTag === tag
                      ? 'bg-gradient-to-r from-[#21cb4d] to-[#e3e148] text-[#1A2B3C] shadow-md scale-105'
                      : 'bg-[#F8FFF9] border border-[#21cb4d]/30 text-[#1A2B3C] hover:border-[#21cb4d]'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* アクティブフィルター表示 */}
      {hasFilter && (
        <div className="mt-5 pt-5 border-t border-gray-100 flex flex-wrap gap-2">
          <span className="text-xs text-gray-400 font-bold self-center">絞り込み中：</span>
          {currentType && (
            <span className="inline-flex items-center gap-1 bg-[#1A2B3C] text-white text-xs px-3 py-1.5 rounded-full font-bold">
              {currentType}
              <button onClick={() => updateParam('type', '')} className="hover:text-[#e3e148] ml-1">
                <i className="ri-close-line" />
              </button>
            </span>
          )}
          {currentLocation && (
            <span className="inline-flex items-center gap-1 bg-[#1A2B3C] text-white text-xs px-3 py-1.5 rounded-full font-bold">
              {currentLocation}
              <button onClick={() => updateParam('location', '')} className="hover:text-[#e3e148] ml-1">
                <i className="ri-close-line" />
              </button>
            </span>
          )}
          {currentTag && (
            <span className="inline-flex items-center gap-1 bg-gradient-to-r from-[#21cb4d] to-[#e3e148] text-[#1A2B3C] text-xs px-3 py-1.5 rounded-full font-bold">
              {currentTag}
              <button onClick={() => updateParam('tag', '')} className="hover:opacity-70 ml-1">
                <i className="ri-close-line" />
              </button>
            </span>
          )}
        </div>
      )}
    </div>
  );
}
