// tslint:disable
// eslint-disable
// this is an auto generated file. This will be overwritten

export const createSleepData = /* GraphQL */ `
  mutation CreateSleepData($input: CreateSleepDataInput!) {
    createSleepData(input: $input) {
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
export const updateSleepData = /* GraphQL */ `
  mutation UpdateSleepData($input: UpdateSleepDataInput!) {
    updateSleepData(input: $input) {
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
export const deleteSleepData = /* GraphQL */ `
  mutation DeleteSleepData($input: DeleteSleepDataInput!) {
    deleteSleepData(input: $input) {
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
export const createRequest = /* GraphQL */ `
  mutation CreateRequest($input: CreateRequestInput!) {
    createRequest(input: $input) {
      id
      requesterName
      requesterId
      userName
      userId
      accepted
    }
  }
`;
export const updateRequest = /* GraphQL */ `
  mutation UpdateRequest($input: UpdateRequestInput!) {
    updateRequest(input: $input) {
      id
      requesterName
      requesterId
      userName
      userId
      accepted
    }
  }
`;
export const deleteRequest = /* GraphQL */ `
  mutation DeleteRequest($input: DeleteRequestInput!) {
    deleteRequest(input: $input) {
      id
      requesterName
      requesterId
      userName
      userId
      accepted
    }
  }
`;
export const createUser = /* GraphQL */ `
  mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input) {
      connectionId
      id
      email
      nickname
      darkMode
      intercomId
    }
  }
`;
export const updateUser = /* GraphQL */ `
  mutation UpdateUser($input: UpdateUserInput!) {
    updateUser(input: $input) {
      connectionId
      id
      email
      nickname
      darkMode
      intercomId
    }
  }
`;
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser($input: DeleteUserInput!) {
    deleteUser(input: $input) {
      connectionId
      id
      email
      nickname
      darkMode
      intercomId
    }
  }
`;
export const createCoachingData = /* GraphQL */ `
  mutation CreateCoachingData($input: CreateCoachingDataInput!) {
    createCoachingData(input: $input) {
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
export const updateCoachingData = /* GraphQL */ `
  mutation UpdateCoachingData($input: UpdateCoachingDataInput!) {
    updateCoachingData(input: $input) {
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
export const deleteCoachingData = /* GraphQL */ `
  mutation DeleteCoachingData($input: DeleteCoachingDataInput!) {
    deleteCoachingData(input: $input) {
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
export const createHabit = /* GraphQL */ `
  mutation CreateHabit($input: CreateHabitInput!) {
    createHabit(input: $input) {
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
export const updateHabit = /* GraphQL */ `
  mutation UpdateHabit($input: UpdateHabitInput!) {
    updateHabit(input: $input) {
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
export const deleteHabit = /* GraphQL */ `
  mutation DeleteHabit($input: DeleteHabitInput!) {
    deleteHabit(input: $input) {
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
export const createNight = /* GraphQL */ `
  mutation CreateNight($input: CreateNightInput!) {
    createNight(input: $input) {
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
export const updateNight = /* GraphQL */ `
  mutation UpdateNight($input: UpdateNightInput!) {
    updateNight(input: $input) {
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
export const deleteNight = /* GraphQL */ `
  mutation DeleteNight($input: DeleteNightInput!) {
    deleteNight(input: $input) {
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
export const createLikedContent = /* GraphQL */ `
  mutation CreateLikedContent($input: CreateLikedContentInput!) {
    createLikedContent(input: $input) {
      id
      name
      type
      slug
      excerpt
      owner
    }
  }
`;
export const updateLikedContent = /* GraphQL */ `
  mutation UpdateLikedContent($input: UpdateLikedContentInput!) {
    updateLikedContent(input: $input) {
      id
      name
      type
      slug
      excerpt
      owner
    }
  }
`;
export const deleteLikedContent = /* GraphQL */ `
  mutation DeleteLikedContent($input: DeleteLikedContentInput!) {
    deleteLikedContent(input: $input) {
      id
      name
      type
      slug
      excerpt
      owner
    }
  }
`;
export const createNightRating = /* GraphQL */ `
  mutation CreateNightRating($input: CreateNightRatingInput!) {
    createNightRating(input: $input) {
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
export const updateNightRating = /* GraphQL */ `
  mutation UpdateNightRating($input: UpdateNightRatingInput!) {
    updateNightRating(input: $input) {
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
export const deleteNightRating = /* GraphQL */ `
  mutation DeleteNightRating($input: DeleteNightRatingInput!) {
    deleteNightRating(input: $input) {
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
export const createNightNote = /* GraphQL */ `
  mutation CreateNightNote($input: CreateNightNoteInput!) {
    createNightNote(input: $input) {
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
export const updateNightNote = /* GraphQL */ `
  mutation UpdateNightNote($input: UpdateNightNoteInput!) {
    updateNightNote(input: $input) {
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
export const deleteNightNote = /* GraphQL */ `
  mutation DeleteNightNote($input: DeleteNightNoteInput!) {
    deleteNightNote(input: $input) {
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
