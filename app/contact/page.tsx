'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    type: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 本番ではAPI routeに送信する
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <main className="min-h-screen bg-white flex items-center justify-center pt-20">
        <div className="text-center max-w-md px-6">
          <div className="w-24 h-24 bg-[#21cb4d]/10 rounded-full flex items-center justify-center mx-auto mb-8">
            <i className="ri-check-line text-4xl text-[#21cb4d]" />
          </div>
          <h2 className="text-3xl font-black text-[#1A2B3C] mb-4">送信完了しました</h2>
          <p className="text-gray-600 leading-relaxed mb-8">
            お問い合わせありがとうございます。<br />
            営業日2日以内にご連絡いたします。
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-[#1A2B3C] text-white px-8 py-4 rounded-full font-bold hover:bg-[#1A2B3C]/90 transition-all duration-300 hover:scale-105"
          >
            <i className="ri-home-line" />
            トップページへ
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white">
      {/* ヒーロー */}
      <section className="bg-[#1A2B3C] pt-36 pb-24 text-center text-white">
        <p className="text-[#21cb4d] font-bold tracking-widest mb-4 text-sm uppercase">Contact</p>
        <h1 className="text-4xl lg:text-6xl font-black mb-6">お問い合わせ</h1>
        <p className="text-white/70 text-xl max-w-2xl mx-auto">
          お気軽にご連絡ください。<br />
          急ぎの場合は<Link href="/line" className="text-[#21cb4d] underline hover:no-underline">LINEでの相談</Link>がおすすめです。
        </p>
      </section>

      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 lg:px-16 max-w-2xl">

          {/* LINE誘導 */}
          <div className="bg-[#21cb4d]/10 rounded-2xl p-6 mb-12 flex items-center gap-4">
            <div className="w-12 h-12 bg-[#21cb4d] rounded-full flex items-center justify-center flex-shrink-0">
              <i className="ri-line-fill text-2xl text-white" />
            </div>
            <div>
              <p className="font-black text-[#1A2B3C]">LINEの方が素早く対応できます</p>
              <Link href="/line" className="text-[#21cb4d] text-sm font-bold hover:underline">
                LINEで無料相談する →
              </Link>
            </div>
          </div>

          {/* フォーム */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-[#1A2B3C] mb-2">
                お名前 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="山田 太郎"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-700 focus:outline-none focus:border-[#21cb4d] focus:ring-2 focus:ring-[#21cb4d]/20 transition-all duration-300"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-[#1A2B3C] mb-2">
                メールアドレス <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="example@email.com"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-700 focus:outline-none focus:border-[#21cb4d] focus:ring-2 focus:ring-[#21cb4d]/20 transition-all duration-300"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-[#1A2B3C] mb-2">電話番号（任意）</label>
              <input
                type="tel"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                placeholder="090-0000-0000"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-700 focus:outline-none focus:border-[#21cb4d] focus:ring-2 focus:ring-[#21cb4d]/20 transition-all duration-300"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-[#1A2B3C] mb-2">
                お問い合わせ種別 <span className="text-red-500">*</span>
              </label>
              <select
                required
                value={form.type}
                onChange={(e) => setForm({ ...form, type: e.target.value })}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-700 focus:outline-none focus:border-[#21cb4d] focus:ring-2 focus:ring-[#21cb4d]/20 transition-all duration-300 bg-white"
              >
                <option value="">選択してください</option>
                <option value="consultation">転職相談</option>
                <option value="job">求人について</option>
                <option value="company">企業からのお問い合わせ</option>
                <option value="other">その他</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-bold text-[#1A2B3C] mb-2">
                メッセージ <span className="text-red-500">*</span>
              </label>
              <textarea
                required
                rows={6}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder="ご相談内容をご記入ください。"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-700 focus:outline-none focus:border-[#21cb4d] focus:ring-2 focus:ring-[#21cb4d]/20 transition-all duration-300 resize-none"
              />
            </div>

            <p className="text-gray-500 text-sm">
              送信することで
              <Link href="/privacy" className="text-[#21cb4d] underline mx-1">プライバシーポリシー</Link>
              に同意したものとみなします。
            </p>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-[#1A2B3C] to-[#1A2B3C]/80 text-white py-5 rounded-xl text-lg font-bold hover:opacity-90 transition-all duration-300 hover:scale-[1.01] flex items-center justify-center gap-3"
            >
              <i className="ri-mail-send-line text-xl" />
              送信する
            </button>
          </form>

          {/* 電話番号 */}
          <div className="mt-12 pt-8 border-t border-gray-200 text-center">
            <p className="text-gray-500 mb-3">お急ぎの方はお電話でも</p>
            <a href="tel:03-6666-8955" className="text-2xl font-black text-[#1A2B3C] hover:text-[#21cb4d] transition-colors duration-300 flex items-center justify-center gap-2">
              <i className="ri-phone-line text-[#21cb4d]" />
              03-6666-8955
            </a>
            <p className="text-gray-400 text-sm mt-2">受付時間：平日 9:00〜18:00</p>
          </div>
        </div>
      </section>
    </main>
  );
}
