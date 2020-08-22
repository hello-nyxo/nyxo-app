import { ThemeProps } from '../styles/themes'

export interface UserState {
  syncEnabled: boolean | null
  introduction_completed: boolean | null
  quickIntroCompleted: boolean | null
  healthkit_enabled: boolean | null
  appTheme: ThemeProps
  connectionId?: string
  username: string | null
  email: string | null
  loggedIn: boolean | null
  intercomId: string | null
  authenticated?: boolean
}
