import React, { memo } from 'react'
import { Animated } from 'react-native'
import { BorderlessButton } from 'react-native-gesture-handler'
import styled from 'styled-components/native'
import { fonts, StyleProps } from '../../styles/themes'
import { IconBold } from '../iconRegular'
import { AnimatedTranslatedText } from '../TranslatedText'

type Props = {
  direction: 'LEFT' | 'RIGHT'
  action: Function
  buttonText: string
  icon: string
  animation: any
}

const ActionComplete = (props: Props) => {
  const { direction, action, icon, buttonText, animation } = props

  const markCompleted = () => {
    action()
  }

  return (
    <Container style={{ opacity: animation }}>
      <SlideAction onPress={markCompleted}>
        {direction === 'LEFT' ? (
          <>
            <Icon name={icon} height={20} width={20} />
            <ButtonText>{buttonText}</ButtonText>
          </>
        ) : (
          <>
            <ButtonText>{buttonText}</ButtonText>
            <Icon name={icon} height={20} width={20} />
          </>
        )}
      </SlideAction>
    </Container>
  )
}

export default memo(ActionComplete)

const Icon = styled(IconBold).attrs((props: StyleProps) => ({
  fill: props.theme.PRIMARY_TEXT_COLOR
}))``

const ButtonText = styled(AnimatedTranslatedText)`
  color: ${(props: StyleProps) => props.theme.PRIMARY_TEXT_COLOR};
  font-family: ${fonts.bold};
  margin: 0px 5px;
`

const Container = styled(Animated.View)`
  flex-direction: row;
  margin: 0px 20px;
`

const SlideAction = styled(BorderlessButton)`
  flex-direction: row;
  align-items: center;
`
