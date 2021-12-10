import React from 'react'
import {
  Box,
  Flex,
  Grid,
  GridItem,
  Heading,
  Text,
  VStack
} from '@chakra-ui/react'
import Image from 'next/image'
import { ratingNumberToText } from '../../utils/ratingNumberToText'

type FoodSectionsProps = {
  tags: Array<{
    id: string
    tag_value: string
  }>
  foods: Array<{
    id: string
    name: string
    price: number
    image: string
    description: string
    tag: { id: string; tag_value: string }
    food_rating: Array<{ consumer_id: string; rating: number }>
  }>
}

export function FoodSections({ tags, foods }: FoodSectionsProps) {
  return (
    <VStack spacing="0" alignItems="flex-start" zIndex="0" paddingBottom="2rem">
      {tags.map(tag => {
        return foods
          .map(food => {
            if (tag.id === food.tag.id) {
              const rating =
                food.food_rating.length > 0
                  ? food.food_rating.reduce(function (acumulador, valorAtual) {
                      return acumulador + valorAtual.rating
                    }, 0) / food.food_rating.length
                  : undefined
              return (
                <Box key={tag.id} id={`section${tag.id}`} as="section">
                  <Heading
                    as="h3"
                    fontSize="1.5rem"
                    lineHeight="2.25rem"
                    paddingTop="2rem"
                    paddingBottom="1rem"
                  >
                    {tag.tag_value}
                  </Heading>
                  <Grid templateColumns="repeat(3, 1fr)" gridGap="24px 24px">
                    <Grid
                      templateColumns="repeat(3, 1fr)"
                      transitionDuration="0.4s"
                      transitionTimingFunction="ease-in-out"
                      transitionProperty="transform, box-shadow"
                      cursor="pointer"
                      _hover={{
                        transform: 'translateY(-3px)',
                        boxShadow: '0px 3px 0px 0px rgba(221,107,32,1)'
                      }}
                      background="brand.card_restaurant_background"
                    >
                      <GridItem
                        colSpan={2}
                        padding="1rem"
                        flexDirection="column"
                        justifyContent="space-between"
                      >
                        <Flex flexDirection="column">
                          <Text fontWeight="600" noOfLines={2}>
                            {food.name}
                          </Text>
                          <Text
                            fontSize="0.875rem"
                            noOfLines={2}
                            paddingTop="0.5rem"
                          >
                            {food.description}
                          </Text>
                        </Flex>
                        <Text>$ {food.price}</Text>
                      </GridItem>
                      <GridItem overflow="hidden" position="relative">
                        <Box
                          display={rating ? 'flex' : 'none'}
                          position="absolute"
                          borderBottom={`6px solid ${
                            ratingNumberToText(rating).color
                          }`}
                          zIndex="1"
                          top="0px"
                          right="0px"
                          backgroundColor="#fdfdfd"
                          boxSize="40px"
                          borderBottomLeftRadius="full"
                        >
                          <Text
                            position="absolute"
                            top="7px"
                            right="7px"
                            fontSize="14px"
                            lineHeight="14px"
                            fontWeight="600"
                          >
                            {rating}
                          </Text>
                        </Box>
                        <Image
                          objectFit="cover"
                          layout="fill"
                          src={food.image}
                          alt={food.name}
                        />
                      </GridItem>
                    </Grid>
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
