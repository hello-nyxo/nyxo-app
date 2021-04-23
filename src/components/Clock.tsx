import { WIDTH } from '@helpers/Dimensions'
import { useAppDispatch, useAppSelector } from '@hooks/redux'
import useSleep from '@hooks/useSleep'
import { toggleEditMode } from '@reducers/manual-sleep'
import { toggleExplanationsModal } from '@reducers/modal'
import colors from '@styles/colors'
import { Value } from '@typings/Sleepdata'
import React, { FC } from 'react'
import Animated from 'react-native-reanimated'
import Svg from 'react-native-svg'
import styled from 'styled-components/native'
import AddNightButton from './clock/AddNightButton'
import ClockTimes from './clock/ClockTimes'
import FallAsleepWindow from './clock/FallAsleepWindow'
import InfoButton from './clock/InfoButton'
import MinuteSticks from './clock/MinuteSticks'
import SleepArc from './clock/SleepArc'
import SleepTime from './clock/SleepTime'
import Bedtime from './clock/Slider'
import TranslatedText from './TranslatedText'

const containerSize = WIDTH - 40
const x: number = containerSize / 2
const y: number = x

const radius: number = containerSize / 2 - 30
const inBedRadius: number = containerSize / 2 - 15
const fallAsleepRadius: number = containerSize / 2 - 5

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
  const dispatch = useAppDispatch()
  const date = useAppSelector((state) => state.calendar.selectedDay)
  const editMode = useAppSelector((state) => state.manualSleep.editMode)

  const toggleEditNightMode = () => {
    dispatch(toggleEditMode(true))
  }

  const toggleInfo = () => {
    dispatch(toggleExplanationsModal(true))
  }

  return (
    <Card>
      <Title>STAT.TITLE</Title>
      <Legend>
        <LegendItem>
          <LegendText adjustsFontSizeToFit>INBED</LegendText>
          <Circle />
        </LegendItem>
        <LegendItem>
          <LegendText adjustsFontSizeToFit>ASLEEP</LegendText>
          <Ball />
        </LegendItem>
      </Legend>

      <ClockContainer
        style={{ height: containerSize + 15, width: containerSize + 15 }}>
        <Svg width={containerSize} height={containerSize}>
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
            outline
            color={colors.darkBlue}
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
            clockSize={containerSize}
            toggleEditMode={toggleEditNightMode}
            date={date}
          />
        )}
        <AddNightButton onPress={toggleEditNightMode} />
        <InfoButton onPress={toggleInfo} />
      </ClockContainer>
      <InstructionsContainer>
        {editMode && (
          <Instructions>
            Hello, here are instruction on how to use this feature. Select night
            duration by dragging the handles
          </Instructions>
        )}
      </InstructionsContainer>
    </Card>
  )
}

export default Clock

const Card = styled(Animated.View)`
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

const Legend = styled.View`
  right: 16px;
  top: 10px;
  position: absolute;
  flex-direction: column;
`

const LegendItem = styled.View`
  flex-direction: row;
  align-items: center;
`

const Circle = styled.View`
  height: 10px;
  width: 10px;
  border-radius: 10px;
  border: 2px solid ${({ theme }) => theme.accent};
`

const Ball = styled.View`
  height: 10px;
  width: 10px;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.accent};
`

const LegendText = styled(TranslatedText)`
  font-size: 10px;
  margin-bottom: 2px;
  width: 45px;
  color: ${({ theme }) => theme.SECONDARY_TEXT_COLOR};
  font-family: ${({ theme }) => theme.FONT_MEDIUM};
`

const InstructionsContainer = styled(Animated.View)`
  padding: 0px 16px;
  align-items: center;
  justify-content: center;
`

const Instructions = styled(Animated.Text)`
  text-align: center;
  font-size: 13px;
  font-family: ${({ theme }) => theme.FONT_MEDIUM};
  color: ${({ theme }) => theme.SECONDARY_TEXT_COLOR};
`
