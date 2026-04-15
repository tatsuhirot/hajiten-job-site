import Link from 'next/link';

export const metadata = {
  title: 'プライバシーポリシー | はじてん',
  description: 'はじてんのプライバシーポリシーです。個人情報の取り扱いについてご確認ください。',
};

const sections = [
  {
    title: '1. 事業者情報',
    body: '株式会社FIVE（以下「当社」）は、はじてん（以下「本サービス」）を運営しています。\n所在地：東京都中央区勝どき2-8-16 近富6階\n電話：03-6666-8955',
  },
  {
    title: '2. 取得する個人情報',
    body: '当社は、本サービスの提供にあたり、以下の個人情報を取得することがあります。\n・氏名、生年月日、性別\n・住所、電話番号、メールアドレス\n・職歴、学歴、資格・スキルに関する情報\n・本サービスの利用状況に関する情報（アクセスログ等）',
  },
  {
    title: '3. 個人情報の利用目的',
    body: '取得した個人情報は、以下の目的で利用します。\n・転職支援サービスの提供\n・求人情報のご案内\n・お問い合わせへの対応\n・サービスの改善・新機能の開発\n・法令に基づく対応',
  },
  {
    title: '4. 第三者への提供',
    body: '当社は、法令に基づく場合または利用者の同意を得た場合を除き、個人情報を第三者に提供しません。ただし、求人企業への情報提供については、サービスの性質上、利用者の同意のもとで行います。',
  },
  {
    title: '5. 個人情報の管理',
    body: '当社は、個人情報の正確性・安全性を確保するために適切な安全管理措置を講じます。個人情報の漏洩・滅失・毀損の防止に努めます。',
  },
  {
    title: '6. Cookie・アクセス解析',
    body: '本サービスでは、Cookieおよびアクセス解析ツールを使用することがあります。これらはサービスの品質向上を目的としており、個人を特定する情報を含みません。ブラウザの設定によりCookieを無効にすることができますが、一部機能が利用できなくなる場合があります。',
  },
  {
    title: '7. 開示・訂正・削除の請求',
    body: 'ご自身の個人情報の開示・訂正・削除を希望される場合は、お問い合わせフォームまたは電話にてご連絡ください。本人確認後、合理的な範囲で対応いたします。',
  },
  {
    title: '8. プライバシーポリシーの変更',
    body: '当社は、必要に応じて本ポリシーを変更することがあります。重要な変更がある場合は、本サービス上でお知らせします。',
  },
  {
    title: '9. お問い合わせ窓口',
    body: '個人情報の取り扱いに関するお問い合わせは、下記までご連絡ください。\n株式会社FIVE プライバシー担当\nメール：お問い合わせフォームよりお送りください\n電話：03-6666-8955（平日9:00〜18:00）',
  },
];

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* ヘッダー */}
      <section className="bg-[#1A2B3C] pt-36 pb-16 text-center text-white">
        <h1 className="text-4xl lg:text-5xl font-black mb-4">プライバシーポリシー</h1>
        <p className="text-white/60">最終更新日：2026年4月15日</p>
      </section>

      {/* 本文 */}
      <section className="py-16">
        <div className="container mx-auto px-6 lg:px-16 max-w-3xl">
          <p className="text-gray-700 leading-relaxed mb-12 text-lg">
            株式会社FIVE（以下「当社」）は、個人情報保護の重要性を認識し、個人情報保護法その他関連法令を遵守しながら、お客様の個人情報を適切に取り扱うことをお約束します。
          </p>

          <div className="space-y-10">
            {sections.map((section) => (
              <div key={section.title}>
                <h2 className="text-xl font-black text-[#1A2B3C] mb-4 pb-2 border-b-2 border-[#21cb4d]">
                  {section.title}
                </h2>
                <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {section.body}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 pt-8 border-t border-gray-200 flex flex-col sm:flex-row gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-[#1A2B3C] text-white px-8 py-4 rounded-full font-bold hover:bg-[#1A2B3C]/90 transition-all duration-300 hover:scale-105"
            >
              <i className="ri-mail-line" />
              お問い合わせフォーム
            </Link>
            <Link
              href="/terms"
              className="inline-flex items-center gap-2 border-2 border-gray-200 text-gray-600 hover:border-[#1A2B3C] hover:text-[#1A2B3C] px-8 py-4 rounded-full font-bold transition-all duration-300"
            >
              <i className="ri-file-text-line" />
              利用規約を見る
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
