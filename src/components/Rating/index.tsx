import { Button, Flex, Text } from '@chakra-ui/react'
import { backgroundColorOfTheStar } from '../../utils/backgroundColorOfTheStar'
import { ratingNumberToText } from '../../utils/ratingNumberToText'

type RatingProps = {
  value: number | undefined
  critics: number
  starSize: string
  fontSize: string
}

export function Rating({ value, critics, starSize, fontSize }: RatingProps) {
  return (
    <Flex sx={{ gap: '0.25rem' }} whiteSpace="nowrap" alignItems="center">
      <Flex sx={{ gap: '0rem' }}>
        {Array(5)
          .fill('')
          .map((_, i) => {
            return (
              <Button
                key={`Button-0${i}-Star`}
                borderRadius="0px"
                padding="0px"
                lineHeight={starSize}
                fontSize={starSize}
                fontWeight="700"
                height={starSize}
                minWidth={starSize}
                sx={{
                  _focus: {
                    boxShadow: 'none'
                  }
                }}
                variant="unstyled"
                cursor="default"
              >
                <Flex flex="1" justifyContent="center" alignItems="center">
                  <Text
                    sx={{
                      transition: '0.2s all ease-in-out',
                      background: value
                        ? value >= i + 1
                          ? ratingNumberToText(value).color
                          : value < i + 1 && value > i
                          ? `-webkit-linear-gradient(left, ${
                              ratingNumberToText(value).color
                            } ${(value / 5) * 100}%, ${backgroundColorOfTheStar(
                              value
                            )} ${(value / 5) * 100}%)`
                          : backgroundColorOfTheStar(value)
                        : 'gray.100',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent'
                    }}
                  >
                    ★
                  </Text>
                </Flex>
              </Button>
            )
          })}
      </Flex>
      <Flex sx={{ gap: '0.25rem' }} fontSize={fontSize}>
        {value && (
          <Text color={ratingNumberToText(value).color}>{`${value}`}</Text>
        )}
        <Text color="#989898">
          {critics > 999
            ? '( 999+ ratings )'
            : critics === 1
            ? `( ${critics} rating )`
            : `( ${critics} ratings )`}
        </Text>
      </Flex>
    </Flex>
  )
}
