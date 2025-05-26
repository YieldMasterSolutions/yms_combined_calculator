// src/utils/formatNumber.ts

/**
 * Formats a number for consistent output:
 * - Adds comma separators for thousands
 * - Applies 2 decimal places for currency
 * - Omits decimals for whole numbers when not currency
 * - Returns "-" for invalid or undefined numbers
 *
 * @param n - The numeric value to format
 * @param decimals - Number of decimal places (default: 2)
 * @param isCurrency - If true, enforces two decimal places
 * @returns A formatted number string
 */
export const formatNumber = (
  n: number | undefined,
  decimals: number = 2,
  isCurrency: boolean = false
): string => {
  if (typeof n !== "number" || isNaN(n)) return "-";

  const rounded = Number(n.toFixed(decimals));
  const isWhole = Number.isInteger(rounded);

  return rounded.toLocaleString(undefined, {
    minimumFractionDigits: isCurrency ? 2 : isWhole ? 0 : decimals,
    maximumFractionDigits: isCurrency ? 2 : decimals,
  });
};
