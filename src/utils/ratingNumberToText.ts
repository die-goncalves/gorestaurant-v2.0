export function ratingNumberToText(rating: number | undefined): {
  text: string
  color: string
} {
  if (typeof rating !== 'number')
    return { text: 'Não avaliado', color: 'brand.text_color' }
  if (rating < 1.5) return { text: 'Péssimo', color: '#C62726' }
  if (rating < 2.5) return { text: 'Ruim', color: '#C66B26' }
  if (rating < 3.5) return { text: 'Regular', color: '#C6B826' }
  if (rating < 4.5) return { text: 'Bom', color: '#A9C626' }

  return { text: 'Excelente', color: '#42C626' }
}
