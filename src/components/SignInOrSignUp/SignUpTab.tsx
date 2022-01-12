import { useContext, useState } from 'react'
import {
  Button,
  Input,
  Flex,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Box
} from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import zxcvbn from 'zxcvbn'
import { AuthContext } from '../../contexts/AuthContext'

type IFormInput = {
  email: string
  password: string
  passwordConfirmation: string
}

type SignUpTabProps = {
  onClose: () => void
}

export default function SignUpTab({ onClose }: SignUpTabProps) {
  const { signUp } = useContext(AuthContext)
  const [loading, setLoading] = useState(false)
  const [scorePassword, setScorePassword] = useState(0)

  const schema = yup.object().shape({
    email: yup
      .string()
      .email('Must be a valid e-mail')
      .required('E-mail required'),
    password: yup
      .string()
      .required('Password required')
      .test(
        'password_test',
        'Password is not strong enough',
        (value, context) => {
          setScorePassword(zxcvbn(value || '').score)
          return scorePassword >= 3
        }
      ),
    passwordConfirmation: yup
      .string()
      .required('Password confirmation required')
      .test('passwords-match', 'Passwords must match', function (value) {
        return this.parent.password === value
      })
  })

  const {
    register,
    handleSubmit,
    trigger,
    setValue,
    setError,
    clearErrors,
    reset,
    getValues,
    formState: { errors, isSubmitted }
  } = useForm<IFormInput>({
    resolver: yupResolver(schema)
  })

  const colorProgress = (score: number) => {
    switch (score) {
      case 1:
        return 'red.300'
        break
      case 2:
        return 'orange.300'
        break
      case 3:
        return 'yellow.300'
        break
      case 4:
        return 'green.500'
        break
      default:
        return 'transparent'
    }
  }

  async function onSubmit(values: IFormInput): Promise<void> {
    setLoading(true)
    await signUp({ email: values.email, password: values.password }).finally(
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
        <FormLabel htmlFor="sign-up-email" marginBottom="0.25rem">
          Your e-mail
        </FormLabel>
        <Input
          {...register('email')}
          id="sign-up-email"
          borderRadius="0"
          background="brand.input_background"
        />
        <FormErrorMessage marginTop="0.25rem">
          {errors.email?.message}
        </FormErrorMessage>
      </FormControl>
      <FormControl isInvalid={errors.password ? true : false}>
        <FormLabel htmlFor="sign-up-password" marginBottom="0.25rem">
          Your password
        </FormLabel>
        <Input
          {...register('password')}
          id="sign-up-password"
          type="password"
          borderRadius="0"
          background="brand.input_background"
          onChange={async e => {
            clearErrors('password')
            setValue('password', e.target.value)
            await schema
              .validateAt('password', { password: e.target.value })
              .catch(function (err) {
                if (isSubmitted) setError('password', err.errors[0])
              })
            if (isSubmitted) trigger(['password', 'passwordConfirmation'])
          }}
        />
        <Box
          display={`${
            (!getValues('password') || getValues('password')?.length === 0) &&
            'none'
          }`}
          marginTop="0.0625rem"
          height="0.5rem"
          width="100%"
          position="relative"
          background="transparent"
        >
          <Box
            width={`calc(25% * ${scorePassword})`}
            height="inherit"
            background={`${colorProgress(scorePassword)}`}
            transition="all 1s ease-in-out"
          />
        </Box>
        <FormErrorMessage marginTop="0.25rem">
          {errors.password?.message}
        </FormErrorMessage>
      </FormControl>
      <FormControl isInvalid={errors.passwordConfirmation ? true : false}>
        <FormLabel
          htmlFor="sign-up-password-confirmation"
          marginBottom="0.25rem"
        >
          Confirm your password
        </FormLabel>
        <Input
          {...register('passwordConfirmation')}
          id="sign-up-password-confirmation"
          type="password"
          borderRadius="0"
          background="brand.input_background"
          sx={{
            '&::-ms-reveal': {
              display: 'none'
            }
          }}
        />
        <FormErrorMessage marginTop="0.25rem">
          {errors.passwordConfirmation?.message}
        </FormErrorMessage>
      </FormControl>

      <Button
        type="submit"
        isLoading={loading}
        loadingText="Saving"
        colorScheme="green"
        borderRadius="0"
        sx={{
          _focus: {
            boxShadow: '0 0 0 3px rgb(72, 187, 120, 0.6)'
          }
        }}
      >
        Save
      </Button>
    </Flex>
  )
}
