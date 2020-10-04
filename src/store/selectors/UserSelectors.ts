import { createSelector } from 'reselect'
import { darkTheme, lightTheme } from '../../styles/themes'
import { State } from '@typings/State'
import { UserState } from '@typings/UserState'

const getUserState = (state: State) => state.user

export const getIntroductionCompleted = createSelector(
  getUserState,
  (user: UserState) => user.introduction_completed
)

export const getIntercomId = createSelector(
  getUserState,
  (user: UserState) => user.intercomId
)

export const getLinkCode = createSelector(
  getUserState,
  (user: UserState) => user.connectionId
)

export const getTheme = createSelector(
  getUserState,
  (user: UserState) => user.appTheme
)

export const getIsDarkMode = createSelector(getUserState, (user: UserState) => {
  return user.appTheme ? user.appTheme.mode === 'dark' : false
})

export const getTextColorOnTheme = createSelector(
  getIsDarkMode,
  (isDarkMode: boolean) => {
    const color = isDarkMode
      ? darkTheme.PRIMARY_TEXT_COLOR
      : lightTheme.PRIMARY_TEXT_COLOR
    return color
  }
)

export const getEmail = createSelector(
  getUserState,
  (user: UserState) => user.email
)

export const getUsername = createSelector(
  getUserState,
  (user: UserState) => user.username
)

export const getSyncEnabled = createSelector(
  getUserState,
  (user: UserState) => user.syncEnabled
)
