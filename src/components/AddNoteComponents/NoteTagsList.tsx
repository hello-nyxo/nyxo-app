import TranslatedText from 'components/TranslatedText'
import React from 'react'
import styled from 'styled-components/native'
import colors from 'styles/colors'
import { fonts } from 'styles/themes'
import { NightNoteTags } from 'Types/NightNoteState'
import { NightNoteTagListProps } from './AddNoteModal'
import NoteTag from './NoteTag'

interface Props extends NightNoteTagListProps {}

const NoteTagsList = (props: Props) => {
  const { tags, chooseTag } = props
  const tagComponents = tags.map((tag, index) => (
    <NoteTag
      data={tag.data}
      key={`note-tags-list-tag-${tag.data.key}-${index}`}
      chooseTag={chooseTag}
      chosen={tag.chosen}
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
