import { CoachingState, CoachingState } from 'typings/state/coaching-state'
import HealthKitState from 'typings/state/health-kit-state'
import {
  SleepSourceState,
  SleepSourceState
} from 'typings/state/sleep-source-state'
import { ChallengeState, ChallengeState } from './ChallengeState'
import {
  CoachingContentState,
  CoachingContentState
} from './CoachingContentState'
import {
  CoachingNotificationState,
  CoachingNotificationState
} from './CoachingNotificationState'
import { MicroTaskState, MicroTaskState } from './Microtask'
import { ModalState, ModalState } from './ModalState'
import { NetworkState, NetworkState } from './NetworkState'
import { NotificationState, NotificationState } from './NotificationState'
import { OnboardingState, OnboardingState } from './OnboardingState'
import { SleepClockState, SleepClockState } from './SleepClockState'
import { ApiState, ApiState } from './State/api-state'
import { AuthState, AuthState } from './State/AuthState'
import { CalendarState, CalendarState } from './State/CalendarState'
import { HabitState } from './State/habit-state'
import { LinkingState, LinkingState } from './State/linking-state'
import { ManualDataState, ManualDataState } from './State/ManualDataState'
import SleepDataSourceState from './State/SleepDataSourceState'
import { SubscriptionState, SubscriptionState } from './SubscriptionState'
import { TrackingState, TrackingState } from './TrackingState'
import { UserState, UserState } from './UserState'

import { InsightState } from './State/insight-state'

import { NightNoteState } from './NightNoteState'

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
  microtask: MicroTaskState
  challenge: ChallengeState
  habitState: HabitState
  // Sleep data
  calendar: CalendarState
  sleepclock: SleepClockState
  sleepscore: any
  // heartRate: any;
  tracking: TrackingState
  manualData: ManualDataState
  sources: SleepDataSourceState
  apis: ApiState
  // network
  network: NetworkState
  auth: AuthState
  linking: LinkingState
  sleepSources: SleepSourceState
  healthKit: HealthKitState
  insights: InsightState

  nightNoteState: NightNoteState
}
