import { minutesToHoursString } from '@helpers/time'
import { useAppSelector } from '@hooks/redux'
import { getAsleepDuration, getInBedDuration } from '@reducers/nights'
import { fonts } from '@styles/themes'
import React, { FC } from 'react'
import styled from 'styled-components/native'
import colors from '../../styles/colors'

const Explanations: FC = () => {
  const inbed = minutesToHoursString(useAppSelector(getInBedDuration))
  const asleep = minutesToHoursString(useAppSelector(getAsleepDuration))
  // const window = useAppSelector(getGoToSleepWindowCenter)

  const stats = [
    { title: 'sleep', figure: inbed, color: colors.darkBlue },
    { title: 'asleep', figure: asleep, color: colors.darkBlue },
    { title: 'efficiency', figure: '100%', color: colors.nightAccent },
    {
      title: 'window',
      figure: 0,
      color: colors.fallAsleep
    }
  ]

  return (
    <Container>
      {stats.map((item) => (
        <Item key={item.title}>
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
  color: ${({ theme }) => theme.SECONDARY_TEXT_COLOR};
`

const Figure = styled.Text`
  text-transform: uppercase;
  font-size: 15px;
  font-family: ${fonts.bold};
  color: ${({ theme }) => theme.PRIMARY_TEXT_COLOR};
`
