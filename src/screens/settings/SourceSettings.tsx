import FitbitSection from '@components/sources/FitbitSection'
import GoogleFitSection from '@components/sources/GoogleFitSection'
import HealthKitSection from '@components/sources/HealthKitSection'
import OuraSection from '@components/sources/OuraSection'
import WithingsSection from '@components/sources/WithingsSection'
import GarminSection from '@components/sources/GarminSection'
import ROUTE from '@config/routes/Routes'
import React, { memo } from 'react'
import { Platform, ScrollView } from 'react-native'
import styled from 'styled-components/native'
import GoBack, { GoBackContainer } from '@components/Buttons/GoBack'
import {
  Container,
  H2,
  P,
  SafeAreaView
} from '@components/Primitives/Primitives'
import PolarSection from '@components/sources/PolarSection'

const SetSourceScreen = () => {
  return (
    <SafeAreaView>
      <ScrollView>
        <GoBackContainer>
          <GoBack route={ROUTE.SETTINGS} />
        </GoBackContainer>
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
      </ScrollView>
    </SafeAreaView>
  )
}

export default memo(SetSourceScreen)

const Spacer = styled.View`
  margin-bottom: 50px;
`
