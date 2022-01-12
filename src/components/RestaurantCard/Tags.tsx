import { Box, Text, Wrap, WrapItem } from '@chakra-ui/react'

type TagInfo = {
  value: string
}
type TagsProps = {
  tags: Array<TagInfo | undefined>
}

export function Tags({ tags }: TagsProps) {
  return (
    <Wrap spacing="0px">
      {tags.map((tag, index) => {
        if (tag)
          return (
            <WrapItem key={tag.value} as="span" alignItems="center">
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
              {index !== tags.length - 1 && (
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
