import React, { memo } from 'react'
import { View } from 'react-native'
import { AnimatedCircularProgress } from 'react-native-circular-progress'
import colors from '../../styles/colors'
import { IconBold } from '../iconRegular'

const CoachingProgressToday = () => (
  <View
    style={{
      position: 'absolute',
      bottom: 0,
      right: 0,
      padding: 5
    }}>
    <AnimatedCircularProgress
      size={50}
      width={5}
      rotation={0}
      lineCap="round"
      fill={60}
      tintColor={colors.radiantBlue}
      backgroundColor="white">
      {(fill: number) => (
        <IconBold
          width={20}
          height={20}
          fill={colors.radiantBlue}
          name="schoolPhysicalBold"
        />
      )}
    </AnimatedCircularProgress>
  </View>
)

export default memo(CoachingProgressToday)
