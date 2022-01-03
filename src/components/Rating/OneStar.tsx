import { Button, Flex, Text } from '@chakra-ui/react'
import { backgroundColorOfTheStar } from '../../utils/backgroundColorOfTheStar'
import { ratingNumberToText } from '../../utils/ratingNumberToText'

type OneStarProps = {
  value: number | undefined
  critics: number
  starSize: string
  fontSize: string
}

export function OneStar({ value, critics, starSize, fontSize }: OneStarProps) {
  return (
    <Flex sx={{ gap: '0.25rem' }} whiteSpace="nowrap" alignItems="center">
      <Button
        key="Button-OneStar"
        borderRadius="0px"
        padding="0px"
        lineHeight={starSize}
        fontSize={starSize}
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
            fontWeight="700"
            sx={{
              transition: '0.2s all ease-in-out',
              background:
                critics > 0
                  ? typeof value === 'number'
                    ? `-webkit-linear-gradient(left, ${
                        ratingNumberToText(value).color
                      } ${(value / 5) * 100}%, ${backgroundColorOfTheStar(
                        value
                      )} ${(value / 5) * 100}%)`
                    : 'gray.100'
                  : 'gray.100',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            ★
          </Text>
        </Flex>
      </Button>
      <Flex sx={{ gap: '0.25rem' }} fontSize={fontSize}>
        <Text color={ratingNumberToText(value).color}>
          {value && `${value} `}
          {ratingNumberToText(value).text}
        </Text>
        <Text color="gray.400">
          {critics > 999 ? '( 999+ )' : `( ${critics} )`}
        </Text>
      </Flex>
    </Flex>
  )
}
