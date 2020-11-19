import React from 'react'
import { Switch } from 'react-native'
import { useDispatch } from 'react-redux'
import styled from 'styled-components/native'
import FastImage from 'react-native-fast-image'
import { Container } from '../../Primitives/Primitives'
import { fonts, StyleProps } from '../../../styles/themes'

const GoogleFit = () => {
  const dispatch = useDispatch()
  const enabled = false

  const onValueChange = (value) => {
    // dispatch(toggleGoogleFit())
  }

  return (
    <Container>
      <Row>
        <Logo source={require('../../../../assets/appIcons/oura.jpg')} />
        <Name>Google Fit</Name>
      </Row>
      <Switch onValueChange={onValueChange} value={enabled} />
    </Container>
  )
}

export default GoogleFit

const Row = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 20px;
`

const Logo = styled.Image`
  height: 30px;
  width: 30px;
`

const Name = styled.Text`
  margin-left: 20px;
  font-family: ${fonts.bold};
  color: ${({ theme }) => theme.PRIMARY_TEXT_COLOR};
  font-size: 17px;
`
