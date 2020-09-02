import {
  fetchSleepData,
  updateCalendar
} from '@actions/sleep/sleep-data-actions'
import { backgroundAction, startup } from '@actions/StartupActions'
import SleepTimeChart from '@components/Charts/SleepChart'
import Clock from '@components/Clock'
import DayStrip from '@components/DayStrip'
import { EditNightHeader } from '@components/MainScreenSpecific/EditNightHeader'
import InitializeSource from '@components/MainScreenSpecific/InitializeSources'
import ExplanationsModal from '@components/modals/ExplanationsModal'
import EditHabitModal from '@components/modals/HabitModal/EditHabitModal'
import NewHabitModal from '@components/modals/HabitModal/NewHabitModal'
import MergeHabitsModal from '@components/modals/MergeHabitsModal/MergeHabitsModal'
import NotificationCenterLink from '@components/NotificationCenter/NotificationCenterLink'
import { SafeAreaView } from '@components/Primitives/Primitives'
import RatingModal from '@components/RatingModal'
import InsightsCard from '@components/sleep/InsightsCard'
import useBackgroundFetch from '@hooks/UseBackgroundFetch'
import useNotificationEventHandlers from '@hooks/UseNotificationEventHandlers'
import { getHealthKitLoading } from '@selectors/health-kit-selectors/health-kit-selectors'
import { getEditMode } from '@selectors/ManualDataSelectors'
import { getSelectedDay } from '@selectors/SleepDataSelectors'
import moment from 'moment'
import React, { FC, useEffect } from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components/native'

const Sleep: FC = () => {
  const today = useSelector(getSelectedDay)
  const editModeOn = useSelector(getEditMode)
  const isLoadingSleepData = useSelector(getHealthKitLoading)

  const dispatch = useDispatch()

  useNotificationEventHandlers()

  useEffect(() => {
    dispatch(startup())
  }, [])

  useBackgroundFetch(15, async () => {
    dispatch(backgroundAction())
  })

  const checkSleepData = async () => {
    await dispatch(fetchSleepData())
    await dispatch(updateCalendar())
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
            <Title>{moment(today.date).format('dddd')}</Title>
            <Subtitle>{moment(today.date).format('DD MMMM yyyy')}</Subtitle>
          </TitleContainer>
          <NotificationCenterLink />
        </TitleRow>

        <Row>
          <Clock />
        </Row>
        <InitializeSource />
        <Row>
          <InsightsCard />
        </Row>
        <SleepTimeChart />
      </ScrollView>
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
