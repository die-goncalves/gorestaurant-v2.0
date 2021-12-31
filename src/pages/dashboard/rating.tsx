import { useContext, useEffect, useState } from 'react'
import { Box, Flex, Grid, Spinner } from '@chakra-ui/react'
import { AuthContext } from '../../contexts/AuthContext'
import { supabase } from '../../utils/supabaseClient'
import { HomeHeader } from '../../components/Header/Home'
import DashboardSidebar from '../../components/DashboardSidebar'
import Router from 'next/router'
import { GetServerSideProps } from 'next'
import { FoodRatingCard } from '../../components/FoodRatingCard'

export default function DashboardRating() {
  const { userData } = useContext(AuthContext)
  const [foodsAvailableForRating, setFoodsAvailableForRating] = useState<
    Array<{
      id: string
      name: string
      image: string
      restaurant: { name: string }
    }>
  >()
  const [loadData, setLoadData] = useState(true)

  useEffect(() => {
    async function fetchFoodsAvailableForRating() {
      if (userData) {
        const { data } = await supabase
          .from('gr_orders')
          .select('*')
          .eq('customer_id', userData.id)

        if (data) {
          const foodPayments = data.reduce((acc, current) => {
            const x = current.line_items.map((item: { food_id: string }) => {
              if (current.payment_intent_status === 'succeeded')
                return item.food_id
            })
            if (x[0] !== undefined) acc.push(x)

            return acc
          }, [])

          const foodAvailable = [...new Set(foodPayments.flat())]

          let result: Array<{
            id: string
            name: string
            image: string
            restaurant: { name: string }
          }> = []
          for (const foodId of foodAvailable) {
            const currentFood = await supabase
              .from('gr_foods')
              .select(`*, restaurant ( * )`)
              .eq('id', foodId)
            if (currentFood.data) {
              result.push(currentFood.data[0])
            }
          }
          setFoodsAvailableForRating(result)
        }
      }
    }

    if (userData === null) {
      Router.push('/')
    }

    fetchFoodsAvailableForRating()
  }, [userData])

  useEffect(() => {
    if (foodsAvailableForRating) setLoadData(false)
  }, [foodsAvailableForRating])

  return (
    <>
      <HomeHeader />

      <Flex height="calc(100vh - 4.5rem)">
        <Flex paddingY="1rem" paddingLeft="3.75rem">
          <DashboardSidebar />
        </Flex>

        {loadData ? (
          <Flex flex="1" alignItems="center" justifyContent="center">
            <Spinner
              thickness="0.125rem"
              speed="0.5s"
              emptyColor="gray.50"
              color="orange.600"
              size="xl"
              sx={{
                '--spinner-size': '5rem'
              }}
            />
          </Flex>
        ) : (
          <Box
            width="100%"
            maxHeight="100vh"
            padding="0rem 3.125rem 1rem 0rem"
            overflow="auto"
            sx={{
              scrollbarGutter: 'stable',
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
            <Grid gap="2rem" templateColumns="repeat(4, 1fr)">
              {foodsAvailableForRating &&
                foodsAvailableForRating.map(food => (
                  <FoodRatingCard key={food.id} food={food} />
                ))}
            </Grid>
          </Box>
        )}
      </Flex>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ctx => {
  const infos = await supabase.auth.api.getUserByCookie(ctx.req)

  if (infos.user === null) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  return {
    props: {}
  }
}
