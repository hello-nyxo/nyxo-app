import React from 'react'
import { TouchableOpacity } from 'react-native'
import styled from 'styled-components/native'
import colors from '../../styles/colors'
import { fonts } from '../../styles/themes'
import TranslatedText from '../TranslatedText'

interface BottomButtonProps {
  disabled?: boolean
  onPress: Function
  title: string
  loading?: boolean
}

const BottomButton = (props: BottomButtonProps) => {
  const { loading, disabled, title, onPress } = props

  const handlePress = () => {
    onPress()
  }

  return (
    <Container>
      <TouchableOpacity disabled={loading || disabled} onPress={handlePress}>
        <ButtonContainer disabled={loading || disabled}>
          {!loading && <ButtonText>{title}</ButtonText>}
          {loading && <Loader />}
        </ButtonContainer>
      </TouchableOpacity>
    </Container>
  )
}

export default BottomButton

interface ButtonProps {
  readonly disabled?: boolean
}

const Container = styled.View`
  margin: 10px 20px;
`

const ButtonContainer = styled.View<ButtonProps>`
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
  background-color: ${colors.radiantBlue};
  border-radius: 5px;
  padding: 15px;
`

const ButtonText = styled(TranslatedText)<ButtonProps>`
  opacity: ${(props) => (props.disabled ? 0.2 : 1)};
  color: ${colors.white};
  font-family: ${fonts.medium};
  text-align: center;
  font-size: 17px;
`

const Loader = styled.ActivityIndicator``
