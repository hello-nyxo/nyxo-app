import TranslatedText from 'components/TranslatedText'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import styled from 'styled-components/native'
import { fonts, StyleProps } from 'styles/themes'

interface Props {
  removable?: boolean
  data: { key: string; value: string }
  chooseTag: Function
  chosen: boolean
}

const NoteTag = (props: Props) => {
  const {
    data: { key, value },
    chooseTag,
    chosen,
    removable
  } = props

  const opacity = removable ? 1 : chosen ? 0.35 : 1

  const onPress = () => {
    chooseTag(key)
  }

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={removable ? false : chosen}
      style={{ opacity }}>
      <Container>
        <TagText>{value}</TagText>
      </Container>
    </TouchableOpacity>
  )
}

export default NoteTag

const Container = styled.View<StyleProps>`
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  padding: 5px 10px;
  border-radius: 4px;
  background-color: ${(props) => props.theme.PRIMARY_BACKGROUND_COLOR};
  margin: 0px 5px 10px 5px;
`

const TagText = styled(TranslatedText)<StyleProps>`
  color: ${(props) => props.theme.SECONDARY_TEXT_COLOR};
  font-size: 14px;
  font-family: ${fonts.bold};
`
