import { Box, Heading, VStack, Container } from '@chakra-ui/react'
import React from 'react'
import Image from 'next/image'
import { Tags } from './Tags'
import { Rating } from './Rating'
import { Delivery } from './Delivery'

type Restaurant = {
  id: number
  name: string
  coordinates: {
    lat: number
    lng: number
  }
  image: string
  tags: Array<{ id: number; value: string }>
  foods: Array<{ id: number; food_rating: Array<{ rating: number }> }>
  rating: number | undefined
  reviews: number
  delivery_time?: number
  delivery_price?: number
}

type RestaurantCardProps = {
  restaurant: Restaurant
}

export function RestaurantCard({ restaurant }: RestaurantCardProps) {
  return (
    <Box
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

      <Container padding="0.5rem">
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

          <Rating rating={restaurant.rating} reviews={restaurant.reviews} />

          <Delivery
            deliveryPrice={restaurant.delivery_price}
            deliveryTime={restaurant.delivery_time}
          />
        </VStack>
      </Container>
    </Box>
  )
}
