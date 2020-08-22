import React, { memo } from 'react'
import { GestureResponderEvent } from 'react-native'
import styled from 'styled-components/native'
import TranslatedText from '../../TranslatedText'
import { fonts, StyleProps } from '../../../styles/themes'
import colors from '../../../styles/colors'

interface Props {
  closeModal: (e: GestureResponderEvent) => void
  saveModal: Function
  titleValue?: string
  formattedTitle?: string
  isValid: boolean
}

const HabitModalTopRow = (props: Props) => {
  const { isValid } = props
  return (
    <TitleRow>
      <CancelButton onPress={props.closeModal}>
        <CancelText>Cancel</CancelText>
      </CancelButton>
      {props.titleValue ? (
        <Title>{props.titleValue}</Title>
      ) : (
        <FormattedTitle>{props.formattedTitle}</FormattedTitle>
      )}

      <CancelButton disabled={!isValid} onPress={props.saveModal}>
        <CancelText disabled={!isValid} primary>
          Save
        </CancelText>
      </CancelButton>
    </TitleRow>
  )
}

export default memo(HabitModalTopRow)

const TitleRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
`

const CancelButton = styled.TouchableOpacity``

interface ButtonProps extends StyleProps {
  readonly primary?: boolean
  readonly disabled?: boolean
}

const CancelText = styled(TranslatedText)<ButtonProps>`
  font-family: ${fonts.bold};
  font-size: 15px;
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  color: ${({ primary, theme }) =>
    primary ? colors.radiantBlue : theme.PRIMARY_TEXT_COLOR};
`

const Title = styled(TranslatedText)`
  color: ${(props: StyleProps) => props.theme.PRIMARY_TEXT_COLOR};
  font-size: 15px;
  font-family: ${fonts.bold};
  text-align: center;
`

const FormattedTitle = styled.Text`
  color: ${(props: StyleProps) => props.theme.PRIMARY_TEXT_COLOR};
  font-size: 15px;
  font-family: ${fonts.bold};
  text-align: center;
`
