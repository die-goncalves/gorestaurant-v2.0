import { Flex, HStack, Button } from '@chakra-ui/react'
import { RiRestaurant2Line } from 'react-icons/ri'
import { VscSignOut } from 'react-icons/vsc'
import { Logo } from '../../Logo'

export function RestaurantHeader() {
  return (
    <Flex
      as="header"
      paddingX="2rem"
      paddingY="1rem"
      alignItems="center"
      justifyContent="space-between"
    >
      <Logo fontSize="1.25rem" sizeLogo="2rem" marginX="4px" />

      <HStack spacing="1rem">
        <Button
          padding="0"
          variant="ghost"
          colorScheme="orange"
          borderRadius="0"
        >
          <RiRestaurant2Line fontSize="24px" />
        </Button>
        <Button
          onClick={() => {}}
          padding="0"
          variant="ghost"
          colorScheme="red"
          borderRadius="0"
        >
          <VscSignOut fontSize="24px" />
        </Button>
      </HStack>
    </Flex>
  )
}
