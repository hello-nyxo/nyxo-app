import React, { FC } from 'react'
import styled from 'styled-components/native'

export const Week: FC = () => {
  return (
    <Container>
      <Cover />
      <Debug>debug</Debug>
    </Container>
  )
}

const Container = styled.View`
  flex: 1;
  width: 100%;
  background-color: red;
`
const Cover = styled.View``

const Debug = styled.Text``
