import React, { memo } from 'react'
import { Linking } from 'react-native'
import styled from 'styled-components/native'
import { fonts } from '@styles/themes'
import CONFIG from '@config/config'

const Disclaimer = () => {
  const openTerms = () => {
    Linking.openURL(CONFIG.TERMS_LINK)
  }

  const openPrivacyPolicy = () => {
    Linking.openURL(CONFIG.PRIVACY_LINK)
  }

  return (
    <DisclaimerContainer>
      <DisclaimerText>
        By creating a Nyxo Cloud Account, I agree to Nyxo&apos;s
        <UnderLine onPress={openTerms}> Terms of Service</UnderLine> and{' '}
        <UnderLine onPress={openPrivacyPolicy}>Privacy Policy</UnderLine>
      </DisclaimerText>
    </DisclaimerContainer>
  )
}

export default memo(Disclaimer)

const DisclaimerContainer = styled.View`
  margin: 30px 0px;
`

const UnderLine = styled.Text`
  color: ${({ theme }) => theme.accent};
  margin: 0px 5px;
  text-decoration: underline;
`

const DisclaimerText = styled.Text`
  color: ${({ theme }) => theme.SECONDARY_TEXT_COLOR};
  font-family: ${fonts.medium};
  line-height: 25px;
`
