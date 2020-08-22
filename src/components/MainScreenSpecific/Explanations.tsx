import moment from 'moment'
import React from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components/native'
import { minutesToHoursString } from '../../helpers/time'
import colors from '../../styles/colors'
import { fonts, StyleProps } from '../../styles/themes'
import { getGoToSleepWindowCenter } from '../../store/Selectors/insight-selectors/Insights'
import {
  getSelectedDayAsleepDuration,
  getSelectedDayInBedDuration
} from '../../store/Selectors/SleepDataSelectors'

const Explanations = () => {
  const inbed = minutesToHoursString(useSelector(getSelectedDayInBedDuration))
  const asleep = minutesToHoursString(useSelector(getSelectedDayAsleepDuration))
  // const efficiency = useSelector(getSelec);
  const window = useSelector(getGoToSleepWindowCenter)
  const stats = [
    { title: 'sleep', figure: inbed, color: colors.radiantBlue },
    { title: 'asleep', figure: asleep, color: colors.inBedColor },
    { title: 'efficiency', figure: '100%', color: colors.nightAccent },
    {
      title: 'window',
      figure: moment(window).format('HH:mm'),
      color: colors.fallAsleep
    }
  ]

  return (
    <Container>
      {stats.map((item, index) => (
        <Item key={index}>
          <Dot color={item.color} />
          <Column>
            <Title>{item.title}</Title>
            <Figure>{item.figure}</Figure>
          </Column>
        </Item>
      ))}
    </Container>
  )
}

export default Explanations

const Container = styled.View`
  flex-direction: row;
  padding: 0px 20px;
  align-items: center;
  justify-content: space-between;
`
const Item = styled.View`
  flex-direction: row;
  align-items: center;
`

interface DotProps {
  color?: string
}

const Dot = styled.View<DotProps>`
  height: 10px;
  width: 10px;
  border-radius: 5px;
  background-color: ${(props: DotProps) => props.color};
  margin-right: 10px;
`

const Column = styled.View``

const Title = styled.Text`
  text-transform: uppercase;
  font-size: 12px;
  font-family: ${fonts.bold};
  color: ${(props: StyleProps) => props.theme.SECONDARY_TEXT_COLOR};
`

const Figure = styled.Text`
  text-transform: uppercase;
  font-size: 15px;
  font-family: ${fonts.bold};
  color: ${(props: StyleProps) => props.theme.PRIMARY_TEXT_COLOR};
`
