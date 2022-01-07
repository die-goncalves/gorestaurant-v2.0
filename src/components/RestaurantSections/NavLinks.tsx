import React, { useEffect, useRef, useState } from 'react'
import {
  Box,
  Button,
  Flex,
  Grid,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text
} from '@chakra-ui/react'
import scrollIntoView from 'scroll-into-view'
import debounce from 'lodash.debounce'
import { MemoizedFoodSections } from './FoodSections'
import { MdOutlineKeyboardArrowDown } from 'react-icons/md'

type NavLinksProps = {
  tags: string[]
  foods: Array<{
    id: string
    name: string
    price: number
    image: string
    description: string
    tag: string
    food_rating: Array<{ customer_id: string; rating: number }>
  }>
}

export default function NavLinks({ tags, foods }: NavLinksProps) {
  const navRef = useRef<HTMLDivElement>(null)
  const [visibilityNavLinks, setVisibilityNavLinks] = useState<{
    [key: string]: { isIntersecting: boolean; id: string; tag: string }
  }>({})
  const [notVisible, setNotVisible] = useState<
    [string, { isIntersecting: boolean; id: string; tag: string }][]
  >([])
  const [activeSectionId, setActiveSectionId] = useState('')
  const [activeSection, setActiveSection] = useState('')

  const throttledEventHandler = useRef(
    debounce(value => setActiveSectionId(value), 50)
  )

  const useHandleNavLinks = (
    setVisibilityNavLinks: React.Dispatch<
      React.SetStateAction<{
        [key: string]: {
          isIntersecting: boolean
          id: string
          tag: string
        }
      }>
    >
  ) => {
    const observer = useRef<IntersectionObserver>()
    useEffect(() => {
      const callbackFunction = (entries: IntersectionObserverEntry[]) => {
        let updatedEntries: {
          [key: string]: {
            isIntersecting: boolean
            id: string
            tag: string
          }
        } = {}
        entries.forEach(entryElement => {
          if (entryElement.isIntersecting) {
            updatedEntries[entryElement.target.id] = {
              isIntersecting: true,
              id: entryElement.target.id,
              tag: entryElement.target.innerHTML
            }
          } else {
            updatedEntries[entryElement.target.id] = {
              isIntersecting: false,
              id: entryElement.target.id,
              tag: entryElement.target.innerHTML
            }
          }
        })
        setVisibilityNavLinks(prev => ({
          ...prev,
          ...updatedEntries
        }))
      }

      if (observer.current) {
        observer.current.disconnect()
      }

      observer.current = new IntersectionObserver(callbackFunction, {
        root: navRef.current,
        rootMargin: '0px',
        threshold: 1
      })

      let entryElements: Element[] = []
      if (navRef.current) entryElements = Array.from(navRef.current.children)
      entryElements.forEach(element => observer.current?.observe(element))

      return () => observer.current?.disconnect()
    }, [setVisibilityNavLinks])
  }

  const useGetActiveSection = (
    setActiveSectionId: React.Dispatch<React.SetStateAction<string>>
  ) => {
    const entryElementsRef = useRef<{
      [key: string]: IntersectionObserverEntry
    }>({})

    const observer = useRef<IntersectionObserver>()
    useEffect(() => {
      const callbackFunction = (entries: IntersectionObserverEntry[]) => {
        entryElementsRef.current = entries.reduce((acc, entryElement) => {
          return {
            ...acc,
            [entryElement.target.id]: entryElement
          }
        }, entryElementsRef.current)

        const visibleEntries: IntersectionObserverEntry[] = []
        Object.keys(entryElementsRef.current).forEach(key => {
          const entryElement = entryElementsRef.current[key]
          if (entryElement.isIntersecting) {
            visibleEntries.push(entryElement)
          }
        })

        if (visibleEntries.length === 1) {
          if (visibleEntries[0]['intersectionRatio'] >= 0.5) {
            throttledEventHandler.current(
              visibleEntries[0].target.id.replace('section', 'button')
            )
          } else {
            throttledEventHandler.current('')
          }
        } else if (visibleEntries.length > 1) {
          throttledEventHandler.current(
            visibleEntries[0].target.id.replace('section', 'button')
          )
        } else {
          throttledEventHandler.current('')
        }
      }

      if (observer.current) {
        observer.current.disconnect()
      }

      observer.current = new IntersectionObserver(callbackFunction, {
        root: null,
        rootMargin: '0px',
        threshold: 0.5
      })

      const entryElements = Array.from(document.querySelectorAll('section'))
      entryElements.forEach(element => observer.current?.observe(element))

      return () => observer.current?.disconnect()
    }, [setActiveSectionId])
  }

  useHandleNavLinks(setVisibilityNavLinks)
  useGetActiveSection(setActiveSectionId)

  useEffect(() => {
    setActiveSection('More')
    const notVisible = Object.entries(visibilityNavLinks)
      .map(entry => {
        if (!entry[1].isIntersecting) return entry
      })
      .filter(entry => entry !== undefined)
    if (notVisible) {
      notVisible.forEach(entry => {
        if (entry && entry[0] === activeSectionId)
          setActiveSection(entry[1].tag)
      })
    }
  }, [activeSectionId, visibilityNavLinks])

  function scrollFunction(id: string) {
    let e = document.getElementById(id)
    if (e) {
      scrollIntoView(e, {
        time: 1000,
        align: { top: 0, topOffset: 40 },
        ease: function easeInCirc(x: number): number {
          return 1 - Math.sqrt(1 - Math.pow(x, 2))
        }
      })
    }
  }

  useEffect(() => {
    setNotVisible(
      Object.entries(visibilityNavLinks).filter(
        entry => !entry[1].isIntersecting
      )
    )
  }, [visibilityNavLinks])

  return (
    <Box padding="1rem 2rem 0rem 2rem">
      <Flex
        w="100%"
        position="sticky"
        top="0px"
        background="brand.body_background"
        boxShadow="0px 2.5px 15px -15px #0C0600"
        alignItems="center"
        zIndex="2"
      >
        <Grid w="100%" h="min-content" templateColumns="2fr 1fr" gap={0}>
          <Flex justifyContent="space-between">
            <Flex
              flex="1"
              flexWrap="wrap"
              flexDirection="row"
              maxH="2.5rem"
              paddingRight="1rem"
              overflow="clip"
              ref={navRef}
              sx={{
                columnGap: '1rem'
              }}
            >
              {tags.map((tag, index) => (
                <Button
                  key={`button-key-${tag}`}
                  id={`button-${tag}`}
                  display="flex"
                  padding="0.5rem"
                  borderRadius="0px"
                  colorScheme="orange"
                  variant="ghost"
                  onClick={() => scrollFunction(`section-${tag}`)}
                  color={
                    activeSectionId === `button-${tag}`
                      ? 'orange.600'
                      : 'brand.text_color'
                  }
                  _focus={{
                    boxShadow: 'none'
                  }}
                  transition="border 0.1s ease-in-out"
                  borderBottom={
                    activeSectionId === `button-${tag}`
                      ? '3px solid #C05621'
                      : '0px solid #C05621'
                  }
                  visibility={
                    visibilityNavLinks[`button-${tag}`] ? 'visible' : 'hidden'
                  }
                >
                  {tag}
                </Button>
              ))}
            </Flex>

            {notVisible.length > 0 && (
              <Menu id="menu-overflow" isLazy>
                <MenuButton
                  borderRadius="0px"
                  padding="0.5rem"
                  transition="box-shadow 0.1s ease-in-out"
                  boxShadow={
                    activeSection !== 'More'
                      ? 'inset 0px -3px 0px 0px #C05621'
                      : 'inset 0px 0px 0px 0px #C05621'
                  }
                >
                  <Flex
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Text
                      fontWeight="semibold"
                      color={
                        activeSection !== 'More'
                          ? 'orange.600'
                          : 'brand.text_color'
                      }
                    >
                      {activeSection}
                    </Text>
                    <Box as="span" marginLeft="0.5rem" fontSize="1.25rem">
                      <MdOutlineKeyboardArrowDown />
                    </Box>
                  </Flex>
                </MenuButton>
                <MenuList padding="0px" borderRadius="0px" border="none">
                  {Object.entries(visibilityNavLinks).map(link => {
                    if (!link[1].isIntersecting)
                      return (
                        <MenuItem
                          key={`menuitem-key-${link[1].tag}`}
                          padding="0px"
                        >
                          <Button
                            id={link[1].id}
                            padding="0.5rem"
                            borderRadius="0px"
                            flex="1"
                            justifyContent="flex-start"
                            color={
                              activeSectionId === link[1].id
                                ? 'orange.600'
                                : 'brand.text_color'
                            }
                            onClick={() =>
                              scrollFunction(`section-${link[1].tag}`)
                            }
                            transition="border 0.1s ease-in-out"
                            borderLeft={
                              activeSectionId === link[1].id
                                ? '3px solid #C05621'
                                : '0px solid #C05621'
                            }
                            colorScheme="orange"
                            variant="ghost"
                          >
                            {link[1].tag}
                          </Button>
                        </MenuItem>
                      )
                  })}
                </MenuList>
              </Menu>
            )}
          </Flex>
        </Grid>
      </Flex>

      <MemoizedFoodSections tags={tags} foods={foods} />
    </Box>
  )
}
