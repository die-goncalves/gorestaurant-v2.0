export function backgroundColorOfTheStar(value: number) {
  const colors = [
    '#C6272633',
    '#C66B2633',
    '#C6B82633',
    '#A9C62633',
    '#42C62633'
  ]
  if (value < 1.5) return colors[0]
  if (value < 2.5) return colors[1]
  if (value < 3.5) return colors[2]
  if (value < 4.5) return colors[3]

  return colors[4]
}
