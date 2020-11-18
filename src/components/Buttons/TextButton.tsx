import React, { FC } from 'react'
import { TouchableOpacity, ViewStyle } from 'react-native'
import styled from 'styled-components/native'
import colors from '../../styles/colors'
import TranslatedText from '../TranslatedText'

type Props = {
  center?: boolean
  children: string
  style?: ViewStyle
  onPress: () => void
}

const TextButton: FC<Props> = ({ onPress, children, style }) => {
  return (
    <TouchableOpacity style={style} onPress={onPress}>
      <Container>
        <Text center>{children}</Text>
      </Container>
    </TouchableOpacity>
  )
}

const Container = styled.View`
  padding: 5px;
  margin-left: 20px;
  margin-right: 20px;
`

interface TextProps {
  readonly center?: boolean
}

const Text = styled(TranslatedText)<TextProps>`
  font-size: 15px;
  color: ${colors.darkBlue};
  font-family: ${({ theme }) => theme.FONT_MEDIUM};
  text-align: ${({ center }) => (center ? 'center' : 'left')};
`

export default TextButton
