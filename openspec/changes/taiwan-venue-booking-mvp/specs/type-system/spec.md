## ADDED Requirements

### Requirement: TypeScript 型別定義
系統 SHALL 在 `lib/types.ts` 提供與 `openapi.yaml` schemas 對應的 TypeScript interface，
涵蓋 Venue、TimeSlot、Booking、Payment、Certification、UserProfile。

#### Scenario: Venue 型別包含台北/新北欄位
- **WHEN** 引用 `Venue` interface
- **THEN** 包含 `city`（'台北市' | '新北市'）、`district`（string）、`address`（string）、`mrt_station`（string）、`mrt_walking_minutes`（number）

#### Scenario: 金額使用 NTD 整數
- **WHEN** 任何型別包含金額欄位
- **THEN** 欄位名稱為 `*_twd`（number），單位為新台幣元，無小數點

### Requirement: Mock Data 層
系統 SHALL 在 `lib/mock-data.ts` 提供完整 mock 資料，模擬 API 回應，
包含台北市/新北市真實場館資料（至少 8 個場館、4 個行政區）。

#### Scenario: 場館資料包含台北市場館
- **WHEN** 取得 mock 場館列表
- **THEN** 包含至少 3 個台北市場館（大安、中山、信義等行政區），每館有完整捷運資訊

#### Scenario: 場館資料包含新北市場館
- **WHEN** 取得 mock 場館列表
- **THEN** 包含至少 3 個新北市場館（板橋、永和、新莊等行政區），每館有完整捷運資訊

#### Scenario: 時段資料涵蓋完整狀態
- **WHEN** 取得某場館某日時段
- **THEN** 時段清單中同時存在 available、full、unavailable 三種狀態的示例

#### Scenario: Mock API 函式延遲模擬
- **WHEN** 呼叫任何 mock API 函式（如 `getVenues()`、`getTimeSlots()`）
- **THEN** 函式回傳 Promise，預設 delay 300ms 模擬網路延遲
