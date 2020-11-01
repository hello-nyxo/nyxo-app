import TranslatedText from '@components/TranslatedText'
import React, { FC, useRef } from 'react'
import { Animated } from 'react-native'
import { RectButton } from 'react-native-gesture-handler'
import Swipeable from 'react-native-gesture-handler/Swipeable'
import styled from 'styled-components/native'

type Props = {
  children: JSX.Element
  leftActionTitle: string
  leftAction: () => void
  rightActionTitle: string
  rightAction: () => void
}

export const SwipeableRow: FC<Props> = ({ children }) => {
  const ref = useRef<Swipeable>(null)

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
      {children}
    </Swipeable>
  )
}

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
