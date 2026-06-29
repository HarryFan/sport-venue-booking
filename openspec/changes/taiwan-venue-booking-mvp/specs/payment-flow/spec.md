## ADDED Requirements

### Requirement: 訂單確認頁
系統 SHALL 在待支付頁顯示訂單詳情（SpotlightCard）及支付截止倒計時。

#### Scenario: 訂單詳情顯示
- **WHEN** 用戶進入待支付頁
- **THEN** 顯示場館名稱、行政區、時段日期時間、費用（NTD）、訂單狀態

#### Scenario: 支付截止倒計時
- **WHEN** 待支付頁渲染
- **THEN** 以 CountUp（倒數模式）顯示剩餘分:秒，到 0 時顯示「訂單已超時取消」全頁提示

### Requirement: 台灣支付方式選擇
系統 SHALL 提供 LINE Pay、街口支付、儲值點數三種支付選項。

#### Scenario: 支付方式選擇
- **WHEN** 用戶選擇支付方式
- **THEN** 選中項有邊框高亮，未選項無高亮；儲值點數不足時顯示灰色 disabled + 「點數不足」

#### Scenario: Mock 支付成功
- **WHEN** 用戶點擊「確認支付」+ StarBorder CTA 按鈕
- **THEN** 顯示 1.5 秒 loading，然後跳轉至訂單頁並顯示「支付成功」toast

#### Scenario: 學生/教職員免費場次
- **WHEN** 已認證學生預約免費時段
- **THEN** 金額顯示「NT$0」，支付按鈕文字改為「確認預約」
