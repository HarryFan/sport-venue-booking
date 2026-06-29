## ADDED Requirements

### Requirement: 個人資料頁（ProfileCard）
系統 SHALL 在「我的」頁面頂部顯示 ProfileCard，含用戶頭像、暱稱、儲值點數、優惠券數量。

#### Scenario: ProfileCard 渲染
- **WHEN** 用戶進入我的頁
- **THEN** ProfileCard 顯示頭像（預設 placeholder）、暱稱、「NT$ XXX 點數」、「N 張優惠券」

### Requirement: 認證狀態徽章（ShinyText）
系統 SHALL 以 ShinyText 展示用戶已通過的認證（學生/教職員/敬老）。

#### Scenario: 已認證狀態顯示
- **WHEN** 用戶持有學生認證
- **THEN** 顯示「✓ 學生認證」ShinyText 藍色閃光徽章

#### Scenario: 未認證引導
- **WHEN** 用戶無任何認證
- **THEN** 顯示「去認證，享優惠」橘色 CTA，點擊跳轉認證頁

### Requirement: 我的頁快捷功能
系統 SHALL 在 ProfileCard 下方提供場館地圖、預約流程說明、預約須知三個快捷入口。

#### Scenario: 場館地圖快捷入口
- **WHEN** 用戶點擊「場館地圖」
- **THEN** 顯示台北市/新北市場館分布圖（靜態 SVG 或 Google Maps embed）
