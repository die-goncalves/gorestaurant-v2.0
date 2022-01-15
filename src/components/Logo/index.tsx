import { Box, Link as ChakraLink, Stack } from '@chakra-ui/react'
import Image from 'next/image'
import NextLink from 'next/link'
import SVGLogo from '../../assets/logo.svg'

type LogoProps = {
  sizeLogo: string
  fontSize: string
  color?: string
  marginX?: string
}

export function Logo({
  fontSize,
  sizeLogo,
  color = '#0C0600',
  marginX = '0px'
}: LogoProps) {
  return (
    <NextLink href="/" passHref>
      <ChakraLink
        display="flex"
        alignItems="center"
        sx={{
          _focus: { boxShadow: 'none' },
          _hover: { textDecoration: 'none' }
        }}
        draggable={false}
      >
        <Stack
          direction="row"
          spacing="0.5rem"
          alignItems="center"
          marginX={marginX}
        >
          <Box
            width={sizeLogo}
            height={sizeLogo}
            position="relative"
            verticalAlign="middle"
          >
            <Image
              priority
              src={SVGLogo}
              alt="GoRestaurant"
              layout="fill"
              draggable={false}
            />
          </Box>

          <Box
            as="span"
            fontSize={fontSize}
            fontWeight="600"
            sx={{
              background: `linear-gradient(to left, ${color} 50%, #DD6B20 85%)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            GoRestaurant
          </Box>
        </Stack>
      </ChakraLink>
    </NextLink>
  )
}
