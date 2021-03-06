import React, { FC } from 'react'
import styled from 'styled-components/native'
import { Document } from '@contentful/rich-text-types'
import RichText from '../RichText'
import { AssetBlock } from '@typings/contentful'

type Props = {
  lessonContent?: Document
  assets?: {
    block: AssetBlock[]
  }
}

const LessonContent: FC<Props> = ({ lessonContent, assets }) => (
  <Container>
    <RichText content={lessonContent} assets={assets} />
  </Container>
)

export default LessonContent

const Container = styled.View`
  margin: 20px;
`
