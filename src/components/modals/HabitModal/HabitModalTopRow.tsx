import React, { FC, memo } from 'react'
import { GestureResponderEvent } from 'react-native'
import styled from 'styled-components/native'
import TranslatedText from '../../TranslatedText'
import { fonts } from '../../../styles/themes'
import colors from '../../../styles/colors'

type Props = {
  closeModal: (e: GestureResponderEvent) => void
  saveModal: () => void
  titleValue?: string
  formattedTitle?: string
  isValid: boolean
}

const HabitModalTopRow: FC<Props> = ({
  closeModal,
  isValid,
  titleValue,
  formattedTitle,
  saveModal
}) => {
  return (
    <TitleRow>
      <CancelButton onPress={closeModal}>
        <CancelText>Cancel</CancelText>
      </CancelButton>
      {titleValue ? (
        <Title>{titleValue}</Title>
      ) : (
        <FormattedTitle>{formattedTitle}</FormattedTitle>
      )}

      <CancelButton disabled={!isValid} onPress={saveModal}>
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

interface ButtonProps {
  readonly primary?: boolean
  readonly disabled?: boolean
}

const CancelText = styled(TranslatedText)<ButtonProps>`
  font-family: ${fonts.bold};
  font-size: 15px;
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  color: ${({ primary, theme }) =>
    primary ? colors.darkBlue : theme.PRIMARY_TEXT_COLOR};
`

const Title = styled(TranslatedText)`
  color: ${({ theme }) => theme.PRIMARY_TEXT_COLOR};
  font-size: 15px;
  font-family: ${fonts.bold};
  text-align: center;
`

const FormattedTitle = styled.Text`
  color: ${({ theme }) => theme.PRIMARY_TEXT_COLOR};
  font-size: 15px;
  font-family: ${fonts.bold};
  text-align: center;
`
