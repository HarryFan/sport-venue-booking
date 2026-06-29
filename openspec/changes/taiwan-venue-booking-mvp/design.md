## Context

本專案為求職作品集，目標展示「台灣社區/校園運動場館預約系統」完整設計與開發能力。
地理範圍：台北市、新北市。場館類型：籃球、羽球、游泳、桌球、網球、晨間運動。
無真實後端，所有資料以 mock data 層模擬。

## Goals / Non-Goals

**Goals:**
- Next.js 14 App Router + TypeScript + Tailwind CSS 完整前端
- 6 個頁面：首頁、場次選擇、待支付、訂單、QR 核驗、我的
- React Bits 動效元件整合（Dock、GlassIcons、SpotlightCard、ClickSpark、Stepper 等）
- 台灣在地化：NTD、LINE Pay / 街口 UI、.edu.tw 認證、65 歲敬老
- 台北市/新北市真實場館 mock data（含行政區、地址、MRT 可達性）
- 老人模式（CSS 變數切換，字體 ≥18px，觸控目標 ≥60px）
- Vercel 一鍵部署，URL 可直接附在履歷

**Non-Goals:**
- 真實後端 API / 資料庫
- 真實 LINE Pay / 街口支付串接
- 即時 WebSocket 場次同步
- 後台管理介面

## Decisions

### Decision 1: Next.js App Router（不用 Pages Router）

Next.js 14 App Router 支援 Server Components、streaming、layouts 嵌套，是 2025 年市場標準。
作品集用 Server Components 渲染靜態場館列表，Client Components 僅在需要互動的葉節點使用。

### Decision 2: Zustand（不用 Redux / Jotai）

全域狀態只有 3 個：用戶資料、認證狀態、老人模式開關。Zustand API 最精簡，bundle size 最小，
面試官看 code 不會被 boilerplate 淹沒。

### Decision 3: mock data 直接 import（不用 MSW）

作品集不需要 network layer 模擬。所有 mock data 以 TypeScript 常數寫死，
避免 MSW 的 service worker 設定在 Vercel 上踩坑。

### Decision 4: React Bits 用 shadcn CLI copy-in（不用 npm package）

React Bits 是 copy-in 模式，元件源碼進 repo，可自由修改。
選用的元件全部 TS-TW 變體，只需 `motion` + `gsap` 兩個 npm 依賴。

### Decision 5: 台北/新北場館 mock data 設計

每個場館包含：
- `city`：台北市 / 新北市
- `district`：行政區（大安區 / 中正區 / 板橋區 / 新莊區 等）
- `address`：完整地址
- `mrt_station`：最近捷運站（善用台北捷運 MRT 網路）
- `mrt_walking_minutes`：步行分鐘數

場館類型：籃球 / 羽球 / 游泳 / 桌球 / 網球 / 晨間運動
模擬真實台北市/新北市社區運動中心（大安運動中心、永和運動中心、板橋運動中心等）

### Decision 6: 老人模式實作

CSS 自定義屬性掛在 `<html>` 的 `data-elder` 屬性：

```css
:root { --font-body: 1rem; --touch-min: 2.75rem; }
[data-elder="true"] { --font-body: 1.125rem; --touch-min: 3.75rem; }
```

Zustand store 管理狀態，`layout.tsx` 的 `useEffect` 同步到 DOM。

## Risks / Trade-offs

- [mock data 無法展示真實並發搶位] → 在程式碼注解和 README 說明後端設計架構（Redis Lua 方案）
- [React Bits copy-in 版本會過時] → 固定今天的安裝版本，不做升級依賴
- [老人模式在 SSR 有 hydration mismatch 風險] → 老人模式僅在 Client Component 讀取，SSR fallback 為 false
- [台北/新北場館地址需要準確] → 選用公開資料可查的真實場館（台北市運動中心網站）
