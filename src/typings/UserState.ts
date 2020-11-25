import { DefaultTheme } from 'styled-components'

export interface UserState {
  syncEnabled: boolean | null
  quickIntroCompleted: boolean | null
  appTheme: DefaultTheme
  connectionId?: string
  username: string | null
  email: string | null
  loggedIn: boolean | null
  intercomId: string | null
  authenticated?: boolean
}
