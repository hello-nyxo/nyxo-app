import React, { memo } from 'react'
import styled from 'styled-components/native'
import { fonts } from '@styles/themes'

const Copyright = () => (
  <Container>
    <Text>© {new Date().getFullYear()} Nyxo All Rights Reserved</Text>
  </Container>
)

export default memo(Copyright)

const Container = styled.View`
  height: 100px;
  padding: 20px;
  margin-bottom: 50px;
  justify-content: flex-end;
`

const Text = styled.Text`
  font-family: ${fonts.medium};
  text-align: center;
  color: ${({ theme }) => theme.SECONDARY_TEXT_COLOR};
`
