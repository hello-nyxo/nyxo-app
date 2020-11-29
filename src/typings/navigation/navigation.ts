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
  [ROUTE.SETTINGS]: {
    [ROUTE.CLOUD_SETTINGS]: { code: string }
    [ROUTE.COACHING_SETTINGS]: undefined
    [ROUTE.SOURCE_SETTINGS]: undefined
  }
}

export type JournalStackParamList = {
  [ROUTE.SLEEP]: undefined
  [ROUTE.DETAIL]: undefined
}

export type SettingsStackParamList = {
  [ROUTE.CLOUD_SETTINGS]: { connectionId: string }
}
