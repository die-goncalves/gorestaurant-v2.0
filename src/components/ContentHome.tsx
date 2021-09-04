import { Box, Heading, VStack } from '@chakra-ui/react'
import { Typewriter } from 'react-simple-typewriter'
import SearchBox from './SearchBox'

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
    <Box paddingX="60px" paddingY="100px">
      <VStack spacing="1rem" alignItems="flex-start">
        <Heading as="h1" size="2xl">
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

        <Heading as="h2" fontSize="1.5rem" fontWeight="300">
          Order food from favourite restaurants near you.
        </Heading>
      </VStack>

      <SearchBox />

      <Box as="h3">Most commonly used delivery addresses</Box>
    </Box>
  )
}
