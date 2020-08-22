import { ScaleTime } from 'd3'
import moment from 'moment'
import React, { memo, useMemo } from 'react'
import { G, Rect } from 'react-native-svg'
import { Day, Night, Value } from 'Types/Sleepdata'
import colors from '../../../styles/colors'

interface Props {
  data: Day[]
  type: Value
  scaleX: ScaleTime<any, any>
  scaleY: ScaleTime<any, any>
  barWidth: number
  select: Function
}

const SleepBars = (props: Props) => {
  const color =
    props.type === Value.Asleep ? colors.radiantBlue : colors.inBedColor

  const { bars } = useMemo(
    () => ({
      bars: props.data.map((datum, index) => {
        const select = () => {
          props.select(datum)
        }

        const dayBars = datum.night
          .filter((night) => night.value === props.type)
          .map((item: Night, i: number) => {
            const y = props.scaleY(moment(item.startDate).valueOf())
            const height =
              props.scaleY(moment(item.endDate).valueOf()) -
              props.scaleY(moment(item.startDate).valueOf())

            return (
              <G key={i} onPress={select}>
                <Rect
                  x={props.scaleX(new Date(datum.date))}
                  width={props.barWidth}
                  fillOpacity={0.7}
                  rx={5}
                  y={y}
                  height={height}
                  fill={color}
                />
              </G>
            )
          })

        return <G key={index}>{dayBars}</G>
      })
    }),
    [props.data]
  )

  return <G>{bars}</G>
}

export default memo(SleepBars)
