import NotificationCard from '@components/NotificationCenter/NotificationCard'
import React, { FC, memo } from 'react'

type Props = {
  discard: () => void
}

const HelpInfo: FC<Props> = ({ discard }) => {
  return (
    <NotificationCard
      title="NEED_HELP.TITLE"
      description="NEED_HELP.DESCRIPTION"
      closeFunction={discard}
      agreeFunction={discard}
    />
  )
}

export default memo(HelpInfo)
