import React from 'react'
import { Box, Grid, Heading, VStack } from '@chakra-ui/react'
import { Food } from '../Food'

type FoodSectionsProps = {
  tags: Array<string>
  foods: Array<{
    id: string
    name: string
    price: number
    image: string
    description: string
    tag: string
    food_rating: Array<{ customer_id: string; rating: number }>
  }>
}

export function FoodSections({ tags, foods }: FoodSectionsProps) {
  return (
    <VStack spacing="0" alignItems="flex-start" zIndex="0" paddingBottom="2rem">
      {tags.map(tag => {
        return foods
          .map(food => {
            if (tag === food.tag) {
              const rating =
                food.food_rating.length > 0
                  ? food.food_rating.reduce(function (acc, currentValue) {
                      return acc + currentValue.rating
                    }, 0) / food.food_rating.length
                  : undefined
              return (
                <Box
                  key={`section-${food.tag}`}
                  id={`section-${food.tag}`}
                  as="section"
                >
                  <Heading
                    as="h3"
                    fontSize="1.5rem"
                    lineHeight="2.25rem"
                    paddingTop="2rem"
                    paddingBottom="1rem"
                  >
                    {tag}
                  </Heading>
                  <Grid templateColumns="repeat(3, 1fr)" gridGap="24px 24px">
                    <Food food={food} rating={rating} />
                  </Grid>
                </Box>
              )
            }
          })
          .filter(item => item)
      })}
    </VStack>
  )
}

export const MemoizedFoodSections = React.memo(FoodSections)
