import React, { FC } from 'react'
import { TouchableOpacity } from 'react-native'
import styled from 'styled-components/native'
import { fonts } from '@styles/themes'
import colors from '../../styles/colors'
import TranslatedText from '../TranslatedText'

type Props = {
  disabled?: boolean
  onPress: () => void
  title: string
  loading?: boolean
}

const BottomButton: FC<Props> = ({ loading, disabled, title, onPress }) => {
  return (
    <Container>
      <TouchableOpacity disabled={loading || disabled} onPress={onPress}>
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
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  background-color: ${colors.darkBlue};
  border-radius: 5px;
  padding: 15px;
  box-shadow: 1px 1px 5px rgba(74, 90, 239, 0.4);
  align-self: center;
  min-width: 200px;
`

const ButtonText = styled(TranslatedText)<ButtonProps>`
  opacity: ${({ disabled }) => (disabled ? 0.2 : 1)};
  color: ${colors.white};
  font-family: ${fonts.medium};
  text-align: center;
  font-size: 17px;
`

const Loader = styled.ActivityIndicator``
