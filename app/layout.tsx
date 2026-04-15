import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ScrollObserver from '@/components/ScrollObserver';

export const metadata: Metadata = {
  title: 'はじてん - はじめての転職を失敗させない',
  description: '求人紹介の前に、自己分析から始める20代・30代のためのキャリア設計サービス',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/remixicon@4.2.0/fonts/remixicon.css"
        />
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;700;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body style={{ fontFamily: '"Noto Sans JP", sans-serif' }}>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="pt-16 flex-grow">{children}</main>
          <Footer />
        </div>
        <ScrollObserver />
      </body>
    </html>
  );
}
