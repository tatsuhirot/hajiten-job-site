'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navLinks = [
  { href: '/', label: 'ホーム' },
  { href: '/about', label: 'はじてんとは' },
  { href: '/story', label: '転職ストーリー' },
  { href: '/career-options', label: '求人情報' },
  { href: '/faq', label: 'Q&A' },
  { href: '/blog', label: 'ブログ' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isHome = pathname === '/';

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled || !isHome ? 'bg-[#1A2B3C] shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-6 lg:px-16">
        <div className="flex items-center justify-between h-20">
          {/* ロゴ */}
          <Link href="/" className="flex items-center cursor-pointer group">
            <img
              alt="はじてん"
              className="h-10 w-auto group-hover:scale-105 transition-all duration-300"
              src="https://static.readdy.ai/image/2e885e528106c53d5ece4a5af2fa396f/5c27ad43effe230bd43810c25a0afe22.png"
              style={{ imageRendering: '-webkit-optimize-contrast' }}
            />
          </Link>

          {/* デスクトップナビ */}
          <nav className="hidden lg:flex items-center gap-10">
            {navLinks.map(({ href, label }) => {
              const active = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  className={`font-bold transition-all duration-300 cursor-pointer relative group ${
                    active
                      ? 'text-white'
                      : 'text-white hover:text-[#e3e148]'
                  }`}
                >
                  {label}
                  {active && (
                    <span className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-[#21cb4d] to-[#e3e148] rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-4">
            <Link
              href="/line"
              className="hidden md:flex group bg-gradient-to-r from-[#1A2B3C] to-[#1A2B3C]/90 hover:from-[#1A2B3C]/90 hover:to-[#1A2B3C] text-white px-8 py-3 rounded-full font-bold transition-all duration-500 items-center gap-2 whitespace-nowrap cursor-pointer hover:-translate-y-1 hover:shadow-xl relative overflow-hidden"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-[#21cb4d] to-[#e3e148] opacity-0 group-hover:opacity-20 transition-opacity duration-500" />
              <i className="ri-line-fill text-xl relative z-10" />
              <span className="relative z-10">LINE無料相談</span>
            </Link>

            {/* モバイルメニューボタン */}
            <button
              className="lg:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5 cursor-pointer transition-all duration-300 text-white"
              aria-label="メニュー"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <span className={`block w-6 h-0.5 bg-current transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`block w-6 h-0.5 bg-current transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
              <span className={`block w-6 h-0.5 bg-current transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </button>
          </div>
        </div>
      </div>

      {/* モバイルメニュー */}
      {menuOpen && (
        <div className="lg:hidden bg-[#1A2B3C] border-t border-white/10">
          <nav className="container mx-auto px-6 py-6 flex flex-col gap-4">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="text-white font-bold text-lg hover:text-[#21cb4d] transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                {label}
              </Link>
            ))}
            <Link
              href="/line"
              className="mt-2 inline-flex items-center gap-2 bg-gradient-to-r from-[#21cb4d] to-[#21cb4d]/90 text-white px-6 py-3 rounded-full font-bold w-fit"
              onClick={() => setMenuOpen(false)}
            >
              <i className="ri-line-fill text-xl" />
              LINE無料相談
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
