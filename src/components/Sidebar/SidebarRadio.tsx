import { Radio } from '@chakra-ui/react'
import { ReactNode } from 'react'

type SidebarRadioProps = {
  value: string
  children: ReactNode
}

export function SidebarRadio({ value, children }: SidebarRadioProps) {
  return (
    <Radio
      value={value}
      _checked={{
        bg: 'transparent',
        borderColor: '#f08a16',
        _before: {
          content: '""',
          display: 'inline-block',
          position: 'relative',
          width: '50%',
          height: '50%',
          borderRadius: '50%',
          background: '#f08a16'
        }
      }}
      _focus={{
        boxShadow: '0 0 0 3px rgba(255,173,66,0.6)'
      }}
      _hover={{
        borderColor: '#f08a16'
      }}
      transition="all 0.2s ease-in-out"
    >
      {children}
    </Radio>
  )
}
