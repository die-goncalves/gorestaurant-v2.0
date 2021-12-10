import {
  Box,
  Button,
  CloseButton,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure
} from '@chakra-ui/react'
import React from 'react'
import { GiWorld } from 'react-icons/gi'
import { NonInteractionMap } from './NonInteractionMap'

type ModalForNonInteractionMapProps = {
  coordinates: {
    lat: number
    lng: number
  }
  placeName: string
}

export function ModalForNonInteractionMap({
  coordinates,
  placeName
}: ModalForNonInteractionMapProps) {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <Button
        display="flex"
        height="auto"
        minW="auto"
        padding="0rem"
        borderRadius="0px"
        _focus={{ boxShadow: 'none' }}
        justifyContent="center"
        alignItems="center"
        variant="ghost"
        colorScheme="orange"
        onClick={onOpen}
      >
        <GiWorld fontSize="24px" />
      </Button>

      <Modal
        closeOnOverlayClick={false}
        isOpen={isOpen}
        onClose={onClose}
        size="lg"
      >
        <ModalOverlay />
        <ModalContent borderRadius="0px" minW="35vw" minH="75vh">
          <ModalHeader
            display="flex"
            justifyContent="space-between"
            padding="0.625rem"
          >
            <Text>Restaurant location on map</Text>
            <CloseButton onClick={onClose} variant="red-theme" />
          </ModalHeader>
          <ModalBody
            display="flex"
            flex="1"
            w="inherit"
            margin="0"
            padding="0"
            position="relative"
          >
            <NonInteractionMap coordinates={coordinates} />
          </ModalBody>

          <ModalFooter
            display="flex"
            justifyContent="space-between"
            padding="0.625rem"
            sx={{ gap: '0.625rem' }}
          >
            <Input
              flex="1"
              variant="filled"
              borderRadius="0px"
              value={placeName}
              placeholder="Here you will see your exact location"
              isReadOnly
              background="orange.50"
              fontWeight="semibold"
              borderColor="orange.100"
              textAlign="center"
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
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
