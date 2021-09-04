import { Box, Stack } from '@chakra-ui/react'
import Image from 'next/image'
import SVGLogo from '../../assets/logo.svg'

export function Logo() {
  return (
    <Stack direction="row" spacing="0.5rem" alignItems="center">
      <Box
        width="50px"
        height="50px"
        position="relative"
        verticalAlign="middle"
      >
        <Image src={SVGLogo} alt="GoRestaurant" layout="fill" />
      </Box>
      <Box as="span" fontSize="1.5rem" color="black">
        GoRestaurant
      </Box>
    </Stack>
  )
}
