import React, { memo } from 'react'
import styled from 'styled-components/native'
import { Period } from 'Types/State/Periods'
import SetTimePeriodButtons from './SetTimePeriodButtons'
import TranslatedText from '../../TranslatedText'
import { StyleProps, fonts } from '../../../styles/themes'

type Props = {
  period: Period
  setPeriod: Function
}

const HabitModalTimeSection = ({ setPeriod, period }: Props) => {
  return (
    <Section>
      <SectionTitle>HABIT.TIME_OF_DAY</SectionTitle>
      <SetTimePeriodButtons
        setTimePeriod={setPeriod}
        currentTimePeriod={period}
      />
    </Section>
  )
}

export default memo(HabitModalTimeSection)

const Section = styled.View`
  margin: 30px 20px;
  padding: 20px 0px;
`

const SectionTitle = styled(TranslatedText)`
  font-size: 15px;
  color: ${(props: StyleProps) => props.theme.SECONDARY_TEXT_COLOR};
  font-family: ${fonts.bold};
  opacity: 0.6;
`
