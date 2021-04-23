import TranslatedText from '@components/TranslatedText'
import React, { FC } from 'react'
import styled from 'styled-components/native'
import { useAppDispatch, useAppSelector } from '@hooks/redux'
import { authorizeFitbit } from '@reducers/apis/fitbit'
import { Switch } from '@components/Primitives/Primitives'

const FitbitSection: FC = () => {
  const dispatch = useAppDispatch()
  const isFitbitMainSource = useAppSelector(
    ({ source }) => source.source === 'fitbit'
  )

  const setFitbitAsSource = () => {
    dispatch(authorizeFitbit())
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
  padding: 20px;
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
