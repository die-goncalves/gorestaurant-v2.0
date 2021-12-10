export function ratingNumberToText(rating: number | undefined): {
  text: string
  color: string
} {
  if (typeof rating !== 'number')
    return { text: 'Still unrated', color: 'brand.text_color' }
  if (rating < 1.5) return { text: 'Bad', color: '#C62726' }
  if (rating < 2.5) return { text: 'Poor', color: '#C66B26' }
  if (rating < 3.5) return { text: 'Fair', color: '#C6B826' }
  if (rating < 4.5) return { text: 'Good', color: '#A9C626' }

  return { text: 'Excellent', color: '#42C626' }
}
