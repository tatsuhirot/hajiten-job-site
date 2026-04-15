import Link from 'next/link';

export const metadata = {
  title: '利用規約 | はじてん',
  description: 'はじてんの利用規約です。本サービスをご利用になる前にご確認ください。',
};

const sections = [
  {
    title: '第1条（適用）',
    body: '本規約は、株式会社FIVE（以下「当社」）が提供する転職支援サービス「はじてん」（以下「本サービス」）の利用に関する条件を、本サービスを利用するすべてのユーザー（以下「ユーザー」）と当社との間で定めるものです。',
  },
  {
    title: '第2条（利用登録）',
    body: '本サービスの利用を希望する方は、当社の定める方法により登録を申請し、当社がこれを承認することで利用登録が完了します。当社は、以下の場合に利用登録を拒否することがあります。\n・虚偽の情報を提供した場合\n・過去に本規約に違反したことがある場合\n・その他当社が不適切と判断した場合',
  },
  {
    title: '第3条（禁止事項）',
    body: 'ユーザーは、本サービスの利用にあたり、以下の行為を行ってはなりません。\n・法令または公序良俗に違反する行為\n・虚偽の情報を提供する行為\n・当社または第三者の権利を侵害する行為\n・本サービスの運営を妨害する行為\n・営業目的での無断利用\n・その他当社が不適切と判断する行為',
  },
  {
    title: '第4条（サービスの変更・停止）',
    body: '当社は、ユーザーへの事前通知なく、本サービスの内容を変更し、または本サービスの提供を停止することがあります。これによりユーザーに生じた損害について、当社は責任を負いません。',
  },
  {
    title: '第5条（免責事項）',
    body: '当社は、本サービスを通じて提供される求人情報の正確性・完全性を保証しません。ユーザーが本サービスを利用したことにより生じた損害について、当社の故意または重大な過失による場合を除き、責任を負いません。',
  },
  {
    title: '第6条（個人情報の取り扱い）',
    body: '当社は、本サービスの利用によって取得したユーザーの個人情報を、当社のプライバシーポリシーに従い適切に管理・利用します。',
  },
  {
    title: '第7条（規約の変更）',
    body: '当社は、必要に応じて本規約を変更することがあります。変更後の規約は、本サービス上に掲示した時点から効力を生じるものとします。',
  },
  {
    title: '第8条（準拠法・裁判管轄）',
    body: '本規約の解釈にあたっては、日本法を準拠法とします。本サービスに関して生じた紛争については、東京地方裁判所を第一審の専属的合意管轄裁判所とします。',
  },
];

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* ヘッダー */}
      <section className="bg-[#1A2B3C] pt-36 pb-16 text-center text-white">
        <h1 className="text-4xl lg:text-5xl font-black mb-4">利用規約</h1>
        <p className="text-white/60">最終更新日：2026年4月15日</p>
      </section>

      {/* 本文 */}
      <section className="py-16">
        <div className="container mx-auto px-6 lg:px-16 max-w-3xl">
          <p className="text-gray-700 leading-relaxed mb-12 text-lg">
            本規約をよくお読みいただき、同意の上でご利用ください。本サービスを利用した時点で、本規約に同意したものとみなします。
          </p>

          <div className="space-y-10">
            {sections.map((section) => (
              <div key={section.title}>
                <h2 className="text-xl font-black text-[#1A2B3C] mb-4 pb-2 border-b-2 border-[#21cb4d]">
                  {section.title}
                </h2>
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {section.body}
                </p>
              </div>
            ))}
          </div>

          <p className="mt-12 text-gray-500 text-sm">
            制定日：2026年4月15日<br />
            株式会社FIVE
          </p>

          <div className="mt-8 pt-8 border-t border-gray-200 flex flex-col sm:flex-row gap-4">
            <Link
              href="/privacy"
              className="inline-flex items-center gap-2 bg-[#1A2B3C] text-white px-8 py-4 rounded-full font-bold hover:bg-[#1A2B3C]/90 transition-all duration-300 hover:scale-105"
            >
              <i className="ri-shield-check-line" />
              プライバシーポリシー
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 border-2 border-gray-200 text-gray-600 hover:border-[#1A2B3C] hover:text-[#1A2B3C] px-8 py-4 rounded-full font-bold transition-all duration-300"
            >
              <i className="ri-mail-line" />
              お問い合わせ
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
