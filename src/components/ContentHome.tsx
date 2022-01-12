import { Box, Heading, VStack } from '@chakra-ui/react'
import { Typewriter } from 'react-simple-typewriter'
import dynamic from 'next/dynamic'
import { DeliveryAddressesUsed } from './DeliveryAddressesUsed'
const SearchboxWithNoSSR = dynamic(() => import('../components/Searchbox'), {
  ssr: false
})

const convincingSentences = [
  'Hungry?',
  'Unexpected guests?',
  'Cooking gone wrong?',
  'Movie marathon?',
  'Game night?',
  'Late night at office?'
]

export function ContentHome() {
  return (
    <Box paddingX="3.75rem" paddingTop="6.25rem">
      <VStack spacing="1rem" alignItems="flex-start">
        <Heading as="h1" fontSize="3rem" lineHeight="3rem" fontWeight="500">
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
          Order food from favourite restaurants near you.
        </Heading>
      </VStack>

      <SearchboxWithNoSSR />

      <DeliveryAddressesUsed />
    </Box>
  )
}
