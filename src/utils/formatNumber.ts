// src/utils/formatNumber.ts

/**
 * Formats a number consistently for UI and PDF output:
 * - Adds commas as thousands separators
 * - Displays two decimals for currency
 * - Omits decimals for whole numbers unless currency
 * - Returns "-" if value is invalid or undefined
 *
 * @param n - Number to format
 * @param decimals - Decimal places (default: 2)
 * @param isCurrency - If true, always show two decimals
 * @returns Formatted number string
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
