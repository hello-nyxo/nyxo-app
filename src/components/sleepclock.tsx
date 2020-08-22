import React, { FC } from 'react'
import { Dimensions } from 'react-native'
import Animated from 'react-native-reanimated'
import Svg from 'react-native-svg'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components/native'
import { toggleEditMode } from '../actions/manual-sleep/manual-sleep-actions'
import {
  getGoToSleepWindowEnd,
  getGoToSleepWindowStart
} from '../store/Selectors/insight-selectors/Insights'
import { getEditMode } from '../store/Selectors/ManualDataSelectors'
import { getSelectedItem } from '../store/Selectors/SleepDataSelectors'
import { getIsDarkMode } from '../store/Selectors/UserSelectors'
import colors from '../styles/colors'
import { Day, Value } from '../Types/Sleepdata'
import ClockTimes from './sleepClock/clockTimes'
import CurvedEditButton from './sleepClock/CurvedEditButton'
import Date from './sleepClock/Date'
import FallAsleepWindow from './sleepClock/FallAsleepWindow'
import InfoButton from './sleepClock/InfoButton'
import MinuteSticks from './sleepClock/MinuteSticks'
import NightRating from './sleepClock/NightRating'
import SleepArc from './sleepClock/SleepArc'
import SleepTime from './sleepClock/SleepTime'
import Bedtime from './sleepClock/Slider'
import TrackerName from './sleepClock/TrackerName'

const { width } = Dimensions.get('window')
const clockSize = width - 40
const x: number = clockSize / 2
const y: number = x
const radius: number = clockSize / 2 - 10
const inBedRadius: number = clockSize / 2 - 15
const fallAsleepRadius: number = clockSize / 2 - 5

type Props = {
  selectedDay: Day
  shouldAnimate: boolean
}

const Clock: FC<Props> = ({ selectedDay, shouldAnimate }: Props) => {
  const goToSleepWindowStart = useSelector(getGoToSleepWindowStart)
  const goToSleepWindowEnd = useSelector(getGoToSleepWindowEnd)
  const selectedItem = useSelector(getSelectedItem)
  const editMode = useSelector(getEditMode)
  const dispatch = useDispatch()

  const toggleEditNightMode = () => {
    dispatch(toggleEditMode())
  }

  const hasData = selectedDay.night ? selectedDay.night.length !== 0 : false

  const isDarkMode = useSelector(getIsDarkMode)

  return (
    <ClockContainer style={{ height: clockSize + 15, width: clockSize + 15 }}>
      <Svg width={clockSize} height={clockSize}>
        <MinuteSticks x={x} y={y} radius={radius} />
        <ClockTimes x={x} y={y} radius={radius} shouldAnimate={shouldAnimate} />
        <FallAsleepWindow
          goToSleepWindowStart={goToSleepWindowStart}
          goToSleepWindowEnd={goToSleepWindowEnd}
          selected={Number(selectedItem) === 2}
          x={x}
          y={y}
          radius={fallAsleepRadius}
          darkTheme={isDarkMode}
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
        <Date
          hasData={hasData}
          date={selectedDay.date}
          x={x}
          y={y}
          darkTheme={isDarkMode}
        />
        <TrackerName x={x} y={y} radius={radius} darkTheme={isDarkMode} />

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

      <StyledSvg width={clockSize} height={clockSize}>
        {!editMode && (
          <CurvedEditButton
            hasData={hasData}
            darkMode={isDarkMode}
            toggleEdit={toggleEditNightMode}
            x={x}
            y={y}
            radius={radius}
          />
        )}
      </StyledSvg>
      <InfoButton />
    </ClockContainer>
  )
}

export default Clock

const ClockContainer = styled(Animated.View)`
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 300px;
  background-color: ${({ theme }) => theme.PRIMARY_BACKGROUND_COLOR};
  padding: 5px;
`

const StyledSvg = styled(Svg)`
  position: absolute;
`
