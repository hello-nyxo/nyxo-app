import React, { memo, useEffect, useState } from 'react'
import DeviceInfo from 'react-native-device-info'
import styled from 'styled-components/native'
import colors from '@styles/colors'
import { fonts } from '@styles/themes'

const VersionInformation = () => {
  const [version, setVersion] = useState('')

  useEffect(() => {
    async function updateVersion() {
      const readableVersion = await DeviceInfo.getReadableVersion()

      await setVersion(readableVersion)
    }
    updateVersion()
  }, [])

  return (
    <Container>
      <VersionText>
        Nyxo © Copyright {new Date().getFullYear()}.{'\n'}
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
