import React from 'react'
import { useSelector } from 'react-redux'
import { getSelectedWeekCompleted } from 'store/Selectors/coaching-selectors/coaching-selectors'
import styled from 'styled-components/native'
import { fonts, StyleProps } from '../../styles/themes'
import TranslatedText from '../TranslatedText'

const WeekCompleted = () => {
  const weekCompleted = useSelector(getSelectedWeekCompleted)

  if (weekCompleted) {
    return (
      <Section>
        <SectionTitle>CoachingSessionCompleted</SectionTitle>
      </Section>
    )
  }
  return null
}

export default React.memo(WeekCompleted)

const Section = styled.View`
  position: absolute;
  bottom: 20;
  left: 0;
  right: 0;
  margin: 20px;
  border-radius: 5px;
  padding: 10px;
  background-color: ${({ theme }) => theme.SECONDARY_BACKGROUND_COLOR};
  box-shadow: ${({ theme }) => theme.SHADOW};
`

const Started = styled.Text``

const SectionTitle = styled(TranslatedText)`
  font-size: 15px;
  font-family: ${fonts.medium};
  color: ${(props: StyleProps) => props.theme.SECONDARY_TEXT_COLOR};
`
