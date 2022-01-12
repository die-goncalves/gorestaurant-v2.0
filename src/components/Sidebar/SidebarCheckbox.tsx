import { Checkbox, Flex, Text } from '@chakra-ui/react'
import { ReactNode } from 'react'

type SidebarCheckboxProps = {
  value: string
  count: number
  children: ReactNode
}

export function SidebarCheckbox({
  value,
  count,
  children
}: SidebarCheckboxProps) {
  return (
    <Checkbox
      value={value}
      _hover={{
        borderColor: '#f08a16'
      }}
      sx={{
        '.chakra-checkbox__control': {
          transition: 'all 0.2s ease-in-out',
          _focus: {
            boxShadow: '0 0 0 3px rgba(255,173,66,0.6)'
          },
          _checked: {
            borderColor: '#f08a16',
            background: '#f08a16',
            _hover: {
              borderColor: 'orange.500',
              background: 'orange.500'
            }
          }
        }
      }}
    >
      <Flex>
        <Text>{children}</Text>
        <Text marginLeft="0.5rem" as="span" color="#989898">
          ( {count} )
        </Text>
      </Flex>
    </Checkbox>
  )
}
