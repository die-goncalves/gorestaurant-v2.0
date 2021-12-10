import { Box, Flex, Grid, Spinner } from '@chakra-ui/react'
import { GetServerSideProps } from 'next'
import React, { useContext, useEffect, useMemo } from 'react'
import { useQuery } from 'react-query'
import { RestaurantHeader } from '../components/Header/Restaurant'
import { RestaurantCard } from '../components/RestaurantCard'
import { RestaurantsFilters } from '../components/RestaurantsFilters'
import { Sidebar } from '../components/Sidebar'
import { FilterContext } from '../contexts/FilterContext'
import { api } from '../services/api'
import { tagListingForFiltering } from '../utils/tags'
import { supabase } from '../utils/supabaseClient'
import { Restaurant, LocationContext } from '../contexts/LocationContext'

type SupabaseResponseData = {
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
}

type PickUpData = {
  rating: number | undefined
  reviews: number
  delivery_time: number
} & SupabaseResponseData

type DeliveryData = {
  rating: number | undefined
  reviews: number
  delivery_time: number
  delivery_price: number
} & SupabaseResponseData

type RestaurantsProps = {
  geohash: string
  tags: Array<{
    id: string
    tag: string
    count: number
  }>
}

export default function Restaurants({ geohash, tags }: RestaurantsProps) {
  const {
    geographicLocation,
    setGeographicLocation,
    tagOption,
    priceOption,
    sortOption,
    deliveryOption
  } = useContext(FilterContext)
  const { decodeGeohash, generateGeographicInformation } =
    useContext(LocationContext)

  useEffect(() => {
    const { latitude, longitude } = decodeGeohash(geohash)
    fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?limit=1&access_token=${process.env.NEXT_PUBLIC_MAPBOX_TOKEN}`
    )
      .then(response => response.json())
      .then(data => {
        const { granular, place, place_name } = generateGeographicInformation(
          data.features[0]
        )
        setGeographicLocation({
          place_name,
          granular,
          geohash,
          place,
          coordinates: { latitude, longitude }
        })
      })
  }, [geohash])

  const { data, error, isLoading, isError } = useQuery<
    Array<PickUpData | DeliveryData>,
    Error
  >(
    [
      deliveryOption,
      tagOption,
      priceOption,
      sortOption,
      geographicLocation?.coordinates.longitude,
      geographicLocation?.coordinates.latitude,
      geographicLocation?.place
    ],
    async () => {
      const { data } = await api.get(`/api/filters`, {
        params: {
          user_lng: geographicLocation?.coordinates.longitude,
          user_lat: geographicLocation?.coordinates.latitude,
          delivery: deliveryOption,
          tag: tagOption,
          delivery_price: priceOption,
          sort: sortOption,
          place: geographicLocation?.place
        }
      })
      return data
    },
    {
      staleTime: 24 * 60 * 60 * 1000
    }
  )

  const filteredData = useMemo<Array<PickUpData> | Array<DeliveryData>>(() => {
    if (data) return data
    return []
  }, [data])

  return (
    <Box
      maxHeight="100vh"
      overflow="auto"
      sx={{
        scrollbarGutter: 'stable both-edges',
        '::-webkit-scrollbar': {
          width: '10px'
        },
        '::-webkit-scrollbar-thumb': {
          background: 'scrollbar.thumb_color',
          transition: '5s all ease-in-out',
          '&:hover': {
            background: 'scrollbar.thumb_hover_color'
          }
        },
        '::-webkit-scrollbar-track': {
          background: 'brand.body_background'
        }
      }}
    >
      <RestaurantHeader />

      <Flex marginX="2rem">
        <Sidebar tags={tags} />
        <Flex as="main" w="82.5vw" flexDirection="column" marginBottom="2rem">
          <RestaurantsFilters total={filteredData.length} />

          {(() => {
            if (isLoading) {
              return (
                <Flex marginY="2rem" flex="1">
                  <Spinner
                    margin="auto"
                    color="orange.300"
                    thickness="0.5rem"
                    boxSize="5rem"
                  />
                </Flex>
              )
            } else if (isError) {
              return <Box>Error: {error?.message}</Box>
            } else if (filteredData) {
              return (
                <>
                  <Grid
                    templateColumns="repeat(3, 1fr)"
                    gap="2rem"
                    marginY="2rem"
                  >
                    {filteredData.length > 0 &&
                      filteredData.map(restaurant => (
                        <RestaurantCard
                          key={restaurant.id}
                          restaurant={restaurant}
                        />
                      ))}
                  </Grid>
                </>
              )
            }
          })()}
        </Flex>
      </Flex>
    </Box>
  )
}

export const getServerSideProps: GetServerSideProps = async ctx => {
  const { place } = ctx.query
  const { data } = await supabase
    .from<Restaurant>('gr_restaurants')
    .select('foods: gr_foods ( tag ( * ) )')
    .filter('place', 'eq', place)

  const tags = data ? tagListingForFiltering(data) : []

  return {
    props: {
      geohash: ctx.query.geohash,
      tags
    }
  }
}
