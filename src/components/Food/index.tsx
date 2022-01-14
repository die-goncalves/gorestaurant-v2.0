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
import { ratingNumberToText } from '../../utils/ratingNumberToText'
import { BsCart4 } from 'react-icons/bs'
import { IoMdAdd, IoMdRemove } from 'react-icons/io'
import { useCart } from '../../hooks/useCart'
import { formatNumber } from '../../utils/formatNumber'
import { TFoods } from '../../types'
import { ImageWithSkeleton } from '../ImageWithSkeleton'

type FoodProps = {
  food: Omit<
    TFoods,
    | 'restaurant_id'
    | 'tag'
    | 'stripe_food_id'
    | 'stripe_price_id'
    | 'created_at'
    | 'updated_at'
  >
  rating: number | undefined
  isRestaurantOpen:
    | {
        open: boolean
        for_coming?: any
        current?: any
      }
    | undefined
}

export function Food({ food, rating, isRestaurantOpen }: FoodProps) {
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
        templateColumns="repeat(3, 1fr)"
        transitionDuration="0.4s"
        transitionTimingFunction="ease-in-out"
        transitionProperty="transform, box-shadow"
        background="brand.card_restaurant_background"
        {...(isRestaurantOpen?.open
          ? {
              onClick: onOpen,
              cursor: 'pointer',
              _hover: {
                ...(!thereIsASpecificFoodInTheCart(food.id) && {
                  transform: 'translateY(-3px)',
                  boxShadow: '0px 3px 0px 0px rgba(221,107,32,1)'
                })
              }
            }
          : { cursor: 'not-allowed', filter: 'opacity(80%)' })}
      >
        <GridItem
          colSpan={2}
          padding="1rem"
          flexDirection="column"
          justifyContent="space-between"
          {...(thereIsASpecificFoodInTheCart(food.id) && {
            boxShadow: 'inset 0px 0px 3px 0px rgb(237, 137, 54, 0.8)'
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
        <GridItem display="flex" overflow="hidden" position="relative">
          <Box
            display={rating ? 'flex' : 'none'}
            position="absolute"
            borderBottom={`6px solid ${ratingNumberToText(rating).color}`}
            zIndex="1"
            top="0px"
            right="0px"
            backgroundColor="#fdfdfd"
            boxSize="2.5rem"
            borderBottomLeftRadius="full"
          >
            <Text
              position="absolute"
              top="7px"
              right="3.5px"
              fontSize="0.875rem"
              lineHeight="0.875rem"
              fontWeight="600"
            >
              {rating?.toFixed(2)}
            </Text>
          </Box>
          <ImageWithSkeleton
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
            <Text fontWeight="600">{food.name}</Text>
            <CloseButton onClick={onClose} variant="red-theme" />
          </ModalHeader>
          <ModalBody
            display="flex"
            flexDirection="column"
            margin="0"
            padding="0"
            position="relative"
          >
            <Flex w="100%" h="12.5rem" position="relative">
              <ImageWithSkeleton
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
                <IoMdRemove fontSize="1.5rem" />
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
                <IoMdAdd fontSize="1.5rem" />
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
                h="2.5rem"
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
