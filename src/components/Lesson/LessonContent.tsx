import React, { memo, FC } from 'react'
import styled from 'styled-components/native'
import { Document } from '@contentful/rich-text-types'
import RichText from '../RichText'

type Props = {
  lessonContent?: Document
}

const LessonContent: FC<Props> = ({ lessonContent }) => {
  const contentIsHtml = typeof lessonContent === 'string'
  if (!lessonContent || contentIsHtml) {
    return null
  }

  return (
    <Container>
      <RichText content={lessonContent} />
    </Container>
  )
}

export default memo(LessonContent)

const Container = styled.View`
  margin: 20px;
`
