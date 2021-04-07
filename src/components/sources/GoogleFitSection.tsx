import EmptyState from '@components/EmptyState'
import SourceRow from '@components/SettingsSpecific/SourceRow'
import TranslatedText from '@components/TranslatedText'
import React, { FC } from 'react'
import styled from 'styled-components/native'
import { constants } from '@styles/themes'
import { useAppDispatch, useAppSelector } from '@hooks/redux'
import { setSource, setSubSource } from '@reducers/source'
import { Switch } from '@components/Primitives/Primitives'

const GoogleFitSection: FC = () => {
  const dispatch = useAppDispatch()
  const sources = []
  const isGoogleFitMainSource = useAppSelector(
    ({ source }) => source.source === 'google-fit'
  )
  const subSource = useAppSelector(({ source }) => source.subSource)

  const onPress = (sourceId: string) => {
    const source = sources?.find((s) => s.sourceId === sourceId)
    if (source) {
      dispatch(setSubSource(source))
    }
  }

  const setGoogleFitAsSource = () => {
    dispatch(setSource('google-fit'))
  }

  const mapped = sources?.map((item) => (
    <SourceRow
      key={item.sourceId}
      sourceId={item.sourceId}
      sourceName={item.sourceName}
      selectedSourceId={subSource?.sourceId}
      switchSource={onPress}
    />
  ))

  return (
    <Container>
      <TitleRow>
        <Column>
          <LogoAndTitle>
            <GoogleFitLogo
              source={require('../../../assets/appIcons/google-fit-icon.png')}
            />
            <Title>SOURCE.GOOGLE_FIT</Title>
          </LogoAndTitle>
          <Description>SOURCE.GOGLE_FIT_DESCRIPTION</Description>
        </Column>
        <Switch
          value={isGoogleFitMainSource}
          onValueChange={setGoogleFitAsSource}
        />
      </TitleRow>

      {isGoogleFitMainSource && (
        <Sources>{mapped?.length !== 0 ? mapped : <EmptyState />}</Sources>
      )}
    </Container>
  )
}

export default GoogleFitSection

const Container = styled.View`
  padding: 20px;
  margin-bottom: 30px;
  border-bottom-width: ${constants.hairlineWidth}px;
  border-bottom-color: ${({ theme }) => theme.HAIRLINE_COLOR};
`

const Sources = styled.View``

const TitleRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
`

const LogoAndTitle = styled.View`
  flex-direction: row;
  align-items: center;
`

const GoogleFitLogo = styled.Image`
  height: 25px;
  width: 25px;
  margin-right: 10px;
`

const Title = styled(TranslatedText)`
  font-size: 15px;
  font-family: ${({ theme }) => theme.FONT_BOLD};
  color: ${({ theme }) => theme.PRIMARY_TEXT_COLOR};
`

const Description = styled(TranslatedText)`
  margin-top: 10px;
  font-size: 13px;
  font-family: ${({ theme }) => theme.FONT_MEDIUM};
  color: ${({ theme }) => theme.SECONDARY_TEXT_COLOR};
`

const Column = styled.View`
  flex-direction: column;
  flex: 1;
`
