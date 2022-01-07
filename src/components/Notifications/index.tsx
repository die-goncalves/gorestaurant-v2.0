import React, { useEffect, useState } from 'react'
import { Toaster } from 'react-hot-toast'
import { useRouter } from 'next/router'

export const Notifications = () => {
  const [isOnTheHomePage, setIsOnTheHomePage] = useState('')
  const router = useRouter()

  useEffect(() => {
    setIsOnTheHomePage(router.asPath)
  }, [router.asPath])

  return (
    <Toaster
      position={isOnTheHomePage !== '/' ? 'top-center' : 'top-right'}
      gutter={16}
      toastOptions={{
        style: {
          padding: '0.625rem',
          fontWeight: 500,
          borderRadius: '0px'
        },
        error: {
          duration: 5000,
          style: {
            border: '1.5px solid#FFEBEB',
            background: '#FFFAFA',
            boxShadow: '0 3px 10px rgb(255 0 0 / 5%), 0 3px 3px rgb(0 0 0 / 5%)'
          }
        },
        success: {
          duration: 2500,
          style: {
            border: '1.5px solid#EBFFEB',
            background: '#FAFFFA',
            boxShadow: '0 3px 10px rgb(0 255 0 / 5%), 0 3px 3px rgb(0 0 0 / 5%)'
          }
        }
      }}
    />
  )
}
