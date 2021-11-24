import { Box, Stack } from '@chakra-ui/react'
import Image from 'next/image'
import SVGLogo from '../../assets/logo.svg'

type LogoProps = {
  sizeLogo: string
  fontSize: string
  marginX?: string
}

export function Logo({ fontSize, sizeLogo, marginX = '0px' }: LogoProps) {
  return (
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
        <Image src={SVGLogo} alt="GoRestaurant" layout="fill" />
      </Box>
      <Box as="span" fontSize={fontSize} fontWeight="600" color="black">
        GoRestaurant
      </Box>
    </Stack>
  )
}
