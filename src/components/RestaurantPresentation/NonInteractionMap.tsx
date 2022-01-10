import { Box } from '@chakra-ui/react'
import mapboxgl from 'mapbox-gl'
import React, { useEffect, useRef } from 'react'
import { TRestaurant } from '../../types'

type NonInteractionMapProps = Pick<TRestaurant, 'coordinates'>

export function NonInteractionMap({ coordinates }: NonInteractionMapProps) {
  const map = useRef<mapboxgl.Map | null>(null)

  const pin = document.createElement('img')
  pin.src = 'http://localhost:3000/pin-seen-from-above.svg'
  pin.alt = 'svg restaurant'
  pin.width = 20
  pin.height = 20

  useEffect(() => {
    if (map.current) return
    map.current = new mapboxgl.Map({
      accessToken: process.env.NEXT_PUBLIC_MAPBOX_TOKEN,
      container: 'non-interaction-map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [coordinates.lng, coordinates.lat],
      interactive: false,
      minZoom: 6,
      zoom: 15
    })
    map.current.addControl(new mapboxgl.NavigationControl())
    map.current.addControl(new mapboxgl.ScaleControl({ unit: 'metric' }))

    new mapboxgl.Marker({
      anchor: 'bottom',
      element: pin
    })
      .setLngLat([coordinates.lng, coordinates.lat])
      .addTo(map.current)

    map.current.resize()
    return () => map.current?.remove()
  }, [])

  return (
    <Box
      id="non-interaction-map"
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
