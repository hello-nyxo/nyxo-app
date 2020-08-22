import {
  OURA_AUTHORIZE_SUCCESS,
  OURA_UPDATE_TOKEN,
  OURA_REVOKE_SUCCESS,
  FETCH_SLEEP_OURA_START,
  FETCH_SLEEP_OURA_SUCCESS,
  FETCH_SLEEP_OURA_FAILURE
} from '@actions/api-actions/oura-actions'
import {
  WITHINGS_AUTHORIZE_SUCCESS,
  WITHINGS_REVOKE_SUCCESS,
  FETCH_SLEEP_WITHINGS_START,
  FETCH_SLEEP_WITHINGS_SUCCESS,
  FETCH_SLEEP_WITHINGS_FAILURE
} from '@actions/api-actions/withings-actions'
import {
  FETCH_SLEEP_FITBIT_FAILURE,
  FETCH_SLEEP_FITBIT_START,
  FETCH_SLEEP_FITBIT_SUCCESS,
  FITBIT_AUTHORIZE_SUCCESS,
  FITBIT_REVOKE_SUCCESS
} from '@actions/api-actions/fitbit-actions'
import {
  FETCH_GOOGLE_FIT_FAILURE,
  FETCH_GOOGLE_FIT_START,
  FETCH_GOOGLE_FIT_SUCCESS,
  GOOGLE_FIT_AUTHORIZE_SUCCESS,
  GOOGLE_FIT_REVOKE_SUCCESS,
  GOOGLE_FIT_UPDATE_TOKEN
} from '@actions/api-actions/google-fit-actions'
import ReduxAction from 'Types/ReduxActions'
import { ApiState } from 'Types/State/api-state'

export const initialState: ApiState = {
  loadingFitbit: false,
  loadingGoogleFit: false,
  loadingOura: false
}

const reducer = (state = initialState, action: ReduxAction): ApiState => {
  const { type, payload } = action

  switch (type) {
    case FITBIT_AUTHORIZE_SUCCESS: {
      return { ...state, fitbit: payload }
    }

    case FITBIT_REVOKE_SUCCESS: {
      const fitbit = state.fitbit && { ...state.fitbit, enabled: false }
      return { ...state, fitbit }
    }

    case GOOGLE_FIT_REVOKE_SUCCESS: {
      const googleFit = state.googleFit && {
        ...state.googleFit,
        enabled: false
      }
      return { ...state, googleFit }
    }

    case GOOGLE_FIT_AUTHORIZE_SUCCESS: {
      return { ...state, googleFit: payload }
    }

    case GOOGLE_FIT_UPDATE_TOKEN: {
      return { ...state, googleFit: payload }
    }

    case OURA_AUTHORIZE_SUCCESS:
      return { ...state, oura: payload }

    case OURA_UPDATE_TOKEN:
      return { ...state, oura: payload }

    case OURA_REVOKE_SUCCESS:
      const oura = state.oura && { ...state.oura, enabled: false }
      return { ...state, oura }
    case WITHINGS_AUTHORIZE_SUCCESS:
      return { ...state, withings: payload }

    case WITHINGS_REVOKE_SUCCESS:
      const withings = state.withings && { ...state.withings, enabled: false }
      return { ...state, withings }

    case FETCH_SLEEP_FITBIT_START:
      return { ...state, loadingFitbit: true }
    case FETCH_SLEEP_FITBIT_SUCCESS:
      return { ...state, loadingFitbit: false }
    case FETCH_SLEEP_FITBIT_FAILURE:
      return { ...state, loadingFitbit: false }

    case FETCH_GOOGLE_FIT_START:
      return { ...state, loadingGoogleFit: true }
    case FETCH_GOOGLE_FIT_SUCCESS:
      return { ...state, loadingGoogleFit: false }
    case FETCH_GOOGLE_FIT_FAILURE:
      return { ...state, loadingGoogleFit: false }

    case FETCH_SLEEP_OURA_START:
      return { ...state, loadingOura: true }

    case FETCH_SLEEP_OURA_SUCCESS:
      return { ...state, loadingOura: false }

    case FETCH_SLEEP_OURA_FAILURE:
      return { ...state, loadingOura: false }

    case FETCH_SLEEP_WITHINGS_START:
      return { ...state, loadingOura: true }

    case FETCH_SLEEP_WITHINGS_SUCCESS:
      return { ...state, loadingOura: false }

    case FETCH_SLEEP_WITHINGS_FAILURE:
      return { ...state, loadingOura: false }

    default:
      return state
  }
}

export default reducer
