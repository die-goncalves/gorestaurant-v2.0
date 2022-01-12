import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  useDisclosure,
  Button,
  Box,
  CloseButton,
  Flex,
  Text,
  Input
} from '@chakra-ui/react'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { MapDrawer } from './MapDrawer'
import { FiMap } from 'react-icons/fi'
import { UserLocationContext } from '../../contexts/UserLocationContext'

export const DrawerUserLocation = () => {
  const {
    userLocation,
    setUserLocation,
    generateGeographicInformation,
    encodeGeohash
  } = useContext(UserLocationContext)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [myGeographicCoordinates, setMyGeographicCoordinates] =
    useState<{ lat: number; lng: number }>()
  const firstField = useRef<any>()

  useEffect(() => {
    if (myGeographicCoordinates) {
      fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${myGeographicCoordinates.lng},${myGeographicCoordinates.lat}.json?limit=1&access_token=${process.env.NEXT_PUBLIC_MAPBOX_TOKEN}`
      )
        .then(response => response.json())
        .then(data => {
          if (data.features.length !== 0) {
            const { granular, place, place_name } =
              generateGeographicInformation(data.features[0])
            setUserLocation({
              coordinates: {
                latitude: data.features[0].geometry.coordinates[1],
                longitude: data.features[0].geometry.coordinates[0]
              },
              geohash: encodeGeohash({
                latitude: data.features[0].geometry.coordinates[1],
                longitude: data.features[0].geometry.coordinates[0]
              }),
              granular,
              place_name,
              place
            })
          }
        })
    }
  }, [myGeographicCoordinates])

  return (
    <>
      <Box
        display="flex"
        h="48px"
        background="brand.body_background"
        alignItems="center"
      >
        <Button
          onClick={onOpen}
          borderRadius="full"
          colorScheme="orange"
          variant="outline"
          paddingY="1rem"
          paddingX="0"
          marginX="1rem"
          borderColor="#DD6B20"
          sx={{
            _focus: {
              boxShadow: '0 0 0 3px rgba(237, 137, 54, 0.6)'
            }
          }}
        >
          <FiMap fontSize="20px" />
        </Button>
      </Box>

      <Drawer
        isOpen={isOpen}
        placement="right"
        initialFocusRef={firstField}
        onClose={onClose}
      >
        <DrawerOverlay />
        <DrawerContent minW="40vw" background="brand.body_background">
          <DrawerHeader padding="0.625rem">
            <Flex alignItems="center" justifyContent="space-between">
              <Text lineHeight="1.25rem" fontWeight="bold">
                Where you are?
              </Text>

              <CloseButton
                onClick={() => {
                  setUserLocation(undefined)
                  onClose()
                }}
                variant="red-theme"
              />
            </Flex>
          </DrawerHeader>

          <DrawerBody margin="0px" padding="0px" position="relative">
            <MapDrawer
              setMyGeographicCoordinates={setMyGeographicCoordinates}
            />
          </DrawerBody>

          <DrawerFooter
            display="flex"
            justifyContent="space-between"
            padding="0.625rem"
            sx={{ gap: '0.625rem' }}
          >
            <Input
              flex="1"
              variant="filled"
              borderRadius="0px"
              value={userLocation?.place_name ?? ''}
              placeholder="Here you will see your exact location"
              isReadOnly
              background="orange.50"
              fontWeight="semibold"
              borderColor="orange.100"
              _focus={{
                background: 'orange.100',
                borderColor: 'rgb(237, 137, 54, 0.6)'
              }}
              _hover={{
                background: 'orange.100'
              }}
              _placeholder={{
                color: 'orange.500'
              }}
            />
            <Button
              onClick={onClose}
              borderRadius="0px"
              colorScheme="green"
              sx={{
                _focus: {
                  boxShadow: '0 0 0 3px rgb(72, 187, 120, 0.6)'
                }
              }}
            >
              Confirm
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  )
}
