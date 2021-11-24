import { Box, RadioGroup, VStack, CheckboxGroup } from '@chakra-ui/react'
import { SidebarRadio } from './SidebarRadio'
import { SidebarCollapse } from './SidebarCollapse'
import { SidebarSlider } from './SidebarSlider'
import { SidebarCheckbox } from './SidebarCheckbox'
import { useContext } from 'react'
import { FilterContext } from '../../contexts/FilterContext'
import { ModalMap } from './ModalMap'

type SidebarProps = {
  tags: Array<{ id: string; tag: string; count: number }>
}

export function Sidebar({ tags }: SidebarProps) {
  const {
    deliveryOption,
    setDeliveryOption,
    sortOption,
    setSortOption,
    tagOption,
    setTagOption
  } = useContext(FilterContext)

  return (
    <Box
      maxHeight="calc(100vh - 4.5rem)"
      width="17.5rem"
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
          <ModalMap />

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
          {deliveryOption === 'delivery' && (
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
                ))}
              </VStack>
            </CheckboxGroup>
          </SidebarCollapse>
        </VStack>
      </Box>
    </Box>
  )
}
