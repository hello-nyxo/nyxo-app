// tslint:disable
// eslint-disable
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
`;
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
`;
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
`;
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
`;
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
`;
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
`;
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
`;
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
`;
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
`;
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
`;
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
`;
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
`;
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
`;
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
`;
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
`;
export const onCreateNight = /* GraphQL */ `
  subscription OnCreateNight($owner: String!) {
    onCreateNight(owner: $owner) {
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
`;
export const onUpdateNight = /* GraphQL */ `
  subscription OnUpdateNight($owner: String!) {
    onUpdateNight(owner: $owner) {
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
`;
export const onDeleteNight = /* GraphQL */ `
  subscription OnDeleteNight($owner: String) {
    onDeleteNight(owner: $owner) {
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
`;
export const onCreateLikedContent = /* GraphQL */ `
  subscription OnCreateLikedContent($owner: String) {
    onCreateLikedContent(owner: $owner) {
      id
      name
      type
      slug
      excerpt
      owner
    }
  }
`;
export const onUpdateLikedContent = /* GraphQL */ `
  subscription OnUpdateLikedContent($owner: String) {
    onUpdateLikedContent(owner: $owner) {
      id
      name
      type
      slug
      excerpt
      owner
    }
  }
`;
export const onDeleteLikedContent = /* GraphQL */ `
  subscription OnDeleteLikedContent($owner: String) {
    onDeleteLikedContent(owner: $owner) {
      id
      name
      type
      slug
      excerpt
      owner
    }
  }
`;
export const onCreateNightRating = /* GraphQL */ `
  subscription OnCreateNightRating($owner: String!) {
    onCreateNightRating(owner: $owner) {
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
      rating
      date
      owner
    }
  }
`;
export const onUpdateNightRating = /* GraphQL */ `
  subscription OnUpdateNightRating($owner: String!) {
    onUpdateNightRating(owner: $owner) {
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
      rating
      date
      owner
    }
  }
`;
export const onDeleteNightRating = /* GraphQL */ `
  subscription OnDeleteNightRating($owner: String) {
    onDeleteNightRating(owner: $owner) {
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
      rating
      date
      owner
    }
  }
`;
export const onCreateNightNote = /* GraphQL */ `
  subscription OnCreateNightNote($owner: String!) {
    onCreateNightNote(owner: $owner) {
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
      dateTime
      content
      meta {
        tags
      }
      owner
    }
  }
`;
export const onUpdateNightNote = /* GraphQL */ `
  subscription OnUpdateNightNote($owner: String!) {
    onUpdateNightNote(owner: $owner) {
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
      dateTime
      content
      meta {
        tags
      }
      owner
    }
  }
`;
export const onDeleteNightNote = /* GraphQL */ `
  subscription OnDeleteNightNote($owner: String) {
    onDeleteNightNote(owner: $owner) {
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
      dateTime
      content
      meta {
        tags
      }
      owner
    }
  }
`;
