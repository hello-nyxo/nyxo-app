import { ScaleTime } from 'd3'
import moment from 'moment'
import React, { FC, useMemo } from 'react'
import { GestureResponderEvent } from 'react-native'
import { G, Rect } from 'react-native-svg'
import { Day, Night, Value } from 'Types/Sleepdata'
import colors from '../../../styles/colors'

interface Props {
  data: Day[]
  type: Value
  scaleX: ScaleTime<number, number>
  scaleY: ScaleTime<number, number>
  barWidth: number
  onPress: (day: Day) => void
}

const SleepBars: FC<Props> = ({
  data,
  type,
  scaleX,
  scaleY,
  barWidth,
  onPress
}) => {
  const color = type === Value.Asleep ? colors.radiantBlue : colors.inBedColor

  const { bars } = useMemo(
    () => ({
      bars: data.map((datum) => {
        const dayBars = datum.night
          .filter((night) => night.value === type)
          .map((item: Night) => {
            const y = scaleY(moment(item.startDate).valueOf())
            const x = scaleX(new Date(datum.date))
            const height =
              scaleY(moment(item.endDate).valueOf()) -
              scaleY(moment(item.startDate).valueOf())

            return (
              <G onPress={() => onPress(datum)} key={item.startDate}>
                <Rect
                  x={x}
                  width={barWidth}
                  fillOpacity={0.7}
                  rx={5}
                  y={y}
                  height={height}
                  fill={color}
                />
              </G>
            )
          })

        return <G key={datum.date}>{dayBars}</G>
      })
    }),
    [data]
  )

  return <G>{bars}</G>
}

export default SleepBars
