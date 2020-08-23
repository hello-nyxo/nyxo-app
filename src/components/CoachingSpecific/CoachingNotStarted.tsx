import React from 'react'
import styled from 'styled-components/native'
import { useSelector } from 'react-redux'
import { getCoachingNotStarted } from '@selectors/coaching-selectors'
import { getActiveCoaching } from '@selectors/subscription-selectors/SubscriptionSelectors'
import colors from '../../styles/colors'
import { fonts } from '../../styles/themes'
import TranslatedText from '../TranslatedText'

const CoachingNotStarted = () => {
  const coachingNotStarted = useSelector(getCoachingNotStarted)
  const hasActiveCoaching = useSelector(getActiveCoaching)

  if (!hasActiveCoaching) return null

  if (coachingNotStarted) {
    return (
      <Container>
        <Title>NOT_STARTED_TITLE</Title>
        <Explainer>NOT_STARTED</Explainer>
      </Container>
    )
  }
  return null
}

export default CoachingNotStarted

const Container = styled.View`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 10px 20px;
  background-color: ${colors.radiantBlue};
`

const Title = styled(TranslatedText)`
  color: white;
  font-family: ${fonts.bold};
  margin-bottom: 5px;
`

const Explainer = styled(TranslatedText)`
  color: white;
  font-size: 13px;
  font-family: ${fonts.regular};
`
