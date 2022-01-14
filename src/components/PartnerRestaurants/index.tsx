import { Flex, Grid, GridItem, Text } from '@chakra-ui/react'
import { MapWithAllRestaurants } from './MapWithAllRestaurants'
import { useEffect, useState } from 'react'
import { FeatureCollection } from 'geojson'
import { supabase } from '../../utils/supabaseClient'
import { overallRatingRestaurant } from '../../utils/overallRatingRestaurant'
import { ratingNumberToText } from '../../utils/ratingNumberToText'
import { backgroundColorOfTheStar } from '../../utils/backgroundColorOfTheStar'
import { TRestaurant, TFoods, TFoodRating } from '../../types'

type Restaurant = Omit<TRestaurant, 'address' | 'created_at' | 'updated_at'> & {
  foods: Array<
    Pick<TFoods, 'tag'> & {
      food_rating: Array<Pick<TFoodRating, 'customer_id' | 'rating'>>
    }
  >
}

export function PartnerRestaurants() {
  const [geoJSON, setGeoJSON] = useState<FeatureCollection>()
  const [allRestaurants, setAllRestaurants] = useState<Array<Restaurant>>([])
  const [places, setPlaces] = useState<Array<string>>([])

  function removeDuplicates(data: string[]) {
    return data.filter((value, index) => data.indexOf(value) === index)
  }

  useEffect(() => {
    async function fetchData() {
      let geojson: FeatureCollection
      const { data } = await supabase.from<Restaurant>('restaurants').select(
        `
          *,
          foods ( tag, food_rating ( * ) )
        `
      )

      if (data) {
        setAllRestaurants(data)
        geojson = {
          type: 'FeatureCollection',
          features: []
        }
        data.forEach(feature => {
          const infoRating = overallRatingRestaurant([...feature.foods])
          const transformRating = ratingNumberToText(infoRating.overallRating)
          geojson.features.push({
            type: 'Feature',
            properties: {
              id: feature.id,
              name: `<h1>${feature.name}</h1>`,
              phone: `<p>${feature.phone_number}</p>`,
              overallRating: `<p class="overallRating" style="color:${transformRating.color}">${infoRating.overallRating}</p>`,
              textOverallRating: `<p class="textOverallRating" style="color:${transformRating.color}">${transformRating.text}</p>`,
              rating:
                typeof infoRating.overallRating === 'number'
                  ? `
              <p class="starRating" style="background:-webkit-linear-gradient(left, ${
                transformRating.color
              } ${
                      (infoRating.overallRating / 5) * 100
                    }%, ${backgroundColorOfTheStar(infoRating.overallRating)} ${
                      (infoRating.overallRating / 5) * 100
                    }%);-webkit-background-clip:text;
                    -webkit-text-fill-color:transparent">★</p>`
                  : '<p class="starRating" style="background:#EDF2F7;-webkit-background-clip:text;-webkit-text-fill-color:transparent">★</p>',
              image: `<img src=${feature.image} alt=${feature.name}/>`,
              description: `<p>${feature.description}</p>`
            },
            geometry: {
              type: 'Point',
              coordinates: [feature.coordinates.lng, feature.coordinates.lat]
            }
          })
        })
        setGeoJSON(geojson)
      }
    }

    fetchData()
  }, [])

  useEffect(() => {
    setPlaces(
      removeDuplicates(allRestaurants.map(restaurant => restaurant.place))
    )
  }, [allRestaurants])

  return (
    <Flex flex="1" flexDirection="column" sx={{ gap: '1rem' }}>
      <Flex paddingY="1rem">
        <Flex width="60vw" flexDirection="column" sx={{ gap: '1rem' }}>
          <Text textAlign="center" fontSize="1.5rem">
            Partner Restaurants
          </Text>
          <Grid templateColumns="repeat(4, 1fr)" gap="1rem">
            {allRestaurants.map(restaurant => (
              <GridItem key={`show-${restaurant.id}`} margin="auto">
                {restaurant.name}
              </GridItem>
            ))}
          </Grid>
        </Flex>

        <Flex
          borderLeft="2px solid#252525"
          flex="1"
          flexDirection="column"
          sx={{ gap: '1rem' }}
        >
          <Text textAlign="center" fontSize="1.5rem">
            Regions where we deliver
          </Text>
          <Grid templateColumns="repeat(4, 1fr)" gap="1rem">
            {places.map(place => (
              <GridItem key={place} margin="auto">
                {place}
              </GridItem>
            ))}
          </Grid>
        </Flex>
      </Flex>

      <MapWithAllRestaurants geojson={geoJSON} />
    </Flex>
  )
}
