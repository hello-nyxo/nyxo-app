import React, { memo } from 'react'
import * as Application from 'expo-application'
import styled from 'styled-components/native'
import colors from '@styles/colors'
import { fonts } from '@styles/themes'

const VersionInformation = () => {
  const version = Application.nativeApplicationVersion || '1.0.0'
  const buildNumber = Application.nativeBuildVersion || '1'

  return (
    <Container>
      <VersionText>
        Nyxo © Copyright {new Date().getFullYear()}.{'\n'}
        All rights reserved.
      </VersionText>
      <VersionText>Version {version} ({buildNumber})</VersionText>
    </Container>
  )
}

export default memo(VersionInformation)

const Container = styled.View`
  margin-top: 30px;
  align-items: center;
  justify-content: center;
  padding: 10px;
`

const VersionText = styled.Text`
  text-align: center;
  color: ${colors.gray2};
  margin-bottom: 5px;
  font-family: ${fonts.medium};
`
