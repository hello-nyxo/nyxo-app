import React, { memo, useEffect, useState } from 'react'
import { ActivityIndicator, Linking, Platform } from 'react-native'
import Purchases, { PurchasesPackage } from 'react-native-purchases'
import { useDispatch } from 'react-redux'
import styled from 'styled-components/native'
import { restorePurchase } from '@actions/subscription/subscription-actions'
import GoBack from '@components/Buttons/GoBack'
import PerkList from '@components/IAPComponents/PerkList'
import SubscriptionItem from '@components/IAPComponents/SubscriptionItem'
import TranslatedText from '@components/TranslatedText'
import CONFIG from '../../config/Config'
import { HEIGHT, SMART_TOP_PADDING } from '@helpers/Dimensions'
import colors from '../../styles/colors'
import { fonts, StyleProps } from '../../styles/themes'

const PurchaseView = () => {
  const [availableSubscriptions, setSubscriptions]: any = useState([])
  const dispatch = useDispatch()
  const isIOS = Platform.OS === 'ios'

  const getSubscription = async () => {
    try {
      const offerings = await Purchases.getOfferings()
      if (offerings.current?.availablePackages.length !== 0) {
        setSubscriptions(offerings.current?.availablePackages)
      }
    } catch (error) {}
  }

  useEffect(() => {
    getSubscription()
  }, [])

  const openTerms = () => {
    Linking.openURL(CONFIG.TERMS_LINK)
  }

  const openPrivacyPolicy = () => {
    Linking.openURL(CONFIG.PRIVACY_LINK)
  }

  const handleRecovery = async () => {
    await dispatch(restorePurchase())
  }

  const mapped = availableSubscriptions.map(
    (subscription: PurchasesPackage, index: number) => (
      <SubscriptionItem key={index} subscription={subscription} />
    )
  )

  return (
    <BG>
      <Scrollable>
        <Header>
          <ButtonRow>
            <GoBack />
          </ButtonRow>

          <Title>BUY_COACHING</Title>
          <Subtitle>BUY_COACHING_SUBTITLE</Subtitle>

          <PerkList />
        </Header>

        {mapped.length !== 0 ? (
          <>
            <Subscriptions>{mapped}</Subscriptions>
            {isIOS && <Renew>APPLE_DISCLAIMER</Renew>}

            <TermsButton onPress={openTerms}>Terms of Service</TermsButton>
            <TermsButton onPress={openPrivacyPolicy}>
              Privacy Policy
            </TermsButton>
            <TermsButton onPress={handleRecovery}>RESTORE_PURCHASE</TermsButton>
          </>
        ) : (
          <>
            <ActivityIndicator size="large" color={colors.radiantBlue} />
            <Fetching>FETCHING_SUBS</Fetching>
          </>
        )}
      </Scrollable>
    </BG>
  )
}

export default memo(PurchaseView)

const BG = styled.View`
  background-color: ${(props: StyleProps) =>
    props.theme.PRIMARY_BACKGROUND_COLOR};
`

const Scrollable = styled.ScrollView`
  background-color: ${(props: StyleProps) =>
    props.theme.PRIMARY_BACKGROUND_COLOR};
`

const Subscriptions = styled.View`
  margin-top: 20px;
  padding: 20px 10px;
  justify-content: space-between;
`

const Header = styled.View`
  background-color: ${(props: StyleProps) =>
    props.theme.mode === 'light' ? colors.evening : colors.eveningAccent};
  min-height: ${HEIGHT / 2}px;
  border-bottom-left-radius: 45px;
  border-bottom-right-radius: 45px;
  align-items: center;
`
const ButtonRow = styled.View`
  width: 100%;
  margin-top: ${SMART_TOP_PADDING}px;
  padding: 30px 20px;
`

const Title = styled(TranslatedText)`
  font-size: 25px;
  margin-top: 20px;
  font-family: ${fonts.bold};
  color: ${(props: StyleProps) => props.theme.PRIMARY_TEXT_COLOR};
  text-align: center;
`

const Subtitle = styled(TranslatedText)`
  font-size: 15px;
  font-family: ${fonts.medium};
  text-align: center;
  margin: 20px 50px;
  color: ${(props: StyleProps) => props.theme.SECONDARY_TEXT_COLOR};
`

const Renew = styled(TranslatedText)`
  text-align: justify;
  font-size: 12px;
  font-family: ${fonts.medium};
  color: ${(props: StyleProps) => props.theme.PRIMARY_TEXT_COLOR};
  margin: 30px 20px;
`

const TermsButton = styled(TranslatedText)`
  font-size: 13px;
  font-family: ${fonts.medium};
  color: ${colors.radiantBlue};
  text-align: center;
  margin-bottom: 30px;
`

const Fetching = styled(TranslatedText)`
  text-align: center;
  font-family: ${fonts.medium};
  margin: 20px;
  font-size: 15px;
  color: ${(props: StyleProps) => props.theme.SECONDARY_TEXT_COLOR};
`
