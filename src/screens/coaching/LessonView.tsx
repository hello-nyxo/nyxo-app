import Authors from '@components/CoachingSpecific/Authors'
import Copyright from '@components/CoachingSpecific/Copyright'
import TopHeader from '@components/CoachingSpecific/TopHeader'
import WeekViewHeader from '@components/CoachingSpecific/WeekViewHeader'
import ExtraInfo from '@components/Lesson/ExtraInfo'
import LessonContent from '@components/Lesson/LessonContent'
import LessonCover from '@components/Lesson/LessonCover'
import ExampleHabitSection from '@components/LessonComponents/ExampleHabitSection'
import ReadingTime from '@components/LessonComponents/ReadingTime'
import Tags from '@components/LessonComponents/Tags'
import {
  useGetActiveCoaching,
  useUpdateCoaching
} from '@hooks/coaching/useCoaching'
import {
  CombinedLesson,
  getContentForSelectedLesson
} from '@selectors/coaching-selectors/coaching-selectors'
import { PrimaryButton } from '@components/Buttons/PrimaryButton'
import React, { FC, memo, useState } from 'react'
import { LayoutChangeEvent } from 'react-native'
import { getBottomSpace, isIphoneX } from 'react-native-iphone-x-helper'
import Animated from 'react-native-reanimated'
import { useSelector } from 'react-redux'
import styled from 'styled-components/native'
import { StyleProps } from '../../styles/themes'

const yOffset = new Animated.Value(0)

const LessonView: FC = () => {
  const selectedLesson: CombinedLesson = useSelector(
    getContentForSelectedLesson
  )
  const {
    tags,
    cover = '',
    slug,
    exampleHabit,
    lessonName = '',
    additionalInformation,
    lessonContent,
    authorCards
  } = selectedLesson

  const { data } = useGetActiveCoaching()
  const [mutate, { isLoading: completeLoading }] = useUpdateCoaching()
  const completed = data?.lessons?.find((l) => l === slug)

  if (!selectedLesson) {
    return null
  }

  const markCompleted = async () => {
    mutate({
      coaching: {
        id: data?.id as string,
        lessons: [...new Set([...(data?.lessons ? data?.lessons : []), slug])]
      }
    })
  }

  return (
    <>
      <TopHeader yOffset={yOffset} title={lessonName} />
      <ScrollView
        onScroll={Animated.event([
          { nativeEvent: { contentOffset: { y: yOffset } } }
        ])}
        scrollEventThrottle={16}>
        <LessonCover yOffset={yOffset} cover={cover} />
        <WeekViewHeader yOffset={yOffset} title={lessonName} />
        <Authors authorCards={authorCards} />
        <ReadingTime
          content={lessonContent}
          habitCount={exampleHabit?.length}
        />
        <Tags tags={tags} />
        <LessonContent lessonContent={lessonContent} />
        <ExampleHabitSection habits={exampleHabit} />
        <ExtraInfo additionalInformation={additionalInformation} />
        <Copyright />
      </ScrollView>

      {completed ? null : (
        <ButtonContainer>
          <PrimaryButton
            onPress={markCompleted}
            title="COMPLETE"
            loading={completeLoading}
          />
        </ButtonContainer>
      )}
    </>
  )
}

export default memo(LessonView)

const ButtonContainer = styled.View`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding-top: 20px;
  padding-bottom: ${isIphoneX() ? getBottomSpace() : 20}px;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) =>
    theme.SECONDARY_BACKGROUND_COLOR_TRANSPARENT};
`

const ScrollView = styled(Animated.ScrollView).attrs(() => ({
  contentContainerStyle: {
    flexGrow: 1
  }
}))`
  background-color: ${(props: StyleProps) =>
    props.theme.PRIMARY_BACKGROUND_COLOR};
`
