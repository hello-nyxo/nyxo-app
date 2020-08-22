import { useNavigation } from '@react-navigation/native'
import React, { memo, useEffect, useState } from 'react'
import DeviceInfo from 'react-native-device-info'
import styled from 'styled-components/native'
import colors from '../../styles/colors'
import { fonts } from '../../styles/themes'

const VersionInformation = () => {
  const navigation = useNavigation()
  const [version, setVersion] = useState()
  const [developerMenuCounter, incrementDevelopMenuCounter] = useState(0)

  useEffect(() => {
    async function updateVersion() {
      const readableVersion = await DeviceInfo.getReadableVersion()

      await setVersion(readableVersion)
    }
    updateVersion()
  }, [])

  const increment = () => {
    if (developerMenuCounter > 20) {
      navigation.navigate('DevelopmentMenu', {})
    } else {
      incrementDevelopMenuCounter(developerMenuCounter + 1)
    }
  }

  return (
    <Container>
      <VersionText onPress={increment}>
        Nyxo © Copyright 2019.
        {'\n'}
        All rights reserved.
      </VersionText>
      <VersionText>Version {version}</VersionText>
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
