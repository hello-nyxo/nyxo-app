import TranslatedText from '@components/TranslatedText'
import React, { FC } from 'react'
import styled from 'styled-components/native'
import { constants } from '@styles/themes'
import { useAppDispatch, useAppSelector } from '@hooks/redux'
import { Switch } from '@components/Primitives/Primitives'
import { authorizePolar } from '@reducers/apis/polar'

const PolarSection: FC = () => {
  const dispatch = useAppDispatch()
  const isPolarMainSource = useAppSelector(
    ({ source }) => source.source === 'polar'
  )

  const setPolarAsSource = () => {
    dispatch(authorizePolar())
  }

  return (
    <Container>
      <TitleRow>
        <Column>
          <LogoAndTitle>
            <Logo source={require('@assets/appIcons/polar-app-icon.png')} />
            <Title>SOURCE.POLAR</Title>
          </LogoAndTitle>
          <Description>SOURCE.POLAR_DESCRIPTION</Description>
        </Column>
        <Switch value={isPolarMainSource} onValueChange={setPolarAsSource} />
      </TitleRow>
    </Container>
  )
}

export default PolarSection

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
