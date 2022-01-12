import { useContext, useState } from 'react'
import {
  Button,
  Input,
  Flex,
  FormControl,
  FormLabel,
  FormErrorMessage
} from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { AuthContext } from '../../contexts/AuthContext'

type IFormInput = {
  email: string
  password: string
}

type SignInTabProps = {
  onClose: () => void
}

export default function SignInTab({ onClose }: SignInTabProps) {
  const { signIn } = useContext(AuthContext)
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
        reset()
        onClose()
      }
    )
  }

  return (
    <Flex
      as="form"
      onSubmit={handleSubmit(onSubmit)}
      flexDirection="column"
      sx={{ gap: '1rem' }}
    >
      <FormControl isInvalid={errors.email ? true : false}>
        <FormLabel htmlFor="sign-in-email" marginBottom="0.25rem">
          Your e-mail
        </FormLabel>
        <Input
          {...register('email')}
          id="sign-in-email"
          borderRadius="0"
          background="brand.input_background"
        />
        <FormErrorMessage marginTop="0.25rem">
          {errors.email?.message}
        </FormErrorMessage>
      </FormControl>
      <FormControl isInvalid={errors.password ? true : false}>
        <FormLabel htmlFor="sign-in-password" marginBottom="0.25rem">
          Your password
        </FormLabel>
        <Input
          {...register('password')}
          id="sign-in-password"
          type="password"
          borderRadius="0"
          background="brand.input_background"
        />

        <FormErrorMessage marginTop="0.25rem">
          {errors.password?.message}
        </FormErrorMessage>
      </FormControl>

      <Button
        type="submit"
        isLoading={loading}
        loadingText="Confirming"
        colorScheme="green"
        borderRadius="0"
        sx={{
          _focus: {
            boxShadow: '0 0 0 3px rgb(72, 187, 120, 0.6)'
          }
        }}
      >
        Confirm
      </Button>
    </Flex>
  )
}
