import { Box, HStack, Text } from '@chakra-ui/react'

type RatingProps = {
  rating: number | undefined
  reviews: number
}

const ratingNumberToText = (
  rating: number | undefined
): { text: string; color: string } => {
  if (!rating) return { text: 'Still unrated', color: 'brand.text_color' }
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

export function Rating({ rating, reviews }: RatingProps) {
  const infoRating = ratingNumberToText(rating)

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
      {rating && <Text color={infoRating.color}>{rating}</Text>}
      <Text color={infoRating.color}>{infoRating.text}</Text>
      {rating &&
        (reviews > 999 ? <Text>( 999+ )</Text> : <Text>( {reviews} )</Text>)}
    </HStack>
  )
}
