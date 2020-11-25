import { toggleCalendarModal } from '@actions/modal/modal-actions'
import { fetchSleepData } from '@actions/night-cloud/night-cloud'
import { backgroundAction, startup } from '@actions/StartupActions'
import SleepTimeChart from '@components/Charts/SleepChart'
import Clock from '@components/Clock'
import DayStrip from '@components/DayStrip'
import { IconBold } from '@components/iconRegular'
import { EditNightHeader } from '@components/MainScreenSpecific/EditNightHeader'
import InitializeSource from '@components/MainScreenSpecific/InitializeSources'
import ExplanationsModal from '@components/modals/ExplanationsModal'
import EditHabitModal from '@components/modals/HabitModal/EditHabitModal'
import NewHabitModal from '@components/modals/HabitModal/NewHabitModal'
import MergeHabitsModal from '@components/modals/MergeHabitsModal/MergeHabitsModal'
import NotificationCenterLink from '@components/NotificationCenter/NotificationCenterLink'
import { SafeAreaView } from '@components/Primitives/Primitives'
import RatingModal from '@components/RatingModal'
import CalendarModal from '@components/sleep/CalendarModal'
import InsightsCard from '@components/sleep/InsightsCard'
import { OnboardingCard } from '@components/sleep/OnboardingCard'
import QuestionCard from '@components/sleep/QuestionCard'
import { getUserActiveCoaching } from '@hooks/coaching/useCoaching'
import useBackgroundFetch from '@hooks/UseBackgroundFetch'
import useNotificationEventHandlers from '@hooks/UseNotificationEventHandlers'
import { useFocusEffect } from '@react-navigation/core'
import { getSelectedDate } from '@selectors/calendar-selectors'
import { getHealthKitLoading } from '@selectors/health-kit-selectors/health-kit-selectors'
import { getEditMode } from '@selectors/ManualDataSelectors'
import { format } from 'date-fns'
import React, { FC, useCallback, useEffect } from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import { queryCache } from 'react-query'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components/native'

const Sleep: FC = () => {
  const dispatch = useDispatch()
  const date = useSelector(getSelectedDate)
  const editModeOn = useSelector(getEditMode)
  const isLoadingSleepData = useSelector(getHealthKitLoading)

  useNotificationEventHandlers()

  useEffect(() => {
    dispatch(startup())
    dispatch(fetchSleepData())
  }, [])

  useFocusEffect(
    useCallback(() => {
      async function preFetch() {
        await queryCache.prefetchQuery('userActiveCoaching', () =>
          getUserActiveCoaching()
        )
      }
      preFetch()
    }, [])
  )

  useBackgroundFetch(15, async () => {
    dispatch(backgroundAction())
  })

  const checkSleepData = async () => {
    await dispatch(fetchSleepData(date))
  }

  const toggleCalendar = () => {
    dispatch(toggleCalendarModal())
  }

  return (
    <SafeAreaView>
      <EditNightHeader />
      <ScrollView
        scrollEnabled={!editModeOn}
        refreshControl={
          <RefreshControl
            refreshing={isLoadingSleepData}
            onRefresh={checkSleepData}
          />
        }>
        <DayStrip />

        <TitleRow>
          <TitleContainer>
            <Title>{format(new Date(date), 'cccc')}</Title>
            <SubRow>
              <CalendarIcon />
              <Subtitle onPress={toggleCalendar}>
                {format(new Date(date), 'dd MMMM yyyy')}
              </Subtitle>
            </SubRow>
          </TitleContainer>
          {/* <NotificationCenterLink /> */}
        </TitleRow>
        <OnboardingCard />

        <Row>
          <Clock />
        </Row>

        <Row>
          <InsightsCard />
        </Row>
        {/* <Row>
          <QuestionCard />
        </Row> */}
        <SleepTimeChart />
      </ScrollView>

      <CalendarModal />

      <RatingModal />
      <ExplanationsModal />
      <NewHabitModal />
      <EditHabitModal />
      <MergeHabitsModal />
    </SafeAreaView>
  )
}

export default Sleep

const Row = styled.View`
  flex: 1;
  width: 100%;
  flex-direction: row;
  padding: 0px 16px;
`

const Title = styled.Text`
  text-transform: capitalize;
  font-family: ${({ theme }) => theme.FONT_MEDIUM};
  color: ${({ theme }) => theme.PRIMARY_TEXT_COLOR};
  font-size: 34px;
  margin-bottom: 5px;
`

const Subtitle = styled.Text`
  text-transform: capitalize;
  font-family: ${({ theme }) => theme.FONT_MEDIUM};
  font-size: 13px;
  color: ${({ theme }) => theme.SECONDARY_TEXT_COLOR};
`

const TitleRow = styled.View`
  padding: 16px;
  margin: 40px 0px 20px;
  flex-direction: row;
  justify-content: space-between;
`

const RefreshControl = styled.RefreshControl.attrs(({ theme }) => ({
  tintColor: theme.SECONDARY_TEXT_COLOR
}))``

const TitleContainer = styled.View``

const SubRow = styled.View`
  flex-direction: row;
  align-items: center;
`

const CalendarIcon = styled(IconBold).attrs(({ theme }) => ({
  name: 'calendar',
  height: 13,
  width: 13,
  fill: theme.SECONDARY_TEXT_COLOR
}))`
  margin-right: 4px;
`
