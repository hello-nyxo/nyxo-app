import React from 'react'
import styled from 'styled-components/native'
import { NightNoteTags } from 'Types/NightNoteState'
import NoteTag from './NoteTag'
import { NoteTagsListProps } from './NoteTagsList'

interface Props extends NoteTagsListProps {
  addedTags: Array<string>
}

const AddedNoteTagsList = (props: Props) => {
  const { addedTags, addTag, removeTag } = props

  const tagComponents = addedTags.map((tag, index) => (
    <NoteTag
      removable
      key={`added-note-tags-list-tag-${tag}-${index}`}
      addTag={addTag}
      removeTag={removeTag}
      data={{ key: tag, value: Object(NightNoteTags)[tag] }}
    />
  ))

  return (
    <Container>
      <WrappedContainer>{tagComponents}</WrappedContainer>
    </Container>
  )
}

export default AddedNoteTagsList

const Container = styled.View`
  margin-top: 30px;
`

const WrappedContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
`
