import { createContext, ReactNode, useState } from 'react'
import geohash from 'ngeohash'

export type GeographicFeature = {
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

type LocationContextData = {
  chosenLocation: GeographicFeature | undefined
  setChosenLocation: (state: GeographicFeature | undefined) => void
  encodeGeohash: (coord: { latitude: number; longitude: number }) => string
  decodeGeohash: (geo: string) => geohash.GeographicPoint
  generateGeographicInformation: (feature: Feature) => {
    place_name: string | undefined
    granular: { id: string; text: string } | undefined
    place: string | undefined
  }
}

type LocationProviderProps = {
  children: ReactNode
}

export const LocationContext = createContext({} as LocationContextData)

export function LocationProvider({ children }: LocationProviderProps) {
  const [chosenLocation, setChosenLocation] = useState<GeographicFeature>()

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

  return (
    <LocationContext.Provider
      value={{
        chosenLocation,
        setChosenLocation,
        encodeGeohash,
        decodeGeohash,
        generateGeographicInformation
      }}
    >
      {children}
    </LocationContext.Provider>
  )
}
