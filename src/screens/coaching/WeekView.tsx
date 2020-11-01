import Copyright from '@components//CoachingSpecific/Copyright'
import TopHeader from '@components//CoachingSpecific/TopHeader'
import WeekCover from '@components//CoachingSpecific/Week.Cover'
import WeekIntro from '@components//CoachingSpecific/WeekIntro'
import WeekViewHeader from '@components//CoachingSpecific/WeekViewHeader'
import NewHabitModal from '@components//modals/HabitModal/NewHabitModal'
import { BGContainer, H2 } from '@components//Primitives/Primitives'
import { CombinedWeek } from '@selectors/coaching-selectors'
import { getActiveCoaching } from '@selectors/subscription-selectors/SubscriptionSelectors'
import {
  useUpdateCoaching,
  useGetActiveCoaching
} from '@hooks/coaching/useCoaching'
import { uniqBy } from 'lodash'
import React, { memo } from 'react'
import Animated from 'react-native-reanimated'
import { useSelector } from 'react-redux'
import styled from 'styled-components/native'
import Lessons from './Lessons'
import { WeekActions } from '@components/week/WeekActions'

const yOffset = new Animated.Value(0)

interface Props {
  route: any
}

const WeekView = ({ route }: Props) => {
  const { week }: { week: CombinedWeek } = route.params
  const hasCoaching = useSelector(getActiveCoaching)
  const [mutate] = useUpdateCoaching()
  const { data } = useGetActiveCoaching()

  const startWeek = () => {
    const startedWeek = {
      slug: week.slug,
      started: new Date().toISOString()
    }
    const weeks = data?.weeks?.filter((w) => w?.slug !== week.slug)

    mutate({
      coaching: {
        id: data?.id,
        activeWeek: week.slug,
        weeks: [...(weeks ?? []), startedWeek]
      }
    })
  }

  const endWeek = () => {
    const completedWeek = {
      slug: week.slug,
      started: new Date().toISOString(),
      ended: new Date().toISOString()
    }
    const weeks = data?.weeks?.filter((w) => w?.slug !== week.slug)
    mutate({
      coaching: {
        id: data?.id,
        activeWeek: week.slug,
        weeks: [...(weeks ?? []), completedWeek]
      }
    })
  }

  const activeWeek = data?.weeks?.find((w) => w?.slug === week.slug)

  return (
    <BGContainer>
      <WeekCover yOffset={yOffset} cover={week.coverPhoto} />
      <TopHeader yOffset={yOffset} title={week.weekName} />
      <Container>
        <Lessons
          onScroll={Animated.event([
            { nativeEvent: { contentOffset: { y: yOffset } } }
          ])}
          locked={false}
          header={
            <>
              <WeekViewHeader title={week.weekName} yOffset={yOffset} />
              <WeekActions
                started={activeWeek?.started}
                ended={activeWeek?.ended}
                isCurrentlyActive={week.slug === activeWeek?.slug}
                endWeek={endWeek}
                startWeek={startWeek}
              />
              <WeekIntro
                intro={week.intro}
                description={week.weekDescription}
                habitCount={week.habitCount}
                lessonCount={week.lessonCount}
              />
              <BGContainer>
                <H2>WEEK.LESSONS</H2>
              </BGContainer>
            </>
          }
          footer={<Copyright />}
        />
      </Container>
      <NewHabitModal />
    </BGContainer>
  )
}

export default memo(WeekView)

const Container = styled.View`
  margin-top: 30px;
`
