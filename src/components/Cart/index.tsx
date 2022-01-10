import {
  Flex,
  Button,
  CloseButton,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  useDisclosure,
  ButtonGroup
} from '@chakra-ui/react'
import { useContext, useEffect, useState } from 'react'
import { RiRestaurant2Line } from 'react-icons/ri'
import { IoMdAdd, IoMdRemove } from 'react-icons/io'
import { useCart } from '../../hooks/useCart'
import Image from 'next/image'
import { formatNumber } from '../../utils/formatNumber'
import { api } from '../../services/api'
import { getStripeJs } from '../../services/stripe-js'
import { AuthContext } from '../../contexts/AuthContext'
import { TRestaurant, TFoods, TFoodRating } from '../../types'

type Food = Omit<TFoods, 'restaurant_id' | 'created_at' | 'updated_at'> & {
  amount: number
  restaurant: Pick<TRestaurant, 'id' | 'name' | 'image'>
  food_rating: Array<Pick<TFoodRating, 'customer_id' | 'rating'>>
}

export function Cart() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [numberOfItemsInCart, setNumberOfItemsInCart] = useState<number>()
  const [total, setTotal] = useState<number>()
  const [separateData, setSeparateData] = useState<{
    [key: string]: Array<Food>
  }>({})
  const { cart, addFood, removeFood } = useCart()
  const { userData } = useContext(AuthContext)

  useEffect(() => {
    setNumberOfItemsInCart(
      cart.reduce((acc, currentItem) => {
        return (acc += currentItem.amount)
      }, 0)
    )
    setTotal(
      cart.reduce(
        (acc, currentItem) => (acc += currentItem.amount * currentItem.price),
        0
      )
    )
    setSeparateData(
      cart.reduce<{ [key: string]: Array<Food> }>(function (acc, obj) {
        let key = obj['restaurant'].name
        if (!acc[key]) {
          acc[key] = []
        }
        acc[key].push(obj)
        return acc
      }, {})
    )
  }, [cart])

  function handleAddFood(id: string) {
    addFood(id)
  }

  function handleRemoveFood(id: string) {
    removeFood(id)
  }

  async function handleSubscribe() {
    try {
      const response = await api.post('/api/checkout')
      const { sessionId } = response.data
      const stripe = await getStripeJs()
      if (stripe) await stripe.redirectToCheckout({ sessionId })
    } catch (error) {
      alert(JSON.stringify(error, null, 4))
    }
  }

  return (
    <>
      <Button
        padding="0"
        variant="ghost"
        colorScheme="orange"
        borderRadius="full"
        sx={{
          _focus: {
            boxShadow: 'inset 0 0 0 1px rgb(192, 86, 33)'
          }
        }}
        onClick={onOpen}
      >
        <Flex position="relative">
          <RiRestaurant2Line fontSize="24px" />
          {typeof numberOfItemsInCart !== undefined &&
            numberOfItemsInCart !== 0 && (
              <Flex
                position="absolute"
                top="0px"
                right="0px"
                transform="translate(50%, -50%)"
                boxSize="1.5rem"
                background="#C05621"
                display="flex"
                justifyContent="center"
                alignItems="center"
                boxShadow="0px 0px 0px 2.5px #FDFDFD"
                borderRadius="full"
              >
                <Text
                  fontSize="0.75rem"
                  lineHeight="0.75rem"
                  fontWeight="600"
                  color="#FFFAF0"
                >
                  {typeof numberOfItemsInCart === 'number'
                    ? numberOfItemsInCart > 99
                      ? '+99'
                      : numberOfItemsInCart
                    : ''}
                </Text>
              </Flex>
            )}
        </Flex>
      </Button>

      <Modal
        closeOnOverlayClick={false}
        isOpen={isOpen}
        onClose={onClose}
        isCentered
        scrollBehavior="inside"
        size="lg"
      >
        <ModalOverlay />
        <ModalContent borderRadius="0px">
          <ModalHeader
            display="flex"
            justifyContent="space-between"
            padding="1rem"
          >
            <Text>Cart</Text>
            <CloseButton onClick={onClose} variant="red-theme" />
          </ModalHeader>
          <ModalBody
            display="flex"
            flexDirection="column"
            margin="0"
            paddingX="0.625rem"
            position="relative"
            sx={{
              gap: '1rem',
              scrollbarGutter: 'stable both-edges',
              '::-webkit-scrollbar': {
                width: '0.375rem'
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
            {cart.length === 0 && (
              <Flex
                position="relative"
                w="100%"
                h="15rem"
                sx={{
                  '&:last-child': {
                    opacity: 1,
                    filter: 'contrast(1.5)'
                  }
                }}
              >
                <Flex
                  position="absolute"
                  w="inherit"
                  h="inherit"
                  zIndex="1"
                  boxShadow="inset 0px 0px 45px 45px #FFFFFF"
                />
                <Image
                  objectFit="cover"
                  layout="fill"
                  src="https://images.unsplash.com/photo-1624811533744-f85d5325d49c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                  alt="No food in the cart"
                />
              </Flex>
            )}
            {Object.entries(separateData).map(item => (
              <Flex key={item[1][0].restaurant.id} w="100%" flexDir="column">
                <Flex position="relative" w="100%">
                  <Flex
                    w="100%"
                    h="4rem"
                    position="relative"
                    sx={{
                      '& > div': { opacity: 0.25, filter: 'contrast(1.5)' }
                    }}
                  >
                    <Image
                      objectFit="cover"
                      layout="fill"
                      src={item[1][0].restaurant.image}
                      alt={item[1][0].restaurant.name}
                    />
                  </Flex>
                  <Flex
                    w="100%"
                    h="100%"
                    position="absolute"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Text
                      fontSize="1.5rem"
                      lineHeight="1.5rem"
                      fontWeight="700"
                      fontStyle="italic"
                      textAlign="center"
                    >
                      {item[0]}
                    </Text>
                  </Flex>
                </Flex>
                <Flex
                  marginTop="0.5rem"
                  sx={{ gap: '0.5rem' }}
                  flexDir="column"
                >
                  {item[1].map(food => (
                    <Flex
                      key={food.id}
                      boxShadow="inset 0px 0px 2px 0px rgb(237, 137, 54)"
                    >
                      <Flex w="3.75rem" h="3.75rem" position="relative">
                        <Image
                          objectFit="cover"
                          layout="fill"
                          src={food.image}
                          alt={food.name}
                        />
                      </Flex>
                      <Flex
                        flex="1"
                        paddingX="0.5rem"
                        alignItems="center"
                        justifyContent="space-between"
                      >
                        <Text
                          fontSize="1.125rem"
                          lineHeight="1.125rem"
                          fontWeight="600"
                        >
                          {food.name}
                        </Text>
                        <ButtonGroup spacing="0.5rem">
                          <Button
                            minWidth="1.125rem"
                            height="1.125rem"
                            padding="0px"
                            variant="ghost"
                            colorScheme="red"
                            borderRadius="0px"
                            sx={{
                              _focus: {
                                boxShadow: '0 0 0 3px rgb(245, 101, 101, 0.6)'
                              }
                            }}
                            onClick={() => handleRemoveFood(food.id)}
                          >
                            <IoMdRemove fontSize="1.125rem" />
                          </Button>
                          <Flex
                            fontSize="1.125rem"
                            fontWeight="600"
                            lineHeight="1.125rem"
                            alignSelf="center"
                          >
                            {food.amount}
                          </Flex>
                          <Button
                            minWidth="1.125rem"
                            height="1.125rem"
                            variant="ghost"
                            colorScheme="green"
                            borderRadius="0px"
                            padding="0px"
                            sx={{
                              _focus: {
                                boxShadow: '0 0 0 3px rgb(72, 187, 120, 0.6)'
                              }
                            }}
                            onClick={() => handleAddFood(food.id)}
                          >
                            <IoMdAdd fontSize="1.125rem" />
                          </Button>
                        </ButtonGroup>
                      </Flex>
                    </Flex>
                  ))}
                </Flex>
              </Flex>
            ))}
          </ModalBody>

          <ModalFooter padding="1rem" display="flex" alignItems="center">
            <Flex flex="1" flexDirection="column">
              <Flex justifyContent="space-between">
                <Flex w="70px">
                  <Text fontWeight="700" margin="auto">
                    TOTAL
                  </Text>
                </Flex>
                <Text fontWeight="600">
                  {formatNumber({
                    options: { currency: 'USD' },
                    numberToBeFormatted: total ? total : 0
                  })}
                </Text>
              </Flex>
              <Flex justifyContent="flex-end">
                <ButtonGroup spacing="3px" marginTop="0.5rem">
                  <Button
                    colorScheme="red"
                    variant="ghost"
                    borderRadius="0px"
                    sx={{
                      _focus: {
                        boxShadow: '0 0 0 3px rgb(245, 101, 101, 0.6)'
                      }
                    }}
                    onClick={onClose}
                  >
                    Cancel
                  </Button>
                  <Button
                    borderRadius="0px"
                    sx={{
                      _focus: {
                        boxShadow: userData
                          ? '0 0 0 3px rgb(72, 187, 120, 0.6)'
                          : '0 0 0 3px rgb(237, 137, 54, 0.6)'
                      }
                    }}
                    {...(userData
                      ? cart.length === 0
                        ? {
                            colorScheme: 'green',
                            isDisabled: true,
                            variant: 'outline'
                          }
                        : { colorScheme: 'green', onClick: handleSubscribe }
                      : {
                          colorScheme: 'red',
                          isDisabled: true,
                          variant: 'outline'
                        })}
                  >
                    {userData
                      ? cart.length === 0
                        ? 'Add foods in the cart'
                        : 'Confirm'
                      : 'You are not signed up'}
                  </Button>
                </ButtonGroup>
              </Flex>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
