## ADDED Requirements

### Requirement: 預約流程步驟指示器
系統 SHALL 在預約相關頁面頂部顯示 Stepper，標示「選場館 → 選時段 → 確認 → 支付」四步驟。

#### Scenario: Stepper 顯示當前步驟
- **WHEN** 用戶在場次選擇頁
- **THEN** Stepper 第二步「選時段」為 active 狀態，已完成步驟有勾選標記

### Requirement: 日期選擇器
系統 SHALL 在場次選擇頁頂部提供 ElasticSlider 橫向日期卡片，顯示未來 7 天。

#### Scenario: 日期卡片顯示
- **WHEN** 用戶進入場次選擇頁
- **THEN** 顯示今日起 7 天的日期卡片，今日預設選中，顯示星期幾和月/日

#### Scenario: 切換日期更新時段
- **WHEN** 用戶點擊其他日期
- **THEN** 時段網格更新為該日的 mock 資料

### Requirement: 時段選擇網格（TimeSlotGrid）
系統 SHALL 顯示場館時段網格，每格標示時間、剩餘名額，並支援四種狀態。

#### Scenario: 時段四種視覺狀態
- **WHEN** 時段網格渲染
- **THEN** available 格為綠色可點擊；full 格為灰色+「已滿」文字不可點；selected 格有 BorderGlow 高亮；unavailable 格為灰色斜線

#### Scenario: ClickSpark 選取反饋
- **WHEN** 用戶點擊 available 時段
- **THEN** 觸發 ClickSpark 火花動效，該格切換為 selected 狀態

#### Scenario: 剩餘名額顯示
- **WHEN** 時段尚有名額
- **THEN** 顯示「剩 N 位」文字，N ≤ 3 時文字變橘色警示

### Requirement: 場館篩選（台北/新北）
系統 SHALL 在場館列表頁提供城市和行政區篩選。

#### Scenario: 城市篩選
- **WHEN** 用戶選擇「台北市」
- **THEN** 只顯示 city === '台北市' 的場館

#### Scenario: 行政區篩選
- **WHEN** 用戶選擇「板橋區」
- **THEN** 只顯示 district === '板橋區' 的場館
