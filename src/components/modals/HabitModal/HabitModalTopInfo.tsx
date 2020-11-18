import React, { useEffect, useState, memo } from 'react'
import { TouchableOpacity, View, Dimensions } from 'react-native'
import Modal from 'react-native-modal'
import { getStatusBarHeight } from 'react-native-iphone-x-helper'
import styled from 'styled-components/native'
import { fonts, StyleProps } from '../../../styles/themes'
import { IconBold } from '../../iconRegular'

const { width } = Dimensions.get('window')

interface Props {
  message: string
  resetMessage: Function
}

const HabitModalTopInfo = (props: Props) => {
  const { message, resetMessage } = props
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
    <Modal
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
      animationOutTiming={400}
      style={{ margin: 0, padding: 0 }}>
      <Container>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text>{message}</Text>
          <TouchableOpacity onPress={discardNotification}>
            <Icon name="closeCircle" height={20} width={20} />
          </TouchableOpacity>
        </View>
      </Container>
    </Modal>
  )
}

export default memo(HabitModalTopInfo)

const Container = styled.View`
  width: ${width - 20}px;
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

const Text = styled.Text`
  color: ${({ theme }) => theme.PRIMARY_TEXT_COLOR};
  font-size: 15px;
  font-family: ${fonts.medium};
  flex: 1;
`

const Icon = styled(IconBold).attrs(({ theme }) => ({
  fill: theme.PRIMARY_TEXT_COLOR
}))``
