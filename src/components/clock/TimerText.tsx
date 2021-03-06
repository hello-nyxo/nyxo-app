import React, { FC } from 'react'
import { View, ViewStyle } from 'react-native'
import styled from 'styled-components/native'

type Props = {
  style: ViewStyle
  minutesLong: number
}

const TimerText: FC<Props> = ({ minutesLong, style }) => {
  const hours = Math.floor(minutesLong / 60)
  const minutes = minutesLong - hours * 60

  return (
    <View style={style}>
      <TimerContainer>
        <Time>{hours}</Time>
        <Time>{minutes < 10 ? `0${minutes}` : minutes}</Time>
      </TimerContainer>
    </View>
  )
}
export default TimerText

const TimerContainer = styled.View`
  justify-content: center;
  align-items: flex-end;
  flex-direction: row;
`

const Time = styled.Text`
  margin-bottom: -24px;
  color: ${({ theme }) => theme.accent};
  font-family: ${({ theme }) => theme.FONT_MEDIUM};
  font-size: 36px;
`
