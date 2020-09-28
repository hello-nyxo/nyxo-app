/* tslint:disable */
/* eslint-disable */
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
        createdAt
        updatedAt
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
      createdAt
      updatedAt
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
        createdAt
        updatedAt
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
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onDeleteSleepData = /* GraphQL */ `
  subscription OnDeleteSleepData($owner: String!) {
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
        createdAt
        updatedAt
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
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onCreateRequest = /* GraphQL */ `
  subscription OnCreateRequest {
    onCreateRequest {
      id
      requesterName
      requesterId
      userName
      userId
      accepted
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateRequest = /* GraphQL */ `
  subscription OnUpdateRequest {
    onUpdateRequest {
      id
      requesterName
      requesterId
      userName
      userId
      accepted
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteRequest = /* GraphQL */ `
  subscription OnDeleteRequest {
    onDeleteRequest {
      id
      requesterName
      requesterId
      userName
      userId
      accepted
      createdAt
      updatedAt
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
      }
      sleepPoints {
        efficiency
        duration
        socialJetLag
        timing
      }
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser {
    onUpdateUser {
      connectionId
      id
      email
      nickname
      darkMode
      intercomId
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
      }
      sleepPoints {
        efficiency
        duration
        socialJetLag
        timing
      }
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser {
    onDeleteUser {
      connectionId
      id
      email
      nickname
      darkMode
      intercomId
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
      }
      sleepPoints {
        efficiency
        duration
        socialJetLag
        timing
      }
      createdAt
      updatedAt
    }
  }
`;
export const onCreateCoachingData = /* GraphQL */ `
  subscription OnCreateCoachingData($owner: String!) {
    onCreateCoachingData(owner: $owner) {
      id
      userId
      user {
        connectionId
        id
        email
        nickname
        darkMode
        intercomId
        createdAt
        updatedAt
      }
      stage
      active {
        connectionId
        id
        email
        nickname
        darkMode
        intercomId
        createdAt
        updatedAt
      }
      activeWeek
      started
      ended
      weeks {
        started
        ended
        locked
        slug
      }
      lessons
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onUpdateCoachingData = /* GraphQL */ `
  subscription OnUpdateCoachingData($owner: String!) {
    onUpdateCoachingData(owner: $owner) {
      id
      userId
      user {
        connectionId
        id
        email
        nickname
        darkMode
        intercomId
        createdAt
        updatedAt
      }
      stage
      active {
        connectionId
        id
        email
        nickname
        darkMode
        intercomId
        createdAt
        updatedAt
      }
      activeWeek
      started
      ended
      weeks {
        started
        ended
        locked
        slug
      }
      lessons
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onDeleteCoachingData = /* GraphQL */ `
  subscription OnDeleteCoachingData($owner: String!) {
    onDeleteCoachingData(owner: $owner) {
      id
      userId
      user {
        connectionId
        id
        email
        nickname
        darkMode
        intercomId
        createdAt
        updatedAt
      }
      stage
      active {
        connectionId
        id
        email
        nickname
        darkMode
        intercomId
        createdAt
        updatedAt
      }
      activeWeek
      started
      ended
      weeks {
        started
        ended
        locked
        slug
      }
      lessons
      createdAt
      updatedAt
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
        createdAt
        updatedAt
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
      createdAt
      updatedAt
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
        createdAt
        updatedAt
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
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onDeleteHabit = /* GraphQL */ `
  subscription OnDeleteHabit($owner: String!) {
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
        createdAt
        updatedAt
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
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onCreateLikedContent = /* GraphQL */ `
  subscription OnCreateLikedContent($owner: String!) {
    onCreateLikedContent(owner: $owner) {
      id
      name
      type
      slug
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onUpdateLikedContent = /* GraphQL */ `
  subscription OnUpdateLikedContent($owner: String!) {
    onUpdateLikedContent(owner: $owner) {
      id
      name
      type
      slug
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onDeleteLikedContent = /* GraphQL */ `
  subscription OnDeleteLikedContent($owner: String!) {
    onDeleteLikedContent(owner: $owner) {
      id
      name
      type
      slug
      createdAt
      updatedAt
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
        createdAt
        updatedAt
      }
      rating
      date
      createdAt
      updatedAt
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
        createdAt
        updatedAt
      }
      rating
      date
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onDeleteNightRating = /* GraphQL */ `
  subscription OnDeleteNightRating($owner: String!) {
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
        createdAt
        updatedAt
      }
      rating
      date
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onCreateFeedbackContent = /* GraphQL */ `
  subscription OnCreateFeedbackContent($owner: String!) {
    onCreateFeedbackContent(owner: $owner) {
      id
      type
      slug
      rating
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onUpdateFeedbackContent = /* GraphQL */ `
  subscription OnUpdateFeedbackContent($owner: String!) {
    onUpdateFeedbackContent(owner: $owner) {
      id
      type
      slug
      rating
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onDeleteFeedbackContent = /* GraphQL */ `
  subscription OnDeleteFeedbackContent($owner: String!) {
    onDeleteFeedbackContent(owner: $owner) {
      id
      type
      slug
      rating
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onCreateComments = /* GraphQL */ `
  subscription OnCreateComments($owner: String!) {
    onCreateComments(owner: $owner) {
      id
      type
      slug
      firstName
      lastName
      comment
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onUpdateComments = /* GraphQL */ `
  subscription OnUpdateComments($owner: String!) {
    onUpdateComments(owner: $owner) {
      id
      type
      slug
      firstName
      lastName
      comment
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onDeleteComments = /* GraphQL */ `
  subscription OnDeleteComments($owner: String!) {
    onDeleteComments(owner: $owner) {
      id
      type
      slug
      firstName
      lastName
      comment
      createdAt
      updatedAt
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
        createdAt
        updatedAt
      }
      date
      dateTime
      content
      meta {
        tags
      }
      createdAt
      updatedAt
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
        createdAt
        updatedAt
      }
      date
      dateTime
      content
      meta {
        tags
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onDeleteNightNote = /* GraphQL */ `
  subscription OnDeleteNightNote($owner: String!) {
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
        createdAt
        updatedAt
      }
      date
      dateTime
      content
      meta {
        tags
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onCreateNight = /* GraphQL */ `
  subscription OnCreateNight($owner: String) {
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
        createdAt
        updatedAt
      }
      sourceId
      sourceName
      value
      startDate
      endDate
      totalDuration
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onUpdateNight = /* GraphQL */ `
  subscription OnUpdateNight($owner: String) {
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
        createdAt
        updatedAt
      }
      sourceId
      sourceName
      value
      startDate
      endDate
      totalDuration
      createdAt
      updatedAt
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
        createdAt
        updatedAt
      }
      sourceId
      sourceName
      value
      startDate
      endDate
      totalDuration
      createdAt
      updatedAt
      owner
    }
  }
`;
