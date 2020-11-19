import { toggleExplanationsModal } from '@actions/modal/modal-actions'
import React, { memo } from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components/native'
import colors from '../../styles/colors'
import { IconBold } from '../iconRegular'

const InfoButton = () => {
  const dispatch = useDispatch()
  const onPress = () => {
    dispatch(toggleExplanationsModal(true))
  }
  return (
    <Container>
      <Touchable onPress={onPress}>
        <IconBold
          width={20}
          height={20}
          fill={colors.darkBlue}
          name="informationCircle"
        />
      </Touchable>
    </Container>
  )
}

export default memo(InfoButton)

const Container = styled.View`
  position: absolute;
  bottom: 25px;
  right: 35px;
`

const Touchable = styled.TouchableOpacity`
  padding: 5px;
`
