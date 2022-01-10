import { Button, Flex } from '@chakra-ui/react'
import { DrawerUserLocation } from './DrawerUserLocation'
import { Autocomplete } from './Autocomplete'
import { useRouter } from 'next/router'
import { useContext } from 'react'
import { UserLocationContext } from '../../contexts/UserLocationContext'

export default function Searchbox() {
  const { userLocation } = useContext(UserLocationContext)
  const router = useRouter()

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
        <Autocomplete />

        <Button
          borderRadius="0"
          colorScheme="orange"
          variant="solid"
          paddingY="1.5rem"
          onClick={() =>
            router.push(
              `/restaurants?place=${userLocation?.place}&geohash=${userLocation?.geohash}`
            )
          }
        >
          Find Food
        </Button>

        <DrawerUserLocation />
      </Flex>
    </>
  )
}
