'use client';

import { useState } from 'react';
import Link from 'next/link';

const faqs = [
  {
    category: '登録・相談について',
    items: [
      {
        q: '登録・相談は無料ですか？',
        a: 'はい、完全無料です。はじてんは企業からの紹介手数料で運営されているため、求職者の方に費用は一切かかりません。',
      },
      {
        q: 'LINEで相談できますか？',
        a: 'はい、LINEで相談いただけます。メールや電話よりも気軽に、スキマ時間にご相談いただけます。返信は営業日24時間以内を目標にしています。',
      },
      {
        q: '在職中でも相談できますか？',
        a: 'もちろんです。在職中の方がほとんどです。面談の時間帯やオンライン対応など、柔軟にご対応します。',
      },
    ],
  },
  {
    category: '転職活動について',
    items: [
      {
        q: '未経験でも転職できますか？',
        a: '経験・スキルの棚卸しから、ポテンシャルを活かせる求人のご提案まで、未経験転職を全力でサポートします。実際に未経験から異業種転職を成功させた方が多数います。',
      },
      {
        q: '転職活動の期間はどれくらいかかりますか？',
        a: '平均的には2〜4ヶ月程度です。ただし、希望条件や現在の状況によって大きく異なります。急いでいる方にはスピード選考の求人をご紹介することも可能です。',
      },
      {
        q: '面接対策もしてもらえますか？',
        a: 'はい、応募書類の添削から面接練習まで、包括的にサポートします。企業ごとの面接傾向も共有しますので、安心して臨んでいただけます。',
      },
    ],
  },
  {
    category: '求人・条件について',
    items: [
      {
        q: '年収はアップしますか？',
        a: '転職によって年収がアップするケースは多くあります。ただし、業種・職種・経験年数によって異なります。具体的な水準はご相談時にお伝えします。',
      },
      {
        q: 'リモートワークの求人はありますか？',
        a: 'はい、リモートワーク・ハイブリッドワークの求人も多数取り扱っています。ご希望をお聞きした上で、マッチする求人をご提案します。',
      },
      {
        q: '希望に合わなければ断れますか？',
        a: 'もちろんです。ご提案した求人への応募は必須ではありません。納得いくまで相談しながら進められるのが、はじてんの強みです。',
      },
    ],
  },
];

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-gray-200 last:border-0">
      <button
        className="w-full text-left py-6 flex items-start justify-between gap-4 hover:text-[#21cb4d] transition-colors duration-300"
        onClick={() => setOpen(!open)}
      >
        <span className="font-bold text-lg text-[#1A2B3C] flex items-start gap-3">
          <span className="text-[#21cb4d] font-black flex-shrink-0">Q.</span>
          {q}
        </span>
        <i className={`ri-${open ? 'subtract' : 'add'}-line text-xl text-[#21cb4d] flex-shrink-0 mt-1`} />
      </button>
      {open && (
        <div className="pb-6 pl-8 text-gray-600 leading-relaxed">
          <span className="text-[#21cb4d] font-black mr-2">A.</span>
          {a}
        </div>
      )}
    </div>
  );
}

export default function FaqPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* ヒーロー */}
      <section className="bg-[#1A2B3C] pt-36 pb-24 text-center text-white">
        <p className="text-[#21cb4d] font-bold tracking-widest mb-4 text-sm uppercase">FAQ</p>
        <h1 className="text-4xl lg:text-6xl font-black mb-6">よくある質問</h1>
        <p className="text-white/70 text-xl max-w-2xl mx-auto">
          転職を考えているあなたの疑問にお答えします。
        </p>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 lg:px-16 max-w-3xl space-y-16">
          {faqs.map((section) => (
            <div key={section.category}>
              <h2 className="text-xl font-black text-[#1A2B3C] mb-6 pb-4 border-b-2 border-[#21cb4d] flex items-center gap-2">
                <i className="ri-question-line text-[#21cb4d]" />
                {section.category}
              </h2>
              <div>
                {section.items.map((item) => (
                  <FaqItem key={item.q} q={item.q} a={item.a} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 解決しない場合 */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6 text-center max-w-xl">
          <p className="text-gray-600 mb-6">解決しない質問がありますか？</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/line"
              className="inline-flex items-center gap-2 bg-[#21cb4d] text-white px-8 py-4 rounded-full font-bold hover:bg-[#21cb4d]/90 transition-all duration-300 hover:scale-105"
            >
              <i className="ri-line-fill text-xl" />
              LINEで質問する
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 border-2 border-[#1A2B3C] text-[#1A2B3C] hover:bg-[#1A2B3C] hover:text-white px-8 py-4 rounded-full font-bold transition-all duration-300 hover:scale-105"
            >
              <i className="ri-mail-send-line text-xl" />
              フォームで問い合わせ
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
