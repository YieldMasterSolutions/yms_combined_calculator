// src/utils/formatNumber.ts

/**
 * Formats a number with:
 * - Commas as thousands separators
 * - Always 2 decimal places
 * - Returns "-" if value is invalid or undefined
 *
 * Used consistently for both UI and PDF outputs.
 */

export const formatNumber = (
  n: number | undefined
): string => {
  if (typeof n !== "number" || isNaN(n)) return "-";

  return n.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};
