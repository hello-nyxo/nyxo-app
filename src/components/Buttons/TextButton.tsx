import React, { memo } from 'react'
import { TouchableOpacity } from 'react-native'
import styled from 'styled-components/native'
import colors from '../../styles/colors'
import TranslatedText from '../TranslatedText'

interface TextButtonProps {
  center?: boolean
  children: any
  style?: any
  onPress: Function
}

const TextButton = (props: TextButtonProps) => {
  const handlePress = () => {
    props.onPress()
  }
  return (
    <TouchableOpacity style={props.style} onPress={handlePress}>
      <Container>
        <Text center>{props.children}</Text>
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
  font-size: 17px;
  color: ${colors.radiantBlue};
  text-align: ${(props) => (props.center ? 'center' : 'left')};
`

export default memo(TextButton)
