import { Flex, Button, ButtonGroup } from '@chakra-ui/react'
import { Logo } from './Logo'

export function Header() {
  return (
    <Flex
      as="header"
      paddingX="60px"
      paddingY="1rem"
      width="inherit"
      alignItems="center"
      justifyContent="space-between"
      boxShadow="0px 0.005rem 0.25rem gray"
    >
      <Logo />

      <ButtonGroup isAttached variant="solid" colorScheme="orange">
        <Button variant="ghost" borderRadius="none">
          Sign in
        </Button>
        <Button borderRadius="none">Sign up</Button>
      </ButtonGroup>
    </Flex>
  )
}
