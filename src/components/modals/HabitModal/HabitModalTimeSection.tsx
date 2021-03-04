import React, { ChangeEvent, FC, memo } from 'react'
import styled from 'styled-components/native'
import { Period } from '@typings/state/Periods'
import SetTimePeriodButtons from './SetTimePeriodButtons'
import TranslatedText from '../../TranslatedText'
import { fonts } from '../../../styles/themes'

type Props = {
  period: Period
  setPeriod: (e: string | ChangeEvent<unknown>) => void
}

const HabitModalTimeSection: FC<Props> = ({ setPeriod, period }) => (
  <Section>
    <SectionTitle>HABIT.TIME_OF_DAY</SectionTitle>
    <SetTimePeriodButtons
      setTimePeriod={setPeriod}
      currentTimePeriod={period}
    />
  </Section>
)

export default memo(HabitModalTimeSection)

const Section = styled.View`
  margin: 30px 20px;
  padding: 20px 0px;
`

const SectionTitle = styled(TranslatedText)`
  font-size: 15px;
  color: ${({ theme }) => theme.SECONDARY_TEXT_COLOR};
  font-family: ${fonts.bold};
  opacity: 0.6;
`
