import { Box, Flex } from '@chakra-ui/react'
import NextImage from 'next/image'
import type { NextPage } from 'next'
import Head from 'next/head'
import { ContentHome } from '../components/ContentHome'
import { Footer } from '../components/Footer'
import { HomeHeader } from '../components/Header/Home'
import { PartnerRestaurants } from '../components/PartnerRestaurants'

const Home: NextPage = () => {
  return (
    <Box
      maxHeight="100vh"
      overflow="auto"
      sx={{
        scrollbarGutter: 'stable',
        '::-webkit-scrollbar': {
          width: '0.625rem'
        },
        '::-webkit-scrollbar-thumb': {
          background: 'scrollbar.thumb_color',
          '&:hover': {
            background: 'scrollbar.thumb_hover_color'
          }
        },
        '::-webkit-scrollbar-track': {
          background: 'brand.body_background'
        }
      }}
    >
      <Head>
        <title>Home | GoRestaurant</title>
      </Head>

      <Flex>
        <Box width="60vw" height="100vh">
          <HomeHeader />
          <ContentHome />
        </Box>
        <Box width="40vw" height="100vh" position="relative">
          <NextImage
            src="https://images.unsplash.com/photo-1513104890138-7c749659a591?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
            alt="pizza"
            objectFit="cover"
            layout="fill"
          />
        </Box>
      </Flex>

      <PartnerRestaurants />

      <Footer />
    </Box>
  )
}

export default Home
