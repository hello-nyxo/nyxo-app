import { toggleEditMode } from '@actions/manual-sleep/manual-sleep-actions'
import {
  getGoToSleepWindowEnd,
  getGoToSleepWindowStart
} from '@selectors/insight-selectors/Insights'
import { getEditMode } from '@selectors/ManualDataSelectors'
import { getSelectedDay } from '@selectors/SleepDataSelectors'
import React, { FC } from 'react'
import { Dimensions } from 'react-native'
import Animated from 'react-native-reanimated'
import Svg from 'react-native-svg'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components/native'
import colors from '../styles/colors'
import { Value } from 'Types/Sleepdata'
import AddNightButton from './clock/AddNightButton'
import ClockTimes from './clock/ClockTimes'
import Date from './clock/Date'
import FallAsleepWindow from './clock/FallAsleepWindow'
import InfoButton from './clock/InfoButton'
import MinuteSticks from './clock/MinuteSticks'
import NightRating from './clock/NightRating'
import SleepArc from './clock/SleepArc'
import SleepTime from './clock/SleepTime'
import Bedtime from './clock/Slider'
import TrackerName from './clock/TrackerName'
import AddNoteButton from './clock/AddNoteButton'

const { width } = Dimensions.get('window')
const clockSize = width - 40
const x: number = clockSize / 2
const y: number = x
const radius: number = clockSize / 2 - 10
const inBedRadius: number = clockSize / 2 - 15
const fallAsleepRadius: number = clockSize / 2 - 5

const Clock: FC = () => {
  const goToSleepWindowStart = useSelector(getGoToSleepWindowStart)
  const goToSleepWindowEnd = useSelector(getGoToSleepWindowEnd)
  const selectedDay = useSelector(getSelectedDay)
  const editMode = useSelector(getEditMode)
  const dispatch = useDispatch()

  const toggleEditNightMode = () => {
    dispatch(toggleEditMode())
  }

  const hasData = selectedDay.night ? selectedDay.night.length !== 0 : false

  return (
    <ClockContainer
      style={{
        height: clockSize + 15,
        width: clockSize + 15,
        position: 'relative'
      }}>
      <Svg width={clockSize} height={clockSize}>
        <MinuteSticks x={x} y={y} radius={radius} />
        <ClockTimes x={x} y={y} radius={radius} />
        <FallAsleepWindow
          goToSleepWindowStart={goToSleepWindowStart}
          goToSleepWindowEnd={goToSleepWindowEnd}
          x={x}
          y={y}
          radius={fallAsleepRadius}
        />
        <SleepArc
          day={selectedDay}
          value={Value.InBed}
          strokeWidth={12}
          color={colors.inBedColor}
          x={x}
          y={y}
          radius={inBedRadius}
        />
        <SleepArc
          day={selectedDay}
          value={Value.Awake}
          strokeWidth={8}
          color={colors.afternoonAccent}
          x={x}
          y={y}
          radius={inBedRadius}
        />
        <SleepArc
          day={selectedDay}
          value={Value.Asleep}
          strokeWidth={8}
          color={colors.radiantBlue}
          x={x}
          y={y}
          radius={inBedRadius}
        />
        <Date hasData={hasData} date={selectedDay.date} x={x} y={y} />
        <TrackerName x={x} y={y} />

        {!editMode && (
          <SleepTime
            y={y}
            x={x}
            hasData={hasData}
            timeInBed={selectedDay.inBedDuration}
            timeAsleep={selectedDay.asleepDuration}
            sleepStart={selectedDay.sleepStart}
            sleepEnd={selectedDay.sleepEnd}
            bedStart={selectedDay.bedStart}
            bedEnd={selectedDay.bedEnd}
          />
        )}
      </Svg>
      <NightRating day={selectedDay} x={x} />
      {editMode && (
        <Bedtime
          clockSize={clockSize}
          toggleEditMode={toggleEditNightMode}
          date={selectedDay.date}
        />
      )}
      <AddNightButton />
      <AddNoteButton />
      <InfoButton />
    </ClockContainer>
  )
}

export default Clock

const ClockContainer = styled(Animated.View)`
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.SECONDARY_BACKGROUND_COLOR};
  box-shadow: ${({ theme }) => theme.SHADOW};
  padding: 5px;
  border-radius: 7px;
  flex: 1;
  margin-top: 8px;
`
