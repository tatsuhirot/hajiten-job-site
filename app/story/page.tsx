import Link from 'next/link';

export const metadata = {
  title: '転職ストーリー | はじてん',
  description: 'はじてんを通じて転職に成功した方々のリアルなストーリーをご紹介します。',
};

const stories = [
  {
    id: 1,
    name: '田中 美咲さん（28歳）',
    from: '販売職',
    to: 'Webマーケター',
    period: '転職活動期間：2ヶ月',
    tag: '未経験転職',
    tagColor: '#21cb4d',
    quote: '「スキルなしで転職できるか不安でしたが、はじてんのサポートで想像以上の条件で内定をもらえました。」',
    body: '新卒でアパレル販売に就いたものの、将来性への不安からWebマーケターへの転職を決意。未経験だったため不安が大きかったが、担当者が業界知識から面接対策まで徹底的にサポート。LINEでいつでも相談できる環境が特に助かったという。',
    icon: 'ri-store-line',
  },
  {
    id: 2,
    name: '鈴木 拓也さん（31歳）',
    from: '営業職（BtoB）',
    to: 'ITコンサルタント',
    period: '転職活動期間：3ヶ月',
    tag: '年収UP',
    tagColor: '#e3e148',
    quote: '「年収120万円アップ。はじてんがいなければ交渉できていませんでした。」',
    body: '大手メーカーの営業として5年間勤務後、より専門性の高いキャリアを求めて転職活動を開始。はじてんの担当者から「あなたの経験はコンサルでも高く評価される」と言われ、自信を持って活動できた。給与交渉も担当者が同席してくれたことで成功。',
    icon: 'ri-briefcase-line',
  },
  {
    id: 3,
    name: '山田 花子さん（26歳）',
    from: '事務職',
    to: 'Webデザイナー',
    period: '転職活動期間：4ヶ月',
    tag: '副業→本業',
    tagColor: '#21cb4d',
    quote: '「副業で始めたデザインを本業にできた。はじてんのポートフォリオアドバイスが決め手でした。」',
    body: '社内事務をしながら独学でデザインを学び、副業として受注していた。転職のタイミングでどう動けばよいか迷っていたところ、はじてんに相談。ポートフォリオの見せ方を一緒に考えてくれたことで、デザイン会社3社から内定を獲得。',
    icon: 'ri-palette-line',
  },
];

export default function StoryPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* ヒーロー */}
      <section className="bg-[#1A2B3C] pt-36 pb-24 text-center text-white">
        <p className="text-[#21cb4d] font-bold tracking-widest mb-4 text-sm uppercase">Story</p>
        <h1 className="text-4xl lg:text-6xl font-black mb-6 leading-tight">
          転職ストーリー
        </h1>
        <p className="text-white/70 text-xl max-w-2xl mx-auto leading-relaxed">
          はじてんで転職を成功させた方々のリアルな声をお届けします。
        </p>
      </section>

      {/* ストーリー一覧 */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 lg:px-16 max-w-5xl space-y-16">
          {stories.map((s, i) => (
            <article
              key={s.id}
              className={`flex flex-col ${i % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-12 items-center`}
            >
              {/* アイコンエリア */}
              <div className="flex-shrink-0 w-full lg:w-72">
                <div className="bg-gradient-to-br from-[#1A2B3C] to-[#1A2B3C]/80 rounded-3xl p-10 text-center text-white">
                  <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <i className={`${s.icon} text-4xl text-[#21cb4d]`} />
                  </div>
                  <p className="font-black text-xl mb-2">{s.name}</p>
                  <p className="text-white/60 text-sm mb-4">{s.period}</p>
                  <div className="flex items-center justify-center gap-2 text-sm">
                    <span className="bg-white/10 px-3 py-1 rounded-full">{s.from}</span>
                    <i className="ri-arrow-right-line text-[#21cb4d]" />
                    <span className="bg-[#21cb4d]/20 text-[#21cb4d] px-3 py-1 rounded-full font-bold">{s.to}</span>
                  </div>
                  <div className="mt-4">
                    <span
                      className="inline-block text-xs font-bold px-3 py-1 rounded-full"
                      style={{ background: s.tagColor + '22', color: s.tagColor }}
                    >
                      {s.tag}
                    </span>
                  </div>
                </div>
              </div>

              {/* テキスト */}
              <div className="flex-1">
                <blockquote className="text-xl lg:text-2xl font-black text-[#1A2B3C] leading-relaxed mb-6 border-l-4 border-[#21cb4d] pl-6">
                  {s.quote}
                </blockquote>
                <p className="text-gray-600 leading-relaxed text-lg">{s.body}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-[#1A2B3C] text-center text-white">
        <h2 className="text-3xl lg:text-4xl font-black mb-6">
          次は<span className="bg-gradient-to-r from-[#21cb4d] to-[#e3e148] bg-clip-text text-transparent">あなたの番</span>です
        </h2>
        <p className="text-white/70 text-lg mb-10">まずは無料相談から。LINEで気軽にどうぞ。</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/line"
            className="inline-flex items-center gap-3 bg-gradient-to-r from-[#21cb4d] to-[#21cb4d]/90 text-white px-10 py-5 rounded-full text-lg font-bold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
          >
            <i className="ri-line-fill text-2xl" />
            <span>LINEで無料相談する</span>
          </Link>
          <Link
            href="/career-options"
            className="inline-flex items-center gap-3 border-2 border-white text-white hover:bg-white hover:text-[#1A2B3C] px-10 py-5 rounded-full text-lg font-bold transition-all duration-300 hover:scale-105"
          >
            <i className="ri-briefcase-line text-2xl" />
            <span>求人情報を見る</span>
          </Link>
        </div>
      </section>
    </main>
  );
}
