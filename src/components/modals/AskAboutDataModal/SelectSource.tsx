import React, { memo } from 'react'
import { View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components/native'
import { changeHealthKitSource } from '@actions/sleep-source-actions/sleep-source-actions'
import { markIntroductionCompleted } from '@actions/user/user-actions'
import { fonts, StyleProps } from '../../../styles/themes'
import {
  getPrimarySource,
  getSources
} from '../../../store/Selectors/SleepDataSelectors'
import { PrimaryButton } from '../../Buttons/PrimaryButton'
import { P } from '../../Primitives/Primitives'
import SourceRow from '../../SettingsSpecific/SourceRow'
import TranslatedText from '../../TranslatedText'

const SelectSource = () => {
  const dispatch = useDispatch()
  const sources = useSelector(getSources)
  const primarySource = useSelector(getPrimarySource)

  const done = () => {
    dispatch(markIntroductionCompleted(true))
  }

  const mappedSources = sources
    ? sources.map((source, index) => {
        const switchSource = () => {
          dispatch(changeHealthKitSource(source))
        }

        return (
          <SourceRow
            key={index}
            switchSource={switchSource}
            sourceId={source.sourceId}
            selectedSourceId={primarySource.sourceId}
            sourceName={source.sourceName}
          />
        )
      })
    : []

  return (
    <>
      <View>
        <Title>SELECT_SOURCE</Title>
        <P>SELECT_SOURCE_TEXT</P>
      </View>

      <Sources>{mappedSources}</Sources>
      <PrimaryButton onPress={done} title="Done" />
    </>
  )
}

export default memo(SelectSource)

const Title = styled(TranslatedText)<StyleProps>`
  text-align: center;
  font-size: 21px;
  margin-bottom: 10px;
  margin-top: 5px;
  font-weight: bold;
  color: ${(props: StyleProps) => props.theme.PRIMARY_TEXT_COLOR};
  font-family: ${fonts.bold};
`

const Sources = styled.ScrollView``

interface SourceProps {
  readonly selected?: boolean
}

const Source = styled.TouchableOpacity<SourceProps>`
  margin: 10px 0px;
`

const SourceName = styled.Text`
  font-family: ${fonts.medium};
  font-size: 17px;
  color: ${(props: StyleProps) => props.theme.PRIMARY_TEXT_COLOR};
`
const SampleCount = styled.Text``
