import GoBack, { GoBackContainer, Spacer } from '@components/Buttons/GoBack'
import { PrimaryButton } from '@components/Buttons/PrimaryButton'
import SignupBottomButton from '@components/Signup/SignupBottomButton'
import {
  Container,
  H2,
  P,
  SafeAreaView
} from '@components/Primitives/Primitives'
import CodeDisclaimer from '@components/SettingsSpecific/CodeDisclaimer'
import LinkModule from '@components/SettingsSpecific/LinkModule'
import React, { FC } from 'react'
import { RefreshControl, ScrollView } from 'react-native'
import colors from '@styles/colors'
import { RootStackParamList } from '@typings/navigation/navigation'
import { StackNavigationProp } from '@react-navigation/stack'
import { RouteProp } from '@react-navigation/core'
import { useAppDispatch, useAppSelector } from '@hooks/redux'
import { logout } from '@reducers/auth'

type CloudSettingsScreenProp = StackNavigationProp<
  RootStackParamList['App']['Settings'],
  'Cloud'
>

type CloudSettingsScreenRouteProp = RouteProp<
  RootStackParamList['App']['Settings'],
  'Cloud'
>

type Props = {
  navigation: CloudSettingsScreenProp
  route: CloudSettingsScreenRouteProp
}

const CloudSettings: FC<Props> = ({ route }) => {
  const dispatch = useAppDispatch()
  const { authenticated, loading } = useAppSelector(({ auth }) => auth)
  const linkingLoading = useAppSelector(({ linking }) => linking.loading)

  const linkCode = route?.params?.code

  const handleSignOut = () => {
    dispatch(logout())
  }

  const refresh = async () => {
    //FIXME
  }

  return (
    <SafeAreaView>
      <ScrollView
        refreshControl={
          <RefreshControl
            tintColor={colors.darkBlue}
            onRefresh={refresh}
            refreshing={linkingLoading === 'pending'}
          />
        }
        scrollEventThrottle={16}>
        <GoBackContainer>
          <GoBack route="Settings" />
          <Spacer />
        </GoBackContainer>

        <Container>
          <H2>NYXO_CLOUD.TITLE</H2>

          {!!authenticated && (
            <>
              <P>SCCloudInfo</P>
              <LinkModule linkCode={linkCode} />
              <PrimaryButton
                white
                title="Signout"
                onPress={handleSignOut}
                loading={loading === 'pending'}
              />
            </>
          )}
          {!authenticated && <SignupBottomButton />}
        </Container>
      </ScrollView>
      <CodeDisclaimer linkCode={linkCode} />
    </SafeAreaView>
  )
}

export default CloudSettings
