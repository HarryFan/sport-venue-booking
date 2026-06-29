## ADDED Requirements

### Requirement: 訂單列表（AnimatedList）
系統 SHALL 在訂單頁以 AnimatedList 顯示訂單清單，分 4 個 Tab：待支付 / 待使用 / 已完成 / 全部。

#### Scenario: Tab 切換
- **WHEN** 用戶點擊「待使用」Tab
- **THEN** 只顯示 status === 'paid' 的訂單卡片，AnimatedList 重新入場

#### Scenario: 訂單卡顯示台北/新北場館資訊
- **WHEN** 訂單卡片渲染
- **THEN** 顯示場館名稱、行政區、捷運站、預約日期時間、費用（NTD）

#### Scenario: TiltedCard hover（桌機）
- **WHEN** 桌機用戶 hover 訂單卡片
- **THEN** TiltedCard 3D 傾斜效果啟動

### Requirement: QR 驗票碼顯示（GlassSurface）
系統 SHALL 提供全螢幕 QR Code 展示（GlassSurface 毛玻璃底），供現場核驗入場。

#### Scenario: 點擊展開 QR
- **WHEN** 用戶點擊訂單卡片的「出示驗票碼」按鈕
- **THEN** GlassSurface 全螢幕蓋層顯示 QR Code（以 order_id 生成），自動亮度提示

#### Scenario: QR 包含場館資訊
- **WHEN** QR 展示頁顯示
- **THEN** QR Code 下方顯示場館名稱、日期時間、場次資訊

#### Scenario: 關閉 QR 蓋層
- **WHEN** 用戶點擊蓋層外部或關閉按鈕
- **THEN** 蓋層關閉，回到訂單列表
