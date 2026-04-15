import Link from 'next/link';

export const metadata = {
  title: 'はじてんとは | はじてん',
  description: 'はじてんは、はじめての転職に寄り添うキャリア設計パートナーです。私たちのミッションと想いをご紹介します。',
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* ヒーロー */}
      <section className="bg-[#1A2B3C] pt-36 pb-24 text-center text-white">
        <p className="text-[#21cb4d] font-bold tracking-widest mb-4 text-sm uppercase">About</p>
        <h1 className="text-4xl lg:text-6xl font-black mb-6 leading-tight">
          はじてんとは
        </h1>
        <p className="text-white/70 text-xl max-w-2xl mx-auto leading-relaxed">
          キャリアは偶然じゃなく、設計できる。<br />
          そう信じる仲間たちが集まった転職支援サービスです。
        </p>
      </section>

      {/* ミッション */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 lg:px-16 max-w-4xl">
          <div className="text-center mb-16">
            <p className="text-[#21cb4d] font-bold tracking-widest mb-3 text-sm uppercase">Mission</p>
            <h2 className="text-3xl lg:text-4xl font-black text-[#1A2B3C]">私たちのミッション</h2>
          </div>
          <div className="bg-gradient-to-br from-[#1A2B3C] to-[#1A2B3C]/80 rounded-3xl p-12 text-white text-center">
            <p className="text-3xl lg:text-4xl font-black leading-tight mb-6">
              「はじめての転職」を<br />
              <span className="bg-gradient-to-r from-[#21cb4d] to-[#e3e148] bg-clip-text text-transparent">
                当たり前に成功させる
              </span>
            </p>
            <p className="text-white/80 text-lg leading-relaxed max-w-2xl mx-auto">
              転職は、人生の大きな決断です。でも、正しい情報と適切なサポートがあれば、誰でも理想のキャリアを手に入れられると私たちは信じています。
            </p>
          </div>
        </div>
      </section>

      {/* 特徴 */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-6 lg:px-16 max-w-5xl">
          <div className="text-center mb-16">
            <p className="text-[#21cb4d] font-bold tracking-widest mb-3 text-sm uppercase">Features</p>
            <h2 className="text-3xl lg:text-4xl font-black text-[#1A2B3C]">はじてんが選ばれる理由</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: 'ri-heart-line',
                title: '寄り添う支援',
                desc: 'はじめての転職は不安がいっぱい。一人ひとりのペースに合わせて、最後まで伴走します。',
              },
              {
                icon: 'ri-shield-check-line',
                title: '厳選された求人',
                desc: '働きやすさ・成長環境・待遇すべてで審査した求人のみをご紹介。ミスマッチゼロを目指します。',
              },
              {
                icon: 'ri-line-fill',
                title: 'LINEで気軽に相談',
                desc: 'メールや電話じゃなく、LINEで相談できる。気軽に、スキマ時間に、何度でも。',
              },
            ].map((item) => (
              <div key={item.title} className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-shadow duration-300">
                <div className="w-14 h-14 bg-[#21cb4d]/10 rounded-2xl flex items-center justify-center mb-6">
                  <i className={`${item.icon} text-2xl text-[#21cb4d]`} />
                </div>
                <h3 className="text-xl font-black text-[#1A2B3C] mb-3">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 会社情報 */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 lg:px-16 max-w-4xl">
          <div className="text-center mb-16">
            <p className="text-[#21cb4d] font-bold tracking-widest mb-3 text-sm uppercase">Company</p>
            <h2 className="text-3xl lg:text-4xl font-black text-[#1A2B3C]">会社情報</h2>
          </div>
          <div className="bg-gray-50 rounded-3xl overflow-hidden">
            {[
              { label: '会社名', value: '株式会社FIVE' },
              { label: '有料職業紹介許可番号', value: '13-ユー-310946' },
              { label: '所在地', value: '東京都中央区勝どき2-8-16 近富6階' },
              { label: '電話番号', value: '03-6666-8955' },
              { label: '営業時間', value: '9:00〜18:00（日曜・祝日定休）' },
            ].map((row, i) => (
              <div
                key={row.label}
                className={`flex flex-col sm:flex-row py-6 px-8 ${i !== 0 ? 'border-t border-gray-200' : ''}`}
              >
                <dt className="w-48 font-bold text-[#1A2B3C] flex-shrink-0 mb-2 sm:mb-0">{row.label}</dt>
                <dd className="text-gray-700">{row.value}</dd>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-[#1A2B3C] text-center text-white">
        <h2 className="text-3xl lg:text-4xl font-black mb-6">まずはLINEで気軽に相談</h2>
        <p className="text-white/70 text-lg mb-10">無料・匿名OK。返信は営業日24時間以内。</p>
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
