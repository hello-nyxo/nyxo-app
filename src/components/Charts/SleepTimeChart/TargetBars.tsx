import { ScaleTime } from 'd3'
import moment from 'moment'
import React, { FC, useMemo } from 'react'
import { G, Rect } from 'react-native-svg'
import { Day } from '@typings/Sleepdata'
import colors from '../../../styles/colors'

interface Props {
  data: Day[]
  scaleX: ScaleTime<number, number>
  scaleY: ScaleTime<number, number>
  barWidth: number
  onPress: (day: Day) => void
  start?: string
}

const TargetBars: FC<Props> = ({
  data,
  scaleX,
  scaleY,
  barWidth,
  onPress,
  start
}) => {
  const end = moment(start).add(8, 'hours')
  if (!start && typeof start !== 'string') return null

  const { bars } = useMemo(
    () => ({
      bars: data.map((datum) => {
        const y = scaleY(moment(start).valueOf())
        const x = scaleX(new Date(datum.date))
        const height = scaleY(end.valueOf()) - scaleY(moment(start).valueOf())

        if (Number.isNaN(y)) return null

        return (
          <G onPress={() => onPress(datum)} key={datum.date}>
            <Rect
              x={x}
              width={barWidth}
              fillOpacity={0.1}
              rx={5}
              y={y}
              height={height}
              fill={colors.inBedColor}
            />
          </G>
        )
      })
    }),
    [data]
  )

  return <G>{bars}</G>
}

export default TargetBars
