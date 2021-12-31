import { useContext, useEffect, useState } from 'react'
import { Box, Flex, Grid, Spinner } from '@chakra-ui/react'
import { AuthContext } from '../../contexts/AuthContext'
import { supabase } from '../../utils/supabaseClient'
import { HomeHeader } from '../../components/Header/Home'
import DashboardSidebar from '../../components/DashboardSidebar'
import { GetServerSideProps } from 'next'
import Router from 'next/router'
import { Payment } from '../../components/Payment'

type IndividualPayment = {
  payment_intent_id: string
  payment_intent_status: string
  created_at: string
  updated_at: string
  line_items: {
    food_id: string
    quantity: number
    food: {
      name: string
      price: number
      restaurant: {
        name: string
      }
    }
  }[]
  shipping_options: {
    shipping_amount: number
    shipping_address: string
    shipping_geohash: string
  }
}

export default function DashboardOrders() {
  const { userData } = useContext(AuthContext)
  const [payments, setPayments] = useState<IndividualPayment[] | undefined>(
    undefined
  )
  const [loadData, setLoadData] = useState(true)

  useEffect(() => {
    async function fetchPayments() {
      if (userData) {
        const { data } = await supabase
          .from('gr_orders')
          .select('*')
          .eq('customer_id', userData.id)

        if (data) {
          let result = data
          let indexPayment = 0
          for (const payment of data) {
            let index = 0
            for (const item of payment.line_items) {
              const currentFood = await supabase
                .from('gr_foods')
                .select(`*, restaurant ( * )`)
                .eq('id', item.food_id)
              if (currentFood.data) {
                result[indexPayment].line_items[index].food =
                  currentFood.data[0]
              }
              index += 1
            }
            indexPayment += 1
          }
          setPayments(result)
        }
      }
    }

    if (userData === null) {
      Router.push('/')
    }

    fetchPayments()
  }, [userData])

  useEffect(() => {
    if (payments) setLoadData(false)
  }, [payments])

  return (
    <Box>
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
            <Grid gap="1rem">
              {payments &&
                payments.map(payment => (
                  <Payment key={payment.payment_intent_id} payment={payment} />
                ))}
            </Grid>
          </Box>
        )}
      </Flex>
    </Box>
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