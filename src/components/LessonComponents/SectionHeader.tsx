import React, { memo } from 'react'
import styled from 'styled-components/native'
import { fonts } from '@styles/themes'
import { Document } from '@contentful/rich-text-types'
import colors from '../../styles/colors'
import RichText from '../RichText'

interface Props {
  title: string
  description: Document | undefined
}

const SectionHeader = (props: Props) => {
  const { title, description } = props

  return (
    <Container>
      <SectionTitle>{title}</SectionTitle>
      {description && <RichText content={description} />}
    </Container>
  )
}

export default memo(SectionHeader)

const SectionTitle = styled.Text`
  font-family: ${fonts.bold};
  font-size: 18px;
  color: ${colors.darkBlue};
  margin-bottom: 15px;
`

const Container = styled.View`
  padding: 20px 20px;
  background: ${({ theme }) => theme.PRIMARY_BACKGROUND_COLOR};
`
