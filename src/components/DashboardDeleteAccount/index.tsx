import { useContext } from 'react'
import {
  Button,
  Flex,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  useDisclosure,
  ButtonGroup
} from '@chakra-ui/react'
import { AuthContext } from '../../contexts/AuthContext'

export default function DashboardDeleteAccount() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { deleteUser } = useContext(AuthContext)

  return (
    <Flex flex="1">
      <Flex
        flex="1"
        h="max-content"
        justifyContent="space-between"
        alignItems="center"
        padding="1rem"
        boxShadow="inset 0px 0px 2px 0px rgba(0,0,0,0.5)"
        background="#ffffff"
      >
        <Flex flexDirection="column">
          <Text fontSize="1.25rem" fontWeight="600">
            Delete account
          </Text>
          <Text fontSize="1rem" background="red.50">
            Be careful, this action is irreversible
          </Text>
        </Flex>
        <Button
          colorScheme="red"
          variant="outline"
          borderRadius="0px"
          onClick={onOpen}
          sx={{
            _focus: {
              boxShadow: '0 0 0 3px rgb(245, 101, 101, 0.6)'
            }
          }}
        >
          Delete
        </Button>

        <Modal isOpen={isOpen} onClose={onClose} isCentered>
          <ModalOverlay />
          <ModalContent borderRadius="0px">
            <ModalHeader display="flex" padding="1rem">
              <Text>Confirmation Exclusion</Text>
            </ModalHeader>
            <ModalBody padding="0.5rem 1rem">
              Are you sure you want to delete your account?
            </ModalBody>

            <ModalFooter padding="1rem">
              <ButtonGroup spacing="0.1875rem">
                <Button
                  colorScheme="gray"
                  variant="ghost"
                  borderRadius="0px"
                  onClick={onClose}
                  sx={{
                    _focus: {
                      boxShadow: '0 0 0 3px rgb(160, 174, 192, 0.6)'
                    }
                  }}
                >
                  No
                </Button>
                <Button
                  colorScheme="red"
                  variant="solid"
                  borderRadius="0px"
                  onClick={deleteUser}
                  sx={{
                    _focus: {
                      boxShadow: '0 0 0 3px rgb(245, 101, 101, 0.6)'
                    }
                  }}
                >
                  Yes
                </Button>
              </ButtonGroup>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Flex>
    </Flex>
  )
}
