import ROUTE from '@config/routes/Routes'

export type RootStackParamList = {
  [ROUTE.APP]: {
    [ROUTE.JOURNAL]: {
      [ROUTE.TERVEYSTALO]: { connectionId: string }
      [ROUTE.SLEEP]: undefined
      [ROUTE.HABITS]: undefined
      [ROUTE.DETAIL]: undefined
    }
    [ROUTE.COACHING]: {
      [ROUTE.WEEK]: undefined
      [ROUTE.LESSON]: undefined
    }
    [ROUTE.PROFILE]: undefined
  }
}

export type JournalStackParamList = {
  Terveystalo: { connectionId: string }
  [ROUTE.SLEEP]: undefined
  [ROUTE.HABITS]: undefined
  [ROUTE.DETAIL]: undefined
}
