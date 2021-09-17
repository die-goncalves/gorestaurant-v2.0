import { useContext } from 'react'
import { Box, Flex, Button } from '@chakra-ui/react'
import { AuthContext } from '../contexts/AuthContext'
import { withSSRAuth } from '../utils/withSSRAuth'

export default function Dashboard() {
  const { signOut, userData } = useContext(AuthContext)
  return (
    <>
      <Flex
        as="header"
        width="100vw"
        paddingY="1rem"
        paddingX="5rem"
        justifyContent="space-between"
        alignItems="center"
        borderBottom="1px"
        borderBottomColor="orange.500"
      >
        <Box as="h1">Dashboard {userData?.email}</Box>
        <Button onClick={signOut}>sign out</Button>
      </Flex>
    </>
  )
}

export const getServerSideProps = withSSRAuth(async ctx => {
  return {
    props: {}
  }
})
