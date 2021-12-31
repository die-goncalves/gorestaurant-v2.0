import { Box } from '@chakra-ui/react'
import SideBarNav from './SideBarNav'

export default function DashboardSidebar() {
  return (
    <Box padding="0rem 1.5rem" marginRight="1.5rem" as="aside" width="17.5rem">
      <SideBarNav />
    </Box>
  )
}
