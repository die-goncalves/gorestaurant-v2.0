import { Box, Flex, Text, Link as ChakraLink } from '@chakra-ui/react'
import NextLink from 'next/link'
import { Logo } from '../components/Logo'
import { IconCredit } from '../components/IconCredit'
import { GoLinkExternal } from 'react-icons/go'
import { Carousel } from '../components/Carousel'
import { Slide } from '../components/Carousel/Slide'
import { ImageWithSkeleton } from '../components/ImageWithSkeleton'

export default function About() {
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
      <Flex
        as="header"
        paddingX="3.75rem"
        paddingY="1rem"
        justifyContent="center"
      >
        <Logo fontSize="1.25rem" sizeLogo="2rem" />
      </Flex>
      <Box marginX="2rem">
        <Flex
          alignItems="center"
          flexDirection="column"
          marginX="auto"
          paddingY="1rem"
          fontSize="1.25rem"
          maxW="75%"
        >
          <Text fontWeight="500" marginY="1rem">
            Sobre
          </Text>
          <Text textAlign="center">
            Este projeto foi realizado somente para fins de aprendizagem. A
            ideia inicial do GoRestaurant foi apresentada no bootcamp Ignite da
            Rocketseat e agora, com base nos sites apresentados abaixo,
            desenvolvi uma versão aprimorada para o GoRestaurant.
          </Text>
        </Flex>

        <Flex flexDirection="column" paddingY="1rem">
          <Text
            marginX="auto"
            marginY="1rem"
            fontSize="1.25rem"
            fontWeight="500"
          >
            Ícones usados no projeto
          </Text>
          <IconCredit />
        </Flex>

        <Box paddingY="1rem">
          <Flex w="100%">
            <Text
              marginX="auto"
              marginY="1rem"
              fontSize="1.25rem"
              fontWeight="500"
            >
              Websites que serviram como modelos para a contrução deste projeto
            </Text>
          </Flex>

          <Box>
            <Flex
              paddingY="1rem"
              w="100%"
              alignItems="center"
              justifyContent="center"
            >
              <NextLink href="https://deliveroo.co.uk/" passHref>
                <ChakraLink
                  title="Deliveroo"
                  isExternal
                  _focus={{ boxShadow: 'none' }}
                >
                  <Text lineHeight="1.1rem" fontSize="1.1rem" fontWeight="500">
                    Deliveroo
                  </Text>
                </ChakraLink>
              </NextLink>
              &nbsp;
              <GoLinkExternal color="#C05621" />
            </Flex>
            <Carousel>
              <Slide>
                <ImageWithSkeleton
                  src="/credits/deliveroo.jpg"
                  alt="deliveroo"
                  layout="fill"
                  objectFit="cover"
                />
              </Slide>
              <Slide>
                <ImageWithSkeleton
                  src="/credits/map-deliveroo.jpg"
                  alt="map-deliveroo"
                  layout="fill"
                  objectFit="cover"
                />
              </Slide>
              <Slide>
                <ImageWithSkeleton
                  src="/credits/restaurants-deliveroo.jpg"
                  alt="restaurants-deliveroo"
                  layout="fill"
                  objectFit="cover"
                />
              </Slide>
              <Slide>
                <ImageWithSkeleton
                  src="/credits/restaurant-deliveroo.jpg"
                  alt="restaurant-deliveroo"
                  layout="fill"
                  objectFit="cover"
                />
              </Slide>
              <Slide>
                <ImageWithSkeleton
                  src="/credits/food-order-deliveroo.jpg"
                  alt="food-order-deliveroo"
                  layout="fill"
                  objectFit="cover"
                />
              </Slide>
            </Carousel>

            <Flex
              paddingY="1rem"
              w="100%"
              alignItems="center"
              justifyContent="center"
            >
              <NextLink href="https://www.ubereats.com/" passHref>
                <ChakraLink
                  title="Ubereats"
                  isExternal
                  _focus={{ boxShadow: 'none' }}
                >
                  <Text lineHeight="1.1rem" fontSize="1.1rem" fontWeight="500">
                    Ubereats
                  </Text>
                </ChakraLink>
              </NextLink>
              &nbsp;
              <GoLinkExternal color="#C05621" />
            </Flex>
            <Carousel>
              <Slide>
                <ImageWithSkeleton
                  src="/credits/ubereats.jpg"
                  alt="ubereats"
                  layout="fill"
                  objectFit="cover"
                />
              </Slide>
              <Slide>
                <ImageWithSkeleton
                  src="/credits/map-ubereats.jpg"
                  alt="map-ubereats"
                  layout="fill"
                  objectFit="cover"
                />
              </Slide>
              <Slide>
                <ImageWithSkeleton
                  src="/credits/restaurants-ubereats.jpg"
                  alt="restaurants-ubereats"
                  layout="fill"
                  objectFit="cover"
                />
              </Slide>
              <Slide>
                <ImageWithSkeleton
                  src="/credits/restaurant-ubereats.jpg"
                  alt="restaurant-ubereats"
                  layout="fill"
                  objectFit="cover"
                />
              </Slide>
              <Slide>
                <ImageWithSkeleton
                  src="/credits/food-order-ubereats.jpg"
                  alt="food-order-ubereats"
                  layout="fill"
                  objectFit="cover"
                />
              </Slide>
            </Carousel>

            <Flex
              paddingY="1rem"
              w="100%"
              alignItems="center"
              justifyContent="center"
            >
              <NextLink href="https://www.swiggy.com/" passHref>
                <ChakraLink
                  title="Swiggy"
                  isExternal
                  _focus={{ boxShadow: 'none' }}
                >
                  <Text lineHeight="1.1rem" fontSize="1.1rem" fontWeight="500">
                    Swiggy
                  </Text>
                </ChakraLink>
              </NextLink>
              &nbsp;
              <GoLinkExternal color="#C05621" />
            </Flex>
            <Carousel>
              <Slide>
                <ImageWithSkeleton
                  src="/credits/swiggy.jpg"
                  alt="swiggy"
                  layout="fill"
                  objectFit="cover"
                />
              </Slide>
              <Slide>
                <ImageWithSkeleton
                  src="/credits/restaurants-swiggy.jpg"
                  alt="restaurants-swiggy"
                  layout="fill"
                  objectFit="cover"
                />
              </Slide>
              <Slide>
                <ImageWithSkeleton
                  src="/credits/restaurant-swiggy.jpg"
                  alt="restaurant-swiggy"
                  layout="fill"
                  objectFit="cover"
                />
              </Slide>
              <Slide>
                <ImageWithSkeleton
                  src="/credits/food-order-swiggy.jpg"
                  alt="food-order-swiggy"
                  layout="fill"
                  objectFit="cover"
                />
              </Slide>
            </Carousel>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
