import { createContext, ReactNode, useEffect, useState } from 'react'
import Router from 'next/router'
import { User } from '@supabase/supabase-js'
import { supabase } from '../utils/supabaseClient'

type Credentials = {
  email: string
  password: string
}

type AuthContextData = {
  signUp(credentials: Credentials): Promise<void>
  signIn(credentials: Credentials): Promise<void>
  signOut: () => void
  userData: User | null
}

type AuthProviderProps = {
  children: ReactNode
}

export const AuthContext = createContext({} as AuthContextData)

export function AuthProvider({ children }: AuthProviderProps) {
  const [userData, setUserData] = useState<User | null>(null)

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
      if (error) throw error
      console.log("You've been registered successfully")
      setUserData(user)
      Router.push('/dashboard')
    } catch (error) {
      console.log(error.error_description || error.message)
    }
  }

  async function signIn({ email, password }: Credentials) {
    try {
      const { user, error } = await supabase.auth.signIn({
        email,
        password
      })
      if (error) throw error
      console.log("You've been logged successfully")
      setUserData(user)
      Router.push('/dashboard')
    } catch (error) {
      console.log(error.error_description || error.message)
    }
  }

  async function signOut() {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
      console.log('You have successfully logged out')
      Router.push('/')
    } catch (error) {
      console.log(error.error_description || error.message)
    }
  }

  return (
    <AuthContext.Provider value={{ signUp, signIn, signOut, userData }}>
      {children}
    </AuthContext.Provider>
  )
}
