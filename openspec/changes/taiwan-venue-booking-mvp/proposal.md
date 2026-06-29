## Why

台灣目前缺乏面向社區/校園體育場館、整合台灣本地支付（LINE Pay、街口）與身份認證（.edu.tw 信箱、敬老 65+）的預約平台。本專案以求職作品集為目標，打造 MVP 高保真 Next.js App，展示完整預約系統設計能力。

## What Changes

- 從零建立 Next.js 14（App Router）+ TypeScript + Tailwind 前端專案
- 實作 6 個核心頁面：首頁、場館列表/場次選擇、待支付、訂單管理、核驗 QR 碼、我的
- 整合 React Bits 動效元件（GlassIcons、SpotlightCard、ClickSpark、Stepper、Dock 等）
- 建立 TypeScript 型別層（從 openapi.yaml schemas 衍生）
- 建立 mock data 層（模擬 API 回應，無需真實後端）
- 實作老人模式（65 歲以上，CSS 大字體 / 大觸控目標切換）
- 台灣在地化：NTD 貨幣、LINE Pay / 街口支付 UI、.edu.tw 認證流程

## Capabilities

### New Capabilities

- `project-setup`: Next.js 14 + TS + Tailwind + shadcn/ui 初始化，含 React Bits 元件安裝
- `type-system`: 從 openapi.yaml 衍生的 TypeScript interface + mock data 層
- `home-page`: 首頁（GlassIcons 運動類型 + SpotlightCard 場館卡 + CountUp 剩餘名額 + Dock 底部導航）
- `booking-flow`: 場次選擇（Stepper 流程條 + ElasticSlider 日期 + TimeSlotGrid 4態 + ClickSpark）
- `payment-flow`: 待支付頁（倒計時 + 支付方式選擇 + mock 支付成功）
- `order-management`: 訂單頁（AnimatedList + TiltedCard + GlassSurface QR 碼展示）
- `user-profile`: 我的頁（ProfileCard + ShinyText 認證狀態 + 老人模式切換）
- `certification-flow`: 身份認證流程（學生 .edu.tw / 教職員 / 敬老 65+ mock 審核）
- `elder-mode`: CSS 變數切換大字體/大觸控模式，全站套用

### Modified Capabilities

<!-- 無現有 spec，本次全部為 New -->

## Impact

- 新建：`/app`（Next.js App Router 所有頁面路由）
- 新建：`/components`（React Bits 元件 + 自定義元件）
- 新建：`/lib/types.ts`（TypeScript interfaces）
- 新建：`/lib/mock-data.ts`（mock API responses）
- 新建：`/lib/store.ts`（Zustand 全域狀態：用戶、認證、老人模式）
- 參考：`openapi.yaml`（API 契約，mock data 的資料結構來源）
- 部署：Vercel（`vercel.json` + GitHub Actions CI）
