import { createContext, ReactNode, useContext, useState } from 'react'
import { parseCookies, setCookie } from 'nookies'
import { supabase } from '../utils/supabaseClient'

type Food = {
  id: string
  name: string
  price: number
  image: string
  description: string
  tag: { id: string; tag_value: string }
  food_rating: Array<{ customer_id: string; rating: number }>
  amount: number
  restaurant: { id: string; name: string; image: string }
  stripe: {
    stripe_food_id: string
    stripe_food_price: string
  }
}

type CartProviderProps = {
  children: ReactNode
}

type CartContextData = {
  cart: Food[]
  addFood: (foodId: string) => Promise<void>
  removeFood: (foodId: string) => void
  thereIsASpecificFoodInTheCart: (foodId: string) => boolean
  numberOfSpecificFoodInTheCart: (foodId: string) => number
  priceOfSpecificFoodAccumulatedInTheCart: (foodId: string) => number
}

const CartContext = createContext({} as CartContextData)

export function CartProvider({ children }: CartProviderProps) {
  const [cart, setCart] = useState<Food[]>(() => {
    const storageCart = parseCookies()
    if (storageCart['@GoRestaurant:cart'])
      return JSON.parse(storageCart['@GoRestaurant:cart'])
    return []
  })

  const addFood = async (foodId: string) => {
    try {
      const specificFood = cart.find(specificFood => specificFood.id === foodId)

      if (specificFood) {
        const addFoodInCart = cart.map((food: Food) => {
          if (food.id === foodId) {
            food.amount += 1
          }
          return food
        })
        setCart(addFoodInCart)
        setCookie(null, '@GoRestaurant:cart', JSON.stringify(addFoodInCart), {
          maxAge: 60 * 60 * 24 * 30,
          path: '/'
        })
      } else {
        const { data, error } = await supabase
          .from<Food>('gr_foods')
          .select(
            `
              *,  
              tag ( * ),
              food_rating: gr_food_rating ( * ),
              stripe: gr_stripe_foods ( * ),
              restaurant: gr_restaurants ( id, name, image )
            `
          )
          .eq('id', foodId)

        if (data) {
          const foodWithAmount = { ...data[0], amount: 1 }
          const addFoodInCart = [...cart, foodWithAmount]
          setCart(addFoodInCart)
          setCookie(null, '@GoRestaurant:cart', JSON.stringify(addFoodInCart), {
            maxAge: 60 * 60 * 24 * 30,
            path: '/'
          })
        }
      }
    } catch {
      throw new Error('Error adding food')
    }
  }

  const removeFood = (foodId: string) => {
    try {
      const specificFood = cart.find(specificFood => specificFood.id === foodId)
      if (specificFood) {
        if (specificFood.amount === 1) {
          const newStackFoods = cart.filter((food: Food) => food.id !== foodId)
          setCart(newStackFoods)
          setCookie(null, '@GoRestaurant:cart', JSON.stringify(newStackFoods), {
            maxAge: 60 * 60 * 24 * 30,
            path: '/'
          })
        } else {
          const removeFoodInCart = cart.map((food: Food) => {
            if (food.id === foodId) {
              food.amount -= 1
            }
            return food
          })
          setCart(removeFoodInCart)
          setCookie(
            null,
            '@GoRestaurant:cart',
            JSON.stringify(removeFoodInCart),
            {
              maxAge: 60 * 60 * 24 * 30,
              path: '/'
            }
          )
        }
      } else {
        throw new Error('This food is not present in the cart for removal')
      }
    } catch (error) {
      throw new Error('Error removing food')
    }
  }

  const thereIsASpecificFoodInTheCart = (foodId: string) => {
    const specificFood = cart.find(specificFood => specificFood.id === foodId)
    return specificFood ? true : false
  }

  const numberOfSpecificFoodInTheCart = (foodId: string) => {
    const specificFood = cart.find(specificFood => specificFood.id === foodId)
    return specificFood ? specificFood.amount : 0
  }

  const priceOfSpecificFoodAccumulatedInTheCart = (foodId: string) => {
    const specificFood = cart.find(specificFood => specificFood.id === foodId)
    return specificFood ? specificFood.amount * specificFood.price : 0
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        addFood,
        removeFood,
        thereIsASpecificFoodInTheCart,
        numberOfSpecificFoodInTheCart,
        priceOfSpecificFoodAccumulatedInTheCart
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart(): CartContextData {
  const context = useContext(CartContext)

  return context
}
