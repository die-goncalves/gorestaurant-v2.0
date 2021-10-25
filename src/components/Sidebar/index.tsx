import {
  Box,
  Text,
  RadioGroup,
  VStack,
  CheckboxGroup,
  Button,
  Flex,
  Tag
} from '@chakra-ui/react'
import Image from 'next/image'
import DeliveryLogo from '../../assets/delivery.svg'
import { SidebarRadio } from './SidebarRadio'
import { SidebarCollapse } from './SidebarCollapse'
import { SidebarSlider } from './SidebarSlider'
import { SidebarCheckbox } from './SidebarCheckbox'
import { useContext } from 'react'
import { FilterContext } from '../../contexts/FilterContext'
import { useEffect } from 'react'

type Tag = {
  id: number
  tag: string
  count: number
}
type SidebarProps = {
  userPlace: string
  tags: Array<Tag>
  isDelivery: boolean
}

export function Sidebar({ userPlace, tags, isDelivery }: SidebarProps) {
  const {
    locality,
    setLocality,
    deliveryOption,
    setDeliveryOption,
    sortOption,
    setSortOption,
    tagOption,
    setTagOption
  } = useContext(FilterContext)

  useEffect(() => {
    setLocality(userPlace)
  }, [userPlace])

  return (
    <Box
      maxHeight="calc(100vh - 4.5rem)"
      width="17.5rem"
      maxWidth="17.5rem"
      paddingTop="2rem"
      marginRight="2rem"
      background="transparent"
      position="sticky"
      top="0px"
    >
      <Box>
        <Box
          paddingRight="0.375rem"
          boxShadow="0rem 0.8rem 1.25rem -2rem black"
        >
          <Box
            display="flex"
            justifyContent="space-between"
            w="100%"
            borderBottom="1px solid #E2E8F0"
            paddingBottom="1rem"
          >
            <Box display="flex" w="inherit" alignItems="center">
              <Box
                width="2.25rem"
                height="2.25rem"
                position="relative"
                verticalAlign="middle"
              >
                <Image src={DeliveryLogo} alt="GoRestaurant" layout="fill" />
              </Box>
              <Flex
                flex="1"
                flexDirection="column"
                marginLeft="0.5rem"
                alignItems="flex-start"
                justifyContent="center"
              >
                <Flex w="100%" alignItems="flex-start">
                  <Text fontSize="0.875rem" lineHeight="0.875rem">
                    Now
                  </Text>
                </Flex>

                <Flex
                  w="100%"
                  alignItems="flex-end"
                  justifyContent="space-between"
                  marginTop="0.5rem"
                >
                  <Text fontSize="1rem" lineHeight="1rem" fontWeight="600">
                    {locality}
                  </Text>

                  <Button
                    colorScheme="orange"
                    borderRadius="0px"
                    variant="ghost"
                    padding="0px"
                    h="1rem"
                  >
                    <Text fontSize="1rem">Change</Text>
                  </Button>
                </Flex>
              </Flex>
            </Box>
          </Box>
          <Box
            w="100%"
            borderBottom="1px solid #E2E8F0"
            padding="1rem 0.625rem"
          >
            <RadioGroup
              name="deliveryoption"
              sx={{
                '.chakra-radio': {
                  cursor: 'pointer',
                  _hover: {
                    borderColor: '#f08a16'
                  }
                }
              }}
              onChange={value => setDeliveryOption(value)}
              value={deliveryOption}
            >
              <VStack spacing="1rem" display="flex" alignItems="flex-start">
                <SidebarRadio value="delivery">Delivery</SidebarRadio>
                <SidebarRadio value="pickup">Pickup</SidebarRadio>
              </VStack>
            </RadioGroup>
          </Box>
        </Box>

        <VStack
          maxHeight="calc(100vh - 16rem)"
          display="block"
          overflow="auto"
          divider={<Box h="1px" w="100%" borderColor="#E2E8F0" />}
          spacing={0}
          sx={{
            scrollbarGutter: 'stable',
            '::-webkit-scrollbar': {
              width: '0.375rem'
            },
            '::-webkit-scrollbar-track': {
              background: 'brand.body_background'
            },
            '::-webkit-scrollbar-thumb': {
              background: 'scrollbar.thumb_color',
              '&:hover': {
                background: 'scrollbar.thumb_hover_color'
              }
            }
          }}
        >
          <SidebarCollapse categoryName="Sort">
            <RadioGroup
              name="sort"
              sx={{
                '.chakra-radio': {
                  cursor: 'pointer',
                  _hover: {
                    borderColor: '#f08a16'
                  }
                }
              }}
              onChange={value => setSortOption(value)}
              value={sortOption}
            >
              <VStack spacing="1rem" display="flex" alignItems="flex-start">
                <SidebarRadio value="rating">Rating</SidebarRadio>
                <SidebarRadio value="delivery time">Delivery time</SidebarRadio>
              </VStack>
            </RadioGroup>
          </SidebarCollapse>
          {isDelivery && (
            <SidebarCollapse categoryName="Delivery price">
              <SidebarSlider values={[0, 3.75, 7.5]} />
            </SidebarCollapse>
          )}
          <SidebarCollapse categoryName="Tags">
            <CheckboxGroup
              onChange={value => setTagOption(value)}
              value={tagOption}
            >
              <VStack spacing="1rem" display="flex" alignItems="flex-start">
                {tags.map(element => (
                  <SidebarCheckbox
                    key={element.id}
                    value={element.tag.toLowerCase()}
                    count={element.count}
                  >
                    {element.tag}
                  </SidebarCheckbox>
                ))}{' '}
              </VStack>
            </CheckboxGroup>
          </SidebarCollapse>
        </VStack>
      </Box>
    </Box>
  )
}
