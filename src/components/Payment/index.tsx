import { useEffect, useState } from 'react'
import {
  Box,
  Button,
  Collapse,
  Flex,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  useDisclosure
} from '@chakra-ui/react'
import { MdOutlineKeyboardArrowDown } from 'react-icons/md'
import { formatNumber } from '../../utils/formatNumber'
import { TOrder } from '../../types'

type PaymentProps = {
  payment: Omit<TOrder, 'line_items'> & {
    line_items: Array<{
      food_id: string
      quantity: number
      food: { name: string; price: number; restaurant: { name: string } }
    }>
  }
}

export function Payment({ payment }: PaymentProps) {
  const { isOpen, onToggle } = useDisclosure()
  const [toggleCollapse, setToggleCollapse] = useState(false)
  const [totalCost, setTotalCost] = useState<number>(0)

  useEffect(() => {
    setTotalCost(
      payment.line_items.reduce(
        (acc, currentItem) =>
          (acc += currentItem.quantity * currentItem.food.price),
        0
      )
    )
  }, [payment.line_items])

  return (
    <Flex
      w="100%"
      h="max-content"
      flexDirection="column"
      padding="0.5rem"
      boxShadow="inset 0px 0px 2px 0px rgba(0,0,0,0.5)"
      background="#ffffff"
    >
      <Flex flexDirection="column">
        <Flex justifyContent="space-between" alignItems="center">
          <Flex
            flex="1"
            justifyContent="space-between"
            flexDirection="column"
            sx={{ gap: '0.5rem' }}
          >
            <Flex w="100%" justifyContent="space-between">
              <Flex alignItems="center">
                <Text
                  w="5rem"
                  textAlign="center"
                  fontWeight="600"
                  fontSize="1rem"
                  marginRight="0.5rem"
                >
                  PAYMENT
                </Text>
                <Text fontSize="0.875rem" fontWeight="500" color="orange.600">
                  {payment.payment_intent_id}
                </Text>
              </Flex>
              <Flex fontWeight="600" fontSize="1rem">
                {payment.payment_intent_status.toUpperCase()}
              </Flex>
            </Flex>
            <Flex w="100%" justifyContent="space-between">
              <Flex alignItems="center">
                <Text
                  width="5rem"
                  background="orange.100"
                  fontWeight="700"
                  fontSize="0.75rem"
                  marginRight="0.5rem"
                  textAlign="center"
                  color="gray.700"
                >
                  CREATED IN
                </Text>
                <Text fontSize="0.75rem" fontWeight="500" color="gray.500">
                  {new Intl.DateTimeFormat('en-US', {
                    dateStyle: 'full',
                    timeStyle: 'long'
                  }).format(new Date(payment.created_at))}
                </Text>
              </Flex>
              <Flex alignItems="center">
                <Text
                  w="5rem"
                  background="orange.100"
                  fontWeight="700"
                  fontSize="0.75rem"
                  marginRight="0.5rem"
                  textAlign="center"
                  color="gray.700"
                >
                  UPDATED IN
                </Text>
                <Text fontSize="0.75rem" fontWeight="500" color="gray.500">
                  {new Intl.DateTimeFormat('en-US', {
                    dateStyle: 'full',
                    timeStyle: 'long'
                  }).format(new Date(payment.updated_at))}
                </Text>
              </Flex>
            </Flex>
          </Flex>
          <Button
            display="flex"
            marginLeft="1rem"
            alignItems="center"
            justifyContent="center"
            boxSize="2.5rem"
            minW="auto"
            h="auto"
            borderRadius="0px"
            _focus={{ outline: 'none' }}
            variant="unstyled"
            onClick={() => {
              onToggle()
              setToggleCollapse(!toggleCollapse)
            }}
          >
            <Box
              display="flex"
              color="orange.600"
              transform={toggleCollapse ? 'rotate(-180deg)' : 'undefined'}
              transition="transform 0.2s"
            >
              <MdOutlineKeyboardArrowDown fontSize="1.5rem" />
            </Box>
          </Button>
        </Flex>
      </Flex>
      <Collapse in={isOpen} animateOpacity>
        <Flex marginTop="1rem" flexDirection="column" sx={{ gap: '1rem' }}>
          <Flex w="100%" flexDirection="column">
            <Flex alignSelf="center" fontSize="0.8rem" fontWeight="600">
              <Text>
                FOOD ORDERED AT THE RESTAURANT{' '}
                <Text as="span" color="orange.600">
                  {payment.line_items[0].food.restaurant.name.toUpperCase()}
                </Text>
              </Text>
            </Flex>
            <Table size="sm">
              <Thead>
                <Tr>
                  <Th>Food</Th>
                  <Th isNumeric>Price</Th>
                  <Th isNumeric>Quantity</Th>
                  <Th isNumeric>Total</Th>
                </Tr>
              </Thead>
              <Tbody>
                {payment.line_items.map(item => (
                  <Tr key={item.food_id}>
                    <Td>{item.food.name}</Td>
                    <Td isNumeric>
                      {formatNumber({
                        options: { currency: 'USD' },
                        numberToBeFormatted: Number(item.food.price)
                      })}
                    </Td>
                    <Td isNumeric>{item.quantity}</Td>
                    <Td isNumeric>
                      {formatNumber({
                        options: { currency: 'USD' },
                        numberToBeFormatted:
                          Number(item.quantity) * Number(item.food.price)
                      })}
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Flex>
          <Flex w="100%" flexDirection="column">
            <Box alignSelf="center" fontSize="0.8rem" fontWeight="600">
              SHIPPING
            </Box>
            <Table size="sm">
              <Thead>
                <Tr>
                  <Th>Address</Th>
                  <Th>Geohash</Th>
                  <Th isNumeric>Price</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td>{payment.shipping_options.shipping_address}</Td>
                  <Td>{payment.shipping_options.shipping_geohash}</Td>
                  <Td isNumeric>
                    {formatNumber({
                      options: { currency: 'USD' },
                      numberToBeFormatted: Number(
                        payment.shipping_options.shipping_amount
                      )
                    })}
                  </Td>
                </Tr>
              </Tbody>
            </Table>
          </Flex>
          <Flex w="100%" flexDirection="column">
            <Table size="sm">
              <Thead>
                <Tr>
                  <Th isNumeric>Total cost</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td isNumeric fontWeight="600">
                    {formatNumber({
                      options: { currency: 'USD' },
                      numberToBeFormatted:
                        Number(payment.shipping_options.shipping_amount) +
                        totalCost
                    })}
                  </Td>
                </Tr>
              </Tbody>
            </Table>
          </Flex>
        </Flex>
      </Collapse>
    </Flex>
  )
}
