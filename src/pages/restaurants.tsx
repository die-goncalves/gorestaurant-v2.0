import { Box, Flex, Grid, Spinner } from '@chakra-ui/react'
import { GetServerSideProps } from 'next'
import React, { useContext, useMemo } from 'react'
import { useQuery } from 'react-query'
import { RestaurantHeader } from '../components/Header/Restaurant'
import { RestaurantCard } from '../components/RestaurantCard'
import { RestaurantsFilters } from '../components/RestaurantsFilters'
import { Sidebar } from '../components/Sidebar'
import { FilterContext } from '../contexts/FilterContext'
import { api } from '../services/api'
import { getTags } from '../utils/getTags'
import { supabase } from '../utils/supabaseClient'

type SupabaseResponseData = {
  id: number
  name: string
  coordinates: {
    lat: number
    lng: number
  }
  image: string
  tags: Array<{ id: number; value: string }>
  foods: Array<{ id: number; food_rating: Array<{ rating: number }> }>
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
  locality: string
  tags: Array<{
    id: number
    tag: string
    count: number
  }>
  geolocation: {
    lat: number
    lng: number
  }
}

export default function Restaurants({
  tags,
  locality,
  geolocation
}: RestaurantsProps) {
  const { tagOption, priceOption, sortOption, deliveryOption } =
    useContext(FilterContext)
  const { data, error, isLoading, isError } = useQuery(
    [
      deliveryOption,
      tagOption,
      priceOption,
      sortOption,
      geolocation.lng,
      geolocation.lat
    ],
    async () => {
      const { data } = await api.get(`/api/filters`, {
        params: {
          user_lng: geolocation.lng,
          user_lat: geolocation.lat,
          delivery: deliveryOption,
          tag: tagOption,
          delivery_price: priceOption,
          sort: sortOption
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
        <Sidebar
          userPlace={locality}
          tags={tags}
          isDelivery={deliveryOption === 'delivery' ? true : false}
        />
        <Flex as="main" w="100%" flexDirection="column" marginBottom="2rem">
          <RestaurantsFilters total={filteredData.length} />

          {(() => {
            if (isLoading)
              return (
                <Flex flex="1">
                  <Spinner
                    margin="auto"
                    color="orange.300"
                    thickness="0.5rem"
                    boxSize="5rem"
                  />
                </Flex>
              )
            else if (isError) return <Box>Error: {error}</Box>
            else if (filteredData) {
              return (
                <>
                  <Grid
                    templateColumns="repeat(3, 1fr)"
                    gap="2rem"
                    marginY="2rem"
                  >
                    {filteredData.map(restaurant => (
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
  const { lng, lat } = ctx.query

  const { data } = await supabase.from('restaurant').select(
    `
      tags ( id, value: tag_value )
    `
  )
  const tags = data ? getTags(data) : []

  return {
    props: {
      locality: ctx.query.locality,
      tags,
      geolocation: { lng, lat }
    }
  }
}
