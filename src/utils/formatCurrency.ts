export function formatCurrency(value: number): string {
  // Simple, predictable formatting (avoid i18n complexity for a class project)
  return `₱${value.toFixed(2)}`;
}
