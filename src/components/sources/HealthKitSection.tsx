import EmptyState from '@components/EmptyState'
import SourceRow from '@components/SettingsSpecific/SourceRow'
import TranslatedText from '@components/TranslatedText'
import React, { FC } from 'react'
import styled from 'styled-components/native'
import { constants } from '@styles/themes'
import { useAppDispatch, useAppSelector } from '@hooks/redux'
import { initHealthKit } from '@reducers/apis/health-kit'
import { setSource, setSubSource } from '@reducers/source'
import { Switch } from '@components/Primitives/Primitives'

const HealthKitSection: FC = () => {
  const dispatch = useAppDispatch()
  const { source, subSource, subSources } = useAppSelector(
    (state) => state.source
  )

  const onPress = (sourceId: string) => {
    const selectedSource = subSources?.find((s) => s.sourceId === sourceId)
    if (source) {
      dispatch(setSubSource(selectedSource))
    }
  }

  const setHealthKitAsMainSource = () => {
    dispatch(initHealthKit())
    dispatch(setSource('health-kit'))
  }

  const mapped = subSources?.map((s) => (
    <SourceRow
      key={s.sourceId}
      sourceId={s.sourceId}
      sourceName={s.sourceName}
      selectedSourceId={subSource?.sourceId}
      switchSource={onPress}
    />
  ))

  return (
    <Container>
      <TitleRow>
        <Title>SOURCE.HEALTH_KIT</Title>
        <Switch
          value={source === 'health-kit'}
          onValueChange={setHealthKitAsMainSource}
        />
      </TitleRow>
      <Description>SOURCE.HEALTH_KIT_DESCRIPTION</Description>
      {source === 'health-kit' && (
        <>
          <SourceTitle>SOURCE.AVAILABLE_HEALTHKIT</SourceTitle>
          <Sources>{mapped ?? <EmptyState />}</Sources>
        </>
      )}
    </Container>
  )
}

export default HealthKitSection

const Container = styled.View`
  padding: 20px 20px;
  border-bottom-width: ${constants.hairlineWidth}px;
  border-bottom-color: ${({ theme }) => theme.hairline};
  margin-bottom: 20px;
`

const Sources = styled.View``

const TitleRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 5px;
`

const Title = styled(TranslatedText)`
  font-family: ${({ theme }) => theme.bold};
  color: ${({ theme }) => theme.textPrimary};
`

const SourceTitle = styled(TranslatedText)`
  font-family: ${({ theme }) => theme.bold};
  color: ${({ theme }) => theme.textPrimary};
  font-size: 15px;
  margin: 16px 0px 8px;
`

const Description = styled(TranslatedText)`
  font-size: 13px;
  font-family: ${({ theme }) => theme.medium};
  color: ${({ theme }) => theme.textSecondary};
`
