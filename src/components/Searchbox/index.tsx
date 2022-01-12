import { Button, Flex } from '@chakra-ui/react'
import { DrawerUserLocation } from './DrawerUserLocation'
import { Autocomplete } from './Autocomplete'
import { useRouter } from 'next/router'
import { useContext } from 'react'
import { UserLocationContext } from '../../contexts/UserLocationContext'
import toast from 'react-hot-toast'

export default function Searchbox() {
  const { userLocation } = useContext(UserLocationContext)
  const router = useRouter()

  function handleSearchButton() {
    if (userLocation) {
      if (userLocation.place && userLocation.geohash) {
        router.push(
          `/restaurants?place=${userLocation.place}&geohash=${userLocation.geohash}`
        )
      }
    } else {
      toast(
        `We can't get the coordinates of the address you gave, please indicate on the map where you are.`,
        {
          icon: '😥',
          duration: 4000,
          style: {
            borderRadius: '0px',
            background: 'rgb(250, 250, 255)',
            border: '1.5px solid rgb(235, 235, 255)',
            boxShadow:
              'rgb(0 0 255 / 5%) 0px 3px 10px, rgb(0 0 0 / 5%) 0px 3px 3px'
          }
        }
      )
    }
  }

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
          onClick={handleSearchButton}
          fontWeight="500"
          sx={{
            _focus: {
              boxShadow: '0 0 0 3px rgba(237, 137, 54, 0.6)'
            }
          }}
        >
          Find Food
        </Button>

        <DrawerUserLocation />
      </Flex>
    </>
  )
}
