import { authorize, refresh, revoke } from 'react-native-app-auth'
import { GetState } from '../../Types/GetState'

const config = {
  clientId: '',
  clientSecret: '',
  redirectUrl: 'nyxo://callback',
  scopes: ['personal', 'daily'],
  useNonce: true,
  serviceConfiguration: {
    authorizationEndpoint:
      'https://connectapi.garmin.com/oauth-service/oauth/request_token',
    tokenEndpoint:
      'https://connectapi.garmin.com/oauth-service/oauth/request_token'
  }
}

export const authorizeGarmin = () => async (dispatch: Function) => {
  try {
    const response = await authorize(config)
  } catch (error) {
    console.warn(error)
  }
}

export const refreshGarminToken = () => async (
  dispatch: Function,
  getState: GetState
) => {
  const {
    apis: { googleFit }
  } = getState()
  if (googleFit) {
    const { refreshToken: oldToken } = googleFit
    try {
      const response = await refresh(config, { refreshToken: oldToken })
    } catch (error) {
      console.warn(error)
    }
  }
}

export const revokeGarminAccess = () => async (
  dispatch: Function,
  getState: GetState
) => {
  const {
    apis: { googleFit }
  } = getState()

  if (googleFit) {
    const { refreshToken: oldToken } = googleFit
    const response = await revoke(config, {
      tokenToRevoke: oldToken
    })
    console.log(response)
  }
}
