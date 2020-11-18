import React from 'react'
import { Button, ImageSourcePropType, Switch } from 'react-native'
import styled from 'styled-components/native'
import { fonts, StyleProps } from '../../../styles/themes'
import { P } from '../../Primitives/Primitives'

const isDeveloper = __DEV__

interface Props {
  name: string
  toggleFunction: Function
  enabled: boolean
  testFunction: Function
  refreshFunction: Function
  image: ImageSourcePropType
}

const EnableSource = (props: Props) => {
  const {
    name,
    toggleFunction,
    testFunction,
    enabled,
    refreshFunction,
    image
  } = props

  const onValueChange = (value: boolean) => {
    toggleFunction()
  }

  const onTest = () => {
    testFunction()
  }

  const onRefresh = () => {
    refreshFunction()
  }

  return (
    <>
      <Row>
        <LogoContainer>
          <Logo source={image} />
          <Name>{name}</Name>
        </LogoContainer>

        <Switch onValueChange={onValueChange} value={enabled} />
      </Row>

      {isDeveloper && (
        <DeveloperTools>
          <Button onPress={onTest} title="Test API" />
          <Button onPress={onRefresh} title="Refresh" />
        </DeveloperTools>
      )}
    </>
  )
}

export default EnableSource

const Row = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 20px;
`

const LogoContainer = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
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

const Text = styled(P)`
  margin: 0px;
  flex: 1;
  margin-right: 30px;
`

const SwitchRow = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`

const DeveloperTools = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`
