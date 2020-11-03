import {
  handleHabitsFromCloudWhenLoggingIn,
  handleHabitsWhenloggingOut,
  toggleMergingDialog
} from '@actions/habit/habit-actions'
import Auth from '@aws-amplify/auth'
import { actionCreators as notificationActions } from '@reducers/NotificationReducer'
import translate from '@config/i18n'
import * as NavigationService from '@config/NavigationHelper'
import ROUTE from '@config/routes/Routes'
import { areThereChangesInLocal } from '@helpers/habits'
import Intercom from 'react-native-intercom'
import Purchases from 'react-native-purchases'
import { GetState } from '@typings/GetState'
import { NotificationType } from '@typings/NotificationState'
import ReduxAction, { Dispatch, Thunk } from '@typings/redux-actions'
import { updateEmail } from '../user/user-actions'

/* ACTION TYPES */

export const REGISTER_START = 'REGISTER_START'
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS'
export const REGISTER_FAILURE = 'REGISTER_FAILURE'

export const LOGIN_START = 'LOGIN_START'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'

export const LOGOUT_START = 'LOGOUT_START'
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE'

/* ACTIONS */

export const registerStart = (): ReduxAction => ({
  type: REGISTER_START
})

export const registerSuccess = (email: string): ReduxAction => ({
  type: REGISTER_SUCCESS,
  payload: { email }
})

export const registerFailure = (): ReduxAction => ({
  type: REGISTER_FAILURE
})

export const loginStart = (): ReduxAction => ({
  type: LOGIN_START
})

export const loginSuccess = (
  authenticated: boolean,
  email: string,
  username: string
): ReduxAction => ({
  type: LOGIN_SUCCESS,
  payload: { authenticated, email, username }
})

export const loginFailure = (): ReduxAction => ({
  type: LOGIN_FAILURE
})

export const logoutStart = (): ReduxAction => ({
  type: LOGOUT_START
})

export const logoutSuccess = (): ReduxAction => ({
  type: LOGOUT_SUCCESS
})

export const logoutFailure = (): ReduxAction => ({
  type: LOGOUT_FAILURE
})

/* ASYNC ACTIONS */

export const register = (email: string, password: string): Thunk => async (
  dispatch: Dispatch
) => {
  dispatch(registerStart())
  try {
    const response = await Auth.signUp({
      username: email,
      password,
      attributes: { email }
    })

    await dispatch(registerSuccess(email))
    await dispatch(login(email, password))
  } catch (error) {
    let { message } = error
    if (error.code === 'UsernameExistsException') {
      message = translate('AUTH_ERROR.EMAIL_EXISTS_EXCEPTION')
    }

    await dispatch(
      notificationActions.newNotification({
        message,
        type: NotificationType.ERROR
      })
    )

    await dispatch(registerFailure())
  }
}

export const resendEmail = (username: string): Thunk => async (
  dispatch: Dispatch
) => {
  try {
    await Auth.resendSignUp(username)
    await dispatch(
      notificationActions.newNotification({
        message: 'Confirmation email sent',
        type: NotificationType.INFO
      })
    )
  } catch (error) {
    const message = error.message ? error.message : error

    dispatch(
      notificationActions.newNotification({
        message,
        type: NotificationType.ERROR
      })
    )
  }
}

export const confirmSignup = (email: string, authCode: string) => async (
  dispatch: Dispatch
) => {
  const username = email
  try {
    const response = await Auth.confirmSignUp(username, authCode)
  } catch (error) {}
}

export const login = (
  loginEmail: string,
  loginPassword: string
): Thunk => async (dispatch: Dispatch, getState: GetState) => {
  dispatch(loginStart())

  try {
    const {
      attributes: { email },
      username
    } = await Auth.signIn(loginEmail, loginPassword)

    const {
      habitState: { habits, subHabits }
    } = getState()

    await Intercom.updateUser({ email, user_id: username })
    await Purchases.identify(username)
    await Purchases.setEmail(email)
    await NavigationService.navigate(ROUTE.SLEEP, {})

    if (areThereChangesInLocal(habits, subHabits)) {
      await dispatch(toggleMergingDialog(true))
    } else {
      await dispatch(handleHabitsFromCloudWhenLoggingIn(username, false))
      await NavigationService.navigate(ROUTE.SLEEP, {})
    }

    await dispatch(loginSuccess(true, email, username))
  } catch (error) {
    console.warn(error)
    const { code } = error
    let message = 'Unknown error'

    switch (code) {
      case 'UserNotConfirmedException':
        await dispatch(updateEmail(loginEmail))
        NavigationService.navigate(ROUTE.CONFIRM, {})
        break
      case 'UserNotFoundException':
        message = translate('AUTH_ERROR.USER_NOT_EXIST_EXCEPTION')
        break
      case 'NotAuthorizedException':
        message = translate('AUTH_ERROR.INVALID_PASSWORD_EXCEPTION')
        break
      default:
        break
    }

    await dispatch(
      notificationActions.newNotification({
        message,
        type: NotificationType.ERROR
      })
    )
    await dispatch(loginFailure())
  }
}

export const logout = (): Thunk => async (dispatch: Dispatch) => {
  dispatch(logoutStart())
  try {
    await dispatch(handleHabitsWhenloggingOut())
    await Auth.signOut()
    await Purchases.reset()
    await dispatch(logoutSuccess())
  } catch (error) {
    await dispatch(
      notificationActions.newNotification({
        message: JSON.stringify(error),
        type: NotificationType.ERROR
      })
    )
  }
}

export const requestNewPassword = (username: string) => async (
  dispatch: Function
) => {
  try {
    const forgotRes = await Auth.forgotPassword(username)
  } catch (error) {
    await dispatch(
      notificationActions.newNotification({
        message: JSON.stringify(error),
        type: NotificationType.ERROR
      })
    )
  }
}

export const submitNewPassword = (
  username: string,
  confirmationCode: string,
  password: string
) => async (dispatch: Function) => {
  try {
    const res = await Auth.forgotPasswordSubmit(
      username,
      confirmationCode,
      password
    )
  } catch (error) {
    await dispatch(
      notificationActions.newNotification({
        message: JSON.stringify(error),
        type: NotificationType.ERROR
      })
    )
  }
}

export const updatePassword = (
  oldPassword: string,
  newPassword: string
) => async (dispatch: Function) => {
  await Auth.currentAuthenticatedUser()
    .then((user) => Auth.changePassword(user, oldPassword, newPassword))
    .then((data) => {})
    .catch((err) => {})
}

export const updateUserAttributes = async (attributes: {}) => {
  await Auth.currentAuthenticatedUser()
    .then((user) => Auth.updateUserAttributes(user, attributes))
    .then((data) => {})
    .catch((err) => {})
}

export const refreshAuthStatus = () => async (dispatch: Function) => {
  dispatch(loginStart())
  try {
    const user = await Auth.currentUserInfo()
    if (user) {
      dispatch(loginSuccess(true, user.attributes.email, user.username))
    } else {
      dispatch(loginSuccess(false, '', ''))
    }
  } catch (error) {
    dispatch(loginFailure())
  }
}
