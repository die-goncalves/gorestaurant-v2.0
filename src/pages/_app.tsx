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

function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient())

  return (
    <ChakraProvider theme={theme}>
      <AuthProvider>
        <FilterProvider>
          <QueryClientProvider client={queryClient}>
            <Component {...pageProps} />
            <Notifications />
            <ReactQueryDevtools />
          </QueryClientProvider>
        </FilterProvider>
      </AuthProvider>
    </ChakraProvider>
  )
}
export default MyApp
