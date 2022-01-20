import { IconButton } from '@chakra-ui/react'
import React from 'react'
import { MdOutlineArrowBackIos, MdOutlineArrowForwardIos } from 'react-icons/md'

export const PrevButton = ({
  enabled,
  onClick
}: {
  enabled: boolean
  onClick: () => void | undefined
}) => (
  <IconButton
    icon={<MdOutlineArrowBackIos fontSize="2.75rem" color="#DD6B20" />}
    aria-label="Seta para esquerda"
    onClick={onClick}
    disabled={!enabled}
    sx={{
      cursor: 'pointer',
      position: 'absolute',
      zIndex: '1',
      top: '50%',
      left: '1.5rem',
      transform: 'translateY(-50%)',
      _focus: {
        boxShadow: 'none'
      }
    }}
    variant="unstyled"
  />
)

export const NextButton = ({
  enabled,
  onClick
}: {
  enabled: boolean
  onClick: () => void | undefined
}) => (
  <IconButton
    icon={<MdOutlineArrowForwardIos fontSize="2.75rem" color="#DD6B20" />}
    aria-label="Seta para direita"
    onClick={onClick}
    disabled={!enabled}
    sx={{
      cursor: 'pointer',
      position: 'absolute',
      zIndex: '1',
      top: '50%',
      right: '1.5rem',
      transform: 'translateY(-50%)',
      _focus: {
        boxShadow: 'none'
      }
    }}
    variant="unstyled"
  />
)
