import NotificationCard from 'components/NotificationCenter/NotificationCard'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { askForPush } from '../../actions/NotificationActions'
import { actionCreators } from '../../store/Reducers/NotificationReducer'
import { getShouldAskForPermission } from '../../store/Selectors/NotificationSelectors'

const EnablePushCheck = () => {
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
