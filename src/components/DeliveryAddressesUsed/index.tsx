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
            payment_intent_status: 'Concluído'
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
            <Text as="h3" fontSize="1rem" lineHeight="1rem" fontWeight="500">
              Inicie uma sessão para ver os endereços de entrega que você já
              utilizou
            </Text>
          )
        } else {
          if (loadingAddresses) {
            return (
              <Flex alignItems="center">
                <Text
                  as="h3"
                  fontSize="1rem"
                  lineHeight="1rem"
                  fontWeight="500"
                >
                  Pesquisando endereços de entrega
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
                  <Box
                    as="h3"
                    fontSize="1rem"
                    lineHeight="1rem"
                    fontWeight="500"
                  >
                    Endereços onde já entregamos para você
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
                              padding="0.5rem"
                              title={item.place_name}
                              _focus={{ boxShadow: 'none' }}
                            >
                              <Box>
                                <Text fontWeight="500" as="span">
                                  Endereço:{' '}
                                </Text>
                                <Text as="span">{item.place_name}</Text>
                              </Box>
                              <Box>
                                <Text fontWeight="500" as="span">
                                  Região:{' '}
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
                  <Box
                    as="h3"
                    fontSize="1rem"
                    lineHeight="1rem"
                    fontWeight="500"
                  >
                    Não encontramos nenhum endereço de entrega. Experimente
                    realizar alguns pedidos
                  </Box>
                </Flex>
              )
            }
          }
        }
      })()}
    </>
  )
}
