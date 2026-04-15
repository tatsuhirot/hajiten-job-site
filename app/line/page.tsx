import Link from 'next/link';

export const metadata = {
  title: 'LINEで無料相談 | はじてん',
  description: '転職の悩みをLINEで気軽に相談。完全無料・匿名OK。はじめての転職でも安心してご相談ください。',
};

const steps = [
  {
    num: '01',
    icon: 'ri-qr-code-line',
    title: 'QRコードを読み取る',
    desc: 'スマートフォンのカメラでQRコードを読み取るか、下のボタンからLINEを開いてください。',
  },
  {
    num: '02',
    icon: 'ri-chat-smile-3-line',
    title: '「相談したい」と送る',
    desc: '「転職相談したい」「求人を見たい」など、なんでも送ってください。担当者が丁寧に返信します。',
  },
  {
    num: '03',
    icon: 'ri-calendar-check-line',
    title: '面談日程を調整する',
    desc: 'オンライン・対面どちらも対応。あなたのスケジュールに合わせて柔軟に設定できます。',
  },
];

const faqs = [
  { q: '費用はかかりますか？', a: '完全無料です。企業からの紹介手数料で運営しているため、求職者の方に費用は一切かかりません。' },
  { q: '匿名で相談できますか？', a: 'はい。最初は匿名でも構いません。詳細なサポートに進む際に必要な情報をお伺いします。' },
  { q: '返信はいつ来ますか？', a: '営業日（平日9:00〜18:00）に順次対応します。24時間以内の返信を目標にしています。' },
  { q: '在職中でも相談できますか？', a: 'もちろんです。スキマ時間にLINEで相談できるのがはじてんの強みです。' },
];

export default function LinePage() {
  return (
    <main className="min-h-screen bg-white">
      {/* ヒーロー */}
      <section className="bg-[#1A2B3C] pt-36 pb-24 text-center text-white">
        <div className="w-20 h-20 bg-[#21cb4d] rounded-full flex items-center justify-center mx-auto mb-8">
          <i className="ri-line-fill text-4xl text-white" />
        </div>
        <p className="text-[#21cb4d] font-bold tracking-widest mb-4 text-sm uppercase">LINE相談</p>
        <h1 className="text-4xl lg:text-6xl font-black mb-6 leading-tight">
          LINEで気軽に<br />無料相談
        </h1>
        <p className="text-white/70 text-xl max-w-2xl mx-auto leading-relaxed">
          転職の悩み・求人の相談・キャリアの壁打ちなど、なんでもOK。<br />
          まずは気軽にメッセージを送ってみてください。
        </p>
      </section>

      {/* QRコード・CTA */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 lg:px-16 max-w-4xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* QRコードエリア */}
            <div className="text-center">
              <div className="w-56 h-56 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-6 border-2 border-dashed border-gray-300">
                <div className="text-center">
                  <i className="ri-qr-code-line text-6xl text-gray-300" />
                  <p className="text-gray-400 text-sm mt-2">QRコード</p>
                </div>
              </div>
              <p className="text-gray-500 text-sm">スマートフォンのカメラで読み取ってください</p>
            </div>

            {/* テキスト */}
            <div>
              <h2 className="text-3xl font-black text-[#1A2B3C] mb-6">
                転職の悩みを<br />
                <span className="text-[#21cb4d]">一緒に解決</span>しましょう
              </h2>
              <ul className="space-y-4 mb-8">
                {[
                  '完全無料・何度でも相談OK',
                  '匿名でも相談できる',
                  '営業日24時間以内に返信',
                  '在職中でも気軽に相談できる',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-gray-700">
                    <i className="ri-check-line text-[#21cb4d] text-xl flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <a
                href="https://line.me/R/ti/p/@hajiten"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-[#06C755] text-white px-10 py-5 rounded-full text-lg font-bold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:bg-[#06C755]/90"
              >
                <i className="ri-line-fill text-2xl" />
                <span>LINEで友達追加する</span>
                <i className="ri-external-link-line text-lg" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ステップ */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-6 lg:px-16 max-w-5xl">
          <div className="text-center mb-16">
            <p className="text-[#21cb4d] font-bold tracking-widest mb-3 text-sm uppercase">How to</p>
            <h2 className="text-3xl lg:text-4xl font-black text-[#1A2B3C]">相談の流れ</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step) => (
              <div key={step.num} className="text-center">
                <div className="text-6xl font-black text-[#21cb4d]/20 mb-4">{step.num}</div>
                <div className="w-16 h-16 bg-[#1A2B3C] rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <i className={`${step.icon} text-2xl text-[#21cb4d]`} />
                </div>
                <h3 className="text-xl font-black text-[#1A2B3C] mb-3">{step.title}</h3>
                <p className="text-gray-600 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 lg:px-16 max-w-3xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black text-[#1A2B3C]">よくある質問</h2>
          </div>
          <div className="space-y-6">
            {faqs.map((item) => (
              <div key={item.q} className="bg-gray-50 rounded-2xl p-6">
                <p className="font-black text-[#1A2B3C] mb-3 flex items-start gap-2">
                  <span className="text-[#21cb4d]">Q.</span> {item.q}
                </p>
                <p className="text-gray-600 pl-6">
                  <span className="text-[#21cb4d] font-bold mr-1">A.</span> {item.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 別の問い合わせ方法 */}
      <section className="py-12 bg-gray-50 text-center">
        <p className="text-gray-500 mb-4">LINEが難しい場合は</p>
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 text-[#1A2B3C] font-bold underline hover:text-[#21cb4d] transition-colors duration-300"
        >
          <i className="ri-mail-line" />
          お問い合わせフォームはこちら
        </Link>
      </section>
    </main>
  );
}
