import { Flex, HStack, Button, Box } from '@chakra-ui/react'
import { Logo } from '../../Logo'

export function RestaurantHeader() {
  return (
    <Flex
      as="header"
      paddingX="2rem"
      paddingY="1rem"
      alignItems="center"
      justifyContent="space-between"
    >
      <Logo fontSize="1.25rem" sizeLogo="2rem" marginX="4px" />

      <HStack spacing="1rem">
        <Button
          padding="0"
          variant="ghost"
          colorScheme="orange"
          borderRadius="0"
        >
          <Box as="span" className="material-icons-outlined">
            ramen_dining
          </Box>
        </Button>
        <Button
          onClick={() => {}}
          padding="0"
          variant="ghost"
          colorScheme="red"
          borderRadius="0"
        >
          <Box as="span" className="material-icons-outlined">
            logout
          </Box>
        </Button>
      </HStack>
    </Flex>
  )
}
