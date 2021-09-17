import { Flex, Button, ButtonGroup } from '@chakra-ui/react'
import { Logo } from './Logo'
import SignUp from '../SignUp'
import SignIn from '../SignIn'

export function Header() {
  return (
    <Flex
      as="header"
      paddingX="60px"
      paddingY="1rem"
      width="inherit"
      alignItems="center"
      justifyContent="space-between"
      background="brand.body_background"
    >
      <Logo />

      <ButtonGroup isAttached variant="solid" colorScheme="orange">
        <SignIn />
        <SignUp />
      </ButtonGroup>
    </Flex>
  )
}
