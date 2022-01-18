import { Box, Text, Wrap, WrapItem } from '@chakra-ui/react'
import { useEffect, useState } from 'react'

type TagsProps = {
  tags: Array<
    | {
        value: string
      }
    | undefined
  >
}

export function Tags({ tags }: TagsProps) {
  const [uniqueTags, setUniqueTags] = useState<
    (
      | {
          value: string
        }
      | undefined
    )[]
  >([])

  useEffect(() => {
    const tagCleaning = [
      ...new Map(
        tags
          .map<[string, { value: string } | undefined]>(item => {
            if (item) return [item.value, item]
            return ['undefined', undefined]
          })
          .filter(item => item[1])
      ).values()
    ]
    setUniqueTags(tagCleaning)
  }, [tags])

  return (
    <Wrap spacing="0px">
      {uniqueTags.map((tag, index) => {
        if (tag)
          return (
            <WrapItem
              key={`tagOnRestaurantCard:${tag.value}`}
              as="span"
              alignItems="center"
            >
              <Text
                fontSize="0.875rem"
                fontWeight="500"
                lineHeight="0.875rem"
                color="gray.600"
                _hover={{ color: '#DD6B20' }}
                transition="all 0.2s ease-in-out"
              >
                {tag.value}
              </Text>
              {index !== uniqueTags.length - 1 && (
                <Box
                  boxSize="2.5px"
                  background="gray.300"
                  borderRadius="full"
                  marginX="0.25rem"
                />
              )}
            </WrapItem>
          )
      })}
    </Wrap>
  )
}
