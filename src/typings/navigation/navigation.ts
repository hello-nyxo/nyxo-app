import ROUTE from '@config/routes/Routes'

export type RootStackParamList = {
  [ROUTE.APP]: TabParamList
  [ROUTE.AUTH]: {
    [ROUTE.LOGIN]: undefined
    [ROUTE.REGISTER]: undefined
  }
  [ROUTE.WEEK]: { slug: string; id: string }
  [ROUTE.LESSON]: { slug: string; id: string }
  [ROUTE.TERVEYSTALO]: { code: string }
  [ROUTE.ONBOARDING]: undefined
  [ROUTE.PURCHASE]: undefined
}

export type TabParamList = {
  [ROUTE.JOURNAL]: JournalStackParamList
  [ROUTE.COACHING]: undefined
  [ROUTE.HABITS]: undefined
  [ROUTE.PROFILE]: undefined
  [ROUTE.SETTINGS]: SettingsStackParamList
}

export type JournalStackParamList = {
  [ROUTE.SLEEP]: undefined
  [ROUTE.DETAIL]: undefined
}

export type SettingsStackParamList = {
  [ROUTE.SETTINGS]: undefined
  [ROUTE.CLOUD_SETTINGS]: { code?: string | undefined | null }
  [ROUTE.COACHING_SETTINGS]: undefined
  [ROUTE.SUBSCRIPTION_SETTINGS]: undefined
  [ROUTE.SOURCE_SETTINGS]: undefined
  [ROUTE.THEME]: undefined
  [ROUTE.GARMIN]: { oauth_token: string; oauth_verifier: string }
}
