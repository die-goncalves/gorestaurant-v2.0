function groupTags(
  foods: Array<{
    id: string
    name: string
    price: number
    image: string
    description: string
    tag: { id: string; tag_value: string }
    food_rating: Array<{ customer_id: string; rating: number }>
  }>
) {
  const tag_array = foods.map(food => food.tag)
  const filtered_tags = tag_array.filter(
    (tag, i) =>
      !tag_array.some((test_tag, j) => {
        return j > i && tag.id === test_tag.id
      })
  )
  return filtered_tags
}

function tagListingForFiltering(
  restaurants: Array<{
    foods: Array<{
      tag: { id: string; tag_value: string }
    }>
  }>
) {
  let result: Array<{
    id: string
    tag: string
    count: number
  }> = []
  const tag_array = restaurants.map(restaurant => restaurant.foods).flat()

  for (let item of tag_array) {
    if (!item.tag) continue
    if (result.length === 0) {
      result.push({ id: item.tag.id, tag: item.tag.tag_value, count: 1 })
      continue
    }
    const index = result.findIndex(
      element => element['tag'] === item.tag.tag_value
    )

    if (index !== -1) {
      result[index]['count'] += 1
    } else {
      result.push({ id: item.tag.id, tag: item.tag.tag_value, count: 1 })
    }
  }

  return result
}

export { groupTags, tagListingForFiltering }
