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
import { useEffect, useState } from 'react'
import { RiRestaurant2Line } from 'react-icons/ri'
import { IoMdAdd, IoMdRemove } from 'react-icons/io'
import { useCart } from '../../hooks/useCart'
import Image from 'next/image'
import { formatNumber } from '../../utils/formatNumber'

export function Cart() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [numberOfItemsInCart, setNumberOfItemsInCart] = useState<number>()
  const [total, setTotal] = useState<number>()
  const { cart, addFood, removeFood } = useCart()

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
  }, [cart])

  function handleAddFood(id: string) {
    addFood(id)
  }

  function handleRemoveFood(id: string) {
    removeFood(id)
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
            boxShadow: '0 0 0 3px rgb(237, 137, 54, 0.6)'
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
              >
                <Text
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  padding={
                    String(numberOfItemsInCart).split('').length > 1
                      ? '0.2rem'
                      : '0.2rem 0.4rem'
                  }
                  fontSize="1rem"
                  lineHeight="1rem"
                  fontWeight="600"
                  borderRadius="full"
                  border="1px solid #C05621"
                  bg="orange.50"
                >
                  {numberOfItemsInCart}
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
            <Text>Checkout</Text>
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
            {cart.map(item => (
              <Flex
                key={`${item.id}`}
                flex="1"
                h="70px"
                alignItems="center"
                boxShadow="inset 0px 0px 0px 1px #000000"
              >
                <Flex w="70px" h="70px" position="relative">
                  <Image
                    objectFit="cover"
                    layout="fill"
                    src={item.image}
                    alt={item.name}
                  />
                </Flex>
                <Flex flex="1" flexDirection="column" paddingX="0.5rem">
                  <Text
                    fontSize="0.9rem"
                    lineHeight="0.9rem"
                    fontWeight="500"
                    fontStyle="italic"
                  >
                    Restaurant {item.restaurant.name}
                  </Text>
                  <Flex justifyContent="space-between">
                    <Text
                      fontSize="1rem"
                      lineHeight="1rem"
                      fontWeight="700"
                      marginTop="0.5rem"
                    >
                      {item.name}
                    </Text>
                    <ButtonGroup spacing="0.5rem">
                      <Button
                        minWidth="24px"
                        height="24px"
                        padding="0px"
                        variant="ghost"
                        colorScheme="red"
                        borderRadius="full"
                        sx={{
                          _focus: {
                            boxShadow: '0 0 0 3px rgb(245, 101, 101, 0.6)'
                          }
                        }}
                        onClick={() => handleRemoveFood(item.id)}
                      >
                        <IoMdRemove fontSize="16px" />
                      </Button>
                      <Flex
                        fontSize="1rem"
                        fontWeight="600"
                        lineHeight="1rem"
                        alignSelf="center"
                      >
                        {item.amount}
                      </Flex>
                      <Button
                        minWidth="24px"
                        height="24px"
                        variant="ghost"
                        colorScheme="green"
                        borderRadius="full"
                        padding="0px"
                        sx={{
                          _focus: {
                            boxShadow: '0 0 0 3px rgb(72, 187, 120, 0.6)'
                          }
                        }}
                        onClick={() => handleAddFood(item.id)}
                      >
                        <IoMdAdd fontSize="16px" />
                      </Button>
                    </ButtonGroup>
                  </Flex>
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
                    colorScheme="green"
                    variant="solid"
                    borderRadius="0px"
                    sx={{
                      _focus: {
                        boxShadow: '0 0 0 3px rgb(72, 187, 120, 0.6)'
                      }
                    }}
                  >
                    Confirm
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
