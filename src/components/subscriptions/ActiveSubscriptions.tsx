import { IconBold } from '@components/iconRegular'
import { H3 } from '@components/Primitives/Primitives'
import TranslatedText from '@components/TranslatedText'
import CONFIG from '@config/config'
import colors from '@styles/colors'
import React, { FC, useEffect, useState } from 'react'
import { Linking, Platform } from 'react-native'
import Purchases, { PurchasesEntitlementInfos } from 'react-native-purchases'
import styled from 'styled-components/native'
import SubscriptionCard from './SubscriptionCard'

export const ActiveSubscriptions: FC = () => {
  const [info, setEntitlements] = useState<
    PurchasesEntitlementInfos | undefined
  >()

  useEffect(() => {
    const fetchData = async () => {
      const { entitlements } = await Purchases.getPurchaserInfo()
      setEntitlements(entitlements)
    }
    fetchData()
  }, [])

  const handleOpenManagement = () => {
    const URL =
      Platform.OS === 'ios' ? CONFIG.MANAGE_IOS : CONFIG.MANAGE_ANDROID
    Linking.openURL(URL)
  }

  const hasActiveSubscription = info?.active['Nyxo Coaching']?.isActive

  return (
    <Container>
      {!!hasActiveSubscription && (
        <>
          <H3>SUBSCRIPTION_MANAGEMENT.CURRENTLY_ACTIVE</H3>
          {!!hasActiveSubscription && (
            <SubscriptionCard subscription={info?.active['Nyxo Coaching']} />
          )}

          <ModifyContainer>
            <ModifyButton onPress={handleOpenManagement}>
              <ModifyIcon height={15} width={15} />
              <ButtonText>JUMP_MANAGE_SUBSCRIPTION</ButtonText>
            </ModifyButton>
          </ModifyContainer>
        </>
      )}
    </Container>
  )
}

const Container = styled.View`
  margin: 30px 0px;
`

const ModifyButton = styled.TouchableOpacity`
  padding: 8px 16px;
  border-width: 2px;
  border-color: ${colors.darkBlue};
  border-radius: 20px;
  flex-direction: row;
  align-items: center;
`

const ModifyContainer = styled.View`
  flex-direction: row;
  justify-content: flex-end;
`

const ButtonText = styled(TranslatedText)`
  font-family: ${({ theme }) => theme.FONT_BOLD};
  color: ${colors.darkBlue};
  font-size: 15px;
`

const ModifyIcon = styled(IconBold).attrs(() => ({
  fill: colors.darkBlue,
  name: 'wrench'
}))`
  margin-right: 5px;
`
