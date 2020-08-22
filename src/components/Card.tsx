import React, { memo } from 'react'
import styled from 'styled-components/native'
import { StyleProps } from '../styles/themes'

interface CardProps {
  children: JSX.Element[] | JSX.Element
}

const Card = (props: CardProps) => (
  <CardContainer>{props.children}</CardContainer>
)

export default memo(Card)

const CardContainer = styled.View`
  background-color: ${(props: StyleProps) =>
    props.theme.SECONDARY_BACKGROUND_COLOR};
  padding: 10px 10px;
  box-shadow: 1px 1px 5px rgba(32, 33, 37, 0.1);
  z-index: 1;
  flex: 1;
  border-radius: 5px;
`
