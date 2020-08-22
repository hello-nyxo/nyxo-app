import {
  changeHealthKitSource,
  toggleHealthKit
} from '@actions/sleep-source-actions/sleep-source-actions'
import EmptyState from 'components/EmptyState'
import SourceRow from 'components/SettingsSpecific/SourceRow'
import TranslatedText from 'components/TranslatedText'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  getAllHealthKitSources,
  getHealthKitSource,
  getIsHealthKitMainSource
} from 'store/Selectors/sleep-source-selectors/sleep-source-selectors'
import styled from 'styled-components/native'
import { constants } from 'styles/themes'

const HealthKitSection = () => {
  const dispatch = useDispatch()
  const sources = useSelector(getAllHealthKitSources)
  const isHealthKitMainSource = useSelector(getIsHealthKitMainSource)
  const healthKitSource = useSelector(getHealthKitSource)

  const onPress = (sourceId: any) => {
    const source = sources?.find((source) => source.sourceId === sourceId)
    if (source) {
      dispatch(changeHealthKitSource(source))
    }
  }

  const setHealthKitAsMainSource = () => {
    dispatch(toggleHealthKit())
  }

  const mapped = sources
    ? sources.map((item, key) => (
        <SourceRow
        key={key}
        sourceId={item.sourceId}
        sourceName={item.sourceName}
        selectedSourceId={healthKitSource?.sourceId}
        switchSource={onPress}
        />
      ))
    : []

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
      {isHealthKitMainSource && (
        <Sources>{mapped.length != 0 ? mapped : <EmptyState />}</Sources>
      )}
    </Container>
  )
}

{
  /* <P androidTranslation="SOURCE_SELECTION.BASIS_FOR_SLEEP_DATA_ANDROID">
SOURCE_SELECTION.BASIS_FOR_SLEEP_DATA_IOS
</P> */
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

const Switch = styled.Switch``

const Description = styled(TranslatedText)`
  font-size: 13px;
  font-family: ${({ theme }) => theme.FONT_MEDIUM};
  color: ${({ theme }) => theme.SECONDARY_TEXT_COLOR};
`
