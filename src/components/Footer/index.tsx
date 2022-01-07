import { Button, Flex, Grid, GridItem, Link, Text } from '@chakra-ui/react'
import NextLink from 'next/link'
import { GrTwitter, GrPinterest, GrFacebook, GrInstagram } from 'react-icons/gr'
import { FaGooglePlay, FaApple } from 'react-icons/fa'
import { Logo } from '../../components/Logo'
import { MapWithAllRestaurants } from './MapWithAllRestaurants'
import { useEffect, useState } from 'react'
import { FeatureCollection } from 'geojson'
import { supabase } from '../../utils/supabaseClient'
import { overallRatingRestaurant } from '../../utils/overallRatingRestaurant'
import { ratingNumberToText } from '../../utils/ratingNumberToText'
import { backgroundColorOfTheStar } from '../../utils/backgroundColorOfTheStar'

type Restaurant = {
  id: string
  name: string
  phone_number: string
  image: string
  description: string
  coordinates: { lat: number; lng: number }
  place: string
  foods: Array<{
    tag: string
    food_rating: Array<{ customer_id: string; rating: number }>
  }>
}

type FooterProps = {
  noBorderTop?: true
}

export function Footer({ noBorderTop }: FooterProps) {
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
    <Flex
      as="footer"
      flex="1"
      paddingX="6.25rem"
      paddingY="1rem"
      flexDirection="column"
      sx={{ gap: '1rem' }}
      {...(!noBorderTop
        ? {
            borderTop: '3px solid #C05621'
          }
        : { boxShadow: 'inset 0px 10px 20px -25px #000000' })}
    >
      <Flex flexDirection="column" flex="1" sx={{ gap: '1rem' }}>
        <Text fontSize="1.125rem" fontWeight="600" margin="auto">
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
      <Flex flexDirection="column" flex="1" sx={{ gap: '1rem' }}>
        <Text fontSize="1.125rem" fontWeight="600" margin="auto">
          Registered restaurants
        </Text>
        <Grid templateColumns="repeat(4, 1fr)" gap="1rem">
          {allRestaurants.map(restaurant => (
            <GridItem key={`show-${restaurant.id}`} margin="auto">
              {restaurant.name}
            </GridItem>
          ))}
        </Grid>
      </Flex>

      <MapWithAllRestaurants geojson={geoJSON} />

      <Flex
        flex="1"
        alignItems="center"
        flexDirection="column"
        sx={{ gap: '1rem' }}
      >
        <Flex
          flex="1"
          justifyContent="center"
          sx={{ gap: '1.25rem' }}
          color="gray.400"
        >
          <NextLink href={'https://www.twitter.com/'} passHref>
            <Link
              target="_blank"
              _hover={{ color: 'blue.400' }}
              _focus={{ boxShadow: 'none' }}
            >
              <GrTwitter size="1.25rem" />
            </Link>
          </NextLink>
          <NextLink href={'https://pinterest.com/'} passHref>
            <Link
              target="_blank"
              _hover={{ color: 'red.600' }}
              _focus={{ boxShadow: 'none' }}
            >
              <GrPinterest size="1.25rem" />
            </Link>
          </NextLink>
          <NextLink href={'https://www.facebook.com/'} passHref>
            <Link
              target="_blank"
              _hover={{ color: 'blue.600' }}
              _focus={{ boxShadow: 'none' }}
            >
              <GrFacebook size="1.25rem" />
            </Link>
          </NextLink>
          <NextLink href={'https://www.instagram.com/'} passHref>
            <Link
              target="_blank"
              _hover={{ color: 'purple.600' }}
              _focus={{ boxShadow: 'none' }}
            >
              <GrInstagram size="1.25rem" />
            </Link>
          </NextLink>
        </Flex>
        <Flex sx={{ gap: '1.25rem' }}>
          <Button
            height="auto"
            width="8rem"
            padding="0rem"
            borderRadius="0.25rem"
            colorScheme="gray"
          >
            <NextLink href={'https://play.google.com/store/apps/'} passHref>
              <Link
                display="flex"
                flex="1"
                padding="0.5rem"
                borderRadius="0.25rem"
                alignItems="center"
                target="_blank"
                _hover={{ textDecoration: 'none' }}
              >
                <FaGooglePlay size="1.25rem" />
                <Flex
                  display="flex"
                  flexDirection="column"
                  marginLeft="0.5rem"
                  alignItems="flex-start"
                >
                  <Text fontSize="9px">GET IT ON</Text>
                  <Text fontSize="16px">Google Play</Text>
                </Flex>
              </Link>
            </NextLink>
          </Button>
          <Button
            height="auto"
            width="8rem"
            padding="0rem"
            borderRadius="0.25rem"
            colorScheme="gray"
          >
            <NextLink href={'https://www.apple.com/app-store/'} passHref>
              <Link
                display="flex"
                flex="1"
                padding="0.5rem"
                borderRadius="0.25rem"
                alignItems="center"
                target="_blank"
                _hover={{ textDecoration: 'none' }}
              >
                <FaApple size="1.5rem" />
                <Flex
                  display="flex"
                  flexDirection="column"
                  marginLeft="0.5rem"
                  alignItems="flex-start"
                >
                  <Text fontSize="9px">Download on the</Text>
                  <Text fontSize="16px">App Store</Text>
                </Flex>
              </Link>
            </NextLink>
          </Button>
        </Flex>
        <Flex flexDirection="column" alignItems="center">
          <Logo fontSize="1rem" sizeLogo="1.5rem" />

          <Text
            as="span"
            fontSize="0.875rem"
            fontStyle="italic"
            marginTop="0.5rem"
          >
            ©2021 GoRestaurant
          </Text>
        </Flex>
      </Flex>
    </Flex>
  )
}
