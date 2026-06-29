## ADDED Requirements

### Requirement: Next.js 14 專案初始化
系統 SHALL 以 Next.js 14 App Router + TypeScript + Tailwind CSS + shadcn/ui 建立，
並安裝指定 React Bits 元件（TS-TW 變體）。

#### Scenario: 專案建立成功
- **WHEN** 執行 `pnpm create next-app` 並完成設定
- **THEN** `pnpm dev` 可在 localhost:3000 啟動，TypeScript 無型別錯誤

#### Scenario: React Bits 元件安裝
- **WHEN** 執行 shadcn CLI 安裝 GlassIcons、SpotlightCard、ClickSpark、StarBorder、BorderGlow、GlassSurface、ProfileCard、BlurText、CountUp、AnimatedList、Stepper、TiltedCard、Dock、ElasticSlider、ShinyText、RotatingText
- **THEN** 元件源碼存在於 `components/reactbits/` 目錄，`pnpm build` 無錯誤

#### Scenario: 目錄結構符合規範
- **WHEN** 專案初始化完成
- **THEN** 存在以下路徑：`app/`、`components/`、`lib/`、`public/`、`openapi.yaml`
