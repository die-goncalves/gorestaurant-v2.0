import {
  Box,
  Button,
  ButtonGroup,
  CloseButton,
  Grid,
  GridItem,
  Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Text,
  useDisclosure
} from '@chakra-ui/react'
import Image from 'next/image'
import { ratingNumberToText } from '../../utils/ratingNumberToText'
import { BsCart4 } from 'react-icons/bs'
import { IoMdAdd, IoMdRemove } from 'react-icons/io'
import { useCart } from '../../hooks/useCart'
import { formatNumber } from '../../utils/formatNumber'

type FoodProps = {
  food: {
    id: string
    name: string
    price: number
    image: string
    description: string
    tag: { id: string; tag_value: string }
    food_rating: Array<{ customer_id: string; rating: number }>
  }
  rating: number | undefined
}

export function Food({ food, rating }: FoodProps) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const {
    addFood,
    removeFood,
    thereIsASpecificFoodInTheCart,
    numberOfSpecificFoodInTheCart,
    priceOfSpecificFoodAccumulatedInTheCart
  } = useCart()

  function handleAddFood(id: string) {
    addFood(id)
  }

  function handleRemoveFood(id: string) {
    removeFood(id)
  }

  return (
    <>
      <Grid
        onClick={onOpen}
        templateColumns="repeat(3, 1fr)"
        transitionDuration="0.4s"
        transitionTimingFunction="ease-in-out"
        transitionProperty="transform, box-shadow"
        cursor="pointer"
        _hover={{
          ...(!thereIsASpecificFoodInTheCart(food.id) && {
            transform: 'translateY(-3px)',
            boxShadow: '0px 3px 0px 0px rgba(221,107,32,1)'
          })
        }}
        background="brand.card_restaurant_background"
      >
        <GridItem
          colSpan={2}
          padding="1rem"
          flexDirection="column"
          justifyContent="space-between"
          {...(thereIsASpecificFoodInTheCart(food.id) && {
            boxShadow: '0px 0px 3px 0px rgb(237, 137, 54, 0.8)'
          })}
        >
          <Flex flexDirection="column">
            <Text fontWeight="600" noOfLines={2}>
              {food.name}
            </Text>
            <Text fontSize="0.875rem" noOfLines={2} paddingTop="0.5rem">
              {food.description}
            </Text>
          </Flex>
          <Text>$ {food.price}</Text>
        </GridItem>
        <GridItem overflow="hidden" position="relative">
          <Box
            display={rating ? 'flex' : 'none'}
            position="absolute"
            borderBottom={`6px solid ${ratingNumberToText(rating).color}`}
            zIndex="1"
            top="0px"
            right="0px"
            backgroundColor="#fdfdfd"
            boxSize="40px"
            borderBottomLeftRadius="full"
          >
            <Text
              position="absolute"
              top="7px"
              right="7px"
              fontSize="14px"
              lineHeight="14px"
              fontWeight="600"
            >
              {rating}
            </Text>
          </Box>
          <Image
            objectFit="cover"
            layout="fill"
            src={food.image}
            alt={food.name}
          />
        </GridItem>
      </Grid>

      <Modal
        closeOnOverlayClick={false}
        isOpen={isOpen}
        onClose={onClose}
        size="lg"
      >
        <ModalOverlay />
        <ModalContent borderRadius="0px">
          <ModalHeader
            display="flex"
            justifyContent="space-between"
            padding="0.625rem"
          >
            <Text>{food.name}</Text>
            <CloseButton onClick={onClose} variant="red-theme" />
          </ModalHeader>
          <ModalBody
            display="flex"
            flexDirection="column"
            margin="0"
            padding="0"
            position="relative"
          >
            <Flex w="100%" h="200px" position="relative">
              <Image
                objectFit="cover"
                layout="fill"
                src={food.image}
                alt={food.name}
              />
            </Flex>
            <Flex w="100%" padding="0.625rem">
              <Text sx={{ textIndent: '5%', textAlign: 'justify' }}>
                {food.description}
              </Text>
            </Flex>
          </ModalBody>

          <ModalFooter
            paddingX="0.625rem"
            display="flex"
            justifyContent="space-between"
          >
            <ButtonGroup spacing="3px">
              <Button
                w="auto"
                padding="0px"
                variant="ghost"
                colorScheme="red"
                borderRadius="0px"
                sx={{
                  _focus: {
                    boxShadow: '0 0 0 3px rgb(245, 101, 101, 0.6)'
                  }
                }}
                isDisabled={!thereIsASpecificFoodInTheCart(food.id)}
                onClick={() => handleRemoveFood(food.id)}
              >
                <IoMdRemove fontSize="24px" />
              </Button>
              <Button
                variant="ghost"
                colorScheme="green"
                borderRadius="0px"
                w="auto"
                padding="0px"
                sx={{
                  _focus: {
                    boxShadow: '0 0 0 3px rgb(72, 187, 120, 0.6)'
                  }
                }}
                onClick={() => handleAddFood(food.id)}
              >
                <IoMdAdd fontSize="24px" />
              </Button>
            </ButtonGroup>
            <Flex
              alignItems="center"
              sx={{
                gap: '1.5rem'
              }}
            >
              <Flex alignItems="center" position="relative">
                <BsCart4 color="#C05621" fontSize="1.5rem" />
                {numberOfSpecificFoodInTheCart(food.id) !== 0 && (
                  <Flex
                    boxSize="1.5rem"
                    position="absolute"
                    boxShadow="0px 0px 0px 2.5px #FDFDFD"
                    background="#C05621"
                    borderRadius="full"
                    justifyContent="center"
                    alignItems="center"
                    top="0px"
                    right="0px"
                    transform="translate(50%, -50%)"
                  >
                    <Text
                      color="#FFFAF0"
                      margin="auto"
                      fontSize="0.75rem"
                      fontWeight="600"
                    >
                      {numberOfSpecificFoodInTheCart(food.id) > 99
                        ? '+99'
                        : numberOfSpecificFoodInTheCart(food.id)}
                    </Text>
                  </Flex>
                )}
              </Flex>

              <Flex
                h="40px"
                paddingX="0.5rem"
                border="1px solid #E2E8F0"
                bg="gray.50"
              >
                <Text margin="auto" fontWeight="600">
                  {formatNumber({
                    options: { currency: 'USD' },
                    numberToBeFormatted:
                      priceOfSpecificFoodAccumulatedInTheCart(food.id)
                  })}
                </Text>
              </Flex>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
