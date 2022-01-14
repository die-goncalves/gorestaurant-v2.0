import { Flex, GridItem, Text } from '@chakra-ui/react'
import { ClickableRating } from '../Rating/ClickableRating'
import { TRestaurant, TFoods } from '../../types'
import { ImageWithSkeleton } from '../ImageWithSkeleton'

type FoodRatingCardProps = {
  food: Pick<TFoods, 'id' | 'name' | 'image'> & {
    restaurant: Pick<TRestaurant, 'name'>
  }
}

export function FoodRatingCard({ food }: FoodRatingCardProps) {
  return (
    <GridItem
      display="flex"
      w="100%"
      h="13.5rem"
      flexDirection="column"
      background="#ffffff"
    >
      <Flex w="100%" h="6rem" position="relative" overflow="hidden">
        <ImageWithSkeleton
          objectFit="cover"
          layout="fill"
          src={food.image}
          alt={food.name}
        />
      </Flex>

      <Flex
        flex="1"
        padding="1rem 0.5rem"
        alignItems="center"
        justifyContent="space-between"
        flexDirection="column"
        boxShadow="inset 0px 0px 2px 0px rgba(0,0,0,0.5), inset 0px 8px 10px -10px #C05621"
      >
        <Flex flexDirection="column">
          <Text textAlign="center" fontSize="0.875rem" fontWeight="500">
            {food.restaurant.name}
          </Text>
          <Text
            textAlign="center"
            fontSize="1rem"
            fontWeight="600"
            color="orange.600"
          >
            {food.name}
          </Text>
        </Flex>

        <Flex marginTop="1rem" justifyContent="center">
          <ClickableRating starSize="1.5rem" foodId={food.id} />
        </Flex>
      </Flex>
    </GridItem>
  )
}
