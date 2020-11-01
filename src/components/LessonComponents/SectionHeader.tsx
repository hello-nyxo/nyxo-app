import React, { memo } from 'react'
import styled from 'styled-components/native'
import { fonts, StyleProps } from '@styles/themes'
import colors from '../../styles/colors'
import RichText from '../RichText'

interface Props {
  title: string
  description: any
}

const SectionHeader = (props: Props) => {
  const { title, description } = props
  const contentIsRightType = typeof description !== 'string'

  return (
    <Container>
      <SectionTitle>{title}</SectionTitle>
      {contentIsRightType && <RichText content={description} />}
    </Container>
  )
}

export default memo(SectionHeader)

const SectionTitle = styled.Text`
  font-family: ${fonts.bold};
  font-size: 18px;
  color: ${colors.radiantBlue};
  margin-bottom: 15px;
`

const Container = styled.View`
  padding: 20px 20px;
  background: ${(props: StyleProps) => props.theme.PRIMARY_BACKGROUND_COLOR};
`
