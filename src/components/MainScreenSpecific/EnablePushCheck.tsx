import { getShouldAskForPermission } from '@selectors/NotificationSelectors'
import NotificationCard from '@components/NotificationCenter/NotificationCard'
import React, { FC } from 'react'
import { actionCreators } from '@reducers/NotificationReducer'
import { useAppDispatch, useAppSelector } from '@hooks/redux'

const EnablePushCheck: FC = () => {
  const show = useAppSelector(getShouldAskForPermission)
  const dispatch = useAppDispatch()

  if (!show) {
    return null
  }

  const allowPush = () => {
    // dispatch(askForPush())
  }

  const hidePushCheck = () => {
    dispatch(actionCreators.setShouldAskNotificationPermission(false))
  }

  return (
    <NotificationCard
      title="PUSH_NOTIFICATION.TITLE"
      description="PUSH_NOTIFICATION.DESCRIPTION"
      closeFunction={hidePushCheck}
      agreeFunction={allowPush}
      buttonText="PUSH_NOTIFICATION.AGREE"
    />
  )
}

export default EnablePushCheck
