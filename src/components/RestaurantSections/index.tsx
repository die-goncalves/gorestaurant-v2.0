import { useEffect, useState } from 'react'
import { Box } from '@chakra-ui/react'
import dynamic from 'next/dynamic'
import { groupTags } from '../../utils/tags'

type RestaurantDetailsProps = {
  foods: Array<{
    id: string
    name: string
    price: number
    image: string
    description: string
    tag: { id: string; tag_value: string }
    food_rating: Array<{ consumer_id: string; rating: number }>
  }>
}

export default function RestaurantSections({ foods }: RestaurantDetailsProps) {
  const [tags, setTags] = useState<Array<{ id: string; tag_value: string }>>([])

  useEffect(() => {
    const foodFormatted = groupTags(foods)
    setTags(foodFormatted)
  }, [])

  const DynamicNavLinkWithNoSSR = dynamic(() => import('./NavLinks'), {
    ssr: false
  })

  return (
    <Box>
      <DynamicNavLinkWithNoSSR tags={tags} foods={foods} />
    </Box>
  )
}