import React, { useRef, useEffect, useContext } from 'react'
import mapboxgl from 'mapbox-gl'
import { Box } from '@chakra-ui/react'
import { LocationContext } from '../../contexts/LocationContext'

type MapDrawerProps = {
  setMyGeographicCoordinates: (
    state:
      | {
          lat: number
          lng: number
        }
      | undefined
  ) => void
}

export const MapDrawer = ({ setMyGeographicCoordinates }: MapDrawerProps) => {
  const { chosenLocation, decodeGeohash } = useContext(LocationContext)
  const map = useRef<mapboxgl.Map | null>(null)
  const mainMarker = useRef<mapboxgl.Marker | null>(null)

  const pin = document.createElement('img')
  pin.src = './user.svg'
  pin.alt = 'user'
  pin.width = 40
  pin.height = 40

  useEffect(() => {
    if (map.current) return
    if (chosenLocation) {
      const { latitude, longitude } = decodeGeohash(chosenLocation.geohash)
      map.current = new mapboxgl.Map({
        accessToken: process.env.NEXT_PUBLIC_MAPBOX_TOKEN,
        container: 'mapviews',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [longitude, latitude],
        zoom: 15
      })
    } else {
      map.current = new mapboxgl.Map({
        accessToken: process.env.NEXT_PUBLIC_MAPBOX_TOKEN,
        container: 'mapviews',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [-40.49625711236314, -19.714476951079774],
        zoom: 6.5
      })
    }

    map.current.addControl(new mapboxgl.NavigationControl())
    map.current.addControl(new mapboxgl.ScaleControl({ unit: 'metric' }))
    map.current.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true
        },
        trackUserLocation: false
      })
    )

    map.current.on('move', function (e) {
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

    map.current.on('moveend', function (e) {
      if (!map.current) return
      setMyGeographicCoordinates(map.current.getCenter())
    })

    map.current.resize()
    return () => map.current?.remove()
  }, [])

  return (
    <Box
      id="mapviews"
      w="100%"
      h="100%"
      sx={{
        '.mapboxgl-ctrl-logo': {
          margin: '0px'
        }
      }}
    ></Box>
  )
}
