import { Flex } from '@chakra-ui/react'
import { Logo } from '../../Logo'
import { SignInOrSignOut } from '../../SignInOrSignUp'

export function HomeHeader() {
  return (
    <Flex
      as="header"
      paddingX="3.75rem"
      paddingY="1rem"
      width="inherit"
      alignItems="center"
      justifyContent="space-between"
      background="brand.body_background"
    >
      <Logo fontSize="1.25rem" sizeLogo="2rem" />

      <SignInOrSignOut />
    </Flex>
  )
}
