import React, { useState, useEffect, useCallback, ReactNode } from 'react'
import { PrevButton, NextButton } from '../../components/Carousel/ArrowButtons'
import useEmblaCarousel from 'embla-carousel-react'
import { Box } from '@chakra-ui/react'

type CarouselProps = {
  children: ReactNode
}

export function Carousel({ children }: CarouselProps) {
  const [viewportRef, embla] = useEmblaCarousel({ loop: false })
  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false)
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false)

  const scrollPrev = useCallback(() => embla && embla.scrollPrev(), [embla])
  const scrollNext = useCallback(() => embla && embla.scrollNext(), [embla])

  const onSelect = useCallback(() => {
    if (!embla) return
    setPrevBtnEnabled(embla.canScrollPrev())
    setNextBtnEnabled(embla.canScrollNext())
  }, [embla])

  useEffect(() => {
    if (!embla) return
    onSelect()
    embla.on('select', onSelect)
  }, [embla, onSelect])

  return (
    <Box
      sx={{
        display: 'flex',
        position: 'relative',
        boxShadow: 'inset 0px 0px 2px 0px rgb(0 0 0 / 50%)',
        padding: '10px',
        maxWidth: '800px',
        marginX: 'auto'
      }}
    >
      <Box sx={{ overflow: 'hidden', width: '100%' }} ref={viewportRef}>
        <Box
          sx={{
            display: 'flex',
            userSelect: 'none',
            WebkitTouchCallout: 'none',
            KhtmlUserSelect: 'none',
            WebkitTapHighlightColor: 'transparent'
          }}
        >
          {children}
        </Box>
      </Box>
      <PrevButton onClick={scrollPrev} enabled={prevBtnEnabled} />
      <NextButton onClick={scrollNext} enabled={nextBtnEnabled} />
    </Box>
  )
}
