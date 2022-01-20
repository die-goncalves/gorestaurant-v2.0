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
        if (error.message === 'User already registered') {
          toast.error(
            <Text as="span">
              Já temos um usuário com este endereço de e-mail
            </Text>
          )
        } else {
          toast.error(
            <Text as="span">
              Erro ainda não abrangido pela tradução, verifique no console
            </Text>
          )
        }
        throw error
      }
      toast.success(<Text as="span">Cadastro realizado com sucesso</Text>)
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
        if (error.message === 'Invalid login credentials') {
          toast.error(<Text as="span">Credenciais de login inválidas</Text>)
        } else {
          toast.error(
            <Text as="span">
              Erro ainda não abrangido pela tradução, verifique no console
            </Text>
          )
        }
        throw error
      }
      toast.success(<Text as="span">Login realizado com sucesso</Text>)
      setUserData(user)
    } catch (error) {
      console.error(error)
    }
  }

  async function signOut() {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) {
        toast.error(
          <Text as="span">
            Erro ainda não abrangido pela tradução, verifique no console
          </Text>
        )
        throw error
      }
      toast.success(<Text as="span">Você encerrou a sessão</Text>)
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
          toast.error(
            <Text as="span">
              Erro ainda não abrangido pela tradução, verifique no console
            </Text>
          )
          throw signOut.error
        }

        //delete auth user
        const deleteUser = await supabase.auth.api.deleteUser(
          userData.id,
          `${process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_SECRET_KEY}`
        )
        if (deleteUser.error) {
          toast.error(
            <Text as="span">
              Erro ainda não abrangido pela tradução, verifique no console
            </Text>
          )
          throw deleteUser.error
        }

        toast.success(
          <Box as="span">
            <Text>Conta excluída! 😢</Text>
          </Box>
        )
        setUserData(null)
      } else {
        throw new Error('Não identificamos o usuário da sessão')
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
