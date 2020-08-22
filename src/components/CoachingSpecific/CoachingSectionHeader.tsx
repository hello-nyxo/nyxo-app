import React, { memo } from 'react'
import styled from 'styled-components/native'
import { fonts, StyleProps } from '../../styles/themes'
import TranslatedText from '../TranslatedText'

interface CoachingSectionHeaderProps {
  title: string
  data: any
}
const CoachingSectionHeader = (props: CoachingSectionHeaderProps) =>
  props.data.length !== 0 ? (
    <SectionHeader>
      <SectionTitle>{props.title}</SectionTitle>
    </SectionHeader>
  ) : null

export default memo(CoachingSectionHeader)

const SectionHeader = styled.View<StyleProps>`
  background-color: ${(props) => props.theme.PRIMARY_BACKGROUND_COLOR};
  padding: 10px 20px;
`

const SectionTitle = styled(TranslatedText)<StyleProps>`
  font-family: ${fonts.bold};
  font-size: 22px;
  color: ${(props: StyleProps) => props.theme.PRIMARY_TEXT_COLOR};
`
