import { Box, Flex, Input, Link, List, ListItem } from '@chakra-ui/react'
import { ChangeEvent, useContext, useEffect, useState } from 'react'
import {
  FeaturesCollection,
  GeographicFeature,
  LocationContext
} from '../../contexts/LocationContext'
import { MdOutlineEditLocationAlt, MdLocationPin } from 'react-icons/md'

export const Autocomplete = () => {
  const {
    encodeGeohash,
    generateGeographicInformation,
    chosenLocation,
    setChosenLocation
  } = useContext(LocationContext)
  const [userInput, setUserInput] = useState<string>('')
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [filteredSuggestions, setFilteredSuggestions] = useState<
    Array<GeographicFeature>
  >([])

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setShowSuggestions(true)
    setUserInput(event.target.value)
  }

  const onClick = (item: GeographicFeature) => {
    setShowSuggestions(false)
    setChosenLocation({
      geohash: item.geohash,
      granular: item.granular,
      place: item.place,
      place_name: item.place_name
    })
    setUserInput(item.place_name ?? '')
  }

  const geographicFeatures = (data: FeaturesCollection) => {
    let allFeatures: Array<GeographicFeature> = []

    for (const item of data.features) {
      const { granular, place, place_name } =
        generateGeographicInformation(item)
      let eachFeature = {
        geohash: encodeGeohash({
          latitude: item.geometry.coordinates[1],
          longitude: item.geometry.coordinates[0]
        }),
        granular,
        place_name,
        place
      }
      allFeatures.push(eachFeature)
    }
    return allFeatures
  }

  useEffect(() => {
    if (userInput && userInput.length !== 0) {
      fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${userInput}.json?bbox=-41.87537769666548,-21.311923538580672,-39.6882975718911,-17.875156159159033&access_token=${process.env.NEXT_PUBLIC_MAPBOX_TOKEN}&limit=3`
      )
        .then(response => response.json())
        .then(data => {
          setFilteredSuggestions(geographicFeatures(data))
        })
    } else {
      setFilteredSuggestions([])
    }
  }, [userInput])

  useEffect(() => {
    if (chosenLocation) {
      setShowSuggestions(false)
      setUserInput(chosenLocation.place_name ?? '')
    } else setUserInput('')
  }, [chosenLocation])

  return (
    <Flex id="inputWithAutocomplete" flex="1" position="relative" h="inherit">
      <Flex
        as="label"
        paddingLeft="1rem"
        alignSelf="center"
        background="brand.input_background"
        w="100%"
      >
        <Box as="span" marginRight="0.625rem" color="orange.500">
          <MdOutlineEditLocationAlt fontSize="24px" />
        </Box>

        <Input
          color="brand.text_color"
          fontWeight="600"
          variant="unstyled"
          borderRadius="0"
          placeholder="Enter the delivery address"
          _placeholder={{ color: 'brand.input_placeholder' }}
          value={userInput}
          onChange={onChange}
        />
      </Flex>
      {showSuggestions && (
        <List
          position="absolute"
          w="100%"
          top="100%"
          background="brand.list_background"
        >
          {filteredSuggestions &&
            filteredSuggestions.map((item: GeographicFeature) => {
              return (
                <Link
                  key={item.place_name}
                  sx={{
                    '&:hover': {
                      textDecoration: 'none'
                    }
                  }}
                  onClick={() => onClick(item)}
                >
                  <ListItem
                    display="flex"
                    alignItems="center"
                    paddingY="0.5rem"
                    paddingX="1rem"
                    fontSize="0.85rem"
                    sx={{
                      '&:hover': {
                        background: 'brand.list_hover'
                      }
                    }}
                  >
                    <Box as="span" marginRight="0.625rem" color="orange.500">
                      <MdLocationPin fontSize="24px" />
                    </Box>
                    {item.place_name}
                  </ListItem>
                </Link>
              )
            })}
        </List>
      )}
    </Flex>
  )
}
