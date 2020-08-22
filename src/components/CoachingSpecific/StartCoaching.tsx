import {
  completeWeek,
  startCoachingMonth,
  startCoachingWeek
} from '@actions/coaching/coaching-actions'
import moment from 'moment'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  CombinedWeek,
  getNextWeek,
  getSelectedWeekCompleted,
  getSelectedWeekOngoing,
  WEEK_STAGE,
  getCoachingNotStarted
} from 'store/Selectors/coaching-selectors/coaching-selectors'
import styled from 'styled-components/native'
import { getActiveCoaching } from '../../store/Selectors/subscription-selectors/SubscriptionSelectors'
import { PrimaryButton } from '../Buttons/PrimaryButton'
import BuyCoachingButton from './BuyCoachingButton'
import WeekCompleted from './WeekCompleted'

type Props = {
  week: CombinedWeek
}

const StartCoaching = ({ week }: Props) => {
  const dispatch = useDispatch()
  const hasCoaching = useSelector(getActiveCoaching)
  const weekCompleted = useSelector(getSelectedWeekCompleted)
  const coachingNotStarted = useSelector(getCoachingNotStarted)
  const weekOngoing = useSelector(getSelectedWeekOngoing)
  const nextWeek = useSelector(getNextWeek)

  const startCoaching = () => {
    dispatch(startCoachingMonth({ ...week, started: moment().toISOString() }))
  }

  const startWeek = () => {
    dispatch(startCoachingWeek(week.slug))
  }

  const handleComplete = () => {
    dispatch(completeWeek(week.slug, nextWeek?.slug))
  }

  if (!hasCoaching) {
    return <BuyCoachingButton />
  }

  if (weekCompleted || weekOngoing) {
    return null
  }

  if (coachingNotStarted) {
    return (
      <FixedContainer>
        <PrimaryButton
          onPress={startCoaching}
          title="COACHING_VIEW.START_COACHING"
        />
      </FixedContainer>
    )
  }

  switch (week.stage) {
    case WEEK_STAGE.CAN_BE_COMPLETED:
      return (
        <FixedContainer>
          <PrimaryButton
            onPress={handleComplete}
            title="COACHING_VIEW.COMPLETE_WEEK"
          />
        </FixedContainer>
      )
    case WEEK_STAGE.CAN_BE_STARTED:
      return (
        <FixedContainer>
          <PrimaryButton onPress={startWeek} title="COACHING_VIEW.START_WEEK" />
        </FixedContainer>
      )

    case WEEK_STAGE.ONGOING:
      return null
    case WEEK_STAGE.COMPLETED:
      return <WeekCompleted />
    default:
      return null
  }
}

export default StartCoaching

const FixedContainer = styled.View`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 10px 20px;
`
