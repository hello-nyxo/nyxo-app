import {
  changeHealthKitSource,
  toggleHealthKit
} from '@actions/sleep-source-actions/sleep-source-actions'
import EmptyState from '@components/EmptyState'
import SourceRow from '@components/SettingsSpecific/SourceRow'
import TranslatedText from '@components/TranslatedText'
import React, { FC } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  getAllHealthKitSources,
  getHealthKitSource,
  getIsHealthKitMainSource
} from '@selectors/sleep-source-selectors/sleep-source-selectors'
import styled from 'styled-components/native'
import { constants } from '@styles/themes'

const HealthKitSection: FC = () => {
  const dispatch = useDispatch()
  const sources = useSelector(getAllHealthKitSources)
  const isHealthKitMainSource = useSelector(getIsHealthKitMainSource)
  const healthKitSource = useSelector(getHealthKitSource)

  const onPress = (sourceId: string) => {
    const source = sources?.find((s) => s.sourceId === sourceId)
    if (source) {
      dispatch(changeHealthKitSource(source))
    }
  }

  const setHealthKitAsMainSource = () => {
    dispatch(toggleHealthKit())
  }

  const mapped = sources?.map((item, key) => (
    <SourceRow
      key={key}
      sourceId={item.sourceId}
      sourceName={item.sourceName}
      selectedSourceId={healthKitSource?.sourceId}
      switchSource={onPress}
    />
  ))

  return (
    <Container>
      <TitleRow>
        <Title>SOURCE.HEALTH_KIT</Title>
        <Switch
          value={isHealthKitMainSource}
          onValueChange={setHealthKitAsMainSource}
        />
      </TitleRow>
      <Description>SOURCE.HEALTH_KIT_DESCRIPTION</Description>
      <SourceTitle>SOURCE.AVAILABLE_HEALTHKIT</SourceTitle>
      {isHealthKitMainSource && <Sources>{mapped ?? <EmptyState />}</Sources>}
    </Container>
  )
}

export default HealthKitSection

const Container = styled.View`
  padding: 20px 20px;
  border-bottom-width: ${constants.hairlineWidth}px;
  border-bottom-color: ${({ theme }) => theme.HAIRLINE_COLOR};
  margin-bottom: 20px;
`

const Sources = styled.View``

const TitleRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 5px;
`

const Title = styled(TranslatedText)`
  font-family: ${({ theme }) => theme.FONT_BOLD};
  color: ${({ theme }) => theme.PRIMARY_TEXT_COLOR};
`

const SourceTitle = styled(TranslatedText)`
  font-family: ${({ theme }) => theme.FONT_BOLD};
  color: ${({ theme }) => theme.PRIMARY_TEXT_COLOR};
  font-size: 15px;
  margin: 16px 0px 8px;
`

const Switch = styled.Switch``

const Description = styled(TranslatedText)`
  font-size: 13px;
  font-family: ${({ theme }) => theme.FONT_MEDIUM};
  color: ${({ theme }) => theme.SECONDARY_TEXT_COLOR};
`
