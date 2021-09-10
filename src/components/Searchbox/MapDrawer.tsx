import React, { useRef, useEffect } from 'react'
import mapboxgl from 'mapbox-gl'
import { Box } from '@chakra-ui/react'

type MyLocation = {
  lat: number
  lng: number
  place_description: string
}

type MapDrawerProps = {
  setMycoordinates: (state: MyLocation | null) => void
}

export const MapDrawer = ({ setMycoordinates }: MapDrawerProps) => {
  mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN

  const map = useRef<mapboxgl.Map | null>(null)
  const mainMarker = useRef<mapboxgl.Marker | null>(null)

  const geolocate = new mapboxgl.GeolocateControl({
    positionOptions: {
      enableHighAccuracy: true
    },
    trackUserLocation: false
  })

  const pin = document.createElement('img')
  pin.src = './pin.svg'
  pin.alt = 'pin'
  pin.width = 30
  pin.height = 30

  useEffect(() => {
    if (map.current) return // initialize map only once
    map.current = new mapboxgl.Map({
      container: 'mapviews',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-40.49625711236314, -19.714476951079774],
      zoom: 6.5
    })

    map.current.addControl(geolocate)
    geolocate.on('geolocate', (position: any) => {
      console.log(position?.coords)
    })

    map.current.on('click', e => {
      // console.log(e)
      if (!map.current) return

      if (mainMarker.current) {
        mainMarker.current.setLngLat([e.lngLat.wrap().lng, e.lngLat.wrap().lat])
        const features = map.current.queryRenderedFeatures(e.point)
        // console.log(features)
        setMycoordinates({
          lng: e.lngLat.wrap().lng,
          lat: e.lngLat.wrap().lat,
          place_description: features[0].properties?.name
        })
      } else {
        mainMarker.current = new mapboxgl.Marker({
          anchor: 'bottom',
          element: pin
        })
          .setLngLat([e.lngLat.wrap().lng, e.lngLat.wrap().lat])
          .addTo(map.current)

        const features = map.current.queryRenderedFeatures(e.point)
        // console.log(features)
        setMycoordinates({
          lng: e.lngLat.wrap().lng,
          lat: e.lngLat.wrap().lat,
          place_description: features[0].properties?.name
        })
      }
    })

    map.current.resize()
    // Clean up on unmount
    return () => map.current?.remove()
  }, [])

  return <Box id="mapviews" w="100%" h="100%"></Box>
}
