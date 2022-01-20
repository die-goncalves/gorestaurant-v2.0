import { Flex, Grid, GridItem } from '@chakra-ui/react'
import Image from 'next/image'
import DeliveryBike from '../../assets/delivery-bike.svg'
import DeliveryWorld from '../../assets/delivery-world.svg'
import PizzaLogo from '../../assets/logo.svg'
import Restaurant from '../../../public/restaurant.png'
import { IconAuthorLink } from './IconAuthorLink'
import { IconSiteLink } from './IconSiteLink'

export function IconCredit() {
  return (
    <Grid w="100%" templateColumns="repeat(3, 1fr)" gap={6}>
      <GridItem boxShadow="inset 0px 0px 2px 0px rgba(0,0,0,0.5)">
        <Grid templateColumns="1fr 5fr" paddingY="0.5rem">
          <Flex h="100%" w="100%" alignItems="center" justifyContent="center">
            <Image
              src={DeliveryBike}
              alt="delivery-bike"
              width={32}
              height={32}
            />
          </Flex>
          <GridItem>
            <IconAuthorLink
              href="https://www.flaticon.com/authors/photo3idea-studio"
              title="photo3idea_studio"
            >
              photo3idea_studio
            </IconAuthorLink>
            <IconSiteLink href="https://www.flaticon.com/" title="Flaticon">
              www.flaticon.com
            </IconSiteLink>
          </GridItem>
        </Grid>
      </GridItem>

      <GridItem boxShadow="inset 0px 0px 2px 0px rgba(0,0,0,0.5)">
        <Grid templateColumns="1fr 5fr" paddingY="0.5rem">
          <Flex h="100%" w="100%" alignItems="center" justifyContent="center">
            <Image
              src={DeliveryWorld}
              alt="delivery-world"
              width={32}
              height={32}
            />
          </Flex>
          <GridItem>
            <IconAuthorLink
              href="https://www.flaticon.com/authors/konkapp"
              title="Konkapp"
            >
              Konkapp
            </IconAuthorLink>
            <IconSiteLink href="https://www.flaticon.com/" title="Flaticon">
              www.flaticon.com
            </IconSiteLink>
          </GridItem>
        </Grid>
      </GridItem>

      <GridItem boxShadow="inset 0px 0px 2px 0px rgba(0,0,0,0.5)">
        <Grid templateColumns="1fr 5fr" paddingY="0.5rem">
          <Flex h="100%" w="100%" alignItems="center" justifyContent="center">
            <Image src={PizzaLogo} alt="pizza-logo" width={32} height={32} />
          </Flex>
          <GridItem>
            <IconAuthorLink
              href="https://www.flaticon.com/authors/chanut-is-industries"
              title="Chanut-is-Industries"
            >
              Chanut-is-Industries
            </IconAuthorLink>
            <IconSiteLink href="https://www.flaticon.com/" title="Flaticon">
              www.flaticon.com
            </IconSiteLink>
          </GridItem>
        </Grid>
      </GridItem>

      <GridItem boxShadow="inset 0px 0px 2px 0px rgba(0,0,0,0.5)">
        <Grid templateColumns="1fr 5fr" paddingY="0.5rem">
          <Flex h="100%" w="100%" alignItems="center" justifyContent="center">
            <Image
              src={Restaurant}
              alt="restaurant png"
              width={32}
              height={32}
            />
          </Flex>
          <GridItem>
            <IconAuthorLink
              href="https://www.flaticon.com/authors/freepik"
              title="Freepik"
            >
              Freepik
            </IconAuthorLink>
            <IconSiteLink href="https://www.flaticon.com/" title="Flaticon">
              www.flaticon.com
            </IconSiteLink>
          </GridItem>
        </Grid>
      </GridItem>
    </Grid>
  )
}
