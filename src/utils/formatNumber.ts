export function formatNumber(data: {
  options: {
    locales?: string | string[]
    currency: string
  }
  numberToBeFormatted: number
}) {
  return new Intl.NumberFormat(data.options.locales, {
    style: 'currency',
    currency: data.options.currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(data.numberToBeFormatted)
}
