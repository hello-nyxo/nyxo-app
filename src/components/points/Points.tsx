import { GetUserQuery } from '@API'
import TranslatedText from '@components/TranslatedText'
import { WIDTH } from '@helpers/Dimensions'
import colors from '@styles/colors'
import React, { FC } from 'react'
import { AnimatedCircularProgress } from 'react-native-circular-progress'
import { Circle } from 'react-native-svg'
import styled from 'styled-components/native'

const chartWidth = WIDTH - 16 * 2 - 2 * 32

type User = Exclude<GetUserQuery['getUser'], null>
type SleepPoints = Exclude<User['sleepPoints'], null>

type Props = {
  sleepPoints?: SleepPoints | null
}

const Points: FC<Props> = ({
  sleepPoints = {
    efficiency: 0,
    duration: 0,
    socialJetLag: 0,
    timing: 0
  }
}) => {
  const average =
    ((sleepPoints?.efficiency ?? 0) +
      (sleepPoints?.duration ?? 0) +
      (sleepPoints?.socialJetLag ?? 0) +
      (sleepPoints?.timing ?? 0)) /
    4

  return (
    <Container>
      <ChartContainer>
        <Progress
          width={15}
          size={chartWidth}
          fill={average}
          renderCap={({ center }) => {
            return (
              <ThemedCircle
                x={center.x}
                y={center.y}
                r={10}
                strokeWidth={4}
                stroke={colors.darkBlue}
              />
            )
          }}
        />

        <PointsContainer>
          <TotalPoints>{average}</TotalPoints>
          <Title>POINTS.TITLE</Title>
        </PointsContainer>
      </ChartContainer>

      <Section>
        <ScoreContainer>
          <Score>{sleepPoints?.efficiency}</Score>
        </ScoreContainer>
        <Column>
          <ScoreTitle>POINTS.EFFICIENCY</ScoreTitle>
          <Explanation>POINTS.EFFICIENCY_EXPLANATION</Explanation>
        </Column>
      </Section>
      <Section>
        <ScoreContainer>
          <Score>{sleepPoints?.duration}</Score>
        </ScoreContainer>
        <Column>
          <ScoreTitle>POINTS.DURATION</ScoreTitle>
          <Explanation>POINTS.DURATION_EXPLANATION</Explanation>
        </Column>
      </Section>

      <Section>
        <ScoreContainer>
          <Score>{sleepPoints?.socialJetLag}</Score>
        </ScoreContainer>
        <Column>
          <ScoreTitle>POINTS.SOCIAL_JET_LAG</ScoreTitle>
          <Explanation>POINTS.SOCIAL_JET_LAG_EXPLANATION</Explanation>
        </Column>
      </Section>

      <Section>
        <ScoreContainer>
          <Score>{sleepPoints?.timing}</Score>
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
  height: ${chartWidth}px;
`

const ThemedCircle = styled(Circle).attrs(({ theme }) => ({
  fill: theme.SECONDARY_BACKGROUND_COLOR
}))``

const ScoreContainer = styled.View``

const Progress = styled(AnimatedCircularProgress).attrs(({ theme }) => ({
  rotation: 250,
  arcSweepAngle: 225,
  tintColor: colors.darkBlue,
  backgroundColor: theme.PRIMARY_BACKGROUND_COLOR,
  lineCap: 'round'
}))`
  position: absolute;
`
