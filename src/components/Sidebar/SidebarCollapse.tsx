import { useDisclosure, Button, Collapse, Box, Flex } from '@chakra-ui/react'
import { ReactNode, useState } from 'react'

type SidebarCollapseProps = {
  categoryName: string
  children: ReactNode
}

export function SidebarCollapse({
  categoryName,
  children
}: SidebarCollapseProps) {
  const { isOpen, onToggle } = useDisclosure()
  const [toogleCollapse, setToogleCollapse] = useState(false)

  return (
    <>
      <Button
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        width="100%"
        h="auto"
        fontSize="1rem"
        paddingY="1rem"
        onClick={() => {
          onToggle()
          setToogleCollapse(!toogleCollapse)
        }}
        borderRadius="0px"
        _focus={{ outline: 'none' }}
        variant="unstyled"
      >
        <Flex>{categoryName}</Flex>
        <Box
          display="flex"
          h="1.5rem"
          minW="1.5rem"
          padding="0px"
          borderRadius="0px"
          as="span"
          className="material-icons-outlined"
          color="orange.500"
          fontSize="1.5rem"
          transform={toogleCollapse ? 'rotate(-180deg)' : 'undefined'}
          transition="transform 0.2s"
        >
          expand_more
        </Box>
      </Button>

      <Collapse in={isOpen} animateOpacity unmountOnExit>
        <Box padding="0.5rem 0.625rem 1rem 0.625rem">{children}</Box>
      </Collapse>
    </>
  )
}
