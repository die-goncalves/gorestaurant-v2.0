import { Box, Flex, Image as ImageChakra } from '@chakra-ui/react'
import type { NextPage } from 'next'
import Head from 'next/head'
import { ContentHome } from '../components/ContentHome'
import { Footer } from '../components/Footer'
import { HomeHeader } from '../components/Header/Home'

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Home | GoRestaurant</title>
      </Head>

      <Flex>
        <Box width="60vw" height="100vh">
          <HomeHeader />
          <ContentHome />
        </Box>
        <Box width="40vw" height="100vh">
          <ImageChakra
            src="https://images.unsplash.com/photo-1513104890138-7c749659a591?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
            alt="Comida italiana"
            width="inherit"
            height="inherit"
            objectFit="cover"
          />
        </Box>
      </Flex>

      <Footer noBorderTop />
    </>
  )
}

export default Home
