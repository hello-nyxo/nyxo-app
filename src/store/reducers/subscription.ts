import Purchases, { PurchasesPackage } from 'react-native-purchases'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import CONFIG from '@config/config'

const key = CONFIG.SUBSCRIPTION_ENTITLEMENT_KEY as string

type State = {
  isActive: boolean
  expirationDate: string | undefined | null
  loading: 'idle' | 'pending' | 'succeeded' | 'failed'
}

const initialState: State = {
  isActive: false,
  expirationDate: undefined,
  loading: 'idle'
}

export const restorePurchase = createAsyncThunk<boolean>(
  'subscriptions/restore',
  async (_, { rejectWithValue }) => {
    const purchaserInfo = await Purchases.restoreTransactions()
    if (typeof purchaserInfo.entitlements.active[key] !== 'undefined') {
      return true
    }
    return rejectWithValue(false)
  }
)

export const updateSubscriptionStatus = createAsyncThunk(
  'subscriptions/update',
  async (_, { rejectWithValue }) => {
    const {
      entitlements: { active }
    } = await Purchases.getPurchaserInfo()
    if (typeof active[key] !== 'undefined') {
      //   const { expirationDate } = active[key]
      return true
    }
    return rejectWithValue(false)
  }
)

export const purchaseSubscription = createAsyncThunk(
  'subscriptions/purchase',
  async (subscription: PurchasesPackage | undefined, { rejectWithValue }) => {
    if (!subscription) {
      return rejectWithValue(false)
    }
    const { purchaserInfo } = await Purchases.purchasePackage(subscription)
    if (typeof purchaserInfo.entitlements.active[key] !== 'undefined') {
      const { isActive } = purchaserInfo.entitlements.active[key]

      return isActive
    }

    return rejectWithValue(false)
  }
)

const subscriptionSlice = createSlice({
  name: 'subscriptionSlice',
  initialState,
  reducers: {
    toggleSubscription: (state, action) => {
      state.isActive = action.payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(restorePurchase.fulfilled, (state, action) => {
      state.isActive = action.payload
    })
    builder.addCase(updateSubscriptionStatus.fulfilled, (state, action) => {
      state.isActive = action.payload
    })
    builder.addCase(purchaseSubscription.fulfilled, (state, action) => {
      state.isActive = action.payload
    })
  }
})

export const { toggleSubscription } = subscriptionSlice.actions

export default subscriptionSlice.reducer
