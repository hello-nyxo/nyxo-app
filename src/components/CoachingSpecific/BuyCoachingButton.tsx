import { useNavigation } from '@react-navigation/core'
import React, { FC, useEffect, useState } from 'react'
import Purchases from 'react-native-purchases'
import styled from 'styled-components/native'
import { fonts } from '@styles/themes'
import colors from '@styles/colors'
import { IconBold } from '../iconRegular'
import TranslatedText from '../TranslatedText'

const BuyCoaching: FC = () => {
  const navigation = useNavigation()
  const [price, setPrice] = useState('')

  const getProducts = async () => {
    try {
      const offerings = await Purchases.getOfferings()
      if (
        offerings.current !== null &&
        offerings.current.monthly !== undefined
      ) {
        // eslint-disable-next-line camelcase
        setPrice(offerings.current.monthly?.product.price_string ?? '-')
      }
    } catch (e) {}
  }

  useEffect(() => {
    getProducts()
  }, [])

  const moveToPurchase = () => {
    navigation.navigate('Purchase')
  }

  return (
    <Container>
      <AndroidContainer>
        <Button activeOpacity={0.9} onPress={moveToPurchase}>
          <LeftColumn>
            <Text>SUB_NOW</Text>
            <MiniText>SUB_NOW_MINI</MiniText>
          </LeftColumn>

          <RightColumn>
            {price ? (
              <>
                <PriceContainer>
                  <Price>{price}</Price>
                  <Monthly>MONTH</Monthly>
                </PriceContainer>
                <Icon name="chevronRight" height={30} width={30} />
              </>
            ) : (
              <Loader />
            )}
          </RightColumn>
        </Button>
      </AndroidContainer>
    </Container>
  )
}

export default BuyCoaching

const LeftColumn = styled.View`
  flex: 1;
`
const RightColumn = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
`

const Icon = styled(IconBold).attrs(() => ({
  fill: colors.white
}))``

const Container = styled.View`
  padding: 16px 0px;
  flex: 1;
`

const AndroidContainer = styled.View`
  elevation: 3;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  border-radius: 5px;
  background-color: ${({ theme }) => theme.accent};
`

const Button = styled.TouchableOpacity`
  border-radius: 5px;
  background-color: ${({ theme }) => theme.accent};
  padding: 20px;
  box-shadow: ${({ theme }) => theme.SHADOW};
  flex-direction: row;
`

const Text = styled(TranslatedText)`
  flex: 1;
  font-size: 18px;
  color: ${colors.white};
  font-family: ${fonts.bold};
`

const MiniText = styled(TranslatedText)`
  flex: 1;
  font-size: 11px;
  color: ${colors.white};
  font-family: ${fonts.bold};
`
const PriceContainer = styled.View`
  margin-right: 15px;
  flex-direction: column;
`

const Price = styled.Text`
  color: ${colors.white};
  font-family: ${fonts.bold};
  font-size: 20px;
`

const Monthly = styled(TranslatedText)`
  color: ${colors.white};
  font-family: ${fonts.bold};
  font-size: 11px;
`

const Loader = styled.ActivityIndicator``
