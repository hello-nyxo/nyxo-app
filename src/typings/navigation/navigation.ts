import ROUTE from '@config/routes/Routes'

export type RootStackParamList = {
  [ROUTE.APP]: TabParamList
  [ROUTE.AUTH]: {
    [ROUTE.LOGIN]: undefined
    [ROUTE.REGISTER]: undefined
  }
  [ROUTE.WEEK]: undefined
  [ROUTE.LESSON]: undefined
  [ROUTE.TERVEYSTALO]: { code: string }
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
}
