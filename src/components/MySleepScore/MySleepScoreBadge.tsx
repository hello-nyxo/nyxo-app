import React, { Fragment, memo } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { CircularProgress } from 'react-native-circular-progress'
import colors from '../../styles/colors'
import MySleepScoreModal from '../modals/MySleepScoreModal'

interface MySleepScoreBadge {
  setModalVisible: {}
}

const MySleepScoreBadge = (props) => {
  const score = Math.round(props.selectedDay.avgScore)
  return (
    <>
      <TouchableOpacity onPress={() => props.setModalVisible(true)}>
        <View style={cStyles.badge}>
          <CircularProgress
            size={60}
            width={5}
            rotation={0}
            lineCap="round"
            fill={score}
            tintColor={colors.green}
            backgroundColor="white">
            {(fill: number) => (
              <Text style={cStyles.badgeScore}>{Math.round(fill)}</Text>
            )}
          </CircularProgress>
        </View>
      </TouchableOpacity>
      <MySleepScoreModal
        daysScore={score}
        selectedDay={props.selectedDay}
        scoreModalVisible={props.scoreModalVisible}
        setModalVisible={(value) => props.setModalVisible(value)}
      />
    </>
  )
}

export default memo(MySleepScoreBadge)

const cStyles = StyleSheet.create({
  badge: {
    marginHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  badgeScore: { fontWeight: 'bold', color: 'black', zIndex: 2 }
})
