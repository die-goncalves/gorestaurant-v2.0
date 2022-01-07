import {
  Box,
  Button,
  CloseButton,
  Flex,
  Heading,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  Tooltip,
  useDisclosure
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { FiHelpCircle } from 'react-icons/fi'
import { orderTime, whenOpen } from '../../utils/restaurantOperation'
import { Day } from './Day'

type RestaurantStatus = {
  operatingHours: Array<{
    id: string
    start_hour: string
    end_hour: string
    weekday: string
  }>
}

export function RestaurantStatus({ operatingHours }: RestaurantStatus) {
  const [time, setTime] = useState({
    day: new Date().getDay(),
    timer: new Date().toLocaleTimeString()
  })
  const [isOpen, setIsOpen] =
    useState<{ open: boolean; for_coming?: any; current?: any }>()
  const {
    isOpen: isOpenModal,
    onOpen: onOpenModal,
    onClose: onCloseModal
  } = useDisclosure()

  const { separateDaysOfTheWeek: timeOrdering } = orderTime(operatingHours)

  function updateClock() {
    setTime({
      day: new Date().getDay(),
      timer: new Date().toLocaleTimeString()
    })
  }

  useEffect(() => {
    setInterval(() => updateClock(), 60000)
    return () => clearInterval()
  }, [operatingHours])

  useEffect(() => {
    setIsOpen(whenOpen(operatingHours, time))
  }, [time])

  const help = (
    <Flex flexDir="column">
      <Flex alignItems="center">
        <Box
          w="10px"
          h="10px"
          bg="green.100"
          boxShadow="inset 0px 0px 0px 1px #38A169"
          marginRight="0.5rem"
        />
        Restaurant currently open
      </Flex>
      <Flex alignItems="center">
        <Box
          w="10px"
          h="10px"
          bg="orange.100"
          boxShadow="inset 0px 0px 0px 1px #DD6B20"
          marginRight="0.5rem"
        />
        Nearest time for restaurant opening
      </Flex>
    </Flex>
  )
  return (
    <>
      <Button
        height="auto"
        paddingY="0.25rem"
        paddingX="0.5rem"
        borderWidth="1px"
        borderRadius="0px"
        colorScheme={isOpen?.open ? 'green' : 'red'}
        variant="outline"
        onClick={onOpenModal}
        _focus={{
          boxShadow: isOpen?.open
            ? '0 0 0 3px rgb(72, 187, 120, 0.6)'
            : '0 0 0 3px rgb(245, 101, 101, 0.6)'
        }}
      >
        {isOpen?.open ? 'Open' : 'Closed'}
      </Button>

      <Modal
        isOpen={isOpenModal}
        onClose={onCloseModal}
        isCentered
        motionPreset="scale"
      >
        <ModalOverlay />
        <ModalContent borderRadius="0px" maxWidth="34.175rem">
          <ModalHeader>
            <Flex justifyContent="space-between" alignItems="center">
              <Flex>
                <Heading as="h1" fontSize="1.25rem">
                  Restaurant hours of operation
                </Heading>
                <Tooltip
                  label={help}
                  bg="#FCFBF9"
                  color="brand.text_color"
                  border="0.5px solid #E2E8F0"
                >
                  <Box marginLeft="0.5rem">
                    <FiHelpCircle fontSize="24px" cursor="help" />
                  </Box>
                </Tooltip>
              </Flex>
              <CloseButton onClick={onCloseModal} variant="red-theme" />
            </Flex>
          </ModalHeader>
          <ModalBody paddingBottom="1.5rem" paddingTop="0px">
            <Day timeOrdering={timeOrdering} isOpen={isOpen} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}
