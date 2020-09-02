import React, { memo } from 'react'
import { Defs, G, Path, Text, TextPath } from 'react-native-svg'
import { describeArc, polarToCartesian } from @helpers/geometry'
import { fonts } from '../../styles/themes'

interface CurvedActionsProps {
  x: number
  y: number
  radius: number
  leftAction: Function
  rightAction: Function
}

const CurvedActions = (props: CurvedActionsProps) => {
  const handlePressLeft = () => {
    props.leftAction()
  }

  const handlePressRight = () => {
    props.rightAction()
  }

  const iconCoordinates = polarToCartesian(
    props.x,
    props.y,
    props.radius + 18,
    240
  )
  const pathLeft = describeArc(
    props.x,
    props.y,
    props.radius + 20,
    215,
    235
  ).toString()

  const pathRight = describeArc(
    props.x,
    props.y,
    props.radius + 20,
    125,
    145
  ).toString()

  return (
    <G>
      <G onPress={handlePressLeft}>
        <Defs>
          <Path
            id="pathLeft"
            d={pathLeft}
            fill="none"
            stroke="none"
            strokeWidth="1"
          />
        </Defs>
        <Text fill="blue" fontWeight="bold" fontFamily={fonts.bold}>
          <G
            x={iconCoordinates.x}
            y={iconCoordinates.y}
            transform={{ scale: 0.5 }}>
            {/* <Path d="M22.421,9.763l-1.266-.449a1.374,1.374,0,0,1-.78-1.886h0l.576-1.213A2.376,2.376,0,0,0,17.786,3.05l-1.213.577a1.375,1.375,0,0,1-1.885-.782l-.45-1.265a2.376,2.376,0,0,0-4.476,0l-.45,1.266a1.375,1.375,0,0,1-1.885.781L6.214,3.05A2.376,2.376,0,0,0,3.049,6.215l.576,1.213a1.375,1.375,0,0,1-.78,1.886l-1.266.45a2.375,2.375,0,0,0,0,4.475l1.266.45a1.374,1.374,0,0,1,.78,1.885l-.576,1.213a2.376,2.376,0,0,0,3.165,3.165l1.213-.576a1.373,1.373,0,0,1,1.885.781l.45,1.265a2.376,2.376,0,0,0,4.476,0l.45-1.266a1.374,1.374,0,0,1,1.885-.78l1.213.576a2.376,2.376,0,0,0,3.165-3.165l-.576-1.213a1.374,1.374,0,0,1,.78-1.885l1.266-.451a2.375,2.375,0,0,0,0-4.475ZM12,16.785a4.93,4.93,0,0,1-4.441-2.944,4.813,4.813,0,0,1,2.6-6.281,4.868,4.868,0,0,1,6.281,2.6,4.813,4.813,0,0,1-2.6,6.281A4.589,4.589,0,0,1,12,16.785Z" /> */}
          </G>
          <TextPath href="#pathLeft" midLine="smooth">
            Cancel
          </TextPath>
        </Text>

        <Path d={pathLeft} fill="none" stroke="transparent" strokeWidth="30" />
      </G>

      <G onPress={handlePressRight}>
        <Defs>
          <Path
            id="pathRight"
            d={pathRight}
            fill="none"
            stroke="none"
            strokeWidth="1"
          />
        </Defs>
        <Text fill="blue" fontWeight="bold" fontFamily={fonts.bold}>
          <G
            x={iconCoordinates.x}
            y={iconCoordinates.y}
            transform={{ scale: 0.5 }}>
            {/* <Path d="M22.421,9.763l-1.266-.449a1.374,1.374,0,0,1-.78-1.886h0l.576-1.213A2.376,2.376,0,0,0,17.786,3.05l-1.213.577a1.375,1.375,0,0,1-1.885-.782l-.45-1.265a2.376,2.376,0,0,0-4.476,0l-.45,1.266a1.375,1.375,0,0,1-1.885.781L6.214,3.05A2.376,2.376,0,0,0,3.049,6.215l.576,1.213a1.375,1.375,0,0,1-.78,1.886l-1.266.45a2.375,2.375,0,0,0,0,4.475l1.266.45a1.374,1.374,0,0,1,.78,1.885l-.576,1.213a2.376,2.376,0,0,0,3.165,3.165l1.213-.576a1.373,1.373,0,0,1,1.885.781l.45,1.265a2.376,2.376,0,0,0,4.476,0l.45-1.266a1.374,1.374,0,0,1,1.885-.78l1.213.576a2.376,2.376,0,0,0,3.165-3.165l-.576-1.213a1.374,1.374,0,0,1,.78-1.885l1.266-.451a2.375,2.375,0,0,0,0-4.475ZM12,16.785a4.93,4.93,0,0,1-4.441-2.944,4.813,4.813,0,0,1,2.6-6.281,4.868,4.868,0,0,1,6.281,2.6,4.813,4.813,0,0,1-2.6,6.281A4.589,4.589,0,0,1,12,16.785Z" /> */}
          </G>
          <TextPath href="#pathRight" midLine="smooth">
            Save entry
          </TextPath>
        </Text>

        <Path d={pathRight} fill="none" stroke="transparent" strokeWidth="30" />
      </G>
    </G>
  )
}

export default memo(CurvedActions)
