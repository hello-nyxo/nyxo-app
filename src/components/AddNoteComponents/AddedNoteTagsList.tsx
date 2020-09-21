import React from 'react'
import styled from 'styled-components/native'
import { NightNoteTagListProps } from './AddNoteModal'
import NoteTag from './NoteTag'

interface Props extends NightNoteTagListProps {}

const AddedNoteTagsList = (props: Props) => {
  const { tags, chooseTag } = props

  const tagComponents = tags.map((tag, index) => {
    if (tag.chosen) {
      return (
        <NoteTag
          removable
          key={`added-note-tags-list-tag-${tag.data.key}-${index}`}
          chooseTag={chooseTag}
          data={tag.data}
          chosen={tag.chosen}
        />
      )
    }

    return null
  })

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
