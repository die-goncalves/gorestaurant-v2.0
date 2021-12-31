import {
  Icon,
  Flex,
  Link as ChakraLink,
  Text,
  LinkProps as ChakraLinkProps
} from '@chakra-ui/react'
import React, { ElementType } from 'react'
import ActiveLink from './ActiveLink'

type NavLinkProps = {
  icon: ElementType
  children: string
  href: string
} & ChakraLinkProps

export default function NavLink({
  icon,
  children,
  href,
  ...rest
}: NavLinkProps) {
  return (
    <>
      <ActiveLink href={href} passHref>
        <ChakraLink
          display="flex"
          alignItems="center"
          sx={{
            _focus: { boxShadow: 'none' }
          }}
          {...rest}
        >
          <Flex
            justifyContent="center"
            alignItems="center"
            borderRadius="full"
            boxSize="2.5rem"
            transition="0.2s background ease-in-out"
            sx={{
              '.button-dashboard:hover &': {
                background: 'orange.50'
              },
              '.button-dashboard:active &': {
                background: 'orange.100'
              }
            }}
          >
            <Icon as={icon} fontSize="1.5rem" />
          </Flex>

          <Text marginLeft="4" fontWeight="500">
            {children}
          </Text>
        </ChakraLink>
      </ActiveLink>
    </>
  )
}
