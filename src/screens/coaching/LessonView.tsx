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
import { PrimaryButton } from '@components/Buttons/PrimaryButton'
import React, { FC } from 'react'
import { getBottomSpace, isIphoneX } from 'react-native-iphone-x-helper'
import Animated from 'react-native-reanimated'
import styled from 'styled-components/native'
import { RootStackParamList } from '@typings/navigation/navigation'
import { RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import ROUTE from '@config/routes/Routes'
import { useLesson } from '@hooks/coaching/useLesson'
import { useGetActiveCoaching, useUpdateCoaching } from '@hooks/coaching/useCoaching'

const yOffset = new Animated.Value(0)

export type WeekScreenRouteProp = RouteProp<RootStackParamList, ROUTE.LESSON>
export type WeekScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  ROUTE.LESSON
>

type Props = {
  route: WeekScreenRouteProp
  navigation: WeekScreenNavigationProp
}

const LessonView: FC<Props> = ({
  route: {
    params: { slug }
  }
}) => {
  const { data: lessons, loading, error } = useLesson(slug)
  const { data } = useGetActiveCoaching()
  const [mutate, { isLoading: completeLoading }] = useUpdateCoaching()

  const completed = data?.lessons?.find((l) => l === slug)

  const markCompleted = async () => {
    mutate({
      coaching: {
        id: data?.id as string,
        lessons: [...new Set([...(data?.lessons ? data?.lessons : []), slug])]
      }
    })
  }
  const lesson = lessons?.lessonCollection?.items[0]

  return (
    <>
      <TopHeader yOffset={yOffset} title={lesson?.lessonName} />
      <LessonCover yOffset={yOffset} cover={lesson?.cover.url} />

      <ScrollView
        onScroll={Animated.event([
          { nativeEvent: { contentOffset: { y: yOffset } } }
        ])}
        scrollEventThrottle={16}>
        <WeekViewHeader
          yOffset={yOffset}
          loading={loading}
          title={lesson?.lessonName}
        />
        <Authors authorCards={lesson?.authorCardCollection?.items} />
        <ReadingTime
          content={lesson?.lessonContent?.json}
          habitCount={lesson?.habitCollection?.items?.length}
        />
        <Tags tags={lesson?.keywords} />
        <LessonContent lessonContent={lesson?.lessonContent?.json} />
        <ExampleHabitSection habits={lesson?.habitCollection?.items} />
        <ExtraInfo additionalInformation={lesson?.lessonContent?.json} />
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

export default LessonView

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
  background-color: ${({ theme }) => theme.SECONDARY_BACKGROUND_COLOR};
`
