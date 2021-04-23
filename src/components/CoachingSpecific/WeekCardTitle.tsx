import React, { FC } from 'react'
import styled from 'styled-components/native'
import { fonts } from '@styles/themes'
import { IconBold } from '../iconRegular'
import TranslatedText from '../TranslatedText'
import { Stage } from '@API'

interface Props {
  weekName?: string
  stage?: Stage
}

const WeekCardTitle: FC<Props> = ({ weekName, stage }) => {
  const { stageTitle, icon } = getStageString(stage)
  return (
    <Container>
      <Row>
        <Icon name={icon} height={10} width={10} />
        <Title numberOfLines={2}>{stageTitle}</Title>
      </Row>

      <Theme numberOfLines={2}>{weekName}</Theme>
    </Container>
  )
}

export default WeekCardTitle

const getStageString = (
  stage?: Stage
): { stageTitle: string; icon: string } => {
  switch (stage) {
    case Stage.COMPLETED:
      return { stageTitle: 'WEEK_COMPLETED', icon: 'crown' }
    case Stage.ONGOING:
      return { stageTitle: 'ONGOING_WEEK', icon: 'targetCenter' }
    case Stage.PAUSED:
      return { stageTitle: 'UPCOMING_WEEK', icon: 'targetCenter' }
    default:
      return { stageTitle: 'UPCOMING_WEEK', icon: 'targetCenter' }
  }
}

const Container = styled.View`
  flex: 1;
  margin-bottom: 10px;
  flex-direction: column;
  justify-content: center;
`

const Row = styled.View`
  flex-direction: row;
  align-items: center;
`

const Title = styled(TranslatedText)`
  margin-left: 5px;
  text-transform: uppercase;
  font-size: 12px;
  font-family: ${fonts.medium};
  color: ${({ theme }) => theme.accent};
`

const Theme = styled.Text`
  font-size: 21px;
  font-family: ${fonts.bold};
  color: ${({ theme }) => theme.PRIMARY_TEXT_COLOR};
`

const Icon = styled(IconBold).attrs(({ theme }) => ({
  fill: theme.accent
}))``
