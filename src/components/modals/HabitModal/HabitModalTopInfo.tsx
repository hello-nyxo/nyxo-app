import React, { useEffect, useState, memo, FC } from 'react'
import { TouchableOpacity } from 'react-native'
import { getStatusBarHeight } from 'react-native-iphone-x-helper'
import styled from 'styled-components/native'
import { StyledModal } from '@components/Primitives/Primitives'
import { WIDTH } from '@helpers/Dimensions'
import { fonts } from '../../../styles/themes'
import { IconBold } from '../../iconRegular'

interface Props {
  message: string
  resetMessage: (message: string) => void
}

const HabitModalTopInfo: FC<Props> = ({ message, resetMessage }) => {
  const [show, setShow] = useState(false)

  const discardNotification = () => {
    setShow(false)
    resetMessage('')
  }

  useEffect(() => {
    if (message.length > 0) {
      setShow(true)
    } else {
      setShow(false)
    }
  }, [message])

  return (
    <StyledModal
      backdropOpacity={0.1}
      isVisible={show}
      swipeDirection={['up', 'left', 'right']}
      animationOut="slideOutUp"
      animationIn="slideInDown"
      animationInTiming={400}
      swipeThreshold={50}
      hideModalContentWhileAnimating
      onSwipeComplete={discardNotification}
      hasBackdrop
      onBackdropPress={discardNotification}
      animationOutTiming={400}>
      <Container>
        <Row>
          <Text>{message}</Text>
          <TouchableOpacity onPress={discardNotification}>
            <Icon name="closeCircle" height={20} width={20} />
          </TouchableOpacity>
        </Row>
      </Container>
    </StyledModal>
  )
}

export default memo(HabitModalTopInfo)

const Container = styled.View`
  width: ${WIDTH - 20}px;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.SECONDARY_BACKGROUND_COLOR};
  border-radius: 15px;
  position: absolute;
  left: 10px;
  right: 10px;
  top: ${getStatusBarHeight() + 20}px;
  padding: 20px;
  z-index: 10;
`

const Row = styled.View`
  flex-direction: row;
  align-items: center;
`

const Text = styled.Text`
  color: ${({ theme }) => theme.PRIMARY_TEXT_COLOR};
  font-size: 15px;
  font-family: ${fonts.medium};
  flex: 1;
`

const Icon = styled(IconBold).attrs(({ theme }) => ({
  fill: theme.PRIMARY_TEXT_COLOR
}))``
