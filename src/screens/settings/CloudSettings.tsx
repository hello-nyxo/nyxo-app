import { logout } from '@actions/auth/auth-actions'
import { getConnectionId } from '@actions/linking/linking-actions'
import GoBack, { GoBackContainer, Spacer } from '@components/Buttons/GoBack'
import { PrimaryButton } from '@components/Buttons/PrimaryButton'
import {
  Container,
  H2,
  P,
  SafeAreaView
} from '@components/Primitives/Primitives'
import CodeDisclaimer from '@components/SettingsSpecific/CodeDisclaimer'
import LinkModule from '@components/SettingsSpecific/LinkModule'
import {
  getAuthState,
  getLoading
} from '@selectors/auth-selectors/auth-selectors'
import { getLoading as getCodeLoading } from '@selectors/linking-selectors'
import React, { memo } from 'react'
import { RefreshControl, ScrollView } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import ROUTE from '../../config/routes/Routes'
import colors from '../../styles/colors'

const CloudView = ({ navigation, route }) => {
  const isLoggedIn = useSelector(getAuthState)
  const linkingLoading = useSelector(getCodeLoading)
  const logoutLoading = useSelector(getLoading)
  const dispatch = useDispatch()

  const linkCode = route?.params?.link

  const handleSignOut = () => {
    dispatch(logout())
  }

  const handleNavToSignIn = () => {
    navigation.navigate('Auth', { screen: ROUTE.LOGIN })
  }

  const handleNavToRegister = () => {
    navigation.navigate('Auth', { screen: ROUTE.REGISTER })
  }

  const refresh = async () => {
    await dispatch(getConnectionId())
  }

  return (
    <SafeAreaView>
      <ScrollView
        refreshControl={
          <RefreshControl
            tintColor={colors.darkBlue}
            onRefresh={refresh}
            refreshing={linkingLoading}
          />
        }
        scrollEventThrottle={16}>
        <GoBackContainer>
          <GoBack route="Settings" />
          <Spacer />
        </GoBackContainer>

        <Container>
          <H2>NYXO_CLOUD.TITLE</H2>

          {isLoggedIn && (
            <>
              <P>SCCloudInfo</P>
              <LinkModule linkCode={linkCode} />
              <PrimaryButton
                white
                title="Signout"
                onPress={handleSignOut}
                loading={logoutLoading}
              />
            </>
          )}
          {!isLoggedIn && (
            <>
              <P>SCcloudRequirements</P>

              <PrimaryButton title="Sign in" onPress={handleNavToSignIn} />
              <Spacer />
              <PrimaryButton title="Register" onPress={handleNavToRegister} />
            </>
          )}
        </Container>
      </ScrollView>
      <CodeDisclaimer linkCode={linkCode} />
    </SafeAreaView>
  )
}

export default memo(CloudView)
