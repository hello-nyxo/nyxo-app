import React, { memo } from 'react'
import styled from 'styled-components/native'
import { Document } from '@contentful/rich-text-types'
import RichText from '../RichText'

interface Props {
  handleOnLayout: Function
  lessonContent?: Document
}

const LessonContent = (props: Props) => {
  const { lessonContent } = props

  const contentIsHtml = typeof lessonContent === 'string'
  if (!lessonContent || contentIsHtml) {
    return null
  }

  return (
    <Container>
      <RichText content={props.lessonContent} />
    </Container>
  )
}

export default memo(LessonContent)

const Container = styled.View`
  margin: 20px;
`
