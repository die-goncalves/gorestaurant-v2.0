import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react'
import { useContext } from 'react'
import { UserLocationContext } from '../contexts/UserLocationContext'

type RestaurantPathsProps = {
  restaurantName: string
  place: string
}

export function RestaurantPaths({
  restaurantName,
  place
}: RestaurantPathsProps) {
  const { userLocation } = useContext(UserLocationContext)
  return (
    <Breadcrumb separator="/">
      <BreadcrumbItem>
        <BreadcrumbLink
          fontWeight="500"
          href="/"
          sx={{
            transition: '0.2s ease-in-out color',
            _focus: { boxShadow: 'none' },
            _hover: { textDecoration: 'none', color: '#C05621' }
          }}
        >
          Página inicial
        </BreadcrumbLink>
      </BreadcrumbItem>

      <BreadcrumbItem>
        <BreadcrumbLink
          fontWeight="500"
          href={
            userLocation
              ? `/restaurants?place=${place}&geohash=${userLocation?.geohash}`
              : `/restaurants?place=${place}`
          }
          sx={{
            transition: '0.2s ease-in-out color',
            _focus: { boxShadow: 'none' },
            _hover: { textDecoration: 'none', color: '#C05621' }
          }}
        >
          {place}
        </BreadcrumbLink>
      </BreadcrumbItem>

      <BreadcrumbItem isCurrentPage>
        <BreadcrumbLink
          fontWeight="600"
          href="#"
          sx={{ cursor: 'text', _hover: { textDecoration: 'none' } }}
        >
          {restaurantName}
        </BreadcrumbLink>
      </BreadcrumbItem>
    </Breadcrumb>
  )
}
