import { Box, Heading, VStack, Container } from '@chakra-ui/react'
import React from 'react'
import Image from 'next/image'
import { Tags } from './Tags'
import { Rating } from './Rating'
import { Delivery } from './Delivery'

type Coordinates = {
  lng: number
  lat: number
}
type TagInfo = {
  id: number
  value: string
}
type FoodRating = {
  rating: number
}
type FoodInfo = {
  id: number
  foodRating: Array<FoodRating>
}
type Restaurant = {
  id: number
  name: string
  coordinates: Coordinates
  image: string
  tags: Array<TagInfo>
  foods: Array<FoodInfo>
}
type RestaurantCardProps = {
  restaurant: Restaurant
  consumerLocation: Coordinates
}

export function RestaurantCard({
  restaurant,
  consumerLocation
}: RestaurantCardProps) {
  return (
    <Box
      w="15.625rem"
      position="relative"
      overflow="hidden"
      background="brand.card_restaurant_background"
    >
      <Box w="100%" h="9.375rem" position="relative">
        <Image
          src={restaurant.image}
          alt={restaurant.name}
          objectFit="cover"
          layout="fill"
        />
      </Box>

      <Container paddingX="1rem" paddingBottom="1rem">
        <VStack display="flex" alignItems="flex-start" spacing="0.5rem">
          <Heading
            as="h1"
            fontWeight="700"
            fontSize="1.1rem"
            lineHeight="1.1rem"
          >
            {restaurant.name}
          </Heading>

          <Tags tags={restaurant.tags} />

          <Rating foods={restaurant.foods} />

          <Delivery
            restaurantLocation={restaurant.coordinates}
            consumerLocation={consumerLocation}
          />
        </VStack>
      </Container>
    </Box>
  )
}
