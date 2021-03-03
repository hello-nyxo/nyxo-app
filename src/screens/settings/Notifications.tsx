import { setNotification } from '@actions/notifications'
import { makeGetNotificationEnabled } from '@selectors/NotificationSelectors'
import React, { memo, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  NotificationPermissionType,
  UpdateNotificationPermissionType
} from '@typings/NotificationState'
import { State } from '@typings/State'
import GoBack, { GoBackContainer } from '@components/Buttons/GoBack'
import {
  Container,
  H2,
  P,
  SafeAreaView,
  StyledScrollView
} from '@components/Primitives/Primitives'
import NotificationRow from '@components/SettingsSpecific/NotificationRow'

export interface NotificationDataItemProps {
  enabled: boolean
  pressSwitch: (
    actionType: UpdateNotificationPermissionType,
    value: boolean
  ) => void
  title: NotificationPermissionType
  actionType: UpdateNotificationPermissionType
}

const NotificationSettings = () => {
  const dispatch = useDispatch()
  const selectGetNotificationEnabled = useMemo(makeGetNotificationEnabled, [])

  const bedtimeEnabled = useSelector((state: State) =>
    selectGetNotificationEnabled(
      state,
      NotificationPermissionType.BEDTIME_APPROACH_NOTIFICATION
    )
  )

  const coachingEnabled = useSelector((state: State) =>
    selectGetNotificationEnabled(
      state,
      NotificationPermissionType.COACHING_NEW_NOTIFICATION
    )
  )

  const customerSupportEnabled = useSelector((state: State) =>
    selectGetNotificationEnabled(
      state,
      NotificationPermissionType.CUSTOMER_SUPPORT_NOTIFICATION
    )
  )

  const pressSwitch = (
    actionType: UpdateNotificationPermissionType,
    value: boolean
  ) => {
    dispatch(setNotification(actionType, value))
  }

  const notificationData: NotificationDataItemProps[] = [
    {
      enabled: customerSupportEnabled,
      pressSwitch,
      title: NotificationPermissionType.CUSTOMER_SUPPORT_NOTIFICATION,
      actionType: UpdateNotificationPermissionType.CUSTOMER_SUPPORT_NOTIFICATION
    },
    {
      enabled: bedtimeEnabled,
      pressSwitch,
      title: NotificationPermissionType.BEDTIME_APPROACH_NOTIFICATION,
      actionType: UpdateNotificationPermissionType.BEDTIME_APPROACH_NOTIFICATION
    },
    {
      enabled: coachingEnabled,
      pressSwitch,
      title: NotificationPermissionType.COACHING_NEW_NOTIFICATION,
      actionType: UpdateNotificationPermissionType.COACHING_NEW_NOTIFICATION
    }
  ]

  return (
    <SafeAreaView>
      <StyledScrollView>
        <GoBackContainer>
          <GoBack />
        </GoBackContainer>

        <Container>
          <H2>CONTROL_NOTIFICATIONS</H2>
          <P>CONTROL_NOTIFICATIONS_DESCRIPTION</P>
        </Container>

        <Container>
          {notificationData.map((item: NotificationDataItemProps) => (
            <NotificationRow
              enabled={item.enabled}
              pressSwitch={item.pressSwitch}
              title={item.title}
              actionType={item.actionType}
              key={`notification-row-${item.title}}`}
            />
          ))}
        </Container>
      </StyledScrollView>
    </SafeAreaView>
  )
}

export default memo(NotificationSettings)
