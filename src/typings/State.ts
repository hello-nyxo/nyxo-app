import { CalendarState } from '@reducers/calendar-reducer/calendar-reducer'
import { NightState } from '@reducers/night-reducer/night-reducer'
import { CoachingState } from '@typings/state/coaching-state'
import HealthKitState from '@typings/state/health-kit-state'
import { SleepSourceState } from '@typings/state/sleep-source-state'
import { ChallengeState } from './ChallengeState'
import { CoachingContentState } from './CoachingContentState'
import { CoachingNotificationState } from './CoachingNotificationState'
import { ModalState } from './ModalState'
import { NetworkState } from './NetworkState'
import { NotificationState } from './NotificationState'
import { OnboardingState } from './OnboardingState'
import { ApiState } from './State/api-state'
import { AuthState } from './State/AuthState'
import { HabitState } from './State/habit-state'
import { InsightState } from './State/insight-state'
import { LinkingState } from './State/linking-state'
import { ManualDataState } from './State/ManualDataState'
import { SubscriptionState } from './SubscriptionState'
import { TrackingState } from './TrackingState'
import { UserState } from './UserState'

export interface State {
  // User
  user: UserState

  // Application
  subscriptions: SubscriptionState
  onboarding: OnboardingState
  modals: ModalState
  notifications: NotificationState

  // Coaching
  coachingState: CoachingState
  coachingContent: CoachingContentState
  coachingNotification: CoachingNotificationState
  challenge: ChallengeState
  habitState: HabitState

  // Sleep data
  calendar: CalendarState

  sleepSources: SleepSourceState
  healthKit: HealthKitState
  insights: InsightState
  nights: NightState

  tracking: TrackingState
  manualData: ManualDataState
  apis: ApiState
  // network
  network: NetworkState
  auth: AuthState
  linking: LinkingState
}
