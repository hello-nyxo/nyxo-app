import Authors from '@components/CoachingSpecific/Authors'
import Copyright from '@components/CoachingSpecific/Copyright'
import TopHeader from '@components/CoachingSpecific/TopHeader'
import ExtraInfo from '@components/Lesson/ExtraInfo'
import LessonContent from '@components/Lesson/LessonContent'
import LessonCover from '@components/Lesson/LessonCover'
import ExampleHabitSection from '@components/LessonComponents/ExampleHabitSection'
import ReadingTime from '@components/LessonComponents/ReadingTime'
import Tags from '@components/LessonComponents/Tags'
import React, { FC } from 'react'
import Animated from 'react-native-reanimated'
import styled from 'styled-components/native'
import { RootStackParamList } from '@typings/navigation/navigation'
import { RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { getLesson, useLesson } from '@hooks/coaching/useLesson'
import {
  useGetActiveCoaching,
  useUpdateCoaching
} from '@hooks/coaching/useCoaching'
import { HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT } from '@helpers/Dimensions'
import { useScrollHandler } from 'react-native-redash/lib/module/v1'
import LinearGradient from 'react-native-linear-gradient'

export type WeekScreenRouteProp = RouteProp<RootStackParamList, 'Lesson'>
export type WeekScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Lesson'
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
  const { y: yOffset, scrollHandler } = useScrollHandler()
  const { data: lessons } = useLesson(slug)
  const { data } = useGetActiveCoaching()
  const [mutate] = useUpdateCoaching()

  const lesson = getLesson(lessons)
  // eslint-disable-next-line unused-imports/no-unused-vars-ts
  const completed = data?.lessons?.find((l) => l === slug)

  // eslint-disable-next-line unused-imports/no-unused-vars-ts
  const markCompleted = async () => {
    mutate({
      coaching: {
        id: data?.id as string,
        lessons: [...new Set([...(data?.lessons ? data?.lessons : []), slug])]
      }
    })
  }

  return (
    <LessonContainer>
      <TopHeader yOffset={yOffset} title={lesson?.lessonName} />
      <LessonCover
        title={lesson?.lessonName}
        yOffset={yOffset}
        cover={lesson?.cover?.url}
      />

      <ScrollView {...scrollHandler} scrollEventThrottle={1}>
        <Gradient />
        <Content>
          <ReadingTime
            content={lesson?.lessonContent?.json}
            habitCount={lesson?.habitCollection?.items?.length}
          />
          <Tags tags={lesson?.keywords} />
          <LessonContent
            lessonContent={lesson?.lessonContent?.json}
            assets={lesson?.lessonContent?.links?.assets}
          />
          <ExampleHabitSection habits={lesson?.habitCollection?.items} />
          <ExtraInfo
            additionalInformation={lesson?.additionalInformation?.json}
          />
          <Authors authorCards={lesson?.authorCardCollection?.items} />
          <Copyright />
        </Content>
      </ScrollView>
    </LessonContainer>
  )
}

export default LessonView

const ScrollView = styled(Animated.ScrollView).attrs(() => ({
  contentContainerStyle: {
    flexGrow: 1
  }
}))`
  padding-top: ${HEADER_MIN_HEIGHT}px;
`

const LessonContainer = styled.View`
  background-color: ${({ theme }) => theme.SECONDARY_BACKGROUND_COLOR};
  flex: 1;
`

const Content = styled.View`
  background-color: ${({ theme }) => theme.SECONDARY_BACKGROUND_COLOR};
`

const Gradient = styled(LinearGradient).attrs(({ theme }) => ({
  colors: theme.GRADIENT
}))`
  height: ${HEADER_MAX_HEIGHT}px;
`
