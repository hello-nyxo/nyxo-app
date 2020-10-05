import BuyCoachingButton from '@components/CoachingSpecific/BuyCoachingButton'
import { IconBold } from '@components/iconRegular'
import TranslatedText from '@components/TranslatedText'
import { useGetActiveCoaching } from '@hooks/coaching/useCoaching'
import { getActiveCoaching } from '@selectors/subscription-selectors/SubscriptionSelectors'
import { format } from 'date-fns'
import React, { FC } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components/native'
import { PageTitle } from '../Primitives/Primitives'
import { IntroduceCoaching } from './IntroduceCoaching'

const CoachingHeader: FC = () => {
  const { data } = useGetActiveCoaching()
  const hasActiveCoaching = useSelector(getActiveCoaching)

  const weeks = data?.weeks?.length ?? 0
  const lessons = data?.lessons?.length ?? 0

  return (
    <>
      <PageTitle>Coaching</PageTitle>

      {!hasActiveCoaching && <BuyCoachingButton />}
      {!hasActiveCoaching && <IntroduceCoaching />}

      <Title>Active Coaching Period</Title>
      <Container>
        <Column>
          {data?.started && (
            <MonthTitle>
              Started: {format(new Date(data?.started), 'dd.mm.yy')}
            </MonthTitle>
          )}
          <Row>
            <Icon />
            <Text variables={{ count: lessons }}>COACHING_MONTH.LESSONS</Text>
          </Row>
          <Row>
            <Icon />
            <Text variables={{ count: weeks }}>COACHING_MONTH.WEEKS</Text>
          </Row>
        </Column>
      </Container>
    </>
  )
}

export default CoachingHeader

const Container = styled.View`
  margin: 0px 16px 32px;
  background-color: ${({ theme }) => theme.SECONDARY_BACKGROUND_COLOR};
  padding: 16px;
  border-radius: 8px;
  flex-direction: row;
  box-shadow: ${({ theme }) => theme.SHADOW};
`

const MonthTitle = styled.Text`
  font-size: 17px;
  text-transform: uppercase;
  font-family: ${({ theme }) => theme.FONT_BOLD};
  color: ${({ theme }) => theme.PRIMARY_TEXT_COLOR};
  margin-bottom: 16px;
`

const Row = styled.View`
  flex-direction: row;
  align-items: center;
`

const Text = styled(TranslatedText)`
  color: ${({ theme }) => theme.PRIMARY_TEXT_COLOR};
  font-family: ${({ theme }) => theme.FONT_MEDIUM};
`

const Icon = styled(IconBold).attrs(({ theme }) => ({
  height: 15,
  width: 15,
  fill: theme.SECONDARY_TEXT_COLOR,
  name: 'bookLamp'
}))`
  margin-right: 8px;
`

const Title = styled.Text`
  margin: 16px 16px 8px;
  text-transform: uppercase;
  font-size: 15px;
  color: ${({ theme }) => theme.SECONDARY_TEXT_COLOR};
  font-family: ${({ theme }) => theme.FONT_BOLD};
`

const Column = styled.View``
