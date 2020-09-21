import TranslatedText from 'components/TranslatedText'
import React, { useState } from 'react'
import { TouchableOpacity } from 'react-native'
import styled from 'styled-components/native'
import { fonts, StyleProps } from 'styles/themes'
import { NoteTagsListProps } from './NoteTagsList'

interface Props extends NoteTagsListProps {
  removable?: boolean
  data: { key: string; value: string }
}

const NoteTag = (props: Props) => {
  const {
    data: { key, value },
    addTag,
    removeTag,
    removable
  } = props

  const [chosen, setChosen] = useState(false)

  const chooseTag = () => {
    if (removable) removeTag(key)
    else addTag(key)
    setChosen(!chosen)
  }

  return (
    <TouchableOpacity
      onPress={chooseTag}
      style={{ opacity: chosen ? 0.35 : 1 }}>
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
