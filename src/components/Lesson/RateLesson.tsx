import * as Analytics from 'appcenter-analytics'
import React, { memo, useState } from 'react'
import Intercom from 'react-native-intercom'
import { AirbnbRating, Rating } from 'react-native-ratings'
import styled from 'styled-components/native'
import { fonts, StyleProps } from '@styles/themes'
import colors from '../../styles/colors'
import TranslatedText from '../TranslatedText'

interface Props {
  lesson?: string
}

const RateLesson = (props: Props) => {
  const [showThanks, setShowThanks] = useState(false)

  const submitRating = async (rating: number) => {
    await Analytics.trackEvent(`Rated lesson ${props.lesson}`, {
      rating: `${rating}`
    })
    Intercom.logEvent(`Rated lesson ${props.lesson}`, { rating: `${rating}` })
    await setShowThanks(true)
  }

  return (
    <Container>
      <Title>RATE_LESSON</Title>
      <Subtitle>WHY_RATE_LESSON</Subtitle>
      <AirbnbRating
        showRating={false}
        defaultRating={0}
        reviews={['Terrible', 'Bad', 'Okay', 'Good', 'Great']}
        onFinishRating={submitRating}
      />
      <ThanksContainer>
        {showThanks ? <ThankYou>THANK_YOU_FOR_RATING</ThankYou> : null}
      </ThanksContainer>
    </Container>
  )
}

export default memo(RateLesson)

const Container = styled.View`
  padding: 20px 20px 50px;
  background-color: ${({ theme }) => theme.SECONDARY_BACKGROUND_COLOR};
`

const Title = styled(TranslatedText)`
  font-size: 20px;
  text-align: center;
  font-family: ${fonts.bold};
  color: ${({ theme }) => theme.PRIMARY_TEXT_COLOR};
`

const Subtitle = styled(TranslatedText)`
  margin: 20px 0px;
  font-size: 13px;
  text-align: center;
  font-family: ${fonts.medium};
  color: ${({ theme }) => theme.SECONDARY_TEXT_COLOR};
`
const ThankYou = styled(TranslatedText)`
  margin: 20px 0px;
  font-size: 13px;
  text-align: center;
  font-family: ${fonts.medium};
  color: ${({ theme }) => theme.SECONDARY_TEXT_COLOR};
`

const CustomRating = styled(Rating).attrs(({ theme }) => ({
  tintColor: theme.PRIMARY_BACKGROUND_COLOR,
  ratingBackgroundColor: theme.PRIMARY_BACKGROUND_COLOR,
  ratingColor: colors.darkBlue
}))``

const ThanksContainer = styled.View`
  min-height: 20px;
`
