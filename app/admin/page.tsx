'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';

export default function AdminPage() {
  const [token, setToken] = useState('');
  const [authed, setAuthed] = useState(false);
  const [authStatus, setAuthStatus] = useState<{ type: 'idle' | 'loading' | 'error'; message?: string }>({ type: 'idle' });
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<{ type: 'idle' | 'loading' | 'success' | 'error'; message?: string; count?: number }>({ type: 'idle' });
  const fileRef = useRef<HTMLInputElement>(null);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthStatus({ type: 'loading' });
    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token }),
      });
      const text = await res.text();
      let data: { success: boolean; error?: string };
      try {
        data = JSON.parse(text);
      } catch {
        setAuthStatus({ type: 'error', message: `サーバーエラー (${res.status})` });
        return;
      }
      if (data.success) {
        setAuthed(true);
        setAuthStatus({ type: 'idle' });
      } else {
        setAuthStatus({ type: 'error', message: data.error || '認証に失敗しました' });
      }
    } catch {
      setAuthStatus({ type: 'error', message: 'サーバーに接続できません。ページを再読み込みしてください。' });
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    setStatus({ type: 'loading' });
    const formData = new FormData();
    formData.append('token', token);
    formData.append('file', file);

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 60000); // 60秒タイムアウト

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
        signal: controller.signal,
      });
      clearTimeout(timeoutId);

      // レスポンスがJSONでない場合（HTMLエラーページなど）を安全に処理
      const text = await res.text();
      let data: { success: boolean; error?: string; count?: number };
      try {
        data = JSON.parse(text);
      } catch {
        setStatus({ type: 'error', message: `サーバーエラー (${res.status})。しばらく待ってから再度お試しください。` });
        return;
      }

      if (data.success) {
        setStatus({ type: 'success', count: data.count, message: `${data.count}件の求人を更新しました` });
        setFile(null);
        if (fileRef.current) fileRef.current.value = '';
      } else {
        setStatus({ type: 'error', message: data.error || 'アップロードに失敗しました' });
      }
    } catch (err) {
      if (err instanceof Error && err.name === 'AbortError') {
        setStatus({ type: 'error', message: 'タイムアウトしました。ファイルサイズを確認して再度お試しください。' });
      } else {
        setStatus({ type: 'error', message: 'サーバーに接続できません。インターネット接続を確認してください。' });
      }
    }
  };

  const isXlsx = file?.name.endsWith('.xlsx');

  return (
    <div className="min-h-screen bg-[#F8FFF9]">

      {/* ヘッダー */}
      <section className="bg-gradient-to-br from-[#1A2B3C] to-[#2C3E50] py-16 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-16 text-center">
          <div className="inline-block mb-4">
            <span className="bg-white/10 text-white px-8 py-3 rounded-full text-sm font-bold">ADMIN</span>
          </div>
          <h1
            className="text-3xl sm:text-5xl font-black text-white"
            style={{ fontFamily: '"Noto Sans JP", sans-serif' }}
          >
            管理画面
          </h1>
          <p className="text-white/70 mt-4">求人ファイルをアップロードして情報を更新します</p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-16 max-w-2xl">

          {!authed ? (
            /* トークン認証 */
            <div className="bg-white rounded-3xl shadow-xl p-8 sm:p-12">
              <div className="w-16 h-16 bg-gradient-to-br from-[#21cb4d] to-[#e3e148] rounded-2xl flex items-center justify-center mx-auto mb-8">
                <i className="ri-lock-line text-3xl text-white" />
              </div>
              <h2 className="text-2xl font-black text-[#1A2B3C] text-center mb-8">アクセストークンを入力</h2>
              <form onSubmit={handleAuth} className="space-y-4">
                <input
                  type="password"
                  value={token}
                  onChange={(e) => { setToken(e.target.value); setAuthStatus({ type: 'idle' }); }}
                  placeholder="管理者トークン"
                  className={`w-full border-2 rounded-xl px-4 py-4 text-[#1A2B3C] font-bold outline-none transition-colors ${
                    authStatus.type === 'error'
                      ? 'border-red-400 bg-red-50'
                      : 'border-[#e5e7eb] focus:border-[#21cb4d]'
                  }`}
                  required
                />
                {authStatus.type === 'error' && (
                  <div className="flex items-center gap-2 text-red-600 text-sm font-bold">
                    <i className="ri-error-warning-line text-base" />
                    {authStatus.message}
                  </div>
                )}
                <button
                  type="submit"
                  disabled={authStatus.type === 'loading'}
                  className="w-full bg-gradient-to-r from-[#1A2B3C] to-[#1A2B3C]/90 text-white py-4 rounded-full font-black text-lg shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {authStatus.type === 'loading' ? (
                    <span className="flex items-center justify-center gap-3">
                      <i className="ri-loader-4-line animate-spin" /> 確認中...
                    </span>
                  ) : '認証する'}
                </button>
              </form>
            </div>
          ) : (
            /* アップロード画面 */
            <div className="space-y-6">
              <div className="bg-white rounded-3xl shadow-xl p-8 sm:p-12">
                <h2 className="text-2xl font-black text-[#1A2B3C] mb-2 flex items-center gap-3">
                  <span className="w-8 h-8 bg-gradient-to-br from-[#21cb4d] to-[#e3e148] rounded-lg flex items-center justify-center">
                    <i className="ri-upload-cloud-line text-white text-sm" />
                  </span>
                  求人ファイルをアップロード
                </h2>
                <p className="text-[#6B7280] text-sm mb-8 ml-11">
                  クラウドエージェントからダウンロードした <strong className="text-[#1A2B3C]">XLSX（エクセル）ファイル</strong> をそのままアップロードできます。
                </p>

                <form onSubmit={handleUpload} className="space-y-6">
                  <div
                    className={`border-2 border-dashed rounded-2xl p-8 text-center transition-colors cursor-pointer ${
                      file
                        ? 'border-[#21cb4d] bg-[#F8FFF9]'
                        : 'border-[#21cb4d]/40 hover:border-[#21cb4d]'
                    }`}
                    onClick={() => fileRef.current?.click()}
                  >
                    <i className={`text-4xl mb-4 ${file ? 'ri-file-excel-2-line text-green-600' : 'ri-file-upload-line text-[#21cb4d]'}`} />
                    <p className="text-[#1A2B3C] font-bold mb-1">
                      {file ? file.name : 'ファイルをクリックして選択'}
                    </p>
                    {file ? (
                      <p className="text-[#6B7280] text-sm">
                        {isXlsx ? 'Excelファイル（自動変換されます）' : 'CSVファイル'}
                        　{(file.size / 1024).toFixed(0)} KB
                      </p>
                    ) : (
                      <p className="text-[#6B7280] text-sm">XLSX（エクセル）または CSV に対応</p>
                    )}
                    <input
                      ref={fileRef}
                      type="file"
                      accept=".xlsx,.csv"
                      className="hidden"
                      onChange={(e) => { setFile(e.target.files?.[0] || null); setStatus({ type: 'idle' }); }}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={!file || status.type === 'loading'}
                    className="w-full bg-gradient-to-r from-[#21cb4d] to-[#21cb4d]/90 text-white py-4 rounded-full font-black text-lg shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                  >
                    {status.type === 'loading' ? (
                      <span className="flex items-center justify-center gap-3">
                        <i className="ri-loader-4-line animate-spin" />
                        {isXlsx ? 'Excelを変換中...' : 'アップロード中...'}
                      </span>
                    ) : 'アップロードする'}
                  </button>
                </form>

                {status.type === 'success' && (
                  <div className="mt-6 p-4 bg-[#F8FFF9] border border-[#21cb4d]/30 rounded-xl flex items-center gap-3">
                    <i className="ri-checkbox-circle-line text-[#21cb4d] text-2xl flex-shrink-0" />
                    <div>
                      <p className="font-black text-[#1A2B3C]">{status.message}</p>
                      <p className="text-sm text-[#6B7280]">サイトに即時反映されました</p>
                    </div>
                  </div>
                )}

                {status.type === 'error' && (
                  <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3">
                    <i className="ri-error-warning-line text-red-500 text-2xl flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-red-700">{status.message}</p>
                      <p className="text-sm text-red-500 mt-1">問題が続く場合は管理者にお問い合わせください。</p>
                    </div>
                  </div>
                )}
              </div>

              {/* 手順ガイド */}
              <div className="bg-white rounded-3xl shadow-xl p-8 sm:p-12">
                <h3 className="text-lg font-black text-[#1A2B3C] mb-6 flex items-center gap-2">
                  <i className="ri-information-line text-[#21cb4d]" />
                  アップロード手順
                </h3>
                <ol className="space-y-4">
                  {[
                    { step: '1', text: 'クラウドエージェント管理画面で最新の求人リストをダウンロード（.xlsxファイル）' },
                    { step: '2', text: '上のエリアをクリックしてダウンロードしたファイルを選択' },
                    { step: '3', text: '「アップロードする」ボタンを押す' },
                    { step: '4', text: '「〇件の求人を更新しました」と表示されたら完了！' },
                  ].map(({ step, text }) => (
                    <li key={step} className="flex items-start gap-4">
                      <span className="w-7 h-7 bg-gradient-to-br from-[#21cb4d] to-[#e3e148] rounded-full flex items-center justify-center text-[#1A2B3C] font-black text-sm flex-shrink-0">
                        {step}
                      </span>
                      <p className="text-[#6B7280] pt-0.5">{text}</p>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="text-center">
                <Link href="/career-options" className="text-[#6B7280] hover:text-[#1A2B3C] font-bold transition-colors">
                  ← 求人一覧を確認する
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
