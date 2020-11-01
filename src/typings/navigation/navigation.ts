import ROUTE from '@config/routes/Routes'

export type RootStackParamList = {
  readonly [ROUTE.APP]: {
    readonly [ROUTE.JOURNAL]: {
      readonly [ROUTE.TERVEYSTALO]: { connectionId: string }
      readonly [ROUTE.SLEEP]: undefined
      readonly [ROUTE.HABITS]: undefined
      readonly [ROUTE.DETAIL]: undefined
    }
    readonly [ROUTE.COACHING]: {
      readonly [ROUTE.WEEK]: undefined
      readonly [ROUTE.LESSON]: undefined
    }
    readonly [ROUTE.PROFILE]: undefined
  }
}

export type JournalStackParamList = {
  readonly Terveystalo: { connectionId: string }
  readonly [ROUTE.SLEEP]: undefined
  readonly [ROUTE.HABITS]: undefined
  readonly [ROUTE.DETAIL]: undefined
}
