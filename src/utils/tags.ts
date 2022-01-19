function groupTags(
  foods: Array<{
    id: string
    name: string
    price: number
    image: string
    description: string
    tag: string
    food_rating: Array<{ customer_id: string; rating: number }>
  }>
) {
  const tag_array = foods.map(food => food.tag)
  const filtered_tags = tag_array.filter(
    (tag, i) =>
      !tag_array.some((test_tag, j) => {
        return j < i && tag === test_tag
      })
  )
  return filtered_tags
}

function tagListingForFiltering(
  restaurants: Array<{
    foods: Array<{
      tag: string
    }>
  }>
) {
  let result: Array<{
    tag: string
    count: number
  }> = []
  const tag_array = restaurants.flatMap(restaurant => {
    const removeDuplicatesInRestaurant = [
      ...new Map(
        restaurant.foods.map<[string, { tag: string }]>(item => {
          return [item.tag, item]
        })
      ).values()
    ]
    return removeDuplicatesInRestaurant
  })

  for (let item of tag_array) {
    if (!item.tag) continue
    if (result.length === 0) {
      result.push({ tag: item.tag, count: 1 })
      continue
    }
    const index = result.findIndex(element => element['tag'] === item.tag)

    if (index !== -1) {
      result[index]['count'] += 1
    } else {
      result.push({ tag: item.tag, count: 1 })
    }
  }

  return result
}

export { groupTags, tagListingForFiltering }
