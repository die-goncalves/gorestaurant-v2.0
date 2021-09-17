import React from 'react'
import { Toaster } from 'react-hot-toast'

export const Notifications = () => {
  return (
    <Toaster
      toastOptions={{
        style: {
          padding: '1rem',
          background: '#fafafa'
        },
        error: {
          duration: 5000,
          style: {
            boxShadow: '0 0.25rem 0 0 #FF4C4C'
          }
        },
        success: {
          duration: 5000,
          style: {
            boxShadow: '0 0.25rem 0 0 #62D346'
          }
        }
      }}
    />
  )
}
