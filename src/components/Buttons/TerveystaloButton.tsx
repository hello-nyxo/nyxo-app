import React, { FC } from 'react'
import { SvgCss } from 'react-native-svg'
import styled from 'styled-components/native'
import TerveystaloLogo from '../../../assets/terveystalo-logo.svg'

const TerveystaloButton: FC = () => {
  return (
    <Container>
      <SvgCss height={30} xml={TerveystaloLogo} />
    </Container>
  )
}

export default TerveystaloButton

const Container = styled.TouchableOpacity`
  padding: 10px;
  border-color: ${({ theme }) => theme.PRIMARY_BUTTON_COLOR};
  border-width: 1px;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.PRIMARY_BACKGROUND_COLOR};
`
