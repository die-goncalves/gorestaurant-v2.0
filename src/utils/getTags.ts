type Tags = {
  tags: Array<{ id: number; value: string }>
}

type TagsCounter = {
  id: number
  tag: string
  count: number
}

function getTags(data: Array<Tags>) {
  let result: Array<TagsCounter> = []

  const justValuesTags = data.flatMap(element => element.tags)

  for (let tag of justValuesTags) {
    if (result.length === 0) {
      result.push({ id: tag.id, tag: tag.value, count: 1 })
      continue
    }
    const index = result.findIndex(element => element['tag'] === tag.value)

    if (index !== -1) {
      result[index]['count'] += 1
    } else {
      result.push({ id: tag.id, tag: tag.value, count: 1 })
    }
  }

  return result
}

export { getTags }
