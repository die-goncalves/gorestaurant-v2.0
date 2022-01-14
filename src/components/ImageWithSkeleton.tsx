import { Skeleton } from '@chakra-ui/react'
import NextImage, { ImageProps as NextImageProps } from 'next/image'
import { useState } from 'react'

type ImageProps = Omit<NextImageProps, 'onLoadingComplete'>

export function ImageWithSkeleton({ ...rest }: ImageProps) {
  const [loading, setLoading] = useState(true)

  function imageLoad(e: { naturalWidth: number; naturalHeight: number }) {
    if (e) setLoading(false)
  }

  return (
    <>
      {loading && (
        <Skeleton flex="1" startColor="gray.300" endColor="gray.400" />
      )}
      <NextImage
        {...rest}
        onLoadingComplete={e => {
          imageLoad(e)
        }}
      />
    </>
  )
}
