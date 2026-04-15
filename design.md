---
author: claude
type: wiki
created: 2026-04-15
tags: [転職サイト, Next.js, Vercel, CSV, 設計]
source: ""
---

# 転職サイト 設計書

## 概要

求人データをCSVで管理し、非エンジニアが毎日更新できる転職ポートフォリオサイト。

---

## 確定スタック

| レイヤー | 技術 | 用途 |
|---|---|---|
| フレームワーク | Next.js 14 App Router | SSR / ISR / API Routes |
| スタイル | Tailwind CSS | UI構築 |
| CSVパース | papaparse | CSV → JSON変換 |
| ストレージ | Vercel Blob | CSVファイルの保存 |
| ホスティング | Vercel（無料枠） | デプロイ・配信 |
| 管理画面認証 | 環境変数トークン（シンプル） | アップロード保護 |

---

## 全体フロー

```
【更新フロー】
非エンジニアが管理画面にアクセス（/admin）
  → CSVファイルを選択してアップロード
  → Vercel Blob に上書き保存
  → revalidatePath() で即時反映
  → サイトが更新される（数秒以内）

【表示フロー】
ユーザーがサイトにアクセス
  → Next.js が Vercel Blob から CSV を取得
  → papaparse でパース → 求人一覧を表示
```

---

## CSVカラム設計

```csv
id,title,company,location,salary,type,tags,description,published,updated_at
job_001,フロントエンドエンジニア,株式会社〇〇,東京都渋谷区,400〜600万円,正社員,"React,TypeScript,リモート",業務内容...,TRUE,2026-04-15
```

| カラム | 型 | 説明 |
|---|---|---|
| id | string | 求人ID（一意） |
| title | string | 職種名 |
| company | string | 会社名 |
| location | string | 勤務地 |
| salary | string | 給与 |
| type | string | 正社員 / 契約社員 / 業務委託 |
| tags | string | カンマ区切り（React,TypeScript 等） |
| description | string | 業務内容（長文可） |
| published | boolean | TRUE のみ表示 |
| updated_at | date | 更新日 |

---

## ページ構成

```
/                   → 求人一覧（トップ）
/jobs/[id]          → 求人詳細
/admin              → CSV アップロード管理画面（認証付き）
```

---

## フォルダ構成

```
job-site/
├── app/
│   ├── page.tsx              ← 求人一覧
│   ├── jobs/
│   │   └── [id]/
│   │       └── page.tsx      ← 求人詳細
│   ├── admin/
│   │   └── page.tsx          ← CSV アップロード画面
│   └── api/
│       └── upload/
│           └── route.ts      ← CSV受信 → Blob保存 → revalidate
├── lib/
│   ├── fetchJobs.ts          ← Blob から CSV取得・パース
│   └── auth.ts               ← 管理画面の簡易認証
├── components/
│   ├── JobCard.tsx           ← 求人カード
│   ├── JobList.tsx           ← 一覧
│   └── UploadForm.tsx        ← CSVアップロードUI
├── public/
│   └── sample.csv            ← CSVテンプレート
└── .env.local
    BLOB_READ_WRITE_TOKEN=... ← Vercel Blob トークン
    ADMIN_TOKEN=...           ← 管理画面アクセストークン
```

---

## 管理画面仕様（/admin）

```
1. トークン入力 → 認証
2. 現在のCSV情報を表示（最終更新日・件数）
3. CSVファイル選択 → アップロードボタン
4. 完了 → 「〇件の求人を更新しました」
5. サンプルCSVダウンロードリンク
```

---

## API仕様（/api/upload）

```typescript
POST /api/upload
Content-Type: multipart/form-data

// リクエスト
{ file: File, token: string }

// レスポンス（成功）
{ success: true, count: 42, updatedAt: "2026-04-15T10:00:00Z" }

// レスポンス（エラー）
{ success: false, error: "Invalid token" }
```

処理フロー：
1. トークン検証
2. CSVバリデーション（必須カラム確認）
3. Vercel Blob に `jobs.csv` として上書き保存
4. `revalidatePath('/')` で即時反映

---

## 開発フェーズ

### Phase 1 ― データ層 + 一覧表示
- [ ] Next.js プロジェクト作成（`npx create-next-app`）
- [ ] Vercel Blob セットアップ
- [ ] `fetchJobs.ts` 実装（Blob → CSV → JSON）
- [ ] 求人一覧ページ（`/`）
- [ ] 求人詳細ページ（`/jobs/[id]`）

### Phase 2 ― 管理画面
- [ ] CSVアップロードAPI（`/api/upload`）
- [ ] 管理画面UI（`/admin`）
- [ ] バリデーション・エラーハンドリング
- [ ] サンプルCSVの作成

### Phase 3 ― UI仕上げ・デプロイ
- [ ] Tailwind でデザイン整備
- [ ] 検索・フィルター機能（タグ / 雇用形態 / 勤務地）
- [ ] Vercel にデプロイ
- [ ] 動作確認・非エンジニアへの操作説明

---

## コスト

| サービス | 費用 |
|---|---|
| Vercel（Hobby） | **無料** |
| Vercel Blob | **無料**（500MBまで） |
| ドメイン（任意） | 〜1,500円/年 |

---

## リスク・注意点

| リスク | 対策 |
|---|---|
| CSVフォーマットミス | バリデーションで弾く＋サンプルCSV提供 |
| 管理画面への不正アクセス | トークン認証（将来的にNextAuth移行可） |
| Blob容量超過 | 求人数が数万件でも数MB以下なので現実的に問題なし |
