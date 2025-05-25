// src/utils/formatNumber.ts

/**
 * Format a number with comma separators.
 * Currency values always show two decimals.
 * Non-currency values omit decimals if the number is whole.
 *
 * @param n - The number to format
 * @param decimals - Number of decimal places (default: 2)
 * @param isCurrency - If true, always show 2 decimal places
 * @returns Formatted string or "-" if invalid
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
