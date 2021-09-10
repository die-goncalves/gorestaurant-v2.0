import { Box, Flex, Input, Link, List, ListItem } from '@chakra-ui/react'
import { ChangeEvent, useEffect, useState } from 'react'
import mapboxgl from 'mapbox-gl'

const fakeData = {
  features: [
    {
      bbox: [
        -40.4023905000113, -20.3783041280728, -40.3884129402185,
        -20.3697188653794
      ],
      center: [-40.393687, -20.373817],
      context: [
        {
          id: 'locality.5458808810938340',
          text: 'Itaquari'
        },
        {
          id: 'place.9419201741584840',
          text: 'Cariacica',
          wikidata: 'Q841222'
        },
        {
          id: 'region.9712565435997700',
          short_code: 'BR-ES',
          text: 'Espírito Santo',
          wikidata: 'Q43233'
        },
        {
          id: 'country.9531777110682710',
          short_code: 'br',
          text: 'Brazil',
          wikidata: 'Q155'
        }
      ],
      geometry: {
        coordinates: [-40.393687, -20.373817],
        type: 'Point'
      },
      id: 'neighborhood.229934521928730',
      place_name: 'Padre Gabriel, Cariacica - Espírito Santo, Brazil',
      place_type: ['neighborhood'],
      relevance: 1,
      text: 'Padre Gabriel',
      type: 'Feature'
    },
    {
      bbox: [
        -40.6388387252801, -19.5224405780047, -40.6273303785611,
        -19.5146732917666
      ],
      center: [-40.6353, -19.5179],
      context: [
        {
          id: 'postcode.8228245889830370',
          text: '29808'
        },
        {
          id: 'place.6834991870018370',
          text: 'Colatina',
          wikidata: 'Q933380'
        },
        {
          id: 'region.9712565435997700',
          short_code: 'BR-ES',
          text: 'Espírito Santo',
          wikidata: 'Q43233'
        },
        {
          id: 'country.9531777110682710',
          short_code: 'br',
          text: 'Brazil',
          wikidata: 'Q155'
        }
      ],
      geometry: {
        coordinates: [-40.6353, -19.5179],
        type: 'Point'
      },
      id: 'neighborhood.13841297712396100',
      place_name: 'Padre José De Anchieta, Colatina - Espírito Santo, Brazil',
      place_type: ['neighborhood'],
      relevance: 1,
      text: 'Padre José De Anchieta',
      type: 'Feature'
    },
    {
      center: [-40.047214, -19.393533],
      context: [
        {
          id: 'neighborhood.15305115051625680',
          text: 'Interlagos'
        },
        {
          id: 'postcode.9823278476868810',
          text: '29003'
        },
        {
          id: 'place.14926421803456230',
          text: 'Linhares',
          wikidata: 'Q1755402'
        },
        {
          id: 'region.9712565435997700',
          short_code: 'BR-ES',
          text: 'Espírito Santo',
          wikidata: 'Q43233'
        },
        {
          id: 'country.9531777110682710',
          short_code: 'br',
          text: 'Brazil',
          wikidata: 'Q155'
        }
      ],
      geometry: {
        coordinates: [-40.047214, -19.393533],
        type: 'Point'
      },
      id: 'address.1646462502',
      place_name:
        'Avenida Padre Manoel Da Nóbrega, Interlagos, Linhares - Espírito Santo, 29003, Brazil',
      place_type: ['address'],
      properties: {
        accuracy: 'street'
      },
      relevance: 1,
      text: 'Avenida Padre Manoel Da Nóbrega',
      type: 'Feature'
    },
    {
      center: [-40.077805, -18.90708],
      context: [
        {
          id: 'postcode.14240805847037850',
          text: '29950'
        },
        {
          id: 'place.2777711610778470',
          text: 'Jaguaré',
          wikidata: 'Q668992'
        },
        {
          id: 'region.9712565435997700',
          short_code: 'BR-ES',
          text: 'Espírito Santo',
          wikidata: 'Q43233'
        },
        {
          id: 'country.9531777110682710',
          short_code: 'br',
          text: 'Brazil',
          wikidata: 'Q155'
        }
      ],
      geometry: {
        coordinates: [-40.077805, -18.90708],
        type: 'Point'
      },
      id: 'address.1858773565',
      place_name:
        'Rua Padre Leandro Altoe Jaguaré - Espírito Santo, 29950, Brazil',
      place_type: ['address'],
      properties: {
        accuracy: 'street'
      },
      relevance: 1,
      text: 'Rua Padre Leandro Altoe',
      type: 'Feature'
    },
    {
      center: [-40.123488, -19.93143],
      context: [
        {
          id: 'neighborhood.10137444946407390',
          text: 'Praia Dos Padres'
        },
        {
          id: 'locality.10719970997815750',
          text: 'Santa Cruz'
        },
        {
          id: 'place.14449262030506090',
          text: 'Aracruz',
          wikidata: 'Q1794219'
        },
        {
          id: 'region.9712565435997700',
          short_code: 'BR-ES',
          text: 'Espírito Santo',
          wikidata: 'Q43233'
        },
        {
          id: 'country.9531777110682710',
          short_code: 'br',
          text: 'Brazil',
          wikidata: 'Q155'
        }
      ],
      geometry: {
        coordinates: [-40.123488, -19.93143],
        type: 'Point'
      },
      id: 'address.1513020323',
      place_name:
        'Rua Padre Felipe Corona, Praia Dos Padres, Aracruz - Espírito Santo, Brazil',
      place_type: ['address'],
      properties: {
        accuracy: 'street'
      },
      relevance: 1,
      text: 'Rua Padre Felipe Corona',
      type: 'Feature'
    }
  ]
}

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
  // useEffect(() => {
  //   setFilteredSuggestions(
  //     formatGeographicFeatures(geographicFeatures(fakeData.features))
  //   )
  // }, [])

  return (
    <Flex id="inputWithAutocomplete" flex="1" position="relative" h="inherit">
      <Flex
        as="label"
        paddingLeft="1rem"
        alignSelf="center"
        background="#FFF4EF"
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
          color="#0C0600"
          fontWeight="600"
          variant="unstyled"
          borderRadius="none"
          placeholder="Enter the delivery address"
          _placeholder={{ color: '#989898' }}
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
          background="#F9F9F9"
          boxShadow="2px 2px 2px #FFF4EF"
          borderBottomRadius="0.5rem"
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
                    borderRadius="0.5rem"
                    sx={{
                      '&:hover': {
                        background: '#E6E6E6'
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
