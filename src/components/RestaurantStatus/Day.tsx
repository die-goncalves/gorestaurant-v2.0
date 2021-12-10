import { Flex, Heading, SimpleGrid, Text } from '@chakra-ui/react'

type DayProps = {
  timeOrdering: Array<
    Array<{
      id: string
      start_hour: string
      end_hour: string
      weekday: {
        id: number
        name: string
      }
    }>
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
  return (
    <SimpleGrid columns={3} spacing="0.5rem">
      {timeOrdering.map(day => {
        if (day.length > 0) {
          return (
            <Flex key={day[0].weekday.id} flexDir="column" bg="#FCFBF9">
              <Heading
                as="h2"
                fontSize="1rem"
                alignSelf="center"
                margin="5px"
                padding="5px"
              >
                {day[0].weekday.name}
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
