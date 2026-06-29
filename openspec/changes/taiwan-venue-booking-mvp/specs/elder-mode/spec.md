## ADDED Requirements

### Requirement: 老人模式切換
系統 SHALL 在「我的」頁面提供老人模式開關，開啟後全站套用大字體和大觸控目標。

#### Scenario: 開啟老人模式
- **WHEN** 用戶在我的頁點擊「長輩模式」toggle
- **THEN** `<html>` 加上 `data-elder="true"`，全站字體放大，觸控目標增大

#### Scenario: 老人模式持久化
- **WHEN** 用戶開啟老人模式後重新整理頁面
- **THEN** 老人模式狀態維持（localStorage 持久化）

### Requirement: 老人模式字體規格
系統 SHALL 在老人模式下套用較大的字體尺寸。

#### Scenario: 字體尺寸放大
- **WHEN** data-elder="true"
- **THEN** 正文字體 ≥ 18px（1.125rem）、標題 ≥ 24px（1.5rem）、按鈕文字 ≥ 20px（1.25rem）

### Requirement: 老人模式觸控目標
系統 SHALL 在老人模式下確保所有可互動元素觸控目標 ≥ 60px。

#### Scenario: 按鈕高度符合規格
- **WHEN** data-elder="true"
- **THEN** 所有 button 元素 min-height ≥ 60px，Dock icon 觸控區域 ≥ 60×60px

#### Scenario: 時段格大小
- **WHEN** data-elder="true" 且顯示時段網格
- **THEN** 每個時段格 min-height ≥ 60px，字體 ≥ 16px

### Requirement: 老人模式確認對話框
系統 SHALL 在老人模式下，取消訂單和支付操作前顯示二次確認。

#### Scenario: 取消訂單二次確認
- **WHEN** data-elder="true" 且用戶點擊「取消訂單」
- **THEN** 顯示確認 Dialog：「確定要取消預約嗎？」附「確定取消」和「返回」兩個大按鈕
