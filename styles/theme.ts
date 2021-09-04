import { extendTheme } from '@chakra-ui/react'

export const theme = extendTheme({
  fonts: {
    heading: 'Cairo',
    body: 'Cairo'
  },
  styles: {
    global: {
      body: {
        bg: '#FFFDFC',
        color: '#0C0600'
      }
    }
  }
})
