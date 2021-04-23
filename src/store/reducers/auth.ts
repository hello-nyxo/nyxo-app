import Auth from '@aws-amplify/auth'
import Purchases from 'react-native-purchases'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

type State = {
  loading: 'idle' | 'pending' | 'succeeded' | 'failed'
  authenticated: boolean
  password?: string
  email?: string
  error: null | string
}

const initialState: State = {
  authenticated: false,
  loading: 'idle',
  error: null
}

type Response = {
  authenticated: boolean
}

type Arguments = {
  email: string
  password: string
}

export const login = createAsyncThunk<Response, Arguments>(
  'auth/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const { username } = await Auth.signIn(email, password)
      await Purchases.identify(username)
      await Purchases.setEmail(email)

      return {
        authenticated: true,
        error: null
      }
    } catch (error) {
      return rejectWithValue({
        authenticated: false,
        error: 'Something went wrong'
      })
    }
  }
)

export const logout = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      await Auth.signOut()
      await Purchases.reset()
      return false
    } catch (error) {
      return rejectWithValue(undefined)
    }
  }
)

export const refreshAuthStatus = createAsyncThunk(
  'auth/refresh',
  async (_, { rejectWithValue }) => {
    try {
      const user = await Auth.currentUserInfo()
      if (user) {
        return true
      }
      return false
    } catch (error) {
      return rejectWithValue(false)
    }
  }
)

export const register = createAsyncThunk<Response, Arguments>(
  'auth/register',
  async ({ email, password }, { rejectWithValue, dispatch }) => {
    try {
      await Auth.signUp({
        username: email,
        password,
        attributes: { email }
      })
      dispatch(login({ email, password }))
      return {
        authenticated: false,
        error: null
      }
    } catch (error) {
      return rejectWithValue({
        authenticated: false,
        error: 'Something went wrong'
      })
    }
  }
)

const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Logout
    builder.addCase(logout.fulfilled, (state, action) => {
      state.authenticated = action.payload
      state.loading = 'succeeded'
    })
    builder.addCase(logout.pending, (state) => {
      state.loading = 'pending'
    })

    // Register
    builder.addCase(register.fulfilled, (state, action) => {
      state.authenticated = action.payload.authenticated
      state.loading = 'idle'
    })
    builder.addCase(register.pending, (state) => {
      state.loading = 'pending'
    })
    builder.addCase(register.rejected, (state) => {
      state.loading = 'idle'
    })

    // Login
    builder.addCase(login.fulfilled, (state, action) => {
      state.authenticated = action.payload.authenticated
      state.loading = 'idle'
    })
    builder.addCase(login.pending, (state) => {
      state.loading = 'pending'
    })
    builder.addCase(login.rejected, (state) => {
      state.authenticated = false
      state.loading = 'idle'
    })
  }
})

export default authSlice.reducer

// export const requestNewPassword = (username: string): AppThunk => async (
//     dispatch
//   ) => {
//     try {
//       await Auth.forgotPassword(username)
//     } catch (error) {
//       await dispatch(
//         notificationActions.newNotification({
//           message: JSON.stringify(error),
//           type: NotificationType.ERROR
//         })
//       )
//     }
//   }

//   export const submitNewPassword = (
//     username: string,
//     confirmationCode: string,
//     password: string
//   ): AppThunk => async (dispatch) => {
//     try {
//       await Auth.forgotPasswordSubmit(username, confirmationCode, password)
//     } catch (error) {
//       await dispatch(
//         notificationActions.newNotification({
//           message: JSON.stringify(error),
//           type: NotificationType.ERROR
//         })
//       )
//     }
//   }

//   export const refreshAuthStatus = (): AppThunk => async (dispatch) => {
//     dispatch(loginStart())
//     try {
//       const user = await Auth.currentUserInfo()
//       if (user) {
//         dispatch(loginSuccess(true, user.attributes.email, user.username))
//       } else {
//         dispatch(loginSuccess(false, '', ''))
//       }
//     } catch (error) {
//       dispatch(loginFailure(error))
//     }
//   }

// export const resendEmail = (username: string): AppThunk => async (dispatch) => {
//     try {
//       await Auth.resendSignUp(username)
//       await dispatch(
//         notificationActions.newNotification({
//           message: 'Confirmation email sent',
//           type: NotificationType.INFO
//         })
//       )
//     } catch (error) {
//       const message = error.message ? error.message : error

//       dispatch(
//         notificationActions.newNotification({
//           message,
//           type: NotificationType.ERROR
//         })
//       )
//     }
//   }
