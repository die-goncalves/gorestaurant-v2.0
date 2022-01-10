import { Box, Flex, Grid, Heading, HStack, Text } from '@chakra-ui/react'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { FaWhatsapp } from 'react-icons/fa'
import Image from 'next/image'
import { RestaurantStatus } from '../RestaurantStatus'
import { Rating } from '../Rating'
import { RestaurantPaths } from '../RestaurantPaths'
import { UserLocationContext } from '../../contexts/UserLocationContext'
import { getRouteTimeAndDistance } from '../../utils/directionsMapBox'
import { ModalToChangeLocation } from './ModalToChangeLocation'
import { ModalForNonInteractionMap } from './ModalForNonInteractionMap'
import { ratingNumberToText } from '../../utils/ratingNumberToText'
import { overallRatingRestaurant } from '../../utils/overallRatingRestaurant'
import { groupTags } from '../../utils/tags'
import { setCookie } from 'nookies'
import { TRestaurant, TFoods, TFoodRating, TOperatingHours } from '../../types'

type Restaurant = Omit<TRestaurant, 'created_at' | 'updated_at'> & {
  operating_hours: Array<Omit<TOperatingHours, 'restaurant_id'>>
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
}

type RestaurantPresentationProps = {
  restaurant: Restaurant
}

export function RestaurantPresentation({
  restaurant
}: RestaurantPresentationProps) {
  const { userLocation } = useContext(UserLocationContext)
  const [priceDistanceAndTime, setPriceDistanceAndTime] =
    useState<{ price: number | undefined; distance: number; time: number }>()

  const rating = useRef<{
    overallRating: number | undefined
    numberRatings: number
    text: string
    color: string
  }>()
  const tags = useRef<Array<string>>()

  const infoRating = overallRatingRestaurant([...restaurant.foods])
  const transformRating = ratingNumberToText(infoRating.overallRating)
  rating.current = {
    overallRating: infoRating.overallRating,
    numberRatings: infoRating.numberRatings,
    text: transformRating.text,
    color: transformRating.color
  }
  tags.current = groupTags(restaurant.foods)

  useEffect(() => {
    const deliveryInfo = async () => {
      if (userLocation) {
        const result = await getRouteTimeAndDistance(
          {
            lng: userLocation.coordinates.longitude,
            lat: userLocation.coordinates.latitude
          },
          { lng: restaurant.coordinates.lng, lat: restaurant.coordinates.lat }
        )
        setPriceDistanceAndTime({
          price: Math.round(result.distance / 1000) * 0.12,
          distance: result.distance,
          time: result.duration
        })
        setCookie(
          null,
          '@GoRestaurant:shipping',
          JSON.stringify({
            price: (Math.round(result.distance / 1000) * 0.12).toFixed(2),
            distance: (result.distance / 1000).toFixed(2),
            time: (result.duration / 60).toFixed(2),
            user_location: userLocation
          }),
          {
            maxAge: 60 * 60 * 24 * 30,
            path: '/'
          }
        )
      }
    }
    deliveryInfo()
  }, [userLocation])

  return (
    <Grid
      paddingX="2rem"
      w="100%"
      h="min-content"
      templateColumns="2fr 1fr"
      gap={0}
    >
      <Box marginBottom="1rem" marginRight="2rem">
        <RestaurantPaths
          restaurantName={restaurant.name}
          place={restaurant.place}
        />
        <Flex marginTop="0.75rem" alignItems="center" sx={{ gap: '1rem' }}>
          <Heading as="h1" fontSize="1.75rem" fontWeight="bold">
            {restaurant.name}
          </Heading>
          <RestaurantStatus operatingHours={restaurant.operating_hours} />
        </Flex>

        <Flex
          marginTop="0.5rem"
          display="flex"
          alignItems="center"
          sx={{
            gap: '0.25rem'
          }}
        >
          <Rating
            value={rating.current?.overallRating}
            critics={rating.current.numberRatings}
            starSize="1.2rem"
            fontSize="1rem"
          />
        </Flex>

        <HStack
          display="flex"
          flexWrap="wrap"
          paddingTop="0.5rem"
          divider={
            <Box boxSize="5px" background="gray.300" borderRadius="full" />
          }
          spacing={2}
        >
          {tags.current?.map(tag => (
            <Text lineHeight="1.5rem" key={tag}>
              {tag}
            </Text>
          ))}
        </HStack>

        <HStack
          whiteSpace="nowrap"
          spacing={2}
          paddingTop="0.5rem"
          divider={
            <Box boxSize="5px" background="gray.300" borderRadius="full" />
          }
        >
          <Box>{`${priceDistanceAndTime?.distance.toFixed(
            2
          )} meters away from you`}</Box>
          <Box>{`$ ${priceDistanceAndTime?.price?.toFixed(2)} to deliver`}</Box>
        </HStack>
        <Box paddingTop="0.5rem">
          <Text lineHeight="1.5rem">{restaurant.description}</Text>
        </Box>

        <Flex paddingTop="0.5rem">
          <ModalForNonInteractionMap
            coordinates={restaurant.coordinates}
            address={restaurant.address}
          />
          <Text lineHeight="1.5rem" marginLeft="0.25rem">
            {restaurant.address}
          </Text>
        </Flex>
        <Flex paddingTop="0.5rem">
          <FaWhatsapp fontSize="25px" color="#38A169" />
          <Text lineHeight="1.5rem" marginLeft="0.25rem">
            {restaurant.phone_number}
          </Text>
        </Flex>
      </Box>

      <Box>
        <Flex position="relative" h="256px">
          <Image
            src={restaurant.image}
            alt={restaurant.name}
            objectFit="cover"
            layout="fill"
          />
        </Flex>
        <ModalToChangeLocation
          restaurantId={restaurant.id}
          restaurantPlace={restaurant.place}
          deliveryTime={priceDistanceAndTime?.time}
        />
      </Box>
    </Grid>
  )
}
