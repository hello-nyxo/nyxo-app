import { completeLesson } from '@actions/coaching/coaching-actions'
import { interpolateColors } from '@helpers/animated'
import { HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT } from '@helpers/Dimensions'
import useOnMount from '@hooks/UseOnMount'
import { useNavigation } from '@react-navigation/native'
import {
  CombinedLesson,
  getContentForSelectedLesson
} from '@selectors/coaching-selectors/coaching-selectors'
import Copyright from '@components/CoachingSpecific/Copyright'
import Tags from '@components/LessonComponents/Tags'
import React, { memo, useState } from 'react'
import { LayoutChangeEvent } from 'react-native'
import { getBottomSpace, isIphoneX } from 'react-native-iphone-x-helper'
import Animated from 'react-native-reanimated'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components/native'
import Authors from '@components/CoachingSpecific/Authors'
import TopHeader from '@components/CoachingSpecific/TopHeader'
import WeekViewHeader from '@components/CoachingSpecific/WeekViewHeader'
import ExtraInfo from '@components/Lesson/ExtraInfo'
import LessonContent from '@components/Lesson/LessonContent'
import LessonCover from '@components/Lesson/LessonCover'
import ExampleHabitSection from '@components/LessonComponents/ExampleHabitSection'
import ReadingTime from '@components/LessonComponents/ReadingTime'
import { ReAnimatedTranslatedText } from '@components/TranslatedText'
import colors from '../../styles/colors'
import { fonts, StyleProps } from '../../styles/themes'

const yOffset = new Animated.Value(0)

const LessonView = () => {
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const [height, setHeight] = useState(0)
  const selectedLesson: CombinedLesson = useSelector(
    getContentForSelectedLesson
  )
  const {
    contentId,
    weekId = '',
    tags,
    cover = '',
    slug,
    exampleHabit,
    lessonName = '',
    additionalInformation,
    lessonContent,
    authorCards
  } = selectedLesson

  if (!selectedLesson) {
    return null
  }

  useOnMount(() => {
    if (selectedLesson) {
      // dispatch(
      //   pushInteractedLesson({
      //     lessonId: contentId,
      //     weekId,
      //     latestInteractTimestamp: Date.now(),
      //   })
      // );
    }
  })

  const markCompleted = async () => {
    await Promise.all([
      dispatch(completeLesson(slug)),
      // dispatch(
      //   popFromIncompleteLessons({
      //     lessonId: contentId,
      //     weekId,
      //     latestInteractTimestamp: Date.now(),
      //   })
      // ),
      yOffset.setValue(0),
      navigation.goBack()
    ])
  }

  const handleOnLayout = (event: LayoutChangeEvent) => {
    setHeight(event.nativeEvent.layout.height)
  }

  const ButtonAnimation = (yOffset: any) => {
    return {
      padding: yOffset.interpolate({
        inputRange: [height * 0.5, height],
        outputRange: [0, 20],
        extrapolate: Animated.Extrapolate.CLAMP
      }),
      backgroundColor: interpolateColors(
        yOffset,
        [height * 0.9, height],
        [colors.gray2, colors.radiantBlue]
      )
    }
  }

  const textIn = (yOffset: any) => {
    return {
      opacity: yOffset.interpolate({
        inputRange: [height * 0.5, height],
        outputRange: [0, 1],
        extrapolate: Animated.Extrapolate.CLAMP
      })
    }
  }

  const textOut = (yOffset: any) => {
    return {
      opacity: yOffset.interpolate({
        inputRange: [height * 0.65, height],
        outputRange: [1, 0],
        extrapolate: Animated.Extrapolate.CLAMP
      })
    }
  }

  return (
    <>
      <TopHeader yOffset={yOffset} title={lessonName} />
      <ScrollView
        onLayout={handleOnLayout}
        onScroll={Animated.event([
          { nativeEvent: { contentOffset: { y: yOffset } } }
        ])}
        scrollEventThrottle={16}>
        <LessonCover yOffset={yOffset} cover={cover} />
        <WeekViewHeader yOffset={yOffset} title={lessonName} />
        <Authors authorCards={authorCards} />
        <ReadingTime
          content={lessonContent}
          habitCount={exampleHabit?.length}
        />
        <Tags tags={tags} />
        <LessonContent
          lessonContent={lessonContent}
          handleOnLayout={handleOnLayout}
        />
        <ExampleHabitSection habits={exampleHabit} />
        <ExtraInfo additionalInformation={additionalInformation} />
        <Copyright />
      </ScrollView>

      <ScrollConnectedButton
        style={[
          ButtonAnimation(yOffset),
          {
            backgroundColor: interpolateColors(
              yOffset,
              [-40, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
              [colors.gray2, colors.radiantBlue]
            )
          }
        ]}>
        <ButtonText style={textOut(yOffset)}>SCROLL_DOWN_COMPLETE</ButtonText>
        <ButtonText onPress={markCompleted} style={textIn(yOffset)}>
          COMPLETE
        </ButtonText>
      </ScrollConnectedButton>
    </>
  )
}

export default memo(LessonView)

const ScrollConnectedButton = styled(Animated.View)`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding-top: 20px;
  padding-bottom: ${isIphoneX() ? getBottomSpace() + 20 : 20}px;
  justify-content: center;
  align-items: center;
  background-color: ${(props: StyleProps) =>
    props.theme.SECONDARY_BACKGROUND_COLOR};
`

const ButtonText = styled(ReAnimatedTranslatedText)`
  font-family: ${fonts.bold};
  position: absolute;
  font-size: 15px;
  color: white;
`

const ScrollView = styled(Animated.ScrollView).attrs(() => ({
  contentContainerStyle: {
    flexGrow: 1
  }
}))`
  background-color: ${(props: StyleProps) =>
    props.theme.PRIMARY_BACKGROUND_COLOR};
`
