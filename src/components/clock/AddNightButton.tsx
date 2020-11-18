import React, { FC } from 'react'
import { toggleEditMode } from '@actions/manual-sleep/manual-sleep-actions'
import { useDispatch } from 'react-redux'
import styled from 'styled-components/native'
import colors from '@styles/colors'
import { IconBold } from '@components/iconRegular'

const AddNightButton: FC = () => {
  const dispatch = useDispatch()
  const onPress = () => {
    dispatch(toggleEditMode())
  }
  return (
    <Container>
      <Touchable onPress={onPress}>
        <IconBold
          width={20}
          height={20}
          fill={colors.darkBlue}
          name="doubleBedAdd"
        />
      </Touchable>
    </Container>
  )
}

export default AddNightButton

const Container = styled.View`
  position: absolute;
  bottom: 25px;
  left: 35px;
`

const Touchable = styled.TouchableOpacity`
  padding: 5px;
`
