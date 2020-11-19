import { Container, H2, P } from '@components/Primitives/Primitives'
import FitbitSection from '@components/sources/FitbitSection'
import GarminSection from '@components/sources/GarminSection'
import GoogleFitSection from '@components/sources/GoogleFitSection'
import HealthKitSection from '@components/sources/HealthKitSection'
import OuraSection from '@components/sources/OuraSection'
import PolarSection from '@components/sources/PolarSection'
import WithingsSection from '@components/sources/WithingsSection'
import React, { FC } from 'react'
import { Platform } from 'react-native'
import styled from 'styled-components/native'

export const SourceSettingsView: FC = () => {
  return (
    <>
      <Container>
        <H2>SOURCE_SELECTION.TITLE</H2>
        <P>SOURCE_SELECTION.DESCRIPTION</P>
      </Container>

      {Platform.OS === 'ios' && <HealthKitSection />}
      <GoogleFitSection />
      <OuraSection />
      <WithingsSection />
      <PolarSection />
      <GarminSection />
      <FitbitSection />
      <Spacer />
    </>
  )
}

const Spacer = styled.View`
  margin-bottom: 50px;
`
