import Copyright from '@components/CoachingSpecific/Copyright'
import TopHeader from '@components/CoachingSpecific/TopHeader'
import WeekViewHeader from '@components/CoachingSpecific/WeekViewHeader'
import LessonContent from '@components/Lesson/LessonContent'
import LessonCover from '@components/Lesson/LessonCover'
import { getLesson, useLesson } from '@hooks/coaching/useLesson'
import React, { FC } from 'react'
import Animated from 'react-native-reanimated'
import styled from 'styled-components/native'

const yOffset = new Animated.Value(0)

const IntroductionView: FC = () => {
  const { data, loading } = useLesson('introduction')
  const introduction = getLesson(data)

  if (loading) return null

  return (
    <>
      <TopHeader yOffset={yOffset} title={introduction?.lessonName} />
      <ScrollView
        onScroll={Animated.event([
          { nativeEvent: { contentOffset: { y: yOffset } } }
        ])}
        scrollEventThrottle={16}>
        <LessonCover yOffset={yOffset} cover={introduction?.cover?.url} />
        <WeekViewHeader
          loading={false}
          yOffset={yOffset}
          title={introduction?.lessonName}
        />
        <LessonContent
          lessonContent={introduction?.lessonContent?.json}
          assets={introduction?.lessonContent?.links?.assets}
        />

        <Copyright />
      </ScrollView>
    </>
  )
}

export default IntroductionView

const ScrollView = styled(Animated.ScrollView).attrs(() => ({
  contentContainerStyle: {
    flexGrow: 1
  }
}))`
  background-color: ${({ theme }) => theme.PRIMARY_BACKGROUND_COLOR};
`
