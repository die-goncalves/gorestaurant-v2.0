import {
  Divider,
  Flex,
  Tag,
  TagLabel,
  TagCloseButton,
  Text,
  Wrap
} from '@chakra-ui/react'
import { useContext } from 'react'
import { FilterContext } from '../../contexts/FilterContext'

type RestaurantFilterProps = {
  total: number
}

export function RestaurantsFilters({ total }: RestaurantFilterProps) {
  const {
    geographicLocation,
    deliveryOption,
    sortOption,
    setSortOption,
    priceOption,
    setPriceOption,
    tagOption,
    setTagOption
  } = useContext(FilterContext)

  return (
    <Flex flexDirection="column">
      <Flex alignItems="center" fontSize="1.5rem" marginBottom="1rem">
        <Text>
          {deliveryOption === 'delivery' ? 'Delivery to' : 'Pick up in'}
        </Text>
        <Text marginLeft="0.3125rem" fontWeight="bold">
          {geographicLocation?.place}
        </Text>
      </Flex>

      <Wrap>
        {sortOption && (
          <Tag
            padding="0.5rem"
            borderRadius="0px"
            variant="outline"
            colorScheme="orange"
          >
            <TagLabel display="flex">
              <Text>{'Sort by'}</Text>
              <Text fontWeight="600" marginLeft="0.25rem">
                {sortOption}
              </Text>
            </TagLabel>
            <TagCloseButton
              marginLeft="0.5rem"
              marginRight="0px"
              borderRadius="0px"
              _focus={{
                boxShadow: '0 0 0 3px rgba(255,148,66,0.6)',
                background: 'rgba(255,148,66, 0.14)'
              }}
              onClick={() => setSortOption('')}
            />
          </Tag>
        )}
        {deliveryOption === 'delivery' && !!priceOption && (
          <Flex alignItems="center">
            <Tag
              padding="0.5rem"
              borderRadius="0px"
              variant="outline"
              colorScheme="orange"
            >
              <TagLabel display="flex">
                {priceOption === '0' ? (
                  <Text fontWeight="600">Free delivery</Text>
                ) : priceOption === 'unrestricted' ? (
                  <Text fontWeight="600">All delivery prices</Text>
                ) : (
                  <>
                    <Text>Delivery price up to</Text>
                    <Text fontWeight="600" marginLeft="0.25rem">
                      ${priceOption}
                    </Text>
                  </>
                )}
              </TagLabel>
              <TagCloseButton
                marginLeft="0.5rem"
                marginRight="0px"
                borderRadius="0px"
                _focus={{
                  boxShadow: '0 0 0 3px rgba(255,148,66,0.6)',
                  background: 'rgba(255,148,66, 0.14)'
                }}
                onClick={() => setPriceOption('unrestricted')}
              />
            </Tag>
          </Flex>
        )}

        {tagOption && tagOption.length !== 0 && (
          <>
            {tagOption.map(tag => (
              <Tag
                key={tag}
                padding="0.5rem"
                borderRadius="0px"
                variant="outline"
                colorScheme="orange"
              >
                <TagLabel fontWeight="600">{tag}</TagLabel>
                <TagCloseButton
                  marginLeft="0.5rem"
                  marginRight="0px"
                  borderRadius="0px"
                  _focus={{
                    boxShadow: '0 0 0 3px rgba(255,148,66,0.6)',
                    background: 'rgba(255,148,66, 0.14)'
                  }}
                  onClick={() =>
                    setTagOption(tagOption.filter(item => item !== tag))
                  }
                />
              </Tag>
            ))}
          </>
        )}
      </Wrap>

      <Flex marginY="0.25rem" fontWeight="600" fontSize="1rem" color="gray.600">
        {total} Restaurants
      </Flex>

      <Divider borderColor="#E2E8F0" />
    </Flex>
  )
}
