import { PrimaryButton } from '@components/Buttons/PrimaryButton'
import { IconBold } from '@components/iconRegular'
import TranslatedText from '@components/TranslatedText'
import { canEndCoaching } from '@helpers/coaching/coaching'
import { format } from 'date-fns/esm'
import React, { FC, memo } from 'react'
import styled from 'styled-components/native'
import { fonts } from '../../styles/themes'
import { PN } from '../Primitives/Primitives'

type Props = {
  intro: string
  description: string
  habitCount: number
  lessonCount: number
}

const WeekIntro: FC<Props> = ({
  intro,
  description,
  habitCount,
  lessonCount
}) => {
  return (
    <Container>
      <Card>
        <Intro>{intro}</Intro>
        <Information>
          {habitCount > 0 && (
            <>
              <HabitIcon />
              <Habits variables={{ count: habitCount }}>
                WEEK_VIEW.HABIT_COUNT
              </Habits>
            </>
          )}
          {lessonCount > 0 && (
            <>
              <LessonIcon />
              <Habits variables={{ count: lessonCount }}>
                WEEK_VIEW.LESSON_COUNT
              </Habits>
            </>
          )}
        </Information>
        <Description secondary>{description}</Description>
      </Card>
    </Container>
  )
}

export default memo(WeekIntro)

const Container = styled.View`
  background-color: ${({ theme }) => theme.PRIMARY_BACKGROUND_COLOR};
  border-radius: 8px;
`

const Description = styled(PN)`
  margin-bottom: 24px;
`

const Card = styled.View`
  box-shadow: ${({ theme }) => theme.SHADOW};
  border-radius: 8px;
  padding: 16px;
  margin: 16px;
  background-color: ${({ theme }) => theme.SECONDARY_BACKGROUND_COLOR};
`

const Intro = styled.Text`
  margin: 10px 0px 5px;
  color: ${({ theme }) => theme.SECONDARY_TEXT_COLOR};
  font-family: ${fonts.bold};
  font-size: 17px;
`

const Information = styled.View`
  flex-direction: row;
  padding: 10px 0px 5px;
`

const Habits = styled(TranslatedText)`
  font-size: 13px;
  margin-right: 10px;
  font-family: ${fonts.medium};
  color: ${({ theme }) => theme.PRIMARY_TEXT_COLOR};
`

const DurationRow = styled.View`
  flex-direction: row;
  padding: 10px 0px;
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

const LessonIcon = styled(IconBold).attrs(({ theme }) => ({
  height: 15,
  width: 15,
  fill: theme.SECONDARY_TEXT_COLOR,
  name: 'bookLamp'
}))`
  margin-right: 10px;
`

const HabitIcon = styled(IconBold).attrs(({ theme }) => ({
  height: 15,
  width: 15,
  fill: theme.SECONDARY_TEXT_COLOR,
  name: 'checklist'
}))`
  margin-right: 10px;
`
