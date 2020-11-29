import { setTheme } from '@actions/user/user-actions'
import { Title } from '@components/InfoRow'
import { H2, PageTitle, SafeAreaView } from '@components/Primitives/Primitives'
import IntercomProfilePictures from '@components/SettingsSpecific/IntercomProfilePictures'
import SettingRow from '@components/SettingsSpecific/settingRow'
import VersionInformation from '@components/SettingsSpecific/versionInformation'
import TopInfo from '@components/TopInfo'
import CONFIG from '@config/Config'
import ROUTE from '@config/routes/Routes'
import keyExtractor from '@helpers/KeyExtractor'
import { RouteProp } from '@react-navigation/core'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { getIntercomNotificationCount } from '@selectors/NotificationSelectors'
import { getActiveCoaching } from '@selectors/subscription-selectors/SubscriptionSelectors'
import { getTheme } from '@selectors/UserSelectors'
import { darkTheme, lightTheme } from '@styles/themes'
import { RootStackParamList } from '@typings/navigation/navigation'
import React, { FC, memo, useMemo } from 'react'
import { Linking, SectionList } from 'react-native'
import Intercom from 'react-native-intercom'
import Rate, { AndroidMarket } from 'react-native-rate'
import { useDispatch, useSelector } from 'react-redux'
import { DefaultTheme } from 'styled-components'
import styled from 'styled-components/native'

const options = {
  AppleAppID: '1440417031',
  GooglePackageName: 'fi.nyxo.app',
  preferredAndroidMarket: AndroidMarket.Google,
  preferInApp: true,
  openAppStoreIfInAppFails: true,
  fallbackPlatformURL: 'http://www.nyxo.app/'
}
type SettingsNavigationProp = NativeStackNavigationProp<
  RootStackParamList[ROUTE.APP],
  ROUTE.SETTINGS
>

type SettingsScreenRouteProp = RouteProp<
  RootStackParamList[ROUTE.APP],
  ROUTE.SETTINGS
>

type Props = {
  navigation: SettingsNavigationProp
  route: SettingsScreenRouteProp
}

const SettingsScreen: FC<Props> = ({ navigation: { navigate } }) => {
  const dispatch = useDispatch()
  const theme = useSelector(getTheme)
  const hasActiveCoaching = useSelector(getActiveCoaching)
  const intercomCount = useSelector(getIntercomNotificationCount)

  const switchTheme = () => {
    const newTheme = theme?.mode === 'dark' ? lightTheme : darkTheme
    dispatch(setTheme(newTheme))
  }

  const rateApp = () => {
    Rate.rate(options, (success) => {})
  }

  const displayTheme = (t: DefaultTheme) =>
    t?.mode === 'dark' ? 'Light' : 'Dark'

  const settings = useMemo(
    () => [
      {
        text: 'Select Tracking Source',
        icon: 'smartWatchCircleGraph',
        action: () => navigate(ROUTE.SOURCE_SETTINGS)
      },
      {
        text: 'Coaching settings',
        icon: 'schoolPhysicalBold',
        action: () => navigate(ROUTE.COACHING_SETTINGS)
      },

      {
        text: 'Manage Nyxo Subscription',
        icon: 'receipt',
        action: () => navigate(ROUTE.CLOUD_SETTINGS)
      },
      {
        text: 'Sync to backend',
        icon: 'syncCloud',
        action: () => navigate(ROUTE.CLOUD_SETTINGS)
      },
      {
        text: 'Switch mode',
        icon: 'astronomyMoon',
        theme: displayTheme(theme),
        analyticsEvent: 'Pressed theme button',
        action: () => switchTheme()
      },
      {
        text: 'RATE_APP',
        icon: 'star',
        analyticsEvent: 'Rated app through settings',
        action: rateApp
      },
      {
        text: 'RATE_APP',
        icon: 'star',
        analyticsEvent: 'Rated app through settings',
        action: () => navigate(ROUTE.ONBOARDING)
      }
      // {
      //   text: 'CONTROL_NOTIFICATIONS',
      //   icon: 'alarmBell',
      //   action: () => navigate('NotificationSettings')
      // }
    ],
    [theme]
  )

  const socialActions = useMemo(
    () => [
      {
        text: 'Chat with us!',
        icon: 'customerSupport',
        analyticsEvent: 'Pressed Intercom SettingsRow',
        action: () => Intercom.displayMessageComposer(),
        badge: intercomCount,
        extra: <IntercomProfilePictures />
      },
      {
        text: 'Send feedback',
        icon: 'envelope',
        analyticsEvent: 'Opened Feedback Email',
        action: () => Linking.openURL('mailto:hello@nyxo.fi')
      },
      {
        text: 'Visit site',
        icon: 'browserDotCom',
        analyticsEvent: 'Opened Website',
        action: () => Linking.openURL('https://nyxo.app/')
      },
      {
        text: 'Follow us on Facebook',
        icon: 'facebook',
        analyticsEvent: 'Opened Facebook',
        action: () =>
          Linking.openURL('https://www.facebook.com/Nyxo-467927177117033/')
      },

      {
        text: 'Follow us on Twitter',
        icon: 'twitter',
        analyticsEvent: 'Opened Twitter',
        action: () => Linking.openURL('https://twitter.com/hellonyxo')
      },

      {
        text: 'Follow us on Instagram',
        icon: 'instagram',
        analyticsEvent: 'Opened Instagram',
        action: () => Linking.openURL('https://www.instagram.com/hellonyxo/')
      },
      {
        text: 'Terms of Service',
        icon: 'handshake',
        analyticsEvent: 'Navigated to Terms of Service',
        action: () => Linking.openURL(CONFIG.TERMS_LINK)
      },
      {
        text: 'Privacy Policy',
        icon: 'lockCircle',
        analyticsEvent: 'Navigated to privacy policy',
        action: () => Linking.openURL(CONFIG.PRIVACY_LINK)
      }
    ],
    [intercomCount]
  )

  const renderItem = ({ item }: { item: any }) => {
    if (!item) return null
    return (
      <SettingRow
        analyticsEvent={item.analyticsEvent}
        onPress={item.action}
        badge={item.badge}
        icon={item.icon}>
        <Title>{item.text}</Title>
        {item.extra && item.extra}
      </SettingRow>
    )
  }

  const renderSectionHeader = ({ section }: any) => {
    if (section.title === 'Settings') return null
    return <SectionHeader>{section.title}</SectionHeader>
  }

  const sections = [
    {
      title: 'Settings',
      data: settings
    },
    {
      title: 'Support',
      data: socialActions
    }
  ]

  return (
    <SafeAreaView>
      <TopInfo />

      <SectionList
        ListHeaderComponent={<PageTitle>Settings</PageTitle>}
        sections={sections}
        renderSectionHeader={renderSectionHeader}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        ListFooterComponent={<VersionInformation />}
      />
    </SafeAreaView>
  )
}

export default memo(SettingsScreen)

const SectionHeader = styled(H2)`
  padding: 30px 20px 20px;
  margin: 0px;
  background-color: ${({ theme }) => theme.PRIMARY_BACKGROUND_COLOR};
`
