import { useContext, useState } from 'react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  useDisclosure,
  Button,
  Input,
  Flex,
  Text,
  CloseButton,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Box,
  ButtonGroup
} from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { AuthContext } from '../../contexts/AuthContext'

type IFormInput = {
  email: string
  password: string
}

export default function SignIn() {
  const { signIn } = useContext(AuthContext)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [loading, setLoading] = useState(false)

  const schema = yup.object().shape({
    email: yup.string().required('E-mail required'),
    password: yup.string().required('Password required')
  })

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<IFormInput>({
    resolver: yupResolver(schema)
  })

  async function onSubmit(values: IFormInput): Promise<void> {
    setLoading(true)
    await signIn({ email: values.email, password: values.password }).finally(
      () => {
        setLoading(false)
        onClose()
      }
    )
  }

  return (
    <>
      <Button onClick={onOpen} variant="ghost" borderRadius="0">
        Sign in
      </Button>
      <Modal
        closeOnOverlayClick={false}
        isOpen={isOpen}
        onClose={onClose}
        isCentered
        motionPreset="scale"
      >
        <ModalOverlay />
        <ModalContent borderRadius="0">
          <ModalHeader>
            <Flex alignItems="center" justifyContent="space-between">
              <Text fontWeight="bold">Sign in</Text>
              <CloseButton
                borderRadius="0"
                onClick={() => {
                  reset()
                  onClose()
                }}
              />
            </Flex>
          </ModalHeader>
          <ModalBody>
            <Box as="form" onSubmit={handleSubmit(onSubmit)} id="myForm">
              <FormControl isInvalid={errors.email ? true : false}>
                <FormLabel htmlFor="email" marginBottom="0.25rem">
                  Your e-mail
                </FormLabel>
                <Input
                  {...register('email')}
                  id="email"
                  borderRadius="0"
                  background="brand.input_background"
                />
                <FormErrorMessage marginTop="0.25rem">
                  {errors.email?.message}
                </FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={errors.password ? true : false}>
                <FormLabel htmlFor="password" marginBottom="0.25rem">
                  Your password
                </FormLabel>
                <Input
                  {...register('password')}
                  id="password"
                  type={'password'}
                  borderRadius="0"
                  background="brand.input_background"
                />

                <FormErrorMessage marginTop="0.25rem">
                  {errors.password?.message}
                </FormErrorMessage>
              </FormControl>
            </Box>
          </ModalBody>

          <ModalFooter>
            <ButtonGroup isAttached>
              <Button
                variant="ghost"
                onClick={() => {
                  reset()
                  onClose()
                }}
                colorScheme="red"
                borderRadius="0"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                form="myForm"
                isLoading={loading}
                loadingText="Confirming"
                colorScheme="green"
                borderRadius="0"
              >
                Confirm
              </Button>
            </ButtonGroup>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
