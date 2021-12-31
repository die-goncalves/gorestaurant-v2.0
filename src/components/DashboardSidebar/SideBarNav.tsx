import { Stack } from '@chakra-ui/react'
import { BsPersonFill, BsCart4, BsStarHalf } from 'react-icons/bs'
import NavLink from './NavLink'
import NavSection from './NavSection'

export default function SideBarNav() {
  return (
    <Stack spacing="12" alignItems="flex-start" w="100%">
      <NavSection title="Settings">
        <NavLink icon={BsPersonFill} href="/dashboard">
          Account
        </NavLink>
      </NavSection>

      <NavSection title="Actions">
        <NavLink icon={BsStarHalf} href="/dashboard/rating">
          Rating
        </NavLink>
      </NavSection>

      <NavSection title="Payments">
        <NavLink icon={BsCart4} href="/dashboard/orders">
          Orders
        </NavLink>
      </NavSection>
    </Stack>
  )
}
