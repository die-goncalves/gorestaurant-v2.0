import { Button, Flex } from '@chakra-ui/react'
import { DrawerUserLocation } from './DrawerUserLocation'
import { Autocomplete } from './Autocomplete'
import { useRouter } from 'next/router'
import { useState } from 'react'

type MyLocation = {
  lat: number
  lng: number
  place_description: string
}

export default function Searchbox() {
  const router = useRouter()
  const [geoposition, setGeoposition] = useState<MyLocation | null>(null)
  const [isDataComingFromDrawer, setIsDataComingFromDrawer] =
    useState<boolean>(false)

  return (
    <>
      <Flex
        h="3rem"
        flex="1"
        background="brand.input_background"
        position="relative"
        alignItems="center"
        marginTop="2rem"
        marginBottom="1rem"
      >
        <Autocomplete
          geoposition={geoposition}
          isDataComingFromDrawer={isDataComingFromDrawer}
          setIsDataComingFromDrawer={setIsDataComingFromDrawer}
        />
        <Button
          borderRadius="0"
          colorScheme="orange"
          variant="solid"
          paddingY="1.5rem"
          onClick={() => router.push('/feed')}
        >
          Find Food
        </Button>
        <DrawerUserLocation
          setGeoposition={setGeoposition}
          setIsDataComingFromDrawer={setIsDataComingFromDrawer}
        />
      </Flex>
    </>
  )
}
