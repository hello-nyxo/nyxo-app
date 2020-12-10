import {
  handleHabitsFromCloudWhenLoggingIn,
  handleHabitsWhenloggingOut,
  toggleMergingDialog
} from '@actions/habit/habit-actions'
import Auth from '@aws-amplify/auth'
import { actionCreators as notificationActions } from '@reducers/NotificationReducer'
import translate from '@config/i18n'
import Purchases from 'react-native-purchases'
import { NotificationType } from '@typings/NotificationState'
import { AppThunk } from '@typings/redux-actions'
import Intercom from 'react-native-intercom'
import { areThereChangesInLocal } from '@helpers/habits'
import { updateSubscriptionStatus } from '@actions/subscription/subscription-actions'
import { updateEmail } from '../user/user-actions'
import {
  LOGIN_FAILURE,
  LOGIN_START,
  LOGIN_SUCCESS,
  LOGOUT_FAILURE,
  LOGOUT_START,
  LOGOUT_SUCCESS,
  REGISTER_FAILURE,
  REGISTER_START,
  REGISTER_SUCCESS,
  AuthActionTypes
} from './types'

export const registerStart = (): AuthActionTypes => ({
  type: REGISTER_START
})

export const registerSuccess = (email: string): AuthActionTypes => ({
  type: REGISTER_SUCCESS,
  payload: { email }
})

export const registerFailure = (error: string): AuthActionTypes => ({
  type: REGISTER_FAILURE,
  payload: error
})

export const loginStart = (): AuthActionTypes => ({
  type: LOGIN_START
})

export const loginSuccess = (
  authenticated: boolean,
  email: string,
  username: string
): AuthActionTypes => ({
  type: LOGIN_SUCCESS,
  payload: { authenticated, email, username }
})

export const loginFailure = (error: string): AuthActionTypes => ({
  type: LOGIN_FAILURE,
  payload: error
})

export const logoutStart = (): AuthActionTypes => ({
  type: LOGOUT_START
})

export const logoutSuccess = (): AuthActionTypes => ({
  type: LOGOUT_SUCCESS
})

export const logoutFailure = (error: string): AuthActionTypes => ({
  type: LOGOUT_FAILURE,
  payload: error
})

/* ASYNC ACTIONS */

export const register = (
  email: string,
  password: string,
  successCallback: void | (() => void)
): AppThunk => async (dispatch) => {
  dispatch(registerStart())
  try {
    const _ = await Auth.signUp({
      username: email,
      password,
      attributes: { email }
    })

    await dispatch(registerSuccess(email))
    await dispatch(login(email, password, successCallback))
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

    await dispatch(registerFailure(error))
  }
}

export const resendEmail = (username: string): AppThunk => async (dispatch) => {
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

export const login = (
  loginEmail: string,
  loginPassword: string,
  successCallback: void | (() => void)
): AppThunk => async (dispatch, getState) => {
  dispatch(loginStart())
  const {
    habitState: { habits, subHabits }
  } = getState()

  try {
    const {
      attributes: { email },
      username
    } = await Auth.signIn(loginEmail, loginPassword)

    await Intercom.updateUser({ email, user_id: username })
    await Purchases.identify(username)
    await Purchases.setEmail(email)

    if (areThereChangesInLocal(habits, subHabits)) {
      await dispatch(toggleMergingDialog(true))
    } else {
      await dispatch(handleHabitsFromCloudWhenLoggingIn(username, false))
    }

    await dispatch(loginSuccess(true, email, username))
    await dispatch(updateSubscriptionStatus())

    if (successCallback) {
      await successCallback()
    }
  } catch (error) {
    const { code } = error
    let message = 'Unknown error'

    switch (code) {
      case 'UserNotConfirmedException':
        await dispatch(updateEmail(loginEmail))
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
    await dispatch(loginFailure(error))
  }
}

export const logout = (): AppThunk => async (dispatch) => {
  dispatch(logoutStart())
  try {
    await dispatch(handleHabitsWhenloggingOut())
    await Auth.signOut()
    await Purchases.reset()
    await dispatch(logoutSuccess())
    await dispatch(updateSubscriptionStatus())
  } catch (error) {
    await dispatch(
      notificationActions.newNotification({
        message: JSON.stringify(error),
        type: NotificationType.ERROR
      })
    )
  }
}

export const requestNewPassword = (username: string): AppThunk => async (
  dispatch
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
): AppThunk => async (dispatch) => {
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

export const refreshAuthStatus = (): AppThunk => async (dispatch) => {
  dispatch(loginStart())
  try {
    const user = await Auth.currentUserInfo()
    if (user) {
      dispatch(loginSuccess(true, user.attributes.email, user.username))
    } else {
      dispatch(loginSuccess(false, '', ''))
    }
  } catch (error) {
    dispatch(loginFailure(error))
  }
}
