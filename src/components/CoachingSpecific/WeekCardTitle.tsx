import { WEEK_STAGE } from '@selectors/coaching-selectors'
import React, { FC } from 'react'
import styled from 'styled-components/native'
import { fonts } from '@styles/themes'
import colors from '../../styles/colors'
import { IconBold } from '../iconRegular'
import TranslatedText from '../TranslatedText'

interface Props {
  weekName: string
  stage?: WEEK_STAGE
}

const WeekCardTitle: FC<Props> = ({ weekName, stage }) => {
  const { stageTitle, icon } = getStageString(stage)
  return (
    <Container>
      <Row>
        <IconBold name={icon} fill={colors.darkBlue} height={10} width={10} />
        <Title numberOfLines={2}>{stageTitle}</Title>
      </Row>

      <Theme numberOfLines={2}>{weekName}</Theme>
    </Container>
  )
}

export default WeekCardTitle

const getStageString = (
  stage?: WEEK_STAGE
): { stageTitle: string; icon: string } => {
  switch (stage) {
    case WEEK_STAGE.COMPLETED:
      return { stageTitle: 'WEEK_COMPLETED', icon: 'crown' }
    case WEEK_STAGE.ONGOING:
      return { stageTitle: 'ONGOING_WEEK', icon: 'targetCenter' }
    case WEEK_STAGE.UPCOMING:
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
  color: ${colors.darkBlue};
`

const Theme = styled.Text`
  font-size: 21px;
  font-family: ${fonts.bold};
  color: ${({ theme }) => theme.PRIMARY_TEXT_COLOR};
`
