import { Box, Heading, VStack } from '@chakra-ui/react'
import { Typewriter } from 'react-simple-typewriter'
import dynamic from 'next/dynamic'
import { DeliveryAddressesUsed } from './DeliveryAddressesUsed'
const SearchboxWithNoSSR = dynamic(() => import('../components/Searchbox'), {
  ssr: false
})

const convincingSentences = [
  'Trabalhou até tarde?',
  'Encontro com amigos?',
  'Não está a fim de cozinhar?',
  'Está com fome, mas não está em casa?',
  'Maratonando sua série favorita?'
]

export function ContentHome() {
  return (
    <Box paddingX="3.75rem" paddingTop="6.25rem">
      <VStack spacing="1rem" alignItems="flex-start">
        <Heading as="h1" fontSize="2.8rem" lineHeight="3rem" fontWeight="500">
          <Typewriter
            words={convincingSentences}
            loop={false}
            cursor
            cursorStyle="|"
            typeSpeed={70}
            deleteSpeed={35}
            delaySpeed={1000}
          />
        </Heading>

        <Heading as="h2" fontSize="1.5rem" fontWeight="400">
          Faça pedidos de suas comidas favoritas em restaurantes pertos de você
        </Heading>
      </VStack>

      <SearchboxWithNoSSR />

      <DeliveryAddressesUsed />
    </Box>
  )
}
