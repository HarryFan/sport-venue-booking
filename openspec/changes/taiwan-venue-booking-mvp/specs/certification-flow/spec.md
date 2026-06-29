## ADDED Requirements

### Requirement: 認證選擇頁
系統 SHALL 提供三種認證通道入口：學生（.edu.tw 信箱）、教職員（機構信箱）、敬老（65 歲以上）。

#### Scenario: 認證入口顯示
- **WHEN** 用戶進入認證頁
- **THEN** 顯示三個認證卡片，各含圖示、說明、優惠說明（學生免費/教職員免費/敬老半價）

### Requirement: 學生認證（.edu.tw 信箱）
系統 SHALL 以台灣大學信箱（.edu.tw 結尾）作為學生資格驗證依據。

#### Scenario: .edu.tw 信箱驗證
- **WHEN** 用戶輸入 .edu.tw 結尾的 email
- **THEN** 欄位顯示綠色勾選，「送出」按鈕 enabled

#### Scenario: 非 .edu.tw 信箱拒絕
- **WHEN** 用戶輸入非 .edu.tw 信箱
- **THEN** 顯示「請輸入學校信箱（.edu.tw）」錯誤訊息

#### Scenario: Mock 認證審核流程
- **WHEN** 用戶送出認證申請
- **THEN** 顯示「審核中」狀態 2 秒（loading），然後自動切換為「已通過」（mock approve）

### Requirement: 敬老認證（65 歲以上）
系統 SHALL 接受出生年份輸入，確認 65 歲以上後 mock 批准。

#### Scenario: 年齡驗證通過
- **WHEN** 用戶輸入出生年份 ≤ 1961（2026 年時 65 歲以上）
- **THEN** mock 批准，顯示「已通過敬老認證，享半價優惠」

#### Scenario: 年齡不符
- **WHEN** 用戶輸入出生年份 > 1961
- **THEN** 顯示「敬老優惠適用 65 歲以上長者」錯誤訊息
