import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { useDispatch } from 'react-redux'
import { setValues } from '../../actions/manual-sleep/manual-sleep-actions'
import { icons } from '../../../assets/svgs'
import {
  calculateEndTimeFromAngle,
  calculateMinutesFromAngle,
  calculateTimeFromAngle,
  padMinutes,
  roundAngleToFives
} from '../../helpers/time'
import colors from '../../styles/colors'
import { fonts } from '../../styles/themes'
import CircularSlider from './CircularSlider'
import TimerText from './TimerText'

interface BedtimeProps {
  clockSize: number
  toggleEditMode: Function
  date: string
}

const Bedtime = (props: BedtimeProps) => {
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

    dispatch(setValues(bedtime, waketime))
  }

  const bedtime = calculateTimeFromAngle(startAngle, true)
  const waketime = calculateEndTimeFromAngle(
    startAngle,
    (startAngle + angleLength) % (2 * Math.PI)
  )

  const editNightRadius: number = props.clockSize / 2 - 20

  return (
    <View
      style={{
        position: 'absolute',
        width: props.clockSize,
        height: props.clockSize,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: props.clockSize,
        overflow: 'hidden',
        zIndex: 10
      }}>
      <View style={[styles.timeContainer, { top: props.clockSize / 2 }]}>
        <View style={styles.timeHeader}>
          <Text style={styles.bedtimeText}>
            {`${bedtime.h}:${padMinutes(bedtime.m)} - ${
              waketime.h
            }:${padMinutes(waketime.m)}`}
          </Text>
        </View>
      </View>
      <View>
        <TimerText
          style={[styles.sleepTimeContainer, { bottom: props.clockSize / 2 }]}
          minutesLong={calculateMinutesFromAngle(angleLength)}
        />
        <CircularSlider
          startAngle={startAngle}
          angleLength={angleLength}
          onUpdate={onUpdate}
          strokeWidth={28}
          radius={editNightRadius}
          bgCircleColor={colors.radiantBlue}
          stopIcon={icons.daySunrise}
          startIcon={icons.daySunset}
        />
      </View>
    </View>
  )
}

export default Bedtime

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    top: 0
  },
  bedtimeText: {
    color: colors.radiantBlue,
    fontFamily: fonts.bold,
    fontSize: 17
  },
  wakeText: {
    color: colors.radiantBlue,
    fontFamily: fonts.bold,
    fontSize: 17
  },
  timeContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  time: {
    marginTop: 15,
    alignItems: 'center',
    flex: 1
  },
  timeHeader: {
    position: 'absolute',
    top: 15,
    flexDirection: 'row',
    alignItems: 'center'
  },
  timeValue: {
    color: 'black',
    fontSize: 35,
    fontWeight: '300'
  },
  sleepTimeContainer: {
    justifyContent: 'center',
    flexDirection: 'row',
    position: 'absolute',
    alignItems: 'flex-end',
    top: 0,
    left: 0,
    right: 0
  }
})
