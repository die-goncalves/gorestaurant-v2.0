import { createContext, ReactNode, useState } from 'react'
import geohash from 'ngeohash'

export type Restaurant = {
  id: string
  name: string
  phone_number: string
  coordinates: {
    lat: number
    lng: number
  }
  operating_hours: Array<{
    id: string
    start_hour: string
    end_hour: string
    weekday: {
      id: number
      name: string
    }
  }>
  address: string
  image: string
  foods: Array<{
    id: string
    name: string
    price: number
    image: string
    description: string
    tag: { id: string; tag_value: string }
    food_rating: Array<{ consumer_id: string; rating: number }>
  }>
  place: string
}

export type GeographicFeature = {
  geohash: string
  place_name: string | undefined
  granular: { id: string; text: string } | undefined
  place: string | undefined
}

type GeographicFeatureWithCoordinates = {
  coordinates: {
    latitude: number
    longitude: number
  }
  geohash: string
  place_name: string | undefined
  granular: { id: string; text: string } | undefined
  place: string | undefined
}

type Feature = {
  place_name: string
  geometry: {
    coordinates: Array<number>
  }
  context: Array<{ id: string; text: string }>
}

export type FeaturesCollection = {
  features: Array<Feature>
}

type RestaurantContextData = {
  userLocation: GeographicFeatureWithCoordinates | undefined
  setUserLocation: (state: GeographicFeatureWithCoordinates | undefined) => void
  encodeGeohash: (coord: { latitude: number; longitude: number }) => string
  decodeGeohash: (geo: string) => geohash.GeographicPoint
  generateGeographicInformation: (feature: Feature) => {
    place_name: string | undefined
    granular: { id: string; text: string } | undefined
    place: string | undefined
  }
  getUserLocation: (geohash: string | null) => Promise<{
    coordinates: {
      latitude: number
      longitude: number
    }
    geohash: string
    place_name: string | undefined
    granular:
      | {
          id: string
          text: string
        }
      | undefined
    place: string | undefined
  }>
}

type RestaurantProviderProps = {
  children: ReactNode
}

export const RestaurantContext = createContext({} as RestaurantContextData)

export function RestaurantProvider({ children }: RestaurantProviderProps) {
  const [userLocation, setUserLocation] =
    useState<GeographicFeatureWithCoordinates>()

  function encodeGeohash(coord: { latitude: number; longitude: number }) {
    return geohash.encode(coord.latitude, coord.longitude, 15)
  }

  function decodeGeohash(geo: string) {
    return geohash.decode(geo)
  }

  function generateGeographicInformation(feature: Feature): {
    place_name: string | undefined
    granular: { id: string; text: string } | undefined
    place: string | undefined
  } {
    const typeFeatureContext = [
      'address',
      'neighborhood',
      'locality',
      'place',
      'district',
      'postcode',
      'region',
      'country'
    ]

    const dataTypesAvailable = typeFeatureContext.map(type => {
      const separate_types = feature.context.find(ctx => ctx.id.includes(type))
      if (separate_types) {
        return { id: type, text: separate_types.text }
      } else return undefined
    })

    return {
      place_name: feature.place_name,
      granular: dataTypesAvailable.find(type => type),
      place: dataTypesAvailable[3] ? dataTypesAvailable[3].text : undefined
    }
  }

  async function getUserLocation(geohash: string | null) {
    let userLocation = {} as {
      coordinates: {
        latitude: number
        longitude: number
      }
      geohash: string
      place_name: string | undefined
      granular: { id: string; text: string } | undefined
      place: string | undefined
    }
    if (geohash) {
      const { latitude, longitude } = decodeGeohash(geohash)
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?limit=1&access_token=${process.env.NEXT_PUBLIC_MAPBOX_TOKEN}`
      )
      const data = await response.json()

      const { granular, place, place_name } = generateGeographicInformation(
        data.features[0]
      )

      userLocation = {
        coordinates: { latitude, longitude },
        geohash,
        granular,
        place,
        place_name
      }
    }
    return userLocation
  }

  return (
    <RestaurantContext.Provider
      value={{
        userLocation,
        setUserLocation,
        encodeGeohash,
        decodeGeohash,
        generateGeographicInformation,
        getUserLocation
      }}
    >
      {children}
    </RestaurantContext.Provider>
  )
}
