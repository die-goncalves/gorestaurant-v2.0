import { Flex, Stack, Text } from '@chakra-ui/react'
import { ReactNode } from 'react'

interface NavSectionProps {
  title: string
  children: ReactNode
}

export default function NavSection({ title, children }: NavSectionProps) {
  return (
    <Flex w="inherit" flexDirection="column">
      <Text fontWeight="600" color="gray.500" fontSize="0.875rem">
        {title}
      </Text>
      <Stack spacing="4" marginTop="8">
        {children}
      </Stack>
    </Flex>
  )
}
