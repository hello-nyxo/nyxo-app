import React, { useRef } from 'react'
import {
  Dimensions,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  View
} from 'react-native'
import { CircularProgress } from 'react-native-circular-progress'
import Modal from 'react-native-modal'
import { scoreTexts, segments } from '../../assets/texts/MySleepScore'
import colors from '../../styles/colors'
import SleepScoreSegment from '../MySleepScore/SleepScoreSegment'
import { H2 } from '../Primitives/Primitives'
import TranslatedText from '../TranslatedText'
import { CloseModalButton } from './CloseModalButton'

const { width, height } = Dimensions.get('window')

const MySleepScoreModal = (props) => {
  const listRef = useRef()

  const renderListItem = (ref) => {
    return (
      <SleepScoreSegment
        index={ref.index}
        score={props.selectedDay[ref.item.key]}
        color={ref.item.color}
        name={ref.item.name}
        text={ref.item.text}
      />
    )
  }

  return (
    <Modal
      animationIn="bounceInUp"
      animationOut="bounceOutDown"
      useNativeDriver
      animationInTiming={400}
      animationOutTiming={400}
      hideModalContentWhileAnimating
      isVisible={props.scoreModalVisible}
      style={c.modalStyle}
      onBackdropPress={() => props.setModalVisible(false)}>
      <CloseModalButton dark closeModal={() => props.setModalVisible(false)} />
      <ScrollView
        style={c.modalContentContainer}
        contentInset={{ top: 0, bottom: 100, left: 0 }}>
        <View style={c.badge}>
          <CircularProgress
            size={100}
            width={10}
            rotation={0}
            lineCap="round"
            fill={props.daysScore}
            tintColor={colors.green}
            backgroundColor="white">
            {(fill: number) => (
              <Text style={c.badgeText}>{Math.round(props.daysScore)}</Text>
            )}
          </CircularProgress>
        </View>
        <TranslatedText
          style={g.titleH1}
          variables={{ score: props.daysScore }}>
          {scoreTexts[Math.floor(props.daysScore / 10) * 10]}
        </TranslatedText>
        <TranslatedText style={g.basetext} variables={props.daysScore}>
          MySleepDescription
        </TranslatedText>

        <View style={c.parts}>
          <H2>MySleepScoreParts</H2>
          <FlatList
            data={segments}
            renderItem={(ref) => renderListItem(ref)}
            ref={listRef}
          />
        </View>
      </ScrollView>
    </Modal>
  )
}

const c = StyleSheet.create({
  modalStyle: {
    top: 100,
    height: height - 100,
    bottom: 0,
    marginBottom: 0,
    left: 0,
    marginHorizontal: 0
  },
  badge: {
    marginTop: 40,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center'
  },
  badgeText: {
    color: 'black',
    fontSize: 35
  },
  closeButtonContainer: {
    position: 'absolute',
    right: 20,
    top: 20,
    zIndex: 20
  },
  modalContentContainer: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: 'white',
    marginBottom: 20
    // flex: 1
  },
  parts: {
    flex: 1
  },
  segment: {
    backgroundColor: 'white',
    borderRadius: 10,
    width: '100%',
    paddingVertical: 15,
    paddingHorizontal: 5,
    marginVertical: 5,
    marginHorizontal: 5,
    flexDirection: 'row',
    alignItems: 'center'
  },
  segmentFigure: {
    borderRadius: 30,
    padding: 20
  },
  segmentFigureScore: {
    fontWeight: 'bold',
    fontSize: 17,
    textAlign: 'center'
  },
  segmentTextContainer: {
    marginLeft: 10
  },
  segmentTitle: {
    fontSize: 19,
    marginBottom: 10,
    fontWeight: 'bold',
    color: 'black'
  },
  segmentText: {
    fontSize: 15,
    color: 'black'
  }
})
