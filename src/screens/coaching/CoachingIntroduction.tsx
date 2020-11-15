import Copyright from '@components/CoachingSpecific/Copyright'
import TopHeader from '@components/CoachingSpecific/TopHeader'
import WeekViewHeader from '@components/CoachingSpecific/WeekViewHeader'
import LessonContent from '@components/Lesson/LessonContent'
import LessonCover from '@components/Lesson/LessonCover'
import { useIntroduction } from '@hooks/coaching/useContent'
import { StyleProps } from '@styles/themes'
import React, { FC, memo } from 'react'
import Animated from 'react-native-reanimated'
import styled from 'styled-components/native'

const yOffset = new Animated.Value(0)

const LessonView: FC = () => {
  const { data: introduction, isLoading } = useIntroduction()

  if (isLoading) return null

  return (
    <>
      <TopHeader yOffset={yOffset} title={introduction?.title} />
      <ScrollView
        onScroll={Animated.event([
          { nativeEvent: { contentOffset: { y: yOffset } } }
        ])}
        scrollEventThrottle={16}>
        <LessonCover yOffset={yOffset} cover={introduction?.cover} />
        <WeekViewHeader yOffset={yOffset} title={introduction?.title} />
        <LessonContent lessonContent={introduction?.content} />

        <Copyright />
      </ScrollView>
    </>
  )
}

export default memo(LessonView)

const ScrollView = styled(Animated.ScrollView).attrs(() => ({
  contentContainerStyle: {
    flexGrow: 1
  }
}))`
  background-color: ${(props: StyleProps) =>
    props.theme.PRIMARY_BACKGROUND_COLOR};
`
