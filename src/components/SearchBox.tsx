import { Box, Button, Flex, Icon, Input } from '@chakra-ui/react'

export default function SearchBox() {
  return (
    <Flex
      maxWidth="inherit"
      marginTop="3rem"
      marginBottom="1rem"
      background="chocolate"
      alignItems="center"
    >
      <Flex
        as="label"
        flex="1"
        paddingY="0.75rem"
        paddingX="1.25rem"
        alignSelf="center"
        color="gray.200"
        position="relative"
        background="gray.800"
        borderRadius="none"
        alignItems="center"
      >
        <Box
          as="span"
          className="material-icons"
          marginRight="0.625rem"
          color="gray.200"
        >
          share_location
        </Box>

        <Input
          color="gray.50"
          variant="unstyled"
          borderRadius="none"
          placeholder="Enter the delivery address"
          _placeholder={{ color: 'gray.200' }}
        />
      </Flex>
      <Button borderRadius="none" colorScheme="orange" variant="solid">
        Find Food
      </Button>
    </Flex>
  )
}
