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
                        <div class="text">
                          <div class="heading">
                            <div class="name">
                              ${item.properties.name}
                            </div>
                            <div class="rating-phone">
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

                              <div class="phone">
                                <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 448 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"></path></svg>
                                ${item.properties.phone}
                              </div>
                            </div>
                          </div>
                          <div class="description">${
                            item.properties.description
                          }</div>
                        </div>
                        <div class="image">${item.properties.image}</div>
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
                borderRadius: '0px',
                display: 'grid',
                width: '25rem',
                gridTemplateColumns: '6.25rem 18.75rem',
                gridTemplateRows: '9.375rem',
                gap: '0px 0px',
                gridTemplateAreas: `'image text'`,
                padding: '0px',
                '.image': {
                  gridArea: 'image',
                  img: {
                    height: '9.375rem',
                    width: '6.25rem',
                    objectFit: 'cover'
                  }
                },
                '.text': {
                  fontFamily: 'Barlow Semi Condensed',
                  gridArea: 'text',
                  display: 'flex',
                  flexDirection: 'column',
                  '.heading': {
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: '0.5rem',
                    '.name': {
                      display: 'flex',
                      alignItems: 'center',
                      fontSize: '1.125rem',
                      lineHeight: '1.125rem',
                      fontWeight: '500',
                      maxWidth: '10.625rem',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis'
                    },
                    '.rating-phone': {
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.25rem',
                      '.rating': {
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                        gap: '0.25rem',
                        '.starRating': {
                          textAlign: 'center',
                          fontSize: '1rem',
                          lineHeight: '1rem',
                          fontWeight: '600'
                        },
                        '.overallRating': {
                          fontSize: '1rem',
                          lineHeight: '1rem'
                        },
                        '.textOverallRating': {
                          fontSize: '1rem',
                          lineHeight: '1rem'
                        }
                      },
                      '.phone': {
                        display: 'flex',
                        gap: '0.25rem',
                        justifyContent: 'center',
                        alignItems: 'center',
                        svg: {
                          fontSize: '0.75rem',
                          color: 'green.500'
                        },
                        p: {
                          fontWeight: '300',
                          fontSize: '0.875rem',
                          lineHeight: '0.875rem'
                        }
                      }
                    }
                  },
                  '.description': {
                    textIndent: '0.25rem',
                    textAlign: 'justify',
                    maxHeight: '6.25rem',
                    fontSize: '0.875rem',
                    fontWeight: '300',
                    padding: '0rem 0.25rem 0.5rem 0.5rem',
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
