import { Box, Button, Flex, Text } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { backgroundColorOfTheStar } from '../utils/backgroundColorOfTheStar'
import { ratingNumberToText } from '../utils/ratingNumberToText'

type RatingProps = {
  value: number | undefined
  critics: number
  starSize: string
  fontSize: string
  clickable?: true
  oneStar?: true
}

export function Rating({
  value,
  critics,
  starSize,
  fontSize,
  clickable,
  oneStar
}: RatingProps) {
  const [clickValue, setClickValue] = useState<number>()
  const [percent, setPercent] = useState<number>(0)

  useEffect(() => {
    if (value) setPercent((value % 1) * 100)
  }, [value])

  useEffect(() => {
    if (clickValue) {
      setPercent((clickValue % 1) * 100 + 10)
    }
  }, [clickValue])

  if (oneStar) {
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
  } else {
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
                  fontWeight="bold"
                  height={starSize}
                  minWidth={starSize}
                  sx={{
                    _focus: {
                      boxShadow: 'none'
                    }
                  }}
                  variant="unstyled"
                  cursor={clickable ? 'pointer' : 'default'}
                  {...(clickable && { onClick: () => setClickValue(i + 1) })}
                >
                  <Flex flex="1" justifyContent="center" alignItems="center">
                    <Text
                      sx={{
                        transition: '0.2s all ease-in-out',
                        background: !clickable
                          ? value
                            ? value >= i + 1
                              ? ratingNumberToText(value).color
                              : value < i + 1 && value > i
                              ? `-webkit-linear-gradient(left, ${
                                  ratingNumberToText(value).color
                                } ${percent}%, ${backgroundColorOfTheStar(
                                  value
                                )} ${percent}%)`
                              : backgroundColorOfTheStar(value)
                            : 'gray.100'
                          : clickValue
                          ? clickValue >= i + 1
                            ? ratingNumberToText(clickValue).color
                            : backgroundColorOfTheStar(clickValue)
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
        {clickable ?? (
          <Flex sx={{ gap: '0.25rem' }} fontSize={fontSize}>
            {value && (
              <Text color={ratingNumberToText(value).color}>{`${value}`}</Text>
            )}
            <Text color="#0c060080">
              {critics > 999
                ? '( 999+ ratings )'
                : critics === 1
                ? `( ${critics} rating )`
                : `( ${critics} ratings )`}
            </Text>
          </Flex>
        )}
      </Flex>
    )
  }
}
