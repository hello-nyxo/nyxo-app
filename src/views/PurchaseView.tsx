import GoBack from '@components/Buttons/GoBack'
import { PrimaryButton } from '@components/Buttons/PrimaryButton'
import PerkList from '@components/IAPComponents/PerkList'
import SubscriptionItem from '@components/IAPComponents/SubscriptionItem'
import { ThemedRefreshControl } from '@components/Primitives/Primitives'
import TranslatedText from '@components/TranslatedText'
import { HEIGHT, SMART_TOP_PADDING } from '@helpers/Dimensions'
import { useAppDispatch } from '@hooks/redux'
import { purchaseSubscription, restorePurchase } from '@reducers/subscription'
import { fonts } from '@styles/themes'
import React, { FC, memo, useCallback, useEffect, useState } from 'react'
import { Linking, Platform } from 'react-native'
import Purchases, { PurchasesPackage } from 'react-native-purchases'
import styled from 'styled-components/native'
import CONFIG from '../config/config'
import colors from '../styles/colors'

type Props = {
  isScreen: boolean
}

const PurchaseView: FC<Props> = ({ isScreen }) => {
  const [availableSubscriptions, setSubscriptions] = useState<
    PurchasesPackage[] | undefined
  >([])
  const [error, setError] = useState(false)
  const [selected, select] = useState<PurchasesPackage | undefined>(undefined)
  const dispatch = useAppDispatch()
  const isIOS = Platform.OS === 'ios'

  const getSubscription = useCallback(async () => {
    try {
      const offerings = await Purchases.getOfferings()
      if (offerings.current?.availablePackages.length !== 0) {
        setSubscriptions(offerings.current?.availablePackages)
      }
      if (availableSubscriptions) {
        select(availableSubscriptions[0])
      }
      setError(false)
    } catch (err) {
      setError(true)
    }
  }, [availableSubscriptions])

  useEffect(() => {
    getSubscription()
  }, [getSubscription])

  const openTerms = () => {
    Linking.openURL(CONFIG.TERMS_LINK)
  }

  const openPrivacyPolicy = () => {
    Linking.openURL(CONFIG.PRIVACY_LINK)
  }

  const handleRecovery = async () => {
    await dispatch(restorePurchase())
  }

  const purchase = async () => {
    dispatch(purchaseSubscription(selected))
  }

  const mapped = availableSubscriptions?.map(
    (subscription: PurchasesPackage) => (
      <SubscriptionItem
        select={select}
        selected={selected?.identifier === subscription?.identifier}
        key={subscription.identifier}
        subscription={subscription}
      />
    )
  )

  return (
    <BG>
      <Scrollable
        refreshControl={
          <ThemedRefreshControl
            refreshing={false}
            onRefresh={getSubscription}
          />
        }>
        <Header isScreen={isScreen}>
          {!!isScreen && (
            <ButtonRow>
              <GoBack />
            </ButtonRow>
          )}

          <Title>BUY_COACHING</Title>
          <Subtitle>BUY_COACHING_SUBTITLE</Subtitle>
          <PerkList />
        </Header>

        {mapped?.length !== 0 ? (
          <>
            <Subscriptions>{mapped}</Subscriptions>
            <TermsButton onPress={handleRecovery}>RESTORE_PURCHASE</TermsButton>

            {isIOS && <Renew>APPLE_DISCLAIMER</Renew>}

            <Terms>
              <TermsButton onPress={openTerms}>Terms of Service</TermsButton>
              <TermsButton onPress={openPrivacyPolicy}>
                Privacy Policy
              </TermsButton>
            </Terms>
          </>
        ) : (
          <>
            <ActivityIndicator size="large" />
            <Fetching>FETCHING_SUBS</Fetching>
          </>
        )}
      </Scrollable>
      <FixedContainer>
        {!!selected && (
          <PrimaryButton
            onPress={purchase}
            title={`IAP.PURCHASE_${selected.packageType}`}
          />
        )}
      </FixedContainer>
    </BG>
  )
}

export default memo(PurchaseView)

const BG = styled.View`
  background-color: ${({ theme }) => theme.PRIMARY_BACKGROUND_COLOR};
`

const Scrollable = styled.ScrollView`
  background-color: ${({ theme }) => theme.PRIMARY_BACKGROUND_COLOR};
`

const Subscriptions = styled.View`
  margin-top: 20px;
  padding: 20px 10px;
  justify-content: space-between;
`

type ViewProps = {
  isScreen: boolean
}

const FixedContainer = styled.View`
  position: absolute;
  z-index: 10;
  bottom: 0;
  width: 100%;
  margin-bottom: 30px;
`

const Header = styled.View<ViewProps>`
  background-color: ${({ theme }) =>
    theme.mode === 'light' ? colors.evening : colors.eveningAccent};
  min-height: ${({ isScreen }) => (isScreen ? HEIGHT / 3 : HEIGHT / 2)}px;
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
  color: ${({ theme }) => theme.PRIMARY_TEXT_COLOR};
  text-align: center;
`

const Subtitle = styled(TranslatedText)`
  font-size: 15px;
  font-family: ${fonts.medium};
  text-align: center;
  margin: 20px 50px;
  color: ${({ theme }) => theme.SECONDARY_TEXT_COLOR};
`

const Renew = styled(TranslatedText)`
  text-align: justify;
  font-size: 12px;
  font-family: ${fonts.medium};
  color: ${({ theme }) => theme.PRIMARY_TEXT_COLOR};
  margin: 30px 20px;
`

const TermsButton = styled(TranslatedText)`
  font-size: 13px;
  margin: 8px 0px;
  font-family: ${fonts.bold};
  color: ${({ theme }) => theme.accent};
  text-align: center;
`

const Fetching = styled(TranslatedText)`
  text-align: center;
  font-family: ${fonts.medium};
  margin: 20px;
  font-size: 15px;
  color: ${({ theme }) => theme.SECONDARY_TEXT_COLOR};
`

const Terms = styled.View`
  padding-bottom: 135px;
`

const ActivityIndicator = styled.ActivityIndicator.attrs(({ theme }) => ({
  tintColor: theme.accent
}))``
