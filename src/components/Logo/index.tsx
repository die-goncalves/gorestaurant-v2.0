import { Box, Stack } from '@chakra-ui/react'
import Image from 'next/image'
import SVGLogo from '../../assets/logo.svg'

type LogoProps = {
  size_logo: string
  font_size: string
}

export function Logo({ font_size, size_logo }: LogoProps) {
  return (
    <Stack direction="row" spacing="0.5rem" alignItems="center">
      <Box
        width={size_logo}
        height={size_logo}
        position="relative"
        verticalAlign="middle"
      >
        <Image src={SVGLogo} alt="GoRestaurant" layout="fill" />
      </Box>
      <Box as="span" fontSize={font_size} fontWeight="600" color="black">
        GoRestaurant
      </Box>
    </Stack>
  )
}
