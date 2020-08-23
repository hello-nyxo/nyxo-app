import {
  fetchSleepData,
  updateCalendar
} from 'actions/sleep/sleep-data-actions'
import { backgroundAction, startup } from 'actions/StartupActions'
import SleepTimeChart from 'components/Charts/sleepTimeChart'
import Clock from 'components/Clock'
import DayStrip from 'components/DayStrip'
import { EditNightHeader } from 'components/MainScreenSpecific/EditNightHeader'
import InitializeSource from 'components/MainScreenSpecific/InitializeSources'
import ExplanationsModal from 'components/modals/ExplanationsModal'
import EditHabitModal from 'components/modals/HabitModal/EditHabitModal'
import NewHabitModal from 'components/modals/HabitModal/NewHabitModal'
import MergeHabitsModal from 'components/modals/MergeHabitsModal/MergeHabitsModal'
import RatingModal from 'components/RatingModal'
import InsightsCard from 'components/sleep/InsightsCard'
import useBackgroundFetch from 'Hooks/UseBackgroundFetch'
import useNotificationEventHandlers from 'Hooks/UseNotificationEventHandlers'
import moment from 'moment'
import React, { FC, useEffect } from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import { useDispatch, useSelector } from 'react-redux'
import { getEditMode } from 'store/Selectors/ManualDataSelectors'
import { getSelectedDay } from 'store/Selectors/SleepDataSelectors'
import styled from 'styled-components/native'
import { SafeAreaView } from '../../components/Primitives/Primitives'

const Sleep: FC = () => {
  const today = useSelector(getSelectedDay)
  const editModeOn = useSelector(getEditMode)
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
        refreshControl={<RefreshControl onRefresh={checkSleepData} />}>
        <DayStrip />
        <TitleRow>
          <Title>{moment(today.date).format('dddd')}</Title>
          <Subtitle>{moment(today.date).format('DD MMMM yyyy')}</Subtitle>
        </TitleRow>

        <Row>
          <Clock />
        </Row>
        <Row>
          <InitializeSource />
        </Row>
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
  padding: 0px 8px;
`

const Title = styled.Text`
  text-transform: capitalize;
  font-family: ${({ theme }) => theme.FONT_MEDIUM};
  color: ${({ theme }) => theme.PRIMARY_TEXT_COLOR};
  font-size: 28px;
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
  margin-bottom: 20px;
`

const RefreshControl = styled.RefreshControl.attrs(({ theme }) => ({
  tintColor: theme.SECONDARY_TEXT_COLOR
}))``
