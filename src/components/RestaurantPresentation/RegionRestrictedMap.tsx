import { Box } from '@chakra-ui/react'
import mapboxgl from 'mapbox-gl'
import { useContext, useEffect, useRef, useState } from 'react'
import { GeographicFeatureWithCoordinates } from '../../contexts/FilterContext'
import { LocationContext } from '../../contexts/LocationContext'
import { RestaurantContext } from '../../contexts/RestaurantContext'

type RegionRestrictedMapProps = {
  setPreviewLocation: (state: GeographicFeatureWithCoordinates) => void
}

export function RegionRestrictedMap({
  setPreviewLocation
}: RegionRestrictedMapProps) {
  const { userLocation } = useContext(RestaurantContext)
  const { encodeGeohash, generateGeographicInformation } =
    useContext(LocationContext)
  const [lngLat, setLngLat] =
    useState<{ longitude: number; latitude: number }>()

  const map = useRef<mapboxgl.Map | null>(null)
  const mainMarker = useRef<mapboxgl.Marker | null>(null)

  const pin = document.createElement('img')
  pin.src = 'http://localhost:3000/user.svg'
  pin.alt = 'user'
  pin.width = 40

  useEffect(() => {
    if (map.current) return
    map.current = new mapboxgl.Map({
      accessToken: process.env.NEXT_PUBLIC_MAPBOX_TOKEN,
      container: 'modalMapbox',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [
        userLocation?.coordinates.longitude ?? -40.49625711236314,
        userLocation?.coordinates.latitude ?? -19.714476951079774
      ],
      zoom: 15
    })
    map.current.addControl(new mapboxgl.NavigationControl())
    map.current.addControl(new mapboxgl.ScaleControl({ unit: 'metric' }))

    map.current.on('move', function () {
      if (!map.current) return

      if (mainMarker.current) {
        mainMarker.current.setLngLat([
          Number(map.current.getCenter().lng),
          Number(map.current.getCenter().lat)
        ])
      } else {
        mainMarker.current = new mapboxgl.Marker({
          anchor: 'bottom',
          element: pin,
          offset: [0, 4]
        })
          .setLngLat([
            Number(map.current.getCenter().lng),
            Number(map.current.getCenter().lat)
          ])
          .addTo(map.current)
      }
    })

    map.current.on('moveend', function () {
      if (!map.current) return
      setLngLat({
        longitude: map.current.getCenter().lng,
        latitude: map.current.getCenter().lat
      })
    })

    map.current.resize()
    return () => map.current?.remove()
  }, [])

  useEffect(() => {
    if (lngLat) {
      fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${lngLat.longitude},${lngLat.latitude}.json?limit=1&access_token=${process.env.NEXT_PUBLIC_MAPBOX_TOKEN}`
      )
        .then(response => response.json())
        .then(data => {
          const { granular, place, place_name } = generateGeographicInformation(
            data.features[0]
          )
          const encoded = encodeGeohash(lngLat)
          setPreviewLocation({
            coordinates: lngLat,
            geohash: encoded,
            granular,
            place,
            place_name
          })
        })
    }
  }, [lngLat])

  return (
    <Box
      id="modalMapbox"
      display="flex"
      w="inherit"
      h="inherit"
      sx={{
        '.mapboxgl-ctrl-logo': {
          margin: '0px'
        }
      }}
    ></Box>
  )
}
