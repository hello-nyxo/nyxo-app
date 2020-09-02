import { askForPush } from '@actions/notifications'
import { getShouldAskForPermission } from '@selectors/NotificationSelectors'
import NotificationCard from '@components/NotificationCenter/NotificationCard'
import React, { FC } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { actionCreators } from '@reducers/NotificationReducer'

const EnablePushCheck: FC = () => {
  const show = useSelector(getShouldAskForPermission)
  const dispatch = useDispatch()

  if (!show) {
    return null
  }

  const allowPush = () => {
    dispatch(askForPush())
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
