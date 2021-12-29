import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  useDisclosure,
  Flex
} from '@chakra-ui/react'
import React, { useContext } from 'react'
import { AuthContext } from '../../contexts/AuthContext'
import { SignedUserOptionsPopover } from './SignedUserOptionsPopover'
import SignInTab from './SignInTab'
import SignUpTab from './SignUpTab'

export function SignInOrSignOut() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { userData } = useContext(AuthContext)

  return (
    <>
      {userData ? (
        <Flex>
          <Flex
            border="1px solid"
            alignItems="center"
            paddingX="1rem"
            color="orange.600"
            fontWeight="500"
            mr="-px"
          >
            {userData.email}
          </Flex>
          <SignedUserOptionsPopover />
        </Flex>
      ) : (
        <Button
          onClick={onOpen}
          borderRadius="0px"
          colorScheme="orange"
          variant="outline"
          fontWeight="500"
          sx={{
            _focus: {
              boxShadow: 'none'
            }
          }}
        >
          Sign in or Sign up
        </Button>
      )}

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent borderRadius="0px">
          <ModalBody padding="0px">
            <Tabs
              isFitted
              variant="solid-rounded"
              sx={{
                '.chakra-tabs__tab': {
                  borderRadius: '0px'
                }
              }}
            >
              <TabList mb="1em">
                <Tab
                  sx={{
                    _focus: { boxShadow: 'none' },
                    '&[aria-selected="true"]': {
                      background: 'transparent',
                      color: 'brand.text_color'
                    },
                    '&[aria-selected="false"]': {
                      background: 'orange.600',
                      color: 'orange.50',
                      fontWeight: '200',
                      fontStyle: 'italic'
                    }
                  }}
                >
                  Sign In
                </Tab>
                <Tab
                  sx={{
                    _focus: { boxShadow: 'none' },
                    '&[aria-selected="true"]': {
                      background: 'transparent',
                      color: 'brand.text_color'
                    },
                    '&[aria-selected="false"]': {
                      background: 'orange.600',
                      color: 'orange.50',
                      fontWeight: '200',
                      fontStyle: 'italic'
                    }
                  }}
                >
                  Sign Up
                </Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <SignInTab onClose={onClose} />
                </TabPanel>
                <TabPanel>
                  <SignUpTab onClose={onClose} />
                </TabPanel>
              </TabPanels>
            </Tabs>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}
