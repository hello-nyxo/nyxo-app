import IconBold from 'components/iconBold'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import { useDispatch } from 'react-redux'
import { toggleAddNoteModal } from 'store/actions/modal/modal-actions'
import styled from 'styled-components/native'
import colors from 'styles/colors'

const AddNoteButton = () => {
  const dispatch = useDispatch()

  const onPress = () => {
    dispatch(toggleAddNoteModal())
  }
  
  return (
    <Container>
      <TouchableOpacity style={{ padding: 5 }} onPress={onPress}>
        <IconBold
          width={20}
          height={20}
          fill={colors.radiantBlue}
          name="tagEdit"
        />
      </TouchableOpacity>
    </Container>
  )
}

export default AddNoteButton

const Container = styled.View`
  position: absolute;
  right: 35px;
  top: 25px;
`
