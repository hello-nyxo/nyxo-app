import { getTitle } from '@helpers/time'
import React, { memo, FC } from 'react'
import styled from 'styled-components/native'
import { Bordered, Container, H2, P } from '../Primitives/Primitives'

export const TodayView: FC = () => {
  const { title } = getTitle()
  return (
    <Container>
      <Bordered>
        <H2>{title}</H2>
      </Bordered>
    </Container>
  )
}

export default memo(TodayView)

const Text = styled(P)`
  min-height: 60px;
  margin-bottom: 10px;
`
