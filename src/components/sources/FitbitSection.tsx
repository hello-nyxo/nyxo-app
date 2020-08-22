import { toggleFitbit } from '@actions/api-actions/fitbit-actions'
import TranslatedText from 'components/TranslatedText'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getFitbitEnabled } from 'store/Selectors/api-selectors/api-selectors'
import { getIsFitbitMainSource } from 'store/Selectors/sleep-source-selectors/sleep-source-selectors'
import styled from 'styled-components/native'
import colors from 'styles/colors'

const FitbitSection = () => {
  const dispatch = useDispatch()
  const isFitbitMainSource = useSelector(getIsFitbitMainSource)
  const fitbitAuthorized = useSelector(getFitbitEnabled)

  const setFitbitAsSource = () => {
    dispatch(toggleFitbit())
  }

  return (
    <Container>
      <TitleRow>
        <Column>
          <LogoAndTitle>
            <FitbitLogo
              source={require('../../../assets/appIcons/fitbit-app-icon.png')}
            />
            <Title>SOURCE.FITBIT</Title>
          </LogoAndTitle>
          <Description>SOURCE.FITBIT_DESCRIPTION</Description>
        </Column>
        <Switch value={isFitbitMainSource} onValueChange={setFitbitAsSource} />
      </TitleRow>
    </Container>
  )
}

export default FitbitSection

const Container = styled.View`
  padding: 0px 20px;
`

const TitleRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
`

const Column = styled.View`
  flex-direction: column;
  flex: 1;
`

const LogoAndTitle = styled.View`
  flex-direction: row;
  align-items: center;
`

const Title = styled(TranslatedText)`
  font-size: 15px;
  font-family: ${({ theme }) => theme.FONT_BOLD};
  color: ${({ theme }) => theme.PRIMARY_TEXT_COLOR};
`

const Switch = styled.Switch``

const FitbitLogo = styled.Image`
  height: 25px;
  width: 25px;
  margin-right: 10px;
`

const Description = styled(TranslatedText)`
  margin-top: 10px;
  font-size: 13px;
  font-family: ${({ theme }) => theme.FONT_MEDIUM};
  color: ${({ theme }) => theme.SECONDARY_TEXT_COLOR};
`
