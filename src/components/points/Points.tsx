import { WIDTH } from '@helpers/Dimensions'
import { describeArc, polarToCartesian } from '@helpers/geometry'
import { GetUserQuery } from 'API'
import TranslatedText from 'components/TranslatedText'
import React, { FC } from 'react'
import Svg, { Circle, Path } from 'react-native-svg'
import styled from 'styled-components/native'
import colors from 'styles/colors'
import { interpolate } from 'd3'

const chartWidth = WIDTH - 16 * 2 - 2 * 8
const chartHeight = chartWidth * (9 / 16)

type User = Exclude<GetUserQuery['getUser'], null>
type SleepPoints = Exclude<User['sleepPoints'], null>

type Props = {
  sleepPoints?: SleepPoints
}

const Points: FC<Props> = ({
  sleepPoints = {
    efficiency: 0,
    duration: 0,
    socialJetLag: 0,
    timing: 0
  }
}) => {
  const {
    efficiency = 0,
    duration = 0,
    socialJetLag = 0,
    timing = 0
  } = sleepPoints
  const average = (efficiency + duration + socialJetLag + timing) / 4

  const outLinePath = describeArc(
    chartWidth / 2,
    chartHeight - 30,
    (chartWidth / 2) * 0.8,
    270,
    90
  )
  const path = describeArc(
    chartWidth / 2,
    chartHeight - 30,
    (chartWidth / 2) * 0.8,
    270,
    30
  )

  const { x: circleX, y: circleY } = polarToCartesian(
    chartWidth / 2,
    chartHeight - 30,
    (chartWidth / 2) * 0.8,
    30
  )

  return (
    <Container>
      <ChartContainer>
        <Svg width={chartWidth} height={chartHeight}>
          <ThemedPath
            id="pointsPath"
            d={outLinePath}
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            strokeWidth="8"
          />
          <Path
            id="pointsPath"
            d={path}
            strokeDashoffset="200"
            stroke={colors.radiantBlue}
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            strokeWidth="12"
          />
          <ThemedCircle
            x={circleX}
            y={circleY}
            r={10}
            strokeWidth={4}
            stroke={colors.radiantBlue}
          />
        </Svg>
        <PointsContainer>
          <TotalPoints>{average}</TotalPoints>
        </PointsContainer>
      </ChartContainer>

      <Title>POINTS.TITLE</Title>

      <Section>
        <ScoreContainer>
          <Score>{efficiency}</Score>
        </ScoreContainer>
        <Column>
          <ScoreTitle>POINTS.EFFICIENCY</ScoreTitle>
          <Explanation>POINTS.EFFICIENCY_EXPLANATION</Explanation>
        </Column>
      </Section>
      <Section>
        <ScoreContainer>
          <Score>{duration}</Score>
        </ScoreContainer>
        <Column>
          <ScoreTitle>POINTS.DURATION</ScoreTitle>
          <Explanation>POINTS.DURATION_EXPLANATION</Explanation>
        </Column>
      </Section>

      <Section>
        <ScoreContainer>
          <Score>{socialJetLag}</Score>
        </ScoreContainer>
        <Column>
          <ScoreTitle>POINTS.SOCIAL_JET_LAG</ScoreTitle>
          <Explanation>POINTS.SOCIAL_JET_LAG_EXPLANATION</Explanation>
        </Column>
      </Section>

      <Section>
        <ScoreContainer>
          <Score>{timing}</Score>
        </ScoreContainer>
        <Column>
          <ScoreTitle>POINTS.TIMING</ScoreTitle>
          <Explanation>POINTS.TIMING_EXPLANATION</Explanation>
        </Column>
      </Section>
    </Container>
  )
}

export default Points

const calculateAverage = () => {}

const Container = styled.View`
  background-color: ${({ theme }) => theme.SECONDARY_BACKGROUND_COLOR};
  padding: 16px;
  box-shadow: ${({ theme }) => theme.SHADOW};
  border-radius: 7px;
  margin: 16px;
`

const ScoreTitle = styled(TranslatedText)`
  font-size: 15px;
  margin-bottom: 4px;
  font-family: ${({ theme }) => theme.FONT_BOLD};
  color: ${({ theme }) => theme.PRIMARY_TEXT_COLOR};
`

const Explanation = styled(TranslatedText)`
  font-size: 13px;
  font-family: ${({ theme }) => theme.FONT_MEDIUM};
  color: ${({ theme }) => theme.SECONDARY_TEXT_COLOR};
`

const Section = styled.View`
  flex-direction: row;
  border-top-width: 1px;
  border-top-color: ${({ theme }) => theme.HAIRLINE_COLOR};
  padding: 16px 0px;
  align-items: center;
`
const Column = styled.View`
  margin-left: 16px;
  flex: 1;
  width: 100%;
`

const Score = styled.Text`
  font-size: 25px;
  font-family: ${({ theme }) => theme.FONT_BOLD};
  color: ${({ theme }) => theme.SECONDARY_TEXT_COLOR};
`

const Title = styled(TranslatedText)`
  font-size: 22px;
  text-align: center;
  margin-bottom: 32px;
  font-family: ${({ theme }) => theme.FONT_BOLD};
  color: ${({ theme }) => theme.PRIMARY_TEXT_COLOR};
`

const PointsContainer = styled.View`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  align-items: center;
  justify-content: center;
`
const TotalPoints = styled.Text`
  margin-bottom: 32px;
  font-size: 60px;
  text-align: center;
  font-family: ${({ theme }) => theme.FONT_BOLD};
  color: ${({ theme }) => theme.PRIMARY_TEXT_COLOR};
`

const ChartContainer = styled.View`
  align-items: center;
  justify-content: center;
`

const ThemedPath = styled(Path).attrs(({ theme }) => ({
  stroke: theme.PRIMARY_BACKGROUND_COLOR
}))``

const ThemedCircle = styled(Circle).attrs(({ theme }) => ({
  fill: theme.SECONDARY_BACKGROUND_COLOR
}))``

const ScoreContainer = styled.View``
