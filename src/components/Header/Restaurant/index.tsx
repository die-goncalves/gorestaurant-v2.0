import { Flex, HStack } from '@chakra-ui/react'
import React from 'react'
import { Cart } from '../../Cart'
import { Logo } from '../../Logo'
import { SignInOrSignOut } from '../../SignInOrSignUp'

export function RestaurantHeader() {
  return (
    <Flex
      as="header"
      paddingX="2rem"
      paddingY="1rem"
      alignItems="center"
      justifyContent="space-between"
    >
      <Logo fontSize="1.25rem" sizeLogo="2rem" marginX="0.25rem" />

      <HStack spacing="1rem">
        <Cart />

        <SignInOrSignOut />
      </HStack>
    </Flex>
  )
}
