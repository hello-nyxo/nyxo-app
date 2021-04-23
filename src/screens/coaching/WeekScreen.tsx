import NewHabitModal from '@components//modals/HabitModal/NewHabitModal'
import { BGContainer, H2 } from '@components//Primitives/Primitives'
import BuyCoaching from '@components/CoachingSpecific/BuyCoachingButton'
import Copyright from '@components/CoachingSpecific/Copyright'
import TopHeader from '@components/CoachingSpecific/TopHeader'
import WeekIntro from '@components/CoachingSpecific/WeekIntro'
import LessonCover from '@components/Lesson/LessonCover'
import { WeekActions } from '@components/week/WeekActions'
import { HEADER_MAX_HEIGHT } from '@helpers/Dimensions'
import {
  useGetActiveCoaching,
  useUpdateCoaching
} from '@hooks/coaching/useCoaching'
import { useWeek } from '@hooks/coaching/useWeek'
import { useAppSelector } from '@hooks/redux'
import { RouteProp } from '@react-navigation/core'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParamList } from '@typings/navigation/navigation'
import React, { FC } from 'react'
import LinearGradient from 'react-native-linear-gradient'
import { useScrollHandler } from 'react-native-redash/lib/module/v1'
import styled from 'styled-components/native'
import Lessons from './Lessons'

export type WeekScreenRouteProp = RouteProp<RootStackParamList, 'Week'>
export type WeekScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Week'
>

type Props = {
  route: WeekScreenRouteProp
  navigation: WeekScreenNavigationProp
}

const WeekView: FC<Props> = ({
  route: {
    params: { slug }
  }
}) => {
  const { y: yOffset, scrollHandler } = useScrollHandler()
  const hasCoaching = useAppSelector((state) => state.subscription.isActive)

  /* Queries */
  const { data: weeks, loading: contentLoading } = useWeek(slug)
  const { data } = useGetActiveCoaching()
  const week = weeks?.coachingWeekCollection.items.find((w) => w.slug === slug)

  /* Mutations */
  const [mutate, { isLoading, isSuccess }] = useUpdateCoaching()

  const startWeek = () => {
    const startedWeek = {
      slug,
      started: new Date().toISOString()
    }
    const coachingWeeks = data?.weeks?.filter((w) => w?.slug !== slug)

    mutate({
      coaching: {
        id: `${data?.id}`,
        activeWeek: slug,
        weeks: [...(coachingWeeks ?? []), startedWeek]
      }
    })
  }

  const endWeek = () => {
    const completedWeek = {
      slug,
      started: new Date().toISOString(),
      ended: new Date().toISOString()
    }
    const coachingWeeks = data?.weeks?.filter((w) => w?.slug !== slug)
    mutate({
      coaching: {
        id: `${data?.id}`,
        activeWeek: slug,
        weeks: [...(coachingWeeks ?? []), completedWeek]
      }
    })
  }

  const activeWeek = data?.weeks?.find((w) => w?.slug === slug)

  return (
    <BGContainer>
      <Container>
        <LessonCover yOffset={yOffset} cover={week?.coverPhoto?.url ?? ''} />

        <Lessons
          slug={week?.slug}
          {...scrollHandler}
          locked={!hasCoaching}
          header={
            <>
              <Gradient />
              <Content />
              {hasCoaching ? (
                <WeekActions
                  started={activeWeek?.started}
                  ended={activeWeek?.ended}
                  isCurrentlyActive={slug === activeWeek?.slug}
                  endWeek={endWeek}
                  startWeek={startWeek}
                  isLoading={isLoading}
                  isSuccess={isSuccess}
                />
              ) : (
                <BuyCoachingContainer>
                  <BuyCoaching />
                </BuyCoachingContainer>
              )}

              <WeekIntro
                loading={contentLoading}
                intro={week?.intro ?? ''}
                description={week?.weekDescription.json ?? undefined}
                habitCount={week?.habitCount ?? 0}
                lessonCount={0}
              />

              <TitleContainer>
                <H2>WEEK.LESSONS</H2>
              </TitleContainer>
            </>
          }
          footer={<Copyright />}
        />
      </Container>
      <TopHeader yOffset={yOffset} title={week?.weekName ?? ''} />

      <NewHabitModal />
    </BGContainer>
  )
}

export default WeekView

const Container = styled.View``
const TitleContainer = styled.View`
  padding: 0px 20px;
  flex: 1;
  background-color: ${({ theme }) => theme.PRIMARY_BACKGROUND_COLOR};
`

const BuyCoachingContainer = styled.View`
  padding: 0px 20px;
  flex: 1;
  min-height: 100px;
  background-color: ${({ theme }) => theme.SECONDARY_BACKGROUND_COLOR};
`

const Content = styled.View`
  background-color: ${({ theme }) => theme.SECONDARY_BACKGROUND_COLOR};
`

const Gradient = styled(LinearGradient).attrs(({ theme }) => ({
  colors: theme.GRADIENT
}))`
  height: ${HEADER_MAX_HEIGHT}px;
`
