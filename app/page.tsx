import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">

      {/* ── Hero ── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#21cb4d]/3 via-white to-[#e3e148]/3" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-16 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-8 sm:mb-16 flex justify-center fade-init animate-fade-in">
              <img
                alt="はじてん"
                className="hidden lg:block h-14 w-auto"
                src="https://static.readdy.ai/image/2e885e528106c53d5ece4a5af2fa396f/5c27ad43effe230bd43810c25a0afe22.png"
                style={{ imageRendering: '-webkit-optimize-contrast' }}
              />
              <img
                alt="はじてん"
                className="lg:hidden h-24 sm:h-32 w-auto"
                src="https://static.readdy.ai/image/2e885e528106c53d5ece4a5af2fa396f/fb636e4242d512a8d0119db495585afe.png"
                style={{ imageRendering: '-webkit-optimize-contrast' }}
              />
            </div>
            <h1
              className="text-3xl sm:text-4xl lg:text-7xl font-black text-[#1A2B3C] mb-6 sm:mb-12 leading-tight tracking-wide fade-init animate-fade-in-up delay-300"
              style={{ fontFamily: '"Noto Sans JP", sans-serif', letterSpacing: '0.05em', lineHeight: 1.6 }}
            >
              <span className="inline sm:inline">はじめての転職を</span>
              <br className="hidden sm:block" />
              <span className="inline sm:inline">失敗させない</span>
            </h1>
            <p
              className="text-base sm:text-lg lg:text-2xl text-[#6B7280] mb-8 sm:mb-16 leading-relaxed fade-init animate-fade-in-up delay-500"
              style={{ lineHeight: 2, letterSpacing: '0.03em' }}
            >
              <span>求人紹介の前に、自己分析から始める</span>
              <br className="hidden sm:block" />
              <span>20代・30代のためのキャリア設計サービス</span>
            </p>
            <div className="fade-init animate-fade-in-up delay-700">
              <Link
                href="/line"
                className="button-hover group bg-gradient-to-r from-[#21cb4d] to-[#21cb4d]/90 hover:from-[#1A2B3C] hover:to-[#1A2B3C]/90 text-white px-8 sm:px-12 py-4 sm:py-5 rounded-full font-bold inline-flex items-center justify-center gap-2 sm:gap-3 whitespace-nowrap cursor-pointer shadow-md hover:shadow-xl text-sm sm:text-lg w-full sm:w-auto"
              >
                <i className="ri-line-fill text-xl sm:text-2xl" />
                <span>LINEで無料相談する</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── こんな悩み ── */}
      <section className="py-16 sm:py-32 bg-[#F8FFF9] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-[#e3e148]/10 to-transparent rounded-full blur-3xl" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-16 relative z-10">
          <div className="text-center mb-10 sm:mb-20">
            <div className="inline-block mb-6 sm:mb-8 scroll-fade">
              <span className="bg-[#1A2B3C] text-white px-6 sm:px-8 py-2 sm:py-3 rounded-full text-xs sm:text-sm font-bold shadow-lg">
                こんな悩み、ありませんか?
              </span>
            </div>
            <h2
              className="text-2xl sm:text-4xl lg:text-6xl font-black text-[#1A2B3C] leading-tight mb-6 scroll-fade"
              style={{ fontFamily: '"Noto Sans JP", sans-serif' }}
            >
              <span className="block sm:inline">転職したいけど</span>
              <br />
              <span className="bg-gradient-to-r from-[#21cb4d] to-[#e3e148] bg-clip-text text-transparent text-xl sm:text-3xl lg:text-5xl">
                何から始めればいいか<br className="sm:hidden" />わからない
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
            {[
              {
                icon: 'ri-question-line',
                color: 'from-[#21cb4d] to-[#21cb4d]/80',
                title: '自分に合う仕事が分からない',
                body: '今の仕事が本当に自分に合っているのか、どんなキャリアを目指すべきか分からない。',
              },
              {
                icon: 'ri-time-line',
                color: 'from-[#e3e148] to-[#e3e148]/80',
                title: '転職活動の時間がない',
                body: '仕事が忙しくて、求人を探したり、応募書類を作成する時間が取れない。',
              },
              {
                icon: 'ri-file-list-line',
                color: 'from-[#1A2B3C] to-[#1A2B3C]/80',
                title: '書類選考で落ちてしまう',
                body: '履歴書や職務経歴書の書き方が分からず、書類選考で不合格になってしまう。',
              },
              {
                icon: 'ri-chat-3-line',
                color: 'from-[#21cb4d] to-[#e3e148]',
                title: '面接に自信がない',
                body: '面接で何を話せばいいか分からず、自分の強みをうまく伝えられない。',
              },
            ].map((item) => (
              <div
                key={item.title}
                className="card-hover scroll-fade bg-white p-6 sm:p-10 rounded-2xl sm:rounded-3xl shadow-lg cursor-pointer border-2 border-transparent hover:border-[#1A2B3C]/10"
              >
                <div className={`w-14 h-14 sm:w-20 sm:h-20 bg-gradient-to-br ${item.color} rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-8 shadow-lg`}>
                  <i className={`${item.icon} text-2xl sm:text-4xl text-white`} />
                </div>
                <h3 className="text-base sm:text-xl font-bold text-[#1A2B3C] mb-2 sm:mb-4">{item.title}</h3>
                <p className="text-sm sm:text-base text-[#6B7280] leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 選ばれる理由 ── */}
      <section className="py-16 sm:py-32 bg-white relative overflow-hidden">
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-br from-[#21cb4d]/10 to-transparent rounded-full blur-3xl" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-16 relative z-10">
          <div className="text-center mb-12 sm:mb-24 scroll-fade">
            <h2
              className="text-2xl sm:text-4xl lg:text-6xl font-black text-[#1A2B3C] mb-4 sm:mb-6"
              style={{ fontFamily: '"Noto Sans JP", sans-serif' }}
            >
              はじてんが<span className="bg-gradient-to-r from-[#21cb4d] to-[#e3e148] bg-clip-text text-transparent">選ばれる理由</span>
            </h2>
            <p className="text-sm sm:text-xl text-[#6B7280] font-bold">一般的な転職エージェントとの違い</p>
          </div>

          <div className="space-y-16 sm:space-y-40">
            {/* 01 */}
            <div className="grid lg:grid-cols-2 gap-8 sm:gap-16 items-center">
              <div className="order-2 lg:order-1 scroll-fade">
                <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl shadow-2xl">
                  <img alt="自己分析ツール" className="w-full h-auto" src="https://static.readdy.ai/image/2e885e528106c53d5ece4a5af2fa396f/c0b4a02bbb6b3884a0a957e2a9454b1f.png" />
                </div>
              </div>
              <div className="space-y-4 sm:space-y-8 order-1 lg:order-2 scroll-fade">
                <div className="flex items-center gap-4">
                  <div className="w-10 sm:w-16 h-1 bg-gradient-to-r from-[#21cb4d] to-[#e3e148]" />
                  <span className="text-[#1A2B3C] font-black text-lg sm:text-2xl">01</span>
                </div>
                <span className="text-[#21cb4d] font-black text-sm sm:text-lg">自己分析ファースト</span>
                <h3
                  className="text-2xl sm:text-4xl lg:text-5xl font-black text-[#1A2B3C] leading-tight"
                  style={{ fontFamily: '"Noto Sans JP", sans-serif' }}
                >
                  <span className="block sm:inline">あなたの「軸」を</span>
                  <br className="hidden sm:block" />
                  <span className="bg-gradient-to-r from-[#21cb4d] to-[#e3e148] bg-clip-text text-transparent">見つけることから</span>
                </h3>
                <p className="text-sm sm:text-lg text-[#6B7280] leading-relaxed">
                  はじてんでは、求人紹介の前に徹底的な自己分析を行います。あなたの価値観、強み、キャリアビジョンを明確にすることで、本当に合った仕事を見つけることができます。一般的なエージェントのように、ただ求人を紹介するのではなく、あなた自身を深く理解することから始めます。
                </p>
                <Link href="/why-hajiten" className="inline-flex items-center gap-3 text-[#1A2B3C] font-bold hover:gap-5 transition-all duration-300 cursor-pointer group text-sm sm:text-base">
                  詳しく見る<i className="ri-arrow-right-line text-lg sm:text-xl group-hover:translate-x-2 transition-transform duration-300" />
                </Link>
              </div>
            </div>

            {/* 02 */}
            <div className="grid lg:grid-cols-2 gap-8 sm:gap-16 items-center">
              <div className="space-y-4 sm:space-y-8 scroll-fade">
                <div className="flex items-center gap-4">
                  <div className="w-10 sm:w-16 h-1 bg-gradient-to-r from-[#e3e148] to-[#1A2B3C]" />
                  <span className="text-[#1A2B3C] font-black text-lg sm:text-2xl">02</span>
                </div>
                <span className="text-[#e3e148] font-black text-sm sm:text-lg">キャリア設計サポート</span>
                <h3
                  className="text-2xl sm:text-4xl lg:text-5xl font-black text-[#1A2B3C] leading-tight"
                  style={{ fontFamily: '"Noto Sans JP", sans-serif' }}
                >
                  <span className="block sm:inline">5年後、10年後の</span>
                  <br className="hidden sm:block" />
                  <span className="bg-gradient-to-r from-[#e3e148] to-[#1A2B3C] bg-clip-text text-transparent">未来を描く</span>
                </h3>
                <p className="text-sm sm:text-lg text-[#6B7280] leading-relaxed">
                  目先の転職だけでなく、5年後、10年後のキャリアプランを一緒に考えます。年収アップ、スキルアップ、ワークライフバランスなど、あなたが大切にしたい価値観に基づいて、長期的なキャリア戦略を設計します。
                </p>
                <Link href="/why-hajiten" className="inline-flex items-center gap-3 text-[#1A2B3C] font-bold hover:gap-5 transition-all duration-300 cursor-pointer group text-sm sm:text-base">
                  詳しく見る<i className="ri-arrow-right-line text-lg sm:text-xl group-hover:translate-x-2 transition-transform duration-300" />
                </Link>
              </div>
              <div className="scroll-fade">
                <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl shadow-2xl">
                  <img alt="キャリア設計サポート" className="w-full h-auto" src="https://static.readdy.ai/image/2e885e528106c53d5ece4a5af2fa396f/e64ea0642d37eff632f8d91fc60bf8b1.png" />
                </div>
              </div>
            </div>

            {/* 03 */}
            <div className="grid lg:grid-cols-2 gap-8 sm:gap-16 items-center">
              <div className="order-2 lg:order-1 scroll-fade">
                <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl shadow-2xl">
                  <img alt="転職後サポート" className="w-full h-auto" src="https://static.readdy.ai/image/2e885e528106c53d5ece4a5af2fa396f/b73c7af1eaae90410458cbebf4e017f0.png" />
                </div>
              </div>
              <div className="space-y-4 sm:space-y-8 order-1 lg:order-2 scroll-fade">
                <div className="flex items-center gap-4">
                  <div className="w-10 sm:w-16 h-1 bg-gradient-to-r from-[#1A2B3C] to-[#21cb4d]" />
                  <span className="text-[#1A2B3C] font-black text-lg sm:text-2xl">03</span>
                </div>
                <span className="text-[#1A2B3C] font-black text-sm sm:text-lg">転職後もサポート</span>
                <h3
                  className="text-2xl sm:text-4xl lg:text-5xl font-black text-[#1A2B3C] leading-tight"
                  style={{ fontFamily: '"Noto Sans JP", sans-serif' }}
                >
                  <span className="block sm:inline">入社後も</span>
                  <br className="hidden sm:block" />
                  <span className="bg-gradient-to-r from-[#1A2B3C] to-[#21cb4d] bg-clip-text text-transparent">あなたを見守ります</span>
                </h3>
                <p className="text-sm sm:text-lg text-[#6B7280] leading-relaxed">
                  転職は、入社がゴールではありません。新しい環境での不安や悩みにも寄り添い、入社後3ヶ月間のフォローアップを行います。定着率96%の実績は、このサポート体制があるからこそです。
                </p>
                <Link href="/why-hajiten" className="inline-flex items-center gap-3 text-[#1A2B3C] font-bold hover:gap-5 transition-all duration-300 cursor-pointer group text-sm sm:text-base">
                  詳しく見る<i className="ri-arrow-right-line text-lg sm:text-xl group-hover:translate-x-2 transition-transform duration-300" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── スタート地点が違う ── */}
      <section className="py-20 sm:py-32 lg:py-40 bg-gradient-to-br from-[#F8F9FA] to-[#F1F3F5]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-16">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16 sm:mb-24 scroll-fade">
              <div className="inline-block mb-6 sm:mb-8">
                <span className="bg-[#1A2B3C] text-white px-8 sm:px-10 py-3 sm:py-4 rounded-full text-xs sm:text-sm font-bold tracking-widest shadow-lg">
                  DIFFERENCE
                </span>
              </div>
              <h2
                className="text-3xl sm:text-5xl lg:text-7xl font-black text-[#1A2B3C] leading-tight mb-4"
                style={{ fontFamily: '"Noto Sans JP", sans-serif' }}
              >
                スタート地点が違う
              </h2>
              <p className="text-base sm:text-xl text-[#6B7280] font-bold">だから、ゴールも変わる</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 sm:gap-12 lg:gap-16">
              {/* 一般的 */}
              <div className="scroll-fade bg-[#f5f5f5] p-8 sm:p-12 lg:p-16 rounded-3xl shadow-lg">
                <div className="flex justify-center mb-8">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white rounded-2xl flex items-center justify-center shadow-md">
                    <i className="ri-building-line text-3xl sm:text-4xl text-[#999]" />
                  </div>
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-[#666] mb-12 text-center">一般的な転職サービス</h3>
                <div className="space-y-6">
                  {['求人', '応募', '内定'].map((step, i) => (
                    <div key={step}>
                      <div className="flex flex-col items-center">
                        <div className="w-11 h-11 sm:w-12 sm:h-12 bg-[#ccc] rounded-full flex items-center justify-center shadow-sm">
                          <span className="font-black text-white text-lg sm:text-xl">{i + 1}</span>
                        </div>
                        <div className="text-lg sm:text-xl text-[#666] font-bold mt-4 text-center">{step}</div>
                      </div>
                      {i < 2 && <div className="flex justify-center mt-4"><i className="ri-arrow-down-line text-2xl text-[#ccc]" /></div>}
                    </div>
                  ))}
                </div>
                <div className="mt-12 pt-8 border-t-2 border-[#ddd] text-center">
                  <p className="text-[#999] font-bold text-lg sm:text-xl">内定がゴール</p>
                </div>
              </div>

              {/* はじてん */}
              <div className="scroll-fade bg-gradient-to-br from-[#1A2B3C] to-[#2C3E50] p-8 sm:p-12 lg:p-16 rounded-3xl shadow-2xl transform hover:scale-105 transition-all duration-500">
                <div className="flex justify-center mb-8">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-lg">
                    <img
                      alt="はじてん"
                      className="w-12 h-12 sm:w-16 sm:h-16 object-contain"
                      src="https://static.readdy.ai/image/2e885e528106c53d5ece4a5af2fa396f/fb636e4242d512a8d0119db495585afe.png"
                    />
                  </div>
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-white mb-12 text-center">はじてん</h3>
                <div className="space-y-6">
                  {['自己理解', '設計', '選択', '成長'].map((step, i) => (
                    <div key={step}>
                      <div className="flex flex-col items-center">
                        <div className="w-11 h-11 sm:w-12 sm:h-12 bg-[#21cb4d] rounded-full flex items-center justify-center shadow-lg">
                          <span className="font-black text-white text-lg sm:text-xl">{i + 1}</span>
                        </div>
                        <div className="text-lg sm:text-xl text-white font-bold mt-4 text-center">{step}</div>
                      </div>
                      {i < 3 && <div className="flex justify-center mt-4"><i className="ri-arrow-down-line text-2xl text-[#21cb4d]" /></div>}
                    </div>
                  ))}
                </div>
                <div className="mt-12 pt-8 border-t-2 border-white/20 text-center">
                  <p className="text-white font-bold text-lg sm:text-xl">成長し続けることがゴール</p>
                </div>
              </div>
            </div>

            <div className="text-center mt-12 sm:mt-16 scroll-fade">
              <div className="inline-flex items-center gap-3 sm:gap-4 bg-[#1A2B3C] text-white px-8 sm:px-12 py-5 sm:py-6 rounded-full shadow-xl">
                <span className="text-lg sm:text-2xl font-bold">スタートが違えば、ゴールも変わる</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 5ステップ ── */}
      <section className="py-16 sm:py-32 bg-gradient-to-br from-[#1A2B3C] via-[#1A2B3C]/95 to-[#1A2B3C] text-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-br from-[#21cb4d]/20 to-transparent rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-br from-[#e3e148]/20 to-transparent rounded-full blur-3xl" />
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-16 relative z-10">
          <div className="text-center mb-12 sm:mb-24 scroll-fade">
            <h2
              className="text-2xl sm:text-4xl lg:text-6xl font-black mb-4 sm:mb-6"
              style={{ fontFamily: '"Noto Sans JP", sans-serif' }}
            >
              <span className="block sm:inline">5ステップで</span>
              <span className="bg-gradient-to-r from-[#21cb4d] to-[#e3e148] bg-clip-text text-transparent">理想のキャリアへ</span>
            </h2>
            <p className="text-sm sm:text-xl text-white/80 font-bold">初回相談から内定まで、平均45日</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 sm:gap-6 mb-12 sm:mb-20">
            {[
              { num: '01', icon: 'ri-chat-smile-3-line', color: 'from-[#21cb4d] to-[#21cb4d]/80', title: 'LINE相談', body: 'まずは気軽にLINEで相談。あなたの状況をお聞かせください。' },
              { num: '02', icon: 'ri-search-eye-line', color: 'from-[#e3e148] to-[#e3e148]/80', title: '自己分析', body: '専門ツールを使って、あなたの強みや価値観を明確にします。' },
              { num: '03', icon: 'ri-road-map-line', color: 'from-[#21cb4d] to-[#e3e148]', title: 'キャリア設計', body: '5年後、10年後のキャリアプランを一緒に描きます。' },
              { num: '04', icon: 'ri-file-text-line', color: 'from-[#e3e148] to-[#21cb4d]', title: '求人紹介・応募', body: 'あなたに合った求人を厳選してご紹介。書類作成もサポート。' },
              { num: '05', icon: 'ri-trophy-line', color: 'from-[#21cb4d] to-[#e3e148]', title: '面接・内定', body: '面接対策から条件交渉まで、内定獲得を全力サポート。' },
            ].map((step, i) => (
              <div key={step.num} className="relative group">
                <div className="card-hover scroll-fade bg-white/10 backdrop-blur-sm p-6 sm:p-8 rounded-2xl sm:rounded-3xl h-full border-2 border-white/10 hover:border-white/30">
                  <div className={`w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br ${step.color} rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-6`}>
                    <i className={`${step.icon} text-2xl sm:text-3xl text-white`} />
                  </div>
                  <div className="text-3xl sm:text-5xl font-black text-[#e3e148] mb-2 sm:mb-4">{step.num}</div>
                  <h3 className="text-base sm:text-xl font-bold mb-2 sm:mb-4">{step.title}</h3>
                  <p className="text-white/80 text-xs sm:text-sm leading-relaxed">{step.body}</p>
                </div>
                {i < 4 && (
                  <div className="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2 z-10">
                    <i className="ri-arrow-right-line text-3xl text-[#e3e148]/50" />
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="text-center scroll-fade">
            <Link
              href="#line-consultation"
              className="button-hover group inline-flex items-center gap-2 sm:gap-4 bg-gradient-to-r from-[#21cb4d] to-[#e3e148] text-[#1A2B3C] px-6 sm:px-14 py-4 sm:py-6 rounded-full text-sm sm:text-xl font-bold shadow-2xl whitespace-nowrap cursor-pointer relative overflow-hidden w-full sm:w-auto justify-center"
            >
              <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-500" />
              <span className="relative z-10">無料でキャリア診断を受ける</span>
              <i className="ri-arrow-right-up-line text-lg sm:text-2xl relative z-10 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── 数字で見る ── */}
      <section className="py-16 sm:py-32 bg-gradient-to-br from-[#F8FFF9] to-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-[#e3e148]/10 to-transparent rounded-full blur-3xl" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-16 relative z-10">
          <div className="text-center mb-10 sm:mb-16 scroll-fade">
            <div className="inline-block mb-4 sm:mb-6">
              <span className="bg-[#1A2B3C] text-white px-6 sm:px-8 py-2 sm:py-3 rounded-full text-xs sm:text-sm font-bold shadow-lg tracking-widest">
                NUMBERS
              </span>
            </div>
            <h2
              className="text-2xl sm:text-4xl lg:text-6xl font-black text-[#1A2B3C] leading-tight"
              style={{ fontFamily: '"Noto Sans JP", sans-serif' }}
            >
              数字で見る<span className="bg-gradient-to-r from-[#21cb4d] to-[#e3e148] bg-clip-text text-transparent">はじてん</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6">
            {[
              { icon: 'ri-group-line', color: 'from-[#21cb4d] to-[#16a34a]', num: '645', unit: '名以上', title: '累計サポート人数', body: 'これまでに645名以上のキャリア設計をサポートしてきました。' },
              { icon: 'ri-heart-line', color: 'from-[#e3e148] to-[#ca8a04]', num: '約90', unit: '%', title: '紹介率', body: '利用者の約90%が知人・友人にはじてんを紹介しています。' },
              { icon: 'ri-line-chart-line', color: 'from-[#21cb4d] to-[#e3e148]', num: '約60', unit: '%', title: '年収アップ実績', body: '転職後に年収アップを実現した方が約60%にのぼります。' },
              { icon: 'ri-calendar-check-line', color: 'from-[#1A2B3C] to-[#374151]', num: '約3', unit: 'ヶ月', title: '平均サポート期間', body: '自己理解から内定まで、平均約3ヶ月で転職を実現しています。' },
              { icon: 'ri-seedling-line', color: 'from-[#21cb4d] to-[#16a34a]', num: '多数', unit: '', title: '未経験転職実績', body: '未経験からの職種・業界転換を多数サポートしてきました。' },
            ].map((stat) => (
              <div
                key={stat.title}
                className="scroll-fade bg-white rounded-2xl sm:rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 p-6 sm:p-8 border-2 border-transparent hover:border-[#21cb4d]/20 flex flex-col items-center text-center"
              >
                <div className={`w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br ${stat.color} rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-5 shadow-md`}>
                  <i className={`${stat.icon} text-xl sm:text-2xl text-white`} />
                </div>
                <div className="mb-2 sm:mb-3">
                  <span className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#1A2B3C]" style={{ fontFamily: '"Noto Sans JP", sans-serif' }}>
                    {stat.num}
                  </span>
                  {stat.unit && <span className="text-base sm:text-lg font-black text-[#21cb4d] ml-1">{stat.unit}</span>}
                </div>
                <h3 className="text-sm sm:text-base font-black text-[#1A2B3C] mb-2 sm:mb-3">{stat.title}</h3>
                <p className="text-xs sm:text-sm text-[#6B7280] leading-relaxed">{stat.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 利用者の声 ── */}
      <section className="py-16 sm:py-32 bg-white relative overflow-hidden">
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-br from-[#21cb4d]/10 to-transparent rounded-full blur-3xl" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-16 relative z-10">
          <div className="text-center mb-10 sm:mb-20 scroll-fade">
            <h2
              className="text-2xl sm:text-4xl lg:text-6xl font-black text-[#1A2B3C] mb-4 sm:mb-6"
              style={{ fontFamily: '"Noto Sans JP", sans-serif' }}
            >
              <span className="bg-gradient-to-r from-[#21cb4d] to-[#e3e148] bg-clip-text text-transparent">利用者の声</span>
            </h2>
            <p className="text-sm sm:text-xl text-[#6B7280] font-bold">はじてんで転職を成功させた方々の体験談</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: 'ri-user-line',
                color: 'from-[#21cb4d] to-[#21cb4d]/80',
                name: 'Mさん',
                attr: '20代男性・SE',
                body: '職務経歴書や履歴書の添削、面接練習、面接前後のフォロー、内定後のアフターフォロー、全てにおいてこんなにも真摯に向き合って頂けるのかと感動を覚えています。何でも迅速に相談できる体制が心の支えでした。理想通りの職場に出会えたことも、FIVEの転職ハンターの方々のおかげです。',
              },
              {
                icon: 'ri-user-3-line',
                color: 'from-[#e3e148] to-[#e3e148]/80',
                name: 'Aさん',
                attr: '40代女性・医療事務',
                body: '最初の聞き取りからとても丁寧で、就職においての優先順位(給与面や条件等)を一緒に考えていただきました。面接に入るまでの履歴書や職務経歴書の添削にて今まで気づけなかった自分自身のアピールポイントに気づかせていただきました。就職が決まる際の企業側の交渉や決まってからのフォローも丁寧でした。',
              },
              {
                icon: 'ri-user-line',
                color: 'from-[#1A2B3C] to-[#1A2B3C]/80',
                name: 'Iさん',
                attr: '30代男性・経理事務',
                body: 'スキルを付けるために転職活動を始め、友人が転職エージェントとして転職ハンターをしている事からサポートを依頼しました。転職活動が長くなってしまいましたが、案件を送り続けていただき、さらに模擬面接は、企業の案件に対して、適切にフォローを行ってくれた事で自信をつけて本番の面接に臨むことができました。',
              },
              {
                icon: 'ri-user-3-line',
                color: 'from-[#21cb4d] to-[#e3e148]',
                name: 'Oさん',
                attr: '20代女性・建築業事務',
                body: '初めての転職で不安が多い中、エージェントの方がLINEや電話でこまめにサポートしてくださり、短期間で4社から内定を獲得できました。働き方を見直すための職種変更にも柔軟に対応していただき、書類添削や面接対策も的確。希望に沿った求人提案や遅い時間の面談対応など、丁寧で寄り添ったサポートが印象的でした。',
              },
            ].map((v) => (
              <div key={v.name} className="card-hover scroll-fade cursor-pointer">
                <div className="bg-gradient-to-br from-[#1A2B3C] to-[#1A2B3C]/90 rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-lg border-2 border-[#1A2B3C]/10 hover:border-[#21cb4d]/30 transition-all duration-300">
                  <div className="flex items-center gap-4 mb-6">
                    <div className={`w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br ${v.color} rounded-full flex items-center justify-center flex-shrink-0`}>
                      <i className={`${v.icon} text-2xl sm:text-3xl text-white`} />
                    </div>
                    <div>
                      <div className="text-white font-bold text-base sm:text-lg">{v.name}</div>
                      <div className="text-[#e3e148] text-xs sm:text-sm font-bold">{v.attr}</div>
                    </div>
                  </div>
                  <div className="relative">
                    <div className="text-3xl sm:text-4xl text-[#e3e148]/30 font-sans absolute -top-2 -left-1">&quot;</div>
                    <p className="text-white/90 leading-relaxed pl-6 text-sm sm:text-base">{v.body}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section id="line-consultation" className="relative py-20 sm:py-40 overflow-hidden bg-gradient-to-br from-[#F8FFF9] via-white to-[#F8FFF9]">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-br from-[#21cb4d]/20 to-transparent rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-br from-[#e3e148]/20 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-16 relative z-10 text-center">
          <div className="scroll-fade">
            <h2
              className="text-3xl sm:text-5xl lg:text-7xl font-black text-[#1A2B3C] mb-6 sm:mb-8 tracking-wide leading-tight"
              style={{ fontFamily: '"Noto Sans JP", sans-serif' }}
            >
              <span className="block sm:inline">あなたのキャリア</span>
              <br className="hidden sm:block" />
              <span className="bg-gradient-to-r from-[#21cb4d] to-[#e3e148] bg-clip-text text-transparent">今日から変えよう</span>
            </h2>
            <p className="text-lg sm:text-2xl text-[#1A2B3C]/80 mb-2 sm:mb-4 font-bold">無料相談は、LINEで3分</p>
            <p className="text-sm sm:text-xl text-[#6B7280] mb-10 sm:mb-16 font-bold">まずは気軽に、お話しませんか?</p>
            <Link
              href="/line"
              className="button-hover group inline-flex items-center gap-3 sm:gap-5 bg-gradient-to-r from-[#1A2B3C] to-[#1A2B3C]/90 text-white px-6 sm:px-14 py-5 sm:py-7 rounded-full text-base sm:text-xl font-bold shadow-2xl whitespace-nowrap cursor-pointer relative overflow-hidden w-full sm:w-auto justify-center"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-[#21cb4d] to-[#e3e148] opacity-0 group-hover:opacity-30 transition-opacity duration-500" />
              <span className="w-10 h-10 sm:w-14 sm:h-14 bg-gradient-to-br from-[#21cb4d] to-[#e3e148] rounded-full flex items-center justify-center relative z-10">
                <i className="ri-line-fill text-xl sm:text-3xl text-white" />
              </span>
              <span className="relative z-10">LINE無料相談を始める</span>
              <i className="ri-arrow-right-up-line text-lg sm:text-2xl relative z-10 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
