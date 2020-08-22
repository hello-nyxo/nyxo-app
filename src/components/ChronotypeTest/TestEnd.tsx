import React, { memo } from 'react'
import { View, Text, Dimensions } from 'react-native'
import styled from 'styled-components/native'
import { H1, P, Container } from '../Primitives/Primitives'
import { PrimaryButton } from '../Buttons/PrimaryButton'

const TestEnd = () => {
  return (
    <Page>
      <Container>
        <Text>End</Text>
      </Container>
    </Page>
  )
}

export default memo(TestEnd)

const { width } = Dimensions.get('window')

const Page = styled.View`
  width: ${width}px;
  flex: 1;
`
