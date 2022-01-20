import {
  Flex,
  Link as ChakraLink,
  Text,
  LinkProps as ChakraLinkProps
} from '@chakra-ui/react'
import React from 'react'
import NextLink from 'next/link'

type IconSiteLinkProps = {
  title: string
  children: string
  href: string
} & ChakraLinkProps

export function IconSiteLink({
  title,
  children,
  href,
  ...rest
}: IconSiteLinkProps) {
  return (
    <Flex sx={{ gap: '0.5rem' }}>
      <Text fontWeight="500">de</Text>
      <NextLink href={href} passHref>
        <ChakraLink title={title} isExternal {...rest}>
          <Text fontStyle="italic">{children}</Text>
        </ChakraLink>
      </NextLink>
    </Flex>
  )
}
