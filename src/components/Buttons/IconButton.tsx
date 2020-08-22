import React, { memo } from 'react'
import { View } from 'react-native'
import { IconBold } from '../iconRegular'
import ScalingButton from './ScalingButton'

interface Props {
  onPress: Function
  icon: string
  color: string
  backgroundColor: string
  analyticsEvent: string
}

const IconButton = (props: Props) => {
  const handlePress = () => {
    props.onPress()
  }
  return (
    <ScalingButton analyticsEvent={props.analyticsEvent} onPress={handlePress}>
      <View
        style={{
          padding: 10,
          backgroundColor: props.backgroundColor,
          borderRadius: 15
        }}>
        <IconBold name={props.icon} width={20} height={20} fill={props.color} />
      </View>
    </ScalingButton>
  )
}

export default memo(IconButton)
