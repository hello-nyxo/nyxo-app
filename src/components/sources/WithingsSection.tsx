import TranslatedText from '@components/TranslatedText'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getFitbitEnabled } from '@selectors/api-selectors/api-selectors'
import { getIsWithingsMainSource } from '@selectors/sleep-source-selectors/sleep-source-selectors'
import styled from 'styled-components/native'
import { toggleWithings } from '@actions/api-actions/withings-actions'
import { constants } from 'styles/themes'

const WithingsSection = () => {
  const dispatch = useDispatch()
  const isWithingsMainSource = useSelector(getIsWithingsMainSource)
  const fitbitAuthorized = useSelector(getFitbitEnabled)

  const setWithingsAsSource = () => {
    dispatch(toggleWithings())
  }

  return (
    <Container>
      <TitleRow>
        <Column>
          <LogoAndTitle>
            <Logo
              source={require('../../../assets/appIcons/withings-icon.png')}
            />
            <Title>SOURCE.WITHINGS</Title>
          </LogoAndTitle>
          <Description>SOURCE.WITHINGS_DESCRIPTION</Description>
        </Column>
        <Switch
          value={isWithingsMainSource}
          onValueChange={setWithingsAsSource}
        />
      </TitleRow>
    </Container>
  )
}

export default WithingsSection

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
