import { extendTheme } from '@chakra-ui/react'

export const theme = extendTheme({
  components: {
    CloseButton: {
      variants: {
        'red-theme': {
          color: 'red.600',
          borderRadius: '0px',
          background: 'transparent',
          _focus: {
            boxShadow: '0 0 0 3px rgb(245, 101, 101, 0.6)'
          },
          _hover: {
            background: 'red.50'
          },
          _active: {
            background: 'red.100'
          }
        }
      }
    }
  },
  colors: {
    brand: {
      body_background: '#fdfdfd',
      input_background: '#fafafa',
      input_placeholder: '#989898',
      list_background: '#f5f5f5',
      list_hover: '#E6E6E6',
      text_color: '#0C0600',
      card_restaurant_background: '#FCFBF9'
    },
    scrollbar: {
      thumb_color: '#D1CFCE',
      thumb_hover_color: '#B3B1B0'
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
