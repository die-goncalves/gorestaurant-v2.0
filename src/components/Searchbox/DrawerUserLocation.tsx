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
  ButtonGroup
} from '@chakra-ui/react'
import React, { useRef, useState } from 'react'
import { MapDrawer } from './MapDrawer'

type MyLocation = {
  lat: number
  lng: number
  place_description: string
}

type DrawerUserLocationProps = {
  setGeoposition: (state: MyLocation | null) => void
  setIsDataComingFromDrawer: (state: boolean) => void
}

export const DrawerUserLocation = ({
  setGeoposition,
  setIsDataComingFromDrawer
}: DrawerUserLocationProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [myCoordinates, setMyCoordinates] = useState<MyLocation | null>(null)
  const firstField = useRef<any>()

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
        >
          <Box as="span" className="material-icons-outlined" color="orange.500">
            map
          </Box>
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
          <DrawerHeader borderBottomWidth="1px" paddingRight="0.6rem">
            <Flex alignItems="center" justifyContent="space-between">
              <Text fontWeight="bold">Where you are?</Text>
              <CloseButton onClick={onClose} borderRadius="0" />
            </Flex>
          </DrawerHeader>

          <DrawerBody margin="0" padding="0">
            <MapDrawer setMycoordinates={setMyCoordinates} />
          </DrawerBody>

          <DrawerFooter borderTopWidth="1px" paddingRight="0.6rem">
            <ButtonGroup isAttached>
              <Button
                variant="ghost"
                onClick={onClose}
                borderRadius="0"
                colorScheme="red"
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  setGeoposition(myCoordinates)
                  setIsDataComingFromDrawer(true)
                  onClose()
                }}
                borderRadius="0"
                colorScheme="green"
              >
                Confirm location
              </Button>
            </ButtonGroup>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  )
}
