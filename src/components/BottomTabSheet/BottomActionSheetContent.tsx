import React, { memo } from 'react'
import { View, Text, Dimensions } from 'react-native'
import { BlurView } from 'expo-blur'

const BottomSheetContent = () => {
  return (
    <BlurView tint="light" intensity={100}>
      <View>
        <Text>Start tracking sleep</Text>
      </View>
    </BlurView>
  )
}

export default memo(BottomSheetContent)
