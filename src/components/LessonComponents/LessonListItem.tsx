import {
  completeLesson,
  selectLesson
} from '@actions/coaching/coaching-actions'
import Analytics from 'appcenter-analytics'
import React, { memo } from 'react'
import { Animated } from 'react-native'
import FastImage from 'react-native-fast-image'
import { BorderlessButton } from 'react-native-gesture-handler'
import Swipeable from 'react-native-gesture-handler/Swipeable'
import { useDispatch, useSelector } from 'react-redux'
import { CombinedLesson } from '@selectors/coaching-selectors/coaching-selectors'
import styled from 'styled-components/native'
import ROUTE from 'config/routes/Routes'
import { useNavigation } from '@react-navigation/core'
import { getReadingTime } from '../../helpers/reading-time'
import { getActiveCoaching } from '../../store/Selectors/subscription-selectors/SubscriptionSelectors'
import colors from '../../styles/colors'
import { fonts, StyleProps } from '../../styles/themes'
import IconBold from '../iconBold'
import TranslatedText, { AnimatedTranslatedText } from '../TranslatedText'

interface Props {
  lesson: CombinedLesson
  locked?: boolean
}

const LessonListItem = ({ lesson, locked }: Props) => {
  const dispatch = useDispatch()
  const { navigate } = useNavigation()
  const hasActiveCoaching = useSelector(getActiveCoaching)
  const time = getReadingTime(lesson.lessonContent)

  const handlePress = () => {
    if (hasActiveCoaching) {
      Analytics.trackEvent(`Open lesson ${lesson.lessonName}`)
      dispatch(selectLesson(lesson.slug))
      navigate(ROUTE.LESSON, {})
    }
  }

  const markComplete = async () => {
    dispatch(completeLesson(lesson.slug))
  }

  const author = lesson.authorCards
    ? {
        name: lesson.authorCards[0]?.name
      }
    : {
        name: 'Pietari Nurmi'
      }

  const renderRightActions = (progress: any, dragX: any) => {
    if (!hasActiveCoaching) {
      return <NoAction />
    }
    const trans = progress.interpolate({
      inputRange: [-50, 0],
      outputRange: [0, 1]
    })
    return (
      <SlideContainer
        style={{
          opacity: trans
        }}>
        <SlideAction onPress={markComplete}>
          <ButtonText>MARK_COMPLETE</ButtonText>
          <Icon name="circleCheck" height={20} width={20} />
        </SlideAction>
      </SlideContainer>
    )
  }

  return (
    <Swipeable renderRightActions={renderRightActions}>
      <Touchable onPress={handlePress}>
        <Container>
          <LessonInfo>
            <LessonName numberOfLines={2}>{lesson.lessonName}</LessonName>
            <Author>{author.name}</Author>
            <InfoRow>
              <StyledIcon name="clockBold" height={10} width={10} />
              <ReadingTime variables={{ readingTime: time }}>
                {time === 1 ? 'READING_TIME.SINGULAR' : 'READING_TIME.PLURAL'}
              </ReadingTime>

              {lesson.exampleHabit?.length ? (
                <>
                  <StyledIcon name="taskListEdit" height={10} width={10} />
                  <HabitCount
                    variables={{ habits: lesson.exampleHabit?.length }}>
                    {lesson.exampleHabit?.length > 1
                      ? 'HABITS_COUNT_SHORT'
                      : 'HABIT_COUNT_SHORT'}
                  </HabitCount>
                </>
              ) : null}
            </InfoRow>
          </LessonInfo>

          <ImageContainer>
            <WeekImage
              resizeMode={FastImage.resizeMode.cover}
              source={{
                uri: `https:${lesson.cover}?fm=jpg&fl=progressive&w=200`
              }}
            />
            <Completed completed={lesson.completed}>
              {lesson.completed ? (
                <IconBold
                  name="checkMark"
                  height={15}
                  width={15}
                  fill={colors.white}
                />
              ) : null}
            </Completed>
          </ImageContainer>
        </Container>
      </Touchable>
    </Swipeable>
  )
}

export default memo(LessonListItem)

const NoAction = styled.View``

const StyledIcon = styled(IconBold).attrs(({ theme }) => ({
  fill: theme.SECONDARY_TEXT_COLOR
}))`
  margin-right: 5px;
`

const HabitCount = styled(TranslatedText)`
  margin: 0px 5px 0px 5px;
  font-family: ${fonts.medium};
  color: ${({ theme }) => theme.SECONDARY_TEXT_COLOR};
  font-size: 12px;
`

const Touchable = styled.TouchableOpacity`
  padding: 15px 20px 15px 20px;
  background-color: ${({ theme }) => theme.PRIMARY_BACKGROUND_COLOR};
`

const Container = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: ${({ theme }) => theme.PRIMARY_BACKGROUND_COLOR};
`
const Author = styled.Text<StyleProps>`
  font-size: 13px;
  font-family: ${fonts.medium};
  color: ${({ theme }) => theme.SECONDARY_TEXT_COLOR};
`

const LessonName = styled.Text<StyleProps>`
  font-size: 15px;
  font-family: ${fonts.bold};
  color: ${({ theme }) => theme.PRIMARY_TEXT_COLOR};
  margin-bottom: 5px;
`

const ReadingTime = styled(TranslatedText)<StyleProps>`
  font-size: 12px;
  margin-right: 10px;
  font-family: ${fonts.medium};
  color: ${({ theme }) => theme.SECONDARY_TEXT_COLOR};
`

interface CompletedProps {
  readonly completed?: boolean
}
const Completed = styled.View<CompletedProps>`
  width: 25px;
  height: 25px;
  border-radius: 5px;
  position: absolute;
  left: 0px;
  bottom: 0px;
  z-index: 20;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background-color: ${({ completed }: CompletedProps) =>
    completed ? colors.radiantBlue : 'transparent'};
`

const LessonInfo = styled.View`
  flex: 1;
  margin-right: 10px;
  justify-content: flex-start;
`

const ImageContainer = styled.View`
  background-color: gray;
  border-radius: 10px;
`

const WeekImage = styled(FastImage)`
  flex: 1;
  width: 60px;
  height: 60px;
  border-radius: 5px;
`

const SlideAction = styled(BorderlessButton)`
  flex-direction: row;
  align-items: center;
`

const Icon = styled(IconBold).attrs(({ theme }) => ({
  fill: theme.PRIMARY_TEXT_COLOR
}))``

const ButtonText = styled(AnimatedTranslatedText)`
  color: ${({ theme }) => theme.PRIMARY_TEXT_COLOR};
  font-family: ${fonts.bold};
  margin: 0px 5px;
`

const SlideContainer = styled(Animated.View)`
  margin: 0px 20px;
  flex-direction: row;
`

const InfoRow = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 5px;
`
