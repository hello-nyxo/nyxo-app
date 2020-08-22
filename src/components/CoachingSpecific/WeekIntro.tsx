import React, { memo } from 'react'
import styled from 'styled-components/native'
import TranslatedText from 'components/TranslatedText'
import { completeWeek } from '@actions/coaching/coaching-actions'
import { useDispatch } from 'react-redux'
import moment from 'moment'
import { PN } from '../Primitives/Primitives'
import { StyleProps, fonts, constants } from '../../styles/themes'

interface Props {
  intro: string
  description: string
  habitCount: number
  lessonCount: number
  started?: string
  ended?: string
}

const WeekIntro = ({
  intro,
  description,
  habitCount,
  lessonCount,
  started,
  ended
}: Props) => {
  const startTime = started ? moment(started).format('DD.MM.') : ''
  const endTime = ended ? moment(ended).format('DD.MM.') : ''

  return (
    <Container>
      <Intro>{intro}</Intro>
      <PN secondary>{description}</PN>
      <Information>
        <Habits variables={{ count: habitCount }}>WEEK_VIEW.HABIT_COUNT</Habits>
        {lessonCount > 0 && (
          <Habits variables={{ count: lessonCount }}>
            WEEK_VIEW.LESSON_COUNT
          </Habits>
        )}
      </Information>
      <DurationRow>
        {started && (
          <Started variables={{ started: startTime }}>
            WEEK_VIEW.START_DATE
          </Started>
        )}
        {ended && (
          <Ended variables={{ ended: endTime }}>WEEK_VIEW.END_DATE</Ended>
        )}
      </DurationRow>
    </Container>
  )
}

export default memo(WeekIntro)

const Container = styled.View`
  background-color: ${(props: StyleProps) =>
    props.theme.PRIMARY_BACKGROUND_COLOR};
  padding: 10px 20px 30px;
`

const Intro = styled.Text`
  margin: 10px 0px 5px;
  color: ${({ theme }) => theme.SECONDARY_TEXT_COLOR};
  font-family: ${fonts.bold};
  font-size: 17px;
`

const Information = styled.View`
  flex-direction: row;
  border-bottom-color: ${({ theme }) => theme.HAIRLINE_COLOR};
  padding: 10px 0px 5px;
  border-bottom-width: ${constants.hairlineWidth}px;
`

const Habits = styled(TranslatedText)`
  font-size: 13px;
  margin-right: 10px;
  font-family: ${fonts.medium};
  color: ${({ theme }) => theme.SECONDARY_TEXT_COLOR};
`

const DurationRow = styled.View`
  flex-direction: row;
  padding: 10px;
`

const Started = styled(TranslatedText)`
  font-size: 13px;
  margin-right: 10px;
  font-family: ${fonts.medium};
  color: ${({ theme }) => theme.SECONDARY_TEXT_COLOR};
`

const Ended = styled(TranslatedText)`
  font-size: 13px;
  margin-right: 10px;
  font-family: ${fonts.medium};
  color: ${({ theme }) => theme.SECONDARY_TEXT_COLOR};
`
