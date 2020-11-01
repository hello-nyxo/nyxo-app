import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { fonts } from '@styles/themes'
import colors from '../../styles/colors'

interface TimerTextProps {
  style: any
  minutesLong: number
}

const TimerText = (props: TimerTextProps) => {
  const { minutesLong, style } = props

  const hours = Math.floor(minutesLong / 60)
  const minutes = minutesLong - hours * 60

  return (
    <View style={style}>
      <View style={styles.timerContainer}>
        <Text style={styles.time}>{hours}:</Text>
        {/* <Text style={styles.text}>H</Text> */}
        <Text style={styles.time}>
          {minutes < 10 ? `0${minutes}` : minutes}
        </Text>
        {/* <Text style={styles.text}>MIN</Text> */}
      </View>
    </View>
  )
}
export default TimerText

const styles = StyleSheet.create({
  timerContainer: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    flexDirection: 'row'
  },
  time: {
    marginBottom: -24,
    // color: 'black',
    color: colors.asleepColor,
    fontFamily: fonts.bold,
    fontWeight: 'bold',
    fontSize: 42
  },
  text: {
    color: colors.asleepColor,
    fontFamily: fonts.medium,
    fontSize: 15
  }
})
