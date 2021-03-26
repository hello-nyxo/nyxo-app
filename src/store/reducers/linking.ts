import CONFIG from '@config/config'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { API, graphqlOperation } from '@aws-amplify/api'
import Auth from '@aws-amplify/auth'
import { updateConnectionId } from '@graphql/custom/mutations'

type State = {
  code: string | undefined | null
  loading: 'idle' | 'pending' | 'succeeded' | 'failed'
}

const initialState: State = {
  code: undefined,
  loading: 'idle'
}

export const linkAccount = createAsyncThunk(
  'linking/create',
  async (code: string, { rejectWithValue }) => {
    try {
      const { username } = await Auth.currentUserInfo()
      const codeIsValid = await validateLinkCode(code, username)

      if (codeIsValid) {
        await API.graphql(
          graphqlOperation(updateConnectionId, {
            input: { id: username, connectionId: code }
          })
        )
        return code
      } else {
        return rejectWithValue(undefined)
      }
    } catch (error) {
      return rejectWithValue(undefined)
    }
  }
)

export const removeLink = createAsyncThunk(
  'linking/remove',
  async (_, { rejectWithValue }) => {
    try {
      const { username } = await Auth.currentUserInfo()
      const input = {
        id: username,
        connectionId: null
      }
      await API.graphql(graphqlOperation(updateConnectionId, { input }))
      return undefined
    } catch (error) {
      return rejectWithValue(undefined)
    }
  }
)

const linkingSlice = createSlice({
  name: 'linkingSlice',
  initialState,
  reducers: {
    setLinkingCode: (state, action) => {
      state.code = action.payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(linkAccount.pending, (state) => {
      state.loading = 'pending'
    })
    builder.addCase(linkAccount.rejected, (state) => {
      state.loading = 'idle'
    })
    builder.addCase(
      linkAccount.fulfilled,
      (state, action: PayloadAction<string>) => {
        state.code = action.payload
        state.loading = 'idle'
      }
    )
    builder.addCase(
      removeLink.fulfilled,
      (state, action: PayloadAction<undefined>) => {
        state.code = action.payload
      }
    )
  }
})

export const { setLinkingCode } = linkingSlice.actions

export default linkingSlice.reducer

/* HELPERS  */
export const validateLinkCode = async (
  code: string,
  userId: string
): Promise<boolean> => {
  const configuration = {
    method: 'post',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Origin: ''
    },
    body: JSON.stringify({
      hashId: code,
      userId
    })
  }

  try {
    const response = await fetch(CONFIG.LINK_VALIDATION_URL, configuration)
    const { body } = await response.json()
    const { valid, check } = body

    if (valid && check >= 0 && check <= 9) {
      return true
    }
    return false
  } catch (error) {
    return false
  }
}
