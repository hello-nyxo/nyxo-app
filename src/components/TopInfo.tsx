import React, { useEffect, useState } from 'react'
import { Dimensions, TouchableOpacity, View } from 'react-native'
import { getStatusBarHeight } from 'react-native-iphone-x-helper'
import Modal from 'react-native-modal'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components/native'
import { actionCreators } from '@reducers/NotificationReducer'
import {
  getNotificationMessage,
  getNotificationType
} from '@selectors/NotificationSelectors'
import { fonts, StyleProps } from '../styles/themes'
import { IconBold } from './iconRegular'

const { width } = Dimensions.get('window')

const TopInfo = () => {
  const dispatch = useDispatch()
  const message = useSelector(getNotificationMessage)
  const type = useSelector(getNotificationType)
  const [show, setShow] = useState(false)

  const discardNotification = async () => {
    await setShow(false)
    await dispatch(actionCreators.clearNotification())
  }

  useEffect(() => {
    if (message) {
      setShow(true)
    } else {
      setShow(false)
    }
  }, [message, type])

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

export default TopInfo

const Container = styled.View`
  width: ${width - 20}px;
  align-items: center;
  justify-content: center;
  background-color: ${(props: StyleProps) =>
    props.theme.SECONDARY_BACKGROUND_COLOR};
  border-radius: 15px;
  position: absolute;
  left: 10px;
  right: 10px;
  top: ${getStatusBarHeight() + 20}px;
  padding: 20px;
  z-index: 10;
`

const Text = styled.Text`
  color: ${(props: StyleProps) => props.theme.PRIMARY_TEXT_COLOR};
  font-size: 15px;
  font-family: ${fonts.medium};
  flex: 1;
`

const Icon = styled(IconBold).attrs((props: StyleProps) => ({
  fill: props.theme.PRIMARY_TEXT_COLOR
}))``
