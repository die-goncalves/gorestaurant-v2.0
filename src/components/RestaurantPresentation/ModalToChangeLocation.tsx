import {
  Button,
  CloseButton,
  Flex,
  Grid,
  GridItem,
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
import { RegionRestrictedMap } from './RegionRestrictedMap'
import { GeographicFeatureWithCoordinates } from '../../contexts/FilterContext'
import { useRouter } from 'next/router'
import { UserLocationContext } from '../../contexts/UserLocationContext'
import DeliveryBike from '../../assets/delivery-bike.svg'

type ModalToChangeLocationProps = {
  restaurantId: string
  restaurantPlace: string
  deliveryTime: number | undefined
}

export function ModalToChangeLocation({
  restaurantId,
  restaurantPlace,
  deliveryTime
}: ModalToChangeLocationProps) {
  const router = useRouter()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [previewLocation, setPreviewLocation] =
    useState<GeographicFeatureWithCoordinates>()
  const { userLocation } = useContext(UserLocationContext)

  return (
    <>
      <Button
        marginTop="0.5rem"
        width="100%"
        height="auto"
        borderRadius="0px"
        _focus={{ boxShadow: 'none' }}
        display="flex"
        justifyContent="space-between"
        padding="0.5rem"
        variant="outline"
        colorScheme="orange"
        borderColor="#DD6B20"
        onClick={onOpen}
      >
        <Grid flex="1" templateColumns="auto 1fr auto" gap="0.5rem">
          <GridItem display="flex" width="100%" justifyContent="flex-start">
            <Flex alignSelf="center">
              <Image
                src={DeliveryBike}
                alt="delivery-bike"
                width={32}
                height={32}
              />
            </Flex>
          </GridItem>
          <GridItem
            display="flex"
            flexDirection="column"
            alignItems="flex-start"
            fontWeight="normal"
            sx={{
              gap: '0.5rem'
            }}
          >
            {deliveryTime && (
              <Text fontSize="0.875rem">
                Deliver in approximately {(deliveryTime / 60).toFixed(2)} min
              </Text>
            )}
            <Text maxWidth="310px" isTruncated>
              {userLocation?.place_name}
            </Text>
          </GridItem>
          <GridItem display="flex" width="100%" justifyContent="flex-end">
            <Text alignSelf="center" fontWeight="600">
              Change
            </Text>
          </GridItem>
        </Grid>
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
            <RegionRestrictedMap setPreviewLocation={setPreviewLocation} />
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
              fontWeight="600"
              isReadOnly
              {...(previewLocation
                ? restaurantPlace !== previewLocation.place
                  ? {
                      value: `Delivery in ${restaurantPlace} only`,
                      textAlign: 'center',
                      color: 'red.600',
                      background: 'red.50',
                      borderColor: 'red.100',
                      _focus: {
                        background: 'red.100',
                        borderColor: 'rgb(229, 62, 62, 0.6)'
                      },
                      _hover: { background: 'red.100' }
                    }
                  : {
                      value: previewLocation.place_name,
                      background: 'orange.50',
                      borderColor: 'orange.100',
                      _focus: {
                        background: 'orange.100',
                        borderColor: 'rgb(237, 137, 54, 0.6)'
                      },
                      _hover: { background: 'orange.100' }
                    }
                : {
                    background: 'orange.50',
                    borderColor: 'orange.100',
                    _focus: {
                      background: 'orange.100',
                      borderColor: 'rgb(237, 137, 54, 0.6)'
                    },
                    _hover: { background: 'orange.100' }
                  })}
              placeholder="Here you will see your exact location"
              _placeholder={{
                color: 'orange.500'
              }}
            />
            <Button
              isDisabled={restaurantPlace !== previewLocation?.place}
              borderRadius="0px"
              colorScheme="green"
              onClick={() => {
                router.push(
                  `/restaurant/${restaurantId}?geohash=${previewLocation?.geohash}`
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
