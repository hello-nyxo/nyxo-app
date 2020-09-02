import moment from 'moment'
import React, { memo } from 'react'
import styled from 'styled-components/native'
import { Day } from 'Types/Sleepdata'
import translate from '../../../config/i18n'
import { minutesToHoursString } from '@helpers/time'
import colors from '../../../styles/colors'
import { fonts, StyleProps } from '../../../styles/themes'

interface Props {
  selectedDay: Day
}

const DayInfo = (props: Props) => {
  return (
    <Container>
      <TodayContainer>
        <Today>{moment(props.selectedDay.date).format('DD. MMM YYYY')}</Today>
      </TodayContainer>

      <Info>
        <TimeInBed>
          {translate('TIME_IN_BED')}{' '}
          {minutesToHoursString(props.selectedDay.inBedDuration)}
        </TimeInBed>
        <TimeAsleep>
          {translate('TIME_ASLEEP')}{' '}
          {minutesToHoursString(props.selectedDay.asleepDuration)}
        </TimeAsleep>
      </Info>
    </Container>
  )
}

export default memo(DayInfo)

const Container = styled.View`
  flex-direction: row;
  flex: 1;
`

const TimeInBed = styled.Text`
  font-family: ${fonts.bold};
  font-size: 15px;
  color: ${(props: StyleProps) => colors.inBedColor};
`

const TimeAsleep = styled.Text`
  font-family: ${fonts.bold};
  font-size: 15px;
  color: ${(props: StyleProps) => colors.asleepColor};
`

const TodayContainer = styled.View`
  align-items: flex-start;
  justify-content: center;
  flex: 1;
`

const Today = styled.Text`
  font-family: ${fonts.bold};
  font-size: 15px;
  color: ${(props: StyleProps) => props.theme.SECONDARY_TEXT_COLOR};
`

const Info = styled.View`
  flex-direction: column;
`
