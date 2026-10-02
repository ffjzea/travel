# 沖繩家族旅行 · 五天四夜行程網站

2026/10/05 – 10/09 沖繩家族旅行的行程網站。純靜態（SSG）Angular 應用，可離線瀏覽、部署到 Cloudflare Pages。

## 功能

**行程頁（`/`）**

- **每日一個 tab**（Day 1–5）＋ **✈️ 機場資訊** 與 **🌐 中英日對照** 兩個資訊 tab
- **依今天日期自動預設 tab**：旅程中打開會自動跳到當天，並顯示「今天」徽章
- **搭車資訊**：每天列出上下車位置、轉乘方式，附 Google Maps 導航連結
- **中英日對照表**：重要地點（住宿／交通／景點／餐廳／購物）三語對照，每列都有地圖連結，可直接拿給司機或店員看；另附實用短句
- **參考資訊**：交通比較、時刻表、票價、住宿、餐廳、出入境流程
- **原檔截圖**：7 張時刻表／地圖／站牌照片，點擊可放大
- **深層連結**：`?day=2`、`?day=airport`、`?day=places`

**行李清單頁（`/packing`）**

- 11 個分類、約 90 項的可打勾清單
- 進度條與各分類完成數
- 勾選狀態存在瀏覽器 `localStorage`，不會上傳
- 「手提 vs 託運」規定與沖繩特別提醒

兩頁都不依賴外部 CDN／字型，旅途中沒網路也能開。

## 路由

| 路徑 | 頁面 |
|---|---|
| `/` | 行程表（可用 `?day=1`～`?day=5`、`?day=airport`、`?day=places`） |
| `/packing` | 行李打包清單 |
| 其他 | 導回 `/` |

`public/_redirects` 已設定 SPA fallback（`/*  /index.html  200`），Cloudflare Pages 上直接開 `/packing` 不會 404。

## 目錄結構

```
src/app/trip-data.ts        ← 行程內容、日期、搭車資訊（改這裡就好）
src/app/places-data.ts      ← 中英日對照表（地點與短句）
src/app/packing-data.ts     ← 行李清單內容
src/app/app.routes.ts       ← 路由
src/app/pages/trip/         ← 行程頁
src/app/pages/packing/      ← 行李清單頁
src/styles.css              ← 樣式（設計 token 都在最上面）
public/images/              ← 時刻表／地圖截圖
public/_headers             ← Cloudflare Pages 快取設定
public/_redirects           ← SPA fallback
wrangler.jsonc              ← Cloudflare Pages 設定
PACKING.md                  ← 行李清單的純文字備忘錄版
```

## 修改行程

只改 `src/app/trip-data.ts`：

- `DAYS[].date` — ISO 日期（`YYYY-MM-DD`）。改完星期幾與「今天」標記會自動跟著變。
- `DAYS[].entries` — 當天時間軸
- `DAYS[].transit` — 當天的搭車資訊
- `DAYS[].refs` — 當天的參考資訊
- `AIRPORT_GUIDE` — 機場 tab 的內容

中英日對照表改 `src/app/places-data.ts`（`PLACE_GROUPS` 為地點、`PHRASES` 為短句）。

行李清單改 `src/app/packing-data.ts`。勾選狀態的 id 由「分類 + 品項名稱」組成，所以調換順序不會影響已勾選的項目。

## 本機開發

```bash
npm install
npm start          # ng serve → http://localhost:4200
```

## 版本需求（部署前請對齊）

| 項目 | 版本 | 說明 |
|---|---|---|
| Node.js | **22.18.0** | 見 `.node-version`。Angular 20 需要 `^20.19` / `^22.12` / `>=24` |
| Angular | 20.3.x | `@angular/core` 20.3.32、`@angular/cli` 20.3.37 |
| TypeScript | 5.9.3 | |
| wrangler | 4.142.0 | Cloudflare Pages CLI |

`package-lock.json` 已鎖定所有版本，CI 使用 `npm ci` 會裝到完全相同的版本。

> ⚠️ Node 版本若低於 22.12，Angular 20 的 CLI 會直接拒絕執行。Cloudflare Pages 請務必設定 `NODE_VERSION=22.18.0`（或讓它讀到 `.node-version`）。

## 部署到 Cloudflare Pages

建置輸出目錄固定為 **`dist/okinawa-trip/browser`**。

### 方式 A：Wrangler CLI 直接部署

```bash
npm run deploy     # ng build && wrangler pages deploy dist/okinawa-trip/browser
```

首次執行會開瀏覽器請你登入 Cloudflare 並授權。若在無瀏覽器的環境，改用 API Token：

```bash
$env:CLOUDFLARE_API_TOKEN = "<你的 token>"     # 需要 Cloudflare Pages:Edit 權限
npm run deploy
```

本機預覽正式建置結果：

```bash
npm run preview    # wrangler pages dev dist/okinawa-trip/browser
```

### 方式 B：Dashboard Git 整合（push 自動部署）

1. Cloudflare Dashboard → **Workers & Pages** → **Create** → **Pages** → **Connect to Git**
2. 選擇 repo：`ffjzea/travel`
3. 設定：

   | 欄位 | 值 |
   |---|---|
   | Production branch | `main` |
   | Framework preset | `None` |
   | Build command | `npm run build` |
   | Build output directory | `dist/okinawa-trip/browser` |
   | Root directory | *(留空)* |

4. **Settings → Environment variables** 新增：

   | 變數 | 值 |
   |---|---|
   | `NODE_VERSION` | `22.18.0` |

5. **Save and Deploy**。之後 `git push` 到 `main` 就會自動重新部署。

### 部署後檢查

- 開啟首頁 → 標題為「沖繩家族旅行 · 五天四夜行程」
- 切換到 **✈️ 機場** tab → 應顯示樓層導覽
- 網址加上 `?day=3` → 應直接開啟第三天
- 開啟 `/packing` → 應顯示行李清單（若 404 表示 `_redirects` 沒生效）
- 在行李清單勾選幾項後重新整理 → 勾選狀態應保留

## 常用指令

| 指令 | 說明 |
|---|---|
| `npm start` | 本機開發伺服器 |
| `npm run build` | 產生正式版到 `dist/okinawa-trip/browser` |
| `npm run preview` | 用 wrangler 本機預覽正式版 |
| `npm run deploy` | 建置並部署到 Cloudflare Pages |
