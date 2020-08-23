import TranslatedText from 'components/TranslatedText'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getFitbitEnabled } from 'store/Selectors/api-selectors/api-selectors'
import { getIsGarminMainSource } from 'store/Selectors/sleep-source-selectors/sleep-source-selectors'
import styled from 'styled-components/native'
import { constants } from 'styles/themes'
import { toggleGarmin } from '@actions/api-actions/garmin-actions'

const GarminSection = () => {
  const dispatch = useDispatch()
  const isGarminMainSource = useSelector(getIsGarminMainSource)
  const fitbitAuthorized = useSelector(getFitbitEnabled)

  const setGarminAsSource = async () => {
    await dispatch(toggleGarmin())
  }

  return (
    <Container>
      <TitleRow>
        <Column>
          <LogoAndTitle>
            <Logo
              source={require('../../../assets/appIcons/garmin-icon.png')}
            />
            <Title>SOURCE.GARMIN</Title>
          </LogoAndTitle>
          <Description>SOURCE.GARMIN_DESCRIPTION</Description>
        </Column>
        <Switch value={isGarminMainSource} onValueChange={setGarminAsSource} />
      </TitleRow>
    </Container>
  )
}

export default GarminSection

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

const Logo = styled.Image`
  height: 25px;
  border-radius: 5px;
  width: 25px;
  margin-right: 10px;
`

const Description = styled(TranslatedText)`
  margin-top: 10px;
  font-size: 13px;
  font-family: ${({ theme }) => theme.FONT_MEDIUM};
  color: ${({ theme }) => theme.SECONDARY_TEXT_COLOR};
`
