import React from 'react'
import styled from 'styled-components/native'
import { PageTitle, H3 } from '../Primitives/Primitives'
import WeekCarousel from './WeekCarousel'
import IntroduceCoaching from './IntroduceCoaching'

const CoachingHeader = () => (
  <>
    <PageTitle>Coaching</PageTitle>
    <IntroduceCoaching />
    <WeekCarousel />
    <PaddedH3>GoalsTitle</PaddedH3>
  </>
)

export default CoachingHeader

const PaddedH3 = styled(H3)`
  margin: 30px 20px 10px;
`
