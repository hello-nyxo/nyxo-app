import { selectWeek } from '@actions/coaching/coaching-actions'
import { useNavigation } from '@react-navigation/native'
import { IconBold } from '@components/iconRegular'
import TranslatedText from '@components/TranslatedText'
import ROUTE from '@config/routes/Routes'
import React, { FC, memo } from 'react'
import FastImage from 'react-native-fast-image'
import LinearGradient from 'react-native-linear-gradient'
import Animated from 'react-native-reanimated'
import { useDispatch } from 'react-redux'
import { CombinedWeek } from '@selectors/coaching-selectors/coaching-selectors'
import styled from 'styled-components/native'
import { constants, fonts } from '@styles/themes'
import colors from '../../styles/colors'
import ScalingButton from '../Buttons/ScalingButton'
import WeekCardTitle from './WeekCardTitle'

type Props = {
  week: CombinedWeek
  cardWidth: number
  cardMargin: number
  completed?: boolean
}

const WeekCard: FC<Props> = ({ cardWidth, cardMargin, week, completed }) => {
  const navigation = useNavigation()
  const dispatch = useDispatch()

  const handlePress = () => {
    dispatch(selectWeek(week.slug))
    navigation.navigate(ROUTE.WEEK, {
      week
    })
  }

  const formatedIntro = week.intro ? week.intro.replace('–', '\n – ') : ''
  const lessonCount = week.lessons.length
  const { habitCount } = week

  return (
    <CardContainer>
      <ScalingButton
        analyticsEvent={`Go to week ${week.weekName}`}
        onPress={handlePress}>
        <Card style={{ width: cardWidth, marginHorizontal: cardMargin }}>
          <WeekCardTitle stage={week.stage} weekName={week.weekName} />

          <CoverPhotoContainer>
            <CoverPhoto
              resizeMode="cover"
              source={{ uri: `https:${week.coverPhoto}?fm=jpg&fl=progressive` }}
            />

            <GradientContainer>
              <Gradient colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.5)']}>
                <Animated.View>
                  <Intro>{formatedIntro}</Intro>
                </Animated.View>
              </Gradient>
            </GradientContainer>
          </CoverPhotoContainer>
        </Card>
      </ScalingButton>

      <Row>
        <LessonIcon />
        <Info variables={{ count: lessonCount }}>WEEK_VIEW.LESSON_COUNT</Info>
        {habitCount > 0 && (
          <>
            <HabitIcon />
            <Info variables={{ count: habitCount }}>WEEK_VIEW.HABIT_COUNT</Info>
          </>
        )}
        <CalendarIcon />
        <Info variables={{ count: week.duration }}>WEEK_VIEW.DAY_COUNT</Info>
      </Row>

      <Border />
    </CardContainer>
  )
}

export default memo(WeekCard)

const Gradient = styled(LinearGradient)`
  padding: 10px;
`
const Info = styled(TranslatedText)`
  margin-left: 10px;
  font-family: ${fonts.medium};
  color: ${({ theme }) => theme.SECONDARY_TEXT_COLOR};
`

const CardContainer = styled.View`
  margin: 8px 16px;
`

const LessonIcon = styled(IconBold).attrs(({ theme }) => ({
  height: 15,
  width: 15,
  fill: theme.SECONDARY_TEXT_COLOR,
  name: 'bookLamp'
}))``

const HabitIcon = styled(IconBold).attrs(({ theme }) => ({
  height: 15,
  width: 15,
  fill: theme.SECONDARY_TEXT_COLOR,
  name: 'checklist'
}))`
  margin-left: 20px;
`

const CalendarIcon = styled(IconBold).attrs(({ theme }) => ({
  height: 15,
  width: 15,
  fill: theme.SECONDARY_TEXT_COLOR,
  name: 'calendar'
}))`
  margin-left: 20px;
`

const Card = styled.View`
  padding: 20px 0px;
  z-index: 20;
  min-height: 200px;
`

const Border = styled.View`
  border-bottom-color: ${({ theme }) => theme.HAIRLINE_COLOR};
  border-bottom-width: ${constants.hairlineWidth}px;
  margin: 20px 10px 0px;
`

const CoverPhotoContainer = styled.View`
  flex: 1;
  height: 150px;
  overflow: hidden;
  border-radius: 5px;
`

const CoverPhoto = styled(FastImage)`
  flex: 1;
  z-index: 0;
  max-height: 250px;
  height: 100%;
  width: 100%;
`
const GradientContainer = styled.View`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
`

const Intro = styled(Animated.Text)`
  margin-top: 5px;
  font-size: 13px;
  font-family: ${fonts.medium};
  color: ${colors.white};
`

const Row = styled(Animated.View)`
  flex-direction: row;
  margin: 0px 10px;
  align-items: center;
`
