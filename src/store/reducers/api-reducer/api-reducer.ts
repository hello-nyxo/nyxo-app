import { ApiState } from '@typings/State/api-state'
import {
  FETCH_SLEEP_WITHINGS_FAILURE,
  FETCH_SLEEP_WITHINGS_START,
  FETCH_SLEEP_WITHINGS_SUCCESS,
  WITHINGS_AUTHORIZE_SUCCESS,
  WITHINGS_REVOKE_SUCCESS,
  WITHINGS_UPDATE_TOKEN,
  FETCH_SLEEP_POLAR_FAILURE,
  FETCH_SLEEP_POLAR_START,
  FETCH_SLEEP_POLAR_SUCCESS,
  POLAR_AUTHORIZE_SUCCESS,
  POLAR_REVOKE_SUCCESS,
  POLAR_UPDATE_TOKEN,
  FETCH_SLEEP_OURA_FAILURE,
  FETCH_SLEEP_OURA_START,
  FETCH_SLEEP_OURA_SUCCESS,
  OURA_AUTHORIZE_SUCCESS,
  OURA_REVOKE_SUCCESS,
  OURA_UPDATE_TOKEN,
  FETCH_GOOGLE_FIT_FAILURE,
  FETCH_GOOGLE_FIT_START,
  FETCH_GOOGLE_FIT_SUCCESS,
  GOOGLE_FIT_AUTHORIZE_SUCCESS,
  GOOGLE_FIT_REVOKE_SUCCESS,
  GOOGLE_FIT_UPDATE_TOKEN,
  FETCH_SLEEP_GARMIN_FAILURE,
  FETCH_SLEEP_GARMIN_START,
  FETCH_SLEEP_GARMIN_SUCCESS,
  GARMIN_AUTHORIZE_SUCCESS,
  GARMIN_REVOKE_SUCCESS,
  GARMIN_UPDATE_TOKEN,
  FETCH_SLEEP_FITBIT_FAILURE,
  FETCH_SLEEP_FITBIT_START,
  FETCH_SLEEP_FITBIT_SUCCESS,
  FITBIT_AUTHORIZE_SUCCESS,
  FITBIT_REVOKE_SUCCESS,
  FITBIT_UPDATE_TOKEN,
  ApiActions
} from '@actions/api-actions/types'

export const initialState: ApiState = {
  loadingFitbit: false,
  loadingGoogleFit: false,
  loadingOura: false,
  loadingGarmin: false,
  loadingWithings: false,
  loadingPolar: false
}

const reducer = (state = initialState, action: ApiActions): ApiState => {
  switch (action.type) {
    case FITBIT_AUTHORIZE_SUCCESS: {
      return { ...state, fitbit: action.payload }
    }

    case FITBIT_UPDATE_TOKEN:
      return { ...state, fitbit: action.payload }

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
      return { ...state, googleFit: action.payload }
    }

    case GOOGLE_FIT_UPDATE_TOKEN: {
      return { ...state, googleFit: action.payload }
    }

    case OURA_AUTHORIZE_SUCCESS:
      return { ...state, oura: action.payload }

    case OURA_UPDATE_TOKEN:
      return { ...state, oura: action.payload }

    case OURA_REVOKE_SUCCESS: {
      const oura = state.oura && { ...state.oura, enabled: false }
      return { ...state, oura }
    }

    case WITHINGS_AUTHORIZE_SUCCESS:
      return { ...state, withings: action.payload }

    case WITHINGS_UPDATE_TOKEN:
      return { ...state, withings: action.payload }

    case WITHINGS_REVOKE_SUCCESS: {
      const withings = state.withings && { ...state.withings, enabled: false }
      return { ...state, withings }
    }
    case GARMIN_AUTHORIZE_SUCCESS:
      return { ...state, garmin: action.payload }

    case GARMIN_UPDATE_TOKEN:
      return { ...state, garmin: action.payload }

    case GARMIN_REVOKE_SUCCESS: {
      const garmin = state.garmin && { ...state.garmin, enabled: false }
      return { ...state, garmin }
    }

    case POLAR_AUTHORIZE_SUCCESS:
      return { ...state, polar: action.payload }

    case POLAR_UPDATE_TOKEN:
      return { ...state, polar: action.payload }

    case POLAR_REVOKE_SUCCESS: {
      const polar = state.polar && { ...state.polar, enabled: false }
      return { ...state, polar }
    }
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
      return { ...state, loadingWithings: true }

    case FETCH_SLEEP_WITHINGS_SUCCESS:
      return { ...state, loadingWithings: false }

    case FETCH_SLEEP_WITHINGS_FAILURE:
      return { ...state, loadingWithings: false }

    case FETCH_SLEEP_GARMIN_START:
      return { ...state, loadingGarmin: true }

    case FETCH_SLEEP_GARMIN_SUCCESS:
      return { ...state, loadingGarmin: false }

    case FETCH_SLEEP_GARMIN_FAILURE:
      return { ...state, loadingGarmin: false }

    case FETCH_SLEEP_POLAR_START:
      return { ...state, loadingPolar: true }

    case FETCH_SLEEP_POLAR_SUCCESS:
      return { ...state, loadingPolar: false }

    case FETCH_SLEEP_POLAR_FAILURE:
      return { ...state, loadingPolar: false }

    default:
      return state
  }
}

export default reducer
