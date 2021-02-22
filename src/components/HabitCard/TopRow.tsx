import React, { memo } from 'react'
import styled from 'styled-components/native'
import { fonts } from '@styles/themes'
import { Period } from '@typings/state/Periods'
import colors from '../../styles/colors'
import { IconBold } from '../iconRegular'
import TranslatedText from '../TranslatedText'

interface Props {
  period: Period | string
  daysLeft: number
}

// const bgColor = cardColors[props.task.period]?.backgroundColor;
// const accent = cardColors[props.task.period]?.accentColor;

export const getIcon = (period?: string): { color: string; icon: string } => {
  if (!period) return { icon: 'sun', color: 'red' }

  switch (period.toLowerCase()) {
    case Period.morning:
      return { icon: 'daySunrise', color: colors.morningAccent }
    case Period.afternoon:
      return { icon: 'sun', color: colors.afternoonAccent }
    case Period.evening:
      return { icon: 'daySunset', color: colors.eveningAccent }
    default:
      return { icon: 'sun', color: 'red' }
  }
}

const TopRow = (props: Props) => {
  const { period, daysLeft } = props

  const { color, icon } = getIcon(period)

  return (
    <Container>
      <IconBold width={12} height={12} fill={color} name={icon} />
      <Time accent={color}>{`HABIT.EVERY_${period.toUpperCase()}`}</Time>
      <IconBold width={12} height={12} name="flame" />
      <Streak variables={{ daysLeft }}>TASK_DAYS_LEFT</Streak>
    </Container>
  )
}

export default memo(TopRow)

const Container = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 15px;
`

interface TimeProps {
  accent: string
}

const Time = styled(TranslatedText)<TimeProps>`
  font-size: 11px;
  color: ${(props: TimeProps) => props.accent};
  font-family: ${fonts.medium};
  margin: 0px 20px 0px 10px;
`

export const Streak = styled(TranslatedText)`
  margin-left: 10px;
  font-size: 12px;
  font-family: ${fonts.medium};
  color: ${({ theme }) => theme.SECONDARY_TEXT_COLOR};
`
