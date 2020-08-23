// tslint:disable
// this is an auto generated file. This will be overwritten

export const getSleepData = /* GraphQL */ `
  query GetSleepData($id: ID!) {
    getSleepData(id: $id) {
      id
      userId
      user {
        connectionId
        id
        email
        nickname
        darkMode
        intercomId
      }
      date
      rating
      night {
        value
        sourceName
        sourceId
        startDate
        endDate
      }
      owner
    }
  }
`
export const listSleepDatas = /* GraphQL */ `
  query ListSleepDatas(
    $filter: ModelSleepDataFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSleepDatas(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        userId
        date
        rating
        owner
      }
      nextToken
    }
  }
`
export const getRequest = /* GraphQL */ `
  query GetRequest($id: ID!) {
    getRequest(id: $id) {
      id
      requesterName
      requesterId
      userName
      userId
      accepted
    }
  }
`
export const listRequests = /* GraphQL */ `
  query ListRequests(
    $filter: ModelRequestFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listRequests(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        requesterName
        requesterId
        userName
        userId
        accepted
      }
      nextToken
    }
  }
`
export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      connectionId
      id
      email
      nickname
      darkMode
      intercomId
    }
  }
`
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        connectionId
        id
        email
        nickname
        darkMode
        intercomId
      }
      nextToken
    }
  }
`
export const getCoachingData = /* GraphQL */ `
  query GetCoachingData($id: ID!) {
    getCoachingData(id: $id) {
      id
      weeks {
        started
        ended
        locked
        slug
      }
      lessons
      userId
      stage
      user {
        connectionId
        id
        email
        nickname
        darkMode
        intercomId
      }
      activeWeek
      started
      ended
      owner
    }
  }
`
export const listCoachingDatas = /* GraphQL */ `
  query ListCoachingDatas(
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
export const getHabit = /* GraphQL */ `
  query GetHabit($id: ID!) {
    getHabit(id: $id) {
      id
      userId
      user {
        connectionId
        id
        email
        nickname
        darkMode
        intercomId
      }
      dayStreak
      longestDayStreak
      latestCompletedDate
      title
      description
      date
      days {
        key
        value
      }
      archived
      period
      owner
    }
  }
`
export const listHabits = /* GraphQL */ `
  query ListHabits(
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
export const getNight = /* GraphQL */ `
  query GetNight($id: ID!) {
    getNight(id: $id) {
      id
      userId
      user {
        connectionId
        id
        email
        nickname
        darkMode
        intercomId
      }
      sourceId
      sourceName
      source
      value
      startDate
      endDate
      totalDuration
      owner
    }
  }
`
export const listNights = /* GraphQL */ `
  query ListNights(
    $filter: ModelNightFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listNights(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        userId
        sourceId
        sourceName
        source
        value
        startDate
        endDate
        totalDuration
        owner
      }
      nextToken
    }
  }
`
export const getLikedContent = /* GraphQL */ `
  query GetLikedContent($id: ID!) {
    getLikedContent(id: $id) {
      id
      name
      type
      slug
      cover
      excerpt
      owner
    }
  }
`
export const listLikedContents = /* GraphQL */ `
  query ListLikedContents(
    $filter: ModelLikedContentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listLikedContents(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        type
        slug
        cover
        excerpt
        owner
      }
      nextToken
    }
  }
`
export const userByConnectionId = /* GraphQL */ `
  query UserByConnectionId(
    $connectionId: String
    $sortDirection: ModelSortDirection
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    userByConnectionId(
      connectionId: $connectionId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        connectionId
        id
        email
        nickname
        darkMode
        intercomId
      }
      nextToken
    }
  }
`
export const coachingByUser = /* GraphQL */ `
  query CoachingByUser(
    $userId: ID
    $sortDirection: ModelSortDirection
    $filter: ModelCoachingDataFilterInput
    $limit: Int
    $nextToken: String
  ) {
    coachingByUser(
      userId: $userId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
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
