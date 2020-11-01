/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type UpdateUserInput = {
  connectionId?: string | null,
  id: string,
  email?: string | null,
  nickname?: string | null,
  darkMode?: boolean | null,
  intercomId?: string | null,
  sleepPoints?: SleepPointsInput | null,
  userActiveCoachingId?: string | null,
};

export type SleepPointsInput = {
  efficiency?: number | null,
  duration?: number | null,
  socialJetLag?: number | null,
  timing?: number | null,
};

export type ModelSleepDataFilterInput = {
  id?: ModelIDFilterInput | null,
  userId?: ModelIDFilterInput | null,
  date?: ModelStringFilterInput | null,
  rating?: ModelIntFilterInput | null,
  and?: Array< ModelSleepDataFilterInput | null > | null,
  or?: Array< ModelSleepDataFilterInput | null > | null,
  not?: ModelSleepDataFilterInput | null,
};

export type ModelIDFilterInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
};

export type ModelStringFilterInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
};

export type ModelIntFilterInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type ModelUserFilterInput = {
  connectionId?: ModelStringFilterInput | null,
  id?: ModelIDFilterInput | null,
  email?: ModelStringFilterInput | null,
  nickname?: ModelStringFilterInput | null,
  darkMode?: ModelBooleanFilterInput | null,
  intercomId?: ModelStringFilterInput | null,
  and?: Array< ModelUserFilterInput | null > | null,
  or?: Array< ModelUserFilterInput | null > | null,
  not?: ModelUserFilterInput | null,
};

export type ModelBooleanFilterInput = {
  ne?: boolean | null,
  eq?: boolean | null,
};

export type ModelCoachingDataFilterInput = {
  id?: ModelIDFilterInput | null,
  userId?: ModelIDFilterInput | null,
  stage?: ModelStageFilterInput | null,
  activeWeek?: ModelStringFilterInput | null,
  started?: ModelStringFilterInput | null,
  ended?: ModelStringFilterInput | null,
  lessons?: ModelStringFilterInput | null,
  and?: Array< ModelCoachingDataFilterInput | null > | null,
  or?: Array< ModelCoachingDataFilterInput | null > | null,
  not?: ModelCoachingDataFilterInput | null,
};

export type ModelStageFilterInput = {
  eq?: Stage | null,
  ne?: Stage | null,
};

export enum Stage {
  ONGOING = "ONGOING",
  PAUSED = "PAUSED",
  COMPLETED = "COMPLETED",
}


export type ModelHabitFilterInput = {
  id?: ModelIDFilterInput | null,
  userId?: ModelIDFilterInput | null,
  dayStreak?: ModelIntFilterInput | null,
  longestDayStreak?: ModelIntFilterInput | null,
  latestCompletedDate?: ModelStringFilterInput | null,
  title?: ModelStringFilterInput | null,
  description?: ModelStringFilterInput | null,
  date?: ModelStringFilterInput | null,
  archived?: ModelBooleanFilterInput | null,
  period?: ModelPeriodFilterInput | null,
  and?: Array< ModelHabitFilterInput | null > | null,
  or?: Array< ModelHabitFilterInput | null > | null,
  not?: ModelHabitFilterInput | null,
};

export type ModelPeriodFilterInput = {
  eq?: Period | null,
  ne?: Period | null,
};

export enum Period {
  morning = "morning",
  afternoon = "afternoon",
  evening = "evening",
}


export type CreateSleepDataInput = {
  id?: string | null,
  userId: string,
  date: string,
  rating?: number | null,
  night?: Array< NightSegmentInput | null > | null,
};

export type NightSegmentInput = {
  value: string,
  sourceName: string,
  sourceId: string,
  startDate: string,
  endDate: string,
};

export type UpdateSleepDataInput = {
  id: string,
  userId?: string | null,
  date?: string | null,
  rating?: number | null,
  night?: Array< NightSegmentInput | null > | null,
};

export type DeleteSleepDataInput = {
  id?: string | null,
};

export type CreateRequestInput = {
  id?: string | null,
  requesterName: string,
  requesterId: string,
  userName: string,
  userId: string,
  accepted: boolean,
};

export type UpdateRequestInput = {
  id: string,
  requesterName?: string | null,
  requesterId?: string | null,
  userName?: string | null,
  userId?: string | null,
  accepted?: boolean | null,
};

export type DeleteRequestInput = {
  id?: string | null,
};

export type CreateUserInput = {
  connectionId?: string | null,
  id?: string | null,
  email: string,
  nickname?: string | null,
  darkMode?: boolean | null,
  intercomId?: string | null,
  sleepPoints?: SleepPointsInput | null,
  userActiveCoachingId?: string | null,
};

export type DeleteUserInput = {
  id?: string | null,
};

export type CreateCoachingDataInput = {
  id?: string | null,
  userId: string,
  stage?: Stage | null,
  activeWeek?: string | null,
  started?: string | null,
  ended?: string | null,
  weeks?: Array< WeekInput | null > | null,
  lessons?: Array< string | null > | null,
  coachingDataActiveId?: string | null,
};

export type WeekInput = {
  started?: string | null,
  ended?: string | null,
  locked?: boolean | null,
  slug?: string | null,
};

export type UpdateCoachingDataInput = {
  id: string,
  userId?: string | null,
  stage?: Stage | null,
  activeWeek?: string | null,
  started?: string | null,
  ended?: string | null,
  weeks?: Array< WeekInput | null > | null,
  lessons?: Array< string | null > | null,
  coachingDataActiveId?: string | null,
};

export type DeleteCoachingDataInput = {
  id?: string | null,
};

export type CreateHabitInput = {
  id?: string | null,
  userId: string,
  dayStreak?: number | null,
  longestDayStreak?: number | null,
  latestCompletedDate?: string | null,
  title: string,
  description?: string | null,
  date: string,
  days: Array< DayCompletionRecordInput | null >,
  archived?: boolean | null,
  period: Period,
};

export type DayCompletionRecordInput = {
  key?: string | null,
  value?: number | null,
};

export type UpdateHabitInput = {
  id: string,
  userId?: string | null,
  dayStreak?: number | null,
  longestDayStreak?: number | null,
  latestCompletedDate?: string | null,
  title?: string | null,
  description?: string | null,
  date?: string | null,
  days?: Array< DayCompletionRecordInput | null > | null,
  archived?: boolean | null,
  period?: Period | null,
};

export type DeleteHabitInput = {
  id?: string | null,
};

export type CreateNightInput = {
  id?: string | null,
  userId: string,
  sourceId: string,
  sourceName: string,
  value: NightValue,
  startDate: string,
  endDate: string,
  totalDuration: number,
};

export enum NightValue {
  InBed = "InBed",
  Asleep = "Asleep",
  Awake = "Awake",
}


export type UpdateNightInput = {
  id: string,
  userId?: string | null,
  sourceId?: string | null,
  sourceName?: string | null,
  value?: NightValue | null,
  startDate?: string | null,
  endDate?: string | null,
  totalDuration?: number | null,
};

export type DeleteNightInput = {
  id?: string | null,
};

export type CreateLikedContentInput = {
  id?: string | null,
  name?: string | null,
  type?: string | null,
  slug?: string | null,
};

export type UpdateLikedContentInput = {
  id: string,
  name?: string | null,
  type?: string | null,
  slug?: string | null,
};

export type DeleteLikedContentInput = {
  id?: string | null,
};

export type CreateNightRatingInput = {
  id?: string | null,
  userId: string,
  rating: number,
  date: string,
};

export type UpdateNightRatingInput = {
  id: string,
  userId?: string | null,
  rating?: number | null,
  date?: string | null,
};

export type DeleteNightRatingInput = {
  id?: string | null,
};

export type CreateFeedbackContentInput = {
  id?: string | null,
  type?: string | null,
  slug: string,
  rating: number,
};

export type UpdateFeedbackContentInput = {
  id: string,
  type?: string | null,
  slug?: string | null,
  rating?: number | null,
};

export type DeleteFeedbackContentInput = {
  id?: string | null,
};

export type CreateCommentsInput = {
  id?: string | null,
  type?: string | null,
  slug: string,
  firstName?: string | null,
  lastName?: string | null,
  comment: string,
};

export type UpdateCommentsInput = {
  id: string,
  type?: string | null,
  slug?: string | null,
  firstName?: string | null,
  lastName?: string | null,
  comment?: string | null,
};

export type DeleteCommentsInput = {
  id?: string | null,
};

export type CreateNightNoteInput = {
  id?: string | null,
  userId: string,
  date: string,
  dateTime: string,
  content: string,
  meta: NightNoteMetaInput,
};

export type NightNoteMetaInput = {
  tags: Array< string | null >,
};

export type UpdateNightNoteInput = {
  id: string,
  userId?: string | null,
  date?: string | null,
  dateTime?: string | null,
  content?: string | null,
  meta?: NightNoteMetaInput | null,
};

export type DeleteNightNoteInput = {
  id?: string | null,
};

export type ModelRequestFilterInput = {
  id?: ModelIDFilterInput | null,
  requesterName?: ModelStringFilterInput | null,
  requesterId?: ModelStringFilterInput | null,
  userName?: ModelStringFilterInput | null,
  userId?: ModelStringFilterInput | null,
  accepted?: ModelBooleanFilterInput | null,
  and?: Array< ModelRequestFilterInput | null > | null,
  or?: Array< ModelRequestFilterInput | null > | null,
  not?: ModelRequestFilterInput | null,
};

export type ModelLikedContentFilterInput = {
  id?: ModelIDFilterInput | null,
  name?: ModelStringFilterInput | null,
  type?: ModelStringFilterInput | null,
  slug?: ModelStringFilterInput | null,
  and?: Array< ModelLikedContentFilterInput | null > | null,
  or?: Array< ModelLikedContentFilterInput | null > | null,
  not?: ModelLikedContentFilterInput | null,
};

export type ModelNightRatingFilterInput = {
  id?: ModelIDFilterInput | null,
  userId?: ModelIDFilterInput | null,
  rating?: ModelIntFilterInput | null,
  date?: ModelStringFilterInput | null,
  and?: Array< ModelNightRatingFilterInput | null > | null,
  or?: Array< ModelNightRatingFilterInput | null > | null,
  not?: ModelNightRatingFilterInput | null,
};

export type ModelFeedbackContentFilterInput = {
  id?: ModelStringFilterInput | null,
  type?: ModelStringFilterInput | null,
  slug?: ModelStringFilterInput | null,
  rating?: ModelIntFilterInput | null,
  and?: Array< ModelFeedbackContentFilterInput | null > | null,
  or?: Array< ModelFeedbackContentFilterInput | null > | null,
  not?: ModelFeedbackContentFilterInput | null,
};

export type ModelCommentsFilterInput = {
  id?: ModelStringFilterInput | null,
  type?: ModelStringFilterInput | null,
  slug?: ModelStringFilterInput | null,
  firstName?: ModelStringFilterInput | null,
  lastName?: ModelStringFilterInput | null,
  comment?: ModelStringFilterInput | null,
  and?: Array< ModelCommentsFilterInput | null > | null,
  or?: Array< ModelCommentsFilterInput | null > | null,
  not?: ModelCommentsFilterInput | null,
};

export type ModelNightNoteFilterInput = {
  id?: ModelIDFilterInput | null,
  userId?: ModelIDFilterInput | null,
  date?: ModelStringFilterInput | null,
  dateTime?: ModelStringFilterInput | null,
  content?: ModelStringFilterInput | null,
  and?: Array< ModelNightNoteFilterInput | null > | null,
  or?: Array< ModelNightNoteFilterInput | null > | null,
  not?: ModelNightNoteFilterInput | null,
};

export enum ModelSortDirection {
  ASC = "ASC",
  DESC = "DESC",
}


export type ModelIDKeyConditionInput = {
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
};

export type ModelStringKeyConditionInput = {
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
};

export type ModelNightFilterInput = {
  id?: ModelIDFilterInput | null,
  userId?: ModelIDFilterInput | null,
  sourceId?: ModelStringFilterInput | null,
  sourceName?: ModelStringFilterInput | null,
  value?: ModelNightValueFilterInput | null,
  startDate?: ModelStringFilterInput | null,
  endDate?: ModelStringFilterInput | null,
  totalDuration?: ModelIntFilterInput | null,
  and?: Array< ModelNightFilterInput | null > | null,
  or?: Array< ModelNightFilterInput | null > | null,
  not?: ModelNightFilterInput | null,
};

export type ModelNightValueFilterInput = {
  eq?: NightValue | null,
  ne?: NightValue | null,
};

export type UpdateConnectionIDMutationVariables = {
  input: UpdateUserInput,
};

export type UpdateConnectionIDMutation = {
  updateUser:  {
    __typename: "User",
    email: string,
    connectionId: string | null,
  } | null,
};

export type listSleepDatasAnonymisedQueryVariables = {
  filter?: ModelSleepDataFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type listSleepDatasAnonymisedQuery = {
  listSleepDatas:  {
    __typename: "ModelSleepDataConnection",
    items:  Array< {
      __typename: "SleepData",
      id: string,
      date: string,
      rating: number | null,
      night:  Array< {
        __typename: "NightSegment",
        value: string,
        sourceName: string,
        sourceId: string,
        startDate: string,
        endDate: string,
      } | null > | null,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type getSleepDataAnonymisedQueryVariables = {
  id: string,
};

export type getSleepDataAnonymisedQuery = {
  getSleepData:  {
    __typename: "SleepData",
    id: string,
    date: string,
    rating: number | null,
    night:  Array< {
      __typename: "NightSegment",
      value: string,
      sourceName: string,
      sourceId: string,
      startDate: string,
      endDate: string,
    } | null > | null,
  } | null,
};

export type getUserAnonymisedQueryVariables = {
  id: string,
};

export type getUserAnonymisedQuery = {
  getUser:  {
    __typename: "User",
    id: string,
    nickname: string | null,
  } | null,
};

export type listUsersAnonymisedQueryVariables = {
  filter?: ModelUserFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type listUsersAnonymisedQuery = {
  listUsers:  {
    __typename: "ModelUserConnection",
    items:  Array< {
      __typename: "User",
      id: string,
      nickname: string | null,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type GetSleepDataSimpleQueryVariables = {
  filter?: ModelSleepDataFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type GetSleepDataSimpleQuery = {
  listSleepDatas:  {
    __typename: "ModelSleepDataConnection",
    items:  Array< {
      __typename: "SleepData",
      id: string,
      date: string,
      rating: number | null,
      night:  Array< {
        __typename: "NightSegment",
        value: string,
        sourceName: string,
        sourceId: string,
        startDate: string,
        endDate: string,
      } | null > | null,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type QueryCoachingDataQueryVariables = {
  filter?: ModelCoachingDataFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type QueryCoachingDataQuery = {
  listCoachingDatas:  {
    __typename: "ModelCoachingDataConnection",
    items:  Array< {
      __typename: "CoachingData",
      id: string,
      lessons: Array< string | null > | null,
      userId: string,
      stage: Stage | null,
      activeWeek: string | null,
      started: string | null,
      ended: string | null,
      owner: string | null,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type listHabitsWithDaysQueryVariables = {
  filter?: ModelHabitFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type listHabitsWithDaysQuery = {
  listHabits:  {
    __typename: "ModelHabitConnection",
    items:  Array< {
      __typename: "Habit",
      id: string,
      userId: string,
      dayStreak: number | null,
      longestDayStreak: number | null,
      latestCompletedDate: string | null,
      title: string,
      days:  Array< {
        __typename: "DayCompletionRecord",
        key: string | null,
        value: number | null,
      } | null >,
      description: string | null,
      date: string,
      archived: boolean | null,
      period: Period,
      owner: string | null,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type GetActiveCoachingQueryVariables = {
  id: string,
};

export type GetActiveCoachingQuery = {
  getUser:  {
    __typename: "User",
    activeCoaching:  {
      __typename: "CoachingData",
      id: string,
      userId: string,
      stage: Stage | null,
      activeWeek: string | null,
      started: string | null,
      ended: string | null,
      lessons: Array< string | null > | null,
      createdAt: string,
      updatedAt: string,
      owner: string | null,
      weeks:  Array< {
        __typename: "Week",
        slug: string | null,
        started: string | null,
        ended: string | null,
      } | null > | null,
    } | null,
  } | null,
};

export type CreateSleepDataMutationVariables = {
  input: CreateSleepDataInput,
};

export type CreateSleepDataMutation = {
  createSleepData:  {
    __typename: "SleepData",
    id: string,
    userId: string,
    user:  {
      __typename: "User",
      connectionId: string | null,
      id: string,
      email: string,
      nickname: string | null,
      darkMode: boolean | null,
      intercomId: string | null,
      createdAt: string,
      updatedAt: string,
    },
    date: string,
    rating: number | null,
    night:  Array< {
      __typename: "NightSegment",
      value: string,
      sourceName: string,
      sourceId: string,
      startDate: string,
      endDate: string,
    } | null > | null,
    createdAt: string,
    updatedAt: string,
    owner: string | null,
  } | null,
};

export type UpdateSleepDataMutationVariables = {
  input: UpdateSleepDataInput,
};

export type UpdateSleepDataMutation = {
  updateSleepData:  {
    __typename: "SleepData",
    id: string,
    userId: string,
    user:  {
      __typename: "User",
      connectionId: string | null,
      id: string,
      email: string,
      nickname: string | null,
      darkMode: boolean | null,
      intercomId: string | null,
      createdAt: string,
      updatedAt: string,
    },
    date: string,
    rating: number | null,
    night:  Array< {
      __typename: "NightSegment",
      value: string,
      sourceName: string,
      sourceId: string,
      startDate: string,
      endDate: string,
    } | null > | null,
    createdAt: string,
    updatedAt: string,
    owner: string | null,
  } | null,
};

export type DeleteSleepDataMutationVariables = {
  input: DeleteSleepDataInput,
};

export type DeleteSleepDataMutation = {
  deleteSleepData:  {
    __typename: "SleepData",
    id: string,
    userId: string,
    user:  {
      __typename: "User",
      connectionId: string | null,
      id: string,
      email: string,
      nickname: string | null,
      darkMode: boolean | null,
      intercomId: string | null,
      createdAt: string,
      updatedAt: string,
    },
    date: string,
    rating: number | null,
    night:  Array< {
      __typename: "NightSegment",
      value: string,
      sourceName: string,
      sourceId: string,
      startDate: string,
      endDate: string,
    } | null > | null,
    createdAt: string,
    updatedAt: string,
    owner: string | null,
  } | null,
};

export type CreateRequestMutationVariables = {
  input: CreateRequestInput,
};

export type CreateRequestMutation = {
  createRequest:  {
    __typename: "Request",
    id: string,
    requesterName: string,
    requesterId: string,
    userName: string,
    userId: string,
    accepted: boolean,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateRequestMutationVariables = {
  input: UpdateRequestInput,
};

export type UpdateRequestMutation = {
  updateRequest:  {
    __typename: "Request",
    id: string,
    requesterName: string,
    requesterId: string,
    userName: string,
    userId: string,
    accepted: boolean,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteRequestMutationVariables = {
  input: DeleteRequestInput,
};

export type DeleteRequestMutation = {
  deleteRequest:  {
    __typename: "Request",
    id: string,
    requesterName: string,
    requesterId: string,
    userName: string,
    userId: string,
    accepted: boolean,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateUserMutationVariables = {
  input: CreateUserInput,
};

export type CreateUserMutation = {
  createUser:  {
    __typename: "User",
    connectionId: string | null,
    id: string,
    email: string,
    nickname: string | null,
    darkMode: boolean | null,
    intercomId: string | null,
    activeCoaching:  {
      __typename: "CoachingData",
      id: string,
      userId: string,
      stage: Stage | null,
      activeWeek: string | null,
      started: string | null,
      ended: string | null,
      lessons: Array< string | null > | null,
      createdAt: string,
      updatedAt: string,
      owner: string | null,
    } | null,
    sleepPoints:  {
      __typename: "SleepPoints",
      efficiency: number | null,
      duration: number | null,
      socialJetLag: number | null,
      timing: number | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateUserMutationVariables = {
  input: UpdateUserInput,
};

export type UpdateUserMutation = {
  updateUser:  {
    __typename: "User",
    connectionId: string | null,
    id: string,
    email: string,
    nickname: string | null,
    darkMode: boolean | null,
    intercomId: string | null,
    activeCoaching:  {
      __typename: "CoachingData",
      id: string,
      userId: string,
      stage: Stage | null,
      activeWeek: string | null,
      started: string | null,
      ended: string | null,
      lessons: Array< string | null > | null,
      createdAt: string,
      updatedAt: string,
      owner: string | null,
    } | null,
    sleepPoints:  {
      __typename: "SleepPoints",
      efficiency: number | null,
      duration: number | null,
      socialJetLag: number | null,
      timing: number | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteUserMutationVariables = {
  input: DeleteUserInput,
};

export type DeleteUserMutation = {
  deleteUser:  {
    __typename: "User",
    connectionId: string | null,
    id: string,
    email: string,
    nickname: string | null,
    darkMode: boolean | null,
    intercomId: string | null,
    activeCoaching:  {
      __typename: "CoachingData",
      id: string,
      userId: string,
      stage: Stage | null,
      activeWeek: string | null,
      started: string | null,
      ended: string | null,
      lessons: Array< string | null > | null,
      createdAt: string,
      updatedAt: string,
      owner: string | null,
    } | null,
    sleepPoints:  {
      __typename: "SleepPoints",
      efficiency: number | null,
      duration: number | null,
      socialJetLag: number | null,
      timing: number | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateCoachingDataMutationVariables = {
  input: CreateCoachingDataInput,
};

export type CreateCoachingDataMutation = {
  createCoachingData:  {
    __typename: "CoachingData",
    id: string,
    userId: string,
    user:  {
      __typename: "User",
      connectionId: string | null,
      id: string,
      email: string,
      nickname: string | null,
      darkMode: boolean | null,
      intercomId: string | null,
      createdAt: string,
      updatedAt: string,
    },
    stage: Stage | null,
    active:  {
      __typename: "User",
      connectionId: string | null,
      id: string,
      email: string,
      nickname: string | null,
      darkMode: boolean | null,
      intercomId: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    activeWeek: string | null,
    started: string | null,
    ended: string | null,
    weeks:  Array< {
      __typename: "Week",
      started: string | null,
      ended: string | null,
      locked: boolean | null,
      slug: string | null,
    } | null > | null,
    lessons: Array< string | null > | null,
    createdAt: string,
    updatedAt: string,
    owner: string | null,
  } | null,
};

export type UpdateCoachingDataMutationVariables = {
  input: UpdateCoachingDataInput,
};

export type UpdateCoachingDataMutation = {
  updateCoachingData:  {
    __typename: "CoachingData",
    id: string,
    userId: string,
    user:  {
      __typename: "User",
      connectionId: string | null,
      id: string,
      email: string,
      nickname: string | null,
      darkMode: boolean | null,
      intercomId: string | null,
      createdAt: string,
      updatedAt: string,
    },
    stage: Stage | null,
    active:  {
      __typename: "User",
      connectionId: string | null,
      id: string,
      email: string,
      nickname: string | null,
      darkMode: boolean | null,
      intercomId: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    activeWeek: string | null,
    started: string | null,
    ended: string | null,
    weeks:  Array< {
      __typename: "Week",
      started: string | null,
      ended: string | null,
      locked: boolean | null,
      slug: string | null,
    } | null > | null,
    lessons: Array< string | null > | null,
    createdAt: string,
    updatedAt: string,
    owner: string | null,
  } | null,
};

export type DeleteCoachingDataMutationVariables = {
  input: DeleteCoachingDataInput,
};

export type DeleteCoachingDataMutation = {
  deleteCoachingData:  {
    __typename: "CoachingData",
    id: string,
    userId: string,
    user:  {
      __typename: "User",
      connectionId: string | null,
      id: string,
      email: string,
      nickname: string | null,
      darkMode: boolean | null,
      intercomId: string | null,
      createdAt: string,
      updatedAt: string,
    },
    stage: Stage | null,
    active:  {
      __typename: "User",
      connectionId: string | null,
      id: string,
      email: string,
      nickname: string | null,
      darkMode: boolean | null,
      intercomId: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    activeWeek: string | null,
    started: string | null,
    ended: string | null,
    weeks:  Array< {
      __typename: "Week",
      started: string | null,
      ended: string | null,
      locked: boolean | null,
      slug: string | null,
    } | null > | null,
    lessons: Array< string | null > | null,
    createdAt: string,
    updatedAt: string,
    owner: string | null,
  } | null,
};

export type CreateHabitMutationVariables = {
  input: CreateHabitInput,
};

export type CreateHabitMutation = {
  createHabit:  {
    __typename: "Habit",
    id: string,
    userId: string,
    user:  {
      __typename: "User",
      connectionId: string | null,
      id: string,
      email: string,
      nickname: string | null,
      darkMode: boolean | null,
      intercomId: string | null,
      createdAt: string,
      updatedAt: string,
    },
    dayStreak: number | null,
    longestDayStreak: number | null,
    latestCompletedDate: string | null,
    title: string,
    description: string | null,
    date: string,
    days:  Array< {
      __typename: "DayCompletionRecord",
      key: string | null,
      value: number | null,
    } | null >,
    archived: boolean | null,
    period: Period,
    createdAt: string,
    updatedAt: string,
    owner: string | null,
  } | null,
};

export type UpdateHabitMutationVariables = {
  input: UpdateHabitInput,
};

export type UpdateHabitMutation = {
  updateHabit:  {
    __typename: "Habit",
    id: string,
    userId: string,
    user:  {
      __typename: "User",
      connectionId: string | null,
      id: string,
      email: string,
      nickname: string | null,
      darkMode: boolean | null,
      intercomId: string | null,
      createdAt: string,
      updatedAt: string,
    },
    dayStreak: number | null,
    longestDayStreak: number | null,
    latestCompletedDate: string | null,
    title: string,
    description: string | null,
    date: string,
    days:  Array< {
      __typename: "DayCompletionRecord",
      key: string | null,
      value: number | null,
    } | null >,
    archived: boolean | null,
    period: Period,
    createdAt: string,
    updatedAt: string,
    owner: string | null,
  } | null,
};

export type DeleteHabitMutationVariables = {
  input: DeleteHabitInput,
};

export type DeleteHabitMutation = {
  deleteHabit:  {
    __typename: "Habit",
    id: string,
    userId: string,
    user:  {
      __typename: "User",
      connectionId: string | null,
      id: string,
      email: string,
      nickname: string | null,
      darkMode: boolean | null,
      intercomId: string | null,
      createdAt: string,
      updatedAt: string,
    },
    dayStreak: number | null,
    longestDayStreak: number | null,
    latestCompletedDate: string | null,
    title: string,
    description: string | null,
    date: string,
    days:  Array< {
      __typename: "DayCompletionRecord",
      key: string | null,
      value: number | null,
    } | null >,
    archived: boolean | null,
    period: Period,
    createdAt: string,
    updatedAt: string,
    owner: string | null,
  } | null,
};

export type CreateNightMutationVariables = {
  input: CreateNightInput,
};

export type CreateNightMutation = {
  createNight:  {
    __typename: "Night",
    id: string,
    userId: string,
    user:  {
      __typename: "User",
      connectionId: string | null,
      id: string,
      email: string,
      nickname: string | null,
      darkMode: boolean | null,
      intercomId: string | null,
      createdAt: string,
      updatedAt: string,
    },
    sourceId: string,
    sourceName: string,
    value: NightValue,
    startDate: string,
    endDate: string,
    totalDuration: number,
    createdAt: string,
    updatedAt: string,
    owner: string | null,
  } | null,
};

export type UpdateNightMutationVariables = {
  input: UpdateNightInput,
};

export type UpdateNightMutation = {
  updateNight:  {
    __typename: "Night",
    id: string,
    userId: string,
    user:  {
      __typename: "User",
      connectionId: string | null,
      id: string,
      email: string,
      nickname: string | null,
      darkMode: boolean | null,
      intercomId: string | null,
      createdAt: string,
      updatedAt: string,
    },
    sourceId: string,
    sourceName: string,
    value: NightValue,
    startDate: string,
    endDate: string,
    totalDuration: number,
    createdAt: string,
    updatedAt: string,
    owner: string | null,
  } | null,
};

export type DeleteNightMutationVariables = {
  input: DeleteNightInput,
};

export type DeleteNightMutation = {
  deleteNight:  {
    __typename: "Night",
    id: string,
    userId: string,
    user:  {
      __typename: "User",
      connectionId: string | null,
      id: string,
      email: string,
      nickname: string | null,
      darkMode: boolean | null,
      intercomId: string | null,
      createdAt: string,
      updatedAt: string,
    },
    sourceId: string,
    sourceName: string,
    value: NightValue,
    startDate: string,
    endDate: string,
    totalDuration: number,
    createdAt: string,
    updatedAt: string,
    owner: string | null,
  } | null,
};

export type CreateLikedContentMutationVariables = {
  input: CreateLikedContentInput,
};

export type CreateLikedContentMutation = {
  createLikedContent:  {
    __typename: "LikedContent",
    id: string,
    name: string | null,
    type: string | null,
    slug: string | null,
    createdAt: string,
    updatedAt: string,
    owner: string | null,
  } | null,
};

export type UpdateLikedContentMutationVariables = {
  input: UpdateLikedContentInput,
};

export type UpdateLikedContentMutation = {
  updateLikedContent:  {
    __typename: "LikedContent",
    id: string,
    name: string | null,
    type: string | null,
    slug: string | null,
    createdAt: string,
    updatedAt: string,
    owner: string | null,
  } | null,
};

export type DeleteLikedContentMutationVariables = {
  input: DeleteLikedContentInput,
};

export type DeleteLikedContentMutation = {
  deleteLikedContent:  {
    __typename: "LikedContent",
    id: string,
    name: string | null,
    type: string | null,
    slug: string | null,
    createdAt: string,
    updatedAt: string,
    owner: string | null,
  } | null,
};

export type CreateNightRatingMutationVariables = {
  input: CreateNightRatingInput,
};

export type CreateNightRatingMutation = {
  createNightRating:  {
    __typename: "NightRating",
    id: string,
    userId: string,
    user:  {
      __typename: "User",
      connectionId: string | null,
      id: string,
      email: string,
      nickname: string | null,
      darkMode: boolean | null,
      intercomId: string | null,
      createdAt: string,
      updatedAt: string,
    },
    rating: number,
    date: string,
    createdAt: string,
    updatedAt: string,
    owner: string | null,
  } | null,
};

export type UpdateNightRatingMutationVariables = {
  input: UpdateNightRatingInput,
};

export type UpdateNightRatingMutation = {
  updateNightRating:  {
    __typename: "NightRating",
    id: string,
    userId: string,
    user:  {
      __typename: "User",
      connectionId: string | null,
      id: string,
      email: string,
      nickname: string | null,
      darkMode: boolean | null,
      intercomId: string | null,
      createdAt: string,
      updatedAt: string,
    },
    rating: number,
    date: string,
    createdAt: string,
    updatedAt: string,
    owner: string | null,
  } | null,
};

export type DeleteNightRatingMutationVariables = {
  input: DeleteNightRatingInput,
};

export type DeleteNightRatingMutation = {
  deleteNightRating:  {
    __typename: "NightRating",
    id: string,
    userId: string,
    user:  {
      __typename: "User",
      connectionId: string | null,
      id: string,
      email: string,
      nickname: string | null,
      darkMode: boolean | null,
      intercomId: string | null,
      createdAt: string,
      updatedAt: string,
    },
    rating: number,
    date: string,
    createdAt: string,
    updatedAt: string,
    owner: string | null,
  } | null,
};

export type CreateFeedbackContentMutationVariables = {
  input: CreateFeedbackContentInput,
};

export type CreateFeedbackContentMutation = {
  createFeedbackContent:  {
    __typename: "FeedbackContent",
    id: string | null,
    type: string | null,
    slug: string,
    rating: number,
    createdAt: string,
    updatedAt: string,
    owner: string | null,
  } | null,
};

export type UpdateFeedbackContentMutationVariables = {
  input: UpdateFeedbackContentInput,
};

export type UpdateFeedbackContentMutation = {
  updateFeedbackContent:  {
    __typename: "FeedbackContent",
    id: string | null,
    type: string | null,
    slug: string,
    rating: number,
    createdAt: string,
    updatedAt: string,
    owner: string | null,
  } | null,
};

export type DeleteFeedbackContentMutationVariables = {
  input: DeleteFeedbackContentInput,
};

export type DeleteFeedbackContentMutation = {
  deleteFeedbackContent:  {
    __typename: "FeedbackContent",
    id: string | null,
    type: string | null,
    slug: string,
    rating: number,
    createdAt: string,
    updatedAt: string,
    owner: string | null,
  } | null,
};

export type CreateCommentsMutationVariables = {
  input: CreateCommentsInput,
};

export type CreateCommentsMutation = {
  createComments:  {
    __typename: "Comments",
    id: string | null,
    type: string | null,
    slug: string,
    firstName: string | null,
    lastName: string | null,
    comment: string,
    createdAt: string,
    updatedAt: string,
    owner: string | null,
  } | null,
};

export type UpdateCommentsMutationVariables = {
  input: UpdateCommentsInput,
};

export type UpdateCommentsMutation = {
  updateComments:  {
    __typename: "Comments",
    id: string | null,
    type: string | null,
    slug: string,
    firstName: string | null,
    lastName: string | null,
    comment: string,
    createdAt: string,
    updatedAt: string,
    owner: string | null,
  } | null,
};

export type DeleteCommentsMutationVariables = {
  input: DeleteCommentsInput,
};

export type DeleteCommentsMutation = {
  deleteComments:  {
    __typename: "Comments",
    id: string | null,
    type: string | null,
    slug: string,
    firstName: string | null,
    lastName: string | null,
    comment: string,
    createdAt: string,
    updatedAt: string,
    owner: string | null,
  } | null,
};

export type CreateNightNoteMutationVariables = {
  input: CreateNightNoteInput,
};

export type CreateNightNoteMutation = {
  createNightNote:  {
    __typename: "NightNote",
    id: string,
    userId: string,
    user:  {
      __typename: "User",
      connectionId: string | null,
      id: string,
      email: string,
      nickname: string | null,
      darkMode: boolean | null,
      intercomId: string | null,
      createdAt: string,
      updatedAt: string,
    },
    date: string,
    dateTime: string,
    content: string,
    meta:  {
      __typename: "NightNoteMeta",
      tags: Array< string | null >,
    },
    createdAt: string,
    updatedAt: string,
    owner: string | null,
  } | null,
};

export type UpdateNightNoteMutationVariables = {
  input: UpdateNightNoteInput,
};

export type UpdateNightNoteMutation = {
  updateNightNote:  {
    __typename: "NightNote",
    id: string,
    userId: string,
    user:  {
      __typename: "User",
      connectionId: string | null,
      id: string,
      email: string,
      nickname: string | null,
      darkMode: boolean | null,
      intercomId: string | null,
      createdAt: string,
      updatedAt: string,
    },
    date: string,
    dateTime: string,
    content: string,
    meta:  {
      __typename: "NightNoteMeta",
      tags: Array< string | null >,
    },
    createdAt: string,
    updatedAt: string,
    owner: string | null,
  } | null,
};

export type DeleteNightNoteMutationVariables = {
  input: DeleteNightNoteInput,
};

export type DeleteNightNoteMutation = {
  deleteNightNote:  {
    __typename: "NightNote",
    id: string,
    userId: string,
    user:  {
      __typename: "User",
      connectionId: string | null,
      id: string,
      email: string,
      nickname: string | null,
      darkMode: boolean | null,
      intercomId: string | null,
      createdAt: string,
      updatedAt: string,
    },
    date: string,
    dateTime: string,
    content: string,
    meta:  {
      __typename: "NightNoteMeta",
      tags: Array< string | null >,
    },
    createdAt: string,
    updatedAt: string,
    owner: string | null,
  } | null,
};

export type GetSleepDataQueryVariables = {
  id: string,
};

export type GetSleepDataQuery = {
  getSleepData:  {
    __typename: "SleepData",
    id: string,
    userId: string,
    user:  {
      __typename: "User",
      connectionId: string | null,
      id: string,
      email: string,
      nickname: string | null,
      darkMode: boolean | null,
      intercomId: string | null,
      createdAt: string,
      updatedAt: string,
    },
    date: string,
    rating: number | null,
    night:  Array< {
      __typename: "NightSegment",
      value: string,
      sourceName: string,
      sourceId: string,
      startDate: string,
      endDate: string,
    } | null > | null,
    createdAt: string,
    updatedAt: string,
    owner: string | null,
  } | null,
};

export type ListSleepDatasQueryVariables = {
  filter?: ModelSleepDataFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListSleepDatasQuery = {
  listSleepDatas:  {
    __typename: "ModelSleepDataConnection",
    items:  Array< {
      __typename: "SleepData",
      id: string,
      userId: string,
      date: string,
      rating: number | null,
      createdAt: string,
      updatedAt: string,
      owner: string | null,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type GetRequestQueryVariables = {
  id: string,
};

export type GetRequestQuery = {
  getRequest:  {
    __typename: "Request",
    id: string,
    requesterName: string,
    requesterId: string,
    userName: string,
    userId: string,
    accepted: boolean,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListRequestsQueryVariables = {
  filter?: ModelRequestFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListRequestsQuery = {
  listRequests:  {
    __typename: "ModelRequestConnection",
    items:  Array< {
      __typename: "Request",
      id: string,
      requesterName: string,
      requesterId: string,
      userName: string,
      userId: string,
      accepted: boolean,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type GetUserQueryVariables = {
  id: string,
};

export type GetUserQuery = {
  getUser:  {
    __typename: "User",
    connectionId: string | null,
    id: string,
    email: string,
    nickname: string | null,
    darkMode: boolean | null,
    intercomId: string | null,
    activeCoaching:  {
      __typename: "CoachingData",
      id: string,
      userId: string,
      stage: Stage | null,
      activeWeek: string | null,
      started: string | null,
      ended: string | null,
      lessons: Array< string | null > | null,
      createdAt: string,
      updatedAt: string,
      owner: string | null,
    } | null,
    sleepPoints:  {
      __typename: "SleepPoints",
      efficiency: number | null,
      duration: number | null,
      socialJetLag: number | null,
      timing: number | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListUsersQueryVariables = {
  filter?: ModelUserFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListUsersQuery = {
  listUsers:  {
    __typename: "ModelUserConnection",
    items:  Array< {
      __typename: "User",
      connectionId: string | null,
      id: string,
      email: string,
      nickname: string | null,
      darkMode: boolean | null,
      intercomId: string | null,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type GetCoachingDataQueryVariables = {
  id: string,
};

export type GetCoachingDataQuery = {
  getCoachingData:  {
    __typename: "CoachingData",
    id: string,
    userId: string,
    user:  {
      __typename: "User",
      connectionId: string | null,
      id: string,
      email: string,
      nickname: string | null,
      darkMode: boolean | null,
      intercomId: string | null,
      createdAt: string,
      updatedAt: string,
    },
    stage: Stage | null,
    active:  {
      __typename: "User",
      connectionId: string | null,
      id: string,
      email: string,
      nickname: string | null,
      darkMode: boolean | null,
      intercomId: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    activeWeek: string | null,
    started: string | null,
    ended: string | null,
    weeks:  Array< {
      __typename: "Week",
      started: string | null,
      ended: string | null,
      locked: boolean | null,
      slug: string | null,
    } | null > | null,
    lessons: Array< string | null > | null,
    createdAt: string,
    updatedAt: string,
    owner: string | null,
  } | null,
};

export type ListCoachingDatasQueryVariables = {
  filter?: ModelCoachingDataFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListCoachingDatasQuery = {
  listCoachingDatas:  {
    __typename: "ModelCoachingDataConnection",
    items:  Array< {
      __typename: "CoachingData",
      id: string,
      userId: string,
      stage: Stage | null,
      activeWeek: string | null,
      started: string | null,
      ended: string | null,
      lessons: Array< string | null > | null,
      createdAt: string,
      updatedAt: string,
      owner: string | null,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type GetHabitQueryVariables = {
  id: string,
};

export type GetHabitQuery = {
  getHabit:  {
    __typename: "Habit",
    id: string,
    userId: string,
    user:  {
      __typename: "User",
      connectionId: string | null,
      id: string,
      email: string,
      nickname: string | null,
      darkMode: boolean | null,
      intercomId: string | null,
      createdAt: string,
      updatedAt: string,
    },
    dayStreak: number | null,
    longestDayStreak: number | null,
    latestCompletedDate: string | null,
    title: string,
    description: string | null,
    date: string,
    days:  Array< {
      __typename: "DayCompletionRecord",
      key: string | null,
      value: number | null,
    } | null >,
    archived: boolean | null,
    period: Period,
    createdAt: string,
    updatedAt: string,
    owner: string | null,
  } | null,
};

export type ListHabitsQueryVariables = {
  filter?: ModelHabitFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListHabitsQuery = {
  listHabits:  {
    __typename: "ModelHabitConnection",
    items:  Array< {
      __typename: "Habit",
      id: string,
      userId: string,
      dayStreak: number | null,
      longestDayStreak: number | null,
      latestCompletedDate: string | null,
      title: string,
      description: string | null,
      date: string,
      archived: boolean | null,
      period: Period,
      createdAt: string,
      updatedAt: string,
      owner: string | null,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type GetLikedContentQueryVariables = {
  id: string,
};

export type GetLikedContentQuery = {
  getLikedContent:  {
    __typename: "LikedContent",
    id: string,
    name: string | null,
    type: string | null,
    slug: string | null,
    createdAt: string,
    updatedAt: string,
    owner: string | null,
  } | null,
};

export type ListLikedContentsQueryVariables = {
  filter?: ModelLikedContentFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListLikedContentsQuery = {
  listLikedContents:  {
    __typename: "ModelLikedContentConnection",
    items:  Array< {
      __typename: "LikedContent",
      id: string,
      name: string | null,
      type: string | null,
      slug: string | null,
      createdAt: string,
      updatedAt: string,
      owner: string | null,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type GetNightRatingQueryVariables = {
  id: string,
};

export type GetNightRatingQuery = {
  getNightRating:  {
    __typename: "NightRating",
    id: string,
    userId: string,
    user:  {
      __typename: "User",
      connectionId: string | null,
      id: string,
      email: string,
      nickname: string | null,
      darkMode: boolean | null,
      intercomId: string | null,
      createdAt: string,
      updatedAt: string,
    },
    rating: number,
    date: string,
    createdAt: string,
    updatedAt: string,
    owner: string | null,
  } | null,
};

export type ListNightRatingsQueryVariables = {
  filter?: ModelNightRatingFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListNightRatingsQuery = {
  listNightRatings:  {
    __typename: "ModelNightRatingConnection",
    items:  Array< {
      __typename: "NightRating",
      id: string,
      userId: string,
      rating: number,
      date: string,
      createdAt: string,
      updatedAt: string,
      owner: string | null,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type GetFeedbackContentQueryVariables = {
  id: string,
};

export type GetFeedbackContentQuery = {
  getFeedbackContent:  {
    __typename: "FeedbackContent",
    id: string | null,
    type: string | null,
    slug: string,
    rating: number,
    createdAt: string,
    updatedAt: string,
    owner: string | null,
  } | null,
};

export type ListFeedbackContentsQueryVariables = {
  filter?: ModelFeedbackContentFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListFeedbackContentsQuery = {
  listFeedbackContents:  {
    __typename: "ModelFeedbackContentConnection",
    items:  Array< {
      __typename: "FeedbackContent",
      id: string | null,
      type: string | null,
      slug: string,
      rating: number,
      createdAt: string,
      updatedAt: string,
      owner: string | null,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type GetCommentsQueryVariables = {
  id: string,
};

export type GetCommentsQuery = {
  getComments:  {
    __typename: "Comments",
    id: string | null,
    type: string | null,
    slug: string,
    firstName: string | null,
    lastName: string | null,
    comment: string,
    createdAt: string,
    updatedAt: string,
    owner: string | null,
  } | null,
};

export type ListCommentssQueryVariables = {
  filter?: ModelCommentsFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListCommentssQuery = {
  listCommentss:  {
    __typename: "ModelCommentsConnection",
    items:  Array< {
      __typename: "Comments",
      id: string | null,
      type: string | null,
      slug: string,
      firstName: string | null,
      lastName: string | null,
      comment: string,
      createdAt: string,
      updatedAt: string,
      owner: string | null,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type GetNightNoteQueryVariables = {
  id: string,
};

export type GetNightNoteQuery = {
  getNightNote:  {
    __typename: "NightNote",
    id: string,
    userId: string,
    user:  {
      __typename: "User",
      connectionId: string | null,
      id: string,
      email: string,
      nickname: string | null,
      darkMode: boolean | null,
      intercomId: string | null,
      createdAt: string,
      updatedAt: string,
    },
    date: string,
    dateTime: string,
    content: string,
    meta:  {
      __typename: "NightNoteMeta",
      tags: Array< string | null >,
    },
    createdAt: string,
    updatedAt: string,
    owner: string | null,
  } | null,
};

export type ListNightNotesQueryVariables = {
  filter?: ModelNightNoteFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListNightNotesQuery = {
  listNightNotes:  {
    __typename: "ModelNightNoteConnection",
    items:  Array< {
      __typename: "NightNote",
      id: string,
      userId: string,
      date: string,
      dateTime: string,
      content: string,
      createdAt: string,
      updatedAt: string,
      owner: string | null,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type UserByConnectionIdQueryVariables = {
  connectionId?: string | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelUserFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type UserByConnectionIdQuery = {
  userByConnectionId:  {
    __typename: "ModelUserConnection",
    items:  Array< {
      __typename: "User",
      connectionId: string | null,
      id: string,
      email: string,
      nickname: string | null,
      darkMode: boolean | null,
      intercomId: string | null,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type CoachingByUserQueryVariables = {
  userId?: string | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelCoachingDataFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type CoachingByUserQuery = {
  coachingByUser:  {
    __typename: "ModelCoachingDataConnection",
    items:  Array< {
      __typename: "CoachingData",
      id: string,
      userId: string,
      stage: Stage | null,
      activeWeek: string | null,
      started: string | null,
      ended: string | null,
      lessons: Array< string | null > | null,
      createdAt: string,
      updatedAt: string,
      owner: string | null,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type LikedContentBySlugQueryVariables = {
  slug?: string | null,
  id?: ModelIDKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelLikedContentFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type LikedContentBySlugQuery = {
  likedContentBySlug:  {
    __typename: "ModelLikedContentConnection",
    items:  Array< {
      __typename: "LikedContent",
      id: string,
      name: string | null,
      type: string | null,
      slug: string | null,
      createdAt: string,
      updatedAt: string,
      owner: string | null,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type FeedbackContentBySlugQueryVariables = {
  slug?: string | null,
  id?: ModelStringKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelFeedbackContentFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type FeedbackContentBySlugQuery = {
  feedbackContentBySlug:  {
    __typename: "ModelFeedbackContentConnection",
    items:  Array< {
      __typename: "FeedbackContent",
      id: string | null,
      type: string | null,
      slug: string,
      rating: number,
      createdAt: string,
      updatedAt: string,
      owner: string | null,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type CommentsBySlugQueryVariables = {
  slug?: string | null,
  id?: ModelStringKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelCommentsFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type CommentsBySlugQuery = {
  commentsBySlug:  {
    __typename: "ModelCommentsConnection",
    items:  Array< {
      __typename: "Comments",
      id: string | null,
      type: string | null,
      slug: string,
      firstName: string | null,
      lastName: string | null,
      comment: string,
      createdAt: string,
      updatedAt: string,
      owner: string | null,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type GetNightQueryVariables = {
  id: string,
};

export type GetNightQuery = {
  getNight:  {
    __typename: "Night",
    id: string,
    userId: string,
    user:  {
      __typename: "User",
      connectionId: string | null,
      id: string,
      email: string,
      nickname: string | null,
      darkMode: boolean | null,
      intercomId: string | null,
      createdAt: string,
      updatedAt: string,
    },
    sourceId: string,
    sourceName: string,
    value: NightValue,
    startDate: string,
    endDate: string,
    totalDuration: number,
    createdAt: string,
    updatedAt: string,
    owner: string | null,
  } | null,
};

export type ListNightsQueryVariables = {
  filter?: ModelNightFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListNightsQuery = {
  listNights:  {
    __typename: "ModelNightConnection",
    items:  Array< {
      __typename: "Night",
      id: string,
      userId: string,
      sourceId: string,
      sourceName: string,
      value: NightValue,
      startDate: string,
      endDate: string,
      totalDuration: number,
      createdAt: string,
      updatedAt: string,
      owner: string | null,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type OnCreateSleepDataSubscriptionVariables = {
  owner: string,
};

export type OnCreateSleepDataSubscription = {
  onCreateSleepData:  {
    __typename: "SleepData",
    id: string,
    userId: string,
    user:  {
      __typename: "User",
      connectionId: string | null,
      id: string,
      email: string,
      nickname: string | null,
      darkMode: boolean | null,
      intercomId: string | null,
      createdAt: string,
      updatedAt: string,
    },
    date: string,
    rating: number | null,
    night:  Array< {
      __typename: "NightSegment",
      value: string,
      sourceName: string,
      sourceId: string,
      startDate: string,
      endDate: string,
    } | null > | null,
    createdAt: string,
    updatedAt: string,
    owner: string | null,
  } | null,
};

export type OnUpdateSleepDataSubscriptionVariables = {
  owner: string,
};

export type OnUpdateSleepDataSubscription = {
  onUpdateSleepData:  {
    __typename: "SleepData",
    id: string,
    userId: string,
    user:  {
      __typename: "User",
      connectionId: string | null,
      id: string,
      email: string,
      nickname: string | null,
      darkMode: boolean | null,
      intercomId: string | null,
      createdAt: string,
      updatedAt: string,
    },
    date: string,
    rating: number | null,
    night:  Array< {
      __typename: "NightSegment",
      value: string,
      sourceName: string,
      sourceId: string,
      startDate: string,
      endDate: string,
    } | null > | null,
    createdAt: string,
    updatedAt: string,
    owner: string | null,
  } | null,
};

export type OnDeleteSleepDataSubscriptionVariables = {
  owner: string,
};

export type OnDeleteSleepDataSubscription = {
  onDeleteSleepData:  {
    __typename: "SleepData",
    id: string,
    userId: string,
    user:  {
      __typename: "User",
      connectionId: string | null,
      id: string,
      email: string,
      nickname: string | null,
      darkMode: boolean | null,
      intercomId: string | null,
      createdAt: string,
      updatedAt: string,
    },
    date: string,
    rating: number | null,
    night:  Array< {
      __typename: "NightSegment",
      value: string,
      sourceName: string,
      sourceId: string,
      startDate: string,
      endDate: string,
    } | null > | null,
    createdAt: string,
    updatedAt: string,
    owner: string | null,
  } | null,
};

export type OnCreateRequestSubscription = {
  onCreateRequest:  {
    __typename: "Request",
    id: string,
    requesterName: string,
    requesterId: string,
    userName: string,
    userId: string,
    accepted: boolean,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateRequestSubscription = {
  onUpdateRequest:  {
    __typename: "Request",
    id: string,
    requesterName: string,
    requesterId: string,
    userName: string,
    userId: string,
    accepted: boolean,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteRequestSubscription = {
  onDeleteRequest:  {
    __typename: "Request",
    id: string,
    requesterName: string,
    requesterId: string,
    userName: string,
    userId: string,
    accepted: boolean,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateUserSubscription = {
  onCreateUser:  {
    __typename: "User",
    connectionId: string | null,
    id: string,
    email: string,
    nickname: string | null,
    darkMode: boolean | null,
    intercomId: string | null,
    activeCoaching:  {
      __typename: "CoachingData",
      id: string,
      userId: string,
      stage: Stage | null,
      activeWeek: string | null,
      started: string | null,
      ended: string | null,
      lessons: Array< string | null > | null,
      createdAt: string,
      updatedAt: string,
      owner: string | null,
    } | null,
    sleepPoints:  {
      __typename: "SleepPoints",
      efficiency: number | null,
      duration: number | null,
      socialJetLag: number | null,
      timing: number | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateUserSubscription = {
  onUpdateUser:  {
    __typename: "User",
    connectionId: string | null,
    id: string,
    email: string,
    nickname: string | null,
    darkMode: boolean | null,
    intercomId: string | null,
    activeCoaching:  {
      __typename: "CoachingData",
      id: string,
      userId: string,
      stage: Stage | null,
      activeWeek: string | null,
      started: string | null,
      ended: string | null,
      lessons: Array< string | null > | null,
      createdAt: string,
      updatedAt: string,
      owner: string | null,
    } | null,
    sleepPoints:  {
      __typename: "SleepPoints",
      efficiency: number | null,
      duration: number | null,
      socialJetLag: number | null,
      timing: number | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteUserSubscription = {
  onDeleteUser:  {
    __typename: "User",
    connectionId: string | null,
    id: string,
    email: string,
    nickname: string | null,
    darkMode: boolean | null,
    intercomId: string | null,
    activeCoaching:  {
      __typename: "CoachingData",
      id: string,
      userId: string,
      stage: Stage | null,
      activeWeek: string | null,
      started: string | null,
      ended: string | null,
      lessons: Array< string | null > | null,
      createdAt: string,
      updatedAt: string,
      owner: string | null,
    } | null,
    sleepPoints:  {
      __typename: "SleepPoints",
      efficiency: number | null,
      duration: number | null,
      socialJetLag: number | null,
      timing: number | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateCoachingDataSubscriptionVariables = {
  owner: string,
};

export type OnCreateCoachingDataSubscription = {
  onCreateCoachingData:  {
    __typename: "CoachingData",
    id: string,
    userId: string,
    user:  {
      __typename: "User",
      connectionId: string | null,
      id: string,
      email: string,
      nickname: string | null,
      darkMode: boolean | null,
      intercomId: string | null,
      createdAt: string,
      updatedAt: string,
    },
    stage: Stage | null,
    active:  {
      __typename: "User",
      connectionId: string | null,
      id: string,
      email: string,
      nickname: string | null,
      darkMode: boolean | null,
      intercomId: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    activeWeek: string | null,
    started: string | null,
    ended: string | null,
    weeks:  Array< {
      __typename: "Week",
      started: string | null,
      ended: string | null,
      locked: boolean | null,
      slug: string | null,
    } | null > | null,
    lessons: Array< string | null > | null,
    createdAt: string,
    updatedAt: string,
    owner: string | null,
  } | null,
};

export type OnUpdateCoachingDataSubscriptionVariables = {
  owner: string,
};

export type OnUpdateCoachingDataSubscription = {
  onUpdateCoachingData:  {
    __typename: "CoachingData",
    id: string,
    userId: string,
    user:  {
      __typename: "User",
      connectionId: string | null,
      id: string,
      email: string,
      nickname: string | null,
      darkMode: boolean | null,
      intercomId: string | null,
      createdAt: string,
      updatedAt: string,
    },
    stage: Stage | null,
    active:  {
      __typename: "User",
      connectionId: string | null,
      id: string,
      email: string,
      nickname: string | null,
      darkMode: boolean | null,
      intercomId: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    activeWeek: string | null,
    started: string | null,
    ended: string | null,
    weeks:  Array< {
      __typename: "Week",
      started: string | null,
      ended: string | null,
      locked: boolean | null,
      slug: string | null,
    } | null > | null,
    lessons: Array< string | null > | null,
    createdAt: string,
    updatedAt: string,
    owner: string | null,
  } | null,
};

export type OnDeleteCoachingDataSubscriptionVariables = {
  owner: string,
};

export type OnDeleteCoachingDataSubscription = {
  onDeleteCoachingData:  {
    __typename: "CoachingData",
    id: string,
    userId: string,
    user:  {
      __typename: "User",
      connectionId: string | null,
      id: string,
      email: string,
      nickname: string | null,
      darkMode: boolean | null,
      intercomId: string | null,
      createdAt: string,
      updatedAt: string,
    },
    stage: Stage | null,
    active:  {
      __typename: "User",
      connectionId: string | null,
      id: string,
      email: string,
      nickname: string | null,
      darkMode: boolean | null,
      intercomId: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    activeWeek: string | null,
    started: string | null,
    ended: string | null,
    weeks:  Array< {
      __typename: "Week",
      started: string | null,
      ended: string | null,
      locked: boolean | null,
      slug: string | null,
    } | null > | null,
    lessons: Array< string | null > | null,
    createdAt: string,
    updatedAt: string,
    owner: string | null,
  } | null,
};

export type OnCreateHabitSubscriptionVariables = {
  owner: string,
};

export type OnCreateHabitSubscription = {
  onCreateHabit:  {
    __typename: "Habit",
    id: string,
    userId: string,
    user:  {
      __typename: "User",
      connectionId: string | null,
      id: string,
      email: string,
      nickname: string | null,
      darkMode: boolean | null,
      intercomId: string | null,
      createdAt: string,
      updatedAt: string,
    },
    dayStreak: number | null,
    longestDayStreak: number | null,
    latestCompletedDate: string | null,
    title: string,
    description: string | null,
    date: string,
    days:  Array< {
      __typename: "DayCompletionRecord",
      key: string | null,
      value: number | null,
    } | null >,
    archived: boolean | null,
    period: Period,
    createdAt: string,
    updatedAt: string,
    owner: string | null,
  } | null,
};

export type OnUpdateHabitSubscriptionVariables = {
  owner: string,
};

export type OnUpdateHabitSubscription = {
  onUpdateHabit:  {
    __typename: "Habit",
    id: string,
    userId: string,
    user:  {
      __typename: "User",
      connectionId: string | null,
      id: string,
      email: string,
      nickname: string | null,
      darkMode: boolean | null,
      intercomId: string | null,
      createdAt: string,
      updatedAt: string,
    },
    dayStreak: number | null,
    longestDayStreak: number | null,
    latestCompletedDate: string | null,
    title: string,
    description: string | null,
    date: string,
    days:  Array< {
      __typename: "DayCompletionRecord",
      key: string | null,
      value: number | null,
    } | null >,
    archived: boolean | null,
    period: Period,
    createdAt: string,
    updatedAt: string,
    owner: string | null,
  } | null,
};

export type OnDeleteHabitSubscriptionVariables = {
  owner: string,
};

export type OnDeleteHabitSubscription = {
  onDeleteHabit:  {
    __typename: "Habit",
    id: string,
    userId: string,
    user:  {
      __typename: "User",
      connectionId: string | null,
      id: string,
      email: string,
      nickname: string | null,
      darkMode: boolean | null,
      intercomId: string | null,
      createdAt: string,
      updatedAt: string,
    },
    dayStreak: number | null,
    longestDayStreak: number | null,
    latestCompletedDate: string | null,
    title: string,
    description: string | null,
    date: string,
    days:  Array< {
      __typename: "DayCompletionRecord",
      key: string | null,
      value: number | null,
    } | null >,
    archived: boolean | null,
    period: Period,
    createdAt: string,
    updatedAt: string,
    owner: string | null,
  } | null,
};

export type OnCreateLikedContentSubscriptionVariables = {
  owner: string,
};

export type OnCreateLikedContentSubscription = {
  onCreateLikedContent:  {
    __typename: "LikedContent",
    id: string,
    name: string | null,
    type: string | null,
    slug: string | null,
    createdAt: string,
    updatedAt: string,
    owner: string | null,
  } | null,
};

export type OnUpdateLikedContentSubscriptionVariables = {
  owner: string,
};

export type OnUpdateLikedContentSubscription = {
  onUpdateLikedContent:  {
    __typename: "LikedContent",
    id: string,
    name: string | null,
    type: string | null,
    slug: string | null,
    createdAt: string,
    updatedAt: string,
    owner: string | null,
  } | null,
};

export type OnDeleteLikedContentSubscriptionVariables = {
  owner: string,
};

export type OnDeleteLikedContentSubscription = {
  onDeleteLikedContent:  {
    __typename: "LikedContent",
    id: string,
    name: string | null,
    type: string | null,
    slug: string | null,
    createdAt: string,
    updatedAt: string,
    owner: string | null,
  } | null,
};

export type OnCreateNightRatingSubscriptionVariables = {
  owner: string,
};

export type OnCreateNightRatingSubscription = {
  onCreateNightRating:  {
    __typename: "NightRating",
    id: string,
    userId: string,
    user:  {
      __typename: "User",
      connectionId: string | null,
      id: string,
      email: string,
      nickname: string | null,
      darkMode: boolean | null,
      intercomId: string | null,
      createdAt: string,
      updatedAt: string,
    },
    rating: number,
    date: string,
    createdAt: string,
    updatedAt: string,
    owner: string | null,
  } | null,
};

export type OnUpdateNightRatingSubscriptionVariables = {
  owner: string,
};

export type OnUpdateNightRatingSubscription = {
  onUpdateNightRating:  {
    __typename: "NightRating",
    id: string,
    userId: string,
    user:  {
      __typename: "User",
      connectionId: string | null,
      id: string,
      email: string,
      nickname: string | null,
      darkMode: boolean | null,
      intercomId: string | null,
      createdAt: string,
      updatedAt: string,
    },
    rating: number,
    date: string,
    createdAt: string,
    updatedAt: string,
    owner: string | null,
  } | null,
};

export type OnDeleteNightRatingSubscriptionVariables = {
  owner: string,
};

export type OnDeleteNightRatingSubscription = {
  onDeleteNightRating:  {
    __typename: "NightRating",
    id: string,
    userId: string,
    user:  {
      __typename: "User",
      connectionId: string | null,
      id: string,
      email: string,
      nickname: string | null,
      darkMode: boolean | null,
      intercomId: string | null,
      createdAt: string,
      updatedAt: string,
    },
    rating: number,
    date: string,
    createdAt: string,
    updatedAt: string,
    owner: string | null,
  } | null,
};

export type OnCreateFeedbackContentSubscriptionVariables = {
  owner: string,
};

export type OnCreateFeedbackContentSubscription = {
  onCreateFeedbackContent:  {
    __typename: "FeedbackContent",
    id: string | null,
    type: string | null,
    slug: string,
    rating: number,
    createdAt: string,
    updatedAt: string,
    owner: string | null,
  } | null,
};

export type OnUpdateFeedbackContentSubscriptionVariables = {
  owner: string,
};

export type OnUpdateFeedbackContentSubscription = {
  onUpdateFeedbackContent:  {
    __typename: "FeedbackContent",
    id: string | null,
    type: string | null,
    slug: string,
    rating: number,
    createdAt: string,
    updatedAt: string,
    owner: string | null,
  } | null,
};

export type OnDeleteFeedbackContentSubscriptionVariables = {
  owner: string,
};

export type OnDeleteFeedbackContentSubscription = {
  onDeleteFeedbackContent:  {
    __typename: "FeedbackContent",
    id: string | null,
    type: string | null,
    slug: string,
    rating: number,
    createdAt: string,
    updatedAt: string,
    owner: string | null,
  } | null,
};

export type OnCreateCommentsSubscriptionVariables = {
  owner: string,
};

export type OnCreateCommentsSubscription = {
  onCreateComments:  {
    __typename: "Comments",
    id: string | null,
    type: string | null,
    slug: string,
    firstName: string | null,
    lastName: string | null,
    comment: string,
    createdAt: string,
    updatedAt: string,
    owner: string | null,
  } | null,
};

export type OnUpdateCommentsSubscriptionVariables = {
  owner: string,
};

export type OnUpdateCommentsSubscription = {
  onUpdateComments:  {
    __typename: "Comments",
    id: string | null,
    type: string | null,
    slug: string,
    firstName: string | null,
    lastName: string | null,
    comment: string,
    createdAt: string,
    updatedAt: string,
    owner: string | null,
  } | null,
};

export type OnDeleteCommentsSubscriptionVariables = {
  owner: string,
};

export type OnDeleteCommentsSubscription = {
  onDeleteComments:  {
    __typename: "Comments",
    id: string | null,
    type: string | null,
    slug: string,
    firstName: string | null,
    lastName: string | null,
    comment: string,
    createdAt: string,
    updatedAt: string,
    owner: string | null,
  } | null,
};

export type OnCreateNightNoteSubscriptionVariables = {
  owner: string,
};

export type OnCreateNightNoteSubscription = {
  onCreateNightNote:  {
    __typename: "NightNote",
    id: string,
    userId: string,
    user:  {
      __typename: "User",
      connectionId: string | null,
      id: string,
      email: string,
      nickname: string | null,
      darkMode: boolean | null,
      intercomId: string | null,
      createdAt: string,
      updatedAt: string,
    },
    date: string,
    dateTime: string,
    content: string,
    meta:  {
      __typename: "NightNoteMeta",
      tags: Array< string | null >,
    },
    createdAt: string,
    updatedAt: string,
    owner: string | null,
  } | null,
};

export type OnUpdateNightNoteSubscriptionVariables = {
  owner: string,
};

export type OnUpdateNightNoteSubscription = {
  onUpdateNightNote:  {
    __typename: "NightNote",
    id: string,
    userId: string,
    user:  {
      __typename: "User",
      connectionId: string | null,
      id: string,
      email: string,
      nickname: string | null,
      darkMode: boolean | null,
      intercomId: string | null,
      createdAt: string,
      updatedAt: string,
    },
    date: string,
    dateTime: string,
    content: string,
    meta:  {
      __typename: "NightNoteMeta",
      tags: Array< string | null >,
    },
    createdAt: string,
    updatedAt: string,
    owner: string | null,
  } | null,
};

export type OnDeleteNightNoteSubscriptionVariables = {
  owner: string,
};

export type OnDeleteNightNoteSubscription = {
  onDeleteNightNote:  {
    __typename: "NightNote",
    id: string,
    userId: string,
    user:  {
      __typename: "User",
      connectionId: string | null,
      id: string,
      email: string,
      nickname: string | null,
      darkMode: boolean | null,
      intercomId: string | null,
      createdAt: string,
      updatedAt: string,
    },
    date: string,
    dateTime: string,
    content: string,
    meta:  {
      __typename: "NightNoteMeta",
      tags: Array< string | null >,
    },
    createdAt: string,
    updatedAt: string,
    owner: string | null,
  } | null,
};

export type OnCreateNightSubscriptionVariables = {
  owner?: string | null,
};

export type OnCreateNightSubscription = {
  onCreateNight:  {
    __typename: "Night",
    id: string,
    userId: string,
    user:  {
      __typename: "User",
      connectionId: string | null,
      id: string,
      email: string,
      nickname: string | null,
      darkMode: boolean | null,
      intercomId: string | null,
      createdAt: string,
      updatedAt: string,
    },
    sourceId: string,
    sourceName: string,
    value: NightValue,
    startDate: string,
    endDate: string,
    totalDuration: number,
    createdAt: string,
    updatedAt: string,
    owner: string | null,
  } | null,
};

export type OnUpdateNightSubscriptionVariables = {
  owner?: string | null,
};

export type OnUpdateNightSubscription = {
  onUpdateNight:  {
    __typename: "Night",
    id: string,
    userId: string,
    user:  {
      __typename: "User",
      connectionId: string | null,
      id: string,
      email: string,
      nickname: string | null,
      darkMode: boolean | null,
      intercomId: string | null,
      createdAt: string,
      updatedAt: string,
    },
    sourceId: string,
    sourceName: string,
    value: NightValue,
    startDate: string,
    endDate: string,
    totalDuration: number,
    createdAt: string,
    updatedAt: string,
    owner: string | null,
  } | null,
};

export type OnDeleteNightSubscriptionVariables = {
  owner?: string | null,
};

export type OnDeleteNightSubscription = {
  onDeleteNight:  {
    __typename: "Night",
    id: string,
    userId: string,
    user:  {
      __typename: "User",
      connectionId: string | null,
      id: string,
      email: string,
      nickname: string | null,
      darkMode: boolean | null,
      intercomId: string | null,
      createdAt: string,
      updatedAt: string,
    },
    sourceId: string,
    sourceName: string,
    value: NightValue,
    startDate: string,
    endDate: string,
    totalDuration: number,
    createdAt: string,
    updatedAt: string,
    owner: string | null,
  } | null,
};
