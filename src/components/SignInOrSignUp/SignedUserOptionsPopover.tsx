import {
  Button,
  Flex,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverArrow,
  Text,
  IconButton
} from '@chakra-ui/react'
import { CgMore } from 'react-icons/cg'
import { RiDashboardLine } from 'react-icons/ri'
import { BsDoorOpen } from 'react-icons/bs'
import { useContext } from 'react'
import { AuthContext } from '../../contexts/AuthContext'
import Router, { useRouter } from 'next/router'

export function SignedUserOptionsPopover() {
  const { asPath } = useRouter()
  const { signOut } = useContext(AuthContext)

  function handleRedirectToDashboard() {
    Router.push('/dashboard')
  }

  return (
    <Popover placement="bottom-end">
      <PopoverTrigger>
        <IconButton
          colorScheme="orange"
          variant="solid"
          borderRadius="0px"
          aria-label="User options"
          _hover={{ background: 'orange.700' }}
          _active={{ background: 'orange.800' }}
          _focus={{ boxShadow: 'none' }}
          icon={<CgMore fontSize="1.5rem" />}
          sx={{ background: 'orange.600', color: 'brand.body_background' }}
        />
      </PopoverTrigger>
      <PopoverContent
        _focus={{
          boxShadow:
            '0px 3px 10px 0px rgb(0, 0, 0, 0.1), 0px 3px 3px 0px rgb(0, 0, 0, 0.05)',
          outline: 'none'
        }}
        borderRadius="0px"
        w="14rem"
        minWidth="max-content"
      >
        <PopoverArrow />
        <PopoverBody padding="0.5rem" display="flex" flexDirection="column">
          <Button
            display="flex"
            alignItems="center"
            justifyContent="flex-start"
            variant="unstyled"
            borderRadius="full"
            sx={{
              gap: '1rem',
              _focus: { boxShadow: 'none' },
              _hover: {
                '& > div': { background: 'orange.100' }
              }
            }}
            onClick={signOut}
          >
            <Flex
              justifyContent="center"
              alignItems="center"
              borderRadius="full"
              boxSize="2.5rem"
              transition="0.2s background ease-in-out"
            >
              <BsDoorOpen fontSize="1.5rem" />
            </Flex>

            <Text fontSize="1rem" lineHeight="1rem" fontWeight="500">
              Sign Out
            </Text>
          </Button>
          {!asPath.includes('dashboard') && (
            <Button
              display="flex"
              alignItems="center"
              justifyContent="flex-start"
              variant="unstyled"
              sx={{
                gap: '1rem',
                _focus: { boxShadow: 'none' },
                _hover: {
                  '& > div': { background: 'orange.100' }
                }
              }}
              onClick={handleRedirectToDashboard}
            >
              <Flex
                justifyContent="center"
                alignItems="center"
                borderRadius="full"
                boxSize="2.5rem"
                transition="0.2s background ease-in-out"
              >
                <RiDashboardLine fontSize="1.5rem" />
              </Flex>

              <Text fontSize="1rem" lineHeight="1rem" fontWeight="500">
                Dashboard
              </Text>
            </Button>
          )}
        </PopoverBody>
      </PopoverContent>
    </Popover>
  )
}
