// src/utils/formatNumber.ts

/**
 * Format a number with comma separators.
 * Non-dollar numbers drop decimals if whole.
 * Dollar amounts always show two decimals.
 *
 * @param n - The number to format
 * @param decimals - Number of decimal places (default: 2)
 * @param isCurrency - Forces fixed 2-decimal output if true
 * @returns Formatted string
 */
export const formatNumber = (
  n: number | undefined,
  decimals: number = 2,
  isCurrency: boolean = false
): string => {
  if (n === undefined || isNaN(n)) return "-";

  const rounded = Number(n.toFixed(decimals));
  const isWhole = Number.isInteger(rounded);

  return rounded.toLocaleString(undefined, {
    minimumFractionDigits: isCurrency ? 2 : isWhole ? 0 : decimals,
    maximumFractionDigits: isCurrency ? 2 : decimals,
  });
};
