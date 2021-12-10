import React, { useEffect, useRef } from 'react'
import { Box, Flex } from '@chakra-ui/react'
import { FeatureCollection } from 'geojson'
import mapboxgl from 'mapbox-gl'

type MapWithAllRestaurantsProps = {
  geojson: FeatureCollection | undefined
}

export function MapWithAllRestaurants({ geojson }: MapWithAllRestaurantsProps) {
  const map = useRef<mapboxgl.Map | null>(null)

  function flyToStore(currentFeature: any) {
    if (map.current)
      map.current.flyTo({
        center: currentFeature.geometry.coordinates,
        zoom: 12
      })
  }

  useEffect(() => {
    if (geojson !== undefined) {
      if (map.current) return
      map.current = new mapboxgl.Map({
        accessToken: process.env.NEXT_PUBLIC_MAPBOX_TOKEN,
        container: 'map-all-restaurant',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [-40.49625711236314, -19.714476951079774],
        zoom: 6
      })
      map.current.addControl(new mapboxgl.NavigationControl())
      map.current.addControl(new mapboxgl.ScaleControl({ unit: 'metric' }))
      map.current.on('load', () => {
        if (map.current) {
          map.current.addSource('places', {
            type: 'geojson',
            data: geojson
          })
          geojson?.features.forEach((item: any) => {
            if (map.current) {
              const el = document.createElement('img')
              el.id = `marker-${item.properties.id}`
              el.className = 'pointer'
              el.src = 'http://localhost:3000/pin-seen-from-above.svg'
              el.alt = 'user'
              el.width = 10

              const popup = new mapboxgl.Popup({
                closeOnClick: true,
                maxWidth: 'none'
              }).setHTML(
                `
                        <div class="texto">
                          <div class="heading">
                            ${item.properties.name}
                            <div class="rating">
                              ${item.properties.rating}
                              ${
                                item.properties.overallRating.split(
                                  /<[^>]+?>/g
                                )[1] !== 'undefined'
                                  ? item.properties.overallRating
                                  : ''
                              }
                              ${item.properties.textOverallRating}
                            </div>
                          </div>
                          <div class="phone">
                            <span class="material-icons-outlined">
                              whatsapp
                            </span>
                            ${item.properties.phone}
                          </div>
                          <div class="description">${
                            item.properties.description
                          }</div>
                        </div>
                        <div class="imagem">${item.properties.image}</div>
                      `
              )
              new mapboxgl.Marker(el)
                .setLngLat(item.geometry.coordinates)
                .setPopup(popup)
                .addTo(map.current)

              el.addEventListener('click', e => {
                flyToStore(item)
              })
            }
          })
        }
      })
    }
  }, [geojson])

  return (
    <Flex w="100%" alignItems="center" justifyContent="center">
      <Box display="flex" w="100%" h="400px" position="relative">
        <Box
          id="map-all-restaurant"
          width="100%"
          sx={{
            '.mapboxgl-ctrl-logo': {
              margin: '0px'
            },
            '.pointer': {
              _hover: {
                cursor: 'pointer'
              }
            },
            '.mapboxgl-popup': {
              '.mapboxgl-popup-close-button': {
                display: 'none'
              },
              '.mapboxgl-popup-content': {
                display: 'grid',
                width: '400px',
                gridTemplateColumns: '100px 300px',
                gridTemplateRows: '150px',
                gap: '0px 0px',
                gridTemplateAreas: `'imagem texto'`,
                borderRadius: '7.5px 0px 0px 7.5px',
                padding: '0px',
                '.imagem': {
                  gridArea: 'imagem',
                  img: {
                    height: '150px',
                    width: '100px',
                    borderLeftRadius: '7.5px',
                    objectFit: 'cover'
                  }
                },
                '.texto': {
                  gridArea: 'texto',
                  display: 'flex',
                  flexDirection: 'column',
                  '.heading': {
                    display: 'flex',
                    padding: '8px 8px 0px 8px',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    h1: {
                      paddingLeft: '4px',
                      boxShadow: '-2px 0px 0px 0px #C05621',
                      fontSize: '16px',
                      lineHeight: '16px',
                      fontWeight: '600',
                      maxWidth: '180px',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis'
                    },
                    '.rating': {
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      '.starRating': {
                        fontSize: '20px',
                        lineHeight: '20px',
                        height: '20px',
                        fontWeight: '600'
                      },
                      '.overallRating': {
                        fontSize: '14px',
                        lineHeight: '14px'
                      },
                      '.textOverallRating': {
                        fontSize: '14px',
                        lineHeight: '14px'
                      }
                    }
                  },
                  '.phone': {
                    display: 'flex',
                    padding: '4px 8px',
                    gap: '4px',
                    justifyContent: 'center',
                    alignItems: 'center',
                    boxShadow: '0px 5px 15px -11.5px #000000',
                    span: {
                      fontSize: '16px',
                      color: 'green.500'
                    },
                    p: {
                      fontSize: '14px',
                      lineHeight: '14px'
                    }
                  },
                  '.description': {
                    textIndent: '4px',
                    textAlign: 'justify',
                    maxHeight: '98px',
                    fontSize: '14px',
                    color: 'gray.600',
                    padding: '0px 4px 4px 8px',
                    overflow: 'auto',
                    scrollbarGutter: 'stable',
                    '::-webkit-scrollbar': {
                      width: '0.25rem'
                    },
                    '::-webkit-scrollbar-track': {
                      background: 'brand.body_background'
                    },
                    '::-webkit-scrollbar-thumb': {
                      background: 'scrollbar.thumb_color',
                      '&:hover': {
                        background: 'scrollbar.thumb_hover_color'
                      }
                    }
                  }
                }
              }
            }
          }}
        />
      </Box>
    </Flex>
  )
}
