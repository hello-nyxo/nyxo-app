import React, { memo } from 'react'
import { View } from 'react-native'
import Svg from 'react-native-svg'

const MicroTaskProgress = () => {
  return (
    <View
      style={{
        height: 5,
        width: '100%',
        padding: 10,
        borderRadius: 20,
        backgroundColor: 'red'
      }}
    />
  )
}

export default memo(MicroTaskProgress)
