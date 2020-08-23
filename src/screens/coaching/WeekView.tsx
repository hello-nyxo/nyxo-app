import React, { memo } from 'react'
import Animated from 'react-native-reanimated'
import { useSelector } from 'react-redux'
import { CombinedWeek } from 'store/Selectors/coaching-selectors'
import styled from 'styled-components/native'
import Copyright from '../../components/CoachingSpecific/Copyright'
import StartCoaching from '../../components/CoachingSpecific/StartCoaching'
import TopHeader from '../../components/CoachingSpecific/TopHeader'
import WeekCover from '../../components/CoachingSpecific/Week.Cover'
import WeekIntro from '../../components/CoachingSpecific/WeekIntro'
import WeekViewHeader from '../../components/CoachingSpecific/WeekViewHeader'
import NewHabitModal from '../../components/modals/HabitModal/NewHabitModal'
import { BGContainer } from '../../components/Primitives/Primitives'
import { getActiveCoaching } from '../../store/Selectors/subscription-selectors/SubscriptionSelectors'
import Lessons from './Lessons'

const yOffset = new Animated.Value(0)

interface Props {
  route: any
}

const WeekView = ({ route }: Props) => {
  const { week }: { week: CombinedWeek } = route.params
  const hasCoaching = useSelector(getActiveCoaching)
  const locked = hasCoaching && week.locked !== undefined ? week.locked : true

  return (
    <BGContainer>
      <WeekCover yOffset={yOffset} cover={week.coverPhoto} />
      <TopHeader yOffset={yOffset} title={week.weekName} />
      <Container>
        <Lessons
          onScroll={Animated.event([
            { nativeEvent: { contentOffset: { y: yOffset } } }
          ])}
          locked={locked}
          useCurrentWeek={false}
          header={
            <>
              <WeekViewHeader title={week.weekName} yOffset={yOffset} />
              <WeekIntro
                intro={week.intro}
                description={week.weekDescription}
                habitCount={week.habitCount}
                lessonCount={week.lessonCount}
                started={week.started}
                ended={week.ended}
              />
            </>
          }
          footer={<Copyright />}
        />
      </Container>
      <NewHabitModal />
      <StartCoaching week={week} />
    </BGContainer>
  )
}

export default memo(WeekView)

const Container = styled.View`
  margin-top: 30px;
`
