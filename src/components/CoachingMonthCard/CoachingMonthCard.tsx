import React from 'react'
import { CoachingMonth } from 'typings/state/coaching-state'
import styled from 'styled-components/native'
import moment from 'moment'
import { fonts } from 'styles/themes'
import TranslatedText from 'components/TranslatedText'

type Props = {
  month: CoachingMonth
}

const CoachingMonthCard = ({ month }: Props) => {
  const title = moment(month.started).format('MMMM')
  const startDate = moment(month.started).format('DD.MM.YYYY')
  const endDate = month.ended ? moment(month.ended).format('DD.MM.YYYY') : ''
  const weeks = month.weeks.length
  const lessons = month.lessons?.length

  return (
    <Container>
      <Title>{title}</Title>
      <Started>
        {startDate} – {endDate}
      </Started>

      <Row>
        <Stat variables={{ weeks }}>COACHING_MONTH.WEEKS</Stat>
        <Stat variables={{ lessons }}>COACHING_MONTH.LESSONS</Stat>
      </Row>
    </Container>
  )
}

export default CoachingMonthCard

const Container = styled.View`
  background-color: ${({ theme }) => theme.SECONDARY_BACKGROUND_COLOR};
  padding: 10px;
  border-radius: 10px;
  margin: 10px 0px;
`

const Row = styled.View`
  margin-top: 10px;
  flex-direction: row;
  justify-content: space-between;
`

const Title = styled.Text`
  font-size: 17px;
  text-transform: uppercase;
  font-family: ${fonts.bold};
  color: ${({ theme }) => theme.PRIMARY_TEXT_COLOR};
  margin-bottom: 5px;
`

const Started = styled.Text`
  font-size: 15px;
  font-family: ${fonts.medium};
  color: ${({ theme }) => theme.SECONDARY_TEXT_COLOR};
`

const Stat = styled(TranslatedText)`
  font-size: 13px;
  font-family: ${fonts.medium};
  color: ${({ theme }) => theme.SECONDARY_TEXT_COLOR};
`
