import React from 'react'
import styled from 'styled-components/native'
import { IconBold } from '@components/iconRegular'
import colors from 'styles/colors'
import { PurchasesEntitlementInfo } from 'react-native-purchases'
import moment from 'moment'
import translate from 'config/i18n'

type Props = {
  subscription?: PurchasesEntitlementInfo
}

const SubscriptionCard = ({ subscription }: Props) => {
  if (!subscription) return null

  const {
    isSandbox,
    originalPurchaseDate,
    identifier,
    expirationDate,
    store
  } = subscription

  return (
    <Container>
      <TitleRow>
        <Title>{identifier}</Title>
        <Type>{store}</Type>
      </TitleRow>
      <Text>
        {translate('SUBSCRIPTION_MANAGEMENT.STARTED')}
        <BoldText>
          {moment(originalPurchaseDate).format('DD.MM.YYYY')}
        </BoldText>{' '}
      </Text>

      <Text>
        {translate('SUBSCRIPTION_MANAGEMENT.THANK_YOU')}
        <BoldText>{moment(expirationDate).format('DD.MM.YYYY')}</BoldText>
      </Text>
      {!isSandbox && (
        <IsSandboxContainer>
          <SandboxIcon width={20} height={20} />
          <IsSandbox>{translate('SUBSCRIPTION_MANAGEMENT.SANDBOX')}</IsSandbox>
        </IsSandboxContainer>
      )}
    </Container>
  )
}

export default SubscriptionCard

const Container = styled.View`
  margin: 20px 0px;
  padding: 10px;
  border-color: ${colors.radiantBlueTransparent};
  border-width: 3px;
  border-radius: 10px;
  box-shadow: ${({ theme }) => theme.SHADOW};
  background-color: ${({ theme }) => theme.PRIMARY_BACKGROUND_COLOR};
`

const Text = styled.Text`
  margin-bottom: 10px;
  font-size: 15px;
  line-height: 25px;
  font-family: ${({ theme }) => theme.FONT_MEDIUM};
  color: ${({ theme }) => theme.SECONDARY_TEXT_COLOR};
`

const IsSandboxContainer = styled.View`
  margin: 25px 0px 0px;
  background-color: ${({ theme }) => theme.SECONDARY_BACKGROUND_COLOR};
  border-color: ${({ theme }) => theme.SECONDARY_TEXT_COLOR};
  border-width: 1px;
  padding: 10px 20px;
  border-radius: 10px;
  flex-direction: row;
  align-items: center;
`
const IsSandbox = styled.Text`
  margin-left: 10px;
  font-size: 15px;
  font-family: ${({ theme }) => theme.FONT_MEDIUM};
  color: ${({ theme }) => theme.SECONDARY_TEXT_COLOR};
`

const SandboxIcon = styled(IconBold).attrs(({ theme }) => ({
  name: 'shovel',
  fill: theme.SECONDARY_TEXT_COLOR
}))`
  height: 20px;
`

const TitleRow = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin: 10px 0px 20px;
`

const Title = styled.Text`
  font-family: ${({ theme }) => theme.FONT_BOLD};
  font-size: 19px;
  color: ${colors.radiantBlue};
  text-transform: uppercase;
`

const Type = styled.Text`
  font-size: 10px;
  font-family: ${({ theme }) => theme.FONT_BOLD};
  color: ${colors.radiantBlue};
`

const BoldText = styled.Text`
  margin-bottom: 10px;
  font-size: 15px;
  line-height: 25px;
  font-family: ${({ theme }) => theme.FONT_BOLD};
  color: ${({ theme }) => theme.PRIMARY_TEXT_COLOR};
`
