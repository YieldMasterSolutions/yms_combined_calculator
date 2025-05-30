// src/utils/formatNumber.ts

/**
 * Formats a number with:
 * - Commas as thousands separators
 * - Custom decimal places (default 2)
 * - Returns "-" if value is invalid or undefined
 *
 * Used consistently for both UI and PDF outputs.
 */

export const formatNumber = (
  n: number | undefined,
  decimals: number = 2
): string => {
  if (typeof n !== "number" || isNaN(n)) return "-";

  return n.toLocaleString(undefined, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
};
