import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="relative bg-[#1A2B3C] text-white overflow-hidden">
      {/* 背景デコ */}
      <div className="absolute inset-0 overflow-hidden opacity-5">
        <div className="absolute top-10 right-10 w-32 h-32 border-4 border-white rounded-full" />
        <div className="absolute bottom-20 left-10 w-40 h-40">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <path d="M 10 90 L 30 70 L 50 50 L 70 30 L 90 10" stroke="white" strokeWidth="3" fill="none" />
            {[10, 30, 50, 70, 90].map((x, i) => (
              <circle key={i} cx={x} cy={90 - i * 20} r="4" fill="white" />
            ))}
          </svg>
        </div>
      </div>

      <div className="container mx-auto px-6 lg:px-16 relative z-10">
        {/* CTA */}
        <div className="py-20 text-center">
          <h2
            className="text-4xl lg:text-5xl font-black text-white mb-6 leading-tight"
            style={{ fontFamily: '"Noto Sans JP", sans-serif' }}
          >
            キャリアは偶然じゃなく<br className="hidden md:block" />
            <span className="bg-gradient-to-r from-[#21cb4d] to-[#e3e148] bg-clip-text text-transparent">
              設計できる
            </span>
          </h2>
          <p className="text-xl text-white/80 mb-12 leading-relaxed max-w-3xl mx-auto">
            はじてんははじめての転職に寄り添う<br />
            キャリア設計パートナーです
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link
              href="/line"
              className="group inline-flex items-center gap-3 bg-gradient-to-r from-[#21cb4d] to-[#21cb4d]/90 text-white px-10 py-5 rounded-full text-lg font-bold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 whitespace-nowrap"
            >
              <i className="ri-line-fill text-2xl" />
              <span>LINEで無料相談する</span>
              <i className="ri-arrow-right-line text-xl group-hover:translate-x-2 transition-transform duration-300" />
            </Link>
            <Link
              href="/career-options"
              className="group inline-flex items-center gap-3 bg-transparent border-2 border-white text-white hover:bg-white hover:text-[#1A2B3C] px-10 py-5 rounded-full text-lg font-bold transition-all duration-300 hover:scale-105 whitespace-nowrap"
            >
              <i className="ri-briefcase-line text-2xl" />
              <span>求人情報を見る</span>
              <i className="ri-arrow-right-line text-xl group-hover:translate-x-2 transition-transform duration-300" />
            </Link>
          </div>
        </div>

        <div className="border-t border-white/10" />

        {/* リンク */}
        <div className="py-16 grid md:grid-cols-2 lg:grid-cols-3 gap-12">
          <div>
            <h3 className="text-lg font-black mb-6">サイトマップ</h3>
            <ul className="space-y-4">
              {[
                { href: '/', label: 'トップページ' },
                { href: '/about', label: 'はじてんとは' },
                { href: '/career-options', label: '求人情報' },
                { href: '/story', label: '転職ストーリー' },
                { href: '/faq', label: 'よくある質問' },
                { href: '/blog', label: 'ブログ' },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-white/70 hover:text-[#21cb4d] transition-colors duration-300 text-base hover:underline"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-black mb-6">会社情報</h3>
            <ul className="space-y-3 text-white/70 text-base">
              <li className="flex items-start gap-2">
                <i className="ri-building-line text-[#21cb4d] flex-shrink-0 mt-1" />
                <span className="block font-bold text-white">株式会社FIVE</span>
              </li>
              <li className="flex items-start gap-2">
                <i className="ri-file-list-line text-[#21cb4d] flex-shrink-0 mt-1" />
                <div>
                  <span className="block">有料職業紹介許可番号</span>
                  <span className="block font-bold text-white">13-ユー-310946</span>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <i className="ri-map-pin-line text-[#21cb4d] flex-shrink-0 mt-1" />
                <span>東京都中央区勝どき2-8-16<br />近富6階</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-black mb-6">お問い合わせ</h3>
            <ul className="space-y-3 text-white/70 text-base">
              <li className="flex items-start gap-2">
                <i className="ri-phone-line text-[#21cb4d] flex-shrink-0 mt-1" />
                <a
                  href="tel:03-6666-8955"
                  className="hover:text-[#21cb4d] transition-colors duration-300 font-bold text-white"
                >
                  03-6666-8955
                </a>
              </li>
              <li className="flex items-start gap-2">
                <i className="ri-time-line text-[#21cb4d] flex-shrink-0 mt-1" />
                <div>
                  <span className="block">営業時間：9:00–18:00</span>
                  <span className="block">定休日：日曜・祝日</span>
                </div>
              </li>
            </ul>
            <Link
              href="/contact"
              className="mt-6 inline-flex items-center gap-2 bg-white/10 hover:bg-[#21cb4d] text-white px-6 py-3 rounded-full font-bold transition-all duration-300 hover:scale-105 whitespace-nowrap"
            >
              <i className="ri-mail-send-line text-lg" />
              <span>お問い合わせフォーム</span>
            </Link>
          </div>
        </div>

        <div className="border-t border-white/10" />

        <div className="py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-white/50 text-sm">© 2025 はじてん. All rights reserved.</p>
            <div className="flex flex-wrap gap-6 justify-center">
              <Link href="/privacy" className="text-white/70 hover:text-[#21cb4d] transition-colors duration-300 text-sm hover:underline">
                プライバシーポリシー
              </Link>
              <Link href="/terms" className="text-white/70 hover:text-[#21cb4d] transition-colors duration-300 text-sm hover:underline">
                利用規約
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
