import { useContext, useEffect } from 'react'
import { Flex } from '@chakra-ui/react'
import { AuthContext } from '../../contexts/AuthContext'
import { HomeHeader } from '../../components/Header/Home'
import DashboardSidebar from '../../components/DashboardSidebar'
import Router from 'next/router'
import { withSSRAuth } from '../../utils/withSSRAuth'
import DashboardDeleteAccount from '../../components/DashboardDeleteAccount'

export default function Dashboard() {
  const { userData } = useContext(AuthContext)

  useEffect(() => {
    if (userData === null) {
      Router.push('/')
    }
  }, [userData])

  return (
    <>
      <HomeHeader />
      <Flex padding="1rem 3.75rem" height="calc(100vh - 4.5rem)">
        <Flex>
          <DashboardSidebar />
        </Flex>

        <DashboardDeleteAccount />
      </Flex>
    </>
  )
}

export const getServerSideProps = withSSRAuth(async () => {
  return {
    props: {}
  }
})
