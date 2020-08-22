import { authorize, refresh, revoke } from 'react-native-app-auth'
import { GetState } from '../../Types/GetState'

const config = {}

export const authorizeSuunto = () => async (dispatch: Function) => {
  try {
    const response = await authorize(config)
    const { accessTokenExpirationDate, refreshToken, accessToken } = response
    // dispatch(
    //   googleFitAuthorizeSuccess({
    //     accessTokenExpirationDate,
    //     refreshToken,
    //     accessToken,
    //   })
    // );
    console.log(response)
  } catch (error) {
    console.log(error)
  }
}

export const refreshSuuntoToken = () => async (
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
      console.log('refreshGoogleFitToken', response)
    } catch (error) {}
  }
}

export const revokeSuuntoAccess = () => async (
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
