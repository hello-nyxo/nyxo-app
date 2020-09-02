import Moment from 'moment'
import React, { memo } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components/native'
import TranslatedText from '@components/TranslatedText'
import { getSleepDataUpdated } from '@selectors/SleepDataSelectors'
import colors from '../../../styles/colors'
import { fonts } from '../../../styles/themes'

const LastUpdated = () => {
  const updated = useSelector(getSleepDataUpdated)
  return (
    <Container>
      <RefreshTextTranslated>Last updated</RefreshTextTranslated>
      <RefreshText>
        {Moment(updated).format('dddd DD.MM.YYYY HH:mm')}
      </RefreshText>

      <SupriseText>SURPRISE</SupriseText>
    </Container>
  )
}

export default memo(LastUpdated)

const RefreshTextTranslated = styled(TranslatedText)`
  font-family: ${fonts.medium};
  margin-top: 10px;
  text-align: center;
  color: white;
`

const SupriseText = styled(TranslatedText)`
  font-family: ${fonts.bold};
  bottom: 100px;
  left: 0;
  right: 0;
  position: absolute;
  text-align: center;
  color: white;
`

const RefreshText = styled.Text`
  font-family: ${fonts.medium};
  margin-top: 10px;
  text-align: center;
  color: white;
`

const Container = styled.View`
  background-color: ${colors.red};
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`
