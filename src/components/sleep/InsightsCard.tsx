import {
  getGoToSleepWindowEnd,
  getGoToSleepWindowStart
} from '@selectors/insight-selectors/Insights'
import { getSelectedDay } from '@selectors/SleepDataSelectors'
import { IconBold } from 'components/iconRegular'
import { Column } from 'components/Primitives/Primitives'
import { format, parseISO } from 'date-fns'
import React, { FC } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components/native'
import colors from 'styles/colors'
import { getFormattedDateOrPlaceholder } from 'helpers/time'
import TranslatedText from 'components/TranslatedText'

const InsightsCard: FC = () => {
  const { bedStart, bedEnd } = useSelector(getSelectedDay)
  const goToSleepWindowStart = useSelector(getGoToSleepWindowStart)
  const goToSleepWindowEnd = useSelector(getGoToSleepWindowEnd)

  const wentToBed = getFormattedDateOrPlaceholder(bedStart, 'H:m')
  const wokeUp = getFormattedDateOrPlaceholder(bedEnd, 'H:m')
  const windowStart = getFormattedDateOrPlaceholder(goToSleepWindowStart, 'H:m')
  const windowEnd = getFormattedDateOrPlaceholder(goToSleepWindowEnd, 'H:m')

  return (
    <Container>
      <Title>Insights</Title>

      <Row>
        <Figure>
          <Icon
            fill="none"
            name="nightMoonEnd"
            height="30"
            width="30"
            stroke="black"
          />
          <Column>
            <Value>{wentToBed}</Value>
            <Description>STAT.WENT_TO_BED</Description>
          </Column>
        </Figure>

        <Figure>
          <Icon
            fill="none"
            name="nightMoonEnd"
            height="30"
            width="30"
            stroke="black"
          />
          <Column>
            <Value>{wokeUp}</Value>
            <Description>STAT.WOKE_UP</Description>
          </Column>
        </Figure>
      </Row>

      <Row>
        <Figure>
          <Icon
            fill="none"
            name="nightMoonEnd"
            height="30"
            width="30"
            stroke="black"
          />
          <Column>
            <Value>4:00</Value>
            <Description>WOKE_UP</Description>
          </Column>
        </Figure>

        <Figure>
          <Icon
            fill="none"
            name="nightMoonEnd"
            height="30"
            width="30"
            stroke={colors.bedTimeColor}
          />
          <Column>
            <Value>
              {windowStart} - {windowEnd}
            </Value>
            <Description>STAT.WINDOW</Description>
          </Column>
        </Figure>
      </Row>
    </Container>
  )
}

export default InsightsCard

const Row = styled.View`
  flex-direction: row;
  margin: 15px 0px;
`

const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.SECONDARY_BACKGROUND_COLOR};
  border-radius: 7px;
  margin-top: 8px;
  padding: 10px 20px;
`

const Title = styled.Text`
  font-family: ${({ theme }) => theme.FONT_BOLD};
  font-size: 15px;
  color: ${({ theme }) => theme.PRIMARY_TEXT_COLOR};
  margin-bottom: 10px;
`

const Figure = styled.View`
  flex-direction: row;
  align-items: center;
  flex: 1;
  margin-right: 30px;
`

const Icon = styled(IconBold).attrs(() => ({}))`
  margin-right: 10px;
`

const Value = styled.Text`
  color: ${({ theme }) => theme.PRIMARY_TEXT_COLOR};
  font-family: ${({ theme }) => theme.FONT_MEDIUM};
  font-size: 20px;
`

const Description = styled(TranslatedText)`
  color: ${({ theme }) => theme.SECONDARY_TEXT_COLOR};
  font-family: ${({ theme }) => theme.FONT_REGULAR};
  font-size: 13px;
`
