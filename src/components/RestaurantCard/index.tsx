import { Box, Heading, VStack, Container } from '@chakra-ui/react'
import React, { useContext } from 'react'
import Image from 'next/image'
import { Tags } from './Tags'
import { Delivery } from './Delivery'
import { useRouter } from 'next/router'
import { FilterContext } from '../../contexts/FilterContext'
import { Rating } from '../Rating'

type Restaurant = {
  id: string
  name: string
  coordinates: {
    lat: number
    lng: number
  }
  image: string
  foods: Array<{
    id: string
    tag: { id: string; tag_value: string }
    food_rating: Array<{ consumer_id: string; rating: number }>
  }>
  rating: number | undefined
  reviews: number
  delivery_time?: number
  delivery_price?: number
}

type RestaurantCardProps = {
  restaurant: Restaurant
}

export function RestaurantCard({ restaurant }: RestaurantCardProps) {
  const router = useRouter()
  const { geographicLocation } = useContext(FilterContext)

  return (
    <Box
      position="relative"
      overflow="hidden"
      background="brand.card_restaurant_background"
      transitionDuration="0.4s"
      transitionTimingFunction="ease-in-out"
      transitionProperty="transform, box-shadow"
      cursor="pointer"
      onClick={() => {
        router.push(
          `/restaurant/${restaurant.id}?geohash=${geographicLocation?.geohash}`
        )
      }}
      _hover={{
        transform: 'translateY(-3px)',
        boxShadow: '0px 3px 0px 0px rgba(221,107,32,1)'
      }}
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

          <Tags
            tags={restaurant.foods.map(food => {
              if (food.tag)
                return {
                  id: food.tag.id,
                  value: food.tag.tag_value
                }
            })}
          />

          <Rating
            value={restaurant.rating}
            critics={restaurant.reviews}
            fontSize="16px"
            starSize="16px"
            oneStar
          />

          <Delivery
            deliveryPrice={restaurant.delivery_price}
            deliveryTime={restaurant.delivery_time}
          />
        </VStack>
      </Container>
    </Box>
  )
}
