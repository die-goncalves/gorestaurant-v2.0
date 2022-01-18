import React from 'react'
import { Box, Grid, Heading, VStack } from '@chakra-ui/react'
import { Food } from '../Food'
import { TFoods, TFoodRating } from '../../types'

type FoodSectionsProps = {
  tags: Array<string>
  foods: Array<
    Omit<
      TFoods,
      | 'restaurant_id'
      | 'stripe_food_id'
      | 'stripe_price_id'
      | 'created_at'
      | 'updated_at'
    > & {
      food_rating: Array<
        Omit<TFoodRating, 'food_id' | 'created_at' | 'updated_at'>
      >
    }
  >
  isRestaurantOpen:
    | {
        open: boolean
        for_coming?: any
        current?: any
      }
    | undefined
}

export function FoodSections({
  tags,
  foods,
  isRestaurantOpen
}: FoodSectionsProps) {
  return (
    <VStack spacing="0" alignItems="flex-start" zIndex="0" paddingBottom="2rem">
      {tags.map(tag => {
        return (
          <Box
            key={`section-${tag}`}
            id={`section-${tag}`}
            as="section"
            width="100%"
          >
            <Heading
              as="h3"
              fontSize="1.5rem"
              fontWeight="600"
              lineHeight="2.25rem"
              paddingTop="2rem"
              paddingBottom="1rem"
            >
              {tag}
            </Heading>
            <Grid templateColumns="repeat(3, 1fr)" gridGap="1.5rem 1.5rem">
              {foods
                .map(food => {
                  if (tag === food.tag) {
                    const rating =
                      food.food_rating.length > 0
                        ? food.food_rating.reduce(function (acc, currentValue) {
                            return acc + currentValue.rating
                          }, 0) / food.food_rating.length
                        : undefined
                    return (
                      <Food
                        food={food}
                        rating={rating}
                        isRestaurantOpen={isRestaurantOpen}
                      />
                    )
                  }
                })
                .filter(item => item)}
            </Grid>
          </Box>
        )
      })}
    </VStack>
  )
}

export const MemoizedFoodSections = React.memo(FoodSections)
