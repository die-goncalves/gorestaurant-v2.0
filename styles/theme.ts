import { extendTheme } from '@chakra-ui/react'

export const theme = extendTheme({
  colors: {
    brand: {
      body_background: '#fdfdfd',
      input_background: '#fafafa',
      input_placeholder: '#989898',
      list_background: '#f5f5f5',
      list_hover: '#E6E6E6',
      text_color: '#0C0600'
    }
  },
  fonts: {
    heading: 'Cairo',
    body: 'Cairo'
  },
  styles: {
    global: {
      body: {
        bg: '#fdfdfd',
        color: '#0C0600'
      }
    }
  }
})
