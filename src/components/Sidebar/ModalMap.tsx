import {
  Button,
  CloseButton,
  Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Text,
  useDisclosure,
  Input
} from '@chakra-ui/react'
import Image from 'next/image'
import { useContext, useState } from 'react'
import { Map } from './Map'
import DeliveryLogo from '../../assets/delivery-world.svg'
import {
  FilterContext,
  GeographicFeatureWithCoordinates
} from '../../contexts/FilterContext'
import { useRouter } from 'next/router'

export function ModalMap() {
  const router = useRouter()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [previewLocation, setPreviewLocation] =
    useState<GeographicFeatureWithCoordinates>()
  const { geographicLocation } = useContext(FilterContext)

  return (
    <>
      <Button
        width="100%"
        h="auto"
        borderRadius="0px"
        colorScheme="orange"
        variant="ghost"
        padding="0.25rem"
        _focus={{ boxShadow: 'none' }}
        justifyContent="flex-start"
        onClick={onOpen}
      >
        <Image src={DeliveryLogo} alt="delivery-world" width={32} height={32} />
        <Flex
          flex="1"
          maxWidth="12.375rem"
          flexDir="column"
          alignItems="flex-start"
          marginLeft="0.5rem"
          fontWeight="normal"
        >
          <Text fontSize="0.875rem" lineHeight="0.875rem">
            Now
          </Text>
          <Flex
            w="100%"
            maxWidth="inherit"
            marginTop="0.25rem"
            justifyContent="space-between"
          >
            <Text fontSize="1rem" isTruncated>
              {geographicLocation?.place}
            </Text>
            <Text marginLeft="0.5rem" fontWeight="600">
              Change
            </Text>
          </Flex>
        </Flex>
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
            <Text>Choose your new location</Text>
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
            <Map setPreviewLocation={setPreviewLocation} />
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
              value={previewLocation?.place_name ?? ''}
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
              borderRadius="0px"
              colorScheme="green"
              onClick={() => {
                router.push(
                  `/restaurants?place=${previewLocation?.place}&geohash=${previewLocation?.geohash}`
                )
                onClose()
              }}
              sx={{
                _focus: {
                  boxShadow: '0 0 0 3px rgb(72, 187, 120, 0.6)'
                }
              }}
            >
              Confirm
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
