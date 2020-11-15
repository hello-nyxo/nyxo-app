import React, { FC, memo, ReactNode } from 'react'
import styled from 'styled-components/native'

type Props = {
  children?: JSX.Element[] | JSX.Element | null | ReactNode
}

const Card: FC<Props> = ({ children }) => (
  <CardContainer>{children}</CardContainer>
)

export default memo(Card)

const CardContainer = styled.View`
  background-color: ${({ theme }) => theme.SECONDARY_BACKGROUND_COLOR};
  padding: 8px;
  box-shadow: ${({ theme }) => theme.SHADOW};
  z-index: 1;
  flex: 1;
  border-radius: 7px;
`
