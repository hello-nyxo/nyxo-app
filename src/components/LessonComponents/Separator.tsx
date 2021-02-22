import React, { FC } from 'react'
import styled from 'styled-components/native'
import { constants } from '@styles/themes'

const Separator = (): FC => <Line />

export default Separator

const Line = styled.View`
  height: ${constants.hairlineWidth}px;
  margin-left: 20px;
  background-color: ${({ theme }) => theme.HAIRLINE_COLOR};
  width: 100%;
`
