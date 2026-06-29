## ADDED Requirements

### Requirement: 首頁場館類型入口
系統 SHALL 在首頁顯示運動類型 icon 網格（GlassIcons），供用戶選擇進入對應場館列表。

#### Scenario: 顯示 6 種運動類型
- **WHEN** 用戶進入首頁
- **THEN** 顯示籃球、羽球、游泳、桌球、網球、晨間運動 6 個 GlassIcons，每個有 icon 和中文標籤

#### Scenario: 點擊運動類型跳轉
- **WHEN** 用戶點擊某運動類型 icon
- **THEN** 導向 `/venues?category=<type>` 場館列表頁

### Requirement: 首頁動態 Banner
系統 SHALL 在首頁頂部顯示動態 Banner，展示今日推薦場次資訊。

#### Scenario: Banner 顯示剩餘場次
- **WHEN** 首頁載入完成
- **THEN** Banner 以 CountUp 動畫顯示「今日共 N 場可預約」，RotatingText 輪播運動類型名稱

#### Scenario: BlurText 標題動畫
- **WHEN** 首頁首次渲染
- **THEN** 標題「輕鬆預約，隨時運動」以 BlurText 逐字模糊入場

### Requirement: 首頁場館卡片
系統 SHALL 在首頁展示推薦場館（SpotlightCard），每張卡顯示今日剩餘場次數。

#### Scenario: SpotlightCard hover 效果
- **WHEN** 桌機用戶 hover 場館卡片
- **THEN** SpotlightCard 聚光效果啟動

#### Scenario: 場館卡顯示捷運資訊
- **WHEN** 場館卡片渲染
- **THEN** 顯示最近捷運站名稱及步行分鐘數（如「板南線 板橋站 步行 5 分鐘」）

### Requirement: Dock 底部導航
系統 SHALL 在所有頁面底部顯示 Dock 導航列（首頁 / 訂單 / 我的）。

#### Scenario: Dock 當前頁面高亮
- **WHEN** 用戶在首頁
- **THEN** Dock 中「首頁」icon 為高亮狀態，其餘正常

#### Scenario: Dock 在行動裝置固定底部
- **WHEN** 頁面寬度 < 768px
- **THEN** Dock fixed 在螢幕底部，不隨滾動移動
