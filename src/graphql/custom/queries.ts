/* Custom graphql queries that are not overwritten by amplify push
 * These queries illustrates how data  anonymisation would work
 */

export const listSleepDatasAnonymised = `query listSleepDatasAnonymised(
  $filter: ModelSleepDataFilterInput
  $limit: Int
  $nextToken: String
) {
  listSleepDatas(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      date
      rating
      night {
        value
        sourceName
        sourceId
        startDate
        endDate
      }
    }
    nextToken
  }
}
`

export const getSleepDataAnonymised = `query getSleepDataAnonymised($id: ID!) {
  getSleepData(id: $id) {
    id
    date
    rating
    night {
      value
      sourceName
      sourceId
      startDate
      endDate
    }
  }
}
`

export const getUserAnonymised = `query getUserAnonymised($id: ID!) {
  getUser(id: $id) {
    id
    nickname
  }
}
`

export const listUsersAnonymised = `query listUsersAnonymised(
  $filter: ModelUserFilterInput
  $limit: Int
  $nextToken: String
) {
  listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      nickname
    }
    nextToken
  }
}
`

export const getSleepData = `query GetSleepDataSimple(
  $filter: ModelSleepDataFilterInput
  $limit: Int
  $nextToken: String
) {
  listSleepDatas(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      date
      rating
      night {
        value
        sourceName
        sourceId
        startDate
        endDate
      }
    }
    nextToken
  }
}
`

export const coachingDataQuery = `query QueryCoachingData(
  $filter: ModelCoachingDataFilterInput
  $limit: Int
  $nextToken: String
) {
  listCoachingDatas(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      lessons
      userId
      stage
      activeWeek
      started
      ended
      owner
    }
    nextToken
  }
}
`

export const listHabits = /* GraphQL */ `
  query listHabitsWithDays(
    $filter: ModelHabitFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listHabits(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        userId
        dayStreak
        longestDayStreak
        latestCompletedDate
        title
        days {
          key
          value
        }
        description
        date
        archived
        period
        owner
      }
      nextToken
    }
  }
`

export const getActiveCoaching = /* GraphQL */ `
  query GetActiveCoaching($id: ID!) {
    getUser(id: $id) {
      activeCoaching {
        id
        userId
        stage
        activeWeek
        started
        ended
        lessons
        createdAt
        updatedAt
        owner
        weeks {
          slug
          started
          ended
        }
      }
    }
  }
`
