import { useEffect, useState } from 'react'
import { Box } from '@chakra-ui/react'
import dynamic from 'next/dynamic'
import { groupTags } from '../../utils/tags'
import { TFoods, TFoodRating } from '../../types'

type RestaurantSectionsProps = {
  isRestaurantOpen:
    | {
        open: boolean
        for_coming?: any
        current?: any
      }
    | undefined
  foods: Array<
    Omit<
      TFoods,
      | 'restaurant_id'
      | 'stripe_food_id'
      | 'stripe_price_id'
      | 'created_at'
      | 'updated_at'
    > & {
      food_rating: Array<
        Omit<TFoodRating, 'food_id' | 'created_at' | 'updated_at'>
      >
    }
  >
}

export default function RestaurantSections({
  foods,
  isRestaurantOpen
}: RestaurantSectionsProps) {
  const [tags, setTags] = useState<Array<string>>([])

  useEffect(() => {
    const foodFormatted = groupTags(foods)
    setTags(foodFormatted)
  }, [])

  const DynamicNavLinkWithNoSSR = dynamic(() => import('./NavLinks'), {
    ssr: false
  })

  return (
    <Box>
      <DynamicNavLinkWithNoSSR
        tags={tags}
        foods={foods}
        isRestaurantOpen={isRestaurantOpen}
      />
    </Box>
  )
}
