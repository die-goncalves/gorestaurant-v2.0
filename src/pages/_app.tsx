import { ChakraProvider } from '@chakra-ui/react'
import type { AppProps } from 'next/app'
import { AuthProvider } from '../contexts/AuthContext'
import { theme } from '../../styles/theme'
import { Notifications } from '../components/Notifications'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { useState } from 'react'
import 'mapbox-gl/dist/mapbox-gl.css'
import { FilterProvider } from '../contexts/FilterContext'
import { LocationProvider } from '../contexts/LocationContext'
import { RestaurantProvider } from '../contexts/RestaurantContext'
import { CartProvider } from '../hooks/useCart'

function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient())

  return (
    <ChakraProvider theme={theme}>
      <AuthProvider>
        <CartProvider>
          <LocationProvider>
            <FilterProvider>
              <RestaurantProvider>
                <QueryClientProvider client={queryClient}>
                  <Component {...pageProps} />
                  <Notifications />
                  <ReactQueryDevtools />
                </QueryClientProvider>
              </RestaurantProvider>
            </FilterProvider>
          </LocationProvider>
        </CartProvider>
      </AuthProvider>
    </ChakraProvider>
  )
}
export default MyApp
