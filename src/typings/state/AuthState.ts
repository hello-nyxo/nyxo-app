export interface AuthState {
  loading: boolean
  registerError?: string
  authenticated: boolean

  password?: string
  email?: string
}
