import { Stack } from '@chakra-ui/react'
import { BsPersonFill, BsCart4, BsStarHalf } from 'react-icons/bs'
import NavLink from './NavLink'
import NavSection from './NavSection'

export default function SideBarNav() {
  return (
    <Stack spacing="12" alignItems="flex-start" w="100%">
      <NavSection title="Configurações">
        <NavLink icon={BsPersonFill} href="/dashboard">
          Conta
        </NavLink>
      </NavSection>

      <NavSection title="Ações">
        <NavLink icon={BsStarHalf} href="/dashboard/rating">
          Avaliações
        </NavLink>
      </NavSection>

      <NavSection title="Pagamentos">
        <NavLink icon={BsCart4} href="/dashboard/orders">
          Pedidos
        </NavLink>
      </NavSection>
    </Stack>
  )
}
