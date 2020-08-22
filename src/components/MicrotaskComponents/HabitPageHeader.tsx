import React from 'react'
import { Container, H1, P } from '../Primitives/Primitives'
import BackButton from '../Buttons/backButton'

const HabitPageHeader = () => {
  return (
    <Container>
      <BackButton dark title="Back" />
      <H1 adjustsFontSizeToFit>Microtasks</H1>
      <P>HABIT_EXPL_1</P>
      <P>HABIT_EXPL_2</P>
    </Container>
  )
}

export default HabitPageHeader
