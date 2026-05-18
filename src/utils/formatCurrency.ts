/**
 * Format a price in FCFA
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('fr-BF', {
    style: 'decimal',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount) + ' FCFA';
}

/**
 * Format a price with compact notation for large amounts
 */
export function formatCurrencyCompact(amount: number): string {
  if (amount >= 1_000_000) {
    return (amount / 1_000_000).toFixed(1) + 'M FCFA';
  }
  if (amount >= 1_000) {
    return (amount / 1_000).toFixed(0) + 'K FCFA';
  }
  return formatCurrency(amount);
}

/**
 * Calculate discount percentage
 */
export function calcDiscount(price: number, compareAt: number): number {
  return Math.round(((compareAt - price) / compareAt) * 100);
}
