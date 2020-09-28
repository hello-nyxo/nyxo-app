import TranslatedText from '@components/TranslatedText'
import moment from 'moment'
import React, { FC } from 'react'
import styled from 'styled-components/native'
import { fonts } from 'styles/themes'
import { CoachingData } from 'typings/state/coaching-state'
import { useUpdateUser } from 'hooks/user/useUser'
import { Button } from 'react-native'
import { format } from 'date-fns'
import { H5 } from '@components/Primitives/Primitives'
import { IconBold } from '@components/iconRegular'
import { CoachingPeriod } from 'hooks/coaching/useCoaching'

type Props = {
  month: CoachingPeriod
}

const CoachingMonthCard: FC<Props> = ({ month }) => {
  const title = format(new Date(month?.started), 'LLLL yyyy')
  const startDate = format(new Date(month?.started), 'dd.mm.yyyy')

  const endDate = month.ended ? moment(month.ended).format('DD.MM.YYYY') : ''
  const weeks = month.weeks ? month.weeks.length : 0
  const lessons = month.lessons ? month.lessons?.length : 0

  console.log(weeks, lessons)

  const [mutate, { status, error, data }] = useUpdateUser()
  console.log(status, error, data)

  const setActive = () => {
    mutate({
      user: {
        id: '',
        userActiveCoachingId: month.id
      }
    })
  }

  return (
    <Container>
      <Row>
        <Column>
          <Text>COACHING_MONTH.SUBTITLE</Text>
          <Title>{title}</Title>
        </Column>
        <Column>
          <Stat variables={{ count: weeks }}>COACHING_MONTH.WEEKS</Stat>
          <Stat variables={{ count: lessons }}>COACHING_MONTH.LESSONS</Stat>
        </Column>
      </Row>

      <Row>
        <CalendarIcon />
        <Started>
          {startDate} – {endDate}
        </Started>
      </Row>
    </Container>
  )
}

export default CoachingMonthCard

const Container = styled.View`
  background-color: ${({ theme }) => theme.SECONDARY_BACKGROUND_COLOR};
  box-shadow: ${({ theme }) => theme.SHADOW};
  padding: 10px;
  border-radius: 10px;
  margin: 10px 16px;
`

const Title = styled.Text`
  font-size: 17px;
  text-transform: uppercase;
  font-family: ${fonts.bold};
  color: ${({ theme }) => theme.PRIMARY_TEXT_COLOR};
  margin-bottom: 16px;
`

const Column = styled.View``

const Row = styled.View`
  flex-direction: row;
  align-items: center;
`

const Started = styled.Text`
  font-size: 13px;
  font-family: ${fonts.medium};
  color: ${({ theme }) => theme.SECONDARY_TEXT_COLOR};
`

const Stat = styled(TranslatedText)`
  font-size: 13px;
  font-family: ${fonts.medium};
  color: ${({ theme }) => theme.SECONDARY_TEXT_COLOR};
`

const Text = styled(TranslatedText)`
  font-size: 11px;
  line-height: 16px;
  text-transform: uppercase;
  margin-bottom: 4px;
  font-family: ${({ theme }) => theme.FONT_MEDIUM};
  color: ${({ theme }) => theme.SECONDARY_TEXT_COLOR};
`

const CalendarIcon = styled(IconBold).attrs(({ theme }) => ({
  name: 'calendar',
  height: 13,
  width: 13,
  fill: theme.SECONDARY_TEXT_COLOR
}))`
  margin-right: 8px;
`
