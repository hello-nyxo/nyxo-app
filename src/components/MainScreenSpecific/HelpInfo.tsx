import NotificationCard from 'components/NotificationCenter/NotificationCard'
import React, { memo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { markIntercomHelpAsRead } from '@actions/onboarding/onboarding-actions'
import { getIntercomNeedHelpRead } from '@selectors/OnboardingSelectors'

const HelpInfo = () => {
  const dispatch = useDispatch()
  const intercomNeedHelpRead = useSelector(getIntercomNeedHelpRead)

  const handlePress = () => {
    dispatch(markIntercomHelpAsRead())
  }

  if (intercomNeedHelpRead) {
    return null
  }

  return (
    <NotificationCard
      title="NEED_HELP.TITLE"
      description="NEED_HELP.DESCRIPTION"
      closeFunction={handlePress}
      agreeFunction={handlePress}
    />
  )
}

export default memo(HelpInfo)
