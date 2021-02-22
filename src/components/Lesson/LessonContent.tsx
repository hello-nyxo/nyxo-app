import React, { FC } from 'react'
import styled from 'styled-components/native'
import { Document } from '@contentful/rich-text-types'
import RichText from '../RichText'

type Props = {
  lessonContent?: Document
}

const LessonContent: FC<Props> = ({ lessonContent }) => (
  <Container>
    <RichText content={lessonContent} />
  </Container>
)

export default LessonContent

const Container = styled.View`
  margin: 20px;
`
