import { IconBold } from '@components/iconRegular'
import TranslatedText from '@components/TranslatedText'
import React, { FC } from 'react'
import styled from 'styled-components/native'
import { fonts } from '@styles/themes'
import RichText from '@components/RichText'
import { Document } from '@contentful/rich-text-types'
import Animated, { Easing, interpolate } from 'react-native-reanimated'
import { loop, useValue } from 'react-native-redash/lib/module/v1'
import { IntroSkeleton } from '@components/skeleton/IntroSkeleton'
import { PN } from '../Primitives/Primitives'

const { useCode, set, cond, eq } = Animated
export const DEFAULT_EASING: Animated.EasingFunction = Easing.bezier(
  0.5,
  0,
  0.25,
  1
)
export const DEFAULT_DURATION = 1200

type Props = {
  intro: string | undefined
  description: Document | undefined
  habitCount: number
  lessonCount: number
  loading: boolean
}

const WeekIntro: FC<Props> = ({
  intro,
  description,
  habitCount,
  lessonCount,
  loading
}) => {
  const animationValue = useValue(0)
  const isLoading = useValue(loading ? 1 : 0)

  useCode(
    () =>
      cond(eq(isLoading, 1), [
        set(
          animationValue,
          loop({
            duration: DEFAULT_DURATION,
            easing: DEFAULT_EASING,
            boomerang: true
          })
        )
      ]),
    [isLoading, animationValue]
  )

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const animatedStyle: any = {
    transform: [
      {
        translateX: interpolate(animationValue, {
          inputRange: [0, 1],
          outputRange: ['-100%', '100%']
        })
      }
    ]
  }

  return (
    <Container>
      <Card>
        {loading ? (
          <IntroSkeleton animatedStyle={animatedStyle} />
        ) : (
          <Intro>{intro}</Intro>
        )}
        <Information>
          {habitCount > 0 && (
            <>
              <HabitIcon />
              <Habits variables={{ count: habitCount }}>
                WEEK_VIEW.HABIT_COUNT
              </Habits>
            </>
          )}
          {lessonCount > 0 && (
            <LessonIcon>
              <LessonIcon />
              <Habits variables={{ count: lessonCount }}>
                WEEK_VIEW.LESSON_COUNT
              </Habits>
            </LessonIcon>
          )}
        </Information>
        <Description secondary>
          {description && <RichText content={description} />}
        </Description>
      </Card>
    </Container>
  )
}

export default WeekIntro

const Container = styled.View`
  background-color: ${({ theme }) => theme.PRIMARY_BACKGROUND_COLOR};
  border-radius: 8px;
`

const Description = styled(PN)`
  margin-bottom: 24px;
`

const Card = styled.View`
  box-shadow: ${({ theme }) => theme.SHADOW};
  border-radius: 8px;
  padding: 16px;
  margin: 16px;
  background-color: ${({ theme }) => theme.SECONDARY_BACKGROUND_COLOR};
`

const Intro = styled.Text`
  margin: 10px 0px 5px;
  color: ${({ theme }) => theme.SECONDARY_TEXT_COLOR};
  font-family: ${fonts.bold};
  font-size: 15px;
`

const Information = styled.View`
  flex-direction: row;
  padding: 10px 0px 5px;
`

const Habits = styled(TranslatedText)`
  font-size: 13px;
  margin-right: 10px;
  font-family: ${fonts.medium};
  color: ${({ theme }) => theme.PRIMARY_TEXT_COLOR};
`

const LessonIcon = styled(IconBold).attrs(({ theme }) => ({
  height: 15,
  width: 15,
  fill: theme.SECONDARY_TEXT_COLOR,
  name: 'bookLamp'
}))`
  margin-right: 10px;
`

const HabitIcon = styled(IconBold).attrs(({ theme }) => ({
  height: 15,
  width: 15,
  fill: theme.SECONDARY_TEXT_COLOR,
  name: 'checklist'
}))`
  margin-right: 10px;
`
