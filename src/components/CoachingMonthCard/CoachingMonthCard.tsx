import { IconBold } from '@components/iconRegular'
import TranslatedText from '@components/TranslatedText'
import { format } from 'date-fns'
import { CoachingPeriod } from '@hooks/coaching/useCoaching'
import { useUpdateUser } from '@hooks/user/useUser'
import moment from 'moment'
import React, { FC, useRef } from 'react'

import { fonts } from '@styles/themes'
import { Animated } from 'react-native'
import { RectButton } from 'react-native-gesture-handler'
import Swipeable from 'react-native-gesture-handler/Swipeable'
import styled from 'styled-components/native'
import { stringToColor } from '@helpers/style/color'

type Props = {
  month: CoachingPeriod
}

const CoachingMonthCard: FC<Props> = ({ month }) => {
  const ref = useRef<Swipeable>(null)
  const title = format(new Date(month?.started ?? new Date()), 'LLLL yyyy')
  const startDate = format(new Date(month?.started ?? new Date()), 'dd.mm.yyyy')

  const endDate = month.ended ? moment(month.ended).format('DD.MM.YYYY') : ''
  const weeks = month.weeks?.length ?? 0
  const lessons = month.lessons?.length ?? 0

  const [mutate] = useUpdateUser()

  const setActive = () => {
    mutate({
      user: {
        id: '',
        userActiveCoachingId: month.id
      }
    })
  }

  const renderLeftActions = (
    _: Animated.AnimatedInterpolation,
    dragAnimatedValue: Animated.AnimatedInterpolation
  ) => {
    const trans = dragAnimatedValue.interpolate({
      inputRange: [0, 50, 100, 101],
      outputRange: [-20, 0, 0, 1]
    })
    return (
      <LeftAction onPress={close}>
        <Animated.Text
          style={{
            transform: [{ translateX: trans }]
          }}>
          Delete
        </Animated.Text>
      </LeftAction>
    )
  }

  const renderRightAction = (
    text: string,
    x: number,
    progress: Animated.AnimatedInterpolation
  ) => {
    const trans = progress.interpolate({
      inputRange: [0, 1],
      outputRange: [x, 0]
    })

    const pressHandler = () => {
      setActive()
      close()
    }

    return (
      <ButtonContainer style={{ transform: [{ translateX: trans }] }}>
        <Action onPress={pressHandler}>
          <ButtonText>{text}</ButtonText>
        </Action>
      </ButtonContainer>
    )
  }

  const renderRightActions = (progress: Animated.AnimatedInterpolation) => (
    <Actions>{renderRightAction('COACHING.SET_ACTIVE', 128, progress)}</Actions>
  )

  const close = (): void => {
    // eslint-disable-next-line
    ref?.current?.close()
  }

  return (
    <Swipeable
      ref={ref}
      friction={2}
      leftThreshold={30}
      rightThreshold={40}
      renderLeftActions={renderLeftActions}
      renderRightActions={renderRightActions}>
      <Container>
        <Row>
          <Stripe color={stringToColor(month.id)} />
          <Column>
            <Row>
              <Column>
                <Text>COACHING_MONTH.SUBTITLE</Text>
                <Title>{title}</Title>
              </Column>
              <Stats>
                <Row>
                  <Icon />
                  <Stat variables={{ count: weeks }}>COACHING_MONTH.WEEKS</Stat>
                </Row>
                <Row>
                  <Icon />
                  <Stat variables={{ count: lessons }}>
                    COACHING_MONTH.LESSONS
                  </Stat>
                </Row>
              </Stats>
            </Row>

            <Row>
              <CalendarIcon />
              <Started>
                {startDate} – {endDate}
              </Started>
            </Row>
          </Column>
        </Row>
      </Container>
    </Swipeable>
  )
}

export default CoachingMonthCard

const Container = styled.View`
  background-color: ${({ theme }) => theme.SECONDARY_BACKGROUND_COLOR};
  box-shadow: ${({ theme }) => theme.SHADOW};
  padding: 10px;
  border-radius: 10px;
  margin: 10px 16px;
`

const Title = styled.Text`
  font-size: 17px;
  text-transform: uppercase;
  font-family: ${fonts.bold};
  color: ${({ theme }) => theme.PRIMARY_TEXT_COLOR};
  margin-bottom: 16px;
`

const Column = styled.View`
  flex: 1;
`

const Stats = styled.View`
  align-items: flex-end;
  justify-content: flex-end;
  flex: 1;
`

const Row = styled.View`
  flex-direction: row;
  align-items: center;
`

const Started = styled.Text`
  font-size: 13px;
  font-family: ${fonts.medium};
  color: ${({ theme }) => theme.SECONDARY_TEXT_COLOR};
`

const Stat = styled(TranslatedText)`
  font-size: 13px;
  font-family: ${fonts.medium};
  color: ${({ theme }) => theme.SECONDARY_TEXT_COLOR};
`

const Text = styled(TranslatedText)`
  font-size: 11px;
  line-height: 16px;
  text-transform: uppercase;
  margin-bottom: 4px;
  font-family: ${({ theme }) => theme.FONT_MEDIUM};
  color: ${({ theme }) => theme.SECONDARY_TEXT_COLOR};
`

const CalendarIcon = styled(IconBold).attrs(({ theme }) => ({
  name: 'calendar',
  height: 13,
  width: 13,
  fill: theme.SECONDARY_TEXT_COLOR
}))`
  margin-right: 8px;
`

const Actions = styled.View`
  flex-direction: row;
  width: 192px;
  margin-right: 18px;
`

const ButtonContainer = styled(Animated.View)`
  flex: 1;
`

const LeftAction = styled(RectButton)`
  flex: 1;
  justify-content: center;
`

const Action = styled(RectButton)`
  align-items: center;
  flex: 1;
  justify-content: center;
`

const ButtonText = styled(TranslatedText)`
  color: ${({ theme }) => theme.PRIMARY_BUTTON_COLOR};
  font-size: 17px;
  font-family: ${({ theme }) => theme.FONT_MEDIUM};
`

type StripeProps = {
  readonly color?: string
}

const Stripe = styled.View<StripeProps>`
  background-color: ${({ color }) => color ?? 'red'};
  height: 100%;
  border-radius: 5px;
  width: 5px;
  margin-right: 16px;
  opacity: 0.5;
`

const Icon = styled(IconBold).attrs(({ theme }) => ({
  height: 15,
  width: 15,
  fill: theme.SECONDARY_TEXT_COLOR,
  name: 'bookLamp'
}))`
  margin-right: 8px;
`
