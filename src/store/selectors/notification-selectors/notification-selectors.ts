import { createSelector } from 'reselect'
import { CoachingNotificationState } from '@typings/CoachingNotificationState'
import { State } from '@typings/State'
import { getShouldAskForPermission } from '../NotificationSelectors'
import { getIntercomNeedHelpRead } from '../OnboardingSelectors'

const getCoachingNotificationState = (state: State) =>
  state.coachingNotification

export const getLatestUncompleteLesson = createSelector(
  getCoachingNotificationState,
  (coachingNotification: CoachingNotificationState) =>
    coachingNotification.incompleteLessons[0]
)

export const getStaticNotificationsCount = createSelector(
  [getShouldAskForPermission, getIntercomNeedHelpRead],
  (askForNotificationPermission, intercomMessageRead) => {
    let count = 0
    if (askForNotificationPermission) count += 1
    if (!intercomMessageRead) count += 1
    return count
  }
)
