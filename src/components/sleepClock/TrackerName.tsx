import React from 'react'
import { Text, G, TextPath, Defs, Path } from 'react-native-svg'
import { fonts } from '../../styles/themes'

interface TrackerNameProps {
  x: number
  y: number
  darkTheme: boolean
  radius: number
}

const TrackerName = (props: TrackerNameProps) => {
  const color = props.darkTheme ? 'white' : 'black'

  return (
    <Text
      textAnchor="middle"
      fontSize="13"
      fontFamily={fonts.bold}
      fontWeight="500"
      fill={color}
      alignmentBaseline="mathematical"
      x={props.x}
      y={props.y + 90}>
      Nyxo
    </Text>
  )
}

export default React.memo(TrackerName)
