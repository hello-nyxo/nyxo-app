import { authorizeOura } from '@actions/api-actions/oura-actions'
import TranslatedText from 'components/TranslatedText'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getOuraEnabled } from 'store/Selectors/api-selectors/api-selectors'
import { getIsOuraMainSource } from 'store/Selectors/sleep-source-selectors/sleep-source-selectors'
import styled from 'styled-components/native'
import colors from 'styles/colors'
import { constants } from 'styles/themes'

const OuraSection = () => {
  const dispatch = useDispatch()
  const isOuraMainSource = useSelector(getIsOuraMainSource)
  const ouraAuthorized = useSelector(getOuraEnabled)

  const setFitbitAsSource = () => {
    dispatch(authorizeOura())
  }

  return (
    <Container>
      <TitleRow>
        <Column>
          <LogoAndTitle>
            <OuraLogo source={require('../../../assets/appIcons/oura.jpg')} />
            <Title>SOURCE.OURA</Title>
          </LogoAndTitle>
          <Description>SOURCE.OURA_DESCRIPTION</Description>
        </Column>
        <Switch value={isOuraMainSource} onValueChange={setFitbitAsSource} />
      </TitleRow>
    </Container>
  )
}

export default OuraSection

const Container = styled.View`
  padding: 20px;
  margin-bottom: 30px;
  border-bottom-width: ${constants.hairlineWidth}px;
  border-bottom-color: ${({ theme }) => theme.HAIRLINE_COLOR};
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

const OuraLogo = styled.Image`
  height: 25px;
  width: 25px;
  border-radius: 5px;
  margin-right: 10px;
`

const Description = styled(TranslatedText)`
  margin-top: 10px;
  font-size: 13px;
  font-family: ${({ theme }) => theme.FONT_MEDIUM};
  color: ${({ theme }) => theme.SECONDARY_TEXT_COLOR};
`
