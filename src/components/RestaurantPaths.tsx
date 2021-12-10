import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react'
import { useContext } from 'react'
import { RestaurantContext } from '../contexts/RestaurantContext'

type RestaurantPathsProps = {
  restaurantName: string
  place: string
}

export function RestaurantPaths({
  restaurantName,
  place
}: RestaurantPathsProps) {
  const { userLocation } = useContext(RestaurantContext)
  return (
    <Breadcrumb separator="/">
      <BreadcrumbItem>
        <BreadcrumbLink
          fontWeight="600"
          href="/"
          sx={{
            transition: '0.2s ease-in-out color',
            _focus: { boxShadow: 'none' },
            _hover: { textDecoration: 'none', color: '#C05621' }
          }}
        >
          Home
        </BreadcrumbLink>
      </BreadcrumbItem>

      <BreadcrumbItem>
        <BreadcrumbLink
          fontWeight="600"
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
