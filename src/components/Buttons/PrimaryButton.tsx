import React, { FC } from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import styled from 'styled-components/native'
import colors from '../../styles/colors'
import TranslatedText from '../TranslatedText'

type Props = {
  disabled?: boolean
  onPress: () => void
  title: string
  white?: boolean
  loading?: boolean
}

export const PrimaryButton: FC<Props> = ({
  loading,
  white,
  disabled,
  title,
  onPress
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      disabled={loading || disabled}
      onPress={onPress}>
      <Button white={white} disabled={loading || disabled}>
        <ButtonText white={white} disabled={loading || disabled}>
          {title}
        </ButtonText>
        {loading ? <Loading /> : null}
      </Button>
    </TouchableOpacity>
  )
}

interface ButtonProps {
  readonly disabled?: boolean
  readonly white?: boolean
}

const Button = styled.View<ButtonProps>`
  border-radius: 8px;
  border-color: ${({ white }) => (white ? colors.darkBlue : 'transparent')};
  border-width: 1px;
  padding: 16px;
  min-width: 200px;
  margin-bottom: 10px;
  align-items: center;
  flex-direction: row;
  justify-content: center;
  background-color: ${({ white, theme }) =>
    white ? colors.white : theme.accent};
  opacity: ${({ disabled }) => (disabled ? 0.75 : 1)};
  box-shadow: 1px 1px 5px rgba(74, 90, 239, 0.4);
  align-self: center;
`

const ButtonText = styled(TranslatedText)<ButtonProps>`
  font-family: ${({ theme }) => theme.FONT_BOLD};
  text-transform: uppercase;
  letter-spacing: 1px;
  color: ${({ white, theme }) => (white ? theme.accent : colors.white)};
  font-size: 15px;
  text-align: center;
`

const Loading = styled.ActivityIndicator`
  margin-left: 10px;
`
