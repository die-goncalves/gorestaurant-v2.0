import { Flex, Heading, SimpleGrid, Text } from '@chakra-ui/react'
import { useEffect, useState } from 'react'

type DayProps = {
  timeOrdering: Record<
    string,
    { id: string; start_hour: string; end_hour: string; weekday: string }[]
  >
  isOpen:
    | {
        open: boolean
        for_coming?: any
        current?: any
      }
    | undefined
}

export function Day({ timeOrdering, isOpen }: DayProps) {
  const [days, setDays] = useState(Object.entries(timeOrdering))
  const [orderDays, setOrderDays] = useState<
    Array<
      Array<{
        end_hour: string
        id: string
        start_hour: string
        weekday: string
      }>
    >
  >([])

  useEffect(() => {
    let storeOrderDays: Array<
      Array<{
        end_hour: string
        id: string
        start_hour: string
        weekday: string
      }>
    > = []
    days.forEach(item => {
      if (item[0] === 'Sunday') storeOrderDays[0] = item[1]
      if (item[0] === 'Monday') storeOrderDays[1] = item[1]
      if (item[0] === 'Tuesday') storeOrderDays[2] = item[1]
      if (item[0] === 'Wednesday') storeOrderDays[3] = item[1]
      if (item[0] === 'Thursday') storeOrderDays[4] = item[1]
      if (item[0] === 'Friday') storeOrderDays[5] = item[1]
      if (item[0] === 'Saturday') storeOrderDays[6] = item[1]
    })
    setOrderDays(storeOrderDays)
  }, [days])

  return (
    <SimpleGrid columns={3} spacing="0.5rem">
      {orderDays.map(day => {
        if (day.length > 0) {
          return (
            <Flex key={day[0].weekday} flexDir="column" bg="#FCFBF9">
              <Heading
                as="h2"
                fontSize="1rem"
                alignSelf="center"
                margin="5px"
                padding="5px"
              >
                {day[0].weekday}
              </Heading>
              {day.map(time => {
                return (
                  <Flex
                    justifyContent="center"
                    padding="5px"
                    key={time.id}
                    bg={
                      isOpen?.open && isOpen.current.id === time.id
                        ? 'green.100'
                        : isOpen?.open === false &&
                          isOpen.for_coming.id === time.id
                        ? 'orange.100'
                        : 'none'
                    }
                    boxShadow={
                      isOpen?.open && isOpen.current.id === time.id
                        ? 'inset 0px 0px 0px 2px #38A169'
                        : isOpen?.open === false &&
                          isOpen.for_coming.id === time.id
                        ? 'inset 0px 0px 0px 2px #DD6B20'
                        : 'none'
                    }
                  >
                    <Text>
                      {time.start_hour} - {time.end_hour}
                    </Text>
                  </Flex>
                )
              })}
            </Flex>
          )
        } else return null
      })}
    </SimpleGrid>
  )
}
