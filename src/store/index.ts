import serializeTransform from '@helpers/serializeTransform'
import AsyncStorage from '@react-native-community/async-storage'
import ApiReducer from '@reducers/api-reducer/api-reducer'
import AuthReducer from '@reducers/auth-reducer/auth-reducer'
import ChallengeReducer from '@reducers/challenges/challenge-reducer'
import CoachingReducer from '@reducers/coaching-reducer/coaching-reducer'
import ContentReducer from '@reducers/content-reducer/content-reducer'
import HabitReducer from '@reducers/habit-reducer/habit-reducer'
import InsightsReducer from '@reducers/insight-reducer/insight-reducer'
import LinkingReducer from '@reducers/linking/linking-reducer'
import ManualDataReducer from '@reducers/manual-sleep/manual-sleep-reducer'
import ModalReducer from '@reducers/modal/modal-reducer'
import NotificationReducer from '@reducers/NotificationReducer'
import CoachingNotificationReducer from '@reducers/notifications/coaching-notifications-reducer'
import OnboardingReducer from '@reducers/onboarding/onboarding-reducer'
import SleepSourceReducer from '@reducers/sleep-source-reducer/sleep-source-reducer'
import HealthKitReducer from '@reducers/sleep/health-kit-reducer'
import sleepclock from '@reducers/sleepclockReducer'
import SubscriptionReducer from '@reducers/subscription/subscription-reducer'
import user from '@reducers/user/user-reducer'
import NightQuality from '@reducers/sleep/night-quality-reducer'
import { enableES5, enableMapSet } from 'immer'
import { reducer as network } from 'react-native-offline'
import {
  applyMiddleware,
  combineReducers,
  compose,
  createStore,
  Reducer
} from 'redux'
import { batchDispatchMiddleware } from 'redux-batched-actions'
import {
  persistReducer,
  persistStore,
  StateReconciler,
  Transform
} from 'redux-persist'
import hardSet from 'redux-persist/lib/stateReconciler/hardSet'
import thunk from 'redux-thunk'
import { State } from 'Types/State'

enableES5()
enableMapSet()

function makePersisted(
  key: string,
  reducer: Reducer,
  reconciler: StateReconciler<State> | undefined,
  transforms: Transform<State, State>[] | undefined = undefined
) {
  return persistReducer(
    {
      key,
      storage: AsyncStorage,
      stateReconciler: reconciler,
      blacklist: [
        'signupError',
        'today',
        'habitModal',
        'loading',
        'mergingDialogDisplayed'
      ],
      timeout: 10000,
      transforms
    },
    reducer
  )
}

const rootReducer = combineReducers({
  network,
  user: makePersisted('user', user, hardSet),
  sleepclock: makePersisted('sleepclock', sleepclock, undefined),
  notifications: makePersisted('notifications', NotificationReducer, undefined),
  subscriptions: makePersisted('subscriptions', SubscriptionReducer, undefined),
  onboarding: makePersisted('onboarding', OnboardingReducer, undefined),
  coachingContent: makePersisted('coachingContent', ContentReducer, undefined),
  coachingState: makePersisted('coachingState', CoachingReducer, undefined),
  coachingNotification: makePersisted(
    'coachingNotification',
    CoachingNotificationReducer,
    undefined
  ),
  habitState: makePersisted('habitState', HabitReducer, undefined, [
    serializeTransform
  ]),

  apis: makePersisted('apis', ApiReducer, undefined),
  challenge: makePersisted('challenge', ChallengeReducer, undefined),
  manualData: ManualDataReducer,
  modals: ModalReducer,
  auth: makePersisted('auth', AuthReducer, undefined),
  linking: makePersisted('linking', LinkingReducer, undefined),
  sleepSources: makePersisted('sleepSources', SleepSourceReducer, undefined),
  healthKit: makePersisted('healthKit', HealthKitReducer, undefined),
  insights: makePersisted('insights', InsightsReducer, undefined),
  nightQuality: makePersisted('nightQuality', NightQuality, undefined, [
    serializeTransform
  ])
})

const middleware = applyMiddleware(thunk, batchDispatchMiddleware)
export const store = createStore(rootReducer, compose(middleware))
export const persistor = persistStore(store)
