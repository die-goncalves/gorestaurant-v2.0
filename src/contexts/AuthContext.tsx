import { createContext, ReactNode, useEffect, useState } from 'react'
import { Box, Text } from '@chakra-ui/react'
import Router from 'next/router'
import { User } from '@supabase/supabase-js'
import { supabase } from '../utils/supabaseClient'
import { toast } from 'react-hot-toast'

type Credentials = {
  email: string
  password: string
}

type AuthContextData = {
  signUp(credentials: Credentials): Promise<void>
  signIn(credentials: Credentials): Promise<void>
  signOut: () => void
  userData: User | null | undefined
  deleteUser: () => Promise<void>
}

type AuthProviderProps = {
  children: ReactNode
}

export const AuthContext = createContext({} as AuthContextData)

export function AuthProvider({ children }: AuthProviderProps) {
  const [userData, setUserData] = useState<User | null | undefined>(undefined)

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        fetch('/api/auth', {
          method: 'POST',
          headers: new Headers({ 'Content-Type': 'application/json' }),
          credentials: 'same-origin',
          body: JSON.stringify({ event, session })
        })
      }
    )
    return () => {
      authListener?.unsubscribe()
    }
  }, [])

  useEffect(() => {
    const user = supabase.auth.user()
    setUserData(user)
  }, [])

  async function signUp({ email, password }: Credentials) {
    try {
      const { user, error } = await supabase.auth.signUp({
        email,
        password
      })
      if (error) {
        toast.error(<Box as="span">{error.message}</Box>)
        throw error
      }
      toast.success(
        <Box as="span">
          <Text>You&apos;ve been registered successfully</Text>
        </Box>
      )
      setUserData(user)
      Router.push('/dashboard')
    } catch (error) {
      console.error(error)
    }
  }

  async function signIn({ email, password }: Credentials) {
    try {
      const { user, error } = await supabase.auth.signIn({
        email,
        password
      })
      if (error) {
        toast.error(<Box as="span">{error.message}</Box>)
        throw error
      }
      toast.success(
        <Box as="span">
          <Text>You&apos;ve been logged successfully</Text>
        </Box>
      )
      setUserData(user)
    } catch (error) {
      console.error(error)
    }
  }

  async function signOut() {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) {
        toast.error(<Box as="span">{error.message}</Box>)
        throw error
      }
      toast.success(
        <Box as="span">
          <Text>You have successfully logged out</Text>
        </Box>
      )
      setUserData(null)
    } catch (error) {
      console.error(error)
    }
  }

  async function deleteUser() {
    try {
      if (userData) {
        //delete cookie sb:token
        const signOut = await supabase.auth.signOut()
        if (signOut.error) {
          toast.error(<Box as="span">{signOut.error.message}</Box>)
          throw signOut.error
        }

        //delete auth user
        const deleteUser = await supabase.auth.api.deleteUser(
          userData.id,
          `${process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_SECRET_KEY}`
        )
        if (deleteUser.error) {
          toast.error(<Box as="span">{deleteUser.error.message}</Box>)
          throw deleteUser.error
        }

        toast.success(
          <Box as="span">
            <Text>Congratulations! You have just deleted your account</Text>
          </Box>
        )
        setUserData(null)
      } else {
        throw new Error('Unable to find the user')
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <AuthContext.Provider
      value={{ signUp, signIn, signOut, userData, deleteUser }}
    >
      {children}
    </AuthContext.Provider>
  )
}
