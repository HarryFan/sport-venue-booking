## 1. 專案初始化

- [ ] 1.1 `pnpm create next-app@latest` 建立專案（TypeScript、Tailwind、App Router、src/ 目錄）
- [ ] 1.2 安裝 shadcn/ui 並初始化（`pnpm dlx shadcn@latest init`）
- [ ] 1.3 安裝 Zustand：`pnpm add zustand`
- [ ] 1.4 安裝 React Bits 零依賴元件（GlassIcons、GlassSurface、SpotlightCard、ClickSpark、StarBorder、BorderGlow、ProfileCard）
- [ ] 1.5 安裝 React Bits motion 元件（BlurText、CountUp、AnimatedList、Stepper、TiltedCard、Dock、ElasticSlider、ShinyText、RotatingText）
- [ ] 1.6 建立目錄結構：`app/`、`components/ui/`、`components/reactbits/`、`lib/`、`public/`
- [ ] 1.7 設定 `tailwind.config.ts`，加入 CSS 變數（老人模式 `--font-body`、`--touch-min`）

## 2. 型別系統與 Mock Data

- [ ] 2.1 建立 `lib/types.ts`，定義 VenueCategory、Venue（含台北/新北欄位）、TimeSlot、Booking、BookingStatus、Certification、CertType、UserProfile
- [ ] 2.2 建立 `lib/mock-data.ts`，加入 8+ 個台北市/新北市真實場館（大安運動中心、永和運動中心、板橋運動中心、新莊運動中心等，含 MRT 資訊）
- [ ] 2.3 在 mock-data 中建立各場館時段資料（含 available / full / unavailable 三種狀態）
- [ ] 2.4 建立 mock 訂單資料（各狀態各 2 筆：pending_payment / paid / completed / cancelled）
- [ ] 2.5 建立 `lib/mock-api.ts`，封裝 mock 函式（`getVenues()`、`getTimeSlots()`、`getBookings()`），每個函式加 300ms delay

## 3. 全域狀態（Zustand Store）

- [ ] 3.1 建立 `lib/store.ts`，定義 userStore（user、certifications、balance）
- [ ] 3.2 在 store 加入 `isElderMode: boolean` 及 toggle action，LocalStorage 持久化
- [ ] 3.3 在 `app/layout.tsx` 加入 Client Component，同步 `isElderMode` 到 `<html data-elder>`
- [ ] 3.4 在 `globals.css` 加入 `:root` 和 `[data-elder="true"]` CSS 變數規則

## 4. 全局 Layout（Dock 底部導航）

- [ ] 4.1 建立 `components/layout/BottomDock.tsx`，整合 Dock 元件（首頁 / 訂單 / 我的三個 icon）
- [ ] 4.2 在 `app/layout.tsx` 引入 BottomDock，手機端 fixed 底部
- [ ] 4.3 實作 Dock active 狀態（根據 `usePathname()` 高亮當前頁）

## 5. 首頁（Home Page）

- [ ] 5.1 建立 `app/page.tsx` 首頁
- [ ] 5.2 加入 BlurText 標題「輕鬆預約，隨時運動」
- [ ] 5.3 加入 RotatingText 副標題輪播（籃球、羽球、游泳、桌球、網球、晨間運動）
- [ ] 5.4 加入 GlassIcons 運動類型網格（6 種，含 icon 圖示和中文標籤）
- [ ] 5.5 加入推薦場館列表（SpotlightCard，顯示 3-4 個場館，含 CountUp 剩餘場次數）
- [ ] 5.6 場館卡顯示捷運資訊（站名 + 步行分鐘）
- [ ] 5.7 GlassIcons 點擊導向 `/venues?category=<type>`

## 6. 場館列表與場次選擇

- [ ] 6.1 建立 `app/venues/page.tsx`，顯示場館列表，支援 `category` query param 篩選
- [ ] 6.2 加入城市（台北市/新北市）和行政區下拉篩選
- [ ] 6.3 建立 `app/venues/[id]/page.tsx` 場館詳情頁
- [ ] 6.4 加入 Stepper（選場館 → 選時段 → 確認 → 支付）
- [ ] 6.5 建立 `components/booking/DatePicker.tsx`，整合 ElasticSlider，顯示未來 7 天
- [ ] 6.6 建立 `components/booking/TimeSlotGrid.tsx`，實作 4 種狀態（available / selected / full / unavailable）
- [ ] 6.7 在 TimeSlotGrid 的 available 格點擊整合 ClickSpark 效果
- [ ] 6.8 選中時段後 BorderGlow 高亮，「立即預約」按鈕 enabled
- [ ] 6.9 點擊「立即預約」建立 mock 訂單，跳轉至 `/bookings/[id]/pay`

## 7. 待支付頁

- [ ] 7.1 建立 `app/bookings/[id]/pay/page.tsx`
- [ ] 7.2 以 SpotlightCard 顯示訂單詳情（場館、行政區、時段、金額 NTD）
- [ ] 7.3 建立支付截止 CountUp 倒計時（15 分鐘，剩 5 分鐘轉紅色）
- [ ] 7.4 建立支付方式選擇器（LINE Pay / 街口支付 / 儲值點數）
- [ ] 7.5 學生免費場次：金額顯示 NT$0，按鈕文字改「確認預約」
- [ ] 7.6 StarBorder 套用在「確認支付」按鈕
- [ ] 7.7 點擊後 1.5 秒 loading → mock 成功 → 跳轉至 `/orders` + toast 通知

## 8. 訂單管理頁

- [ ] 8.1 建立 `app/orders/page.tsx`
- [ ] 8.2 實作 4 個 Tab（待支付 / 待使用 / 已完成 / 全部）
- [ ] 8.3 以 AnimatedList 顯示訂單列表
- [ ] 8.4 建立 `components/orders/OrderCard.tsx`（TiltedCard 桌機版）
- [ ] 8.5 OrderCard 依狀態顯示對應 CTA（待支付→去支付 / 待使用→出示驗票碼 / 已完成→再次預約）
- [ ] 8.6 OrderCard 顯示場館名稱、行政區、捷運站、日期時間、金額

## 9. QR 驗票碼

- [ ] 9.1 建立 `components/orders/QRModal.tsx`，使用 GlassSurface 全螢幕蓋層
- [ ] 9.2 安裝 `qrcode.react`，以 order_id 生成 QR Code 圖片
- [ ] 9.3 QR 下方顯示場館名稱、日期時間
- [ ] 9.4 點擊蓋層外部或關閉按鈕關閉 Modal

## 10. 我的頁面

- [ ] 10.1 建立 `app/profile/page.tsx`
- [ ] 10.2 整合 ProfileCard（頭像 placeholder、暱稱、點數、優惠券數）
- [ ] 10.3 加入 ShinyText 認證狀態徽章（學生/教職員/敬老）
- [ ] 10.4 無認證時顯示橘色「去認證，享優惠」CTA
- [ ] 10.5 加入「長輩模式」toggle，呼叫 Zustand toggleElderMode
- [ ] 10.6 加入場館地圖、預約流程、預約須知三個快捷入口

## 11. 身份認證流程

- [ ] 11.1 建立 `app/certification/page.tsx`，顯示三種認證入口卡片
- [ ] 11.2 建立學生認證表單（.edu.tw email 驗證，實時錯誤提示）
- [ ] 11.3 建立敬老認證表單（出生年份輸入，1961 年以前驗證通過）
- [ ] 11.4 實作 mock 審核流程（送出 → 2 秒 loading → 自動通過 → 更新 Zustand store）

## 12. 老人模式完整套用

- [ ] 12.1 確認所有頁面 button `min-height` 使用 `var(--touch-min)`
- [ ] 12.2 確認 TimeSlotGrid 格子在老人模式 min-height ≥ 60px
- [ ] 12.3 確認 Dock icon 觸控區域在老人模式 ≥ 60×60px
- [ ] 12.4 加入取消訂單二次確認 Dialog（老人模式下自動顯示）

## 13. 部署與收尾

- [ ] 13.1 建立 `README.md`（功能說明、截圖、技術棧、後端架構設計說明）
- [ ] 13.2 設定 `vercel.json`，確認 Next.js 部署設定
- [ ] 13.3 `pnpm build` 零錯誤，TypeScript `--noEmit` 通過
- [ ] 13.4 推送至 GitHub，連結 Vercel 自動部署
- [ ] 13.5 驗證部署 URL 所有頁面正常運作
