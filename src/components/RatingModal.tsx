import { useAppDispatch, useAppSelector } from '@hooks/redux'
import { toggleRatingModal } from '@reducers/modal'
import React, { memo } from 'react'
import Modal from 'react-native-modal'

import styled from 'styled-components/native'
import colors from '../styles/colors'
import RatingButton from './Buttons/RatingButton'
import { H3, P } from './Primitives/Primitives'

const info = [
  {
    icon: 'smileySadBold',
    title: 'NightRating1',
    color: colors.red,
    value: 1
  },
  {
    icon: 'smileyIndifferentBold',
    title: 'NightRating2',
    color: colors.yellow,
    value: 2
  },
  {
    icon: 'smileySmirkBold',
    title: 'NightRating3',
    color: colors.green,
    value: 3
  },
  {
    icon: 'smileyThrilled',
    title: 'NightRating4',
    color: colors.bedTimeColor,
    value: 4
  }
]

const RatingModal = () => {
  const dispatch = useAppDispatch()
  const isVisible = useAppSelector((state) => state.modal.rating)

  const buttons = info.map((item) => (
    <RatingButton
      key={item.value}
      icon={item.icon}
      value={item.value}
      selected={item.value === 3} // FIXME
      color={item.color}
      title={item.title}
    />
  ))

  const toggleModal = () => {
    dispatch(toggleRatingModal(false))
  }

  const closeModal = () => {
    dispatch(toggleRatingModal(false))
  }

  return (
    <StyledModal
      backdropTransitionOutTiming={0}
      hideModalContentWhileAnimating
      swipeThreshold={50}
      isVisible={isVisible}
      useNativeDriver={false}
      onSwipeComplete={closeModal}
      swipeDirection="down"
      onBackdropPress={toggleModal}>
      <Container>
        <Mark />
        <H3 center>HOW_WOULD_YOU_RATE</H3>
        <ButtonContainer>{buttons}</ButtonContainer>
        <P>WHY_RATE</P>
      </Container>
    </StyledModal>
  )
}

export default memo(RatingModal)

const StyledModal = styled(Modal)`
  margin: 0px 0px;
  position: absolute;
  bottom: 0px;
  left: 0px;
  right: 0px;
  top: 0px;
  justify-content: flex-end;
`

const Mark = styled.View`
  background-color: ${({ theme }) => theme.SECONDARY_TEXT_COLOR};
  height: 5px;
  width: 100px;
  border-radius: 5px;
  align-self: center;
  margin-bottom: 10px;
`

const ButtonContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin: 30px 0px;
`

const Container = styled.View`
  border-radius: 30px;
  background-color: ${({ theme }) => theme.SECONDARY_BACKGROUND_COLOR};
  justify-content: space-between;
  padding: 10px 20px;
`
