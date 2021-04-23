import NotificationCard from '@components/NotificationCenter/NotificationCard'
import React, { FC } from 'react'
import { useAppDispatch } from '@hooks/redux'

const EnablePushCheck: FC = () => {
  const show = false //FIXME
  const dispatch = useAppDispatch()

  if (!show) {
    return null
  }

  const allowPush = () => {
    // dispatch(askForPush())
  }

  const hidePushCheck = () => {}

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
