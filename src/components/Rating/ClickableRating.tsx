import { Box, Button, Flex, Text } from '@chakra-ui/react'
import { useContext, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { AuthContext } from '../../contexts/AuthContext'
import { backgroundColorOfTheStar } from '../../utils/backgroundColorOfTheStar'
import { ratingNumberToText } from '../../utils/ratingNumberToText'
import { supabase } from '../../utils/supabaseClient'

type ClickableRatingProps = {
  starSize: string
  foodId: string
}

export function ClickableRating({ starSize, foodId }: ClickableRatingProps) {
  const [clickValue, setClickValue] = useState<number>()
  const [foodRated, setFoodRated] = useState<
    | {
        created_at: string
        customer_id: string
        food_id: string
        rating: number
        updated_at: string
      }
    | undefined
  >()
  const [isSavingRating, setIsSavingRating] = useState(false)
  const { userData } = useContext(AuthContext)

  async function updateRating(rating: number) {
    try {
      setIsSavingRating(true)
      const { data, error } = await supabase
        .from('food_rating')
        .update({
          rating,
          updated_at: new Date().toISOString().toLocaleString()
        })
        .match({ food_id: foodId, customer_id: userData?.id })
      if (error) {
        toast.error(
          <Text as="span">
            Erro ainda não abrangido pela tradução, verifique no console
          </Text>
        )
        throw error
      }
      toast.success(<Text as="span">Avaliação atualizada!</Text>)
    } catch (error) {
      console.error(error)
    } finally {
      setIsSavingRating(false)
    }
  }
  async function createRating(rating: number) {
    try {
      setIsSavingRating(true)
      const { error } = await supabase.from('food_rating').insert([
        {
          food_id: foodId,
          customer_id: userData?.id,
          rating
        }
      ])
      if (error) {
        toast.error(
          <Text as="span">
            Erro ainda não abrangido pela tradução, verifique no console
          </Text>
        )
        throw error
      }
      toast.success(
        <Text as="span">
          <Text>Avaliação salva!</Text>
        </Text>
      )
    } catch (error) {
      console.error(error)
    } finally {
      setIsSavingRating(false)
    }
  }
  async function hasRating(): Promise<
    | {
        created_at: string
        customer_id: string
        food_id: string
        rating: number
        updated_at: string
      }
    | undefined
  > {
    try {
      const { data, error } = await supabase
        .from('food_rating')
        .select('*')
        .match({ food_id: foodId, customer_id: userData?.id })

      if (error) {
        toast.error(
          <Text as="span">
            Erro ainda não abrangido pela tradução, verifique no console
          </Text>
        )
        throw error
      }

      if (data && data.length > 0) {
        return data[0]
      }
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    async function awaitingRating(rating: number) {
      const alreadyHave = await hasRating()

      if (alreadyHave) {
        updateRating(rating)
      } else {
        createRating(rating)
      }
    }

    if (clickValue) {
      awaitingRating(clickValue)
    }
  }, [clickValue])

  useEffect(() => {
    async function foodAlreadyRated() {
      try {
        const { data, error } = await supabase
          .from('food_rating')
          .select('*')
          .match({ food_id: foodId, customer_id: userData?.id })

        if (error) {
          toast.error(
            <Text as="span">
              Erro ainda não abrangido pela tradução, verifique no console
            </Text>
          )
          throw error
        }

        if (data && data.length > 0) {
          setFoodRated(data[0])
        }
      } catch (error) {
        console.error(error)
      }
    }

    foodAlreadyRated()
  }, [])

  return (
    <Flex sx={{ gap: '0.25rem' }} whiteSpace="nowrap" alignItems="center">
      <Flex sx={{ gap: '0rem' }}>
        {Array(5)
          .fill('')
          .map((_, i) => {
            return (
              <Button
                key={`Button-0${i}-Star`}
                borderRadius="0px"
                padding="0px"
                lineHeight={starSize}
                fontSize={starSize}
                fontWeight="700"
                height={starSize}
                minWidth={starSize}
                sx={{
                  _focus: {
                    boxShadow: 'none'
                  }
                }}
                variant="unstyled"
                cursor={isSavingRating ? 'wait' : 'pointer'}
                {...(!isSavingRating && {
                  onClick: () => setClickValue(i + 1)
                })}
              >
                <Flex flex="1" justifyContent="center" alignItems="center">
                  <Text
                    sx={{
                      transition: '0.75s all ease-in-out',
                      background: clickValue
                        ? clickValue >= i + 1
                          ? ratingNumberToText(clickValue).color
                          : backgroundColorOfTheStar(clickValue)
                        : foodRated
                        ? foodRated.rating >= i + 1
                          ? ratingNumberToText(foodRated.rating).color
                          : backgroundColorOfTheStar(foodRated.rating)
                        : 'gray.200',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent'
                    }}
                  >
                    ★
                  </Text>
                </Flex>
              </Button>
            )
          })}
      </Flex>
    </Flex>
  )
}
