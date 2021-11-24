import { createContext, ReactNode, useEffect, useState } from 'react'

export type GeographicFeatureWithCoordinates = {
  coordinates: {
    latitude: number
    longitude: number
  }
  geohash: string
  place_name: string | undefined
  granular: { id: string; text: string } | undefined
  place: string | undefined
}

type FilterContextData = {
  geographicLocation: GeographicFeatureWithCoordinates | undefined
  setGeographicLocation: (
    state: GeographicFeatureWithCoordinates | undefined
  ) => void
  sortOption: string
  setSortOption: (state: string) => void
  deliveryOption: string
  setDeliveryOption: (state: string) => void
  tagOption: Array<string | number>
  setTagOption: (state: Array<string | number>) => void
  priceOption: string | undefined
  setPriceOption: (state: string | undefined) => void
}

type FilterProviderProps = {
  children: ReactNode
}

export const FilterContext = createContext({} as FilterContextData)

export function FilterProvider({ children }: FilterProviderProps) {
  const [geographicLocation, setGeographicLocation] =
    useState<GeographicFeatureWithCoordinates>()
  const [sortOption, setSortOption] = useState<string>('')
  const [deliveryOption, setDeliveryOption] = useState<string>('delivery')
  const [tagOption, setTagOption] = useState<Array<string | number>>([])
  const [priceOption, setPriceOption] = useState<string | undefined>(
    'unrestricted'
  )

  useEffect(() => {
    if (deliveryOption === 'delivery') {
      setPriceOption('unrestricted')
    } else {
      setPriceOption(undefined)
    }
  }, [deliveryOption])

  return (
    <FilterContext.Provider
      value={{
        geographicLocation,
        setGeographicLocation,
        sortOption,
        setSortOption,
        deliveryOption,
        setDeliveryOption,
        tagOption,
        setTagOption,
        priceOption,
        setPriceOption
      }}
    >
      {children}
    </FilterContext.Provider>
  )
}
