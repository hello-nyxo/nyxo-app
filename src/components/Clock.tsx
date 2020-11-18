import { toggleEditMode } from '@actions/manual-sleep/manual-sleep-actions'
import useSleep from '@hooks/useSleep'
import { getSelectedDate } from '@selectors/calendar-selectors'
import { getEditMode } from '@selectors/ManualDataSelectors'
import React, { FC, memo } from 'react'
import { Dimensions } from 'react-native'
import Svg from 'react-native-svg'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components/native'
import { Value } from '@typings/Sleepdata'
import colors from '../styles/colors'
import AddNightButton from './clock/AddNightButton'
import ClockTimes from './clock/ClockTimes'
import FallAsleepWindow from './clock/FallAsleepWindow'
import InfoButton from './clock/InfoButton'
import MinuteSticks from './clock/MinuteSticks'
import SleepArc from './clock/SleepArc'
import SleepTime from './clock/SleepTime'
import Bedtime from './clock/Slider'
import TrackerName from './clock/TrackerName'
import TranslatedText from './TranslatedText'

const { width } = Dimensions.get('window')
const clockSize = width - 40
const x: number = clockSize / 2
const y: number = x
const radius: number = clockSize / 2 - 10
const inBedRadius: number = clockSize / 2 - 15
const fallAsleepRadius: number = clockSize / 2 - 5

const Clock: FC = () => {
  const {
    windowStart,
    windowEnd,
    night,
    inBedDuration,
    asleepDuration,
    sleepStart,
    sleepEnd,
    bedStart,
    bedEnd
  } = useSleep()
  const date = useSelector(getSelectedDate)
  const editMode = useSelector(getEditMode)
  const dispatch = useDispatch()

  const toggleEditNightMode = () => {
    dispatch(toggleEditMode())
  }

  return (
    <Card>
      <Title>STAT.TITLE</Title>

      <ClockContainer style={{ height: clockSize + 15, width: clockSize + 15 }}>
        <Svg width={clockSize} height={clockSize}>
          <MinuteSticks x={x} y={y} radius={radius} />
          <ClockTimes x={x} y={y} radius={radius} />
          <FallAsleepWindow
            goToSleepWindowStart={windowStart}
            goToSleepWindowEnd={windowEnd}
            x={x}
            y={y}
            radius={fallAsleepRadius}
          />
          <SleepArc
            night={night}
            value={Value.InBed}
            strokeWidth={12}
            color={colors.inBedColor}
            x={x}
            y={y}
            radius={inBedRadius}
          />
          <SleepArc
            night={night}
            value={Value.Awake}
            strokeWidth={8}
            color={colors.afternoonAccent}
            x={x}
            y={y}
            radius={inBedRadius}
          />
          <SleepArc
            night={night}
            value={Value.Asleep}
            strokeWidth={8}
            color={colors.darkBlue}
            x={x}
            y={y}
            radius={inBedRadius}
          />
          <TrackerName x={x} y={y} />

          {!editMode && (
            <SleepTime
              y={y}
              x={x}
              hasData={!!night}
              timeInBed={inBedDuration}
              timeAsleep={asleepDuration}
              sleepStart={sleepStart}
              sleepEnd={sleepEnd}
              bedStart={bedStart}
              bedEnd={bedEnd}
            />
          )}
        </Svg>
        {/* <NightRating day={selectedDay} x={x} /> */}
        {editMode && (
          <Bedtime
            clockSize={clockSize}
            toggleEditMode={toggleEditNightMode}
            date={date}
          />
        )}
        <AddNightButton />
        <InfoButton />
      </ClockContainer>
    </Card>
  )
}

export default memo(Clock)

const Card = styled.View`
  background-color: ${({ theme }) => theme.SECONDARY_BACKGROUND_COLOR};
  box-shadow: ${({ theme }) => theme.SHADOW};
  border-radius: 7px;
  margin-top: 8px;
  flex: 1;
  align-items: center;
  justify-content: center;
`

const ClockContainer = styled.View`
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 5px;
  flex: 1;
`

const Title = styled(TranslatedText)`
  font-family: ${({ theme }) => theme.FONT_BOLD};
  font-size: 15px;
  position: absolute;
  top: 10px;
  left: 16px;
  color: ${({ theme }) => theme.PRIMARY_TEXT_COLOR};
`
