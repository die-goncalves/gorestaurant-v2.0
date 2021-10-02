import {
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Text,
  Flex,
  HStack
} from '@chakra-ui/react'

type SidebarSliderProps = {
  values: Array<number | undefined>
  setPriceOption: (state: number | undefined) => void
  priceOption: number | undefined
}

function whichMarker(
  values: Array<number | undefined>,
  value: number | undefined
) {
  const marker = values.findIndex(item => item === value)
  return marker
}

export function SidebarSlider({
  values,
  setPriceOption,
  priceOption
}: SidebarSliderProps) {
  const eachMark = 100 / values.length
  const copyValues = [...values]
  copyValues.push(undefined)

  return (
    <Flex
      w="inherit"
      h="3.55rem"
      position="relative"
      marginLeft="0.5rem"
      marginRight="0.125rem"
    >
      <Slider
        display="flex"
        position="relative"
        min={0}
        max={100}
        step={eachMark}
        onChangeEnd={value =>
          setPriceOption(
            value === undefined ? undefined : copyValues[value / eachMark]
          )
        }
        defaultValue={
          whichMarker(values, priceOption) === -1
            ? 100
            : whichMarker(values, priceOption) * eachMark
        }
      >
        <SliderTrack position="relative" borderRadius="0px">
          <SliderFilledTrack background="#f08a16" />
          {copyValues.map((item, index) => (
            <Flex
              key={`${index}-${item}-marker`}
              zIndex="5"
              position="absolute"
              right={`-webkit-calc(${index * eachMark}%)`}
              h="100%"
              w="0.25rem"
              transform="translate(50%, 0)"
              background="brand.body_background"
            />
          ))}
        </SliderTrack>
        <SliderThumb background="#f08a16" boxSize={4} />
      </Slider>
      {copyValues.map((item, index) => {
        return (
          <HStack
            spacing="0px"
            key={`${index}-${item}-value`}
            position="absolute"
            left={`-webkit-calc(${index * eachMark}%)`}
            fontSize="0.8rem"
            fontFamily="Spectral"
            transform="translate(-50%, +200%)"
          >
            <Text>
              {item === undefined ? `${copyValues[index - 1]}+` : item}
            </Text>
          </HStack>
        )
      })}
    </Flex>
  )
}
