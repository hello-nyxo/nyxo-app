import TranslatedText from '@components/TranslatedText'
import moment from 'moment'
import React, { FC } from 'react'
import styled from 'styled-components/native'
import { fonts } from 'styles/themes'
import { CoachingData } from 'typings/state/coaching-state'
import { useUpdateUser } from 'hooks/user/useUser'
import { Button } from 'react-native'

type Props = {
  month: CoachingData
}

const CoachingMonthCard: FC<Props> = ({ month }) => {
  const title = moment(month.started).format('MMMM')
  const startDate = moment(month.started).format('DD.MM.YYYY')
  const endDate = month.ended ? moment(month.ended).format('DD.MM.YYYY') : ''
  const weeks = month.weeks ? month.weeks.length : 0
  const lessons = month.lessons ? month.lessons?.length : 0

  const [mutate, { status, error, data }] = useUpdateUser()
  console.log(status, error, data)
  const setActive = () => {
    mutate({
      user: {
        userActiveCoachingId: month.id
      }
    })
  }

  return (
    <Container>
      <Title>{title}</Title>
      <Started>
        {startDate} – {endDate}
      </Started>
      <Row>
        <Stat variables={{ weeks: 0 }}>COACHING_MONTH.WEEKS</Stat>
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
  margin: 10px 16px;
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
