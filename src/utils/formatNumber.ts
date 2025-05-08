// src/utils/formatNumber.ts
export const formatNumber = (n: number, decimals = 0): string => {
  return n.toLocaleString(undefined, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
};
