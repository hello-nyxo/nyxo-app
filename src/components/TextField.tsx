import React, { FC, useRef } from 'react'
import { TextInput, TextInputProps } from 'react-native'
import styled from 'styled-components/native'
import translate from '../config/i18n'
import colors from '../styles/colors'
import { constants, fonts } from '../styles/themes'
import { IconBold } from './iconRegular'
import TranslatedText from './TranslatedText'

interface Props extends TextInputProps {
  value?: string
  error?: string | boolean
  fieldName: string
  icon: string
  ref?: TextInput
}

const TextField: FC<Props> = ({
  value,
  onBlur,
  onEndEditing,
  onSubmitEditing,
  error,
  fieldName,
  icon,
  ref,
  keyboardType,
  autoCorrect,
  onChangeText,
  autoCompleteType,
  textContentType,
  autoCapitalize,
  returnKeyType,
  enablesReturnKeyAutomatically,
  placeholder,
  secureTextEntry
}) => {
  const inputRef = useRef<TextInput>(ref ?? null)

  const onFocus = () => {
    // eslint-disable-next-line no-unused-expressions
    inputRef?.current?.focus()
  }

  const hasError = !!error

  return (
    <Container onPress={onFocus}>
      <InputContainer error={hasError}>
        <LabelContainer>
          <Icon icon={icon} fill={colors.red} width={15} height={15} />
          <Label error={hasError}>{hasError ? error : fieldName}</Label>
        </LabelContainer>
        <InputField
          keyboardType={keyboardType}
          ref={inputRef}
          onChangeText={onChangeText}
          autoCorrect={autoCorrect}
          autoCompleteType={autoCompleteType}
          textContentType={textContentType}
          onBlur={onBlur}
          autoCapitalize={autoCapitalize}
          onEndEditing={onEndEditing}
          returnKeyType={returnKeyType}
          onSubmitEditing={onSubmitEditing}
          enablesReturnKeyAutomatically={enablesReturnKeyAutomatically}
          value={value}
          clearButtonMode="while-editing"
          placeholder={translate(`${placeholder}`)}
          placeholderTextColor={colors.gray2}
          secureTextEntry={secureTextEntry}
        />
      </InputContainer>
    </Container>
  )
}

export default TextField

const Container = styled.TouchableWithoutFeedback`
  max-height: 80px;
`

interface InputProps extends TextInputProps {
  readonly error?: boolean
  readonly icon?: string | boolean
}

const InputContainer = styled.View<InputProps>`
  margin: 10px 0px;
  padding: 10px;
  border-color: ${(props: InputProps) => (props.error ? colors.red : 'white')};
  border-width: ${constants.hairlineWidth}px;
  border-radius: 5px;
  background-color: ${({ theme }) => theme.bgSecondary};
  box-shadow: 1px 1px 15px rgba(32, 33, 37, 0.1);
  min-height: 70px;
`

const LabelContainer = styled.View`
  margin-bottom: 5px;
  flex-direction: row;
  align-items: center;
`

const Label = styled(TranslatedText)<InputProps>`
  font-family: ${({ theme }) => theme.medium};
  margin-left: 5px;
  color: ${({ theme, error }) => (error ? colors.red : theme.textSecondary)};
`

const InputField = styled.TextInput<InputProps>`
  min-width: 150px;
  font-family: ${({ theme }) => theme.medium};
  padding: 5px;
  color: ${({ theme }) => theme.textPrimary};
  font-size: 17px;
`
const Icon = styled(IconBold).attrs<InputProps>(({ theme, error, icon }) => ({
  fill: error ? colors.red : theme.textSecondary,
  name: error ? 'closeCircle' : icon
}))<InputProps>``
