import { Box, HStack, Text } from '@chakra-ui/react'

type FoodRating = {
  rating: number
}
type FoodInfo = {
  id: number
  foodRating: Array<FoodRating>
}
type RatingProps = {
  foods: Array<FoodInfo>
}

const ratingRec = (
  foods: Array<FoodInfo>,
  nratings = 0,
  sum = 0
): { overallRating: number | null; numberRatings: number } => {
  if (foods.length === 0 && nratings === 0)
    return {
      overallRating: null,
      numberRatings: nratings
    }
  if (foods.length === 0)
    return {
      overallRating: Number((sum / nratings).toFixed(2)),
      numberRatings: nratings
    }
  let numberOfRatings = nratings
  let sumOfRatings = sum

  for (let food_rating of foods[0].foodRating) {
    numberOfRatings = numberOfRatings + 1
    sumOfRatings = sumOfRatings + food_rating.rating
  }
  foods.shift()
  return ratingRec(foods, numberOfRatings, sumOfRatings)
}

const ratingNumberToText = (
  rating: number | null
): { text: string; color: string } => {
  if (rating === null)
    return { text: 'Still unrated', color: 'brand.text_color' }
  if (rating < 1.5) {
    return { text: 'Bad', color: '#C62726' }
  } else if (rating < 2.5) {
    return { text: 'Poor', color: '#C66B26' }
  } else if (rating < 3.5) {
    return { text: 'Fair', color: '#C6B826' }
  } else if (rating < 4.5) {
    return { text: 'Good', color: '#A9C626' }
  } else {
    return { text: 'Excellent', color: '#42C626' }
  }
}

export function Rating({ foods }: RatingProps) {
  const rating = ratingRec([...foods])
  const infoRating = ratingNumberToText(rating.overallRating)
  return (
    <HStack
      display="flex"
      spacing="0.25rem"
      alignItems="center"
      fontSize="1rem"
      fontFamily="Spectral"
      lineHeight="1rem"
    >
      <Box
        as="span"
        className="material-icons"
        fontSize="1rem"
        color={infoRating.color}
      >
        star
      </Box>
      {rating.overallRating && (
        <Text color={infoRating.color}>{rating.overallRating}</Text>
      )}
      <Text color={infoRating.color}>{infoRating.text}</Text>
      {rating.overallRating &&
        (rating.numberRatings > 999 ? (
          <Text>( 999+ )</Text>
        ) : (
          <Text>( {rating.numberRatings} )</Text>
        ))}
    </HStack>
  )
}
