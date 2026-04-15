import Link from 'next/link';
import { notFound } from 'next/navigation';

// サンプルコンテンツ（本番ではCMS/MDXに差し替え可能）
const posts: Record<string, {
  title: string;
  category: string;
  date: string;
  readTime: string;
  icon: string;
  body: string[];
}> = {
  'how-to-write-resume': {
    title: '【完全版】はじめての職務経歴書の書き方｜採用担当者が見るポイントを解説',
    category: '書類対策',
    date: '2026-04-10',
    readTime: '8分',
    icon: 'ri-file-text-line',
    body: [
      '職務経歴書は転職活動の要です。採用担当者は1枚の書類から、あなたの経験・スキル・思考力を読み取ろうとしています。',
      '## 職務経歴書の基本構成',
      '職務経歴書には決まったフォーマットはありませんが、一般的には「職務要約」「職務経歴」「スキル・資格」「自己PR」の4つのパートで構成されます。',
      '## 採用担当者が最初に見るのは「職務要約」',
      '多くの採用担当者が最初に目を通すのは、書類の冒頭にある職務要約です。3〜5行で自分のキャリアを端的に表現しましょう。「何年間、何をやってきたか、何が得意か」を明確に書くことが重要です。',
      '## 数字で実績を示す',
      '「売上に貢献した」ではなく「月間売上を前年比120%に改善した」のように、具体的な数字を使うと説得力が増します。数字がない業務でも、担当件数・対応規模・工夫した点など、定量化できる要素を探しましょう。',
      '## まとめ',
      '職務経歴書は一度書いたら終わりではありません。応募する企業・職種に合わせて、強調するポイントを変えることが大切です。はじてんでは書類添削もサポートしていますので、お気軽にご相談ください。',
    ],
  },
  'interview-tips-for-beginners': {
    title: 'はじめての転職面接で緊張しない7つのコツ',
    category: '面接対策',
    date: '2026-04-05',
    readTime: '6分',
    icon: 'ri-user-voice-line',
    body: [
      'はじめての転職面接は誰でも緊張します。でも、緊張は「準備不足」と「想定外」から生まれます。この7つのコツで、緊張を最小限に抑えましょう。',
      '## 1. 企業研究を徹底する',
      '面接前に企業のHP・ニュース・SNSを調べておくことで、「何を聞かれるか」の見当がつきます。',
      '## 2. よく聞かれる質問を事前に準備する',
      '「志望動機」「自己PR」「転職理由」「強み・弱み」はほぼ確実に聞かれます。答えを丸暗記せず、ポイントだけ押さえておきましょう。',
      '## 3. 前日に持ち物・服装・ルートを確認する',
      '当日のドタバタが最大の敵です。前日に全て確認しておくと、当日の心の余裕が全然違います。',
      '## 4. 「完璧に答えなくていい」と思う',
      '面接は試験ではありません。採用担当者はあなたの人柄・思考力・会社との相性を見ています。',
      '## まとめ',
      '緊張は「真剣さの証明」です。少しの準備で、その緊張を自分の力に変えましょう。',
    ],
  },
};

export async function generateStaticParams() {
  return Object.keys(posts).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = posts[params.slug];
  if (!post) return {};
  return {
    title: `${post.title} | はじてんブログ`,
    description: post.body[0],
  };
}

export default function BlogDetailPage({ params }: { params: { slug: string } }) {
  const post = posts[params.slug];

  if (!post) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-white">
      {/* ヒーロー */}
      <section className="bg-[#1A2B3C] pt-36 pb-16">
        <div className="container mx-auto px-6 lg:px-16 max-w-3xl text-white">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-xs font-bold text-[#21cb4d] bg-[#21cb4d]/20 px-3 py-1 rounded-full">
              {post.category}
            </span>
            <time className="text-white/50 text-sm">{post.date}</time>
            <span className="text-white/50 text-sm">{post.readTime}で読める</span>
          </div>
          <h1 className="text-2xl lg:text-4xl font-black leading-tight mb-8">{post.title}</h1>
          <div className="w-full h-48 bg-white/5 rounded-2xl flex items-center justify-center">
            <i className={`${post.icon} text-6xl text-[#21cb4d]`} />
          </div>
        </div>
      </section>

      {/* 本文 */}
      <section className="py-16">
        <div className="container mx-auto px-6 lg:px-16 max-w-3xl">
          <article className="prose prose-lg max-w-none">
            {post.body.map((paragraph, i) => {
              if (paragraph.startsWith('## ')) {
                return (
                  <h2 key={i} className="text-2xl font-black text-[#1A2B3C] mt-12 mb-6 pb-3 border-b-2 border-[#21cb4d]">
                    {paragraph.replace('## ', '')}
                  </h2>
                );
              }
              return (
                <p key={i} className="text-gray-700 leading-relaxed text-lg mb-6">
                  {paragraph}
                </p>
              );
            })}
          </article>

          {/* シェア・ナビ */}
          <div className="mt-16 pt-8 border-t border-gray-200 flex flex-col sm:flex-row gap-4 justify-between items-center">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-gray-500 hover:text-[#1A2B3C] font-bold transition-colors duration-300"
            >
              <i className="ri-arrow-left-line" />
              ブログ一覧に戻る
            </Link>
            <Link
              href="/line"
              className="inline-flex items-center gap-3 bg-[#21cb4d] text-white px-8 py-4 rounded-full font-bold hover:bg-[#21cb4d]/90 transition-all duration-300 hover:scale-105"
            >
              <i className="ri-line-fill text-xl" />
              LINEで相談する
            </Link>
          </div>
        </div>
      </section>

      {/* 関連記事CTA */}
      <section className="py-16 bg-gray-50 text-center">
        <h2 className="text-2xl font-black text-[#1A2B3C] mb-4">転職の不安、一緒に解決しましょう</h2>
        <p className="text-gray-600 mb-8">無料・匿名OK。LINEで気軽にご相談ください。</p>
        <Link
          href="/line"
          className="inline-flex items-center gap-3 bg-gradient-to-r from-[#21cb4d] to-[#21cb4d]/90 text-white px-10 py-5 rounded-full text-lg font-bold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
        >
          <i className="ri-line-fill text-2xl" />
          <span>LINEで無料相談する</span>
          <i className="ri-arrow-right-line text-xl" />
        </Link>
      </section>
    </main>
  );
}
