import { Button, Flex, Link as ChakraLink, Text } from '@chakra-ui/react'
import NextLink from 'next/link'
import { GrTwitter, GrPinterest, GrFacebook, GrInstagram } from 'react-icons/gr'
import { FaGooglePlay, FaApple } from 'react-icons/fa'
import { Logo } from '../components/Logo'

export function Footer() {
  return (
    <Flex
      as="footer"
      flex="1"
      backgroundColor="brand.footer_background"
      position="relative"
      flexDirection="column"
      padding="1rem 1rem 3rem"
    >
      <Flex
        justifyContent="space-between"
        paddingBottom="1rem"
        borderBottom="2px solid #aaaaaa84"
      >
        <Flex w="auto">
          <Logo fontSize="1rem" sizeLogo="1.5rem" color="#aaaaaa" />
        </Flex>

        <Flex alignItems="center" sx={{ gap: '1rem' }} color="#aaaaaa">
          <NextLink href={'https://www.twitter.com/'} passHref>
            <ChakraLink
              target="_blank"
              _hover={{ color: 'blue.400' }}
              _focus={{ boxShadow: 'none' }}
            >
              <GrTwitter size="1rem" />
            </ChakraLink>
          </NextLink>
          <NextLink href={'https://pinterest.com/'} passHref>
            <ChakraLink
              target="_blank"
              _hover={{ color: 'red.600' }}
              _focus={{ boxShadow: 'none' }}
            >
              <GrPinterest size="1rem" />
            </ChakraLink>
          </NextLink>
          <NextLink href={'https://www.facebook.com/'} passHref>
            <ChakraLink
              target="_blank"
              _hover={{ color: 'blue.600' }}
              _focus={{ boxShadow: 'none' }}
            >
              <GrFacebook size="1rem" />
            </ChakraLink>
          </NextLink>
          <NextLink href={'https://www.instagram.com/'} passHref>
            <ChakraLink
              target="_blank"
              _hover={{ color: 'purple.600' }}
              _focus={{ boxShadow: 'none' }}
            >
              <GrInstagram size="1rem" />
            </ChakraLink>
          </NextLink>
        </Flex>
      </Flex>

      <Flex paddingTop="0.5rem" justifyContent="space-between">
        <Flex sx={{ gap: '0.5rem' }}>
          <NextLink href={'https://play.google.com/store/apps/'} passHref>
            <ChakraLink
              height="max-content"
              target="_blank"
              sx={{
                '&:focus': {
                  boxShadow: 'none'
                },
                '&:hover': {
                  textDecoration: 'none'
                }
              }}
            >
              <Button
                display="flex"
                justifyContent="flex-start"
                maxHeight="auto"
                width="8rem"
                padding="0rem 0.5rem"
                borderRadius="0px"
                colorScheme="whiteAlpha"
                variant="outline"
                color="#aaaaaa"
                borderColor="#aaaaaa84"
                sx={{
                  '&:focus': {
                    boxShadow: 'none'
                  }
                }}
              >
                <FaGooglePlay size="1.25rem" />
                <Flex
                  display="flex"
                  flexDirection="column"
                  marginLeft="0.5rem"
                  alignItems="flex-start"
                >
                  <Text fontSize="0.5625rem">DISPONÍVEL NO</Text>
                  <Text fontSize="1rem">Google Play</Text>
                </Flex>
              </Button>
            </ChakraLink>
          </NextLink>

          <NextLink href={'https://www.apple.com/app-store/'} passHref>
            <ChakraLink
              height="max-content"
              target="_blank"
              sx={{
                '&:focus': {
                  boxShadow: 'none'
                },
                '&:hover': {
                  textDecoration: 'none'
                }
              }}
            >
              <Button
                display="flex"
                justifyContent="flex-start"
                maxHeight="auto"
                width="8rem"
                padding="0rem 0.5rem"
                borderRadius="0px"
                colorScheme="whiteAlpha"
                variant="outline"
                color="#aaaaaa"
                borderColor="#aaaaaa84"
                sx={{
                  '&:focus': {
                    boxShadow: 'none'
                  }
                }}
              >
                <FaApple size="1.5rem" />
                <Flex
                  display="flex"
                  flexDirection="column"
                  marginLeft="0.5rem"
                  alignItems="flex-start"
                >
                  <Text fontSize="0.5625rem">Disponível na</Text>
                  <Text fontSize="1rem">App Store</Text>
                </Flex>
              </Button>
            </ChakraLink>
          </NextLink>
        </Flex>

        <Flex color="#aaaaaa" flexDirection="column" alignItems="flex-end">
          <Text>©2021 GoRestaurant</Text>

          <Text>
            Website criado por{' '}
            <NextLink href="https://github.com/die-goncalves" passHref>
              <ChakraLink
                sx={{
                  fontWeight: '600',
                  '&:hover': {
                    color: 'orange.500',
                    textDecoration: 'none'
                  },
                  '&:focus': {
                    boxShadow: 'none'
                  }
                }}
              >
                Diego Gonçalves
              </ChakraLink>
            </NextLink>
          </Text>

          <NextLink href="/about" passHref>
            <ChakraLink
              sx={{
                fontWeight: '600',
                '&:hover': {
                  color: 'orange.500',
                  textDecoration: 'none'
                },
                '&:focus': {
                  boxShadow: 'none'
                }
              }}
            >
              Sobre este projeto
            </ChakraLink>
          </NextLink>
        </Flex>
      </Flex>
    </Flex>
  )
}
