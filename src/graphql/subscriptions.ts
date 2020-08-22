// tslint:disable
// this is an auto generated file. This will be overwritten

export const onCreateSleepData = /* GraphQL */ `
  subscription OnCreateSleepData($owner: String!) {
    onCreateSleepData(owner: $owner) {
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
export const onUpdateSleepData = /* GraphQL */ `
  subscription OnUpdateSleepData($owner: String!) {
    onUpdateSleepData(owner: $owner) {
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
export const onDeleteSleepData = /* GraphQL */ `
  subscription OnDeleteSleepData($owner: String) {
    onDeleteSleepData(owner: $owner) {
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
export const onCreateRequest = /* GraphQL */ `
  subscription OnCreateRequest($owner: String!) {
    onCreateRequest(owner: $owner) {
      id
      requesterName
      requesterId
      userName
      userId
      accepted
    }
  }
`
export const onUpdateRequest = /* GraphQL */ `
  subscription OnUpdateRequest($userId: String!) {
    onUpdateRequest(userId: $userId) {
      id
      requesterName
      requesterId
      userName
      userId
      accepted
    }
  }
`
export const onDeleteRequest = /* GraphQL */ `
  subscription OnDeleteRequest($userId: String) {
    onDeleteRequest(userId: $userId) {
      id
      requesterName
      requesterId
      userName
      userId
      accepted
    }
  }
`
export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser {
    onCreateUser {
      connectionId
      id
      email
      nickname
      darkMode
      intercomId
    }
  }
`
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser($owner: String!) {
    onUpdateUser(owner: $owner) {
      connectionId
      id
      email
      nickname
      darkMode
      intercomId
    }
  }
`
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser($owner: String) {
    onDeleteUser(owner: $owner) {
      connectionId
      id
      email
      nickname
      darkMode
      intercomId
    }
  }
`
export const onCreateCoachingData = /* GraphQL */ `
  subscription OnCreateCoachingData($owner: String!) {
    onCreateCoachingData(owner: $owner) {
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
export const onUpdateCoachingData = /* GraphQL */ `
  subscription OnUpdateCoachingData($owner: String!) {
    onUpdateCoachingData(owner: $owner) {
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
export const onDeleteCoachingData = /* GraphQL */ `
  subscription OnDeleteCoachingData($owner: String) {
    onDeleteCoachingData(owner: $owner) {
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
export const onCreateHabit = /* GraphQL */ `
  subscription OnCreateHabit($owner: String!) {
    onCreateHabit(owner: $owner) {
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
export const onUpdateHabit = /* GraphQL */ `
  subscription OnUpdateHabit($owner: String!) {
    onUpdateHabit(owner: $owner) {
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
export const onDeleteHabit = /* GraphQL */ `
  subscription OnDeleteHabit($owner: String) {
    onDeleteHabit(owner: $owner) {
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
