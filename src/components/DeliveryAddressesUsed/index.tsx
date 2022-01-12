import { useContext, useEffect, useState } from 'react'
import { Box, Flex, Link as ChakraLink, Text, Spinner } from '@chakra-ui/react'
import { AuthContext } from '../../contexts/AuthContext'
import { supabase } from '../../utils/supabaseClient'
import { TOrder } from '../../types'
import { UserLocationContext } from '../../contexts/UserLocationContext'
import NextLink from 'next/link'

export function DeliveryAddressesUsed() {
  const { userData } = useContext(AuthContext)
  const { getUserLocation } = useContext(UserLocationContext)
  const [deliveryAddresses, setDeliveryAddresses] = useState<
    Array<{
      place_name: string | undefined
      place: string | undefined
      geohash: string
    }>
  >([])
  const [loadingAddresses, setLoadingAddresses] = useState(false)

  useEffect(() => {
    async function fetchDeliveryAddressesUsed() {
      if (userData) {
        setLoadingAddresses(true)
        setDeliveryAddresses([])

        const { data } = await supabase
          .from<TOrder>('orders')
          .select('*')
          .match({
            customer_id: userData.id,
            payment_intent_status: 'succeeded'
          })
          .order('updated_at', { ascending: false })

        if (data) {
          let result: Array<{
            place_name: string | undefined
            place: string | undefined
            geohash: string
          }> = []
          for (const order of data) {
            const response = await getUserLocation(
              order.shipping_options.shipping_geohash
            )
            result.push({
              place_name: response.place_name,
              place: response.place,
              geohash: response.geohash
            })
          }
          let removeDuplicates = [
            ...new Map(
              result.map(item => {
                return [item.geohash, item]
              })
            ).values()
          ]
          setDeliveryAddresses(removeDuplicates)
          setLoadingAddresses(false)
        }
      }
    }

    fetchDeliveryAddressesUsed()
  }, [userData])

  return (
    <>
      {(() => {
        if (!userData) {
          return (
            <Text>
              Sign in to see the delivery addresses you have already used
            </Text>
          )
        } else {
          if (loadingAddresses) {
            return (
              <Flex alignItems="center">
                <Text lineHeight="1rem">
                  Searching for the delivery addresses used
                </Text>
                <Spinner
                  marginLeft="0.5rem"
                  thickness="0.1rem"
                  speed="0.5s"
                  emptyColor="gray.50"
                  color="orange.500"
                  sx={{
                    '--spinner-size': '1rem'
                  }}
                />
              </Flex>
            )
          } else {
            if (deliveryAddresses.length > 0) {
              return (
                <Flex flexDirection="column" sx={{ gap: '0.5rem' }}>
                  <Box as="h3">
                    Addresses where we have already delivered for you
                  </Box>
                  <Flex
                    flexDirection="column"
                    height="16.5rem"
                    overflow="auto"
                    sx={{
                      scrollbarGutter: 'stable both-edges',
                      margin: '0px',
                      '::-webkit-scrollbar': {
                        width: '0.5rem'
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
                    {deliveryAddresses.map((item, index) => {
                      return (
                        <Flex
                          alignItems="center"
                          key={`${index}:${item.geohash}`}
                        >
                          <NextLink
                            href={`/restaurants?place=${item.place}&geohash=${item.geohash}`}
                            passHref
                          >
                            <ChakraLink
                              fontSize="0.8rem"
                              padding="0.5rem"
                              title={item.place_name}
                              _focus={{ boxShadow: 'none' }}
                            >
                              <Box>
                                <Text fontWeight="500" as="span">
                                  Address:{' '}
                                </Text>
                                <Text as="span">{item.place_name}</Text>
                              </Box>
                              <Box>
                                <Text fontWeight="500" as="span">
                                  Region:{' '}
                                </Text>
                                <Text as="span">{item.place}</Text>
                              </Box>
                            </ChakraLink>
                          </NextLink>
                        </Flex>
                      )
                    })}
                  </Flex>
                </Flex>
              )
            } else {
              return (
                <Flex flexDirection="column" sx={{ gap: '0.5rem' }}>
                  <Box as="h3">You have not made any purchases yet</Box>
                </Flex>
              )
            }
          }
        }
      })()}
    </>
  )
}
