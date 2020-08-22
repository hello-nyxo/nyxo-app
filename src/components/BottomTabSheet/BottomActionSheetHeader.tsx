import React, { memo } from 'react'
import { View, Text, Dimensions } from 'react-native'
import { BlurView } from 'expo-blur'

const BottomActionSheetHeader = () => {
  return (
    <BlurView tint="light" intensity={100}>
      <View>{/* <Text style={styles.titleH2}>Header</Text> */}</View>
    </BlurView>
  )
}

export default memo(BottomActionSheetHeader)
