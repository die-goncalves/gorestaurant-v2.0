import {
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Text,
  Flex,
  HStack
} from '@chakra-ui/react'
import { useContext } from 'react'
import { FilterContext } from '../../contexts/FilterContext'

type SidebarSliderProps = {
  values: Array<number>
}

function whichMarker(values: Array<string>, value: string | undefined) {
  const marker = values.findIndex(item => item === value)
  return marker
}

export function SidebarSlider({ values }: SidebarSliderProps) {
  const { priceOption, setPriceOption } = useContext(FilterContext)
  const eachMark = 100 / values.length
  const copyValues = [...values].toString().split(',')
  copyValues.push('unrestricted')

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
        onChange={value =>
          setPriceOption(
            value === 100 ? 'unrestricted' : copyValues[value / eachMark]
          )
        }
        value={whichMarker(copyValues, priceOption) * eachMark}
        defaultValue={whichMarker(copyValues, priceOption) * eachMark}
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
        <SliderThumb
          background="#f08a16"
          _focus={{
            boxShadow: '0 0 0 3px rgba(255,173,66,0.6)'
          }}
          boxSize={4}
        />
      </Slider>
      {copyValues.map((item, index) => {
        return (
          <HStack
            spacing="0px"
            key={`${index}-${item}-value`}
            position="absolute"
            left={`-webkit-calc(${index * eachMark}%)`}
            fontSize="0.8rem"
            transform="translate(-50%, +200%)"
          >
            <Text>
              {item === 'unrestricted' ? `${copyValues[index - 1]}+` : item}
            </Text>
          </HStack>
        )
      })}
    </Flex>
  )
}
