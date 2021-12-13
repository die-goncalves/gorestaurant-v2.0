import { Flex, HStack, Button } from '@chakra-ui/react'
import React from 'react'
import { VscSignOut } from 'react-icons/vsc'
import { Cart } from '../../Cart'
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
        <Cart />
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
