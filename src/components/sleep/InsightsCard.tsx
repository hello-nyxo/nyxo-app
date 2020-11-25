import {
  getGoToSleepWindowEnd,
  getGoToSleepWindowStart
} from '@selectors/insight-selectors/Insights'
import { IconBold } from '@components/iconRegular'
import { Column } from '@components/Primitives/Primitives'
import TranslatedText from '@components/TranslatedText'
import {
  getFormattedDateOrPlaceholder,
  minutesToHoursString
} from '@helpers/time'
import React, { FC, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components/native'
import colors from '@styles/colors'
import { WIDTH } from '@helpers/Dimensions'
import useSleep from '@hooks/useSleep'
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  ViewToken
} from 'react-native'
import { ThemeColors } from 'react-navigation'

const pageWidth = WIDTH - 16 * 2 - 2 * 16

const InsightsCard: FC = () => {
  const {
    bedStart,
    bedEnd,
    sleepStart,
    sleepEnd,
    efficiency,
    inBedDuration,
    asleepDuration
  } = useSleep()
  const goToSleepWindowStart = useSelector(getGoToSleepWindowStart)
  const goToSleepWindowEnd = useSelector(getGoToSleepWindowEnd)
  const wentToBed = getFormattedDateOrPlaceholder(bedStart, 'H:mm')
  const gotUp = getFormattedDateOrPlaceholder(bedEnd, 'H:mm')
  const fellAsleep = getFormattedDateOrPlaceholder(sleepStart, 'H:mm')
  const wokeUp = getFormattedDateOrPlaceholder(sleepEnd, 'H:mm')
  const windowStart = getFormattedDateOrPlaceholder(
    goToSleepWindowStart,
    'H:mm'
  )
  const windowEnd = getFormattedDateOrPlaceholder(goToSleepWindowEnd, 'H:mm')
  const [page, setPage] = useState(0)

  const handleScroll = ({
    nativeEvent
  }: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (nativeEvent.contentOffset.x > nativeEvent.contentSize.width / 3) {
      setPage(1)
    } else {
      setPage(0)
    }
  }

  return (
    <Container>
      <Title>STAT.STATISTICS</Title>

      <ScrollView
        horizontal
        pagingEnabled
        scrollEventThrottle={30}
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}>
        <Page>
          <Row>
            <Figure>
              <Icon
                fill="none"
                name="nightMoonBegin"
                height="20"
                width="20"
                stroke={colors.darkBlue}
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
                height="20"
                width="20"
                stroke={colors.darkBlue}
              />
              <Column>
                <Value>{gotUp}</Value>
                <Description>STAT.GOT_UP</Description>
              </Column>
            </Figure>
          </Row>

          <Row>
            <Figure>
              <Icon
                fill="none"
                name="nightMoonEnd"
                height="20"
                width="20"
                stroke={colors.asleepColor}
              />
              <Column>
                <Value>{fellAsleep}</Value>
                <Description>STAT.FELL_ASLEEP</Description>
              </Column>
            </Figure>

            <Figure>
              <Icon
                fill="none"
                name="nightMoonEnd"
                height="20"
                width="20"
                stroke={colors.asleepColor}
              />
              <Column>
                <Value>{wokeUp}</Value>
                <Description>STAT.WOKE_UP</Description>
              </Column>
            </Figure>
          </Row>
        </Page>
        <Page>
          <Row>
            <Figure>
              <Icon
                fill="none"
                name="doubleBed"
                height="20"
                width="20"
                stroke="black"
              />
              <Column>
                <Value>{minutesToHoursString(inBedDuration)}</Value>
                <Description>STAT.BED</Description>
              </Column>
            </Figure>

            <Figure>
              <Icon
                fill="none"
                name="nightMoonEnd"
                height="20"
                width="20"
                stroke="black"
              />
              <Column>
                <Value>{efficiency}</Value>
                <Description>STAT.EFFICIENCY</Description>
              </Column>
            </Figure>
          </Row>

          <Row>
            <Figure>
              <Icon
                fill="none"
                name="doubleBed"
                height="20"
                width="20"
                stroke="black"
              />
              <Column>
                <Value>{minutesToHoursString(asleepDuration)}</Value>
                <Description>STAT.SLEEP</Description>
              </Column>
            </Figure>

            <Figure>
              <Icon
                fill="none"
                name="bedWindow"
                height="20"
                width="20"
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
        </Page>
      </ScrollView>
      <Paging>
        <Dot selected={page === 0} />
        <Dot selected={page === 1} />
      </Paging>
    </Container>
  )
}

export default InsightsCard

const ScrollView = styled.ScrollView`
  flex: 1;
`

const Row = styled.View`
  flex-direction: row;
  flex: 1;
  width: 100%;
  margin: 15px 0px;
`

const Page = styled.View`
  flex: 1;
  width: ${pageWidth}px;
`

const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.SECONDARY_BACKGROUND_COLOR};
  border-radius: 7px;
  margin: 8px 0px;
  padding: 10px 16px;
  box-shadow: ${({ theme }) => theme.SHADOW};
`

const Title = styled(TranslatedText)`
  font-family: ${({ theme }) => theme.FONT_BOLD};
  font-size: 15px;
  color: ${({ theme }) => theme.PRIMARY_TEXT_COLOR};
  margin-bottom: 10px;
`

const Figure = styled.View`
  flex-direction: row;
  align-items: center;
  flex: 1;
  width: 100%;
  margin-right: 20px;
`

const Icon = styled(IconBold).attrs(() => ({}))`
  margin-right: 10px;
`

const Value = styled.Text`
  color: ${({ theme }) => theme.PRIMARY_TEXT_COLOR};
  font-family: ${({ theme }) => theme.FONT_MEDIUM};
  font-size: 15px;
`

const Description = styled(TranslatedText)`
  color: ${({ theme }) => theme.SECONDARY_TEXT_COLOR};
  font-family: ${({ theme }) => theme.FONT_REGULAR};
  font-size: 13px;
`

const Paging = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
`

type DotProps = {
  selected: boolean
}
const Dot = styled.View<DotProps>`
  height: 5px;
  width: 5px;
  border-radius: 10px;
  background-color: ${({ selected, theme }) =>
    selected ? theme.accent : theme.HAIRLINE_COLOR};
  margin: 0px 5px;
`
