/**
 * 將表格數據轉換為 CSV 格式
 */
export function tableToCSV(columns: string[], rows: string[][]): string {
  // 轉義 CSV 欄位中的特殊字符
  const escapeCSVField = (field: string): string => {
    // 如果欄位包含逗號、雙引號或換行符，需要用雙引號包圍
    if (field.includes(",") || field.includes("\"") || field.includes("\n")) {
      // 將雙引號轉義為兩個雙引號
      return `"${field.replace(/"/g, "\"\"")}"`;
    }
    return field;
  };

  // 處理標題行
  const headerRow = columns.map(escapeCSVField).join(",");

  // 處理數據行
  const dataRows = rows.map(row => row.map(escapeCSVField).join(","));

  // 組合所有行
  return [headerRow, ...dataRows].join("\n");
}

/**
 * 比較兩個 CSV 字符串是否相等（忽略行順序）
 */
export function compareCSV(csv1: string, csv2: string): boolean {
  // 分割成行並排序（除了標題行）
  const lines1 = csv1.trim().split("\n");
  const lines2 = csv2.trim().split("\n");

  // 如果行數不同，直接返回 false
  if (lines1.length !== lines2.length) {
    return false;
  }

  // 比較標題行
  if (lines1[0] !== lines2[0]) {
    return false;
  }

  // 比較數據行（排序後比較，因為 SQL 結果順序可能不同）
  const dataLines1 = lines1.slice(1).sort();
  const dataLines2 = lines2.slice(1).sort();

  return dataLines1.every((line, index) => line === dataLines2[index]);
}
