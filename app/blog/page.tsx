import Link from 'next/link';

export const metadata = {
  title: 'ブログ | はじてん',
  description: '転職のノウハウ・キャリア設計のヒント・業界情報など、役立つ記事をお届けします。',
};

const posts = [
  {
    slug: 'how-to-write-resume',
    title: '【完全版】はじめての職務経歴書の書き方｜採用担当者が見るポイントを解説',
    category: '書類対策',
    date: '2026-04-10',
    readTime: '8分',
    excerpt: '職務経歴書は転職活動の要。何をどう書けば採用担当者の目に留まるのか、構成から文章表現まで徹底解説します。',
    icon: 'ri-file-text-line',
  },
  {
    slug: 'interview-tips-for-beginners',
    title: 'はじめての転職面接で緊張しない7つのコツ',
    category: '面接対策',
    date: '2026-04-05',
    readTime: '6分',
    excerpt: '面接が怖い、上手く話せるか不安——そんな方のために、緊張を味方にする実践的なコツをまとめました。',
    icon: 'ri-user-voice-line',
  },
  {
    slug: 'salary-negotiation-guide',
    title: '年収交渉のタイミングと伝え方｜転職で年収を上げる方法',
    category: 'キャリア設計',
    date: '2026-03-28',
    readTime: '7分',
    excerpt: '「年収交渉って失礼じゃない？」——そんな思い込みを外して、正しく、臆せずに交渉する方法を解説します。',
    icon: 'ri-money-yen-circle-line',
  },
  {
    slug: 'career-change-without-experience',
    title: '未経験転職は難しい？成功する人・失敗する人の違いを解説',
    category: '未経験転職',
    date: '2026-03-20',
    readTime: '9分',
    excerpt: '未経験でも転職できる職種・できない職種、成功率を上げるための準備と戦略を徹底的に解説します。',
    icon: 'ri-road-map-line',
  },
  {
    slug: 'remote-work-jobs-2026',
    title: '2026年最新｜リモートワーク求人の探し方と注意点',
    category: '求人情報',
    date: '2026-03-15',
    readTime: '5分',
    excerpt: 'リモートOKの求人は増えているけど、全員がリモートできるわけではない。正しい見極め方と狙い目の職種をご紹介。',
    icon: 'ri-home-office-line',
  },
  {
    slug: 'why-people-change-jobs',
    title: '20代・30代が転職する本当の理由｜満足度調査から見えた現実',
    category: 'キャリア設計',
    date: '2026-03-08',
    readTime: '6分',
    excerpt: '「給料が低い」「職場の人間関係」だけじゃない。転職理由のリアルと、転職後の満足度データを公開します。',
    icon: 'ri-bar-chart-line',
  },
];

const categories = ['すべて', '書類対策', '面接対策', 'キャリア設計', '未経験転職', '求人情報'];

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* ヒーロー */}
      <section className="bg-[#1A2B3C] pt-36 pb-24 text-center text-white">
        <p className="text-[#21cb4d] font-bold tracking-widest mb-4 text-sm uppercase">Blog</p>
        <h1 className="text-4xl lg:text-6xl font-black mb-6">転職ノウハウブログ</h1>
        <p className="text-white/70 text-xl max-w-2xl mx-auto">
          キャリア設計のヒントから面接対策まで、役立つ情報をお届けします。
        </p>
      </section>

      {/* カテゴリフィルター（表示のみ） */}
      <section className="sticky top-20 z-30 bg-white border-b border-gray-100 shadow-sm">
        <div className="container mx-auto px-6 lg:px-16">
          <div className="flex gap-2 overflow-x-auto py-4 scrollbar-hide">
            {categories.map((cat, i) => (
              <span
                key={cat}
                className={`flex-shrink-0 px-5 py-2 rounded-full text-sm font-bold cursor-default ${
                  i === 0
                    ? 'bg-[#1A2B3C] text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {cat}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 記事一覧 */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6 lg:px-16 max-w-5xl">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden border border-gray-100"
              >
                {/* アイコンバナー */}
                <div className="bg-gradient-to-br from-[#1A2B3C] to-[#1A2B3C]/80 h-40 flex items-center justify-center">
                  <i className={`${post.icon} text-5xl text-[#21cb4d]`} />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-xs font-bold text-[#21cb4d] bg-[#21cb4d]/10 px-3 py-1 rounded-full">
                      {post.category}
                    </span>
                    <span className="text-xs text-gray-400">{post.readTime}で読める</span>
                  </div>
                  <h2 className="font-black text-[#1A2B3C] text-base leading-snug mb-3 group-hover:text-[#21cb4d] transition-colors duration-300 line-clamp-3">
                    {post.title}
                  </h2>
                  <p className="text-gray-500 text-sm leading-relaxed line-clamp-2">{post.excerpt}</p>
                  <div className="mt-4 flex items-center justify-between">
                    <time className="text-xs text-gray-400">{post.date}</time>
                    <span className="text-[#21cb4d] text-sm font-bold group-hover:translate-x-1 transition-transform duration-300">
                      読む →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gray-50 text-center">
        <p className="text-gray-600 mb-6">転職について直接相談したい方は</p>
        <Link
          href="/line"
          className="inline-flex items-center gap-3 bg-[#21cb4d] text-white px-10 py-5 rounded-full text-lg font-bold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
        >
          <i className="ri-line-fill text-2xl" />
          <span>LINEで無料相談する</span>
        </Link>
      </section>
    </main>
  );
}
