import Link, { LinkProps } from 'next/link'
import { useRouter } from 'next/router'
import React, { cloneElement, ReactElement } from 'react'

type ActiveLinkProps = {
  children: ReactElement
  shouldMatchExacthref?: boolean
} & LinkProps

export default function ActiveLink({
  children,
  shouldMatchExacthref = false,
  ...rest
}: ActiveLinkProps) {
  const { asPath } = useRouter()
  let isActive = false

  if (asPath === rest.href || asPath === rest.as) isActive = true

  return (
    <Link {...rest}>
      {cloneElement(children, {
        _hover: {
          textDecoration: 'none',
          '& > div': {
            background: isActive ? 'orange.600' : 'orange.100'
          }
        },
        _focus: {
          boxShadow: 'none'
        },
        sx: {
          '& > div': {
            color: isActive ? 'brand.body_background' : 'brand.text_color',
            background: isActive ? 'orange.600' : 'transparent'
          }
        }
      })}
    </Link>
  )
}
