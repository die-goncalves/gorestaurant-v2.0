import { Box, Flex, Icon, Text } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { MdDeliveryDining } from 'react-icons/md'
import { BiShoppingBag } from 'react-icons/bi'

type TimeDelivery = {
  minutes: string | null
  hour: string | null
}

type DeliveryProps = {
  deliveryPrice: number | undefined
  deliveryTime: number | undefined
}

const durationDelivery = (seconds: number | undefined) => {
  if (seconds === undefined) return { minutes: null, hour: null }
  const second_minutes = Math.round(seconds / 60)
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

export function Delivery({ deliveryPrice, deliveryTime }: DeliveryProps) {
  const [timeDelivery, setTimeDelivery] = useState<TimeDelivery | undefined>({
    minutes: null,
    hour: null
  })
  const [priceDelivery, setPriceDelivery] = useState<string | undefined>()

  useEffect(() => {
    setTimeDelivery(durationDelivery(deliveryTime))
    if (deliveryPrice) setPriceDelivery(deliveryPrice.toFixed(2))
    else setPriceDelivery(undefined)
  }, [deliveryPrice, deliveryTime])

  return (
    <Flex justifyContent="flex-start">
      <Icon
        fontSize="1.2rem"
        lineHeight="1.2rem"
        marginRight="0.25rem"
        {...(deliveryPrice !== undefined
          ? { as: MdDeliveryDining }
          : { as: BiShoppingBag })}
      />

      <Flex alignItems="center" fontSize="1rem" lineHeight="1rem">
        {timeDelivery &&
          (timeDelivery.hour === null ? (
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
          ))}

        {priceDelivery && (
          <>
            <Flex marginY="auto" marginX="0.25rem">
              <Box boxSize="2.5px" borderRadius="full" background="gray.300" />
            </Flex>
            <Text>R$ {priceDelivery}</Text>
          </>
        )}
      </Flex>
    </Flex>
  )
}
