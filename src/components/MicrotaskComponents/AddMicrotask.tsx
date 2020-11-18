import React, { memo } from 'react'
import styled from 'styled-components/native'
import { fonts } from '@styles/themes'
import colors from '../../styles/colors'
import ScalingButton from '../Buttons/ScalingButton'
import TranslatedText from '../TranslatedText'

interface AddMicrotaskProps {
  addMicrotask: Function
}

const AddMicrotask = (props: AddMicrotaskProps) => {
  const handlePress = () => {
    props.addMicrotask()
  }

  return (
    <Container>
      <ScalingButton
        analyticsEvent="Add microtask button"
        onPress={handlePress}>
        <ButtonContainer>
          <ButtonText>NEW_ACTION</ButtonText>
        </ButtonContainer>
      </ScalingButton>
    </Container>
  )
}

export default memo(AddMicrotask)

const Container = styled.View`
  z-index: 20;
  margin: 20px;
  min-height: 200px;
`

const ButtonContainer = styled.View`
  background-color: ${colors.darkBlue};
  border-radius: 5px;
  padding: 20px;
  align-items: center;
  justify-content: center;
`

const ButtonText = styled(TranslatedText)`
  font-size: 17px;
  color: white;
  font-family: ${fonts.bold};
`
