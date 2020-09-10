import { ScaleTime } from 'd3'
import React, { FC, useMemo } from 'react'
import { G, Rect } from 'react-native-svg'
import styled from 'styled-components/native'
import { Day, Night, Value } from 'Types/Sleepdata'
import colors from '../../../styles/colors'

type Props = {
  data: {
    date: string
    night: Night[] & { startDate: number; endDate: number }
  }[]
  type: Value
  scaleX: ScaleTime<number, number>
  scaleY: ScaleTime<number, number>
  barWidth: number
  onPress: (day: Day) => void
}

const SleepBars: FC<Props> = ({ data, scaleX, scaleY, barWidth, onPress }) => {
  const { bars } = useMemo(
    () => ({
      bars: data.map((date) => {
        return date.night.map((night: Night) => {
          const y = scaleY(new Date(night.startDate).valueOf())
          const x = scaleX(new Date(date.date))
          const height =
            scaleY(new Date(night.endDate).valueOf()) -
            scaleY(new Date(night.startDate).valueOf())

          return (
            <G key={night.id}>
              <StyledRect
                x={x}
                width={barWidth}
                fillOpacity={0.7}
                rx={5}
                y={y}
                value={night.value}
                height={height}
              />
            </G>
          )
        })
      })
    }),
    [data]
  )

  return <G>{bars}</G>
}

export default SleepBars

const StyledRect = styled(Rect).attrs<{ value: Value }>(({ value }) => ({
  fill: value === Value.Asleep ? colors.radiantBlue : colors.inBedColor
}))``
