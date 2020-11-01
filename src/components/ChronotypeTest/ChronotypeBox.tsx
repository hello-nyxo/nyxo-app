import React from 'react'
import styled from 'styled-components/native'
import { fonts } from '@styles/themes'
import { Container } from '../Primitives/Primitives'

const ChronotypeBox = () => {
  return (
    <Container>
      <Title>Your Chronotype</Title>
    </Container>
  )
}

export default ChronotypeBox

const Title = styled.Text`
  font-family: ${fonts.bold};
  font-size: 15px;
`
