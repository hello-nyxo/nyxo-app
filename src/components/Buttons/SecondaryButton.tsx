import React from 'react'
import styled from 'styled-components/native'
import { fonts } from '@styles/themes'
import colors from '../../styles/colors'
import TranslatedText from '../TranslatedText'
import ScalingButton from './ScalingButton'

interface Props {
  disabled?: boolean
  onPress: () => void
  title: string
  white?: boolean
}

export const SecondaryButton: React.SFC<Props> = (props) => {
  return (
    <ScalingButton
      disabled={props.disabled}
      onPress={props.onPress}
      analyticsEvent={`Secondary button ${props.title} pressed`}>
      <Button white={props.white} disabled={props.disabled}>
        <ButtonText white={props.white} disabled={props.disabled}>
          {props.title}
        </ButtonText>
      </Button>
    </ScalingButton>
  )
}

interface ButtonProps {
  readonly disabled?: boolean
  readonly white?: boolean
}

const Button = styled.View<ButtonProps>`
  border-radius: 5px;
  padding: 15px;
  min-width: 150px;
  margin-bottom: 10px;
  width: auto;
  align-items: center;
  background-color: ${(props) =>
    props.white ? colors.white : colors.darkBlue};
  opacity: ${(props: ButtonProps) => (props.disabled ? 0.2 : 1)};
`

const ButtonText = styled(TranslatedText)<ButtonProps>`
  font-family: ${fonts.medium};
  color: ${(props) => (props.white ? colors.darkBlue : colors.white)};
  font-size: 15px;
  text-align: center;
  opacity: ${(props: ButtonProps) => (props.disabled ? 0.5 : 1)};
`
