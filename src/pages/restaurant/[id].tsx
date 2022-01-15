import { Box, Flex } from '@chakra-ui/react'
import { GetStaticPaths, GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import { supabase } from '../../utils/supabaseClient'
import { RestaurantHeader } from '../../components/Header/Restaurant'
import { useState, useEffect, useContext } from 'react'
import { RestaurantPresentation } from '../../components/RestaurantPresentation'
import RestaurantSections from '../../components/RestaurantSections'
import { UserLocationContext } from '../../contexts/UserLocationContext'
import { Footer } from '../../components/Footer'
import { TRestaurant, TFoods, TFoodRating, TOperatingHours } from '../../types'
import { whenOpen } from '../../utils/restaurantOperation'

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

type RestaurantProps = {
  restaurant: Restaurant
}

export default function Restaurant({ restaurant }: RestaurantProps) {
  const { getUserLocation, setUserLocation } = useContext(UserLocationContext)
  const [isRestaurantOpen, setIsRestaurantOpen] =
    useState<{ open: boolean; for_coming?: any; current?: any }>()
  const router = useRouter()

  useEffect(() => {
    setIsRestaurantOpen(
      whenOpen(restaurant.operating_hours, {
        day: new Date().getDay(),
        timer: new Date().toLocaleTimeString()
      })
    )
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      const result = await getUserLocation(
        new URLSearchParams(window.location.search).get('geohash')
      )

      setUserLocation(result)
    }
    fetchData()
  }, [router.query.geohash])

  if (router.isFallback) {
    return <Box>Carregando...</Box>
  }

  return (
    <Box
      maxHeight="100vh"
      overflow="auto"
      sx={{
        scrollbarGutter: 'stable',
        margin: '0px',
        '::-webkit-scrollbar': {
          width: '0.625rem'
        },
        '::-webkit-scrollbar-thumb': {
          background: 'scrollbar.thumb_color',
          '&:hover': {
            background: 'scrollbar.thumb_hover_color'
          }
        },
        '::-webkit-scrollbar-track': {
          background: 'brand.body_background'
        }
      }}
    >
      <Box minH="100vh">
        <RestaurantHeader />

        <RestaurantPresentation
          restaurant={restaurant}
          isRestaurantOpen={isRestaurantOpen}
        />

        <RestaurantSections
          foods={restaurant.foods}
          isRestaurantOpen={isRestaurantOpen}
        />
      </Box>

      <Footer />
    </Box>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  let paths: {
    params: { id: string }
  }[] = []

  const { data, error } = await supabase
    .from<TRestaurant>('restaurants')
    .select('*')

  if (data) {
    paths = data.map(restaurant => {
      return {
        params: {
          id: restaurant.id
        }
      }
    })
  }

  return {
    paths,
    fallback: true
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  if (params) {
    const { id } = params

    const { data, error } = await supabase
      .from<Restaurant>('restaurants')
      .select(
        `
          *,
          foods (
            *,
            food_rating ( * )
          ),
          operating_hours (
            id,
            start_hour,
            end_hour,
            weekday
          )
        `
      )
      .match({ id: id })
      .single()

    if (data) {
      const restaurant: Restaurant = {
        id: data.id,
        name: data.name,
        image: data.image,
        phone_number: data.phone_number,
        address: data.address,
        coordinates: data.coordinates,
        operating_hours: data.operating_hours,
        foods: data.foods.map(food => {
          return {
            id: food.id,
            name: food.name,
            description: food.description,
            image: food.image,
            price: food.price,
            tag: food.tag,
            food_rating: food.food_rating.map(food_rating => ({
              customer_id: food_rating.customer_id,
              rating: food_rating.rating
            }))
          }
        }),
        place: data.place,
        description: data.description
      }

      return {
        props: { restaurant }
      }
    }
  }
  return {
    props: {}
  }
}
