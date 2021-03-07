import {
  getGoToSleepWindowEnd,
  getGoToSleepWindowStart
} from '@selectors/insight-selectors/Insights'
import { IconBold } from '@components/iconRegular'
import { Column } from '@components/Primitives/Primitives'
import TranslatedText from '@components/TranslatedText'
import { ExpandingDot } from '@components/micro-interactions/FlatListPageIndicator'
import {
  getFormattedDateOrPlaceholder,
  minutesToHoursString
} from '@helpers/time'
import React, { FC } from 'react'
import Animated from 'react-native-reanimated'
import styled from 'styled-components/native'
import colors from '@styles/colors'
import { WIDTH } from '@helpers/Dimensions'
import useSleep from '@hooks/useSleep'
import { useScrollHandler } from 'react-native-redash/lib/module/v1'
import { useAppSelector } from '@hooks/redux'

const pageWidth = WIDTH - 16 * 2 - 2 * 16

const InsightsCard: FC = () => {
  const { x: scrollX, scrollHandler } = useScrollHandler()
  const {
    bedStart,
    bedEnd,
    sleepStart,
    sleepEnd,
    efficiency,
    inBedDuration,
    asleepDuration
  } = useSleep()
  const goToSleepWindowStart = useAppSelector(getGoToSleepWindowStart)
  const goToSleepWindowEnd = useAppSelector(getGoToSleepWindowEnd)
  const wentToBed = getFormattedDateOrPlaceholder(bedStart, 'H:mm')
  const gotUp = getFormattedDateOrPlaceholder(bedEnd, 'H:mm')
  const fellAsleep = getFormattedDateOrPlaceholder(sleepStart, 'H:mm')
  const wokeUp = getFormattedDateOrPlaceholder(sleepEnd, 'H:mm')
  const windowStart = getFormattedDateOrPlaceholder(
    goToSleepWindowStart,
    'H:mm'
  )
  const windowEnd = getFormattedDateOrPlaceholder(goToSleepWindowEnd, 'H:mm')

  return (
    <Container>
      <Title>STAT.STATISTICS</Title>

      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        {...scrollHandler}>
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
              <Icon fill="none" name="doubleBed" height="20" width="20" />
              <Column>
                <Value>{minutesToHoursString(inBedDuration)}</Value>
                <Description>STAT.BED</Description>
              </Column>
            </Figure>

            <Figure>
              <Icon
                fill="none"
                name="percentage"
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
      <ScrollIndicator width={pageWidth} scrollX={scrollX} data={[0, 1]} />
    </Container>
  )
}

export default InsightsCard

const ScrollView = styled(Animated.ScrollView)`
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

const Icon = styled(IconBold).attrs(({ theme }) => ({
  stroke: theme.SECONDARY_TEXT_COLOR
}))`
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

const ScrollIndicator = styled(ExpandingDot).attrs(() => ({
  dotStyle: {
    width: 5,
    height: 5
  }
}))`
  flex-direction: row;
  align-items: center;
  position: relative;
  justify-content: center;
  width: 100%;
`
