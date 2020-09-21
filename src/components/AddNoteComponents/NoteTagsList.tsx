import TranslatedText from 'components/TranslatedText'
import React from 'react'
import styled from 'styled-components/native'
import colors from 'styles/colors'
import { fonts } from 'styles/themes'
import { NightNoteTags } from 'Types/NightNoteState'
import NoteTag from './NoteTag'

export interface NoteTagsListProps {
  addTag: Function
  removeTag: Function
}

const NoteTagsList = (props: NoteTagsListProps) => {
  const { addTag, removeTag } = props
  const tagComponents = Object.entries(NightNoteTags).map((entry, index) => (
    <NoteTag
      data={{ key: entry[0], value: entry[1] }}
      key={`note-tags-list-tag-${entry[1]}-${index}`}
      addTag={addTag}
      removeTag={removeTag}
    />
  ))

  return (
    <Container>
      <TagsTitle>NIGHT_NOTE.TAGS_TITLE</TagsTitle>
      <Spacer />

      <WrappedContainer>{tagComponents}</WrappedContainer>
    </Container>
  )
}

export default NoteTagsList

const Container = styled.View`
  margin-top: 80px;
`

const Spacer = styled.View`
  height: 20px;
`

const TagsTitle = styled(TranslatedText)`
  font-family: ${fonts.bold};
  font-size: 18px;
  color: ${colors.radiantBlue};
`
const WrappedContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
`
