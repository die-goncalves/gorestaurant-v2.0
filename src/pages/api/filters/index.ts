import { NextApiRequest, NextApiResponse } from 'next'
import { getRouteTimeAndDistance } from '../../../utils/directionsMapBox'
import { overallRatingRestaurant } from '../../../utils/overallRatingRestaurant'
import { supabase } from '../../../utils/supabaseClient'

type SupabaseResponseData = {
  id: string
  name: string
  coordinates: {
    lat: number
    lng: number
  }
  created_at: string
  image: string
  foods: Array<{
    tag: string
    food_rating: Array<{ food_id: string; rating: number }>
  }>
  place: string
}

type PickUpData = {
  rating: number | undefined
  reviews: number
  delivery_time: number
} & SupabaseResponseData

type DeliveryData = {
  rating: number | undefined
  reviews: number
  delivery_time: number
  delivery_price: number
} & SupabaseResponseData

type Filters = {
  lng: number
  lat: number
  delivery: string
  'tag[]': string | Array<string>
  delivery_price: string
  sort: string
}

const deliveryFreight = (distance: number) => {
  const freight = 0.12
  return Math.round(distance / 1000) * freight
}

async function dataForPickUp(
  data: Array<SupabaseResponseData>,
  filters: Filters
) {
  let deliveryInfos: Array<{
    duration: number
    distance: number
  }> = []
  for (let item of data) {
    const itemDeliveryInfo = await getRouteTimeAndDistance(
      { lng: filters.lng, lat: filters.lat },
      { lng: item.coordinates.lng, lat: item.coordinates.lat }
    )
    deliveryInfos.push(itemDeliveryInfo)
  }

  let addRatingInfo: Array<PickUpData> = data.map((item, index) => {
    const resultRatings = overallRatingRestaurant([...item.foods])
    return {
      ...item,
      foods: [...item.foods],
      rating: resultRatings.overallRating,
      reviews: resultRatings.numberRatings,
      delivery_time: deliveryInfos[index].duration
    }
  })

  let filterByTags: Array<PickUpData>
  if (filters['tag[]'] !== undefined) {
    if (typeof filters['tag[]'] === 'object') {
      filterByTags = addRatingInfo.filter(value => {
        const testes = value.foods.filter(item => {
          if (item.tag) {
            return filters['tag[]'].includes(item.tag.toLowerCase())
          } else return false
        })
        if (testes.length !== 0) return true
      })
    } else {
      filterByTags = addRatingInfo.filter(value => {
        const found = value.foods.filter(item => {
          if (item.tag) {
            return item.tag.toLowerCase() === filters['tag[]']
          } else return false
        })
        if (found.length !== 0) return true
      })
    }
  } else {
    filterByTags = addRatingInfo
  }

  if (filters.sort !== '') {
    switch (filters.sort) {
      case 'rating':
        filterByTags.sort(function (a, b) {
          if (a.rating === undefined) {
            if (b.rating === undefined) {
              return 0
            } else {
              return 1
            }
          } else {
            if (b.rating === undefined) {
              return -1
            } else {
              if (a.rating > b.rating) {
                return -1
              }
              if (a.rating < b.rating) {
                return 1
              }
            }
          }
          return 0
        })
        break
      default:
        filterByTags.sort(function (a, b) {
          if (a.delivery_time === undefined) {
            if (b.delivery_time === undefined) {
              return 0
            } else {
              return 1
            }
          } else {
            if (b.delivery_time === undefined) {
              return -1
            } else {
              if (a.delivery_time > b.delivery_time) {
                return 1
              }
              if (a.delivery_time < b.delivery_time) {
                return -1
              }
            }
          }
          return 0
        })
    }
  }

  return filterByTags
}

async function dataForDelivery(
  data: Array<SupabaseResponseData>,
  filters: Filters
) {
  let deliveryInfos: Array<{
    duration: number
    distance: number
  }> = []
  for (let item of data) {
    const itemDeliveryInfo = await getRouteTimeAndDistance(
      { lng: filters.lng, lat: filters.lat },
      { lng: item.coordinates.lng, lat: item.coordinates.lat }
    )
    deliveryInfos.push(itemDeliveryInfo)
  }

  let addInfos: Array<DeliveryData> = data.map((item, index) => {
    const resultRatings = overallRatingRestaurant([...item.foods])
    return {
      ...item,
      rating: resultRatings.overallRating,
      reviews: resultRatings.numberRatings,
      delivery_time: deliveryInfos[index].duration,
      delivery_price: deliveryFreight(deliveryInfos[index].distance)
    }
  })

  let filterByTags: Array<DeliveryData> = []
  if (filters['tag[]'] !== undefined) {
    if (typeof filters['tag[]'] === 'object') {
      filterByTags = addInfos.filter(value => {
        const testes = value.foods.filter(item => {
          if (item.tag) {
            return filters['tag[]'].includes(item.tag.toLowerCase())
          } else return false
        })
        if (testes.length !== 0) return true
      })
    } else {
      filterByTags = addInfos.filter(value => {
        const found = value.foods.filter(item => {
          if (item.tag) {
            return item.tag.toLowerCase() === filters['tag[]']
          } else return false
        })
        if (found.length !== 0) return true
      })
    }
  } else {
    filterByTags = addInfos
  }

  let filterByPrices: Array<DeliveryData>
  if (filters.delivery_price !== 'unrestricted') {
    filterByPrices = filterByTags.filter(
      item => item.delivery_price <= Number(filters.delivery_price)
    )
  } else {
    filterByPrices = filterByTags
  }

  if (filters.sort !== '') {
    switch (filters.sort) {
      case 'rating':
        filterByPrices.sort(function (a, b) {
          if (a.rating === undefined) {
            if (b.rating === undefined) {
              return 0
            } else {
              return 1
            }
          } else {
            if (b.rating === undefined) {
              return -1
            } else {
              if (a.rating > b.rating) {
                return -1
              }
              if (a.rating < b.rating) {
                return 1
              }
            }
          }
          return 0
        })
        break
      case 'delivery time':
        filterByPrices.sort(function (a, b) {
          if (a.delivery_time === undefined) {
            if (b.delivery_time === undefined) {
              return 0
            } else {
              return 1
            }
          } else {
            if (b.delivery_time === undefined) {
              return -1
            } else {
              if (a.delivery_time > b.delivery_time) {
                return 1
              }
              if (a.delivery_time < b.delivery_time) {
                return -1
              }
            }
          }
          return 0
        })
        break
      default:
        filterByPrices.sort(function (a, b) {
          if (a.delivery_price === undefined) {
            if (b.delivery_price === undefined) {
              return 0
            } else {
              return 1
            }
          } else {
            if (b.delivery_price === undefined) {
              return -1
            } else {
              if (a.delivery_price > b.delivery_price) {
                return 1
              }
              if (a.delivery_price < b.delivery_price) {
                return -1
              }
            }
          }
          return 0
        })
    }
  }
  return filterByPrices
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  if (req.method === 'GET') {
    const { delivery, user_lng, user_lat, place } = req.query

    const { data, error } = await supabase
      .from<SupabaseResponseData>('restaurants')
      .select(
        `
          id,
          name,
          coordinates,
          image,
          created_at,
          foods (
            tag,
            food_rating: food_rating ( * )
          ),
          place
        `
      )
      .filter('place', 'eq', place)
      .order('created_at', { ascending: true })

    console.log(JSON.stringify(data, null, 4))
    if (error) {
      return res.status(400).json(error)
    }

    if (data) {
      let filteredData:
        | Array<SupabaseResponseData>
        | Array<PickUpData>
        | Array<DeliveryData> = data
      if (delivery === 'pickup') {
        filteredData = await dataForPickUp(data, {
          lng: Number(user_lng),
          lat: Number(user_lat),
          delivery: String(req.query['delivery']),
          'tag[]': req.query['tag[]'],
          delivery_price: String(req.query['delivery_price']),
          sort: String(req.query['sort'])
        })
      } else {
        filteredData = await dataForDelivery(data, {
          lng: Number(user_lng),
          lat: Number(user_lat),
          delivery: String(req.query['delivery']),
          'tag[]': req.query['tag[]'],
          delivery_price: String(req.query['delivery_price']),
          sort: String(req.query['sort'])
        })
      }

      if (filteredData.length !== 0) {
        return res.json(filteredData)
      } else {
        return res.json([])
      }
    } else {
      return res.json([])
    }
  }

  return res.status(405).json({ error: `Method '${req.method}' Not Allowed` })
}
