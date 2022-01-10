import { TFoodRating } from '../types'

export function overallRatingRestaurant(
  foods: Array<{ food_rating: Array<Pick<TFoodRating, 'rating'>> }>,
  reviews = 0,
  sum = 0
): { overallRating: number | undefined; numberRatings: number } {
  if (foods.length === 0 && reviews === 0)
    return {
      overallRating: undefined,
      numberRatings: reviews
    }
  if (foods.length === 0) {
    return {
      overallRating: Number((sum / reviews).toFixed(2)),
      numberRatings: reviews
    }
  }
  let numberOfRatings = reviews
  let sumOfRatings = sum

  for (let food_rating of foods[0].food_rating) {
    numberOfRatings = numberOfRatings + 1
    sumOfRatings = sumOfRatings + food_rating.rating
  }
  foods.shift()
  return overallRatingRestaurant(foods, numberOfRatings, sumOfRatings)
}
