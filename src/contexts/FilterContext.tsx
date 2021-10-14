import { createContext, ReactNode, useEffect, useState } from 'react'

type FilterContextProps = {
  locality: string | undefined
  setLocality: (state: string | undefined) => void
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

export const FilterContext = createContext({} as FilterContextProps)

export function FilterProvider({ children }: FilterProviderProps) {
  const [locality, setLocality] = useState<string | undefined>()
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
        locality,
        setLocality,
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
