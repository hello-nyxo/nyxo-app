import ScalingButton from '@components/Buttons/ScalingButton'
import { fonts } from '@styles/themes'
import React, { FC } from 'react'
import { PurchasesPackage } from 'react-native-purchases'
import styled from 'styled-components/native'
import TranslatedText from '../TranslatedText'

type Props = {
  subscription: PurchasesPackage
  selected: boolean
  select: (subscription: PurchasesPackage) => void
}

const SubscriptionItem: FC<Props> = ({ subscription, selected, select }) => {
  console.log(subscription)

  const {
    packageType,
    product: { price_string: priceString }
  } = subscription

  const selectPurchase = () => {
    select(subscription)
  }

  return (
    <ScalingButton
      analyticsEvent={`SELECTED: ${packageType}`}
      onPress={selectPurchase}>
      <SubscriptionOption>
        <Type>{`IAP.${packageType}_LONG`}</Type>

        <PriceRow>
          <Selected>{selected && <Dot />}</Selected>
          <Price>{priceString}</Price>
          <Period>{`IAP.${packageType}`}</Period>
        </PriceRow>
        <Point>{`IAP.${packageType}_TEXT_1`}</Point>
        <Point>{`IAP.${packageType}_TEXT_2`}</Point>
      </SubscriptionOption>
    </ScalingButton>
  )
}

export default SubscriptionItem

const Type = styled(TranslatedText)`
  margin: 8px 0px;
  font-size: 13px;
  font-family: ${({ theme }) => theme.bold};
  color: ${({ theme }) => theme.textPrimary};
`

const SubscriptionOption = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.bgSecondary};
  border-radius: 8px;
  margin: 8px 8px;
  min-height: 100px;
  elevation: 3;
  padding: 8px;
  box-shadow: ${({ theme }) => theme.shadowPrimary};
`

const PriceRow = styled.View`
  flex-direction: row;
  align-items: center;
`

const Point = styled(TranslatedText)`
  font-size: 12px;
  margin-top: 5px;
  color: ${({ theme }) => theme.textSecondary};
  font-family: ${({ theme }) => theme.bold};
`

const Price = styled.Text`
  font-size: 17px;
  font-family: ${({ theme }) => theme.bold};
  color: ${({ theme }) => theme.accent};
`
const Period = styled(TranslatedText)`
  font-size: 10px;
  margin-left: 4px;
  color: ${({ theme }) => theme.textSecondary};
  font-family: ${({ theme }) => theme.medium};
`

const Selected = styled.View`
  height: 20px;
  width: 20px;
  background-color: ${({ theme }) => theme.hairline};
  border-radius: 20px;
  justify-content: center;
  margin-right: 8px;
  align-items: center;
`
const Dot = styled.View`
  height: 12px;
  width: 12px;
  background-color: ${({ theme }) => theme.accent};
  border-radius: 20px;
`
