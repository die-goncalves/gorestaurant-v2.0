import { Box, Flex, Input, Link, List, ListItem } from '@chakra-ui/react'
import { ChangeEvent, useEffect, useState } from 'react'
import mapboxgl from 'mapbox-gl'

type InputGeolocateData = {
  context: Array<{
    id: string
    text: string
  }>
  place_type: Array<string>
  text: string
  geometry: {
    coordinates: Array<number>
  }
}

type InfoAddress = {
  lng: number
  lat: number
  array_locations: Array<string | undefined>
}

type MyLocation = {
  lat: number
  lng: number
  place_description: string
}

type AutocompleteProps = {
  geoposition: MyLocation | null
  isDataComingFromDrawer: boolean
  setIsDataComingFromDrawer: (state: boolean) => void
}

export const Autocomplete = ({
  geoposition,
  isDataComingFromDrawer,
  setIsDataComingFromDrawer
}: AutocompleteProps) => {
  const [userInput, setUserInput] = useState('')
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [filteredSuggestions, setFilteredSuggestions] = useState<
    Array<InfoAddress>
  >([])
  mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setIsDataComingFromDrawer(false)
    setShowSuggestions(true)
    setUserInput(event.target.value)
  }
  const onClick = (item: InfoAddress) => {
    setIsDataComingFromDrawer(false)
    setShowSuggestions(false)
    setUserInput(item.array_locations.join(', '))
  }

  const geographicFeatures = (inputTypes: Array<InputGeolocateData>) => {
    const options = [
      'address',
      'neighborhood',
      'locality',
      'place',
      'district',
      'postcode',
      'region',
      'country',
      'poi'
    ]

    let allAddress: Array<InfoAddress> = []
    for (const item of inputTypes) {
      let eachAddress: InfoAddress
      let array_locations = options.map(el => {
        for (const opt of item.context)
          if (opt.id.includes(el)) {
            return opt.text
          }
      })
      array_locations[options.findIndex(el => el === item.place_type[0])] =
        item.text
      eachAddress = {
        lng: item.geometry.coordinates[0],
        lat: item.geometry.coordinates[1],
        array_locations: array_locations
      }
      allAddress.push(eachAddress)
    }
    return allAddress
  }
  const formatGeographicFeatures = (
    resultGeographicFeatures: Array<InfoAddress>
  ) => {
    const formatAddress = resultGeographicFeatures.map((el: InfoAddress) => {
      return {
        ...el,
        array_locations: el.array_locations.filter(
          (t: string | undefined) => t !== undefined
        )
      }
    })
    return formatAddress
  }

  useEffect(() => {
    if (userInput.length !== 0) {
      fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${userInput}.json?bbox=-41.87537769666548,-21.311923538580672,-39.6882975718911,-17.875156159159033&access_token=${mapboxgl.accessToken}&limit=3`
      )
        .then(response => response.json())
        .then(data =>
          setFilteredSuggestions(
            formatGeographicFeatures(geographicFeatures(data.features))
          )
        )
    } else {
      setFilteredSuggestions([])
    }
  }, [userInput])

  return (
    <Flex id="inputWithAutocomplete" flex="1" position="relative" h="inherit">
      <Flex
        as="label"
        paddingLeft="1rem"
        alignSelf="center"
        background="brand.input_background"
        w="100%"
      >
        <Box
          as="span"
          className="material-icons-outlined"
          marginRight="0.625rem"
          color="orange.500"
        >
          edit_location_alt
        </Box>

        <Input
          color="brand.text_color"
          fontWeight="600"
          variant="unstyled"
          borderRadius="0"
          placeholder="Enter the delivery address"
          _placeholder={{ color: 'brand.input_placeholder' }}
          value={
            isDataComingFromDrawer ? geoposition?.place_description : userInput
          }
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
            filteredSuggestions.map((item: InfoAddress) => {
              return (
                <Link
                  key={item.array_locations.join(', ')}
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
                    <Box
                      as="span"
                      className="material-icons-round"
                      marginRight="0.625rem"
                      color="orange.500"
                    >
                      place
                    </Box>
                    {item.array_locations.join(', ')}
                  </ListItem>
                </Link>
              )
            })}
        </List>
      )}
    </Flex>
  )
}
