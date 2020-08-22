import React, { memo, useRef, useState } from 'react'
import { Dimensions } from 'react-native'
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler'
import Modal from 'react-native-modal'
import Animated from 'react-native-reanimated'
import styled from 'styled-components/native'
import keyExtractor from '../../helpers/KeyExtractor'
import colors from '../../styles/colors'
import { fonts, StyleProps } from '../../styles/themes'
import { IconBold } from '../iconRegular'
import { CheckBox, H4, P, SafeAreaView } from '../Primitives/Primitives'
import TestEnd from './TestEnd'
import TestStart from './TestStart'

const { width, height } = Dimensions.get('window')

const cardWidth = width - 40
const cardMargin = 5

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList)
const content = [
  {
    question: 'CHRONOTYPE_Q1',
    answers: [
      { weight: 1, answer: 'CHRONOTYPE_Q1_A1' },
      { weight: 2, answer: 'CHRONOTYPE_Q1_A2' },
      { weight: 3, answer: 'CHRONOTYPE_Q1_A3' },
      { weight: 4, answer: 'CHRONOTYPE_Q1_A4' }
    ]
  },
  {
    question: 'CHRONOTYPE_Q2',
    answers: [
      { weight: 1, answer: 'CHRONOTYPE_Q2_A1' },
      { weight: 2, answer: 'CHRONOTYPE_Q2_A2' },
      { weight: 3, answer: 'CHRONOTYPE_Q2_A3' },
      { weight: 4, answer: 'CHRONOTYPE_Q2_A4' }
    ]
  },
  {
    question: 'CHRONOTYPE_Q3',
    answers: [
      { weight: 1, answer: 'CHRONOTYPE_Q3_A1' },
      { weight: 2, answer: 'CHRONOTYPE_Q3_A2' },
      { weight: 3, answer: 'CHRONOTYPE_Q3_A3' },
      { weight: 4, answer: 'CHRONOTYPE_Q3_A4' }
    ]
  },
  {
    question: 'CHRONOTYPE_Q4',
    answers: [
      { weight: 1, answer: 'CHRONOTYPE_Q4_A1' },
      { weight: 2, answer: 'CHRONOTYPE_Q4_A2' },
      { weight: 3, answer: 'CHRONOTYPE_Q4_A3' },
      { weight: 4, answer: 'CHRONOTYPE_Q4_A4' }
    ]
  },
  {
    question: 'CHRONOTYPE_Q5',
    answers: [
      { weight: 1, answer: 'CHRONOTYPE_Q5_A1' },
      { weight: 2, answer: 'CHRONOTYPE_Q5_A2' },
      { weight: 3, answer: 'CHRONOTYPE_Q5_A3' },
      { weight: 4, answer: 'CHRONOTYPE_Q5_A4' }
    ]
  },
  {
    question: 'CHRONOTYPE_Q6',
    answers: [
      { weight: 1, answer: 'CHRONOTYPE_Q6_A1' },
      { weight: 2, answer: 'CHRONOTYPE_Q6_A2' },
      { weight: 3, answer: 'CHRONOTYPE_Q6_A3' },
      { weight: 4, answer: 'CHRONOTYPE_Q6_A4' }
    ]
  }
]

const answerArray = [1, 2, 3, 4, 1, 2]

const xOffset = new Animated.Value(0)

// const transitionAnimation = (index: number) => ({
//   transform: [
//     { perspective: 800 },
//     {
//       scale: xOffset.interpolate({
//         inputRange: [(index - 1) * width, index * width, (index + 1) * width],
//         outputRange: [0.9, 1, 0.9]
//       })
//     }
//   ]
// });

const ChronotypeTest = () => {
  const [answers, setAnswer] = useState([])
  const flatListRef: any = useRef(0)
  const [currentIndex, setCurrentIndex] = useState(0)

  const startTest = () => {
    scrollToItem(1)
  }

  const scrollToItem = (index: number) => {
    return flatListRef.current.scrollToIndex({ index, animated: true })
  }

  const nextSlide = () => {
    if (currentIndex + 1 < content.length) {
      setCurrentIndex(currentIndex + 1)
      scrollToItem(currentIndex)
    }
  }

  const renderItem = ({ item, index }: { item: any; index: number }) => {
    const answers = item.answers.map((item: any, subIndex: number) => (
      <Answer key={index} onPress={() => {}}>
        <AnswerInner key={subIndex}>
          <CheckBox checked={answerArray[index] === item.weight} />
          <AnswerOption selected={answerArray[index] === item.weight}>
            {item.answer}
          </AnswerOption>
        </AnswerInner>
      </Answer>
    ))
    return (
      <AnswerCard>
        <QuestionNumber>Question {index + 1}</QuestionNumber>
        <H4>{item.question}</H4>

        {answers}
      </AnswerCard>
    )
  }

  const inset = (width - cardWidth - cardMargin) / 2
  const snapOffets: number[] = content.map(
    (item, index) => index * (cardWidth + cardMargin * 2)
  )

  return (
    <Modal isVisible={false} style={{ margin: 0, padding: 0 }}>
      <CustomSafeAreaView>
        {/* <Progress></Progress> */}
        <Answers>
          <AnimatedFlatList
            getItemLayout={(data: any, index: number) => ({
              index,
              length: cardWidth,
              offset: (cardWidth + cardMargin * 2) * index
            })}
            key
            contentContainerStyle={{
              paddingLeft: inset,
              paddingRight: inset
            }}
            snapToOffsets={snapOffets}
            scrollEventThrottle={16}
            showsHorizontalScwrollIndicator={false}
            horizontal
            data={content}
            ref={flatListRef}
            decelerationRate="fast"
            keyExtractor={keyExtractor}
            snapToAlignment="center"
            snapToEnd={false}
            ListHeaderComponent={<TestStart start={startTest} />}
            ListFooterComponent={<TestEnd />}
            renderItem={renderItem}
          />
        </Answers>
        <BottomContainer>
          <TouchableOpacity>
            <StyledIcon
              fill="white"
              name="chevronLeft"
              height={40}
              width={40}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <StyledIcon
              fill="white"
              name="chevronRight"
              height={40}
              width={40}
            />
          </TouchableOpacity>
        </BottomContainer>
      </CustomSafeAreaView>
    </Modal>
  )
}

export default memo(ChronotypeTest)

const CustomSafeAreaView = styled(SafeAreaView)`
  background-color: ${colors.radiantBlue};
  align-items: center;
  justify-content: center;
`

const Answers = styled.View`
  flex-grow: 1;
`

const QuestionNumber = styled.Text`
  font-family: ${fonts.bold};
  text-transform: uppercase;
  color: ${(Props: StyleProps) => Props.theme.SECONDARY_TEXT_COLOR};
`

const AnswerCard = styled(Animated.View)<StyleProps>`
  background: ${(props: StyleProps) => props.theme.SECONDARY_BACKGROUND_COLOR};
  padding: 10px;
  margin: 10px ${cardMargin}px;
  border-radius: 10px;
  width: ${cardWidth}px;
`

const Answer = styled.TouchableOpacity``
const AnswerInner = styled.View<StyleProps>`
  background: ${(props: StyleProps) => props.theme.SECONDARY_BACKGROUND_COLOR};
  margin: 10px 20px;
  flex-direction: row;
  align-items: center;
`

interface AnswerProps {
  readonly selected?: boolean
}
const AnswerOption = styled(P)<AnswerProps>`
  font-family: ${(props: AnswerProps) =>
    props.selected ? fonts.bold : fonts.medium};
`

const BottomContainer = styled.View`
  justify-content: space-between;
  flex-direction: row;
`

const StyledIcon = styled(IconBold)``
