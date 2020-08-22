import React from 'react'
import styled from 'styled-components/native'
import { constants, StyleProps } from '../../styles/themes'

const Separator = () => {
  return <Line />
}

export default Separator

const Line = styled.View`
  height: ${constants.hairlineWidth}px;
  margin-left: 20px;
  background-color: ${(props: StyleProps) => props.theme.HAIRLINE_COLOR};
  width: 100%;
`
