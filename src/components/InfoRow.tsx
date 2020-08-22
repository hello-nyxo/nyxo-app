import React, { memo } from 'react'
import styled from 'styled-components/native'
import { constants, fonts, StyleProps } from '../styles/themes'
import TranslatedText from './TranslatedText'

interface InfoRowProps {
  title: string
  figure: string
}

const InfoRow = (props: InfoRowProps) => {
  return (
    <Row>
      <Title>{props.title}</Title>
      <Figure>{props.figure}</Figure>
    </Row>
  )
}

export default memo(InfoRow)

const Row = styled.View<StyleProps>`
  padding: 20px 0px;
  margin: 0px 20px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-bottom-width: ${constants.hairlineWidth}px;
  border-bottom-color: ${(props) => props.theme.SECONDARY_TEXT_COLOR};
`

export const Title = styled(TranslatedText)<StyleProps>`
  text-align: center;
  font-size: 17px;
  font-family: ${fonts.medium};
  color: ${(props: StyleProps) => props.theme.PRIMARY_TEXT_COLOR};
`

const Figure = styled.Text<StyleProps>`
  text-align: center;
  font-size: 17px;
  font-family: ${fonts.medium};
  color: ${(props: StyleProps) => props.theme.PRIMARY_TEXT_COLOR};
`
