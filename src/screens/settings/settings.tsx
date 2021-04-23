import { Title } from '@components/InfoRow'
import { H2, PageTitle, SafeAreaView } from '@components/Primitives/Primitives'
import SettingRow from '@components/SettingsSpecific/settingRow'
import VersionInformation from '@components/SettingsSpecific/versionInformation'
import CONFIG from '@config/config'
import keyExtractor from '@helpers/KeyExtractor'
import { useAppSelector } from '@hooks/redux'
import { CompositeNavigationProp, RouteProp } from '@react-navigation/core'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParamList } from '@typings/navigation/navigation'
import React, { FC, memo } from 'react'
import {
  Linking,
  ListRenderItem,
  SectionList,
  SectionListData
} from 'react-native'
import Rate, { AndroidMarket } from 'react-native-rate'
import styled from 'styled-components/native'

const options = {
  AppleAppID: '1440417031',
  GooglePackageName: 'fi.nyxo.app',
  preferredAndroidMarket: AndroidMarket.Google,
  preferInApp: true,
  openAppStoreIfInAppFails: true,
  fallbackPlatformURL: 'http://www.nyxo.app/'
}
type SettingsNavigationProp = CompositeNavigationProp<
  StackNavigationProp<RootStackParamList['App']['Settings'], 'SettingsScreen'>,
  StackNavigationProp<RootStackParamList>
>

type SettingsScreenRouteProp = RouteProp<
  RootStackParamList['App']['Settings'],
  'SettingsScreen'
>

type Props = {
  navigation: SettingsNavigationProp
  route: SettingsScreenRouteProp
}

type SettingItem = {
  text?: string
  badge?: number
  icon?: string
  action?: () => void
  extra?: JSX.Element
}

const SettingsScreen: FC<Props> = ({ navigation }) => {
  const theme = useAppSelector((state) => state.theme.theme)

  const rateApp = () => {
    // FIXME
    Rate.rate(options, () => undefined)
  }

  const displayTheme = (t: string) => (t === 'dark' ? 'Light' : 'Dark')

  const settings = [
    {
      text: 'Select Tracking Source',
      icon: 'smartWatchCircleGraph',
      action: () => navigation.navigate('Sources')
    },
    {
      text: 'Coaching settings',
      icon: 'schoolPhysicalBold',
      action: () => navigation.navigate('Coaching')
    },

    {
      text: 'Manage Nyxo Subscription',
      icon: 'receipt',
      action: () => navigation.navigate('Subscription')
    },
    {
      text: 'Sync to backend',
      icon: 'syncCloud',
      action: () => navigation.navigate('Cloud', { code: '' })
    },
    {
      text: 'Switch mode',
      icon: 'astronomyMoon',
      theme: displayTheme(theme),
      action: () => navigation.push('Theme')
    },
    {
      text: 'RATE_APP',
      icon: 'star',
      action: rateApp
    },
    {
      text: 'ONBOARDING.TITLE',
      icon: 'compass',
      action: () => navigation.push('Onboarding')
    }
  ]

  const socialActions = [
    {
      text: 'Send feedback',
      icon: 'envelope',
      action: () => Linking.openURL('mailto:hello@nyxo.fi')
    },
    {
      text: 'Visit site',
      icon: 'browserDotCom',
      action: () => Linking.openURL('https://nyxo.app/')
    },
    {
      text: 'Follow us on Facebook',
      icon: 'facebook',
      action: () =>
        Linking.openURL('https://www.facebook.com/Nyxo-467927177117033/')
    },

    {
      text: 'Follow us on Twitter',
      icon: 'twitter',
      action: () => Linking.openURL('https://twitter.com/hellonyxo')
    },

    {
      text: 'Follow us on Instagram',
      icon: 'instagram',
      action: () => Linking.openURL('https://www.instagram.com/hellonyxo/')
    },
    {
      text: 'Terms of Service',
      icon: 'handshake',
      action: () => Linking.openURL(CONFIG.TERMS_LINK)
    },
    {
      text: 'Privacy Policy',
      icon: 'lockCircle',
      action: () => Linking.openURL(CONFIG.PRIVACY_LINK)
    }
  ]

  const renderItem: ListRenderItem<SettingItem> = ({ item }) => {
    if (!item) return null
    return (
      <SettingRow onPress={item.action} badge={item.badge} icon={item.icon}>
        <Title>{`${item.text}`}</Title>
      </SettingRow>
    )
  }

  const renderSectionHeader = ({
    section
  }: {
    section: SectionListData<SettingItem, { title: string }>
  }) => {
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
