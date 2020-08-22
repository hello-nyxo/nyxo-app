import React, { memo } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Proptypes from 'prop-types'
import { CircularProgress } from 'react-native-circular-progress'
import TranslatedText from '../TranslatedText'

const SleepScoreSegment = (props) => (
  <View key={props.index} style={c.segment}>
    <View style={c.titleRow}>
      <TranslatedText style={c.segmentTitle}>{props.name}</TranslatedText>
      <CircularProgress
        size={50}
        width={5}
        rotation={0}
        lineCap="round"
        fill={props.score}
        tintColor={props.color}
        backgroundColor="white">
        {(fill) => <Text style={c.segmentFigureScore}>{fill}</Text>}
      </CircularProgress>
    </View>
    <View style={c.segmentTextContainer}>
      <TranslatedText style={c.segmentText}>{props.text}</TranslatedText>
    </View>
  </View>
)

export default memo(SleepScoreSegment)

SleepScoreSegment.propTypes = {
  index: Proptypes.number.isRequired,
  score: Proptypes.number.isRequired,
  color: Proptypes.string.isRequired,
  name: Proptypes.string.isRequired,
  text: Proptypes.string.isRequired
}

const c = StyleSheet.create({
  segment: {
    backgroundColor: 'white',
    width: '100%',
    alignItems: 'center',
    marginBottom: 20
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginBottom: 10,
    paddingRight: 20
  },
  segmentFigureScore: {
    fontWeight: 'bold',
    fontSize: 17,
    textAlign: 'center'
  },
  segmentTextContainer: {
    marginHorizontal: 10,
    width: '100%'
  },
  segmentTitle: {
    fontSize: 19,
    marginLeft: 20,
    flex: 1,
    fontWeight: 'bold',
    color: 'black'
  },
  segmentText: {
    marginHorizontal: 20,
    fontSize: 15,
    color: 'black'
  }
})
