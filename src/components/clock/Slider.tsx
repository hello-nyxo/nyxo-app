import React, { FC, useState } from 'react'
import { View } from 'react-native'
import { useDispatch } from 'react-redux'
import { setValues } from '@actions/manual-sleep/manual-sleep-actions'
import {
  calculateEndTimeFromAngle,
  calculateMinutesFromAngle,
  calculateTimeFromAngle,
  padMinutes,
  roundAngleToFives
} from '@helpers/time'
import styled from 'styled-components/native'
import ReactNativeHapticFeedback from 'react-native-haptic-feedback'
import { icons } from '../../../assets/svgs'
import colors from '../../styles/colors'
import CircularSlider from './CircularSlider'
import TimerText from './TimerText'

type Props = {
  clockSize: number
  toggleEditMode: () => void
  date: string
}

const Bedtime: FC<Props> = ({ clockSize }) => {
  const dispatch = useDispatch()
  const [startAngle, setStartAngle] = useState((Math.PI * 10) / 6)
  const [angleLength, setAngleLength] = useState((Math.PI * 7) / 6)

  const onUpdate = ({
    startAngle,
    angleLength
  }: {
    startAngle: number
    angleLength: number
  }) => {
    setStartAngle(roundAngleToFives(startAngle))
    setAngleLength(roundAngleToFives(angleLength))

    const bedtime = calculateTimeFromAngle(startAngle, true)
    const waketime = calculateEndTimeFromAngle(
      startAngle,
      (startAngle + angleLength) % (2 * Math.PI)
    )

    ReactNativeHapticFeedback.trigger('impactLight')

    dispatch(setValues(bedtime, waketime))
  }

  const bedtime = calculateTimeFromAngle(startAngle, true)
  const waketime = calculateEndTimeFromAngle(
    startAngle,
    (startAngle + angleLength) % (2 * Math.PI)
  )

  const editNightRadius: number = clockSize / 2 - 20

  return (
    <Container
      style={{
        width: clockSize,
        height: clockSize,
        borderRadius: clockSize
      }}>
      <TimeContainer style={{ top: clockSize / 2 }}>
        <TimeHeader>
          <BedTimeText>
            {`${bedtime.h}:${padMinutes(bedtime.m)} - ${
              waketime.h
            }:${padMinutes(waketime.m)}`}
          </BedTimeText>
        </TimeHeader>
      </TimeContainer>
      <View>
        <SleepTimeContainer
          style={{ bottom: clockSize / 2 }}
          minutesLong={calculateMinutesFromAngle(angleLength)}
        />
        <CircularSlider
          startAngle={startAngle}
          angleLength={angleLength}
          onUpdate={onUpdate}
          strokeWidth={28}
          radius={editNightRadius}
          bgCircleColor={colors.darkBlue}
          stopIcon={icons.daySunrise}
          startIcon={icons.daySunset}
        />
      </View>
    </Container>
  )
}

export default Bedtime

const Container = styled.View`
  position: absolute;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  z-index: 10;
`

const TimeContainer = styled.View`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  flex-direction: row;
  justify-content: center;
`

const BedTimeText = styled.Text`
  color: ${colors.darkBlue};
  font-size: 17px;
  font-family: ${({ theme }) => theme.FONT_BOLD};
`
const TimeHeader = styled.View`
  position: absolute;
  top: 15px;
  flex-direction: row;
  align-items: center;
`

const SleepTimeContainer = styled(TimerText)`
  justify-content: center;
  flex-direction: row;
  position: absolute;
  align-items: flex-end;
  top: 0;
  left: 0;
  right: 0;
`
