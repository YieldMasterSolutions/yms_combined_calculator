// src/utils/formatNumber.ts

/**
 * Format a number with comma separators and fixed decimal places.
 * Defaults to 2 decimals unless overridden.
 *
 * @param n - The number to format
 * @param decimals - Number of decimal places to show (default: 2)
 * @returns Formatted string (e.g., 1234.56 -> "1,234.56")
 */
export const formatNumber = (n: number | undefined, decimals: number = 2): string => {
  if (n === undefined || isNaN(n)) return "-";
  return n.toLocaleString(undefined, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
};
