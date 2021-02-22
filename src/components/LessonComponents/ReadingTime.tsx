import { Document } from '@contentful/rich-text-types'
import React, { memo } from 'react'
import styled from 'styled-components/native'
import { getReadingTime } from '@helpers/reading-time'
import { fonts } from '@styles/themes'
import { IconBold } from '../iconRegular'
import TranslatedText from '../TranslatedText'

const ReadingTime = ({
  content,
  habitCount
}: {
  content?: Document
  habitCount?: number
}) => {
  if (!content) return null

  const time = getReadingTime(content)

  return (
    <Container>
      <StyledIcon name="clockBold" height={15} width={15} />
      <ReadTime variables={{ readingTime: time }}>
        {time === 1 ? 'READING_TIME.SINGULAR' : 'READING_TIME.PLURAL'}
      </ReadTime>
      {habitCount ? (
        <>
          <StyledIcon name="taskListEdit" height={15} width={15} />
          <HabitCount variables={{ habits: habitCount }}>
            {habitCount > 1 ? 'HABITS_COUNT' : 'HABIT_COUNT'}
          </HabitCount>
        </>
      ) : null}
    </Container>
  )
}

export default memo(ReadingTime)

const ReadTime = styled(TranslatedText)`
  margin: 0px 25px 0px 5px;
  font-family: ${fonts.medium};
  color: ${({ theme }) => theme.SECONDARY_TEXT_COLOR};
  font-size: 13px;
`

const HabitCount = styled(TranslatedText)`
  margin: 0px 5px 0px 5px;
  font-family: ${fonts.medium};
  color: ${({ theme }) => theme.SECONDARY_TEXT_COLOR};
  font-size: 13px;
`

const Container = styled.View`
  margin: 20px 20px 0px;
  align-items: center;
  padding: 10px;
  flex-direction: row;
  border-top-color: ${({ theme }) => theme.HAIRLINE_COLOR};
  border-top-width: 1px;
  border-bottom-color: ${({ theme }) => theme.HAIRLINE_COLOR};
  border-bottom-width: 1px;
`

const StyledIcon = styled(IconBold).attrs(({ theme }) => ({
  fill: theme.SECONDARY_TEXT_COLOR
}))``
