import { WIDTH } from '@helpers/Dimensions'
import { useAppDispatch, useAppSelector } from '@hooks/redux'
import React, { FC, useEffect, useState } from 'react'
import { TouchableOpacity } from 'react-native'
import { getStatusBarHeight } from 'react-native-iphone-x-helper'
import RNModal, { ModalProps, ReactNativeModal } from 'react-native-modal'
import styled from 'styled-components/native'
import { fonts } from '../styles/themes'
import { IconBold } from './iconRegular'

const TopInfo: FC = () => {
  const dispatch = useAppDispatch()
  // FIXME
  const message = useAppSelector((state) => state.calendar.selectedDay)
  const type = useAppSelector((state) => state.calendar.selectedDay)
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
        <InnerContainer>
          <Text>{message}</Text>
          <TouchableOpacity onPress={discardNotification}>
            <Icon name="closeCircle" height={20} width={20} />
          </TouchableOpacity>
        </InnerContainer>
      </Container>
    </StyledModal>
  )
}

export default TopInfo

const InnerContainer = styled.View`
  flex-direction: row;
  align-items: center;
`

const StyledModal = styled(
  RNModal as new (props: ModalProps) => ReactNativeModal
)`
  margin: 0px 0px;
  padding: 0;
`

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

const Text = styled.Text`
  color: ${({ theme }) => theme.PRIMARY_TEXT_COLOR};
  font-size: 15px;
  font-family: ${fonts.medium};
  flex: 1;
`

const Icon = styled(IconBold).attrs(({ theme }) => ({
  fill: theme.PRIMARY_TEXT_COLOR
}))``
