import { Box, Flex, HStack, Text } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { getRouteTimeAndDistance } from '../../utils/directionsMapBox'

type TimeDelivery = {
  minutes: string | null
  hour: string | null
}
type Coordinates = {
  lng: number
  lat: number
}
type DeliveryProps = {
  restaurantLocation: Coordinates
  consumerLocation: Coordinates
}

const durationDelivery = (duration: number) => {
  if (!duration) return { minutes: null, hour: null }
  const second_minutes = Math.round(duration / 60)
  const hour_minutes = second_minutes / 60
  if (hour_minutes < 1) {
    if (second_minutes < 1) return { minutes: '1', hour: null }
    return { minutes: second_minutes.toString(), hour: null }
  } else if (hour_minutes > 24) {
    return { minutes: null, hour: Math.round(hour_minutes).toString() }
  } else {
    const hour_dot_minutes = hour_minutes.toFixed(2).split('.')
    const minutes = Math.round(
      (Number(hour_dot_minutes[1]) * 60) / 100
    ).toString()
    return { minutes: minutes, hour: Number(hour_dot_minutes[0]).toString() }
  }
}

const deliveryFee = (distance: number) => {
  const fee = 0.12
  return Math.round(distance / 1000) * fee
}

export function Delivery({
  restaurantLocation,
  consumerLocation
}: DeliveryProps) {
  const [timeDelivery, setTimeDelivery] = useState<TimeDelivery>({
    minutes: null,
    hour: null
  })
  const [priceDelivery, setPriceDelivery] = useState(0)

  useEffect(() => {
    ;(async () => {
      const infoDelivery = await getRouteTimeAndDistance(
        consumerLocation,
        restaurantLocation
      )
      setTimeDelivery(durationDelivery(infoDelivery.duration))
      setPriceDelivery(deliveryFee(infoDelivery.distance))
    })()
  }, [consumerLocation, restaurantLocation])

  return (
    <Flex
      justifyContent="flex-start"
      alignItems="center"
      fontFamily="Spectral"
      fontSize="1rem"
      lineHeight="1rem"
    >
      <HStack spacing="0.25rem">
        <Box as="span" className="material-icons-sharp" fontSize="1rem">
          delivery_dining
        </Box>

        {timeDelivery.hour === null ? (
          timeDelivery.minutes === null ? (
            <Text> -- h -- min</Text>
          ) : (
            <Text>{timeDelivery.minutes} min</Text>
          )
        ) : timeDelivery.minutes === null ? (
          <Text>{timeDelivery.hour} h</Text>
        ) : (
          <Text>
            {timeDelivery.hour} h {timeDelivery.minutes} min
          </Text>
        )}
      </HStack>
      <Flex marginY="auto" marginX="0.25rem">
        <Box boxSize="2.5px" borderRadius="full" background="gray.300" />
      </Flex>

      <Text>R$ {priceDelivery}</Text>
    </Flex>
  )
}
