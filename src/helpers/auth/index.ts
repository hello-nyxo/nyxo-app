import { Auth } from 'aws-amplify'

export const isLoggedIn = async (): Promise<boolean> => {
  try {
    const { username } = await Auth.currentUserInfo()
    if (username) {
      return true
    }

    return false
  } catch (error) {
    return false
  }
}
