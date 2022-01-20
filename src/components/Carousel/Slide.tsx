import { Box, Flex } from '@chakra-ui/react'
import { ReactNode } from 'react'

type SlideProps = {
  children: ReactNode
}

export function Slide({ children }: SlideProps) {
  return (
    <Box
      sx={{
        minWidth: '100%',
        position: 'relative'
      }}
    >
      <Box
        sx={{
          display: 'flex',
          position: 'relative',
          height: '400px',
          overflow: 'hidden'
        }}
      >
        {children}
      </Box>
    </Box>
  )
}
